/**
 * =============================================================
 *  BunChat SQLite persistence layer
 * =============================================================
 *  Replaces JSON-file storage with a single SQLite database.
 *  Uses better-sqlite3 (synchronous) so callers that previously
 *  used fs.writeFileSync need zero async changes.
 *
 *  On first run, existing JSON files are auto-migrated into the
 *  database.  After migration the JSON files are left in place
 *  (you can delete them manually once you've verified the DB).
 * =============================================================
 */

const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

const DB_PATH = path.join(__dirname, "bunchat.db");

let db;

// ─── Initialisation ─────────────────────────────────────────
function getDB() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.exec(`
      CREATE TABLE IF NOT EXISTS messages (
        id   TEXT PRIMARY KEY,
        data TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS users (
        username TEXT PRIMARY KEY,
        data     TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS groups_ (
        name TEXT PRIMARY KEY,
        data TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS rooms (
        id   TEXT PRIMARY KEY,
        data TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS posts (
        id   TEXT PRIMARY KEY,
        data TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS moderation_scores (
        key  TEXT PRIMARY KEY,
        data TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS room_moderation_logs (
        id   TEXT PRIMARY KEY,
        data TEXT NOT NULL
      );
    `);
    _migrateFromJSON();
  }
  return db;
}

// ─── One-time JSON → SQLite migration ───────────────────────
function _migrateFromJSON() {
  const jsonFiles = {
    messages: path.join(__dirname, "data.json"),
    users:    path.join(__dirname, "users.json"),
    groups:   path.join(__dirname, "groups.json"),
    rooms:    path.join(__dirname, "rooms.json"),
    posts:    path.join(__dirname, "posts.json"),
    scores:   path.join(__dirname, "moderation_scores.json"),
  };

  // Messages
  if (fs.existsSync(jsonFiles.messages)) {
    const count = db.prepare("SELECT COUNT(*) AS c FROM messages").get().c;
    if (count === 0) {
      try {
        const data = JSON.parse(fs.readFileSync(jsonFiles.messages, "utf-8"));
        const ins = db.prepare("INSERT OR IGNORE INTO messages (id, data) VALUES (?, ?)");
        db.transaction((items) => {
          for (const m of items) if (m?.id) ins.run(m.id, JSON.stringify(m));
        })(data);
        console.log(`[DB] Migrated ${data.length} messages from JSON`);
      } catch (e) { console.error("[DB] Error migrating messages:", e.message); }
    }
  }

  // Users
  if (fs.existsSync(jsonFiles.users)) {
    const count = db.prepare("SELECT COUNT(*) AS c FROM users").get().c;
    if (count === 0) {
      try {
        const data = JSON.parse(fs.readFileSync(jsonFiles.users, "utf-8"));
        const ins = db.prepare("INSERT OR IGNORE INTO users (username, data) VALUES (?, ?)");
        db.transaction((items) => {
          for (const u of items) if (u?.username) ins.run(u.username, JSON.stringify(u));
        })(data);
        console.log(`[DB] Migrated ${data.length} users from JSON`);
      } catch (e) { console.error("[DB] Error migrating users:", e.message); }
    }
  }

  // Groups
  if (fs.existsSync(jsonFiles.groups)) {
    const count = db.prepare("SELECT COUNT(*) AS c FROM groups_").get().c;
    if (count === 0) {
      try {
        const data = JSON.parse(fs.readFileSync(jsonFiles.groups, "utf-8"));
        const ins = db.prepare("INSERT OR IGNORE INTO groups_ (name, data) VALUES (?, ?)");
        db.transaction((items) => {
          for (const g of items) if (g?.name) ins.run(g.name, JSON.stringify(g));
        })(data);
        console.log(`[DB] Migrated ${data.length} groups from JSON`);
      } catch (e) { console.error("[DB] Error migrating groups:", e.message); }
    }
  }

  // Rooms
  if (fs.existsSync(jsonFiles.rooms)) {
    const count = db.prepare("SELECT COUNT(*) AS c FROM rooms").get().c;
    if (count === 0) {
      try {
        const data = JSON.parse(fs.readFileSync(jsonFiles.rooms, "utf-8"));
        const ins = db.prepare("INSERT OR IGNORE INTO rooms (id, data) VALUES (?, ?)");
        db.transaction((items) => {
          for (const r of items) {
            const id = r.id || r.name;
            if (id) ins.run(id, JSON.stringify(r));
          }
        })(data);
        console.log(`[DB] Migrated ${data.length} rooms from JSON`);
      } catch (e) { console.error("[DB] Error migrating rooms:", e.message); }
    }
  }

  // Posts
  if (fs.existsSync(jsonFiles.posts)) {
    const count = db.prepare("SELECT COUNT(*) AS c FROM posts").get().c;
    if (count === 0) {
      try {
        const data = JSON.parse(fs.readFileSync(jsonFiles.posts, "utf-8"));
        const ins = db.prepare("INSERT OR IGNORE INTO posts (id, data) VALUES (?, ?)");
        db.transaction((items) => {
          for (const p of items) if (p?.id) ins.run(p.id, JSON.stringify(p));
        })(data);
        console.log(`[DB] Migrated ${data.length} posts from JSON`);
      } catch (e) { console.error("[DB] Error migrating posts:", e.message); }
    }
  }

  // Moderation scores
  if (fs.existsSync(jsonFiles.scores)) {
    const count = db.prepare("SELECT COUNT(*) AS c FROM moderation_scores").get().c;
    if (count === 0) {
      try {
        const data = JSON.parse(fs.readFileSync(jsonFiles.scores, "utf-8"));
        const ins = db.prepare("INSERT OR IGNORE INTO moderation_scores (key, data) VALUES (?, ?)");
        db.transaction((entries) => {
          for (const [key, value] of entries) ins.run(key, JSON.stringify(value));
        })(Object.entries(data));
        console.log(`[DB] Migrated ${Object.keys(data).length} moderation scores from JSON`);
      } catch (e) { console.error("[DB] Error migrating moderation scores:", e.message); }
    }
  }
}

// ═══════════════════════════════════════════════════════════
//  Messages
// ═══════════════════════════════════════════════════════════
function loadMessages() {
  return getDB().prepare("SELECT data FROM messages").all().map((r) => JSON.parse(r.data));
}

function syncMessages(messagesMap) {
  const d = getDB();
  d.transaction(() => {
    d.prepare("DELETE FROM messages").run();
    const ins = d.prepare("INSERT INTO messages (id, data) VALUES (?, ?)");
    for (const msg of messagesMap.values()) {
      ins.run(msg.id, JSON.stringify(msg));
    }
  })();
}

// ═══════════════════════════════════════════════════════════
//  Users
// ═══════════════════════════════════════════════════════════
function loadUsers() {
  return getDB().prepare("SELECT data FROM users").all().map((r) => JSON.parse(r.data));
}

function syncUsers(usersMap) {
  const d = getDB();
  d.transaction(() => {
    d.prepare("DELETE FROM users").run();
    const ins = d.prepare("INSERT INTO users (username, data) VALUES (?, ?)");
    for (const user of usersMap.values()) {
      ins.run(user.username, JSON.stringify(user));
    }
  })();
}

// ═══════════════════════════════════════════════════════════
//  Groups  (Sets → arrays for JSON serialisation)
// ═══════════════════════════════════════════════════════════
function loadGroups() {
  return getDB().prepare("SELECT data FROM groups_").all().map((r) => JSON.parse(r.data));
}

function syncGroups(groupsMap) {
  const d = getDB();
  d.transaction(() => {
    d.prepare("DELETE FROM groups_").run();
    const ins = d.prepare("INSERT INTO groups_ (name, data) VALUES (?, ?)");
    for (const [name, g] of groupsMap.entries()) {
      const serialized = {
        name,
        code: g.code,
        owner: g.owner,
        admins: [...(g.admins || [])],
        members: [...(g.members || [])],
        banned: [...(g.banned || [])],
        pendingRequests: [...(g.pendingRequests || [])],
        requireApproval: g.requireApproval || false,
        description: g.description || "",
        pfpUrl: g.pfpUrl || "",
      };
      ins.run(name, JSON.stringify(serialized));
    }
  })();
}

// ═══════════════════════════════════════════════════════════
//  Rooms  (Sets → arrays for JSON serialisation)
// ═══════════════════════════════════════════════════════════
function loadRooms() {
  return getDB().prepare("SELECT data FROM rooms").all().map((r) => JSON.parse(r.data));
}

function syncRooms(roomsMap) {
  const d = getDB();
  d.transaction(() => {
    d.prepare("DELETE FROM rooms").run();
    const ins = d.prepare("INSERT INTO rooms (id, data) VALUES (?, ?)");
    for (const r of roomsMap.values()) {
      const serialized = {
        id: r.id,
        name: r.name,
        owner: r.owner,
        admins: [...(r.admins || [])],
        members: [...(r.members || [])],
        banned: [...(r.banned || [])],
        description: r.description || "",
        iconUrl: r.iconUrl || "",
        toxicFilter: r.toxicFilter !== undefined ? r.toxicFilter : true,
        trollMode: r.trollMode || false,
        ts: r.ts || Date.now(),
      };
      ins.run(r.id, JSON.stringify(serialized));
    }
  })();
}

// ═══════════════════════════════════════════════════════════
//  Posts
// ═══════════════════════════════════════════════════════════
function loadPosts() {
  return getDB().prepare("SELECT data FROM posts").all().map((r) => JSON.parse(r.data));
}

function syncPosts(postsMap) {
  const d = getDB();
  d.transaction(() => {
    d.prepare("DELETE FROM posts").run();
    const ins = d.prepare("INSERT INTO posts (id, data) VALUES (?, ?)");
    for (const post of postsMap.values()) {
      ins.run(post.id, JSON.stringify(post));
    }
  })();
}

// ═══════════════════════════════════════════════════════════
//  Moderation scores
// ═══════════════════════════════════════════════════════════
function loadModerationScores() {
  const rows = getDB().prepare("SELECT key, data FROM moderation_scores").all();
  const scores = {};
  for (const r of rows) scores[r.key] = JSON.parse(r.data);
  return scores;
}

function syncModerationScores(scores) {
  const d = getDB();
  d.transaction(() => {
    d.prepare("DELETE FROM moderation_scores").run();
    const ins = d.prepare("INSERT INTO moderation_scores (key, data) VALUES (?, ?)");
    for (const [key, value] of Object.entries(scores)) {
      ins.run(key, JSON.stringify(value));
    }
  })();
}

// ═══════════════════════════════════════════════════════════
//  Room moderation logs
// ═══════════════════════════════════════════════════════════
function loadRoomModerationLogs() {
  return getDB().prepare("SELECT data FROM room_moderation_logs").all().map((r) => JSON.parse(r.data));
}

function syncRoomModerationLogs(logsMap) {
  const d = getDB();
  d.transaction(() => {
    d.prepare("DELETE FROM room_moderation_logs").run();
    const ins = d.prepare("INSERT INTO room_moderation_logs (id, data) VALUES (?, ?)");
    for (const log of logsMap.values()) {
      ins.run(log.id, JSON.stringify(log));
    }
  })();
}

// ═══════════════════════════════════════════════════════════
module.exports = {
  getDB,
  loadMessages,    syncMessages,
  loadUsers,       syncUsers,
  loadGroups,      syncGroups,
  loadRooms,       syncRooms,
  loadPosts,       syncPosts,
  loadModerationScores, syncModerationScores,
  loadRoomModerationLogs, syncRoomModerationLogs,
};
