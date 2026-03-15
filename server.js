const express = require("express");
const http = require("http");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { WebSocketServer } = require("ws");
const { randomUUID } = require("crypto");
const moderation = require("./moderation");
const db = require("./db");


const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/storage", express.static(path.join(__dirname, "storage")));


const storageDir = path.join(__dirname, "storage");

if (!fs.existsSync(storageDir)) fs.mkdirSync(storageDir, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: storageDir,
    filename: (_req, file, cb) =>
      cb(null, `${randomUUID()}${path.extname(file.originalname) || ".jpg"}`),
  }),
});


const clients  = new Map();
const messages = new Map();
const users    = new Map();
const groups   = new Map();
const rooms    = new Map();
const posts    = new Map();
const roomModerationLogs = new Map();

const ROOM_IDLE_MS = 10 * 60 * 1000;
const OTP_REGEX = /\b(?:\d{4}|\d{6})\b/;
const ROOM_SPAM_WINDOW_MS = 60 * 1000;
const ROOM_SPAM_THRESHOLD = 30;
const ROOM_SLOWDOWN_MS = 10 * 1000;
const ROOM_SLOWDOWN_DURATION_MS = 10 * 60 * 1000;
const POST_TTL_MS = 24 * 60 * 60 * 1000;

const roomSpamState = new Map();

function isPostExpired(post, nowTs) {
  const now = Number(nowTs) || Date.now();
  const ts = Number(post && post.ts) || 0;
  return !ts || (now - ts) >= POST_TTL_MS;
}

function removePostMediaFile(post) {
  if (!post || !post.photoUrl) return;
  const fp = path.join(storageDir, path.basename(post.photoUrl));
  try { fs.unlinkSync(fp); } catch {}
}

function purgeExpiredPosts(options) {
  const opts = options || {};
  const shouldBroadcast = opts.broadcast !== false;
  const now = Date.now();
  const deletedIds = [];
  for (const [postId, post] of posts.entries()) {
    if (!isPostExpired(post, now)) continue;
    removePostMediaFile(post);
    posts.delete(postId);
    deletedIds.push(postId);
  }
  if (!deletedIds.length) return [];
  savePosts();
  if (shouldBroadcast) {
    deletedIds.forEach(function(postId) {
      broadcast({ type: "post-deleted", postId });
    });
  }
  return deletedIds;
}

function roomSpamKey(roomId, username) {
  return `${roomId}::${username}`;
}

function checkRoomSpam(roomId, username, immune) {
  if (immune) return { ok: true, justActivated: false };
  const now = Date.now();
  const key = roomSpamKey(roomId, username);
  const state = roomSpamState.get(key) || { hits: [], slowUntil: 0, lastSentAt: 0 };

  state.hits = state.hits.filter((ts) => now - ts <= ROOM_SPAM_WINDOW_MS);

  if (state.slowUntil > now) {
    const nextAllowedAt = state.lastSentAt + ROOM_SLOWDOWN_MS;
    if (now < nextAllowedAt) {
      roomSpamState.set(key, state);
      return {
        ok: false,
        justActivated: false,
        waitMs: Math.max(0, nextAllowedAt - now),
        slowRemainingMs: state.slowUntil - now,
      };
    }
    state.lastSentAt = now;
    state.hits.push(now);
    roomSpamState.set(key, state);
    return { ok: true, justActivated: false };
  }

  state.hits.push(now);
  let justActivated = false;
  if (state.hits.length > ROOM_SPAM_THRESHOLD) {
    state.slowUntil = now + ROOM_SLOWDOWN_DURATION_MS;
    state.lastSentAt = now;
    justActivated = true;
  }
  roomSpamState.set(key, state);
  return { ok: true, justActivated };
}


function load() {
  try {
    for (const m of db.loadMessages())
      if (m?.id) messages.set(m.id, m);
  } catch {}
  try {
    for (const u of db.loadUsers())
      if (u?.username) users.set(u.username, {
        ...u,
        dmBlocks: (u.dmBlocks && typeof u.dmBlocks === "object") ? u.dmBlocks : {},
        roomList: Array.isArray(u.roomList) ? u.roomList : [],
        lastSeen: u.lastSeen || 0,
        lastLogout: u.lastLogout || 0,
      });
  } catch {}
  try {
    for (const g of db.loadGroups())
      if (g?.name)
        groups.set(g.name, {
          code: g.code,
          owner: g.owner,
          admins: new Set(g.admins || []),
          members: new Set(g.members || []),
          banned: new Set(g.banned || []),
          pendingRequests: new Set(g.pendingRequests || []),
          requireApproval: g.requireApproval || false,
          description: g.description || "",
          pfpUrl: g.pfpUrl || "",
        });
  } catch {}
  try {
    for (const r of db.loadRooms())
      if (r?.id || r?.name) {
        const owner = r.owner || r.createdBy || "";
        const rid = r.id || makeRoomId(r.name || "Room", owner || "user");
        rooms.set(rid, {
          id: rid,
          name: r.name || "Room",
          owner,
          admins: new Set(r.admins || []),
          members: new Set(r.members || []),
          banned: new Set(r.banned || []),
          description: r.description || "",
          iconUrl: r.iconUrl || "",
          toxicFilter: r.toxicFilter !== undefined ? r.toxicFilter : true,
          trollMode: r.trollMode || false,
          ts: r.ts || Date.now(),
        });
      }
  } catch {}
  try {
    for (const p of db.loadPosts())
      if (p?.id) posts.set(p.id, p);
  } catch {}
  try {
    for (const log of db.loadRoomModerationLogs()) {
      if (!log?.id || !log?.roomId) continue;
      roomModerationLogs.set(log.id, {
        id: log.id,
        roomId: log.roomId,
        username: log.username || "",
        text: log.text || "",
        action: log.action === "blocked" ? "blocked" : "flagged",
        reason: log.reason || "Flagged by moderation",
        ts: Number(log.ts) || Date.now(),
      });
    }
  } catch {}
}

const saveMessages = () => db.syncMessages(messages);
const saveUsers    = () => db.syncUsers(users);
const saveGroups   = () => db.syncGroups(groups);
const saveRooms    = () => db.syncRooms(rooms);
const savePosts    = () => db.syncPosts(posts);
const saveRoomModerationLogs = () => db.syncRoomModerationLogs(roomModerationLogs);

load();
purgeExpiredPosts({ broadcast: false });


const send = (ws, obj) => { if (ws.readyState === ws.OPEN) ws.send(JSON.stringify(obj)); };

const broadcast = (obj) => {
  const d = JSON.stringify(obj);
  for (const ws of clients.keys()) if (ws.readyState === ws.OPEN) ws.send(d);
};

const sendToGroup = (gName, obj) => {
  const grp = groups.get(gName);
  if (!grp) return;
  const d = JSON.stringify(obj);
  for (const [ws, c] of clients.entries())
    if (c.username && grp.members.has(c.username) && ws.readyState === ws.OPEN) ws.send(d);
};

const sendToUser = (username, obj) => {
  const d = JSON.stringify(obj);
  for (const [ws, c] of clients.entries())
    if (c.username === username && ws.readyState === ws.OPEN) ws.send(d);
};

/* Emit a system message into a group chat (persisted like a normal message) */
const emitGroupSystemMsg = (groupName, text) => {
  const id = randomUUID();
  const entry = {
    id, kind: "system", from: "__system__",
    text, scope: "group", group: groupName,
    dm: null, recipient: null, room: null, roomName: null,
    replyTo: null, ts: Date.now(),
  };
  messages.set(id, entry);
  saveMessages();
  sendToGroup(groupName, { type: "new-message", message: entry });
};

const sendToRoom = (roomId, obj) => {
  const d = JSON.stringify(obj);
  for (const [ws, c] of clients.entries())
    if (c.username && c.joinedRooms && c.joinedRooms.has(roomId) && ws.readyState === ws.OPEN) ws.send(d);
};

const onlineUsers = () => {
  const s = new Set();
  for (const c of clients.values()) if (c.username) s.add(c.username);
  return [...s];
};

const allUsernames = () => [...users.keys()];

function normalizeMentionToken(value) {
  return String(value || "").trim().toLowerCase();
}

function parseMentionTokens(text) {
  const content = String(text || "");
  const out = [];
  const seen = new Set();
  const re = /(^|\s)@([a-zA-Z0-9._-]+)/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    const token = normalizeMentionToken(m[2]);
    if (!token || seen.has(token)) continue;
    seen.add(token);
    out.push(token);
  }
  return out;
}

function hasGroupOrRoomAdminRole(scope, scopeId, username) {
  if (scope === "group") {
    const grp = groups.get(scopeId);
    return !!(grp && (grp.owner === username || (grp.admins && grp.admins.has(username))));
  }
  if (scope === "room") {
    const room = rooms.get(scopeId);
    return !!(room && isRoomOwnerOrAdmin(room, username));
  }
  return false;
}

function resolveMentionUsersForScope({ text, scope, groupName, roomId, sender }) {
  const tokens = parseMentionTokens(text);
  const mentionUsers = new Set();
  let mentionHere = false;
  let mentionEveryone = false;

  if (scope === "group") {
    const grp = groups.get(groupName);
    if (!grp) return { mentionUsers: [], mentionHere: false, mentionEveryone: false, requiresSpecialRole: false };
    const memberMap = new Map();
    for (const u of grp.members || []) memberMap.set(normalizeMentionToken(u), u);

    for (const tk of tokens) {
      if (tk === "everyone") mentionEveryone = true;
      else if (tk === "here") mentionHere = true;
      else if (memberMap.has(tk)) mentionUsers.add(memberMap.get(tk));
    }

    if (mentionEveryone) {
      for (const u of grp.members || []) if (u !== sender) mentionUsers.add(u);
    }
    if (mentionHere) {
      const online = new Set(onlineUsers());
      for (const u of grp.members || []) {
        if (u !== sender && online.has(u)) mentionUsers.add(u);
      }
    }
    return {
      mentionUsers: [...mentionUsers],
      mentionHere,
      mentionEveryone,
      requiresSpecialRole: mentionHere || mentionEveryone,
    };
  }

  if (scope === "room") {
    const room = rooms.get(roomId);
    if (!room) return { mentionUsers: [], mentionHere: false, mentionEveryone: false, requiresSpecialRole: false };
    const memberMap = new Map();
    for (const u of room.members || []) memberMap.set(normalizeMentionToken(u), u);

    for (const tk of tokens) {
      if (tk === "here") mentionHere = true;
      else if (tk === "everyone") {
        // Rooms do not support @everyone.
      } else if (memberMap.has(tk)) mentionUsers.add(memberMap.get(tk));
    }

    if (mentionHere) {
      const online = new Set(roomOnlineUsers(roomId));
      for (const u of online) if (u !== sender) mentionUsers.add(u);
    }
    return {
      mentionUsers: [...mentionUsers],
      mentionHere,
      mentionEveryone: false,
      requiresSpecialRole: mentionHere,
    };
  }

  if (scope === "dm") {
    return {
      mentionUsers: [],
      mentionHere: false,
      mentionEveryone: false,
      requiresSpecialRole: false,
    };
  }

  return { mentionUsers: [], mentionHere: false, mentionEveryone: false, requiresSpecialRole: false };
}

function isDmBlockedBy(blockerUsername, targetUsername) {
  const blocker = users.get(blockerUsername);
  if (!blocker || !blocker.dmBlocks || typeof blocker.dmBlocks !== "object") return false;
  return !!blocker.dmBlocks[targetUsername];
}

const userProfile = (u) => ({
  username: u.username,
  avatarColor: u.avatarColor || "#2d88ff",
  pfpUrl: u.pfpUrl || "",
  about: u.about || "",
  status: u.status || "online",
  lastSeen: u.lastSeen || 0,
  lastLogout: u.lastLogout || 0,
  accentColor: u.accentColor || "",
  accentColor2: u.accentColor2 || "",
  bannerColor: u.bannerColor || "",
  bannerUrl: u.bannerUrl || "",
  bannerPosition: u.bannerPosition != null ? u.bannerPosition : 50,
  profileDecoration: u.profileDecoration || "",
  githubUsername: u.githubUsername || "",
});

const allUserProfiles = () => [...users.values()].map(userProfile);

const groupSummaries = () =>
  [...groups.entries()].map(([name, g]) => ({
    name,
    owner: g.owner,
    admins: [...(g.admins || [])],
    memberCount: g.members.size,
    description: g.description || "",
    pfpUrl: g.pfpUrl || "",
  }));

const roomOnlineCount = (roomId) => {
  let n = 0;
  for (const c of clients.values()) {
    if (c.username && c.joinedRooms && c.joinedRooms.has(roomId)) n += 1;
  }
  return n;
};

const roomOnlineUsers = (roomId) => {
  const names = new Set();
  for (const c of clients.values()) {
    if (c.username && c.joinedRooms && c.joinedRooms.has(roomId)) names.add(c.username);
  }
  return [...names].sort((a, b) => a.localeCompare(b));
};

const roomCatalog = () =>
  [...rooms.values()]
    .map((r) => ({
      id: r.id,
      name: r.name,
      owner: r.owner,
      admins: [...(r.admins || [])],
      members: [...(r.members || [])],
      banned: [...(r.banned || [])],
      description: r.description || "",
      iconUrl: r.iconUrl || "",
      ts: r.ts || Date.now(),
      onlineCount: roomOnlineCount(r.id),
    }))
    .sort((a, b) => (b.members.length || 0) - (a.members.length || 0));

function ensureUserRoomList(username) {
  const user = users.get(username);
  if (!user) return [];
  if (!Array.isArray(user.roomList)) user.roomList = [];
  return user.roomList;
}

function addRoomToUserList(username, roomId) {
  const list = ensureUserRoomList(username);
  if (!list.includes(roomId)) {
    list.push(roomId);
    saveUsers();
  }
}

function makeRoomId(name, owner) {
  const safeName = (name || "room").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "room";
  const safeOwner = (owner || "user").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "user";
  return `${safeName}_${safeOwner}_${randomUUID().slice(0, 8)}`;
}

function isRoomOwnerOrAdmin(room, username) {
  return room && (room.owner === username || (room.admins && room.admins.has(username)));
}

function roomDetail(roomId) {
  const r = rooms.get(roomId);
  if (!r) return null;
  // Build muted list from moderation system
  const mutedUsers = [];
  for (const m of (r.members || [])) {
    if (moderation.isMuted(roomId, m)) {
      const rec = moderation.getMSS(roomId, m);
      mutedUsers.push({ username: m, muteUntil: rec.manualMuteUntil || rec.muteUntil || null, score: rec.score, manual: !!moderation.isManuallyMuted(roomId, m) });
    }
  }
  const online = roomOnlineUsers(roomId);
  const onlineSet = new Set(online);
  // Offline users: people who have room in their list and are members but not currently online in room
  const offlineUsers = [];
  for (const u of users.values()) {
    if (!Array.isArray(u.roomList)) continue;
    if (!u.roomList.includes(roomId)) continue;
    if (onlineSet.has(u.username)) continue;
    offlineUsers.push(u.username);
  }
  offlineUsers.sort((a, b) => a.localeCompare(b));
  return {
    id: r.id,
    name: r.name,
    owner: r.owner,
    admins: [...(r.admins || [])],
    members: [...(r.members || [])],
    banned: [...(r.banned || [])],
    description: r.description || "",
    iconUrl: r.iconUrl || "",
    onlineCount: roomOnlineCount(r.id),
    onlineUsers: online,
    offlineUsers,
    mutedUsers,
    toxicFilter: r.toxicFilter !== undefined ? r.toxicFilter : true,
    trollMode: r.trollMode || false,
    ts: r.ts || Date.now(),
  };
}

function roomListForUser(username) {
  const list = ensureUserRoomList(username);
  const out = [];
  for (const roomId of list) {
    const detail = roomDetail(roomId);
    if (detail) out.push(detail);
  }
  return out;
}

function getRoomModerationLogs(roomId) {
  return [...roomModerationLogs.values()]
    .filter((log) => log.roomId === roomId)
    .sort((a, b) => (b.ts || 0) - (a.ts || 0));
}

function addRoomModerationLog(entry) {
  if (!entry?.roomId || !entry?.username) return;
  const id = randomUUID();
  roomModerationLogs.set(id, {
    id,
    roomId: String(entry.roomId),
    username: String(entry.username),
    text: String(entry.text || "").slice(0, 2000),
    action: entry.action === "blocked" ? "blocked" : "flagged",
    reason: String(entry.reason || "Flagged by moderation").slice(0, 500),
    ts: Date.now(),
  });
  saveRoomModerationLogs();
}

const broadcastOnline = () => broadcast({ type: "online-users", users: onlineUsers() });
const broadcastGroups = () => broadcast({ type: "groups-list", groups: groupSummaries() });
const broadcastUsers = () => broadcast({ type: "users-list", users: allUsernames() });
const broadcastRooms = () => {
  for (const [ws, c] of clients.entries()) {
    if (!c.username || ws.readyState !== ws.OPEN) continue;
    send(ws, {
      type: "rooms-list",
      rooms: roomListForUser(c.username),
      roomCatalog: roomCatalog(),
      joinedRoomIds: [...(c.joinedRooms || [])],
    });
  }
};

/* Helper: check if user is owner or admin */
function isOwnerOrAdmin(grp, username) {
  return grp.owner === username || (grp.admins && grp.admins.has(username));
}

function dmKey(a, b) {
  return [a, b].sort().join("::");
}

function hasOtpLikeContent(text) {
  return OTP_REGEX.test(String(text || ""));
}

function parseSpoilerSyntax(rawText, mediaName) {
  let text = String(rawText || "");
  let spoilerText = false;
  let spoilerMedia = false;
  const targetMedia = String(mediaName || "").trim().toLowerCase();

  text = text.replace(/\/\*([\s\S]*?)\*\//g, (_full, inner) => {
    const body = String(inner || "").trim();
    if (!body) return "";
    if (targetMedia && body.toLowerCase() === targetMedia) {
      spoilerMedia = true;
      return "";
    }
    spoilerText = true;
    return `||${body}||`;
  });

  return {
    text: text.replace(/[ \t]{3,}/g, "  ").trimEnd(),
    spoilerText,
    spoilerMedia,
  };
}

function parseEmbedCommand(rawText) {
  const src = String(rawText || "").trim();
  if (!src.toLowerCase().startsWith("!embed")) return { embed: null, text: src, error: null };
  const match = src.match(/^!embed\s+(#[0-9a-fA-F]{6})(?:\s+|\n)([\s\S]+)$/);
  if (!match) {
    return {
      embed: null,
      text: src,
      error: "Embed format: !embed #RRGGBB <message>",
    };
  }
  return {
    embed: {
      color: match[1].toLowerCase(),
      text: String(match[2] || "").trim(),
    },
    text: String(match[2] || "").trim(),
    error: null,
  };
}

/* ── Moderation helpers ──────────────────────────────────────── */
function getRecentMessagesForScope(scope, scopeId, limit) {
  limit = limit || 5;
  const all = [...messages.values()]
    .filter(m => {
      if (scope === "group") return m.scope === "group" && m.group === scopeId && m.kind === "text" && m.text;
      if (scope === "room") return m.scope === "room" && m.room === scopeId && m.kind === "text" && m.text;
      return false;
    })
    .sort((a, b) => b.ts - a.ts)
    .slice(0, limit)
    .reverse();
  return all.map(m => `${m.from}: ${m.text}`);
}

function sendTherapistDM(username, dmText) {
  const warningText = [
    "Warning: Your recent message violated room conduct rules.",
    "Further violations may result in temporary mute.",
    "If you believe this is a mistake, DM the room admin or owner.",
  ].join(" ");
  sendToUser(username, {
    type: "moderation-warning",
    message: warningText,
  });
}

/* ── Troll-mode bot message (posted publicly in the room) ───── */
function sendTrollBotMessage(roomId, trollText) {
  const room = rooms.get(roomId);
  if (!room) return;
  const id = randomUUID();
  const entry = {
    id, kind: "text", from: "BunBot",
    avatarColor: "#e74c3c",
    text: trollText,
    scope: "room",
    group: null,
    dm: null,
    recipient: null,
    room: roomId,
    roomName: room.name || "Room",
    replyTo: null,
    ts: Date.now(),
    isTrollBot: true,
  };
  messages.set(id, entry);
  saveMessages();
  sendToRoom(roomId, { type: "new-message", message: entry });
}

function sendGroupDetail(ws, name) {
  const g = groups.get(name);
  if (!g) return;
  send(ws, { type: "group-detail", group: {
    name,
    code: g.code,
    owner: g.owner,
    admins: [...(g.admins || [])],
    members: [...g.members],
    banned: [...(g.banned || [])],
    pendingRequests: [...(g.pendingRequests || [])],
    requireApproval: g.requireApproval || false,
    description: g.description || "",
    pfpUrl: g.pfpUrl || "",
  } });
}


app.get("/", (_req, res) => res.render("index"));

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ ok: false, error: "Both fields required" });
  if (users.has(username)) return res.status(400).json({ ok: false, error: "Username taken" });
  const avatarColor = "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
  users.set(username, { username, password, groups: [], roomList: [], dmBlocks: {}, avatarColor, about: "", status: "online", pfpUrl: "", lastSeen: 0, lastLogout: 0, accentColor: "", accentColor2: "", bannerColor: "", bannerUrl: "", bannerPosition: 50, profileDecoration: "", githubUsername: "" });
  saveUsers();
  broadcastUsers();
  broadcast({ type: "user-profile-updated", profile: userProfile(users.get(username)) });
  res.json({ ok: true });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.get(username);
  if (!user || user.password !== password)
    return res.status(401).json({ ok: false, error: "Invalid credentials" });
  res.json({ ok: true });
});

app.post("/logout", (req, res) => {
  const username = (req.body && req.body.username ? String(req.body.username) : "").trim();
  if (!username || !users.has(username)) return res.status(401).json({ ok: false, error: "Not authenticated" });
  const user = users.get(username);
  const now = Date.now();
  user.lastSeen = now;
  user.lastLogout = now;
  saveUsers();
  broadcast({ type: "user-profile-updated", profile: userProfile(user) });
  res.json({ ok: true, ts: now });
});


app.post("/profile", (req, res) => {
  const { username, about, status, accentColor, accentColor2, bannerColor, bannerPosition, profileDecoration, githubUsername } = req.body || {};
  if (!username || !users.has(username))
    return res.status(401).json({ ok: false, error: "Not authenticated" });
  const user = users.get(username);
  if (typeof about === "string") user.about = about.slice(0, 280);
  if (["online", "idle", "dnd", "offline"].includes(status)) user.status = status;
  if (typeof accentColor === "string") user.accentColor = accentColor.slice(0, 7);
  if (typeof accentColor2 === "string") user.accentColor2 = accentColor2.slice(0, 7);
  if (typeof bannerColor === "string") user.bannerColor = bannerColor.slice(0, 7);
  if (bannerPosition != null) user.bannerPosition = Math.max(0, Math.min(100, isNaN(Number(bannerPosition)) ? 50 : Number(bannerPosition)));
  if (typeof profileDecoration === "string") user.profileDecoration = profileDecoration.slice(0, 60);
  if (typeof githubUsername === "string") user.githubUsername = githubUsername.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 39);
  saveUsers();
  const profile = userProfile(user);
  broadcast({ type: "user-profile-updated", profile });
  res.json({ ok: true, profile });
});

app.post("/avatar", upload.single("avatar"), (req, res) => {
  if (!req.file) return res.status(400).json({ ok: false, error: "No file" });
  const username = req.body.username;
  if (!username || !users.has(username)) return res.status(401).json({ ok: false, error: "Not authenticated" });
  const user = users.get(username);
  /* Delete old avatar file if it exists */
  if (user.pfpUrl) {
    const fp = path.join(storageDir, path.basename(user.pfpUrl));
    try { fs.unlinkSync(fp); } catch {}
  }
  user.pfpUrl = `/storage/${req.file.filename}`;
  saveUsers();
  const profile = userProfile(user);
  broadcast({ type: "user-profile-updated", profile });
  res.json({ ok: true, profile });
});

app.post("/avatar-delete", (req, res) => {
  const username = (req.body && req.body.username) || "";
  if (!username || !users.has(username)) return res.status(401).json({ ok: false, error: "Not authenticated" });
  const user = users.get(username);
  if (user.pfpUrl) {
    const fp = path.join(storageDir, path.basename(user.pfpUrl));
    try { fs.unlinkSync(fp); } catch {}
    user.pfpUrl = "";
  }
  saveUsers();
  const profile = userProfile(user);
  broadcast({ type: "user-profile-updated", profile });
  res.json({ ok: true, profile });
});

app.post("/banner", upload.single("banner"), (req, res) => {
  if (!req.file) return res.status(400).json({ ok: false, error: "No file" });
  const username = req.body.username;
  if (!username || !users.has(username)) return res.status(401).json({ ok: false, error: "Not authenticated" });
  const user = users.get(username);
  if (user.bannerUrl) {
    const fp = path.join(storageDir, path.basename(user.bannerUrl));
    try { fs.unlinkSync(fp); } catch {}
  }
  user.bannerUrl = `/storage/${req.file.filename}`;
  saveUsers();
  const profile = userProfile(user);
  broadcast({ type: "user-profile-updated", profile });
  res.json({ ok: true, profile });
});

app.post("/banner-delete", (req, res) => {
  const username = (req.body && req.body.username) || "";
  if (!username || !users.has(username)) return res.status(401).json({ ok: false, error: "Not authenticated" });
  const user = users.get(username);
  if (user.bannerUrl) {
    const fp = path.join(storageDir, path.basename(user.bannerUrl));
    try { fs.unlinkSync(fp); } catch {}
    user.bannerUrl = "";
  }
  saveUsers();
  const profile = userProfile(user);
  broadcast({ type: "user-profile-updated", profile });
  res.json({ ok: true, profile });
});

app.post("/group-profile", (req, res) => {
  const { username, group, description } = req.body || {};
  if (!username || !users.has(username))
    return res.status(401).json({ ok: false, error: "Not authenticated" });
  if (!group || !groups.has(group))
    return res.status(404).json({ ok: false, error: "Group not found" });
  const g = groups.get(group);
  if (!isOwnerOrAdmin(g, username)) return res.status(403).json({ ok: false, error: "Not allowed" });
  if (typeof description === "string") g.description = description.slice(0, 200);
  saveGroups();
  const summary = { name: group, owner: g.owner, admins: [...(g.admins || [])], memberCount: g.members.size, description: g.description || "", pfpUrl: g.pfpUrl || "" };
  broadcast({ type: "group-profile-updated", group: summary });
  res.json({ ok: true, group: summary });
});

app.post("/group-avatar", upload.single("avatar"), (req, res) => {
  if (!req.file) return res.status(400).json({ ok: false, error: "No file" });
  const username = req.body.username;
  const groupName = req.body.group;
  if (!username || !users.has(username)) return res.status(401).json({ ok: false, error: "Not authenticated" });
  if (!groupName || !groups.has(groupName)) return res.status(404).json({ ok: false, error: "Group not found" });
  const g = groups.get(groupName);
  if (!isOwnerOrAdmin(g, username)) return res.status(403).json({ ok: false, error: "Not allowed" });
  g.pfpUrl = `/storage/${req.file.filename}`;
  saveGroups();
  const summary = { name: groupName, owner: g.owner, admins: [...(g.admins || [])], memberCount: g.members.size, description: g.description || "", pfpUrl: g.pfpUrl || "" };
  broadcast({ type: "group-profile-updated", group: summary });
  res.json({ ok: true, group: summary });
});

app.post("/room-icon", upload.single("avatar"), (req, res) => {
  if (!req.file) return res.status(400).json({ ok: false, error: "No file" });
  const username = req.body.username;
  const roomId = req.body.roomId || req.body.room;
  if (!username || !users.has(username)) return res.status(401).json({ ok: false, error: "Not authenticated" });
  if (!roomId || !rooms.has(roomId)) return res.status(404).json({ ok: false, error: "Room not found" });
  const room = rooms.get(roomId);
  if (room.owner !== username) return res.status(403).json({ ok: false, error: "Only owner can change room icon" });
  if (room.iconUrl) {
    const fpOld = path.join(storageDir, path.basename(room.iconUrl));
    try { fs.unlinkSync(fpOld); } catch {}
  }
  room.iconUrl = `/storage/${req.file.filename}`;
  saveRooms();
  broadcastRooms();
  res.json({ ok: true, room: roomDetail(roomId) });
});


/* == POST FEATURE: Create a new post (with troll detection) == */
app.post("/create-post", upload.single("photo"), async (req, res) => {
  purgeExpiredPosts({ broadcast: true });
  const username = req.body.username;
  if (!username || !users.has(username)) return res.status(401).json({ ok: false, error: "Not authenticated" });
  const text = (req.body.text || "").trim();
  const spoilerText = String(req.body.spoilerText || "") === "1" || req.body.spoilerText === true;
  const spoilerMedia = String(req.body.spoilerMedia || "") === "1" || req.body.spoilerMedia === true;
  if (!text && !req.file) return res.status(400).json({ ok: false, error: "Post must have text or a photo" });

  /* Troll/toxicity detection on post caption */
  if (text) {
    try {
      const classifyResult = await moderation.classifyOnly(text);
      if (classifyResult && classifyResult.blocked) {
        return res.status(403).json({ ok: false, error: classifyResult.reason || "Post blocked for toxic content." });
      }
    } catch(e) { /* moderation unavailable, allow */ }
  }

  const user = users.get(username);
  const id = randomUUID();
  const post = {
    id,
    from: username,
    avatarColor: user.avatarColor || "#2d88ff",
    text: text,
    photoUrl: req.file ? `/storage/${req.file.filename}` : null,
    spoilerText,
    spoilerMedia,
    reactions: { love: [], like: [], dislike: [], funny: [] },
    comments: [],
    ts: Date.now(),
  };
  posts.set(id, post);
  savePosts();
  broadcast({ type: "new-post", post });
  res.json({ ok: true, id });
});

app.post("/upload", upload.single("media"), async (req, res) => {
  if (!req.file) return res.status(400).json({ ok: false, error: "No file" });
  const username = req.body.username;
  if (!username || !users.has(username)) return res.status(401).json({ ok: false, error: "Not authenticated" });
  const scope = req.body.scope;
  const groupName = req.body.group || "";
  const recipient = req.body.recipient || "";
  const roomId = req.body.room || "";
  let roomForSpam = null;
  let roomAdminOrOwner = false;
  if (scope === "group") {
    const grp = groups.get(groupName);
    if (!grp || !grp.members.has(username))
      return res.status(403).json({ ok: false, error: "Not a member of this group" });
  }
  if (scope === "dm" && !recipient)
    return res.status(400).json({ ok: false, error: "No recipient" });
  if (scope === "dm" && isDmBlockedBy(username, recipient))
    return res.status(403).json({ ok: false, error: "You blocked this DM. Unblock before sending messages." });
  if (scope === "room") {
    roomForSpam = rooms.get(roomId);
    if (!roomId || !roomForSpam)
      return res.status(404).json({ ok: false, error: "Room not found" });
    let joined = false;
    for (const c of clients.values()) {
      if (c.username === username && c.joinedRooms && c.joinedRooms.has(roomId)) { joined = true; break; }
    }
    if (!joined) return res.status(403).json({ ok: false, error: "Join this room first" });
    roomAdminOrOwner = isRoomOwnerOrAdmin(roomForSpam, username);
    if (!roomAdminOrOwner && moderation.isManuallyMuted(roomId, username)) {
      return res.status(403).json({
        ok: false,
        error: "You are manually muted by a room admin and cannot send media in this room.",
      });
    }
    const spamCheck = checkRoomSpam(roomId, username, !!roomAdminOrOwner);
    if (!spamCheck.ok) {
      const waitSec = Math.ceil((spamCheck.waitMs || 0) / 1000);
      const minsLeft = Math.ceil((spamCheck.slowRemainingMs || 0) / 60000);
      return res.status(429).json({
        ok: false,
        error: `Slow mode is active due to spam. Send 1 message every 10 seconds. Try again in ${waitSec}s (about ${minsLeft} min left).`,
      });
    }
  }
  const caption = req.body.caption || "";
  const spoilerParsed = parseSpoilerSyntax(caption, req.file.originalname || "");
  const normalizedCaption = spoilerParsed.text;
  const confirmSensitive = String(req.body.confirmSensitive || "") === "1" || req.body.confirmSensitive === true;
  const spoilerText = (String(req.body.spoilerText || "") === "1" || req.body.spoilerText === true) || spoilerParsed.spoilerText;
  const spoilerMedia = (String(req.body.spoilerMedia || "") === "1" || req.body.spoilerMedia === true) || spoilerParsed.spoilerMedia;

  const mentionInfo = resolveMentionUsersForScope({
    text: normalizedCaption,
    scope,
    groupName,
    roomId,
    sender: username,
  });
  if (mentionInfo.requiresSpecialRole) {
    const scopeId = scope === "group" ? groupName : roomId;
    if (!hasGroupOrRoomAdminRole(scope, scopeId, username)) {
      return res.status(403).json({ ok: false, error: "Only owner/admin can use @here or @everyone." });
    }
  }

  if ((scope === "group" || scope === "room") && hasOtpLikeContent(normalizedCaption) && !confirmSensitive) {
    return res.status(409).json({
      ok: false,
      error: "OTP_CONFIRM_REQUIRED",
      message: "This message looks like an OTP (4 or 6 digits). Confirm before sending to group/room.",
    });
  }
  /* Moderation for captions in rooms only (skip admin/owner) */
  if (scope === "room" && normalizedCaption.trim()) {
    const room = roomForSpam || rooms.get(roomId);
    const isAdminOrOwner = roomAdminOrOwner || (room && isRoomOwnerOrAdmin(room, username));
    const senderWs = [...clients.entries()].find(([, c]) => c.username === username)?.[0];
    const roomMode = room
      ? { toxicFilter: room.toxicFilter !== false, trollMode: !!room.trollMode }
      : { toxicFilter: true, trollMode: false };
    const roomMembers = room ? room.members : [];
    const modResult = await moderation.moderate({
      username,
      text: normalizedCaption,
      roomId,
      isAdminOrOwner,
      roomMode,
      roomMembers,
      getRecentMsgs: () => getRecentMessagesForScope("room", roomId, 5),
      sendToSender: (payload) => { if (senderWs) send(senderWs, payload); },
      sendTherapistDM,
      onModerationAction: (action) => {
        if (!action) return;
        addRoomModerationLog({
          roomId,
          username,
          text: normalizedCaption,
          action: action.action,
          reason: action.reason,
        });
      },
    });
    if (senderWs) send(senderWs, { type: "mss-update", mss: modResult.mss, roomId });
    if (modResult.action === "muted") {
      return res.status(403).json({ ok: false, error: modResult.muteLabel
        ? `You are muted (${modResult.muteLabel}). Take a break.`
        : "You are in read-only mode. Take a break." });
    }
    if (modResult.action === "block") {
      return res.status(403).json({ ok: false, error: "Your message was blocked by moderation." });
    }
    moderation.checkRedemption(roomId, username);
  }
  const user = users.get(username);
  const id = randomUUID();
  const isVideo = !!(req.file.mimetype || "").startsWith("video/");
  let replyTo = null;
  try {
    const parsed = req.body.replyTo ? JSON.parse(req.body.replyTo) : null;
    if (parsed && typeof parsed === "object") {
      const from = String(parsed.from || "").trim().slice(0, 40);
      const text = String(parsed.text || "").trim().slice(0, 180);
      const rid = String(parsed.id || "").trim().slice(0, 80);
      if (from || text) replyTo = { id: rid || null, from, text };
    }
  } catch {}
  const msg = {
    id, kind: isVideo ? "video" : "photo", from: username,
    avatarColor: user.avatarColor || "#2d88ff",
    photoUrl: isVideo ? null : `/storage/${req.file.filename}`,
    videoUrl: isVideo ? `/storage/${req.file.filename}` : null,
    spoilerMedia,
    mediaName: req.file.originalname,
    text: normalizedCaption,
    spoilerText,
    scope,
    group: scope === "group" ? groupName : null,
    dm: scope === "dm" ? dmKey(username, recipient) : null,
    recipient: scope === "dm" ? recipient : null,
    room: scope === "room" ? roomId : null,
    roomName: scope === "room" ? (rooms.get(roomId)?.name || "Room") : null,
    mentionUsers: mentionInfo.mentionUsers,
    mentionHere: mentionInfo.mentionHere,
    mentionEveryone: mentionInfo.mentionEveryone,
    replyTo,
    ts: Date.now(),
  };
  if (scope === "dm" && isDmBlockedBy(recipient, username)) {
    msg.hiddenFor = [recipient];
  }
  messages.set(id, msg);
  saveMessages();
  const payload = { type: "new-message", message: msg };
  if (scope === "group") sendToGroup(groupName, payload);
  else if (scope === "dm") {
    sendToUser(username, payload);
    if (recipient !== username && !(msg.hiddenFor && msg.hiddenFor.includes(recipient))) sendToUser(recipient, payload);
  } else if (scope === "room") {
    sendToRoom(roomId, payload);
  }
  res.json({ ok: true, id });
});


wss.on("connection", (ws) => {
  const id = randomUUID();
  clients.set(ws, { id, username: null, userGroups: new Set(), joinedRooms: new Set(), roomActivity: new Map() });
  send(ws, { type: "welcome", id });

  ws.on("message", async (raw) => {
    let msg;
    try { msg = JSON.parse(raw.toString()); } catch { return; }
    const client = clients.get(ws);
    if (!client) return;

    if (msg.type === "auth") {
      const username = (msg.username || "").trim();
      if (!username || !users.has(username))
        return send(ws, { type: "error", error: "Unknown user" });
      client.username = username;
      const user = users.get(username);
      if (!user.dmBlocks || typeof user.dmBlocks !== "object") user.dmBlocks = {};
      client.userGroups = new Set(user.groups || []);
      const userRooms = new Set(Array.isArray(user.roomList) ? user.roomList : []);
      const visible = [...messages.values()].filter((m) => {
        if (m.deletedFor && m.deletedFor.includes(username)) return false;
        if (m.hiddenFor && m.hiddenFor.includes(username)) return false;
        if (m.scope === "group" && m.group && client.userGroups.has(m.group)) return true;
        if (m.scope === "dm" && (m.from === username || m.recipient === username)) return true;
        if (m.scope === "room" && m.room && userRooms.has(m.room)) return true;
        return false;
      }).sort((a, b) => a.ts - b.ts);
      const dmPartners = new Set();
      for (const m of visible)
        if (m.scope === "dm") dmPartners.add(m.from === username ? m.recipient : m.from);
      const mssInfo = moderation.getMSSGlobal(username);
      const roomMSS = moderation.getAllRoomMSS(username);
      send(ws, {
        type: "auth-ok", username,
        avatarColor: user.avatarColor || "#2d88ff",
        groups: user.groups || [],
        allGroups: groupSummaries(),
        onlineUsers: onlineUsers(),
        allUsers: allUsernames(),
        dmPartners: [...dmPartners],
        dmBlockedUsers: Object.keys(user.dmBlocks || {}),
        profiles: allUserProfiles(),
        myProfile: userProfile(user),
        rooms: roomListForUser(username),
        roomCatalog: roomCatalog(),
        joinedRoomIds: [...client.joinedRooms],
        lastLogout: user.lastLogout || 0,
        mss: mssInfo.score,
        roomMSS,
      });
      send(ws, { type: "history", messages: visible });
      /* Send all active posts */
      purgeExpiredPosts({ broadcast: false });
      send(ws, { type: "posts-list", posts: [...posts.values()].sort((a, b) => b.ts - a.ts) });
      broadcastOnline();
      broadcastRooms();
      return;
    }

    if (!client.username) return;

    if (msg.type === "logout") {
      const user = users.get(client.username);
      if (user) {
        const now = Date.now();
        user.lastSeen = now;
        user.lastLogout = now;
        saveUsers();
        broadcast({ type: "user-profile-updated", profile: userProfile(user) });
      }
      return;
    }

    if (msg.type === "dm-block-user") {
      const target = (msg.target || "").trim();
      if (!target || target === client.username || !users.has(target)) return;
      const user = users.get(client.username);
      if (!user.dmBlocks || typeof user.dmBlocks !== "object") user.dmBlocks = {};
      user.dmBlocks[target] = { blockedAt: Date.now() };
      saveUsers();
      send(ws, { type: "dm-blocks-updated", blockedUsers: Object.keys(user.dmBlocks || {}) });
      return;
    }

    if (msg.type === "dm-unblock-user") {
      const target = (msg.target || "").trim();
      if (!target || target === client.username) return;
      const user = users.get(client.username);
      if (!user.dmBlocks || typeof user.dmBlocks !== "object") user.dmBlocks = {};
      delete user.dmBlocks[target];
      saveUsers();
      send(ws, { type: "dm-blocks-updated", blockedUsers: Object.keys(user.dmBlocks || {}) });
      return;
    }

    if (msg.type === "typing") {
      const isTyping = !!msg.isTyping;
      const scope = msg.scope;
      const groupName = (msg.group || "").trim();
      const recipient = (msg.recipient || "").trim();
      const roomId = (msg.room || "").trim();
      const payload = { type: "typing", from: client.username, scope, group: groupName || null, recipient: recipient || null, room: roomId || null, isTyping };
      if (scope === "group") {
        if (!groupName || !client.userGroups.has(groupName)) return;
        sendToGroup(groupName, payload);
      } else if (scope === "dm") {
        if (!recipient) return;
        sendToUser(recipient, payload);
      } else if (scope === "room") {
        if (!roomId || !client.joinedRooms.has(roomId)) return;
        client.roomActivity.set(roomId, Date.now());
        sendToRoom(roomId, payload);
      }
      return;
    }

    if (msg.type === "send-text") {
      const parsedSpoiler = parseSpoilerSyntax(msg.text || "", "");
      const spoilerText = !!msg.spoilerText || parsedSpoiler.spoilerText;
      const parsedEmbed = parseEmbedCommand(parsedSpoiler.text);
      if (parsedEmbed.error) return send(ws, { type: "error", error: parsedEmbed.error });
      const embed = parsedEmbed.embed;
      const text = parsedEmbed.text;
      if (!text) return;
      const scope = msg.scope;
      const groupName = (msg.group || "").trim();
      const recipient = (msg.recipient || "").trim();
      const roomId = (msg.room || "").trim();
      const confirmSensitive = !!msg.confirmSensitive;
      let roomForSpam = null;
      let roomAdminOrOwner = false;
      if (scope === "group") {
        if (!groupName || !client.userGroups.has(groupName)) return;
      } else if (scope === "dm") {
        if (!recipient) return;
        if (isDmBlockedBy(client.username, recipient)) {
          return send(ws, { type: "error", error: "You blocked this DM. Unblock before sending messages." });
        }
      } else if (scope === "room") {
        if (!roomId || !client.joinedRooms.has(roomId)) return;
        client.roomActivity.set(roomId, Date.now());
        roomForSpam = rooms.get(roomId);
        roomAdminOrOwner = roomForSpam && isRoomOwnerOrAdmin(roomForSpam, client.username);
        const spamCheck = checkRoomSpam(roomId, client.username, !!roomAdminOrOwner);
        if (!spamCheck.ok) {
          const waitSec = Math.ceil((spamCheck.waitMs || 0) / 1000);
          const minsLeft = Math.ceil((spamCheck.slowRemainingMs || 0) / 60000);
          send(ws, {
            type: "moderation-warning",
            message: `Slow mode is active due to spam. Send 1 message every 10 seconds. Try again in ${waitSec}s (about ${minsLeft} min left).`,
          });
          return;
        }
        if (spamCheck.justActivated) {
          send(ws, {
            type: "moderation-warning",
            message: "Spam detected: slow mode enabled for 10 minutes (1 message every 10 seconds).",
          });
        }
      } else return;
      if ((scope === "group" || scope === "room") && hasOtpLikeContent(text) && !confirmSensitive) {
        send(ws, {
          type: "otp-confirmation-required",
          action: "send-text",
          payload: {
            scope,
            group: scope === "group" ? groupName : undefined,
            room: scope === "room" ? roomId : undefined,
            recipient: scope === "dm" ? recipient : undefined,
            text,
            spoilerText,
            replyTo: msg.replyTo && typeof msg.replyTo === "object" ? msg.replyTo : undefined,
          },
        });
        return;
      }

      const mentionInfo = resolveMentionUsersForScope({
        text,
        scope,
        groupName,
        roomId,
        sender: client.username,
      });
      if (mentionInfo.requiresSpecialRole) {
        const scopeId = scope === "group" ? groupName : roomId;
        if (!hasGroupOrRoomAdminRole(scope, scopeId, client.username)) {
          return send(ws, { type: "error", error: "Only owner/admin can use @here or @everyone." });
        }
      }

      /* ── Moderation pipeline (rooms only, skip admin/owner) ── */
      if (scope === "room") {
        const room = roomForSpam || rooms.get(roomId);
        const isAdminOrOwner = roomAdminOrOwner || (room && isRoomOwnerOrAdmin(room, client.username));

        if (!isAdminOrOwner && moderation.isManuallyMuted(roomId, client.username)) {
          send(ws, {
            type: "moderation-muted",
            roomId,
            message: "You are manually muted by a room admin. You can read messages but cannot send until unmuted.",
          });
          return;
        }

        const roomMode = room
          ? { toxicFilter: room.toxicFilter !== false, trollMode: !!room.trollMode }
          : { toxicFilter: true, trollMode: false };
        const roomMembers = room ? room.members : [];
        const modResult = await moderation.moderate({
          username: client.username,
          text,
          roomId,
          isAdminOrOwner,
          roomMode,
          roomMembers,
          getRecentMsgs: () => getRecentMessagesForScope("room", roomId, 5),
          sendToSender: (payload) => send(ws, payload),
          sendTherapistDM,
          onModerationAction: (action) => {
            if (!action) return;
            addRoomModerationLog({
              roomId,
              username: client.username,
              text,
              action: action.action,
              reason: action.reason,
            });
          },
        });

        // Send MSS update to sender
        send(ws, { type: "mss-update", mss: modResult.mss, roomId });

        if (modResult.action === "muted") {
          send(ws, { type: "moderation-muted", mss: modResult.mss, roomId,
            message: modResult.muteLabel
              ? `You are muted (${modResult.muteLabel}). Please take a break.`
              : "You are in read-only mode. Please take a break and come back when you feel calmer." });
          return;
        }
        if (modResult.action === "block") {
          return; // already handled inside moderate()
        }

        // Troll-mode bot reply — send AFTER the user's message is posted
        if (modResult.trollReply) {
          setTimeout(() => {
            sendTrollBotMessage(roomId, modResult.trollReply);
          }, 800);  // slight delay for natural feel
        }

        // Check for redemption after therapist DM
        moderation.checkRedemption(roomId, client.username);
      }

      const user = users.get(client.username);
      const id = randomUUID();
      let replyTo = null;
      if (msg.replyTo && typeof msg.replyTo === "object") {
        const from = String(msg.replyTo.from || "").trim().slice(0, 40);
        const text = String(msg.replyTo.text || "").trim().slice(0, 180);
        const rid = String(msg.replyTo.id || "").trim().slice(0, 80);
        if (from || text) replyTo = { id: rid || null, from, text };
      }
      const entry = {
        id, kind: "text", from: client.username,
        avatarColor: user.avatarColor || "#2d88ff",
        text, scope,
        spoilerText,
        embed: embed ? { color: embed.color, text: embed.text } : null,
        group: scope === "group" ? groupName : null,
        dm: scope === "dm" ? dmKey(client.username, recipient) : null,
        recipient: scope === "dm" ? recipient : null,
        room: scope === "room" ? roomId : null,
        roomName: scope === "room" ? (rooms.get(roomId)?.name || "Room") : null,
        mentionUsers: mentionInfo.mentionUsers,
        mentionHere: mentionInfo.mentionHere,
        mentionEveryone: mentionInfo.mentionEveryone,
        replyTo,
        ts: Date.now(),
      };
      if (scope === "dm" && isDmBlockedBy(recipient, client.username)) {
        entry.hiddenFor = [recipient];
      }
      messages.set(id, entry);
      saveMessages();
      const payload = { type: "new-message", message: entry };
      if (scope === "group") sendToGroup(groupName, payload);
      else if (scope === "dm") {
        sendToUser(client.username, payload);
        if (recipient !== client.username && !(entry.hiddenFor && entry.hiddenFor.includes(recipient))) sendToUser(recipient, payload);
      } else if (scope === "room") {
        sendToRoom(roomId, payload);
      }
      return;
    }

    if (msg.type === "create-room") {
      const name = (msg.name || "").trim();
      if (!name) return;
      const id = makeRoomId(name, client.username);
      rooms.set(id, {
        id,
        name,
        owner: client.username,
        admins: new Set(),
        members: new Set([client.username]),
        banned: new Set(),
        description: "",
        iconUrl: "",
        toxicFilter: true,
        trollMode: false,
        ts: Date.now(),
      });
      addRoomToUserList(client.username, id);
      client.joinedRooms.add(id);
      client.roomActivity.set(id, Date.now());
      saveRooms();
      broadcastRooms();
      send(ws, { type: "room-created", room: roomDetail(id) });
      return;
    }

    if (msg.type === "search-rooms") {
      const q = (msg.query || "").trim().toLowerCase();
      const results = roomCatalog().filter(r => !q || r.name.toLowerCase().includes(q));
      send(ws, { type: "room-search-results", query: q, rooms: results.slice(0, 100) });
      return;
    }

    if (msg.type === "join-room") {
      const roomId = (msg.roomId || msg.id || msg.room || "").trim();
      if (!roomId) return;
      const room = rooms.get(roomId);
      if (!room) return send(ws, { type: "error", error: "Room not found" });
      if (room.banned && room.banned.has(client.username)) return send(ws, { type: "error", error: "You are banned from this room" });
      if (client.joinedRooms.has(roomId)) {
        send(ws, { type: "room-joined", room: roomDetail(roomId) });
        return;
      }
      client.joinedRooms.add(roomId);
      client.roomActivity.set(roomId, Date.now());
      if (!room.members) room.members = new Set();
      room.members.add(client.username);
      addRoomToUserList(client.username, roomId);
      saveRooms();
      send(ws, { type: "room-joined", room: roomDetail(roomId) });
      const old = [...messages.values()]
        .filter(m => m.scope === "room" && m.room === roomId && !(m.deletedFor || []).includes(client.username))
        .sort((a, b) => a.ts - b.ts);
      if (old.length) send(ws, { type: "history", messages: old, append: true });
      broadcastRooms();
      return;
    }

    if (msg.type === "leave-room") {
      const roomId = (msg.roomId || msg.id || msg.room || "").trim();
      if (!roomId) return;
      /* Block leaving if user is muted (prevents evasion) */
      if (!moderation.canRemoveRoom(roomId, client.username)) {
        return send(ws, { type: "error", error: "You cannot leave a room while muted. Wait for your mute to expire." });
      }
      client.joinedRooms.delete(roomId);
      client.roomActivity.delete(roomId);
      send(ws, { type: "room-left", roomId });
      broadcastRooms();
      return;
    }

    if (msg.type === "room-activity") {
      const roomId = (msg.roomId || msg.room || "").trim();
      if (!roomId || !client.joinedRooms.has(roomId)) return;
      client.roomActivity.set(roomId, Date.now());
      return;
    }

    if (msg.type === "room-detail") {
      const roomId = (msg.roomId || msg.id || msg.room || "").trim();
      const detail = roomDetail(roomId);
      if (!detail) return;
      send(ws, { type: "room-detail", room: detail });
      return;
    }

    if (msg.type === "room-profile") {
      const roomId = (msg.roomId || msg.room || "").trim();
      if (!roomId || !rooms.has(roomId)) return;
      const room = rooms.get(roomId);
      if (!isRoomOwnerOrAdmin(room, client.username)) {
        return send(ws, { type: "error", error: "Only room owner/admin can update room profile" });
      }
      if (typeof msg.description === "string") room.description = msg.description.slice(0, 200);
      saveRooms();
      broadcastRooms();
      send(ws, { type: "room-detail", room: roomDetail(roomId) });
      return;
    }

    if (msg.type === "room-logs-get") {
      const roomId = (msg.roomId || msg.room || "").trim();
      if (!roomId) return;
      const room = rooms.get(roomId);
      if (!room) return;
      if (!isRoomOwnerOrAdmin(room, client.username)) {
        return send(ws, { type: "error", error: "Only room owner/admin can access moderation logs" });
      }
      send(ws, {
        type: "room-logs",
        roomId,
        logs: getRoomModerationLogs(roomId),
      });
      return;
    }

    if (msg.type === "room-log-delete") {
      const roomId = (msg.roomId || msg.room || "").trim();
      const logId = (msg.logId || "").trim();
      if (!roomId || !logId) return;
      const room = rooms.get(roomId);
      if (!room) return;
      if (!isRoomOwnerOrAdmin(room, client.username)) {
        return send(ws, { type: "error", error: "Only room owner/admin can manage moderation logs" });
      }
      const log = roomModerationLogs.get(logId);
      if (!log || log.roomId !== roomId) return;
      roomModerationLogs.delete(logId);
      saveRoomModerationLogs();
      send(ws, {
        type: "room-logs",
        roomId,
        logs: getRoomModerationLogs(roomId),
      });
      return;
    }

    if (msg.type === "room-logs-clear") {
      const roomId = (msg.roomId || msg.room || "").trim();
      if (!roomId) return;
      const room = rooms.get(roomId);
      if (!room) return;
      if (!isRoomOwnerOrAdmin(room, client.username)) {
        return send(ws, { type: "error", error: "Only room owner/admin can manage moderation logs" });
      }
      for (const [logId, entry] of roomModerationLogs.entries()) {
        if (entry.roomId === roomId) roomModerationLogs.delete(logId);
      }
      saveRoomModerationLogs();
      send(ws, {
        type: "room-logs",
        roomId,
        logs: [],
      });
      return;
    }

    if (msg.type === "room-remove-from-list") {
      const roomId = (msg.roomId || "").trim();
      if (!roomId) return;
      const room = rooms.get(roomId);
      if (!room) return;
      if (room.owner === client.username) return send(ws, { type: "error", error: "Owner cannot remove own room from list" });
      /* Block removal if user is currently muted in this room (prevents evasion) */
      if (!moderation.canRemoveRoom(roomId, client.username)) {
        return send(ws, { type: "error", error: "You cannot leave a room while muted. Wait for your mute to expire." });
      }
      const list = ensureUserRoomList(client.username);
      const next = list.filter(id => id !== roomId);
      users.get(client.username).roomList = next;
      if (room.members) room.members.delete(client.username);
      if (room.admins) room.admins.delete(client.username);
      if (client.joinedRooms && client.joinedRooms.has(roomId)) {
        client.joinedRooms.delete(roomId);
        client.roomActivity?.delete(roomId);
        send(ws, { type: "room-left", roomId, reason: "removed-list" });
      }
      saveUsers();
      saveRooms();
      broadcastRooms();
      return;
    }

    if (msg.type === "room-promote-admin") {
      const roomId = (msg.roomId || "").trim();
      const target = (msg.target || "").trim();
      if (!roomId || !target) return;
      const room = rooms.get(roomId);
      if (!room) return;
      if (room.owner !== client.username) return send(ws, { type: "error", error: "Only owner can promote admins" });
      if (target === room.owner) return send(ws, { type: "error", error: "Cannot change owner role" });
      if (!room.members || !room.members.has(target)) return send(ws, { type: "error", error: "User not in room member list" });
      if (!room.admins) room.admins = new Set();
      room.admins.add(target);
      saveRooms();
      broadcastRooms();
      send(ws, { type: "room-detail", room: roomDetail(roomId) });
      return;
    }

    if (msg.type === "room-demote-admin") {
      const roomId = (msg.roomId || "").trim();
      const target = (msg.target || "").trim();
      if (!roomId || !target) return;
      const room = rooms.get(roomId);
      if (!room) return;
      if (room.owner !== client.username) return send(ws, { type: "error", error: "Only owner can demote admins" });
      if (room.admins) room.admins.delete(target);
      saveRooms();
      broadcastRooms();
      send(ws, { type: "room-detail", room: roomDetail(roomId) });
      return;
    }

    /* ── Room unmute (admin/owner only) ───────────────────── */
    if (msg.type === "room-mute-member") {
      const roomId = (msg.roomId || "").trim();
      const target = (msg.target || "").trim();
      if (!roomId || !target) return;
      const rawDuration = msg.durationMinutes;
      const durationMinutes = rawDuration === null || rawDuration === undefined || rawDuration === ""
        ? null
        : Number(rawDuration);
      const room = rooms.get(roomId);
      if (!room) return;
      if (!isRoomOwnerOrAdmin(room, client.username)) {
        return send(ws, { type: "error", error: "Only room admins or owner can mute users" });
      }
      if (target === room.owner) {
        return send(ws, { type: "error", error: "Cannot mute the room owner" });
      }
      if (target === client.username) {
        return send(ws, { type: "error", error: "Cannot mute yourself" });
      }
      if (room.admins && room.admins.has(target) && room.owner !== client.username) {
        return send(ws, { type: "error", error: "Only owner can mute admins" });
      }
      if (durationMinutes !== null && (!Number.isFinite(durationMinutes) || durationMinutes < 1 || durationMinutes > 43_200)) {
        return send(ws, { type: "error", error: "Invalid mute duration selected" });
      }

      const durationMs = durationMinutes === null ? null : Math.round(durationMinutes * 60_000);
      const muteInfo = moderation.muteUserManual(roomId, target, durationMs);
      const rec = moderation.getMSS(roomId, target);
      sendToUser(target, { type: "mss-update", mss: rec.score, roomId });
      const muteLabel = muteInfo.forever
        ? "forever"
        : `${Math.max(1, Math.ceil((muteInfo.muteUntil - Date.now()) / 60_000))} minute(s)`;
      sendToUser(target, {
        type: "moderation-muted",
        mss: rec.score,
        roomId,
        message: `You were muted in #${room.name} by ${client.username} for ${muteLabel}.`,
      });

      for (const [cws, c] of clients.entries()) {
        if (c.username && isRoomOwnerOrAdmin(room, c.username)) {
          send(cws, { type: "room-detail", room: roomDetail(roomId) });
        }
      }
      return;
    }

    if (msg.type === "room-unmute") {
      const roomId = (msg.roomId || "").trim();
      const target = (msg.target || "").trim();
      if (!roomId || !target) return;
      const room = rooms.get(roomId);
      if (!room) return;
      if (!isRoomOwnerOrAdmin(room, client.username)) {
        return send(ws, { type: "error", error: "Only room admins or owner can unmute users" });
      }
      const newScore = moderation.unmuteUser(roomId, target);
      // Notify the unmuted user
      sendToUser(target, { type: "mss-update", mss: newScore, roomId });
      sendToUser(target, { type: "moderation-unmuted", roomId, message: "An admin has unmuted you. Please be respectful." });
      for (const [cws, c] of clients.entries()) {
        if (c.username && isRoomOwnerOrAdmin(room, c.username)) {
          send(cws, { type: "room-detail", room: roomDetail(roomId) });
        }
      }
      return;
    }

    /* ── Toggle Toxic Filter / Troll Mode (owner only, mutually exclusive) ── */
    if (msg.type === "room-toggle-toxic-filter") {
      const roomId = (msg.roomId || "").trim();
      if (!roomId) return;
      const room = rooms.get(roomId);
      if (!room) return;
      if (room.owner !== client.username) return send(ws, { type: "error", error: "Only the room owner can toggle moderation modes" });
      const val = !!msg.value;
      room.toxicFilter = val;
      if (val) room.trollMode = false;  // mutually exclusive
      saveRooms();
      broadcastRooms();
      sendToRoom(roomId, { type: "room-mode-update", roomId, toxicFilter: room.toxicFilter, trollMode: room.trollMode });
      send(ws, { type: "room-detail", room: roomDetail(roomId) });
      return;
    }

    if (msg.type === "room-toggle-troll-mode") {
      const roomId = (msg.roomId || "").trim();
      if (!roomId) return;
      const room = rooms.get(roomId);
      if (!room) return;
      if (room.owner !== client.username) return send(ws, { type: "error", error: "Only the room owner can toggle moderation modes" });
      const val = !!msg.value;
      room.trollMode = val;
      if (val) room.toxicFilter = false;  // mutually exclusive
      saveRooms();
      broadcastRooms();
      sendToRoom(roomId, { type: "room-mode-update", roomId, toxicFilter: room.toxicFilter, trollMode: room.trollMode });
      send(ws, { type: "room-detail", room: roomDetail(roomId) });
      return;
    }

    if (msg.type === "room-kick-member") {
      const roomId = (msg.roomId || "").trim();
      const target = (msg.target || "").trim();
      if (!roomId || !target) return;
      const room = rooms.get(roomId);
      if (!room) return;
      if (!isRoomOwnerOrAdmin(room, client.username)) return send(ws, { type: "error", error: "Not allowed" });
      if (target === room.owner) return send(ws, { type: "error", error: "Cannot kick the owner" });
      if (room.admins && room.admins.has(target) && room.owner !== client.username)
        return send(ws, { type: "error", error: "Only owner can kick admins" });

      if (room.members) room.members.delete(target);
      if (room.admins) room.admins.delete(target);
      saveRooms();

      for (const [cws, c] of clients.entries()) {
        if (c.username === target) {
          c.joinedRooms.delete(roomId);
          c.roomActivity?.delete(roomId);
          send(cws, { type: "room-left", roomId, reason: "kicked" });
        }
      }
      broadcastRooms();
      send(ws, { type: "room-detail", room: roomDetail(roomId) });
      return;
    }

    if (msg.type === "room-ban-member") {
      const roomId = (msg.roomId || "").trim();
      const target = (msg.target || "").trim();
      if (!roomId || !target) return;
      const room = rooms.get(roomId);
      if (!room) return;
      if (!isRoomOwnerOrAdmin(room, client.username)) return send(ws, { type: "error", error: "Not allowed" });
      if (target === room.owner) return send(ws, { type: "error", error: "Cannot ban the owner" });
      if (room.admins && room.admins.has(target) && room.owner !== client.username)
        return send(ws, { type: "error", error: "Only owner can ban admins" });

      if (!room.banned) room.banned = new Set();
      room.banned.add(target);
      if (room.members) room.members.delete(target);
      if (room.admins) room.admins.delete(target);

      for (const [cws, c] of clients.entries()) {
        if (c.username === target) {
          c.joinedRooms.delete(roomId);
          c.roomActivity?.delete(roomId);
          send(cws, { type: "room-left", roomId, reason: "banned" });
        }
      }
      saveRooms();
      broadcastRooms();
      send(ws, { type: "room-detail", room: roomDetail(roomId) });
      return;
    }

    if (msg.type === "room-unban-member") {
      const roomId = (msg.roomId || "").trim();
      const target = (msg.target || "").trim();
      if (!roomId || !target) return;
      const room = rooms.get(roomId);
      if (!room) return;
      if (!isRoomOwnerOrAdmin(room, client.username)) return send(ws, { type: "error", error: "Not allowed" });
      if (room.banned) room.banned.delete(target);
      saveRooms();
      broadcastRooms();
      send(ws, { type: "room-detail", room: roomDetail(roomId) });
      return;
    }

    if (msg.type === "room-delete") {
      const roomId = (msg.roomId || "").trim();
      if (!roomId) return;
      const room = rooms.get(roomId);
      if (!room) return;
      if (room.owner !== client.username) return send(ws, { type: "error", error: "Only owner can delete room" });

      for (const [id, entry] of messages) {
        if (entry.scope === "room" && entry.room === roomId) {
          if ((entry.kind === "photo" && entry.photoUrl) || (entry.kind === "video" && entry.videoUrl)) {
            const mediaUrl = entry.kind === "video" ? entry.videoUrl : entry.photoUrl;
            const fp = path.join(storageDir, path.basename(mediaUrl));
            try { fs.unlinkSync(fp); } catch {}
          }
          messages.delete(id);
        }
      }
      if (room.iconUrl) {
        const fpIcon = path.join(storageDir, path.basename(room.iconUrl));
        try { fs.unlinkSync(fpIcon); } catch {}
      }

      for (const [cws, c] of clients.entries()) {
        if (c.joinedRooms && c.joinedRooms.has(roomId)) {
          c.joinedRooms.delete(roomId);
          c.roomActivity?.delete(roomId);
          send(cws, { type: "room-left", roomId, reason: "deleted" });
        }
      }

      for (const u of users.values()) {
        if (!Array.isArray(u.roomList)) continue;
        u.roomList = u.roomList.filter(id => id !== roomId);
      }

      for (const [logId, entry] of roomModerationLogs.entries()) {
        if (entry.roomId === roomId) roomModerationLogs.delete(logId);
      }

      rooms.delete(roomId);
      saveMessages();
      saveRooms();
      saveUsers();
      saveRoomModerationLogs();
      broadcast({ type: "room-deleted", roomId });
      broadcastRooms();
      return;
    }

    if (msg.type === "room-icon-delete") {
      const roomId = (msg.roomId || "").trim();
      if (!roomId) return;
      const room = rooms.get(roomId);
      if (!room) return;
      if (room.owner !== client.username) return send(ws, { type: "error", error: "Only owner can manage room icon" });
      if (room.iconUrl) {
        const fp = path.join(storageDir, path.basename(room.iconUrl));
        try { fs.unlinkSync(fp); } catch {}
      }
      room.iconUrl = "";
      saveRooms();
      broadcastRooms();
      send(ws, { type: "room-detail", room: roomDetail(roomId) });
      return;
    }

    if (msg.type === "room-purge") {
      const roomId = (msg.roomId || "").trim();
      if (!roomId) return;
      const room = rooms.get(roomId);
      if (!room) return;
      if (!isRoomOwnerOrAdmin(room, client.username)) return send(ws, { type: "error", error: "Not allowed" });
      for (const [id, entry] of messages) {
        if (entry.scope === "room" && entry.room === roomId) {
          if ((entry.kind === "photo" && entry.photoUrl) || (entry.kind === "video" && entry.videoUrl)) {
            const mediaUrl = entry.kind === "video" ? entry.videoUrl : entry.photoUrl;
            const fp = path.join(storageDir, path.basename(mediaUrl));
            try { fs.unlinkSync(fp); } catch {}
          }
          messages.delete(id);
        }
      }
      saveMessages();
      sendToRoom(roomId, { type: "room-purged", roomId, by: client.username });
      broadcastRooms();
      return;
    }

    if (msg.type === "create-group") {
      const name = (msg.name || "").trim();
      if (!name) return;
      if (groups.has(name)) return send(ws, { type: "error", error: "Group name taken" });
      const code = randomUUID().slice(0, 8);
      groups.set(name, {
        code, owner: client.username,
        admins: new Set(), members: new Set([client.username]),
        banned: new Set(), pendingRequests: new Set(),
        requireApproval: false, description: "", pfpUrl: "",
      });
      client.userGroups.add(name);
      const user = users.get(client.username);
      if (!user.groups) user.groups = [];
      if (!user.groups.includes(name)) user.groups.push(name);
      saveUsers(); saveGroups();
      send(ws, { type: "group-created", name, code });
      broadcastGroups();
      return;
    }

    if (msg.type === "join-group") {
      const name = (msg.name || "").trim();
      const code = (msg.code || "").trim();
      if (!name || !code) return;
      const grp = groups.get(name);
      if (!grp) return send(ws, { type: "error", error: "Group not found" });
      if (grp.code !== code) return send(ws, { type: "error", error: "Wrong code" });
      if (grp.banned && grp.banned.has(client.username))
        return send(ws, { type: "error", error: "You are banned from this group" });
      if (grp.members.has(client.username))
        return send(ws, { type: "error", error: "Already a member" });
      if (grp.requireApproval) {
        if (!grp.pendingRequests) grp.pendingRequests = new Set();
        grp.pendingRequests.add(client.username);
        saveGroups();
        send(ws, { type: "error", error: "Join request sent. Waiting for approval." });
        return;
      }
      grp.members.add(client.username);
      client.userGroups.add(name);
      const user = users.get(client.username);
      if (!user.groups) user.groups = [];
      if (!user.groups.includes(name)) user.groups.push(name);
      saveUsers(); saveGroups();
      send(ws, { type: "group-joined", name });
      broadcastGroups();
      const old = [...messages.values()]
        .filter(m => m.scope === "group" && m.group === name)
        .sort((a, b) => a.ts - b.ts);
      if (old.length) send(ws, { type: "history", messages: old, append: true });
      emitGroupSystemMsg(name, client.username + " joined the group");
      return;
    }

    if (msg.type === "leave-group") {
      const name = (msg.group || msg.name || "").trim();
      if (!name) return;
      const grp = groups.get(name);
      let ownerLeaveHandled = false;
      let newOwnerName = null;
      if (grp) {
        grp.members.delete(client.username);
        if (grp.admins) grp.admins.delete(client.username);

        /* Ownership transfer: last active admin -> last active member -> delete */
        if (grp.owner === client.username) {
          const isUserOnline = (u) => {
            for (const c of clients.values()) if (c.username === u) return true;
            return false;
          };
          const getLastSeen = (u) => {
            const ud = users.get(u);
            return ud ? (ud.lastSeen || 0) : 0;
          };
          const pickBestCandidate = (candidates) => {
            const onlineCandidates = [...candidates].filter(isUserOnline);
            if (onlineCandidates.length) return onlineCandidates.sort((a, b) => a.localeCompare(b))[0];
            const sorted = [...candidates].sort((a, b) => getLastSeen(b) - getLastSeen(a));
            return sorted.length ? sorted[0] : null;
          };

          if (grp.admins && grp.admins.size > 0) {
            const newOwner = pickBestCandidate(grp.admins);
            if (newOwner) {
              grp.owner = newOwner;
              grp.admins.delete(newOwner);
              ownerLeaveHandled = true;
              newOwnerName = newOwner;
            }
          } else if (grp.members.size > 0) {
            const newOwner = pickBestCandidate(grp.members);
            if (newOwner) {
              grp.owner = newOwner;
              ownerLeaveHandled = true;
              newOwnerName = newOwner;
            }
          } else {
            /* No members left — destroy group and its messages */
            for (const [id, entry] of messages) {
              if (entry.scope === "group" && entry.group === name) {
                if ((entry.kind === "photo" && entry.photoUrl) || (entry.kind === "video" && entry.videoUrl)) {
                  const mediaUrl = entry.kind === "video" ? entry.videoUrl : entry.photoUrl;
                  const fp = path.join(storageDir, path.basename(mediaUrl));
                  try { fs.unlinkSync(fp); } catch {}
                }
                messages.delete(id);
              }
            }
            saveMessages();
            if (grp.pfpUrl) {
              const fp = path.join(storageDir, path.basename(grp.pfpUrl));
              try { fs.unlinkSync(fp); } catch {}
            }
            groups.delete(name);
          }
        }
        saveGroups();
      }
      client.userGroups.delete(name);
      const user = users.get(client.username);
      if (user?.groups) user.groups = user.groups.filter(g => g !== name);
      saveUsers();
      if (groups.has(name) && !ownerLeaveHandled) {
        emitGroupSystemMsg(name, client.username + " left the group");
      } else if (groups.has(name) && ownerLeaveHandled && newOwnerName) {
        emitGroupSystemMsg(name, client.username + " left the group");
        emitGroupSystemMsg(name, newOwnerName + " is now the group owner");
      }
      send(ws, { type: "group-left", name });
      broadcastGroups();
      return;
    }

    /* == Admin: Promote to admin == */
    if (msg.type === "promote-admin") {
      const name = (msg.group || "").trim();
      const target = (msg.target || "").trim();
      if (!name || !target) return;
      const grp = groups.get(name);
      if (!grp) return;
      if (!isOwnerOrAdmin(grp, client.username))
        return send(ws, { type: "error", error: "Not allowed" });
      if (target === grp.owner) return send(ws, { type: "error", error: "Cannot change owner role" });
      if (!grp.members.has(target)) return send(ws, { type: "error", error: "User not in group" });
      if (!grp.admins) grp.admins = new Set();
      grp.admins.add(target);
      saveGroups();
      emitGroupSystemMsg(name, target + " was promoted to admin");
      broadcastGroups();
      sendGroupDetail(ws, name);
      return;
    }

    /* == Admin: Demote admin == */
    if (msg.type === "demote-admin") {
      const name = (msg.group || "").trim();
      const target = (msg.target || "").trim();
      if (!name || !target) return;
      const grp = groups.get(name);
      if (!grp) return;
      if (grp.owner !== client.username)
        return send(ws, { type: "error", error: "Only the owner can demote admins" });
      if (grp.admins) grp.admins.delete(target);
      saveGroups();
      emitGroupSystemMsg(name, target + " was demoted from admin");
      broadcastGroups();
      sendGroupDetail(ws, name);
      return;
    }

    /* == Admin: Kick member == */
    if (msg.type === "kick-member") {
      const name = (msg.group || "").trim();
      const target = (msg.target || "").trim();
      if (!name || !target) return;
      const grp = groups.get(name);
      if (!grp) return;
      if (!isOwnerOrAdmin(grp, client.username))
        return send(ws, { type: "error", error: "Not allowed" });
      if (target === grp.owner) return send(ws, { type: "error", error: "Cannot kick the owner" });
      if (grp.admins && grp.admins.has(target) && grp.owner !== client.username)
        return send(ws, { type: "error", error: "Only owner can kick admins" });
      emitGroupSystemMsg(name, target + " was kicked from the group");
      grp.members.delete(target);
      if (grp.admins) grp.admins.delete(target);
      saveGroups();
      const tUser = users.get(target);
      if (tUser?.groups) { tUser.groups = tUser.groups.filter(g => g !== name); saveUsers(); }
      sendToUser(target, { type: "group-left", name });
      for (const [cws, c] of clients.entries()) {
        if (c.username === target) c.userGroups.delete(name);
      }
      broadcastGroups();
      sendGroupDetail(ws, name);
      return;
    }

    /* == Admin: Ban member == */
    if (msg.type === "ban-member") {
      const name = (msg.group || "").trim();
      const target = (msg.target || "").trim();
      if (!name || !target) return;
      const grp = groups.get(name);
      if (!grp) return;
      if (!isOwnerOrAdmin(grp, client.username))
        return send(ws, { type: "error", error: "Not allowed" });
      if (target === grp.owner) return send(ws, { type: "error", error: "Cannot ban the owner" });
      if (grp.admins && grp.admins.has(target) && grp.owner !== client.username)
        return send(ws, { type: "error", error: "Only owner can ban admins" });
      grp.members.delete(target);
      if (grp.admins) grp.admins.delete(target);
      if (!grp.banned) grp.banned = new Set();
      grp.banned.add(target);
      saveGroups();
      emitGroupSystemMsg(name, target + " was banned from the group");
      const tUser = users.get(target);
      if (tUser?.groups) { tUser.groups = tUser.groups.filter(g => g !== name); saveUsers(); }
      sendToUser(target, { type: "group-left", name });
      for (const [cws, c] of clients.entries()) {
        if (c.username === target) c.userGroups.delete(name);
      }
      broadcastGroups();
      sendGroupDetail(ws, name);
      return;
    }

    /* == Admin: Unban member == */
    if (msg.type === "unban-member") {
      const name = (msg.group || "").trim();
      const target = (msg.target || "").trim();
      if (!name || !target) return;
      const grp = groups.get(name);
      if (!grp) return;
      if (!isOwnerOrAdmin(grp, client.username))
        return send(ws, { type: "error", error: "Not allowed" });
      if (grp.banned) grp.banned.delete(target);
      saveGroups();
      sendGroupDetail(ws, name);
      return;
    }

    /* == Admin: Approve join request == */
    if (msg.type === "approve-request") {
      const name = (msg.group || "").trim();
      const target = (msg.target || "").trim();
      if (!name || !target) return;
      const grp = groups.get(name);
      if (!grp) return;
      if (!isOwnerOrAdmin(grp, client.username))
        return send(ws, { type: "error", error: "Not allowed" });
      if (!grp.pendingRequests) return;
      grp.pendingRequests.delete(target);
      grp.members.add(target);
      saveGroups();
      const tUser = users.get(target);
      if (tUser) {
        if (!tUser.groups) tUser.groups = [];
        if (!tUser.groups.includes(name)) tUser.groups.push(name);
        saveUsers();
      }
      for (const [cws, c] of clients.entries()) {
        if (c.username === target) {
          c.userGroups.add(name);
          send(cws, { type: "group-joined", name });
          const old = [...messages.values()]
            .filter(m => m.scope === "group" && m.group === name)
            .sort((a, b) => a.ts - b.ts);
          if (old.length) send(cws, { type: "history", messages: old, append: true });
        }
      }
      emitGroupSystemMsg(name, target + " joined the group");
      broadcastGroups();
      sendGroupDetail(ws, name);
      return;
    }

    /* == Admin: Reject join request == */
    if (msg.type === "reject-request") {
      const name = (msg.group || "").trim();
      const target = (msg.target || "").trim();
      if (!name || !target) return;
      const grp = groups.get(name);
      if (!grp) return;
      if (!isOwnerOrAdmin(grp, client.username))
        return send(ws, { type: "error", error: "Not allowed" });
      if (grp.pendingRequests) grp.pendingRequests.delete(target);
      saveGroups();
      sendGroupDetail(ws, name);
      return;
    }

    /* == Admin: Toggle require approval == */
    if (msg.type === "toggle-approval") {
      const name = (msg.group || "").trim();
      if (!name) return;
      const grp = groups.get(name);
      if (!grp) return;
      if (!isOwnerOrAdmin(grp, client.username))
        return send(ws, { type: "error", error: "Not allowed" });
      grp.requireApproval = !!msg.requireApproval;
      saveGroups();
      sendGroupDetail(ws, name);
      return;
    }

    if (msg.type === "delete-for-me") {
      const id = msg.id;
      const entry = messages.get(id);
      if (!entry) return;
      if (entry.scope === "room") return;
      if (!entry.deletedFor) entry.deletedFor = [];
      if (!entry.deletedFor.includes(client.username)) entry.deletedFor.push(client.username);

      /* Check if ALL participants have now deleted this message */
      let allDeleted = false;
      if (entry.scope === "group" && entry.group) {
        const grp = groups.get(entry.group);
        if (grp) allDeleted = [...grp.members].every(u => (entry.deletedFor || []).includes(u));
      } else if (entry.scope === "dm") {
        allDeleted = (entry.deletedFor || []).includes(entry.from)
                  && (entry.deletedFor || []).includes(entry.recipient);
      }
      if (allDeleted || entry.deletedForEveryone) {
        if ((entry.kind === "photo" && entry.photoUrl) || (entry.kind === "video" && entry.videoUrl)) {
          const mediaUrl = entry.kind === "video" ? entry.videoUrl : entry.photoUrl;
          const fp = path.join(storageDir, path.basename(mediaUrl));
          try { fs.unlinkSync(fp); } catch {}
        }
        messages.delete(id);
      }

      saveMessages();
      send(ws, { type: "message-deleted", id });
      return;
    }

    if (msg.type === "delete-for-everyone") {
      const id = msg.id;
      const entry = messages.get(id);
      if (!entry) return;
      /* Allow: message author OR owner/admin in group chat */
      let allowed = (entry.from === client.username);
      if (!allowed && entry.scope === "group" && entry.group) {
        const grp = groups.get(entry.group);
        if (grp && isOwnerOrAdmin(grp, client.username)) {
          if (entry.from === grp.owner && client.username !== grp.owner) allowed = false;
          else allowed = true;
        }
      }
      if (!allowed && entry.scope === "room" && entry.room) {
        const room = rooms.get(entry.room);
        if (room && isRoomOwnerOrAdmin(room, client.username)) {
          if (entry.from === room.owner && client.username !== room.owner) allowed = false;
          else allowed = true;
        }
      }
      if (!allowed) return;
      if ((entry.kind === "photo" && entry.photoUrl) || (entry.kind === "video" && entry.videoUrl)) {
        const mediaUrl = entry.kind === "video" ? entry.videoUrl : entry.photoUrl;
        const filename = path.basename(mediaUrl);
        const fp = path.join(storageDir, filename);
        try { fs.unlinkSync(fp); } catch {}
      }
      entry.deletedForEveryone = true;
      entry.deletedBy = client.username;
      entry.kind = "text";
      entry.photoUrl = null;
      entry.videoUrl = null;
      entry.mediaName = null;
      entry.text = "";
      saveMessages();
      const payload = { type: "message-deleted-for-all", id, deletedBy: client.username };
      if (entry.scope === "group") sendToGroup(entry.group, payload);
      else if (entry.scope === "dm") {
        sendToUser(entry.from, payload);
        if (entry.recipient !== entry.from) sendToUser(entry.recipient, payload);
      } else if (entry.scope === "room") {
        sendToRoom(entry.room, payload);
      }
      return;
    }

    if (msg.type === "edit-message") {
      const id = (msg.id || "").trim();
      const text = (msg.text || "").trim();
      if (!id) return;
      const entry = messages.get(id);
      if (!entry || entry.deletedForEveryone) return;
      if (entry.from !== client.username) return;
      /* Prevent editing messages older than 1 hour */
      if (Date.now() - entry.ts > 3600000) {
        return send(ws, { type: "error", error: "Cannot edit messages older than 1 hour" });
      }
      entry.text = text.slice(0, 4000);
      entry.editedAt = Date.now();
      saveMessages();
      const payload = { type: "message-edited", id: entry.id, text: entry.text, editedAt: entry.editedAt };
      if (entry.scope === "group") sendToGroup(entry.group, payload);
      else if (entry.scope === "dm") {
        sendToUser(entry.from, payload);
        if (entry.recipient !== entry.from) sendToUser(entry.recipient, payload);
      } else if (entry.scope === "room") {
        sendToRoom(entry.room, payload);
      }
      return;
    }

    if (msg.type === "clear-chat") {
      const convType = msg.convType;
      const convName = msg.convName;
      if (convType === "room") {
        const room = rooms.get(convName);
        if (!room) return send(ws, { type: "error", error: "Room not found" });
        if (!isRoomOwnerOrAdmin(room, client.username)) return send(ws, { type: "error", error: "Only room owner/admin can purge" });
        for (const [id, entry] of messages) {
          if (entry.scope === "room" && entry.room === convName) {
            if ((entry.kind === "photo" && entry.photoUrl) || (entry.kind === "video" && entry.videoUrl)) {
              const mediaUrl = entry.kind === "video" ? entry.videoUrl : entry.photoUrl;
              const fp = path.join(storageDir, path.basename(mediaUrl));
              try { fs.unlinkSync(fp); } catch {}
            }
            messages.delete(id);
          }
        }
        saveMessages();
        sendToRoom(convName, { type: "room-purged", roomId: convName, by: client.username });
        return;
      }
      const cleared = [];
      for (const [id, entry] of messages) {
        let match = false;
        if (convType === "group" && entry.scope === "group" && entry.group === convName) match = true;
        if (convType === "dm" && entry.scope === "dm" && entry.dm === dmKey(client.username, convName)) match = true;
        if (convType === "room" && entry.scope === "room" && entry.room === convName) match = true;
        if (match) {
          if (!entry.deletedFor) entry.deletedFor = [];
          if (!entry.deletedFor.includes(client.username)) entry.deletedFor.push(client.username);
          cleared.push(id);
        }
      }
      if (cleared.length) {
        /* Remove messages+photos that ALL participants have deleted */
        for (const id of cleared) {
          const entry = messages.get(id);
          if (!entry) continue;
          let allDeleted = false;
          if (entry.scope === "group" && entry.group) {
            const grp = groups.get(entry.group);
            if (grp) allDeleted = [...grp.members].every(u => (entry.deletedFor || []).includes(u));
          } else if (entry.scope === "dm") {
            allDeleted = (entry.deletedFor || []).includes(entry.from) && (entry.deletedFor || []).includes(entry.recipient);
          } else if (entry.scope === "room") {
            allDeleted = false;
          }
          if (allDeleted || entry.deletedForEveryone) {
            if ((entry.kind === "photo" && entry.photoUrl) || (entry.kind === "video" && entry.videoUrl)) {
              const mediaUrl = entry.kind === "video" ? entry.videoUrl : entry.photoUrl;
              const fp = path.join(storageDir, path.basename(mediaUrl));
              try { fs.unlinkSync(fp); } catch {}
            }
            messages.delete(id);
          }
        }
        saveMessages();
      }
      send(ws, { type: "chat-cleared", convType, convName, ids: cleared });
      return;
    }

    /* == WS: group-profile (description update) == */
    if (msg.type === "group-profile") {
      const name = (msg.group || "").trim();
      if (!name || !groups.has(name)) return;
      const grp = groups.get(name);
      if (!isOwnerOrAdmin(grp, client.username))
        return send(ws, { type: "error", error: "Not allowed" });
      if (typeof msg.description === "string") grp.description = msg.description.slice(0, 200);
      saveGroups();
      const summary = { name, owner: grp.owner, admins: [...(grp.admins || [])], memberCount: grp.members.size, description: grp.description || "", pfpUrl: grp.pfpUrl || "" };
      broadcast({ type: "group-profile-updated", group: summary });
      sendGroupDetail(ws, name);
      return;
    }

    if (msg.type === "rename-group") {
      const oldName = (msg.group || "").trim();
      const newName = (msg.newName || "").trim();
      if (!oldName || !newName || oldName === newName) return;
      if (!groups.has(oldName)) return;
      if (groups.has(newName)) return send(ws, { type: "error", error: "Group name taken" });
      const grp = groups.get(oldName);
      if (!isOwnerOrAdmin(grp, client.username)) return send(ws, { type: "error", error: "Not allowed" });

      groups.delete(oldName);
      groups.set(newName, grp);

      for (const user of users.values()) {
        if (!Array.isArray(user.groups)) continue;
        if (user.groups.includes(oldName)) {
          user.groups = user.groups.map(g => g === oldName ? newName : g);
        }
      }

      for (const c of clients.values()) {
        if (c.userGroups && c.userGroups.has(oldName)) {
          c.userGroups.delete(oldName);
          c.userGroups.add(newName);
        }
      }

      for (const entry of messages.values()) {
        if (entry.scope === "group" && entry.group === oldName) entry.group = newName;
      }

      saveUsers();
      saveGroups();
      saveMessages();
      broadcast({ type: "group-renamed", oldName, newName });
      broadcastGroups();
      sendGroupDetail(ws, newName);
      return;
    }

    /* == WS: group-avatar == */
    if (msg.type === "group-avatar") {
      const name = (msg.group || "").trim();
      if (!name || !groups.has(name)) return;
      const grp = groups.get(name);
      if (!isOwnerOrAdmin(grp, client.username))
        return send(ws, { type: "error", error: "Not allowed" });
      if (msg.avatar) grp.pfpUrl = msg.avatar;
      saveGroups();
      const summary = { name, owner: grp.owner, admins: [...(grp.admins || [])], memberCount: grp.members.size, description: grp.description || "", pfpUrl: grp.pfpUrl || "" };
      broadcast({ type: "group-profile-updated", group: summary });
      sendGroupDetail(ws, name);
      return;
    }

    /* == WS: group-avatar-delete == */
    if (msg.type === "group-avatar-delete") {
      const name = (msg.group || "").trim();
      if (!name || !groups.has(name)) return;
      const grp = groups.get(name);
      if (!isOwnerOrAdmin(grp, client.username))
        return send(ws, { type: "error", error: "Not allowed" });
      if (grp.pfpUrl) {
        const fp = path.join(storageDir, path.basename(grp.pfpUrl));
        try { fs.unlinkSync(fp); } catch {}
        grp.pfpUrl = "";
      }
      saveGroups();
      const summary = { name, owner: grp.owner, admins: [...(grp.admins || [])], memberCount: grp.members.size, description: grp.description || "", pfpUrl: "" };
      broadcast({ type: "group-profile-updated", group: summary });
      sendGroupDetail(ws, name);
      return;
    }

    if (msg.type === "group-detail") {
      const name = (msg.group || msg.name || "").trim();
      sendGroupDetail(ws, name);
      return;
    }

    /* == POSTS: react to a post == */
    if (msg.type === "post-react") {
      purgeExpiredPosts({ broadcast: true });
      const postId = (msg.postId || "").trim();
      const reaction = msg.reaction; // love | like | dislike | funny
      if (!postId || !["love","like","dislike","funny"].includes(reaction)) return;
      const post = posts.get(postId);
      if (!post) return;
      if (!post.reactions) post.reactions = { love: [], like: [], dislike: [], funny: [] };
      if (!post.reactions[reaction]) post.reactions[reaction] = [];
      const idx = post.reactions[reaction].indexOf(client.username);
      if (idx === -1) post.reactions[reaction].push(client.username);
      else post.reactions[reaction].splice(idx, 1);
      savePosts();
      broadcast({ type: "post-updated", post });
      return;
    }

    /* == POSTS: add a comment (with troll detection) == */
    if (msg.type === "post-comment") {
      purgeExpiredPosts({ broadcast: true });
      const postId = (msg.postId || "").trim();
      const text = (msg.text || "").trim();
      const spoilerText = !!msg.spoilerText;
      if (!postId || !text) return;
      const post = posts.get(postId);
      if (!post) return;
      if (!post.comments) post.comments = [];

      /* Troll/toxicity detection on comment */
      try {
        const classifyResult = await moderation.classifyOnly(text);
        if (classifyResult && classifyResult.blocked) {
          send(ws, { type: "moderation-warning", message: classifyResult.reason || "Your comment was blocked for being toxic." });
          return;
        }
        if (classifyResult && classifyResult.flagged) {
          send(ws, { type: "moderation-warning", message: classifyResult.reason || "Your comment was flagged. Please keep it respectful." });
        }
      } catch(e) { /* moderation unavailable, allow */ }

      const user = users.get(client.username);
      post.comments.push({
        id: randomUUID(),
        from: client.username,
        avatarColor: user.avatarColor || "#2d88ff",
        text,
        spoilerText,
        ts: Date.now(),
      });
      savePosts();
      broadcast({ type: "post-updated", post });
      return;
    }

    /* == POSTS: delete a comment (only comment author) == */
    if (msg.type === "delete-comment") {
      purgeExpiredPosts({ broadcast: true });
      const postId = (msg.postId || "").trim();
      const commentId = (msg.commentId || "").trim();
      if (!postId || !commentId) return;
      const post = posts.get(postId);
      if (!post || !post.comments) return;
      const cidx = post.comments.findIndex(c => c.id === commentId);
      if (cidx === -1) return;
      if (post.comments[cidx].from !== client.username) return;
      post.comments.splice(cidx, 1);
      savePosts();
      broadcast({ type: "post-updated", post });
      return;
    }

    /* == Transfer group ownership == */
    if (msg.type === "transfer-group-ownership") {
      const name = (msg.group || "").trim();
      const target = (msg.target || "").trim();
      if (!name || !target) return;
      const grp = groups.get(name);
      if (!grp) return;
      if (grp.owner !== client.username) return send(ws, { type: "error", error: "Only the owner can transfer ownership" });
      if (!grp.members.has(target)) return send(ws, { type: "error", error: "Target is not a group member" });
      if (!(grp.admins && grp.admins.has(target))) return send(ws, { type: "error", error: "Target must be an admin to receive ownership" });
      grp.admins.delete(target);
      grp.admins.add(client.username); // demote old owner to admin
      grp.owner = target;
      saveGroups();
      emitGroupSystemMsg(name, client.username + " transferred ownership to " + target);
      broadcastGroups();
      sendGroupDetail(ws, name);
      for (const [cws, c] of clients.entries()) {
        if (c.username && grp.members.has(c.username)) sendGroupDetail(cws, name);
      }
      return;
    }

    /* == Transfer room ownership == */
    if (msg.type === "transfer-room-ownership") {
      const roomId = (msg.roomId || "").trim();
      const target = (msg.target || "").trim();
      if (!roomId || !target) return;
      const room = rooms.get(roomId);
      if (!room) return;
      if (room.owner !== client.username) return send(ws, { type: "error", error: "Only the owner can transfer ownership" });
      if (!room.admins || !room.admins.has(target)) return send(ws, { type: "error", error: "Target must be an admin" });
      room.admins.delete(target);
      room.admins.add(client.username); // demote old owner to admin
      room.owner = target;
      saveRooms();
      broadcastRooms();
      send(ws, { type: "room-detail", room: roomDetail(roomId) });
      return;
    }

    /* == Delete group forever (owner only) == */
    if (msg.type === "delete-group") {
      const name = (msg.group || "").trim();
      if (!name) return;
      const grp = groups.get(name);
      if (!grp) return;
      if (grp.owner !== client.username) return send(ws, { type: "error", error: "Only the owner can delete the group" });
      // Delete all group messages and media
      for (const [id, entry] of messages) {
        if (entry.scope === "group" && entry.group === name) {
          if ((entry.kind === "photo" && entry.photoUrl) || (entry.kind === "video" && entry.videoUrl)) {
            const mediaUrl = entry.kind === "video" ? entry.videoUrl : entry.photoUrl;
            const fp = path.join(storageDir, path.basename(mediaUrl));
            try { fs.unlinkSync(fp); } catch {}
          }
          messages.delete(id);
        }
      }
      saveMessages();
      if (grp.pfpUrl) {
        const fp = path.join(storageDir, path.basename(grp.pfpUrl));
        try { fs.unlinkSync(fp); } catch {}
      }
      // Remove group from all users
      for (const u of users.values()) {
        if (Array.isArray(u.groups)) u.groups = u.groups.filter(g => g !== name);
      }
      saveUsers();
      // Notify all members
      for (const [cws, c] of clients.entries()) {
        if (c.username && grp.members.has(c.username)) {
          c.userGroups.delete(name);
          send(cws, { type: "group-left", name });
        }
      }
      groups.delete(name);
      saveGroups();
      broadcastGroups();
      return;
    }

    /* == POSTS: delete a post (only author) == */
    if (msg.type === "delete-post") {
      purgeExpiredPosts({ broadcast: true });
      const postId = (msg.postId || "").trim();
      if (!postId) return;
      const post = posts.get(postId);
      if (!post) return;
      if (post.from !== client.username) return;
      if (post.photoUrl) {
        const fp = path.join(storageDir, path.basename(post.photoUrl));
        try { fs.unlinkSync(fp); } catch {}
      }
      posts.delete(postId);
      savePosts();
      broadcast({ type: "post-deleted", postId });
      return;
    }
  });

  ws.on("close", () => {
    const c = clients.get(ws);
    if (c && c.username) {
      const user = users.get(c.username);
      if (user) {
        user.lastSeen = Date.now();
        saveUsers();
        broadcast({ type: "user-profile-updated", profile: userProfile(user) });
      }
    }
    const hadRooms = !!(c && c.joinedRooms && c.joinedRooms.size);
    clients.delete(ws);
    broadcastOnline();
    if (hadRooms) broadcastRooms();
  });
});

setInterval(() => {
  const now = Date.now();
  let changed = false;
  for (const [ws, c] of clients.entries()) {
    if (!c.username || !c.joinedRooms || !c.joinedRooms.size) continue;
    for (const roomId of [...c.joinedRooms]) {
      const last = c.roomActivity?.get(roomId) || 0;
      if (now - last < ROOM_IDLE_MS) continue;
      c.joinedRooms.delete(roomId);
      c.roomActivity?.delete(roomId);
      send(ws, { type: "room-left", roomId, reason: "afk" });
      changed = true;
    }
  }
  if (changed) broadcastRooms();
}, 60 * 1000);

setInterval(() => {
  purgeExpiredPosts({ broadcast: true });
}, 30 * 1000);


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`BunChat -> http://localhost:${PORT}`));
