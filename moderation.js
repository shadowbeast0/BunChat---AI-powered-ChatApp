/**
 * =============================================================
 *  BunChat Moderation – Node.js thin client  (v2 – rooms-only)
 * =============================================================
 *  All AI inference runs in the companion Python service
 *  (moderation_service.py on port 5050).
 *
 *  This module keeps:
 *    - MSS (Mental-State Score) per user PER ROOM – persistent to disk
 *    - Progressive muting  (warn → 5 min → 1 h → 6 h → ...)
 *    - Repeat-paste detection (same toxic hash → auto-mute)
 *    - Admin / Owner bypass  (skip moderation entirely)
 *    - Rate-limiter (leaky bucket)
 *    - HTTP calls to the Python service for classify / judge / therapist
 * =============================================================
 */

const crypto = require("crypto");
const db     = require("./db");

const PYTHON_URL = process.env.MODERATION_URL || "http://localhost:5050";

// ─── Thresholds & scoring constants ─────────────────────────
const MSS_DEFAULT          = 100;
const MSS_MINOR            = -5;    // Layer-2 trolling
const MSS_MAJOR            = -20;   // Layer-1 hate-speech block
const MSS_REDEMPTION       = 15;    // calm reply after therapist
const MSS_RECOVERY_PER_MSG = 1;     // +1 per clean message  (need 30 clean for one toxic)
//  1 toxic = MSS_MAJOR(-20) → need 20 clean msgs to recover, but we also
//  subtract MSS_MINOR(-5) for lighter offences. Effective ratio ≈ 1:20-30.

const MSS_IRRITATION  = 80;   // therapist triggers below this
const MSS_MUTE        = 40;   // read-only below this

const RATE_LIMIT_MSGS      = 5;
const RATE_LIMIT_WINDOW_MS = 10_000;
const CONTEXT_WINDOW       = 5;

// ─── Progressive mute durations (ms) – each re-offence doubles ──
const MUTE_DURATIONS = [
  5  * 60_000,   // 1st mute: 5 minutes
  60 * 60_000,   // 2nd mute: 1 hour
  6  * 60 * 60_000,  // 3rd mute: 6 hours
  24 * 60 * 60_000,  // 4th+: 24 hours
];

// ─── Repeat-paste detection ────────────────────────────────
const REPEAT_WINDOW_MS = 5 * 60_000;  // 5-minute window
const REPEAT_MAX       = 2;           // 2 same-hash toxic messages → auto-mute

// ====================================================================
//  Persistent state  –  key = "roomId::username"
// ====================================================================
/**
 * Each record: {
 *   score: number,                // MSS 0-100
 *   lastCleanTs: number,          // timestamp of last clean message
 *   muteCount: number,            // how many times user has been progressively muted
 *   muteUntil: number|null,       // timestamp when current mute expires (null = not muted)
 *   manualMute: boolean,          // room admin/owner manual mute flag
 *   manualMuteUntil: number|null, // null = forever manual mute
 *   toxicHashes: [{hash,ts}],     // recent toxic message hashes for repeat detection
 * }
 */
let roomScores = {};  // { "roomId::username": record }

function _loadScores() {
  try {
    roomScores = db.loadModerationScores();
  } catch (e) {
    console.error("[Moderation] Failed to load scores:", e.message);
    roomScores = {};
  }
}

let _savePending = false;
function _saveScores() {
  if (_savePending) return;
  _savePending = true;
  setImmediate(() => {
    _savePending = false;
    try {
      db.syncModerationScores(roomScores);
    } catch (e) {
      console.error("[Moderation] Failed to save scores:", e.message);
    }
  });
}

// Load on startup
_loadScores();

// ─── Record accessors ───────────────────────────────────────
function _key(roomId, username) { return `${roomId}::${username}`; }

function getRecord(roomId, username) {
  const k = _key(roomId, username);
  if (!roomScores[k]) {
    roomScores[k] = {
      score: MSS_DEFAULT,
      lastCleanTs: Date.now(),
      muteCount: 0,
      muteUntil: null,
      manualMute: false,
      manualMuteUntil: null,
      toxicHashes: [],
    };
  } else {
    if (typeof roomScores[k].manualMute !== "boolean") roomScores[k].manualMute = false;
    if (typeof roomScores[k].manualMuteUntil !== "number") roomScores[k].manualMuteUntil = null;
    if (!Array.isArray(roomScores[k].toxicHashes)) roomScores[k].toxicHashes = [];
    if (typeof roomScores[k].muteCount !== "number") roomScores[k].muteCount = 0;
    if (typeof roomScores[k].score !== "number") roomScores[k].score = MSS_DEFAULT;
  }
  return roomScores[k];
}

// ====================================================================
//  MSS helpers  (per-room)
// ====================================================================
function getMSS(roomId, username) {
  const rec = getRecord(roomId, username);
  return rec;
}

function getMSSGlobal(username) {
  // Return lowest MSS across all rooms for this user (used for auth summary)
  let lowest = MSS_DEFAULT;
  for (const k of Object.keys(roomScores)) {
    if (k.endsWith(`::${username}`)) {
      lowest = Math.min(lowest, roomScores[k].score);
    }
  }
  return { score: lowest };
}

function applyMSS(roomId, username, delta) {
  const rec = getRecord(roomId, username);
  rec.score = Math.max(0, Math.min(MSS_DEFAULT, rec.score + delta));
  rec.lastCleanTs = Date.now();
  _saveScores();
  return rec.score;
}

function isMuted(roomId, username) {
  const rec = getRecord(roomId, username);
  if (rec.manualMute) {
    if (!rec.manualMuteUntil) return true;
    if (Date.now() < rec.manualMuteUntil) return true;
    rec.manualMute = false;
    rec.manualMuteUntil = null;
    _saveScores();
  }
  if (rec.muteUntil && Date.now() < rec.muteUntil) return true;
  if (rec.muteUntil && Date.now() >= rec.muteUntil) {
    // Mute expired – partially restore score so they can chat but stay on thin ice
    rec.muteUntil = null;
    rec.score = Math.max(rec.score, MSS_MUTE + 5);
    _saveScores();
  }
  return rec.score < MSS_MUTE;
}

function isManuallyMuted(roomId, username) {
  const rec = getRecord(roomId, username);
  if (rec.manualMute && rec.manualMuteUntil && Date.now() >= rec.manualMuteUntil) {
    rec.manualMute = false;
    rec.manualMuteUntil = null;
    _saveScores();
  }
  return !!rec.manualMute;
}

function isUserMutedInAnyRoom(username) {
  for (const k of Object.keys(roomScores)) {
    if (k.endsWith(`::${username}`)) {
      const rec = roomScores[k];
      if (rec.muteUntil && Date.now() < rec.muteUntil) return true;
      if (rec.score < MSS_MUTE) return true;
    }
  }
  return false;
}

function canRemoveRoom(roomId, username) {
  // Manual mutes should persist even after leaving/removing and rejoining the room.
  if (isManuallyMuted(roomId, username)) return true;
  // Returns false for moderation-triggered mutes (prevents evasion)
  return !isMuted(roomId, username);
}

function muteUserManual(roomId, username, durationMs) {
  const rec = getRecord(roomId, username);
  rec.manualMute = true;
  rec.manualMuteUntil = Number.isFinite(durationMs) && durationMs > 0
    ? Date.now() + durationMs
    : null;
  _saveScores();
  return {
    score: rec.score,
    muteUntil: rec.manualMuteUntil,
    forever: !rec.manualMuteUntil,
  };
}

function unmuteUser(roomId, username) {
  const rec = getRecord(roomId, username);
  rec.manualMute = false;
  rec.manualMuteUntil = null;
  rec.muteUntil = null;
  rec.score = Math.max(rec.score, MSS_MUTE + 10);  // Just above mute threshold
  // Do NOT reset muteCount – keeps progressive escalation history
  _saveScores();
  return rec.score;
}

// ─── Progressive muting ─────────────────────────────────────
function applyProgressiveMute(roomId, username) {
  const rec = getRecord(roomId, username);
  const idx = Math.min(rec.muteCount, MUTE_DURATIONS.length - 1);
  const duration = MUTE_DURATIONS[idx];
  rec.muteUntil = Date.now() + duration;
  rec.muteCount++;
  _saveScores();
  const mins = Math.round(duration / 60_000);
  const label = mins >= 60 ? `${Math.round(mins / 60)} hour(s)` : `${mins} minute(s)`;
  return { duration, label };
}

// ─── Repeat-paste detection ─────────────────────────────────
function _textHash(text) {
  return crypto.createHash("md5").update(text.trim().toLowerCase()).digest("hex");
}

function checkRepeatToxic(roomId, username, text) {
  const rec = getRecord(roomId, username);
  const hash = _textHash(text);
  const now = Date.now();

  // Clean old entries
  rec.toxicHashes = (rec.toxicHashes || []).filter(h => now - h.ts < REPEAT_WINDOW_MS);

  // Check count of same hash
  const sameCount = rec.toxicHashes.filter(h => h.hash === hash).length;

  // Record this one
  rec.toxicHashes.push({ hash, ts: now });
  _saveScores();

  return sameCount >= REPEAT_MAX;  // true = should auto-mute
}

// ====================================================================
//  Rate-Limiter ("Leaky Bucket")
// ====================================================================
const rateBuckets = new Map();  // username → [timestamps]

function checkRateLimit(username) {
  const now = Date.now();
  if (!rateBuckets.has(username)) rateBuckets.set(username, []);
  const bucket = rateBuckets.get(username);
  while (bucket.length && bucket[0] < now - RATE_LIMIT_WINDOW_MS) bucket.shift();
  bucket.push(now);
  return bucket.length > RATE_LIMIT_MSGS;
}

// ====================================================================
//  Therapist tracking
// ====================================================================
const therapistSentTs = new Map(); // username → last therapist DM ts

// ====================================================================
//  HTTP helpers – call Python moderation service
// ====================================================================

async function pyClassify(text) {
  try {
    const resp = await fetch(`${PYTHON_URL}/classify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    return await resp.json();  // { label, score, verdict, details }
  } catch (e) {
    console.error("[Moderation] Python /classify error:", e.message);
    return { label: "error", score: 0, verdict: "safe" }; // fail-open
  }
}

async function pyJudge(text, context, username) {
  try {
    const resp = await fetch(`${PYTHON_URL}/judge`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, context, username }),
    });
    const data = await resp.json();
    return data.verdict || "fun";
  } catch (e) {
    console.error("[Moderation] Python /judge error:", e.message);
    return "fun"; // fail-open
  }
}

async function pyTherapist(username, toxicMsg, context) {
  try {
    const resp = await fetch(`${PYTHON_URL}/therapist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, toxicMsg, context }),
    });
    const data = await resp.json();
    return data.dm || null;
  } catch (e) {
    console.error("[Moderation] Python /therapist error:", e.message);
    return null;
  }
}

async function pyTroll(trollMsg, trollerName, targetName, context) {
  try {
    const resp = await fetch(`${PYTHON_URL}/troll`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trollMsg, trollerName, targetName, context }),
    });
    const data = await resp.json();
    return data.reply || null;
  } catch (e) {
    console.error("[Moderation] Python /troll error:", e.message);
    return null;
  }
}

// ─── Troll-mode counters (per room) ─────────────────────────
const trollCounters = new Map();  // roomId → number

// ====================================================================
//  MAIN PIPELINE  –  called for every ROOM message only
// ====================================================================

/**
 * @param {object} opts
 * @param {string}   opts.username
 * @param {string}   opts.text
 * @param {string}   opts.roomId         – room id
 * @param {boolean}  opts.isAdminOrOwner – true → skip moderation
 * @param {object}   opts.roomMode       – { toxicFilter: bool, trollMode: bool }
 * @param {string[]} opts.roomMembers    – list of usernames in the room (for target detection)
 * @param {function} opts.getRecentMsgs  – () => string[]
 * @param {function} opts.sendToSender   – (payload) => void
 * @param {function} opts.sendTherapistDM – (username, dmText) => void
 * @param {function} [opts.onModerationAction] – ({ action, reason }) => void
 *
 * @returns {Promise<{action:"pass"|"block"|"muted", mss:number, muteLabel?:string, trollReply?:string}>}
 */
async function moderate(opts) {
  const { username, text, roomId, isAdminOrOwner, roomMode, roomMembers,
          getRecentMsgs, sendToSender, sendTherapistDM, onModerationAction } = opts;

  const toxicFilter = roomMode ? roomMode.toxicFilter : true;
  const trollMode   = roomMode ? roomMode.trollMode   : false;

  // ── Both OFF → no moderation at all ────────────────────────
  if (!toxicFilter && !trollMode) {
    const rec = getRecord(roomId, username);
    return { action: "pass", mss: rec.score };
  }

  // ── 0. Admin/Owner bypass ──────────────────────────────────
  if (isAdminOrOwner) {
    const rec = getRecord(roomId, username);
    return { action: "pass", mss: rec.score };
  }

  // ══════════════════════════════════════════════════════════
  //  TROLL MODE  –  detect trolling, count, respond every 3rd
  // ══════════════════════════════════════════════════════════
  if (trollMode) {
    const rec = getRecord(roomId, username);

    // Still classify to detect if the message is trolling
    const l1 = await pyClassify(text);
    let isTrolling = (l1.verdict === "block");

    if (l1.verdict === "suspicious") {
      const contextTexts = getRecentMsgs().slice(-CONTEXT_WINDOW);
      const verdict = await pyJudge(text, contextTexts, username);
      isTrolling = (verdict === "trolling");
    }

    if (isTrolling) {
      // Increment troll counter for this room
      const count = (trollCounters.get(roomId) || 0) + 1;
      trollCounters.set(roomId, count);

      // Every 3rd troll message → BunBot joins in
      if (count % 3 === 0) {
        // Detect target: check if any room member's name appears in the text
        let targetName = "";
        if (roomMembers && roomMembers.length) {
          const lower = text.toLowerCase();
          for (const member of roomMembers) {
            if (member !== username && lower.includes(member.toLowerCase())) {
              targetName = member;
              break;
            }
          }
        }

        const contextTexts = getRecentMsgs().slice(-CONTEXT_WINDOW);
        const trollReply = await pyTroll(text, username, targetName, contextTexts);
        return { action: "pass", mss: rec.score, trollReply: trollReply || null };
      }
    }

    return { action: "pass", mss: rec.score };
  }

  // ══════════════════════════════════════════════════════════
  //  TOXIC FILTER (existing behaviour)
  // ══════════════════════════════════════════════════════════

  // ── 1. Mute check ─────────────────────────────────────────
  if (isMuted(roomId, username)) {
    const rec = getRecord(roomId, username);
    const remaining = rec.muteUntil ? Math.max(0, rec.muteUntil - Date.now()) : 0;
    const mins = Math.ceil(remaining / 60_000);
    return {
      action: "muted",
      mss: rec.score,
      muteLabel: remaining > 0 ? `${mins} minute(s) remaining` : "score too low",
    };
  }

  // ── 2. Rate-limiter ────────────────────────────────────────
  const spamming = checkRateLimit(username);

  // ── 3. Layer-1 Reflex (Python ensemble) ────────────────────
  const l1 = await pyClassify(text);

  // BLOCK – blatant hate speech
  if (l1.verdict === "block") {
    // Check repeat-paste → auto-mute on repeats
    const repeatAutoMute = checkRepeatToxic(roomId, username, text);

    const newScore = applyMSS(roomId, username, MSS_MAJOR);

    const blockReason = "Your message was not delivered because it was flagged as harmful content.";
    sendToSender({
      type: "moderation-block",
      reason: blockReason,
      mss: newScore,
      roomId,
    });
    if (typeof onModerationAction === "function") {
      onModerationAction({ action: "blocked", reason: blockReason });
    }

    // Progressive mute if score fell below threshold OR repeat spam detected
    if (newScore < MSS_MUTE || repeatAutoMute) {
      const muteInfo = applyProgressiveMute(roomId, username);
      sendToSender({
        type: "moderation-muted",
        mss: newScore,
        roomId,
        message: repeatAutoMute
          ? `You have been muted for ${muteInfo.label} for repeatedly sending toxic messages.`
          : `You have been muted for ${muteInfo.label}. Please take a break.`,
      });
    }

    if (newScore < MSS_IRRITATION) {
      triggerTherapist(username, text, getRecentMsgs(), sendTherapistDM);
    }
    return { action: "block", mss: newScore };
  }

  // SAFE – let it through, award tiny recovery
  if (l1.verdict === "safe" && !spamming) {
    const rec = getRecord(roomId, username);
    // Recovery: +1 per clean message (so ~20-30 clean messages to undo one toxic)
    if (rec.score < MSS_DEFAULT) {
      applyMSS(roomId, username, MSS_RECOVERY_PER_MSG);
    }
    rec.lastCleanTs = Date.now();
    return { action: "pass", mss: rec.score };
  }

  // SUSPICIOUS (or spamming) – allow optimistic UI, trigger Layer-2 async
  const mss = getRecord(roomId, username).score;

  setImmediate(async () => {
    try {
      const contextTexts = getRecentMsgs().slice(-CONTEXT_WINDOW);
      const verdict = await pyJudge(text, contextTexts, username);

      if (verdict === "trolling") {
        const repeatAutoMute = checkRepeatToxic(roomId, username, text);
        const newScore = applyMSS(roomId, username, MSS_MINOR);
        const flagReason = "Your message was flagged for trolling or abusive intent by the moderation bot.";

        sendToSender({
          type: "moderation-flag",
          messageText: text,
          reason: flagReason,
          mss: newScore,
          roomId,
        });
        if (typeof onModerationAction === "function") {
          onModerationAction({ action: "flagged", reason: flagReason });
        }

        if (newScore < MSS_MUTE || repeatAutoMute) {
          const muteInfo = applyProgressiveMute(roomId, username);
          sendToSender({
            type: "moderation-muted",
            mss: newScore,
            roomId,
            message: repeatAutoMute
              ? `You have been muted for ${muteInfo.label} for repeatedly sending toxic messages.`
              : `You have been muted for ${muteInfo.label}. Cool down and try again later.`,
          });
        }

        if (newScore < MSS_IRRITATION) {
          triggerTherapist(username, text, contextTexts, sendTherapistDM);
        }
      } else {
        // Clean message – apply tiny recovery
        const rec = getRecord(roomId, username);
        if (rec.score < MSS_DEFAULT) {
          applyMSS(roomId, username, MSS_RECOVERY_PER_MSG);
        }
        rec.lastCleanTs = Date.now();
      }
    } catch (e) {
      console.error("[Moderation] Layer-2 async error:", e.message);
    }
  });

  return { action: "pass", mss };
}

// ====================================================================
//  Therapist trigger (rate-limited: max once every 60s per user)
// ====================================================================
async function triggerTherapist(username, toxicMsg, contextTexts, sendTherapistDM) {
  const now = Date.now();
  const last = therapistSentTs.get(username) || 0;
  if (now - last < 60_000) return;
  therapistSentTs.set(username, now);

  const fallback = `Hey ${username}, things seem a bit intense. Take a quick break and come back refreshed! 🙂`;

  try {
    const dm = await pyTherapist(username, toxicMsg, contextTexts);
    sendTherapistDM(username, dm || fallback);
  } catch (e) {
    console.error("[Moderation] Therapist error:", e.message);
    sendTherapistDM(username, fallback);
  }
}

// ====================================================================
//  Redemption: boost MSS if user calms down after therapist DM
// ====================================================================
function checkRedemption(roomId, username) {
  const last = therapistSentTs.get(username) || 0;
  if (!last) return;
  if (Date.now() - last < 5 * 60_000) {
    applyMSS(roomId, username, MSS_REDEMPTION);
    therapistSentTs.delete(username);
    return true;
  }
  return false;
}

// ====================================================================
//  Get all room MSS for a user (sent on auth)
// ====================================================================
function getAllRoomMSS(username) {
  const out = {};
  for (const k of Object.keys(roomScores)) {
    if (k.endsWith(`::${username}`)) {
      const roomId = k.slice(0, k.indexOf("::"));
      out[roomId] = {
        score: roomScores[k].score,
        muted: isMuted(roomId, username),
        muteUntil: roomScores[k].manualMuteUntil || roomScores[k].muteUntil || null,
      };
    }
  }
  return out;
}

// ====================================================================
//  Lightweight classify-only (for posts/comments — no MSS, no muting)
// ====================================================================
async function classifyOnly(text) {
  if (!text || !text.trim()) return null;
  try {
    const l1 = await pyClassify(text);
    if (l1.verdict === "toxic" || l1.verdict === "hate") {
      return { blocked: true, flagged: false, reason: "Your message was blocked for containing toxic or hateful content." };
    }
    if (l1.verdict === "offensive" || l1.verdict === "flag") {
      return { blocked: false, flagged: true, reason: "Your message may contain inappropriate content. Please keep it respectful." };
    }
    return null;
  } catch (e) {
    return null; // fail-open
  }
}

// ====================================================================
//  Exports
// ====================================================================
module.exports = {
  moderate,
  classifyOnly,
  getMSS,
  getMSSGlobal,
  getAllRoomMSS,
  applyMSS,
  isMuted,
  isManuallyMuted,
  isUserMutedInAnyRoom,
  canRemoveRoom,
  muteUserManual,
  unmuteUser,
  checkRedemption,
  checkRateLimit,
  MSS_DEFAULT,
  MSS_IRRITATION,
  MSS_MUTE,
};
