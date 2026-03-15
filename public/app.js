/* == BunChat client == */

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);


const authScreen    = $("#authScreen");
const appShell      = $("#appShell");
const panelLeft     = document.querySelector(".panel-left");
const leftCollapseBtn = $("#leftCollapseBtn");
const leftExpandBtn = $("#leftExpandBtn");
const usernameInput = $("#usernameInput");
const passwordInput = $("#passwordInput");
const loginBtn      = $("#loginBtn");
const registerBtn   = $("#registerBtn");
const authMsg       = $("#authMsg");
const headerAvatar  = $("#headerAvatar");
const headerUsername = $("#headerUsername");
const headerStatus  = $("#headerStatus");
const logoutBtn     = $("#logoutBtn");
const settingsBtn   = $("#settingsBtn");

const groupConvList = $("#groupConvList");
const dmConvList    = $("#dmConvList");
const roomConvList  = $("#roomConvList");
const dmSearchInput = $("#dmSearchInput");
const groupActionMsg = $("#groupActionMsg");
const roomActionMsg  = $("#roomActionMsg");

/* FAB elements */
const groupFab      = $("#groupFab");
const fabPopupOverlay = $("#fabPopupOverlay");
const fabPopupClose = $("#fabPopupClose");
const fabCreateOption = $("#fabCreateOption");
const fabJoinOption = $("#fabJoinOption");

/* Create group modal */
const createGroupModal = $("#createGroupModal");
const createGroupClose = $("#createGroupClose");
const createGroupNameInput = $("#createGroupNameInput");
const createGroupSubmitBtn = $("#createGroupSubmitBtn");

/* Join group modal */
const joinGroupModal = $("#joinGroupModal");
const joinGroupClose = $("#joinGroupClose");
const joinGroupNameInput = $("#joinGroupNameInput");
const joinGroupCodeInput = $("#joinGroupCodeInput");
const joinGroupSubmitBtn = $("#joinGroupSubmitBtn");

/* Room FAB elements */
const roomFab = $("#roomFab");
const roomFabPopupOverlay = $("#roomFabPopupOverlay");
const roomFabPopupClose = $("#roomFabPopupClose");
const roomFabCreateOption = $("#roomFabCreateOption");
const roomFabSearchOption = $("#roomFabSearchOption");

/* Create room modal */
const createRoomModal = $("#createRoomModal");
const createRoomClose = $("#createRoomClose");
const createRoomNameInput = $("#createRoomNameInput");
const createRoomSubmitBtn = $("#createRoomSubmitBtn");

/* Search room modal */
const searchRoomModal = $("#searchRoomModal");
const searchRoomClose = $("#searchRoomClose");
const searchRoomInput = $("#searchRoomInput");
const searchRoomResults = $("#searchRoomResults");

/* Room info modal */
const roomInfoModal = $("#roomInfoModal");
const roomInfoClose = $("#roomInfoClose");
const modalRoomName = $("#modalRoomName");
const modalRoomAvatar = $("#modalRoomAvatar");
const roomAvatarFile = $("#roomAvatarFile");
const modalRoomOwner = $("#modalRoomOwner");
const modalRoomOnline = $("#modalRoomOnline");
const modalRoomDesc = $("#modalRoomDesc");
const modalRoomDescInput = $("#modalRoomDescInput");
const modalRoomDescSave = $("#modalRoomDescSave");
const modalRoomAdmins = $("#modalRoomAdmins");
const modalRoomOnlineUsers = $("#modalRoomOnlineUsers");
const modalRoomMembers = $("#modalRoomMembers");
const roomPurgeBtn = $("#roomPurgeBtn");
const roomLogsBtn = $("#roomLogsBtn");
const leaveRoomBtn = $("#leaveRoomBtn");
const roomDeleteBtn = $("#roomDeleteBtn");
const roomLogsModal = $("#roomLogsModal");
const roomLogsClose = $("#roomLogsClose");
const roomLogsDoneBtn = $("#roomLogsDoneBtn");
const roomLogsClearBtn = $("#roomLogsClearBtn");
const roomLogsTitle = $("#roomLogsTitle");
const roomLogsList = $("#roomLogsList");
const roomMemberCtxMenu = $("#roomMemberCtxMenu");
const roomMuteDurationModal = $("#roomMuteDurationModal");
const roomMuteDurationClose = $("#roomMuteDurationClose");
const roomMuteDurationCancel = $("#roomMuteDurationCancel");
const roomMuteDurationConfirm = $("#roomMuteDurationConfirm");
const roomMuteDurationRange = $("#roomMuteDurationRange");
const roomMuteDurationValue = $("#roomMuteDurationValue");
const roomMuteDurationTarget = $("#roomMuteDurationTarget");

/* Room list action modal */
const roomListActionModal = $("#roomListActionModal");
const roomListActionClose = $("#roomListActionClose");
const roomListActionTitle = $("#roomListActionTitle");
const roomListActionText = $("#roomListActionText");
const roomListRemoveBtn = $("#roomListRemoveBtn");
const roomListDeleteBtn = $("#roomListDeleteBtn");
const groupInfoModal = $("#groupInfoModal");
const typingTabBtn = $("#typingTabBtn");
const typingOpenBtn = $("#typingOpenBtn");
const typingArena = $("#typingArena");
const typingWords = $("#typingWords");
const typingHiddenInput = $("#typingHiddenInput");
const typingWpm = $("#typingWpm");
const typingAcc = $("#typingAcc");
const typingTime = $("#typingTime");
const typingRestartBtn = $("#typingRestartBtn");
const typingCloseBtn = $("#typingCloseBtn");
const typingSidebarLeaderboard = $("#typingSidebarLeaderboard");
const typingTestView = $("#typingTestView");
const typingResultView = $("#typingResultView");
const typingGraph = $("#typingGraph");
const typingResultWpm = $("#typingResultWpm");
const typingResultRaw = $("#typingResultRaw");
const typingResultAcc = $("#typingResultAcc");
const typingResultChars = $("#typingResultChars");
const typingResultConsistency = $("#typingResultConsistency");
const typingResultTime = $("#typingResultTime");
const typingResultType = $("#typingResultType");
const panelRight = document.querySelector(".panel-right");

const noChatPlaceholder = $("#noChatPlaceholder");
const chatArea      = $("#chatArea");
const chatAvatar    = $("#chatAvatar");
const chatName      = $("#chatName");
const chatSub       = $("#chatSub");
const chatInfoBtn   = $("#chatInfoBtn");
const chatMessages  = $("#chatMessages");
const chatInputBar  = document.querySelector(".chat-input");
const msgInput      = $("#msgInput");
const spoilerTextToggle = $("#spoilerTextToggle");
const spoilerMediaToggle = $("#spoilerMediaToggle");
const mentionSuggest = $("#mentionSuggest");
const sendBtn       = $("#sendBtn");
const replyContextBar = $("#replyContextBar");
const replyContextName = $("#replyContextName");
const replyContextSnippet = $("#replyContextSnippet");
const cancelReplyBtn = $("#cancelReplyBtn");
const attachBtn     = $("#attachBtn");
const photoFileInput = $("#photoFileInput");
const photoPreviewBar = $("#photoPreviewBar");
const previewImg    = $("#previewImg");
const previewLabel  = $("#previewLabel");
const cancelPreview = $("#cancelPreview");

const clearChatBtn  = $("#clearChatBtn");

const lightbox      = $("#lightbox");
const lightboxImg   = $("#lightboxImg");
const lightboxVideo = $("#lightboxVideo");
const lightboxClose = $("#lightboxClose");

const profileModal  = $("#profileModal");
const profileClose  = $("#profileClose");
const profileAvatar = $("#profileAvatar");
const profileAvatarInput = $("#profileAvatarInput");
const profileAvatarBtn = $("#profileAvatarBtn");
const profileAbout  = $("#profileAbout");
const profileStatus = $("#profileStatus");
const profileSaveBtn = $("#profileSaveBtn");

const userProfileModal = $("#userProfileModal");
const userProfileClose = $("#userProfileClose");
const userProfileName = $("#userProfileName");
const userProfileAvatar = $("#userProfileAvatar");
const userProfileAbout = $("#userProfileAbout");
const userProfileStatus = $("#userProfileStatus");
const userDmBlockBtn = $("#userDmBlockBtn");
const userProfileBanner = $("#userProfileBanner");
const userProfileStatusBadge = $("#userProfileStatusBadge");
const userProfileAboutSection = $("#userProfileAboutSection");
const userProfileGithubSection = $("#userProfileGithubSection");
const userProfileGithubLink = $("#userProfileGithubLink");
const userProfileGithubName = $("#userProfileGithubName");

/* Hidden sequence / hidden chats elements */
const hiddenSequenceModal = $("#hiddenSequenceModal");
const hiddenSequenceClose = $("#hiddenSequenceClose");
const hiddenSequenceInput = $("#hiddenSequenceInput");
const hiddenSequenceDisplay = $("#hiddenSequenceDisplay");
const hiddenSequenceClear = $("#hiddenSequenceClear");
const hiddenSequenceSave = $("#hiddenSequenceSave");
const setSequenceBtn = $("#setSequenceBtn");
const hiddenSequenceRecorder = $("#hiddenSequenceRecorder");
const hiddenTabBtn = $("#hiddenTabBtn");
const hiddenGroupList = $("#hiddenGroupList");
const hiddenDmList = $("#hiddenDmList");

const convHideCtxMenu = $("#convHideCtxMenu");
const ctxToggleHideConv = $("#ctxToggleHideConv");

/* Theme elements */
const themeModal = $("#themeModal");
const themeClose = $("#themeClose");
const otpConfirmModal = $("#otpConfirmModal");
const otpConfirmClose = $("#otpConfirmClose");
const otpConfirmCancel = $("#otpConfirmCancel");
const otpConfirmProceed = $("#otpConfirmProceed");
const otpConfirmText = $("#otpConfirmText");
const actionConfirmModal = $("#actionConfirmModal");
const actionConfirmClose = $("#actionConfirmClose");
const actionConfirmCancel = $("#actionConfirmCancel");
const actionConfirmProceed = $("#actionConfirmProceed");
const actionConfirmTitle = $("#actionConfirmTitle");
const actionConfirmText = $("#actionConfirmText");
const moderationWarningModal = $("#moderationWarningModal");
const moderationWarningClose = $("#moderationWarningClose");
const moderationWarningAcknowledge = $("#moderationWarningAcknowledge");
const moderationWarningText = $("#moderationWarningText");


const state = {
  username: null,
  avatarColor: "#6366f1",
  lastLogout: 0,
  shouldRebuildUnreadFromLogout: false,
  myGroups: new Set(),
  allGroups: [],
  myRooms: [],
  roomCatalog: [],
  joinedRoomIds: new Set(),
  roomDetails: {},
  roomSearchQuery: "",
  onlineUsers: [],
  allUsers: [],
  dmPartners: new Set(),
  dmBlockedUsers: new Set(),
  profiles: new Map(),
  typing: new Map(),
  dmSearch: "",
  unreadCounts: new Map(),
  unreadMentions: new Set(),
  replyTarget: null,
  editingMessageId: null,
  userTextColors: new Map(),
  nextUserTextColorIndex: 0,
  activeChat: null,
  groupProfiles: {},
  mss: 100,
  isMuted: false,
  typingUnlocked: false,
  showHidden: false,
  hiddenGroups: new Set(),
  hiddenDms: new Set(),
};


const convMessages = new Map();
var pendingGroupInfoModal = false;
var pendingGroupInfoName = "";
var activeGroupInfoName = "";
var pendingGroupMemberLoads = new Set();
var otpConfirmResolver = null;
var actionConfirmResolver = null;
var roomMemberCtxPayload = null;
var roomMuteDurationPayload = null;
var roomLogsPayload = { roomId: "", canManage: false, logs: [] };
var convHideCtxPayload = null;

/* ── Hidden chats localStorage helpers ── */
var HIDDEN_GROUPS_KEY = "bunchat-hidden-groups";
var HIDDEN_DMS_KEY = "bunchat-hidden-dms";
var HIDDEN_SEQ_KEY = "bunchat-hidden-sequence";

function loadHiddenState() {
  try {
    var g = JSON.parse(localStorage.getItem(HIDDEN_GROUPS_KEY) || "[]");
    state.hiddenGroups = new Set(g);
  } catch(e) { state.hiddenGroups = new Set(); }
  try {
    var d = JSON.parse(localStorage.getItem(HIDDEN_DMS_KEY) || "[]");
    state.hiddenDms = new Set(d);
  } catch(e) { state.hiddenDms = new Set(); }
  state.showHidden = false;
}
function saveHiddenGroups() {
  localStorage.setItem(HIDDEN_GROUPS_KEY, JSON.stringify([...state.hiddenGroups]));
}
function saveHiddenDms() {
  localStorage.setItem(HIDDEN_DMS_KEY, JSON.stringify([...state.hiddenDms]));
}
function getHiddenSequence() {
  try {
    var raw = localStorage.getItem(HIDDEN_SEQ_KEY);
    if (!raw) return [];
    var parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch(e) { return []; }
}
function setHiddenSequence(seqArr) {
  if (seqArr && seqArr.length) localStorage.setItem(HIDDEN_SEQ_KEY, JSON.stringify(seqArr));
  else localStorage.removeItem(HIDDEN_SEQ_KEY);
}
loadHiddenState();


const USER_TEXT_COLOR_PALETTE = [
  "#f97316",
  "#0ea5e9",
  "#22c55e",
  "#a855f7",
  "#eab308",
  "#ec4899",
  "#06b6d4",
  "#84cc16"
];


let ws;
function connectWS() {
  ws = new WebSocket(location.origin.replace(/^http/, "ws"));
  ws.addEventListener("open", () => {
    if (state.username) wsSend({ type: "auth", username: state.username });
  });
  ws.addEventListener("close", () => setTimeout(connectWS, 2000));
  ws.addEventListener("message", (ev) => handle(JSON.parse(ev.data)));
}
connectWS();
const wsSend = (o) => { if (ws?.readyState === WebSocket.OPEN) ws.send(JSON.stringify(o)); };


function dmKey(a, b) { return [a, b].sort().join("::"); }
function convId(msg) {
  if (msg.scope === "group") return "g:" + msg.group;
  if (msg.scope === "room") return "r:" + msg.room;
  return "d:" + msg.dm;
}

function mediaSnippet(m) {
  if (!m) return "";
  if (m.deletedForEveryone) return "🚫 Message deleted";
  if (m.kind === "photo") return "📷 Photo";
  if (m.kind === "video") return "🎬 Video";
  return esc(m.text || "").substring(0, 40);
}

function plainMessageSnippet(m, maxLen) {
  var text = "";
  if (!m) return text;
  if (m.deletedForEveryone) text = "Message deleted";
  else if (m.kind === "photo") text = "Photo";
  else if (m.kind === "video") text = "Video";
  else text = (m.text || "").trim();
  if (!text) text = "Message";
  if (text.length > maxLen) text = text.slice(0, maxLen) + "…";
  return text;
}

function getUnreadCount(cid) {
  return state.unreadCounts.get(cid) || 0;
}

function normalizeUsername(value) {
  return String(value || "").trim().toLowerCase();
}

function parseMentionedUsernamesFromText(text) {
  var content = String(text || "");
  var out = [];
  var seen = new Set();
  var re = /(^|\s)@([a-zA-Z0-9._-]+)/g;
  var m;
  while ((m = re.exec(content)) !== null) {
    var uname = normalizeUsername(m[2]);
    if (!uname || seen.has(uname)) continue;
    seen.add(uname);
    out.push(uname);
  }
  return out;
}

function detectSpecialPingTokens(scope, text) {
  if (scope !== "group" && scope !== "room") return [];
  var tokens = parseMentionedUsernamesFromText(text);
  var out = [];
  if (tokens.indexOf("here") !== -1) out.push("here");
  if (scope === "group" && tokens.indexOf("everyone") !== -1) out.push("everyone");
  return out;
}

function canCurrentUserUseSpecialPing(scope) {
  if (!state.activeChat || (scope !== "group" && scope !== "room")) return false;
  if (scope === "group") {
    var gp = state.groupProfiles[state.activeChat.name] || state.allGroups.find(function(g) { return g.name === state.activeChat.name; });
    if (!gp) return false;
    return gp.owner === state.username || ((gp.admins || []).indexOf(state.username) !== -1);
  }
  var room = state.roomDetails[state.activeChat.name] || state.myRooms.find(function(r) { return r.id === state.activeChat.name; });
  if (!room) return false;
  return room.owner === state.username || ((room.admins || []).indexOf(state.username) !== -1);
}

function getMessageMentionSet(m) {
  var set = new Set();
  if (m && Array.isArray(m.mentionUsers)) {
    m.mentionUsers.forEach(function(u) {
      var n = normalizeUsername(u);
      if (n) set.add(n);
    });
  } else {
    var tokens = parseMentionedUsernamesFromText(m && m.text);
    var valid = new Set();
    if (m && m.scope === "group") {
      var gp = state.groupProfiles[m.group] || state.allGroups.find(function(g) { return g.name === m.group; });
      if (gp && Array.isArray(gp.members)) gp.members.forEach(function(u) { valid.add(normalizeUsername(u)); });
      tokens.forEach(function(tk) {
        if (tk === "here" || tk === "everyone" || valid.has(tk)) set.add(tk);
      });
    } else if (m && m.scope === "room") {
      var room = state.roomDetails[m.room] || state.myRooms.find(function(r) { return r.id === m.room; });
      var all = [];
      if (room) {
        all = (room.onlineUsers || []).concat(room.offlineUsers || [], room.members || []);
        all.forEach(function(u) { valid.add(normalizeUsername(u)); });
      }
      tokens.forEach(function(tk) {
        if (tk === "here" || valid.has(tk)) set.add(tk);
      });
    } else if (m && m.scope === "dm") {
      valid.add(normalizeUsername(m.from));
      valid.add(normalizeUsername(m.recipient));
      tokens.forEach(function(tk) {
        if (valid.has(tk)) set.add(tk);
      });
    }
  }
  return set;
}

function messageMentionsCurrentUser(m) {
  if (!m || !state.username) return false;
  var mine = normalizeUsername(state.username);
  if (!mine) return false;
  return getMessageMentionSet(m).has(mine);
}

function markdownToHtml(text) {
  var src = String(text || "");
  var safe = esc(src);
  var codeBlocks = [];
  safe = safe.replace(/```([\s\S]*?)```/g, function(_m, code) {
    var idx = codeBlocks.push("<pre class=\"md-code\"><code>" + code.replace(/\n/g, "<br>") + "</code></pre>") - 1;
    return "@@CODEBLOCK_" + idx + "@@";
  });
  safe = safe.replace(/`([^`\n]+)`/g, "<code class=\"md-inline\">$1</code>");
  safe = safe.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  safe = safe.replace(/\*\*([^*\n][\s\S]*?)\*\*/g, "<strong>$1</strong>");
  safe = safe.replace(/(^|[^*])\*([^*\n][\s\S]*?)\*(?!\*)/g, "$1<em>$2</em>");
  safe = safe.replace(/~~([^~\n][\s\S]*?)~~/g, "<del>$1</del>");
  safe = safe.replace(/\|\|([^|\n][\s\S]*?)\|\|/g, '<span class=\"md-spoiler\" data-spoiler=\"1\">$1</span>');
  safe = safe.replace(/^######\s+(.+)$/gm, '<div class="md-h md-h6">$1</div>');
  safe = safe.replace(/^#####\s+(.+)$/gm, '<div class="md-h md-h5">$1</div>');
  safe = safe.replace(/^####\s+(.+)$/gm, '<div class="md-h md-h4">$1</div>');
  safe = safe.replace(/^###\s+(.+)$/gm, '<div class="md-h md-h3">$1</div>');
  safe = safe.replace(/^##\s+(.+)$/gm, '<div class="md-h md-h2">$1</div>');
  safe = safe.replace(/^#\s+(.+)$/gm, '<div class="md-h md-h1">$1</div>');
  safe = safe.replace(/^>\s+(.+)$/gm, '<div class="md-quote">$1</div>');
  safe = safe.replace(/^[-*]\s+(.+)$/gm, '<div class="md-li">• $1</div>');
  safe = safe.replace(/^\d+\.\s+(.+)$/gm, '<div class="md-li md-ol">$1</div>');
  safe = safe.replace(/\n/g, "<br>");
  safe = safe.replace(/@@CODEBLOCK_(\d+)@@/g, function(_m, idx) {
    return codeBlocks[Number(idx)] || "";
  });
  return safe;
}

function formatMessageTextWithMentions(text, message) {
  var mentionSet = getMessageMentionSet(message);
  if (message && message.mentionEveryone && message.scope === "group") mentionSet.add("everyone");
  if (message && message.mentionHere && (message.scope === "group" || message.scope === "room")) mentionSet.add("here");
  var html = markdownToHtml(text);
  return html.replace(/(^|\s)@([a-zA-Z0-9._-]+)/g, function(_full, prefix, uname) {
    var key = normalizeUsername(uname);
    if (!mentionSet.has(key)) return prefix + "@" + uname;
    if (message && message.scope === "room" && key === "everyone") return prefix + "@" + uname;
    return prefix + '<span class="msg-mention">@' + uname + '</span>';
  });
}

function hasUnreadMention(cid) {
  return state.unreadMentions.has(cid);
}

function bumpUnreadForMessage(m) {
  if (!m || m.from === state.username) return;
  var cid = convId(m);
  if (!cid) return;
  /* For rooms: only bump if user is @mentioned */
  if (cid.startsWith("r:")) {
    if (!messageMentionsCurrentUser(m)) return;
  }
  if (state.activeChat && activeConvId() === cid) return;
  var current = state.unreadCounts.get(cid) || 0;
  state.unreadCounts.set(cid, Math.min(99, current + 1));
  if ((cid.startsWith("g:") || cid.startsWith("r:")) && messageMentionsCurrentUser(m)) {
    state.unreadMentions.add(cid);
  }
  updateTabBadges();
}

function rebuildUnreadSinceLogout() {
  state.unreadCounts = new Map();
  state.unreadMentions = new Set();
  if (!state.lastLogout) {
    updateTabBadges();
    return;
  }
  for (const [, arr] of convMessages) {
    for (const m of arr) {
      if (!m || m.from === state.username) continue;
      if (!m.ts || m.ts <= state.lastLogout) continue;
      const cid = convId(m);
      if (!cid) continue;
      if (cid.startsWith("r:") && !messageMentionsCurrentUser(m)) continue;
      const current = state.unreadCounts.get(cid) || 0;
      state.unreadCounts.set(cid, Math.min(99, current + 1));
      if ((cid.startsWith("g:") || cid.startsWith("r:")) && messageMentionsCurrentUser(m)) {
        state.unreadMentions.add(cid);
      }
    }
  }
  updateTabBadges();
}

function clearUnreadForActiveChat() {
  var cid = activeConvId();
  if (!cid) return;
  if (state.unreadCounts.has(cid)) state.unreadCounts.delete(cid);
  if (state.unreadMentions.has(cid)) state.unreadMentions.delete(cid);
  updateTabBadges();
}

function getUserTextColor(username) {
  var key = String(username || "").trim().toLowerCase();
  if (!key) return USER_TEXT_COLOR_PALETTE[0];
  if (state.userTextColors.has(key)) return state.userTextColors.get(key);
  var color = USER_TEXT_COLOR_PALETTE[state.nextUserTextColorIndex % USER_TEXT_COLOR_PALETTE.length];
  state.nextUserTextColorIndex += 1;
  state.userTextColors.set(key, color);
  return color;
}

function setReplyTarget(message) {
  if (!message || !replyContextBar) return;
  state.replyTarget = {
    id: message.id,
    from: message.from || "",
    text: plainMessageSnippet(message, 90)
  };
  if (replyContextName) replyContextName.textContent = "Replying to " + (state.replyTarget.from || "user") + ":";
  if (replyContextSnippet) replyContextSnippet.textContent = " " + state.replyTarget.text;
  replyContextBar.style.display = "";
  msgInput.focus();
}

function clearReplyTarget() {
  state.replyTarget = null;
  if (replyContextBar) replyContextBar.style.display = "none";
  if (replyContextName) replyContextName.textContent = "";
  if (replyContextSnippet) replyContextSnippet.textContent = "";
}

function startInlineEdit(message) {
  if (!message) return;
  state.editingMessageId = message.id;
  clearReplyTarget();
  if (pendingMedia) clearPhotoPreview();
  msgInput.value = message.text || "";
  if (chatInputBar) chatInputBar.classList.add("editing");
  msgInput.focus();
  var end = msgInput.value.length;
  msgInput.setSelectionRange(end, end);
}

function stopInlineEdit(clearInput) {
  state.editingMessageId = null;
  if (chatInputBar) chatInputBar.classList.remove("editing");
  if (clearInput) msgInput.value = "";
}

function findActiveMessageById(id) {
  var cid = activeConvId();
  var arr = convMessages.get(cid) || [];
  return arr.find(function(m) { return m.id === id; }) || null;
}

function ensureGroupMembersLoaded(groupName) {
  if (!groupName) return;
  var gp = state.groupProfiles[groupName];
  if (gp && Array.isArray(gp.members)) return;
  if (pendingGroupMemberLoads.has(groupName)) return;
  pendingGroupMemberLoads.add(groupName);
  wsSend({ type: "group-detail", group: groupName });
}

function getGroupMemberUsernames(groupName) {
  if (!groupName) return [];
  var gp = state.groupProfiles[groupName];
  var members = Array.isArray(gp?.members) ? gp.members.slice() : [];
  if (!members.length) return [];
  return members
    .filter(function(u) { return u && normalizeUsername(u) !== normalizeUsername(state.username); })
    .sort(function(a, b) { return a.localeCompare(b); });
}

function getRoomMentionCandidates(roomId) {
  if (!roomId) return [];
  var room = state.roomDetails[roomId];
  if (!room) return [];
  var online = Array.isArray(room.onlineUsers) ? room.onlineUsers : [];
  var offline = Array.isArray(room.offlineUsers) ? room.offlineUsers : [];
  var all = online.concat(offline);
  return all
    .filter(function(u) { return u && normalizeUsername(u) !== normalizeUsername(state.username); })
    .sort(function(a, b) { return a.localeCompare(b); });
}

function getActiveMentionContext() {
  if (!state.activeChat || (state.activeChat.type !== "group" && state.activeChat.type !== "room")) return null;
  if (!msgInput) return null;
  var caret = msgInput.selectionStart;
  if (typeof caret !== "number") return null;
  var before = msgInput.value.slice(0, caret);
  var m = before.match(/(^|\s)@([a-zA-Z0-9._-]*)$/);
  if (!m) return null;
  var query = m[2] || "";
  var atIndex = before.length - query.length - 1;
  if (atIndex < 0 || before.charAt(atIndex) !== "@") return null;
  return { query: query, atIndex: atIndex, caret: caret };
}

function hideMentionSuggestions() {
  if (!mentionSuggest) return;
  mentionSuggest.style.display = "none";
  mentionSuggest.innerHTML = "";
  mentionSuggest.dataset.candidates = "";
}

function acceptMentionSuggestion(username) {
  var ctx = getActiveMentionContext();
  if (!ctx) return;
  var before = msgInput.value.slice(0, ctx.atIndex + 1);
  var after = msgInput.value.slice(ctx.caret);
  msgInput.value = before + username + " " + after;
  var nextPos = before.length + username.length + 1;
  msgInput.focus();
  msgInput.setSelectionRange(nextPos, nextPos);
  updateMentionSuggestions();
}

function getMentionCandidates() {
  if (!mentionSuggest) return [];
  var raw = mentionSuggest.dataset.candidates || "";
  if (!raw) return [];
  return raw.split("\n").filter(Boolean);
}

function updateMentionSuggestions() {
  if (!mentionSuggest) return;
  var ctx = getActiveMentionContext();
  if (!ctx) {
    hideMentionSuggestions();
    return;
  }
  var query = normalizeUsername(ctx.query);
  var members = [];
  var special = [];
  if (state.activeChat.type === "group") {
    ensureGroupMembersLoaded(state.activeChat.name);
    members = getGroupMemberUsernames(state.activeChat.name);
    if (canCurrentUserUseSpecialPing("group")) special = ["everyone", "here"];
  } else if (state.activeChat.type === "room") {
    members = getRoomMentionCandidates(state.activeChat.name);
    if (canCurrentUserUseSpecialPing("room")) special = ["here"];
  }
  var tokenMatches = special.filter(function(s) { return !query || s.indexOf(query) === 0; });
  var userMatches = members.filter(function(u) {
    return !query || normalizeUsername(u).startsWith(query);
  });
  var matches = tokenMatches.concat(userMatches).slice(0, 8);
  if (!matches.length) {
    hideMentionSuggestions();
    return;
  }
  mentionSuggest.dataset.candidates = matches.join("\n");
  mentionSuggest.innerHTML = matches.map(function(u) {
    return "<button type=\"button\" class=\"mention-item\" data-user=\"" + esc(u) + "\">@" + esc(u) + "</button>";
  }).join("");
  mentionSuggest.style.display = "flex";
  mentionSuggest.querySelectorAll(".mention-item").forEach(function(btn) {
    btn.addEventListener("click", function() {
      acceptMentionSuggestion(btn.dataset.user || "");
    });
  });
}

function askOtpConfirmation() {
  if (!otpConfirmModal) return Promise.resolve(false);
  otpConfirmModal.style.display = "";
  if (otpConfirmText) otpConfirmText.textContent = "This message looks like an OTP (4 or 6 digits). Are you sure you want to send it to this group/room?";
  return new Promise(function(resolve) {
    otpConfirmResolver = resolve;
  });
}

function resolveOtpConfirmation(ok) {
  if (otpConfirmModal) otpConfirmModal.style.display = "none";
  var resolver = otpConfirmResolver;
  otpConfirmResolver = null;
  if (resolver) resolver(!!ok);
}

function askActionConfirmation(title, text, proceedLabel) {
  if (!actionConfirmModal) return Promise.resolve(false);
  if (actionConfirmTitle) actionConfirmTitle.textContent = title || "Confirm Action";
  if (actionConfirmText) actionConfirmText.textContent = text || "Are you sure you want to continue?";
  if (actionConfirmProceed) actionConfirmProceed.textContent = proceedLabel || "Confirm";
  actionConfirmModal.style.display = "";
  return new Promise(function(resolve) {
    actionConfirmResolver = resolve;
  });
}

function resolveActionConfirmation(ok) {
  if (actionConfirmModal) actionConfirmModal.style.display = "none";
  var resolver = actionConfirmResolver;
  actionConfirmResolver = null;
  if (resolver) resolver(!!ok);
}

/* ── Moderation UI helpers ──────────────────────────────────── */
/* ── Moderation UI helpers ──────────────────────────────────── */
function getCurrentRoomMSS() {
  if (state.activeChat && state.activeChat.type === "room") {
    var rId = state.activeChat.name;
    var info = state.roomMSS[rId];
    if (info) return info.score;
  }
  return state.mss;
}

function updateRoomMSS(roomId, score) {
  if (!state.roomMSS) state.roomMSS = {};
  if (!state.roomMSS[roomId]) state.roomMSS[roomId] = { score: 100, muted: false };
  state.roomMSS[roomId].score = score;
  state.roomMSS[roomId].muted = score < 40;
  // Update global mss to the active room's value for display
  if (state.activeChat && state.activeChat.type === "room" && state.activeChat.name === roomId) {
    state.mss = score;
    state.isMuted = false;
    updateMSSBar();
    if (state.roomMSS[roomId].muted) disableChatInput("You are in read-only mode. Please take a break.");
    else enableChatInput();
  }
}

function updateMSSBar() {
  var bar = $("#mssBar");
  var fill = $("#mssFill");
  var label = $("#mssLabel");
  if (!bar || !fill || !label) return;
  var s = getCurrentRoomMSS();
  fill.style.width = s + "%";
  label.textContent = s;
  /* colour zones */
  if (s >= 80) { fill.style.background = "var(--mss-normal, #22c55e)"; }
  else if (s >= 40) { fill.style.background = "var(--mss-irritation, #f59e0b)"; }
  else { fill.style.background = "var(--mss-mute, #ef4444)"; }
  bar.title = "Mental-State Score: " + s + "/100";
  /* Show MSS bar only for rooms */
  var container = $(".mss-bar-container");
  if (container) {
    container.style.display = (state.activeChat && state.activeChat.type === "room") ? "" : "none";
  }
}

var _modToastTimer = null;
function showModerationToast(text, level) {
  var el = $("#moderationToast");
  if (!el) return;
  el.textContent = text;
  el.className = "moderation-toast show " + (level || "info");
  clearTimeout(_modToastTimer);
  _modToastTimer = setTimeout(function() { el.classList.remove("show"); }, 6000);
}

function closeModerationWarningModal() {
  if (moderationWarningModal) moderationWarningModal.style.display = "none";
}

function normalizeWarningText(text) {
  var base = (text || "").trim() || "Warning: Your recent message violated room conduct rules.";
  if (!/^warning:/i.test(base)) base = "Warning: " + base;
  if (!/admin|owner/i.test(base)) {
    base += " If you believe this is a mistake, DM the room admin or owner.";
  }
  return base;
}

function showModerationWarningModal(text) {
  var normalized = normalizeWarningText(text);
  if (!moderationWarningModal || !moderationWarningText) {
    showModerationToast(normalized, "warn");
    return;
  }
  moderationWarningText.textContent = normalized;
  moderationWarningModal.style.display = "";
}

function disableChatInput(reason) {
  if (msgInput) { msgInput.disabled = true; msgInput.placeholder = reason || "Read-only mode"; }
  if (sendBtn) sendBtn.disabled = true;
}

function enableChatInput() {
  /* Per-room mute check */
  if (state.activeChat && state.activeChat.type === "room") {
    var rId = state.activeChat.name;
    var info = state.roomMSS[rId];
    if (info && info.muted) return;
  }
  if (msgInput) { msgInput.disabled = false; msgInput.placeholder = "Type a message…"; }
  if (sendBtn) sendBtn.disabled = false;
}


function handle(msg) {
  switch (msg.type) {
    case "welcome": break;

    case "auth-ok":
      var wasAuthenticated = !!state.username;
      state.username   = msg.username;
      state.avatarColor = msg.avatarColor || "#6366f1";
      state.lastLogout = msg.lastLogout || 0;
      state.shouldRebuildUnreadFromLogout = !wasAuthenticated;
      state.myGroups   = new Set(msg.groups || []);
      state.allGroups  = msg.allGroups || [];
      state.myRooms = msg.rooms || [];
      state.roomCatalog = msg.roomCatalog || [];
      state.joinedRoomIds = new Set(msg.joinedRoomIds || []);
      state.roomDetails = {};
      for (const r of state.myRooms) state.roomDetails[r.id] = r;
      state.onlineUsers = msg.onlineUsers || [];
      state.allUsers   = msg.allUsers || [];
      state.dmPartners = new Set(msg.dmPartners || []);
      state.dmBlockedUsers = new Set((msg.dmBlockedUsers || []).map(normalizeUsername));
      state.unreadCounts = new Map();
      state.unreadMentions = new Set();
      state.mss = typeof msg.mss === "number" ? msg.mss : 100;
      state.roomMSS = msg.roomMSS || {};
      state.isMuted = state.mss < 40;
      pendingGroupMemberLoads = new Set();
      state.userTextColors = new Map();
      state.nextUserTextColorIndex = 0;
      stopInlineEdit(true);
      clearReplyTarget();
      state.profiles = new Map((msg.profiles || []).map(p => [p.username, p]));
      if (msg.myProfile) state.profiles.set(msg.myProfile.username, msg.myProfile);
      showApp();
      break;

    case "error":
      if (authScreen.style.display !== "none") authMsg.textContent = msg.error;
      else groupActionMsg.textContent = msg.error;
      break;

    case "history":
      for (const m of msg.messages || []) storeMessage(m);
      if (!msg.append && state.shouldRebuildUnreadFromLogout) {
        rebuildUnreadSinceLogout();
        state.shouldRebuildUnreadFromLogout = false;
      }
      refreshDmPartners();
      renderConvLists();
      if (state.activeChat) renderChat();
      break;

    case "new-message":
      storeMessage(msg.message);
      bumpUnreadForMessage(msg.message);
      if (msg.message.scope === "dm") {
        const other = msg.message.from === state.username ? msg.message.recipient : msg.message.from;
        state.dmPartners.add(other);
      }
      renderConvLists();
      if (state.activeChat && activeConvId() === convId(msg.message)) {
        appendMessageEl(msg.message);
        scrollChat();
      }
      break;

    case "online-users":
      state.onlineUsers = msg.users || [];
      renderDmList();
      if (state.activeChat) updateChatHeader();
      break;

    case "groups-list":
      state.allGroups = msg.groups || [];
      renderGroupList();
      if (state.activeChat?.type === "group") updateChatHeader();
      break;

    case "rooms-list":
      state.myRooms = msg.rooms || [];
      state.roomCatalog = msg.roomCatalog || [];
      state.joinedRoomIds = new Set(msg.joinedRoomIds || []);
      for (const r of state.myRooms) state.roomDetails[r.id] = r;
      renderRoomList();
      if (state.activeChat?.type === "room") updateChatHeader();
      break;

    case "group-profile-updated":
      if (msg.group?.name) {
        const idx = state.allGroups.findIndex(g => g.name === msg.group.name);
        if (idx === -1) state.allGroups.push(msg.group);
        else state.allGroups[idx] = msg.group;
      }
      renderGroupList();
      if (state.activeChat?.type === "group") updateChatHeader();
      break;

    case "users-list":
      state.allUsers = msg.users || [];
      renderDmList();
      break;

    case "dm-blocks-updated":
      state.dmBlockedUsers = new Set((msg.blockedUsers || []).map(normalizeUsername));
      if (state.activeChat?.type === "dm") {
        if (isDmBlockedTarget(state.activeChat.name)) disableChatInput("You blocked this DM. Unblock to send messages.");
        else enableChatInput();
      }
      renderDmList();
      break;

    case "user-profile-updated":
      if (msg.profile?.username) state.profiles.set(msg.profile.username, msg.profile);
      if (state.username) updateHeaderProfile();
      if (state.activeChat) updateChatHeader();
      renderDmList();
      break;

    case "typing":
      if (!msg.from || msg.from === state.username) break;
      let cid = "";
      if (msg.scope === "group") cid = "g:" + msg.group;
      else if (msg.scope === "room") cid = "r:" + msg.room;
      else cid = "d:" + dmKey(msg.from, state.username);
      if (!state.typing.has(cid)) state.typing.set(cid, new Set());
      const set = state.typing.get(cid);
      if (msg.isTyping) set.add(msg.from); else set.delete(msg.from);
      if (set.size === 0) state.typing.delete(cid);
      if (state.activeChat && activeConvId() === cid) updateChatHeader();
      break;

    case "group-created":
      state.myGroups.add(msg.name);
      groupActionMsg.textContent = "Created \"" + msg.name + "\" - code: " + msg.code;
      renderGroupList();
      openChat("group", msg.name);
      break;

    case "group-joined":
      state.myGroups.add(msg.name);
      groupActionMsg.textContent = "Joined \"" + msg.name + "\"";
      renderGroupList();
      openChat("group", msg.name);
      break;

    case "group-left":
      state.myGroups.delete(msg.name);
      state.unreadMentions.delete("g:" + msg.name);
      groupActionMsg.textContent = "Left \"" + msg.name + "\"";
      renderGroupList();
      if (state.activeChat?.type === "group" && state.activeChat.name === msg.name) closeChat();
      break;

    case "room-created":
      if (msg.room?.id) {
        state.roomDetails[msg.room.id] = msg.room;
        roomActionMsg.textContent = "Room created: #" + msg.room.name;
      }
      renderRoomList();
      break;

    case "room-joined":
      if (msg.room?.id) {
        state.joinedRoomIds.add(msg.room.id);
        state.roomDetails[msg.room.id] = msg.room;
        roomActionMsg.textContent = "Joined room #" + msg.room.name;
        openChat("room", msg.room.id);
      }
      renderRoomList();
      break;

    case "room-left":
      state.joinedRoomIds.delete(msg.roomId);
      if (msg.reason === "afk") roomActionMsg.textContent = "Removed from room due to inactivity";
      else if (msg.reason === "kicked") roomActionMsg.textContent = "You were kicked from the room";
      else if (msg.reason === "banned") roomActionMsg.textContent = "You were banned from the room";
      else if (msg.reason === "deleted") roomActionMsg.textContent = "Room was deleted by owner";
      else roomActionMsg.textContent = "Left room";
      renderRoomList();
      if (state.activeChat?.type === "room" && state.activeChat.name === msg.roomId) closeChat();
      break;

    case "room-search-results":
      state.roomSearchQuery = msg.query || "";
      renderRoomSearchResults(msg.rooms || []);
      break;

    case "room-detail":
      if (msg.room?.id) {
        state.roomDetails[msg.room.id] = msg.room;
        showRoomInfo(msg.room);
      }
      break;

    case "room-logs":
      roomLogsPayload = {
        roomId: msg.roomId || "",
        canManage: true,
        logs: Array.isArray(msg.logs) ? msg.logs : [],
      };
      renderRoomLogsModal();
      break;

    case "room-purged":
      for (const [cid] of convMessages) {
        if (cid === "r:" + msg.roomId) convMessages.set(cid, []);
      }
      if (state.activeChat?.type === "room" && state.activeChat.name === msg.roomId) renderChat();
      renderRoomList();
      break;

    case "room-deleted":
      state.myRooms = state.myRooms.filter(function(r) { return r.id !== msg.roomId; });
      state.roomCatalog = state.roomCatalog.filter(function(r) { return r.id !== msg.roomId; });
      state.joinedRoomIds.delete(msg.roomId);
      delete state.roomDetails[msg.roomId];
      convMessages.delete("r:" + msg.roomId);
      if (state.activeChat?.type === "room" && state.activeChat.name === msg.roomId) closeChat();
      if (roomInfoModal) roomInfoModal.style.display = "none";
      if (roomLogsModal && roomLogsPayload.roomId === msg.roomId) roomLogsModal.style.display = "none";
      if (roomListActionModal) roomListActionModal.style.display = "none";
      renderRoomList();
      break;

    case "message-edited":
      updateLocalMessageText(msg.id, msg.text, msg.editedAt);
      if (state.editingMessageId === msg.id) stopInlineEdit(true);
      if (state.activeChat) renderChat();
      renderConvLists();
      break;

    case "group-renamed":
      if (state.myGroups.has(msg.oldName)) {
        state.myGroups.delete(msg.oldName);
        state.myGroups.add(msg.newName);
      }
      if (state.unreadMentions.has("g:" + msg.oldName)) {
        state.unreadMentions.delete("g:" + msg.oldName);
        state.unreadMentions.add("g:" + msg.newName);
      }
      if (state.groupProfiles[msg.oldName]) {
        state.groupProfiles[msg.newName] = { ...state.groupProfiles[msg.oldName], name: msg.newName };
        delete state.groupProfiles[msg.oldName];
      }
      if (state.activeChat?.type === "group" && state.activeChat.name === msg.oldName) {
        state.activeChat.name = msg.newName;
      }
      for (const [cid, arr] of convMessages) {
        if (cid === "g:" + msg.oldName) {
          convMessages.delete(cid);
          arr.forEach(function(m) { m.group = msg.newName; });
          convMessages.set("g:" + msg.newName, arr);
        }
      }
      renderConvLists();
      if (state.activeChat?.type === "group") updateChatHeader();
      break;

    case "group-detail":
      if (msg.group?.name) {
        pendingGroupMemberLoads.delete(msg.group.name);
        state.groupProfiles[msg.group.name] = msg.group;
        const shouldShow = (pendingGroupInfoModal && pendingGroupInfoName === msg.group.name)
          || (activeGroupInfoName === msg.group.name && groupInfoModal && groupInfoModal.style.display !== "none");
        if (shouldShow) showGroupInfo(msg.group);
        if (pendingGroupInfoName === msg.group.name) {
          pendingGroupInfoModal = false;
          pendingGroupInfoName = "";
        }
        if (state.activeChat?.type === "group" && state.activeChat.name === msg.group.name) {
          updateMentionSuggestions();
        }
      }
      break;

    case "otp-confirmation-required": {
      const payload = msg.payload || {};
      askOtpConfirmation().then(function(ok) {
        if (!ok || msg.action !== "send-text") return;
        wsSend({
          type: "send-text",
          scope: payload.scope,
          group: payload.group,
          room: payload.room,
          recipient: payload.recipient,
          text: payload.text,
          spoilerText: !!payload.spoilerText,
          replyTo: payload.replyTo,
          confirmSensitive: true,
        });
      });
      break;
    }

    case "message-deleted":
      removeLocalMessage(msg.id);
      refreshDmPartners();
      renderConvLists();
      if (state.activeChat) renderChat();
      break;

    case "message-deleted-for-all":
      markDeletedForEveryone(msg.id, msg.deletedBy);
      refreshDmPartners();
      renderConvLists();
      if (state.activeChat) renderChat();
      break;

    case "chat-cleared":
      for (const id of msg.ids || []) removeLocalMessage(id);
      refreshDmPartners();
      renderConvLists();
      if (state.activeChat) renderChat();
      break;

    /* ── Moderation events ────────────────────────────── */
    case "mss-update":
      if (msg.roomId) {
        updateRoomMSS(msg.roomId, msg.mss);
      } else {
        state.mss = typeof msg.mss === "number" ? msg.mss : state.mss;
        state.isMuted = false;
        updateMSSBar();
      }
      break;

    case "moderation-block":
      showModerationToast(msg.reason || "Your message was blocked.", "error");
      if (msg.roomId) {
        updateRoomMSS(msg.roomId, msg.mss);
      } else {
        state.mss = typeof msg.mss === "number" ? msg.mss : state.mss;
        state.isMuted = state.mss < 40;
        updateMSSBar();
      }
      break;

    case "moderation-flag":
      showModerationToast("Your message was flagged for review. Please keep conversations respectful.", "warn");
      if (msg.roomId) {
        updateRoomMSS(msg.roomId, msg.mss);
      } else {
        state.mss = typeof msg.mss === "number" ? msg.mss : state.mss;
        state.isMuted = state.mss < 40;
        updateMSSBar();
      }
      break;

    case "moderation-muted":
      if (msg.roomId) {
        updateRoomMSS(msg.roomId, msg.mss);
        if (!state.roomMSS[msg.roomId]) state.roomMSS[msg.roomId] = { score: msg.mss, muted: true };
        state.roomMSS[msg.roomId].muted = true;
        if (state.activeChat?.type === "room" && state.activeChat.name === msg.roomId) {
          disableChatInput(msg.message || "You are in read-only mode.");
        }
      }
      state.mss = typeof msg.mss === "number" ? msg.mss : state.mss;
      state.isMuted = false;
      updateMSSBar();
      showModerationToast(msg.message || "You are in read-only mode.", "mute");
      break;

    case "moderation-unmuted":
      if (msg.roomId) {
        updateRoomMSS(msg.roomId, msg.mss || 45);
        if (state.roomMSS[msg.roomId]) state.roomMSS[msg.roomId].muted = false;
      }
      state.isMuted = false;
      enableChatInput();
      updateMSSBar();
      showModerationToast(msg.message || "You have been unmuted.", "info");
      break;

    case "therapist-dm":
      showModerationWarningModal(msg.text || msg.message);
      break;

    case "moderation-warning":
      showModerationWarningModal(msg.message);
      break;

    case "room-mode-update":
      // Update cached room details with new mode state
      if (msg.roomId && state.roomDetails[msg.roomId]) {
        state.roomDetails[msg.roomId].toxicFilter = msg.toxicFilter;
        state.roomDetails[msg.roomId].trollMode = msg.trollMode;
      }
      // If the room info modal is currently open for this room, refresh toggles
      var toxicCb = document.getElementById("toggleToxicFilter");
      var trollCb = document.getElementById("toggleTrollMode");
      if (toxicCb && trollCb && roomInfoModal.style.display !== "none") {
        toxicCb.checked = msg.toxicFilter !== false;
        trollCb.checked = !!msg.trollMode;
      }
      break;
  }
}


function storeMessage(m) {
  const cid = convId(m);
  if (!convMessages.has(cid)) convMessages.set(cid, []);
  const arr = convMessages.get(cid);
  if (arr.find(x => x.id === m.id)) return;
  arr.push(m);
  arr.sort((a, b) => a.ts - b.ts);
}

function activeConvId() {
  if (!state.activeChat) return null;
  if (state.activeChat.type === "group") return "g:" + state.activeChat.name;
  if (state.activeChat.type === "room") return "r:" + state.activeChat.name;
  return "d:" + dmKey(state.username, state.activeChat.name);
}

function removeLocalMessage(id) {
  for (const [cid, arr] of convMessages) {
    const idx = arr.findIndex(m => m.id === id);
    if (idx !== -1) { arr.splice(idx, 1); break; }
  }
}

function markDeletedForEveryone(id, deletedBy) {
  for (const [cid, arr] of convMessages) {
    const msg = arr.find(m => m.id === id);
    if (msg) {
      msg.deletedForEveryone = true;
      msg.deletedBy = deletedBy;
      msg.kind = "text";
      msg.photoUrl = null;
      msg.videoUrl = null;
      msg.text = "";
      break;
    }
  }
}

function updateLocalMessageText(id, text, editedAt) {
  for (const [, arr] of convMessages) {
    const msg = arr.find(m => m.id === id);
    if (msg) {
      msg.text = text || "";
      msg.editedAt = editedAt || Date.now();
      break;
    }
  }
}


function esc(s) { const d = document.createElement("div"); d.textContent = s; return d.innerHTML; }
function closeModal(id) { var el = document.getElementById(id); if (el) el.style.display = "none"; }

function formatMuteDuration(minutes) {
  if (!minutes || minutes >= 121) return "Forever";
  if (minutes >= 60) {
    var h = Math.floor(minutes / 60);
    var m = minutes % 60;
    return m ? (h + "h " + m + "m") : (h + " hour" + (h === 1 ? "" : "s"));
  }
  return minutes + " minute" + (minutes === 1 ? "" : "s");
}

function updateRoomMuteDurationReadout() {
  if (!roomMuteDurationRange || !roomMuteDurationValue) return;
  var mins = Number(roomMuteDurationRange.value) || 15;
  roomMuteDurationValue.textContent = formatMuteDuration(mins);
}

function closeRoomMuteDurationModal() {
  if (roomMuteDurationModal) roomMuteDurationModal.style.display = "none";
  roomMuteDurationPayload = null;
}

function openRoomMuteDurationModal(payload) {
  if (!roomMuteDurationModal || !roomMuteDurationRange) {
    wsSend({ type: "room-mute-member", roomId: payload.roomId, target: payload.target });
    return;
  }
  roomMuteDurationPayload = payload;
  roomMuteDurationRange.value = "15";
  updateRoomMuteDurationReadout();
  if (roomMuteDurationTarget) {
    roomMuteDurationTarget.textContent = "Mute " + payload.target + " for:";
  }
  roomMuteDurationModal.style.display = "";
}

function timeStr(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
function dateLabel(ts) {
  const d = new Date(ts);
  const now = new Date();
  if (d.toDateString() === now.toDateString()) return "Today";
  const y = new Date(now); y.setDate(y.getDate() - 1);
  if (d.toDateString() === y.toDateString()) return "Yesterday";
  return d.toLocaleDateString();
}

function roomLogTimeLabel(ts) {
  if (!ts) return "";
  const d = new Date(ts);
  return d.toLocaleString([], {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function renderRoomLogsModal() {
  if (!roomLogsModal || !roomLogsList) return;
  var logs = Array.isArray(roomLogsPayload.logs) ? roomLogsPayload.logs : [];
  var roomId = roomLogsPayload.roomId || "";
  if (roomLogsTitle) {
    roomLogsTitle.textContent = logs.length
      ? "Room Moderation Logs"
      : "Room Moderation Logs";
  }
  if (!logs.length) {
    roomLogsList.innerHTML = "<div class=\"conv-section\">No flagged/blocked messages in this room.</div>";
  } else {
    roomLogsList.innerHTML = logs.map(function(log) {
      var badgeClass = log.action === "blocked" ? "room-log-badge-blocked" : "room-log-badge-flagged";
      var badgeText = log.action === "blocked" ? "Blocked" : "Flagged";
      return ""
        + "<div class=\"room-log-embed\" data-log-id=\"" + esc(log.id || "") + "\">"
        +   "<div class=\"room-log-embed-head\">"
        +     "<div class=\"room-log-user\">" + avatarHtmlForUser(log.username || "?", "avatar-sm")
        +       "<span class=\"member-name\">" + esc(log.username || "Unknown") + "</span>"
        +     "</div>"
        +     "<div class=\"room-log-meta\">"
        +       "<span class=\"room-log-badge " + badgeClass + "\">" + badgeText + "</span>"
        +       "<span class=\"room-log-ts\">" + esc(roomLogTimeLabel(log.ts)) + "</span>"
        +     "</div>"
        +   "</div>"
        +   "<div class=\"room-log-reason\"><strong>Bot reason:</strong> " + esc(log.reason || "Flagged by moderation") + "</div>"
        +   "<div class=\"room-log-text\"><strong>Message:</strong> " + esc(log.text || "") + "</div>"
        +   "<div class=\"room-log-actions\">"
        +     "<button class=\"btn btn-danger btn-sm room-log-delete\" data-log-id=\"" + esc(log.id || "") + "\" type=\"button\"><i class=\"fa-solid fa-trash\"></i> Delete</button>"
        +   "</div>"
        + "</div>";
    }).join("");
  }

  roomLogsList.querySelectorAll(".room-log-delete").forEach(function(btn) {
    btn.addEventListener("click", async function() {
      var logId = btn.dataset.logId || "";
      if (!logId || !roomLogsPayload.canManage || !roomId) return;
      var ok = await askActionConfirmation("Delete Log", "Delete this moderation log entry?", "Delete");
      if (!ok) return;
      wsSend({ type: "room-log-delete", roomId: roomId, logId: logId });
    });
  });

  if (roomLogsClearBtn) roomLogsClearBtn.style.display = roomLogsPayload.canManage ? "" : "none";
  roomLogsModal.style.display = "";
}
function avatarHtml(letter, color, cls) {
  cls = cls || "avatar-sm";
  return "<span class=\"" + cls + "\" style=\"background:" + color + "\">" + letter + "</span>";
}
function lastMsg(cid) {
  const arr = convMessages.get(cid);
  if (!arr || !arr.length) return null;
  return arr[arr.length - 1];
}

function getProfile(username) {
  return state.profiles.get(username) || { username: username, avatarColor: "#4f46e5", pfpUrl: "", about: "", status: "online" };
}

function avatarHtmlForUser(username, cls) {
  cls = cls || "avatar-sm";
  const p = getProfile(username);
  if (p.pfpUrl) return "<span class=\"" + cls + " avatar-img\" style=\"background-image:url('" + p.pfpUrl + "')\"></span>";
  const color = p.avatarColor || "#4f46e5";
  return "<span class=\"" + cls + "\" style=\"background:" + color + "\">" + username[0] + "</span>";
}

function getGroupProfile(name) {
  return state.allGroups.find(function(g) { return g.name === name; }) || { name: name, owner: "", admins: [], memberCount: 0, description: "", pfpUrl: "" };
}

function groupAvatarHtml(name, cls) {
  cls = cls || "avatar-sm";
  const g = getGroupProfile(name);
  if (g.pfpUrl) return "<span class=\"" + cls + " avatar-img\" style=\"background-image:url('" + g.pfpUrl + "')\"></span>";
  return "<span class=\"" + cls + "\" style=\"background:#6366f1\">" + name[0] + "</span>";
}

function setGroupAvatarEl(el, name, cls) {
  cls = cls || "avatar-sm";
  const g = getGroupProfile(name);
  el.className = cls + "";
  if (g.pfpUrl) {
    el.classList.add("avatar-img");
    el.style.backgroundImage = "url('" + g.pfpUrl + "')";
    el.style.backgroundColor = "";
    el.textContent = "";
  } else {
    el.classList.remove("avatar-img");
    el.style.backgroundImage = "";
    el.style.backgroundColor = "#6366f1";
    el.textContent = name[0];
  }
}

function setAvatarEl(el, username, cls) {
  cls = cls || "avatar-sm";
  const p = getProfile(username);
  el.className = cls + "";
  if (p.pfpUrl) {
    el.classList.add("avatar-img");
    el.style.backgroundImage = "url('" + p.pfpUrl + "')";
    el.style.backgroundColor = "";
    el.textContent = "";
  } else {
    el.classList.remove("avatar-img");
    el.style.backgroundImage = "";
    el.style.backgroundColor = p.avatarColor || "#4f46e5";
    el.textContent = username[0];
  }
}

function presenceInfo(username) {
  const profile = getProfile(username);
  const online = state.onlineUsers.includes(username);
  if (!online) return { label: "Offline", className: "status-offline" };
  if (profile.status === "idle") return { label: "Idle", className: "status-idle" };
  if (profile.status === "dnd") return { label: "Do not disturb", className: "status-dnd" };
  if (profile.status === "offline") return { label: "Offline", className: "status-offline" };
  return { label: "Online", className: "status-online" };
}

function formatLastSeen(ts) {
  if (!ts) return "";
  var diff = Date.now() - ts;
  if (diff < 60000) return "just now";
  if (diff < 3600000) return Math.floor(diff / 60000) + "m ago";
  if (diff < 86400000) return Math.floor(diff / 3600000) + "h ago";
  if (diff < 7 * 86400000) return Math.floor(diff / 86400000) + "d ago";
  return new Date(ts).toLocaleDateString();
}

function refreshDmPartners() {
  const next = new Set();
  for (const [cid, arr] of convMessages) {
    if (!arr.length || !cid.startsWith("d:")) continue;
    const parts = cid.slice(2).split("::");
    const other = parts[0] === state.username ? parts[1] : parts[0];
    if (other && other !== state.username) next.add(other);
  }
  state.dmPartners = next;
}


/* == AUTH == */
loginBtn.addEventListener("click", async function() {
  const username = usernameInput.value.trim();
  const password = passwordInput.value;
  if (!username || !password) return;
  authMsg.textContent = "";
  const res = await fetch("/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: username, password: password }) });
  const data = await res.json();
  if (data.ok) wsSend({ type: "auth", username: username });
  else authMsg.textContent = data.error || "Login failed";
});

registerBtn.addEventListener("click", async function() {
  const username = usernameInput.value.trim();
  const password = passwordInput.value;
  if (!username || !password) return;
  authMsg.textContent = "";
  const res = await fetch("/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: username, password: password }) });
  const data = await res.json();
  if (data.ok) { authMsg.textContent = "Registered! Now log in."; authMsg.style.color = "var(--accent)"; }
  else { authMsg.textContent = data.error || "Failed"; authMsg.style.color = "var(--danger)"; }
});

passwordInput.addEventListener("keydown", function(e) { if (e.key === "Enter") loginBtn.click(); });

logoutBtn.addEventListener("click", function() {
  if (state.username) {
    wsSend({ type: "logout" });
    fetch("/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: state.username }),
      keepalive: true,
    }).catch(function() {});
  }
  state.username = null;
  state.lastLogout = 0;
  state.shouldRebuildUnreadFromLogout = false;
  state.myGroups.clear();
  state.allGroups = [];
  state.myRooms = [];
  state.roomCatalog = [];
  state.joinedRoomIds.clear();
  state.roomDetails = {};
  state.onlineUsers = [];
  state.allUsers = [];
  state.dmPartners.clear();
  state.dmBlockedUsers.clear();
  state.profiles.clear();
  state.typing.clear();
  state.dmSearch = "";
  state.activeChat = null;
  state.unreadCounts.clear();
  state.unreadMentions.clear();
  pendingGroupMemberLoads = new Set();
  convMessages.clear();
  hideMentionSuggestions();
  authScreen.style.display = "";
  appShell.style.display = "none";
  usernameInput.value = "";
  passwordInput.value = "";
  authMsg.textContent = "";
  if (dmSearchInput) dmSearchInput.value = "";
  if (spoilerTextToggle) spoilerTextToggle.checked = false;
  if (spoilerMediaToggle) spoilerMediaToggle.checked = false;
  setTimeout(function() {
    if (ws && ws.readyState === WebSocket.OPEN) ws.close();
  }, 60);
});

function showApp() {
  authScreen.style.display = "none";
  appShell.style.display = "";
  updateHeaderProfile();
  headerUsername.textContent = state.username;
  renderConvLists();
  closeChat();
  updateMSSBar();
}

function updateHeaderProfile() {
  if (!state.username) return;
  setAvatarEl(headerAvatar, state.username, "avatar-sm");
  const presence = presenceInfo(state.username);
  headerStatus.className = "status-dot " + presence.className;
}

function updateChatHeader() {
  if (!state.activeChat) return;
  const type = state.activeChat.type;
  const name = state.activeChat.name;
  if (type === "group") {
    const g = getGroupProfile(name);
    const cid = "g:" + name;
    const typingSet = state.typing.get(cid);
    if (typingSet && typingSet.size > 0) {
      const list = [...typingSet].slice(0, 2).join(", ");
      chatSub.textContent = list + " typing...";
    } else {
      const parts = [];
      if (g.memberCount) parts.push(g.memberCount + " members");
      if (g.description) parts.push(g.description);
      chatSub.textContent = parts.join(" \u00b7 ") || "Group";
    }
  } else if (type === "room") {
    const cid = "r:" + name;
    const typingSet = state.typing.get(cid);
    if (typingSet && typingSet.size > 0) {
      const list = [...typingSet].slice(0, 2).join(", ");
      chatSub.textContent = list + " typing...";
    } else {
      const room = state.roomDetails[name] || state.myRooms.find(function(r) { return r.id === name; });
      const n = room?.onlineCount || 0;
      chatSub.textContent = n + " connected";
    }
  } else {
    const cid = "d:" + dmKey(state.username, name);
    const typingSet = state.typing.get(cid);
    if (typingSet && typingSet.size > 0) chatSub.textContent = "Typing...";
    else {
      const isOnline = state.onlineUsers.includes(name);
      const prof = getProfile(name);
      if (!isOnline && prof.lastSeen) {
        chatSub.textContent = "Last seen " + formatLastSeen(prof.lastSeen);
      } else {
        chatSub.textContent = presenceInfo(name).label;
      }
    }
  }
}

var profileRemoveAvatarBtn = $("#profileRemoveAvatarBtn");

headerAvatar.addEventListener("click", openProfileModal);
headerUsername.addEventListener("click", openProfileModal);

function openProfileModal() {
  if (!state.username) return;
  const profile = getProfile(state.username);
  setAvatarEl(profileAvatar, state.username, "avatar-lg");
  profileAbout.value = profile.about || "";
  profileStatus.value = profile.status || "online";
  if (profile.pfpUrl) profileRemoveAvatarBtn.style.display = "";
  else profileRemoveAvatarBtn.style.display = "none";
  profileModal.style.display = "";
}

profileClose.addEventListener("click", function() { profileModal.style.display = "none"; });
profileModal.addEventListener("click", function(e) { if (e.target === profileModal) profileModal.style.display = "none"; });

profileRemoveAvatarBtn.addEventListener("click", async function() {
  if (!state.username) return;
  try {
    const res = await fetch("/avatar-delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: state.username }),
    });
    const data = await res.json();
    if (data.ok && data.profile?.username) {
      state.profiles.set(data.profile.username, data.profile);
      updateHeaderProfile();
      setAvatarEl(profileAvatar, state.username, "avatar-lg");
      profileRemoveAvatarBtn.style.display = "none";
      renderDmList();
      updateChatHeader();
    }
  } catch(err) {}
});

profileAvatarBtn.addEventListener("click", function() { profileAvatarInput.click(); });
profileAvatarInput.addEventListener("change", async function() {
  const f = profileAvatarInput.files[0];
  if (!f || !state.username) return;
  const form = new FormData();
  form.append("avatar", f);
  form.append("username", state.username);
  try {
    const res = await fetch("/avatar", { method: "POST", body: form });
    const data = await res.json();
    if (data.ok && data.profile?.username) {
      state.profiles.set(data.profile.username, data.profile);
      updateHeaderProfile();
      setAvatarEl(profileAvatar, state.username, "avatar-lg");
      profileRemoveAvatarBtn.style.display = "";
      renderDmList();
      updateChatHeader();
    }
  } catch(err) {}
});

profileSaveBtn.addEventListener("click", async function() {
  if (!state.username) return;
  const about = profileAbout.value.trim();
  const status = profileStatus.value;
  var payload = { username: state.username, about: about, status: status };
  try {
    const res = await fetch("/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (data.ok && data.profile?.username) {
      state.profiles.set(data.profile.username, data.profile);
      updateHeaderProfile();
      renderDmList();
      updateChatHeader();
      profileModal.style.display = "none";
    }
  } catch(err) {}
});

function openUserProfile(username) {
  if (!username) return;
  const profile = getProfile(username);
  userProfileName.textContent = username;
  setAvatarEl(userProfileAvatar, username, "avatar-xl");
  const presence = presenceInfo(username);
  userProfileStatus.className = "status-pill " + presence.className;
  userProfileStatus.textContent = presence.label;

  /* Banner gradient from accent colors */
  if (userProfileBanner) {
    var ac1 = profile.accentColor || "#6366f1";
    var ac2 = profile.accentColor2 || profile.accentColor || "#4f46e5";
    if (profile.bannerUrl) {
      userProfileBanner.style.background = "url('" + profile.bannerUrl + "') center/" + "cover";
      userProfileBanner.style.backgroundPosition = "center " + (profile.bannerPosition || 50) + "%";
    } else {
      userProfileBanner.style.background = "linear-gradient(135deg, " + ac1 + ", " + ac2 + ")";
    }
  }

  /* Status badge color */
  if (userProfileStatusBadge) {
    var badgeIcon = userProfileStatusBadge.querySelector("i");
    if (badgeIcon) {
      badgeIcon.className = "fa-solid fa-circle";
      badgeIcon.style.color = presence.className === "status-online" ? "var(--success)"
        : presence.className === "status-idle" ? "var(--warning)"
        : presence.className === "status-dnd" ? "var(--danger)"
        : "#64748b";
    }
  }

  /* About section */
  if (userProfileAboutSection) {
    if (profile.about) {
      userProfileAbout.textContent = profile.about;
      userProfileAboutSection.style.display = "";
    } else {
      userProfileAboutSection.style.display = "none";
    }
  } else {
    userProfileAbout.textContent = profile.about || "No bio yet";
  }

  /* GitHub connection */
  if (userProfileGithubSection) {
    if (profile.githubUsername) {
      userProfileGithubSection.style.display = "";
      if (userProfileGithubLink) userProfileGithubLink.href = "https://github.com/" + encodeURIComponent(profile.githubUsername);
      if (userProfileGithubName) userProfileGithubName.textContent = profile.githubUsername;
    } else {
      userProfileGithubSection.style.display = "none";
    }
  }

  if (userDmBlockBtn) {
    if (username === state.username) {
      userDmBlockBtn.style.display = "none";
      userDmBlockBtn.dataset.target = "";
    } else {
      userDmBlockBtn.style.display = "";
      userDmBlockBtn.dataset.target = username;
      var blocked = isDmBlockedTarget(username);
      userDmBlockBtn.textContent = blocked ? "Unblock DM" : "Block DM";
      userDmBlockBtn.className = blocked ? "btn btn-primary btn-sm" : "btn btn-danger btn-sm";
    }
  }
  userProfileModal.style.display = "";
}

function bindProfileLinks(container) {
  if (!container) return;
  container.querySelectorAll(".js-open-profile").forEach(function(el) {
    if (el.dataset.profileBound === "1") return;
    el.dataset.profileBound = "1";
    el.addEventListener("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      var username = (el.dataset.username || "").trim();
      if (!username) return;
      openUserProfile(username);
    });
  });
}

userProfileClose.addEventListener("click", function() { userProfileModal.style.display = "none"; });
userProfileModal.addEventListener("click", function(e) { if (e.target === userProfileModal) userProfileModal.style.display = "none"; });
if (userDmBlockBtn) {
  userDmBlockBtn.addEventListener("click", async function() {
    var target = (userDmBlockBtn.dataset.target || "").trim();
    if (!target || target === state.username) return;
    var blocked = isDmBlockedTarget(target);
    if (blocked) {
      wsSend({ type: "dm-unblock-user", target: target });
      userDmBlockBtn.textContent = "Block DM";
      userDmBlockBtn.className = "btn btn-danger btn-sm";
    } else {
      var ok = await askActionConfirmation("Block DM", "Block direct messages to " + target + "?", "Block");
      if (!ok) return;
      wsSend({ type: "dm-block-user", target: target });
      userDmBlockBtn.textContent = "Unblock DM";
      userDmBlockBtn.className = "btn btn-primary btn-sm";
    }
  });
}


/* == HIDDEN SEQUENCE MODAL (Key Recorder) == */
var hiddenSeqRecordingKeys = [];

function keyDisplayLabel(keyName) {
  var map = {
    "ArrowUp": "\u2191", "ArrowDown": "\u2193", "ArrowLeft": "\u2190", "ArrowRight": "\u2192",
    " ": "Space", "Enter": "\u21B5", "Backspace": "\u232B", "Tab": "\u21E5",
    "Escape": "Esc", "Shift": "\u21E7", "Control": "Ctrl", "Alt": "Alt", "Meta": "\u2318"
  };
  return map[keyName] || keyName;
}

function renderKeyBadges(keys, container) {
  container.innerHTML = "";
  if (!keys || !keys.length) {
    container.classList.add("empty");
    container.textContent = "No sequence set";
    return;
  }
  container.classList.remove("empty");
  keys.forEach(function(k) {
    var badge = document.createElement("span");
    badge.className = "hidden-seq-key";
    badge.textContent = keyDisplayLabel(k);
    container.appendChild(badge);
  });
}

function renderRecorderKeys() {
  if (!hiddenSequenceRecorder) return;
  hiddenSequenceRecorder.innerHTML = "";
  if (!hiddenSeqRecordingKeys.length) {
    var ph = document.createElement("span");
    ph.className = "hidden-seq-recorder-placeholder";
    ph.textContent = "Press keys here to record...";
    hiddenSequenceRecorder.appendChild(ph);
    return;
  }
  hiddenSeqRecordingKeys.forEach(function(k) {
    var badge = document.createElement("span");
    badge.className = "hidden-seq-key";
    badge.textContent = keyDisplayLabel(k);
    hiddenSequenceRecorder.appendChild(badge);
  });
}

function openHiddenSequenceModal() {
  if (!hiddenSequenceModal) return;
  var seq = getHiddenSequence();
  hiddenSeqRecordingKeys = seq.slice();
  renderRecorderKeys();
  renderKeyBadges(seq, hiddenSequenceDisplay);
  hiddenSequenceModal.style.display = "";
  if (hiddenSequenceRecorder) hiddenSequenceRecorder.focus();
}

if (hiddenSequenceRecorder) {
  hiddenSequenceRecorder.addEventListener("keydown", function(e) {
    e.preventDefault();
    e.stopPropagation();
    var keyName = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (keyName === "Backspace" && hiddenSeqRecordingKeys.length) {
      hiddenSeqRecordingKeys.pop();
    } else if (keyName !== "Backspace" && keyName !== "Shift" && keyName !== "Control" && keyName !== "Alt" && keyName !== "Meta") {
      if (hiddenSeqRecordingKeys.length < 20) {
        hiddenSeqRecordingKeys.push(keyName);
      }
    }
    renderRecorderKeys();
  });
}

if (setSequenceBtn) setSequenceBtn.addEventListener("click", openHiddenSequenceModal);
if (hiddenSequenceClose) hiddenSequenceClose.addEventListener("click", function() { hiddenSequenceModal.style.display = "none"; });
if (hiddenSequenceModal) hiddenSequenceModal.addEventListener("click", function(e) { if (e.target === hiddenSequenceModal) hiddenSequenceModal.style.display = "none"; });
if (hiddenSequenceSave) {
  hiddenSequenceSave.addEventListener("click", function() {
    setHiddenSequence(hiddenSeqRecordingKeys.slice());
    renderKeyBadges(hiddenSeqRecordingKeys, hiddenSequenceDisplay);
    hiddenSequenceModal.style.display = "none";
  });
}
if (hiddenSequenceClear) {
  hiddenSequenceClear.addEventListener("click", function() {
    hiddenSeqRecordingKeys = [];
    setHiddenSequence([]);
    renderRecorderKeys();
    renderKeyBadges([], hiddenSequenceDisplay);
  });
}

/* == CONV HIDE CONTEXT MENU == */
function showConvHideCtxMenu(e, type, name) {
  if (!convHideCtxMenu || !ctxToggleHideConv) return;
  e.preventDefault();
  var isHidden = false;
  if (type === "group") isHidden = state.hiddenGroups.has(name);
  else if (type === "dm") isHidden = state.hiddenDms.has(name);
  convHideCtxPayload = { type: type, name: name };
  var icon = ctxToggleHideConv.querySelector("i");
  if (isHidden) {
    ctxToggleHideConv.innerHTML = "";
    if (icon) ctxToggleHideConv.appendChild(icon);
    else {
      icon = document.createElement("i");
      icon.className = "fa-solid fa-eye";
      ctxToggleHideConv.appendChild(icon);
    }
    icon.className = "fa-solid fa-eye";
    ctxToggleHideConv.appendChild(document.createTextNode(" Unhide Chat"));
  } else {
    ctxToggleHideConv.innerHTML = "";
    icon = document.createElement("i");
    icon.className = "fa-solid fa-eye-slash";
    ctxToggleHideConv.appendChild(icon);
    ctxToggleHideConv.appendChild(document.createTextNode(" Hide Chat"));
  }
  convHideCtxMenu.style.display = "block";
  convHideCtxMenu.style.left = Math.min(e.clientX, window.innerWidth - 220) + "px";
  convHideCtxMenu.style.top = Math.min(e.clientY, window.innerHeight - 80) + "px";
}
if (ctxToggleHideConv) {
  ctxToggleHideConv.addEventListener("click", function() {
    if (!convHideCtxPayload) return;
    var type = convHideCtxPayload.type;
    var name = convHideCtxPayload.name;
    if (type === "group") {
      if (state.hiddenGroups.has(name)) state.hiddenGroups.delete(name);
      else state.hiddenGroups.add(name);
      saveHiddenGroups();
    } else if (type === "dm") {
      if (state.hiddenDms.has(name)) state.hiddenDms.delete(name);
      else state.hiddenDms.add(name);
      saveHiddenDms();
    }
    convHideCtxMenu.style.display = "none";
    convHideCtxPayload = null;
    renderConvLists();
    if (state.showHidden) renderHiddenLists();
  });
}
document.addEventListener("click", function() {
  if (convHideCtxMenu) convHideCtxMenu.style.display = "none";
});

/* == HIDDEN TAB TOGGLE == */
function setHiddenTabVisible(visible) {
  state.showHidden = visible;
  if (!hiddenTabBtn) return;
  hiddenTabBtn.style.display = visible ? "flex" : "none";
  if (visible) {
    renderHiddenLists();
  } else {
    if (hiddenTabBtn.classList.contains("active")) {
      var groupsBtn = document.querySelector('.tab-btn[data-tab="groups"]');
      if (groupsBtn) groupsBtn.click();
    }
  }
  renderConvLists();
}

function renderHiddenLists() {
  if (hiddenGroupList) {
    hiddenGroupList.innerHTML = "";
    var hasGroups = false;
    for (var name of state.hiddenGroups) {
      if (!state.myGroups.has(name)) continue;
      hasGroups = true;
      var cid = "g:" + name;
      var last = lastMsg(cid);
      var el = document.createElement("div");
      el.className = "conv-item" + (state.activeChat && state.activeChat.type === "group" && state.activeChat.name === name ? " active" : "");
      var lastText = last ? last.from + ": " + mediaSnippet(last) : "No messages yet";
      var g = getGroupProfile(name);
      var unread = getUnreadCount(cid);
      el.innerHTML = groupAvatarHtml(name) +
        "<div class=\"conv-item-info\">" +
          "<div class=\"conv-item-name\">" + esc(name) + "</div>" +
          "<div class=\"conv-item-last\">" + (lastText || esc(g.description || "")) + "</div>" +
        "</div>" +
        "<div class=\"conv-item-meta\">" +
          (last ? timeStr(last.ts) : "") +
          (unread ? "<div class=\"conv-unread\">" + (unread >= 99 ? "99+" : unread) + "</div>" : "") +
        "</div>";
      (function(gName) {
        el.addEventListener("click", function() { openChat("group", gName); });
        el.addEventListener("contextmenu", function(e) { showConvHideCtxMenu(e, "group", gName); });
      })(name);
      hiddenGroupList.appendChild(el);
    }
    if (!hasGroups) {
      var empty = document.createElement("p");
      empty.style.cssText = "padding:8px 16px;color:var(--text-secondary);font-size:13px";
      empty.textContent = "No hidden groups";
      hiddenGroupList.appendChild(empty);
    }
  }

  if (hiddenDmList) {
    hiddenDmList.innerHTML = "";
    var hasDms = false;
    for (var username of state.hiddenDms) {
      if (!state.dmPartners.has(username)) continue;
      hasDms = true;
      var cid2 = "d:" + dmKey(state.username, username);
      var last2 = lastMsg(cid2);
      var presence = presenceInfo(username);
      var unread2 = getUnreadCount(cid2);
      var el2 = document.createElement("div");
      el2.className = "conv-item" + (state.activeChat && state.activeChat.type === "dm" && state.activeChat.name === username ? " active" : "");
      var lastText2 = last2 ? (last2.from === state.username ? "You: " : "") + mediaSnippet(last2) : presence.label;
      el2.innerHTML = avatarHtmlForUser(username) +
        "<span class=\"status-dot " + presence.className + "\"></span>" +
        "<div class=\"conv-item-info\">" +
          "<div class=\"conv-item-name\">" + esc(username) + "</div>" +
          "<div class=\"conv-item-last\">" + lastText2 + "</div>" +
        "</div>" +
        "<div class=\"conv-item-meta\">" +
          (last2 ? timeStr(last2.ts) : "") +
          (unread2 ? "<div class=\"conv-unread\">" + (unread2 >= 99 ? "99+" : unread2) + "</div>" : "") +
        "</div>";
      (function(uName) {
        el2.addEventListener("click", function() { openChat("dm", uName); });
        el2.addEventListener("contextmenu", function(e) { showConvHideCtxMenu(e, "dm", uName); });
      })(username);
      hiddenDmList.appendChild(el2);
    }
    if (!hasDms) {
      var empty2 = document.createElement("p");
      empty2.style.cssText = "padding:8px 16px;color:var(--text-secondary);font-size:13px";
      empty2.textContent = "No hidden DMs";
      hiddenDmList.appendChild(empty2);
    }
  }
}


/* == THEME SYSTEM == */
function loadTheme() {
  const saved = localStorage.getItem("bunchat-theme") || "dark";
  document.documentElement.setAttribute("data-theme", saved);
  updateThemeCards(saved);
}
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("bunchat-theme", theme);
  updateThemeCards(theme);
}
function updateThemeCards(active) {
  $$(".theme-card").forEach(function(c) {
    c.classList.toggle("active", c.dataset.theme === active);
  });
}
loadTheme();

settingsBtn.addEventListener("click", function() {
  const current = localStorage.getItem("bunchat-theme") || "dark";
  updateThemeCards(current);
  themeModal.style.display = "";
});
themeClose.addEventListener("click", function() { themeModal.style.display = "none"; });
themeModal.addEventListener("click", function(e) { if (e.target === themeModal) themeModal.style.display = "none"; });

$$(".theme-card").forEach(function(card) {
  card.addEventListener("click", function() { setTheme(card.dataset.theme); });
});

function setLeftPanelCollapsed(collapsed) {
  if (!panelLeft) return;
  panelLeft.classList.toggle("collapsed", collapsed);
  if (appShell) appShell.classList.toggle("left-collapsed", collapsed);
  const icon = leftCollapseBtn ? leftCollapseBtn.querySelector("i") : null;
  if (icon) {
    icon.classList.toggle("fa-chevron-left", !collapsed);
    icon.classList.toggle("fa-chevron-right", collapsed);
  }
}

if (leftCollapseBtn && panelLeft) {
  leftCollapseBtn.addEventListener("click", function() {
    setLeftPanelCollapsed(!panelLeft.classList.contains("collapsed"));
  });
}

if (leftExpandBtn && panelLeft) {
  leftExpandBtn.addEventListener("click", function() {
    setLeftPanelCollapsed(false);
  });
}

if (panelLeft) {
  setLeftPanelCollapsed(panelLeft.classList.contains("collapsed"));
}

const KONAMI_SEQUENCE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
var konamiProgress = 0;
var hiddenSeqProgress = 0;
const TYPING_LEADERBOARD_KEY = "bunchatTypingLeaderboard";
const TYPING_LEADERBOARD_VERSION_KEY = "bunchatTypingLeaderboardVersion";
const TYPING_LEADERBOARD_VERSION = 2;

const TYPING_WORD_POOL = [
  "the", "be", "of", "and", "a", "to", "in", "he", "have", "it", 
  "that", "for", "they", "i", "with", "as", "not", "on", "she", "at", 
  "by", "this", "we", "you", "do", "but", "from", "or", "which", "one", 
  "would", "all", "will", "there", "say", "who", "make", "when", "can", "more", 
  "if", "no", "man", "out", "other", "so", "what", "time", "up", "go", 
  "about", "than", "into", "could", "state", "only", "new", "year", "some", "take", 
  "come", "these", "know", "see", "use", "get", "like", "then", "first", "any", 
  "work", "now", "may", "such", "give", "over", "think", "most", "even", "find", 
  "day", "also", "after", "way", "many", "must", "look", "before", "great", "back", 
  "through", "long", "where", "much", "should", "well", "people", "just", "because", "good", 
  "each", "those", "feel", "seem", "how", "high", "too", "place", "little", "world", 
  "very", "still", "nation", "hand", "old", "life", "tell", "write", "become", "here", 
  "show", "house", "both", "between", "need", "mean", "call", "develop", "under", "last", 
  "right", "move", "thing", "general", "school", "never", "same", "another", "begin", "number", 
  "part", "while", "around", "want", "case", "child", "few", "system", "against", "leave", 
  "party", "lines", "point", "city", "public"
];

var typingState = {
  durationSec: 30,
  running: false,
  finished: false,
  startedAt: 0,
  endsAt: 0,
  timer: null,
  snapTimer: null,
  words: [],
  results: [],
  index: 0,
  lineOffset: 0,
  wordsPerLine: 10,
  visibleLines: 3,
  currentInput: "",
  typedChars: 0,
  correctChars: 0,
  incorrectChars: 0,
  extraChars: 0,
  missedChars: 0,
  wpmHistory: [],
};

function randomTypingWord() {
  return TYPING_WORD_POOL[Math.floor(Math.random() * TYPING_WORD_POOL.length)];
}

function seedTypingWords(count) {
  typingState.words = [];
  typingState.results = [];
  for (var i = 0; i < count; i += 1) {
    typingState.words.push(randomTypingWord());
    typingState.results.push(null);
  }
}

function ensureTypingWordsLength(minLen) {
  while (typingState.words.length < minLen) {
    typingState.words.push(randomTypingWord());
    typingState.results.push(null);
  }
}

function getTypingElapsedSec() {
  if (!typingState.startedAt) return 0;
  return Math.min(typingState.durationSec, (Date.now() - typingState.startedAt) / 1000);
}

function computeTypingMetrics() {
  var elapsedSec = Math.max(getTypingElapsedSec(), 0.5);
  var elapsedMin = elapsedSec / 60;
  var wpm = Math.max(0, Math.round((typingState.correctChars / 5) / elapsedMin));
  var rawWpm = Math.max(0, Math.round((typingState.typedChars / 5) / elapsedMin));
  var acc = typingState.typedChars > 0
    ? Math.max(0, Math.min(100, Math.round((typingState.correctChars / typingState.typedChars) * 100)))
    : 100;
  /* consistency = 100 - (coeff of variation of per-second wpm snapshots) */
  var consistency = 100;
  if (typingState.wpmHistory.length > 2) {
    var vals = typingState.wpmHistory.map(function(h) { return h.raw; });
    var avg = vals.reduce(function(s, v) { return s + v; }, 0) / vals.length;
    if (avg > 0) {
      var variance = vals.reduce(function(s, v) { var d = v - avg; return s + d * d; }, 0) / vals.length;
      var cv = Math.sqrt(variance) / avg;
      consistency = Math.max(0, Math.min(100, Math.round((1 - cv) * 100)));
    }
  }
  return { wpm: wpm, rawWpm: rawWpm, acc: acc, consistency: consistency };
}

function renderTypingWords() {
  if (!typingWords) return;
  ensureTypingWordsLength(typingState.lineOffset + typingState.wordsPerLine * (typingState.visibleLines + 2));
  var html = "";
  for (var line = 0; line < typingState.visibleLines; line += 1) {
    var start = typingState.lineOffset + line * typingState.wordsPerLine;
    var end = start + typingState.wordsPerLine;
    html += "<div class=\"typing-line\">";
    for (var idx = start; idx < end; idx += 1) {
      var word = typingState.words[idx] || "";
      if (idx < typingState.index) {
        var status = typingState.results[idx] === true ? "typed-correct" : "typed-wrong";
        html += "<span class=\"typing-word " + status + "\">" + esc(word) + "</span>";
        continue;
      }
      if (idx === typingState.index) {
        var current = typingState.currentInput || "";
        var chars = "";
        for (var i = 0; i < word.length; i += 1) {
          var expected = word[i];
          var cls = [];
          if (i === current.length) cls.push("caret");
          if (i < current.length) {
            cls.push(current[i] === expected ? "char-ok" : "char-bad");
          }
          chars += "<span" + (cls.length ? " class=\"" + cls.join(" ") + "\"" : "") + ">" + esc(expected) + "</span>";
        }
        var wordCls = "typing-word active";
        if (current.length >= word.length) {
          if (current.length === word.length) {
            wordCls += " caret-end";
          } else {
            chars += "<span class=\"char-extra caret\">" + esc(current.slice(word.length)) + "</span>";
          }
        }
        if (current.length === 0) wordCls += " caret-start";
        html += "<span class=\"" + wordCls + "\">" + chars + "</span>";
        continue;
      }
      html += "<span class=\"typing-word\">" + esc(word) + "</span>";
    }
    html += "</div>";
  }
  typingWords.innerHTML = html;
  var activeWord = typingWords.querySelector(".typing-word.active");
  if (activeWord) {
    activeWord.scrollIntoView({ block: "nearest", inline: "nearest" });
  }
}

function readTypingLeaderboardRows() {
  try {
    return JSON.parse(localStorage.getItem(TYPING_LEADERBOARD_KEY) || "[]") || [];
  } catch {
    return [];
  }
}

function writeTypingLeaderboardRows(rows) {
  localStorage.setItem(TYPING_LEADERBOARD_KEY, JSON.stringify(rows || []));
}

function normalizeTypingLeaderboardRows(rows) {
  var bestByUser = new Map();
  (rows || []).forEach(function(item) {
    if (!item) return;
    var userLabel = String(item.user || "anon").trim() || "anon";
    var userKey = userLabel.toLowerCase();
    var candidate = {
      user: userLabel,
      wpm: Math.max(0, Number(item.wpm) || 0),
      accuracy: Math.max(0, Math.min(100, Number(item.accuracy) || 0)),
      chars: Math.max(0, Number(item.chars) || 0),
      ts: Number(item.ts) || Date.now(),
    };
    var current = bestByUser.get(userKey);
    if (!current || candidate.wpm > current.wpm || (candidate.wpm === current.wpm && candidate.accuracy > current.accuracy)) {
      bestByUser.set(userKey, candidate);
    }
  });

  var normalized = Array.from(bestByUser.values());
  normalized.sort(function(a, b) {
    if (b.wpm !== a.wpm) return b.wpm - a.wpm;
    if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
    return b.ts - a.ts;
  });
  return normalized.slice(0, 10);
}

function getTypingLeaderboardRows() {
  try {
    var version = Number(localStorage.getItem(TYPING_LEADERBOARD_VERSION_KEY) || 0);
    if (version < TYPING_LEADERBOARD_VERSION) {
      localStorage.setItem(TYPING_LEADERBOARD_VERSION_KEY, String(TYPING_LEADERBOARD_VERSION));
      writeTypingLeaderboardRows([]);
      return [];
    }
    var rows = readTypingLeaderboardRows();
    var normalized = normalizeTypingLeaderboardRows(rows);
    if (normalized.length !== rows.length) {
      writeTypingLeaderboardRows(normalized);
    }
    return normalized;
  } catch {
    return [];
  }
}

function renderTypingLeaderboard() {
  if (!typingSidebarLeaderboard) return;
  var rows = getTypingLeaderboardRows();
  if (!rows.length) {
    typingSidebarLeaderboard.innerHTML = "<li>No scores yet.</li>";
    return;
  }
  var medals = ["\uD83E\uDD47", "\uD83E\uDD48", "\uD83E\uDD49"]; /* 🥇🥈🥉 */
  var rankClasses = ["lb-gold", "lb-silver", "lb-bronze"];
  typingSidebarLeaderboard.innerHTML = rows.map(function(item, i) {
    var who = esc(item.user || "anon");
    var medal = i < 3 ? medals[i] + " " : (i + 1) + ". ";
    var cls = i < 3 ? rankClasses[i] : "";
    return "<li class=\"" + cls + "\">" + medal + "<strong>" + who + "</strong> — " + item.wpm + " WPM, " + item.accuracy + "%</li>";
  }).join("");
}

function saveTypingScore(metrics) {
  var rows = getTypingLeaderboardRows();
  var userLabel = String(state.username || "guest").trim() || "guest";
  var userKey = userLabel.toLowerCase();
  var existingIndex = rows.findIndex(function(item) {
    return String(item.user || "").trim().toLowerCase() === userKey;
  });

  if (existingIndex === -1) {
    rows.push({
      user: userLabel,
      wpm: metrics.wpm,
      accuracy: metrics.acc,
      chars: typingState.typedChars,
      ts: Date.now(),
    });
  } else {
    var existing = rows[existingIndex];
    if (metrics.wpm > Number(existing.wpm || 0)) {
      rows[existingIndex] = {
        user: userLabel,
        wpm: metrics.wpm,
        accuracy: metrics.acc,
        chars: typingState.typedChars,
        ts: Date.now(),
      };
    }
  }

  rows = normalizeTypingLeaderboardRows(rows);
  writeTypingLeaderboardRows(rows);
}

function updateTypingStats() {
  var metrics = computeTypingMetrics();
  if (typingWpm) typingWpm.textContent = String(metrics.wpm);
  if (typingAcc) typingAcc.textContent = String(metrics.acc);
  if (typingTime) {
    var left = Math.max(0, Math.ceil((typingState.endsAt - Date.now()) / 1000));
    typingTime.textContent = String(left);
  }
}

function takeWpmSnapshot() {
  if (!typingState.running || !typingState.startedAt) return;
  var sec = Math.round((Date.now() - typingState.startedAt) / 1000);
  if (sec < 1) return;
  var elapsedMin = sec / 60;
  var wpm = Math.max(0, Math.round((typingState.correctChars / 5) / elapsedMin));
  var raw = Math.max(0, Math.round((typingState.typedChars / 5) / elapsedMin));
  typingState.wpmHistory.push({ sec: sec, wpm: wpm, raw: raw });
}

function drawTypingGraph() {
  if (!typingGraph || !typingState.wpmHistory.length) return;
  var ctx = typingGraph.getContext("2d");
  var dpr = window.devicePixelRatio || 1;
  var rect = typingGraph.getBoundingClientRect();
  typingGraph.width = rect.width * dpr;
  typingGraph.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  var W = rect.width;
  var H = rect.height;
  var pad = { top: 16, right: 16, bottom: 28, left: 42 };
  var plotW = W - pad.left - pad.right;
  var plotH = H - pad.top - pad.bottom;
  var data = typingState.wpmHistory;
  var maxSec = typingState.durationSec;
  var allVals = data.map(function(d) { return d.wpm; }).concat(data.map(function(d) { return d.raw; }));
  var maxWpm = Math.max(40, Math.max.apply(null, allVals));
  maxWpm = Math.ceil(maxWpm / 20) * 20;

  /* grid lines */
  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.lineWidth = 1;
  var yStep = maxWpm <= 60 ? 10 : 20;
  for (var g = 0; g <= maxWpm; g += yStep) {
    var gy = pad.top + plotH - (g / maxWpm) * plotH;
    ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(pad.left + plotW, gy); ctx.stroke();
  }

  /* y axis labels */
  ctx.fillStyle = "rgba(255,255,255,0.3)";
  ctx.font = "11px Inter, sans-serif";
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  for (var g = 0; g <= maxWpm; g += yStep) {
    var gy = pad.top + plotH - (g / maxWpm) * plotH;
    ctx.fillText(String(g), pad.left - 8, gy);
  }

  /* x axis labels */
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  var xStep = maxSec <= 15 ? 5 : maxSec <= 30 ? 5 : 10;
  for (var xs = 0; xs <= maxSec; xs += xStep) {
    var gx = pad.left + (xs / maxSec) * plotW;
    ctx.fillText(String(xs) + "s", gx, pad.top + plotH + 8);
  }

  function px(d) {
    return { x: pad.left + (d.sec / maxSec) * plotW, y: pad.top + plotH - (Math.min(d.wpm, maxWpm) / maxWpm) * plotH };
  }
  function pxRaw(d) {
    return { x: pad.left + (d.sec / maxSec) * plotW, y: pad.top + plotH - (Math.min(d.raw, maxWpm) / maxWpm) * plotH };
  }

  /* raw wpm line (muted) */
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 2;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  data.forEach(function(d, i) { var p = pxRaw(d); if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
  ctx.stroke();
  ctx.setLineDash([]);

  /* accent color */
  var cs = getComputedStyle(document.documentElement);
  var accent = (cs.getPropertyValue("--accent") || "#6366f1").trim();
  var success = (cs.getPropertyValue("--success") || "#22c55e").trim();

  /* gradient fill under wpm line */
  ctx.globalAlpha = 0.13;
  ctx.fillStyle = accent;
  ctx.beginPath();
  data.forEach(function(d, i) { var p = px(d); if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
  var lastPx = px(data[data.length - 1]);
  var firstPx = px(data[0]);
  ctx.lineTo(lastPx.x, pad.top + plotH);
  ctx.lineTo(firstPx.x, pad.top + plotH);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;

  /* wpm line (accent, thick) */
  ctx.strokeStyle = accent;
  ctx.lineWidth = 2.5;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.beginPath();
  data.forEach(function(d, i) { var p = px(d); if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
  ctx.stroke();

  /* dots on wpm line */
  ctx.fillStyle = accent;
  data.forEach(function(d) { var p = px(d); ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); ctx.fill(); });

  /* legend */
  var lx = pad.left + 8, ly = pad.top + 4;
  ctx.font = "10px Inter, sans-serif";
  ctx.fillStyle = accent;
  ctx.fillRect(lx, ly, 12, 3);
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("wpm", lx + 16, ly + 2);
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 2;
  ctx.setLineDash([4, 4]);
  ctx.beginPath(); ctx.moveTo(lx + 52, ly + 1.5); ctx.lineTo(lx + 64, ly + 1.5); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillText("raw", lx + 68, ly + 2);
}

function finishTypingTest() {
  typingState.finished = true;
  typingState.running = false;
  if (typingState.timer) { clearInterval(typingState.timer); typingState.timer = null; }
  if (typingState.snapTimer) { clearInterval(typingState.snapTimer); typingState.snapTimer = null; }
  takeWpmSnapshot();
  if (typingHiddenInput) typingHiddenInput.disabled = true;

  var metrics = computeTypingMetrics();
  if (typingResultWpm) typingResultWpm.textContent = String(metrics.wpm);
  if (typingResultRaw) typingResultRaw.textContent = String(metrics.rawWpm);
  if (typingResultAcc) typingResultAcc.textContent = String(metrics.acc) + "%";
  if (typingResultConsistency) typingResultConsistency.textContent = String(metrics.consistency) + "%";
  if (typingResultTime) typingResultTime.textContent = String(typingState.durationSec) + "s";
  if (typingResultType) typingResultType.textContent = "time " + typingState.durationSec;

  /* characters: correct/incorrect/extra/missed */
  if (typingResultChars) {
    typingResultChars.innerHTML =
      "<span class=\"char-stat-ok\">" + typingState.correctChars + "</span>" +
      " / <span class=\"char-stat-bad\">" + typingState.incorrectChars + "</span>" +
      " / <span class=\"char-stat-extra\">" + typingState.extraChars + "</span>" +
      " / <span class=\"char-stat-missed\">" + typingState.missedChars + "</span>";
  }

  /* show result, hide test */
  if (typingTestView) typingTestView.style.display = "none";
  if (typingResultView) typingResultView.style.display = "";
  setTimeout(function() { drawTypingGraph(); }, 60);

  saveTypingScore(metrics);
  renderTypingLeaderboard();
}

function startTypingTest() {
  typingState.running = false;
  typingState.finished = false;
  typingState.startedAt = 0;
  typingState.endsAt = 0;
  typingState.index = 0;
  typingState.lineOffset = 0;
  typingState.currentInput = "";
  typingState.typedChars = 0;
  typingState.correctChars = 0;
  typingState.incorrectChars = 0;
  typingState.extraChars = 0;
  typingState.missedChars = 0;
  typingState.wpmHistory = [];
  if (typingState.timer) { clearInterval(typingState.timer); typingState.timer = null; }
  if (typingState.snapTimer) { clearInterval(typingState.snapTimer); typingState.snapTimer = null; }
  seedTypingWords(typingState.wordsPerLine * (typingState.visibleLines + 6));
  if (typingHiddenInput) {
    typingHiddenInput.value = "";
    typingHiddenInput.disabled = false;
  }
  if (typingTestView) typingTestView.style.display = "";
  if (typingResultView) typingResultView.style.display = "none";
  if (typingTime) typingTime.textContent = String(typingState.durationSec);
  if (typingWpm) typingWpm.textContent = "0";
  if (typingAcc) typingAcc.textContent = "100";
  renderTypingWords();
  /* highlight active duration btn */
  document.querySelectorAll(".typing-dur-btn").forEach(function(b) {
    b.classList.toggle("active", Number(b.dataset.dur) === typingState.durationSec);
  });
}

function startTypingTimerIfNeeded() {
  if (typingState.running || typingState.finished) return;
  typingState.running = true;
  typingState.startedAt = Date.now();
  typingState.endsAt = typingState.startedAt + typingState.durationSec * 1000;
  typingState.timer = setInterval(function() {
    updateTypingStats();
    if (Date.now() >= typingState.endsAt) {
      finishTypingTest();
    }
  }, 120);
  /* snapshot wpm every second for graph */
  typingState.snapTimer = setInterval(function() {
    takeWpmSnapshot();
  }, 1000);
}

function handleTypingInputEvent() {
  if (!typingHiddenInput || typingState.finished) return;
  startTypingTimerIfNeeded();
  var val = typingHiddenInput.value || "";
  typingState.currentInput = val;

  if (val.indexOf(" ") !== -1) {
    var submitted = val.trim();
    var target = typingState.words[typingState.index] || "";
    var minLen = Math.min(submitted.length, target.length);
    var matched = 0;
    for (var i = 0; i < minLen; i += 1) {
      if (submitted[i] === target[i]) matched += 1;
    }
    var extra = Math.max(0, submitted.length - target.length);
    var missed = Math.max(0, target.length - submitted.length);
    var incorrect = minLen - matched;
    /* count the space keystroke (+1) for both typed and correct (if word matched) */
    typingState.typedChars += submitted.length + 1;
    if (submitted === target) {
      typingState.correctChars += target.length + 1;
    } else {
      typingState.correctChars += matched;
    }
    typingState.incorrectChars += incorrect;
    typingState.extraChars += extra;
    typingState.missedChars += missed;
    typingState.results[typingState.index] = (submitted === target);
    typingState.index += 1;
    typingHiddenInput.value = "";
    typingState.currentInput = "";
    if (typingState.index >= typingState.lineOffset + typingState.wordsPerLine) {
      typingState.lineOffset += typingState.wordsPerLine;
    }
    ensureTypingWordsLength(typingState.lineOffset + typingState.wordsPerLine * (typingState.visibleLines + 3));
  }

  renderTypingWords();
  updateTypingStats();
}

function openTypingArena() {
  if (!typingArena) return;
  if (panelRight && typingArena.parentElement !== panelRight) {
    panelRight.appendChild(typingArena);
  }
  typingArena.style.display = "flex";
  if (!typingState.words.length || typingState.finished) startTypingTest();
  renderTypingLeaderboard();
  setTimeout(function() {
    if (typingHiddenInput) typingHiddenInput.focus();
  }, 20);
}

function closeTypingArena() {
  if (!typingArena) return;
  typingArena.style.display = "none";
  if (typingState.timer) { clearInterval(typingState.timer); typingState.timer = null; }
  if (typingState.snapTimer) { clearInterval(typingState.snapTimer); typingState.snapTimer = null; }
  typingState.running = false;
}

function setTypingTabVisible(visible) {
  state.typingUnlocked = visible;
  if (!typingTabBtn) return;
  typingTabBtn.style.display = visible ? "flex" : "none";
  if (visible) renderTypingLeaderboard();
  if (!visible) {
    closeTypingArena();
    if (typingTabBtn.classList.contains("active")) {
      var groupsBtn = document.querySelector('.tab-btn[data-tab="groups"]');
      if (groupsBtn) groupsBtn.click();
    }
  }
}

document.addEventListener("keydown", function(e) {
  if (typingArena && typingArena.style.display !== "none") {
    if (e.key === "Escape") {
      e.preventDefault();
      closeTypingArena();
    }
    return;
  }
  /* Skip if user is in the hidden sequence recorder */
  if (e.target && e.target.id === "hiddenSequenceRecorder") return;

  var t = e.target;
  if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;

  var key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

  /* Konami code detection */
  var expected = KONAMI_SEQUENCE[konamiProgress];
  if (key === expected) {
    konamiProgress += 1;
    if (konamiProgress === KONAMI_SEQUENCE.length) {
      setTypingTabVisible(!state.typingUnlocked);
      konamiProgress = 0;
    }
  } else {
    konamiProgress = key === KONAMI_SEQUENCE[0] ? 1 : 0;
  }

  /* Hidden sequence detection */
  var seq = getHiddenSequence();
  if (seq.length) {
    var seqExpected = seq[hiddenSeqProgress];
    if (key === seqExpected) {
      hiddenSeqProgress += 1;
      if (hiddenSeqProgress === seq.length) {
        setHiddenTabVisible(!state.showHidden);
        hiddenSeqProgress = 0;
      }
    } else {
      hiddenSeqProgress = key === seq[0] ? 1 : 0;
    }
  }
});

if (typingOpenBtn) typingOpenBtn.addEventListener("click", function() { openTypingArena(); });
if (typingRestartBtn) typingRestartBtn.addEventListener("click", function() { startTypingTest(); if (typingHiddenInput) typingHiddenInput.focus(); });
if (typingCloseBtn) typingCloseBtn.addEventListener("click", function() { closeTypingArena(); });

/* Duration selector */
document.querySelectorAll(".typing-dur-btn").forEach(function(btn) {
  btn.addEventListener("click", function() {
    var dur = Number(btn.dataset.dur);
    if (dur && dur !== typingState.durationSec) {
      typingState.durationSec = dur;
      document.querySelectorAll(".typing-dur-btn").forEach(function(b) { b.classList.toggle("active", Number(b.dataset.dur) === dur); });
      startTypingTest();
      if (typingHiddenInput) typingHiddenInput.focus();
    }
  });
});
if (typingHiddenInput) {
  typingHiddenInput.addEventListener("input", handleTypingInputEvent);
  typingHiddenInput.addEventListener("keydown", function(e) {
    if (e.key === "Escape") closeTypingArena();
  });
}
if (typingWords) {
  typingWords.addEventListener("click", function() {
    if (typingHiddenInput && !typingState.finished) typingHiddenInput.focus();
  });
}

setTypingTabVisible(false);


/* == TABS == */
$$(".tab-btn").forEach(function(btn) {
  btn.addEventListener("click", function() {
    $$(".tab-btn").forEach(function(b) { b.classList.remove("active"); });
    btn.classList.add("active");
    $$(".tab-content").forEach(function(c) { c.classList.remove("active"); });
    document.querySelector("#" + btn.dataset.tab + "Tab").classList.add("active");
  });
});

if (dmSearchInput) {
  dmSearchInput.addEventListener("input", function() {
    state.dmSearch = dmSearchInput.value;
    renderDmList();
  });
}

if (roomFab) roomFab.addEventListener("click", function() { roomFabPopupOverlay.style.display = ""; });
if (roomFabPopupClose) roomFabPopupClose.addEventListener("click", function() { roomFabPopupOverlay.style.display = "none"; });
if (roomFabPopupOverlay) roomFabPopupOverlay.addEventListener("click", function(e) { if (e.target === roomFabPopupOverlay) roomFabPopupOverlay.style.display = "none"; });

if (roomFabCreateOption) {
  roomFabCreateOption.addEventListener("click", function() {
    roomFabPopupOverlay.style.display = "none";
    createRoomNameInput.value = "";
    createRoomModal.style.display = "";
    createRoomNameInput.focus();
  });
}

if (roomFabSearchOption) {
  roomFabSearchOption.addEventListener("click", function() {
    roomFabPopupOverlay.style.display = "none";
    searchRoomInput.value = "";
    searchRoomResults.innerHTML = "";
    searchRoomModal.style.display = "";
    searchRoomInput.focus();
  });
}

if (createRoomClose) createRoomClose.addEventListener("click", function() { createRoomModal.style.display = "none"; });
if (createRoomModal) createRoomModal.addEventListener("click", function(e) { if (e.target === createRoomModal) createRoomModal.style.display = "none"; });
if (createRoomSubmitBtn) {
  createRoomSubmitBtn.addEventListener("click", function() {
    const name = (createRoomNameInput.value || "").trim();
    if (!name) return;
    wsSend({ type: "create-room", name: name });
    createRoomModal.style.display = "none";
  });
}
if (createRoomNameInput) createRoomNameInput.addEventListener("keydown", function(e) { if (e.key === "Enter") createRoomSubmitBtn.click(); });

if (searchRoomClose) searchRoomClose.addEventListener("click", function() { searchRoomModal.style.display = "none"; });
if (searchRoomModal) searchRoomModal.addEventListener("click", function(e) { if (e.target === searchRoomModal) searchRoomModal.style.display = "none"; });
if (searchRoomInput) {
  searchRoomInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      wsSend({ type: "search-rooms", query: searchRoomInput.value.trim() });
    }
  });
}

if (roomMuteDurationRange) {
  roomMuteDurationRange.addEventListener("input", updateRoomMuteDurationReadout);
  updateRoomMuteDurationReadout();
}
if (roomMuteDurationClose) roomMuteDurationClose.addEventListener("click", closeRoomMuteDurationModal);
if (roomMuteDurationCancel) roomMuteDurationCancel.addEventListener("click", closeRoomMuteDurationModal);
if (roomMuteDurationModal) {
  roomMuteDurationModal.addEventListener("click", function(e) {
    if (e.target === roomMuteDurationModal) closeRoomMuteDurationModal();
  });
}
if (roomMuteDurationConfirm) {
  roomMuteDurationConfirm.addEventListener("click", function() {
    if (!roomMuteDurationPayload) return;
    var mins = Number(roomMuteDurationRange && roomMuteDurationRange.value);
    var durationMinutes = (mins && mins >= 121) ? null : mins;
    wsSend({
      type: "room-mute-member",
      roomId: roomMuteDurationPayload.roomId,
      target: roomMuteDurationPayload.target,
      durationMinutes: durationMinutes,
    });
    closeRoomMuteDurationModal();
  });
}


/* == FAB + Create/Join Modals == */
groupFab.addEventListener("click", function() {
  fabPopupOverlay.style.display = "";
});
fabPopupClose.addEventListener("click", function() { fabPopupOverlay.style.display = "none"; });
fabPopupOverlay.addEventListener("click", function(e) { if (e.target === fabPopupOverlay) fabPopupOverlay.style.display = "none"; });

fabCreateOption.addEventListener("click", function() {
  fabPopupOverlay.style.display = "none";
  createGroupNameInput.value = "";
  createGroupModal.style.display = "";
  createGroupNameInput.focus();
});
fabJoinOption.addEventListener("click", function() {
  fabPopupOverlay.style.display = "none";
  joinGroupNameInput.value = "";
  joinGroupCodeInput.value = "";
  joinGroupModal.style.display = "";
  joinGroupNameInput.focus();
});

createGroupClose.addEventListener("click", function() { createGroupModal.style.display = "none"; });
createGroupModal.addEventListener("click", function(e) { if (e.target === createGroupModal) createGroupModal.style.display = "none"; });
createGroupSubmitBtn.addEventListener("click", function() {
  const name = createGroupNameInput.value.trim();
  if (!name) return;
  wsSend({ type: "create-group", name: name });
  createGroupModal.style.display = "none";
});
createGroupNameInput.addEventListener("keydown", function(e) { if (e.key === "Enter") createGroupSubmitBtn.click(); });

joinGroupClose.addEventListener("click", function() { joinGroupModal.style.display = "none"; });
joinGroupModal.addEventListener("click", function(e) { if (e.target === joinGroupModal) joinGroupModal.style.display = "none"; });
joinGroupSubmitBtn.addEventListener("click", function() {
  const name = joinGroupNameInput.value.trim();
  const code = joinGroupCodeInput.value.trim();
  if (!name || !code) return;
  wsSend({ type: "join-group", name: name, code: code });
  joinGroupModal.style.display = "none";
});
joinGroupCodeInput.addEventListener("keydown", function(e) { if (e.key === "Enter") joinGroupSubmitBtn.click(); });


/* == RENDER == */
function renderConvLists() { renderGroupList(); renderDmList(); renderRoomList(); updateTabBadges(); }

function updateTabBadges() {
  var groupCount = 0, dmCount = 0, roomCount = 0, postCount = 0;
  state.unreadCounts.forEach(function(cnt, cid) {
    if (cid.startsWith("g:")) groupCount += cnt;
    else if (cid.startsWith("d:")) dmCount += cnt;
    else if (cid.startsWith("r:")) roomCount += cnt;
  });
  if (state.postNotifs && state.postNotifs.length) postCount = state.postNotifs.length;
  setBadge("tabBadgeGroups", groupCount);
  setBadge("tabBadgeDms", dmCount);
  setBadge("tabBadgeRooms", roomCount);
  setBadge("tabBadgePosts", postCount);
}
function setBadge(id, count) {
  var el = document.getElementById(id);
  if (!el) return;
  if (count > 0) {
    el.textContent = count > 99 ? "99+" : count;
    el.style.display = "inline-flex";
  } else {
    el.textContent = "";
    el.style.display = "none";
  }
}

function renderGroupList() {
  groupConvList.innerHTML = "";
  for (const name of state.myGroups) {
    if (state.hiddenGroups.has(name)) continue;
    const cid = "g:" + name;
    const last = lastMsg(cid);
    const el = document.createElement("div");
    el.className = "conv-item" + (state.activeChat?.type === "group" && state.activeChat.name === name ? " active" : "");
    const lastText = last ? last.from + ": " + mediaSnippet(last) : "No messages yet";
    const g = getGroupProfile(name);
    const unread = getUnreadCount(cid);
    const mentionUnread = hasUnreadMention(cid);
    const unreadLabel = unread >= 99 ? "99+" : unread;
    el.innerHTML = groupAvatarHtml(name) +
      "<div class=\"conv-item-info\">" +
        "<div class=\"conv-item-name\">" + esc(name) + "</div>" +
        "<div class=\"conv-item-last\">" + (lastText || esc(g.description || "")) + "</div>" +
      "</div>" +
      "<div class=\"conv-item-meta\">" +
        (last ? timeStr(last.ts) : "") +
        (mentionUnread ? "<div class=\"conv-mention-ping\"><span class=\"mention-prefix\">@</span><i class=\"fa-solid fa-bell\"></i><span class=\"mention-count\">" + unreadLabel + "</span></div>" : "") +
        (!mentionUnread && unread ? "<div class=\"conv-unread\">" + unreadLabel + "</div>" : "") +
      "</div>";
    el.addEventListener("click", function() { openChat("group", name); });
    (function(gName) {
      el.addEventListener("contextmenu", function(e) { showConvHideCtxMenu(e, "group", gName); });
    })(name);
    groupConvList.appendChild(el);
  }
}

function renderDmList() {
  dmConvList.innerHTML = "";
  const query = (state.dmSearch || "").trim().toLowerCase();
  const partners = [...state.dmPartners].filter(function(u) { return u !== state.username; });
  const sortedPartners = partners.sort(function(a, b) { return a.localeCompare(b); });

  if (sortedPartners.length) {
    const label = document.createElement("div");
    label.className = "conv-section";
    label.textContent = "Direct messages";
    dmConvList.appendChild(label);
  }

  sortedPartners.forEach(function(username) {
    if (state.hiddenDms.has(username)) return;
    const cid = "d:" + dmKey(state.username, username);
    const last = lastMsg(cid);
    const presence = presenceInfo(username);
    const unread = getUnreadCount(cid);
    const el = document.createElement("div");
    el.className = "conv-item" + (state.activeChat?.type === "dm" && state.activeChat.name === username ? " active" : "");
    const profile = getProfile(username);
    const isOnline = state.onlineUsers.includes(username);
    var lastSeenLabel = "";
    if (!isOnline && profile.lastSeen) {
      lastSeenLabel = "<div class=\"conv-item-lastseen\">Last seen " + formatLastSeen(profile.lastSeen) + "</div>";
    }
    const lastText = last ? (last.from === state.username ? "You: " : "") + mediaSnippet(last) : presence.label;
    el.innerHTML = avatarHtmlForUser(username) +
      "<span class=\"status-dot " + presence.className + "\"></span>" +
      "<div class=\"conv-item-info\">" +
        "<div class=\"conv-item-name\">" + esc(username) + "</div>" +
        "<div class=\"conv-item-last\">" + lastText + "</div>" +
        lastSeenLabel +
      "</div>" +
      "<div class=\"conv-item-meta\">" +
        (last ? timeStr(last.ts) : "") +
        (unread ? "<div class=\"conv-unread\">" + (unread >= 99 ? "99+" : unread) + "</div>" : "") +
      "</div>";
    el.addEventListener("click", function() { openChat("dm", username); });
    (function(uName) {
      el.addEventListener("contextmenu", function(e) { showConvHideCtxMenu(e, "dm", uName); });
    })(username);
    dmConvList.appendChild(el);
  });

  if (query) {
    const results = state.allUsers
      .filter(function(u) { return u !== state.username && u.toLowerCase().includes(query); })
      .sort(function(a, b) { return a.localeCompare(b); });
    const label = document.createElement("div");
    label.className = "conv-section";
    label.textContent = results.length ? "Search results" : "No results";
    dmConvList.appendChild(label);

    results.forEach(function(username) {
      const cid = "d:" + dmKey(state.username, username);
      const last = lastMsg(cid);
      const presence = presenceInfo(username);
      const el = document.createElement("div");
      el.className = "conv-item" + (state.activeChat?.type === "dm" && state.activeChat.name === username ? " active" : "");
      const lastText = last ? (last.from === state.username ? "You: " : "") + mediaSnippet(last) : presence.label;
      el.innerHTML = avatarHtmlForUser(username) +
        "<span class=\"status-dot " + presence.className + "\"></span>" +
        "<div class=\"conv-item-info\">" +
          "<div class=\"conv-item-name\">" + esc(username) + "</div>" +
          "<div class=\"conv-item-last\">" + lastText + "</div>" +
        "</div>" +
        (last ? "<div class=\"conv-item-meta\">" + timeStr(last.ts) + "</div>" : "");
      el.addEventListener("click", function() { openChat("dm", username); });
      dmConvList.appendChild(el);
    });
  }
}

function renderRoomList() {
  if (!roomConvList) return;
  roomConvList.innerHTML = "";
  if (!state.myRooms.length) {
    roomConvList.innerHTML = "<div class=\"conv-section\">No rooms in your list. Use + to search/create.</div>";
    return;
  }

  state.myRooms.forEach(function(room) {
    const roomId = room.id;
    const cid = "r:" + roomId;
    const last = lastMsg(cid);
    const joined = state.joinedRoomIds.has(roomId);
    const el = document.createElement("div");
    el.className = "conv-item" + (state.activeChat?.type === "room" && state.activeChat.name === roomId ? " active" : "");
    const lastText = last ? (last.from === state.username ? "You: " : "") + mediaSnippet(last) : "Public room";
    const users = room.onlineCount || 0;
    const unread = getUnreadCount(cid);
    const mentionUnread = hasUnreadMention(cid);
    const unreadLabel = unread >= 99 ? "99+" : unread;
    const iconHtml = room.iconUrl
      ? "<span class=\"avatar-sm avatar-img\" style=\"background-image:url('" + room.iconUrl + "')\"></span>"
      : "<span class=\"avatar-sm\" style=\"background:#0ea5e9\">#</span>";
    el.innerHTML = iconHtml +
      "<div class=\"conv-item-info\">" +
        "<div class=\"conv-item-name\">#" + esc(room.name) + "</div>" +
        "<div class=\"conv-item-last\">" + lastText + "</div>" +
      "</div>" +
      "<div class=\"conv-item-meta\">" +
        "<span class=\"room-online-badge\"><i class=\"fa-solid fa-circle\"></i> " + users + "</span>" +
        (mentionUnread ? "<div class=\"conv-mention-ping\"><span class=\"mention-prefix\">@</span><i class=\"fa-solid fa-bell\"></i><span class=\"mention-count\">" + unreadLabel + "</span></div>" : "") +
        (!mentionUnread && unread ? "<div class=\"conv-unread\">" + unreadLabel + "</div>" : "") +
        "<br><button class=\"btn btn-outline btn-sm room-toggle\" data-room-id=\"" + esc(roomId) + "\">" + (joined ? "Leave" : "Join") + "</button>" +
      "</div>";

    el.addEventListener("click", function(ev) {
      if (ev.target.closest(".room-toggle")) return;
      if (state.joinedRoomIds.has(roomId)) openChat("room", roomId);
      else wsSend({ type: "join-room", roomId: roomId });
    });
    el.addEventListener("contextmenu", function(e) {
      e.preventDefault();
      if (!roomListActionModal) return;
      roomListActionTitle.textContent = "#" + room.name;
      roomListActionText.textContent = room.owner === state.username
        ? "You own this room. You cannot remove it from your list, but you can delete it forever."
        : "Select remove to remove this room from your list.";
      roomListRemoveBtn.style.display = room.owner === state.username ? "none" : "";
      roomListDeleteBtn.style.display = room.owner === state.username ? "" : "none";

      roomListRemoveBtn.onclick = function() {
        wsSend({ type: "room-remove-from-list", roomId: roomId });
        roomListActionModal.style.display = "none";
      };
      roomListDeleteBtn.onclick = function() {
        if (confirm("Delete this room forever? This cannot be undone.")) {
          wsSend({ type: "room-delete", roomId: roomId });
          roomListActionModal.style.display = "none";
        }
      };
      roomListActionModal.style.display = "";
    });
    roomConvList.appendChild(el);
  });

  roomConvList.querySelectorAll(".room-toggle").forEach(function(btn) {
    btn.addEventListener("click", function(ev) {
      ev.stopPropagation();
      const roomId = btn.dataset.roomId;
      if (!roomId) return;
      if (state.joinedRoomIds.has(roomId)) wsSend({ type: "leave-room", roomId: roomId });
      else wsSend({ type: "join-room", roomId: roomId });
    });
  });
}

if (roomListActionClose) roomListActionClose.addEventListener("click", function() { roomListActionModal.style.display = "none"; });
if (roomListActionModal) roomListActionModal.addEventListener("click", function(e) { if (e.target === roomListActionModal) roomListActionModal.style.display = "none"; });


function openChat(type, name) {
  state.activeChat = { type: type, name: name };
  stopInlineEdit(true);
  clearReplyTarget();
  clearUnreadForActiveChat();
  noChatPlaceholder.style.display = "none";
  chatArea.style.display = "";
  clearPhotoPreview();
  typingActive = false;
  if (typingTimer) { clearTimeout(typingTimer); typingTimer = null; }

  if (type === "group") {
    ensureGroupMembersLoaded(name);
    setGroupAvatarEl(chatAvatar, name, "avatar-sm");
    chatName.textContent = name;
    chatInfoBtn.style.display = "";
    chatAvatar.onclick = null;
    chatName.onclick = null;
  } else if (type === "room") {
    const room = state.roomDetails[name] || state.myRooms.find(function(r) { return r.id === name; });
    chatAvatar.className = "avatar-sm";
    if (room?.iconUrl) {
      chatAvatar.classList.add("avatar-img");
      chatAvatar.style.backgroundImage = "url('" + room.iconUrl + "')";
      chatAvatar.style.backgroundColor = "";
      chatAvatar.textContent = "";
    } else {
      chatAvatar.classList.remove("avatar-img");
      chatAvatar.style.backgroundImage = "";
      chatAvatar.style.backgroundColor = "#0ea5e9";
      chatAvatar.textContent = "#";
    }
    chatName.textContent = "#" + (room?.name || "room");
    chatInfoBtn.style.display = "";
    chatAvatar.onclick = null;
    chatName.onclick = null;
  } else {
    setAvatarEl(chatAvatar, name, "avatar-sm");
    chatName.textContent = name;
    chatInfoBtn.style.display = "none";
    chatAvatar.onclick = function() { openUserProfile(name); };
    chatName.onclick = function() { openUserProfile(name); };
  }

  updateChatHeader();
  renderChat();
  renderConvLists();
  updateMentionSuggestions();
  updateMSSBar();
  /* Re-check per-room mute state when switching to a room */
  if (type === "room") {
    var rmInfo = state.roomMSS[name];
    if (rmInfo && rmInfo.muted) {
      disableChatInput("You are muted in this room.");
    } else {
      enableChatInput();
    }
  } else if (type === "dm") {
    if (isDmBlockedTarget(name)) disableChatInput("You blocked this DM. Unblock to send messages.");
    else enableChatInput();
  } else {
    enableChatInput();
  }
  msgInput.focus();
}

function closeChat() {
  if (state.activeChat) sendTyping(false);
  state.activeChat = null;
  stopInlineEdit(true);
  clearReplyTarget();
  hideMentionSuggestions();
  chatArea.style.display = "none";
  noChatPlaceholder.style.display = "";
}

document.addEventListener("click", function() {
  if (state.activeChat?.type === "room") {
    wsSend({ type: "room-activity", roomId: state.activeChat.name });
  }
});
document.addEventListener("keydown", function() {
  if (state.activeChat?.type === "room") {
    wsSend({ type: "room-activity", roomId: state.activeChat.name });
  }
});

function renderChat() {
  chatMessages.innerHTML = "";
  const cid = activeConvId();
  if (!cid) return;
  const arr = convMessages.get(cid) || [];
  let lastDate = "";
  let lastFrom = "";
  for (const m of arr) {
    const dl = dateLabel(m.ts);
    if (dl !== lastDate) {
      lastDate = dl;
      lastFrom = "";
      const sep = document.createElement("div");
      sep.className = "day-sep";
      sep.innerHTML = "<span>" + dl + "</span>";
      chatMessages.appendChild(sep);
    }
    const el = buildMsgEl(m);
    if (m.kind !== "system" && m.from === lastFrom && m.from !== state.username) el.classList.add("same-sender");
    lastFrom = m.from;
    chatMessages.appendChild(el);
  }
  scrollChat();
}

function appendMessageEl(m) {
  const cid = activeConvId();
  const arr = convMessages.get(cid) || [];
  const idx = arr.indexOf(m);
  if (idx === 0 || dateLabel(m.ts) !== dateLabel(arr[idx - 1].ts)) {
    const sep = document.createElement("div");
    sep.className = "day-sep";
    sep.innerHTML = "<span>" + dateLabel(m.ts) + "</span>";
    chatMessages.appendChild(sep);
  }
  const el = buildMsgEl(m);
  const lastRow = chatMessages.querySelector(".msg-row:last-of-type");
  if (lastRow && lastRow.dataset.from === m.from && m.from !== state.username && m.kind !== "system") {
    el.classList.add("same-sender");
  }
  chatMessages.appendChild(el);
}

function buildMsgEl(m) {
  /* ── System messages (join, leave, promote, etc.) ── */
  if (m.kind === "system") {
    const row = document.createElement("div");
    row.className = "msg-row system";
    row.dataset.id = m.id;
    row.dataset.from = "__system__";
    row.innerHTML = "<div class=\"msg-system-bubble\">" + esc(m.text) + "</div>";
    return row;
  }

  const me = m.from === state.username;
  const row = document.createElement("div");
  row.className = "msg-row " + (me ? "me" : "them");
  if (!me && (state.activeChat?.type === "group" || state.activeChat?.type === "room") && messageMentionsCurrentUser(m)) {
    row.classList.add("mention-for-me");
  }
  row.dataset.id = m.id;
  row.dataset.from = m.from;

  let inner = "";

  if (m.deletedForEveryone) {
    inner += "<div class=\"msg-deleted\"><i class=\"fa-solid fa-ban\"></i> " + esc(m.deletedBy || m.from) + " deleted this message</div>";
    inner += "<div class=\"msg-time\">" + timeStr(m.ts) + "</div>";
    row.innerHTML = "<div class=\"msg-bubble deleted\">" + inner + "</div>";
    return row;
  }

  if (!me && (state.activeChat?.type === "group" || state.activeChat?.type === "room")) {
    inner += "<span class=\"msg-sender\" style=\"color:" + getUserTextColor(m.from) + "\">" + esc(m.from) + "</span>";
  }
  if (!me && m.from === "BunBot") {
    inner += "<span class=\"msg-sender\" style=\"color:#7c3aed\"><i class=\"fa-solid fa-robot\"></i> BunBot</span>";
  }
  if (m.kind === "photo" && m.photoUrl) {
    inner += "<div class=\"msg-photo" + (m.spoilerMedia ? " spoiler-media" : "") + "\"><img src=\"" + m.photoUrl + "\" loading=\"lazy\" alt=\"photo\"></div>";
  } else if (m.kind === "video" && m.videoUrl) {
    inner += "<div class=\"msg-photo" + (m.spoilerMedia ? " spoiler-media" : "") + "\"><video src=\"" + m.videoUrl + "\" preload=\"metadata\" muted playsinline></video></div>";
  }
  if (m.embed && m.embed.text) {
    var embedColor = /^#[0-9a-fA-F]{6}$/.test(String(m.embed.color || "")) ? m.embed.color : "#6366f1";
    inner += "<div class=\"msg-embed\" style=\"--embed-color:" + embedColor + "\"><div class=\"msg-embed-body\">" + formatMessageTextWithMentions(m.embed.text, m) + "</div></div>";
  } else if (m.text) {
    inner += "<div class=\"msg-text" + (m.spoilerText ? " spoiler-text" : "") + "\">" + formatMessageTextWithMentions(m.text, m) + "</div>";
  }
  if (m.replyTo && (m.replyTo.from || m.replyTo.text)) {
    inner = "<div class=\"msg-reply\"><span class=\"msg-reply-name\" style=\"color:" + getUserTextColor(m.replyTo.from || "user") + "\">" + esc(m.replyTo.from || "user") + "</span><span class=\"msg-reply-text\">" + esc(m.replyTo.text || "") + "</span></div>" + inner;
  }
  if (m.editedAt) {
    inner += "<div class=\"msg-time\">(edited)</div>";
  }
  inner += "<div class=\"msg-time\">" + timeStr(m.ts) + "</div>";

  var bubbleClass = "msg-bubble";
  if (m.isTherapist || m.from === "BunBot") bubbleClass += " therapist-bubble";
  row.innerHTML = "<div class=\"" + bubbleClass + "\">" + inner + "</div>";

  var senderEl = row.querySelector(".msg-sender");
  if (senderEl && m.from) {
    senderEl.classList.add("js-open-profile");
    senderEl.dataset.username = m.from;
    bindProfileLinks(row);
  }

  row.querySelectorAll(".md-spoiler").forEach(function(el) {
    el.addEventListener("click", function(ev) {
      ev.stopPropagation();
      el.classList.toggle("revealed");
    });
  });

  var spoilerTextEl = row.querySelector(".msg-text.spoiler-text");
  if (spoilerTextEl) {
    spoilerTextEl.addEventListener("click", function(ev) {
      ev.stopPropagation();
      spoilerTextEl.classList.toggle("revealed");
    });
  }

  var spoilerMediaWrap = row.querySelector(".msg-photo.spoiler-media");
  if (spoilerMediaWrap) {
    spoilerMediaWrap.addEventListener("click", function(ev) {
      if (!spoilerMediaWrap.classList.contains("revealed")) {
        ev.preventDefault();
        ev.stopPropagation();
        spoilerMediaWrap.classList.add("revealed");
      }
    });
  }

  const photoEl = row.querySelector(".msg-photo img");
  if (photoEl) {
    photoEl.addEventListener("click", function() {
      if (lightboxVideo) {
        lightboxVideo.pause();
        lightboxVideo.removeAttribute("src");
        lightboxVideo.style.display = "none";
      }
      lightboxImg.style.display = "";
      lightboxImg.src = m.photoUrl;
      lightbox.style.display = "";
    });
  }

  const videoEl = row.querySelector(".msg-photo video");
  if (videoEl) {
    videoEl.addEventListener("click", function(e) {
      e.preventDefault();
      if (!lightboxVideo) return;
      lightboxImg.style.display = "none";
      lightboxVideo.style.display = "";
      lightboxVideo.src = m.videoUrl;
      lightbox.style.display = "";
      const maybePlay = lightboxVideo.play();
      if (maybePlay && typeof maybePlay.catch === "function") maybePlay.catch(function() {});
    });
  }

  return row;
}

function scrollChat() {
  requestAnimationFrame(function() { chatMessages.scrollTop = chatMessages.scrollHeight; });
}


/* == SEND / TYPING == */
var typingActive = false;
var typingTimer = null;
var pendingMedia = null;

function isDmBlockedTarget(username) {
  return state.dmBlockedUsers.has(normalizeUsername(username));
}

async function confirmSpecialPingIfNeeded(scope, text) {
  var tokens = detectSpecialPingTokens(scope, text);
  if (!tokens.length) return true;
  if (!canCurrentUserUseSpecialPing(scope)) {
    showModerationWarningModal("Only group/room admins or owners can use @here or @everyone.");
    return false;
  }
  var label = tokens.map(function(t) { return "@" + t; }).join(" and ");
  return await askActionConfirmation(
    "Ping Confirmation",
    "You are about to notify users with " + label + ". Continue?",
    "Send"
  );
}

async function sendMessage() {
  var rawText = msgInput.value;
  var text = rawText.trim();

  if (state.editingMessageId) {
    wsSend({ type: "edit-message", id: state.editingMessageId, text: rawText });
    stopInlineEdit(true);
    clearReplyTarget();
    clearPhotoPreview();
    sendTyping(false);
    return;
  }

  if (!text && !pendingMedia) return;
  var type = state.activeChat.type;

  if (type === "dm" && isDmBlockedTarget(state.activeChat.name)) {
    showModerationToast("Unblock this DM before sending messages.", "warn");
    return;
  }

  if (!pendingMedia) {
    var okPing = await confirmSpecialPingIfNeeded(type, text);
    if (!okPing) return;
  }

  if (pendingMedia) {
    await uploadMedia(pendingMedia, text);
  } else {
    wsSend({
      type: "send-text",
      scope: type,
      group: type === "group" ? state.activeChat.name : undefined,
      room: type === "room" ? state.activeChat.name : undefined,
      recipient: type === "dm" ? state.activeChat.name : undefined,
      text: text,
      spoilerText: !!(spoilerTextToggle && spoilerTextToggle.checked),
      replyTo: state.replyTarget ? {
        id: state.replyTarget.id,
        from: state.replyTarget.from,
        text: state.replyTarget.text
      } : undefined
    });
  }
  msgInput.value = "";
  if (spoilerTextToggle) spoilerTextToggle.checked = false;
  if (spoilerMediaToggle) spoilerMediaToggle.checked = false;
  clearReplyTarget();
  clearPhotoPreview();
  sendTyping(false);
}

sendBtn.addEventListener("click", sendMessage);
msgInput.addEventListener("keydown", function(e) {
  if (e.key === "Tab") {
    var candidates = getMentionCandidates();
    if (candidates.length) {
      e.preventDefault();
      acceptMentionSuggestion(candidates[0]);
      return;
    }
  }
  if (e.key === "Escape") {
    hideMentionSuggestions();
    return;
  }
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

function handleTypingInput() {
  if (!state.activeChat) return;
  if (!typingActive) { typingActive = true; sendTyping(true); }
  clearTimeout(typingTimer);
  typingTimer = setTimeout(function() { typingActive = false; sendTyping(false); }, 2000);
}

function sendTyping(isTyping) {
  var type = state.activeChat.type;
  wsSend({
    type: "typing",
    scope: type,
    group: type === "group" ? state.activeChat.name : undefined,
    room: type === "room" ? state.activeChat.name : undefined,
    recipient: type === "dm" ? state.activeChat.name : undefined,
    isTyping: isTyping
  });
}

msgInput.addEventListener("input", function() {
  handleTypingInput();
  updateMentionSuggestions();
});


/* == MEDIA ATTACH == */
attachBtn.addEventListener("click", function() { photoFileInput.click(); });
photoFileInput.addEventListener("change", function(e) {
  var f = e.target.files[0];
  if (!f) return;
  pendingMedia = f;
  photoPreviewBar.style.display = "";
  if (f.type && f.type.startsWith("video/")) {
    previewImg.style.display = "none";
    if (previewLabel) {
      previewLabel.style.display = "";
      previewLabel.textContent = "🎬 " + f.name;
    }
  } else {
    previewImg.style.display = "";
    previewImg.src = URL.createObjectURL(f);
    if (previewLabel) {
      previewLabel.style.display = "none";
      previewLabel.textContent = "";
    }
  }
  photoFileInput.value = "";
});

cancelPreview.addEventListener("click", clearPhotoPreview);

function clearPhotoPreview() {
  pendingMedia = null;
  photoPreviewBar.style.display = "none";
  previewImg.style.display = "";
  previewImg.src = "";
  if (previewLabel) {
    previewLabel.style.display = "none";
    previewLabel.textContent = "";
  }
}

async function uploadMedia(file, caption, confirmSensitive) {
  var type = state.activeChat.type;
  if (type === "dm" && isDmBlockedTarget(state.activeChat.name)) {
    showModerationToast("Unblock this DM before sending media.", "warn");
    return;
  }
  var okPing = await confirmSpecialPingIfNeeded(type, caption || "");
  if (!okPing) return;
  var fd = new FormData();
  fd.append("media", file);
  fd.append("username", state.username);
  fd.append("scope", type);
  if (type === "group") fd.append("group", state.activeChat.name);
  else if (type === "room") fd.append("room", state.activeChat.name);
  else fd.append("recipient", state.activeChat.name);
  if (caption) fd.append("caption", caption);
  if (spoilerTextToggle && spoilerTextToggle.checked) fd.append("spoilerText", "1");
  if (spoilerMediaToggle && spoilerMediaToggle.checked) fd.append("spoilerMedia", "1");
  if (confirmSensitive) fd.append("confirmSensitive", "1");
  if (state.replyTarget) {
    fd.append("replyTo", JSON.stringify({
      id: state.replyTarget.id,
      from: state.replyTarget.from,
      text: state.replyTarget.text
    }));
  }
  var data = await fetch("/upload", { method: "POST", body: fd }).then(function(r) { return r.json(); });
  if (!data.ok) {
    if (data.error === "OTP_CONFIRM_REQUIRED" && (type === "group" || type === "room")) {
      var ok = await askOtpConfirmation();
      if (ok) await uploadMedia(file, caption, true);
      return;
    }
    showModerationToast(data.error || "Upload failed", "warn");
    return;
  }
  clearReplyTarget();
}

if (otpConfirmClose) otpConfirmClose.addEventListener("click", function() { resolveOtpConfirmation(false); });
if (otpConfirmCancel) otpConfirmCancel.addEventListener("click", function() { resolveOtpConfirmation(false); });
if (otpConfirmProceed) otpConfirmProceed.addEventListener("click", function() { resolveOtpConfirmation(true); });
if (otpConfirmModal) otpConfirmModal.addEventListener("click", function(e) {
  if (e.target === otpConfirmModal) resolveOtpConfirmation(false);
});
if (actionConfirmClose) actionConfirmClose.addEventListener("click", function() { resolveActionConfirmation(false); });
if (actionConfirmCancel) actionConfirmCancel.addEventListener("click", function() { resolveActionConfirmation(false); });
if (actionConfirmProceed) actionConfirmProceed.addEventListener("click", function() { resolveActionConfirmation(true); });
if (actionConfirmModal) actionConfirmModal.addEventListener("click", function(e) {
  if (e.target === actionConfirmModal) resolveActionConfirmation(false);
});
if (moderationWarningClose) moderationWarningClose.addEventListener("click", closeModerationWarningModal);
if (moderationWarningAcknowledge) moderationWarningAcknowledge.addEventListener("click", closeModerationWarningModal);
if (moderationWarningModal) {
  moderationWarningModal.addEventListener("click", function(e) {
    if (e.target === moderationWarningModal) closeModerationWarningModal();
  });
}


/* == LIGHTBOX == */
function closeLightbox() {
  lightbox.style.display = "none";
  if (lightboxVideo) {
    lightboxVideo.pause();
    lightboxVideo.removeAttribute("src");
    lightboxVideo.style.display = "none";
  }
  if (lightboxImg) {
    lightboxImg.style.display = "";
  }
  var la = document.querySelector(".lightbox-actions");
  if (la) la.style.display = "none";
}
lightbox.addEventListener("click", closeLightbox);
lightboxClose.addEventListener("click", closeLightbox);
lightboxImg.addEventListener("click", function(e) { e.stopPropagation(); });
if (lightboxVideo) lightboxVideo.addEventListener("click", function(e) { e.stopPropagation(); });
var lightboxActionsEl = document.querySelector(".lightbox-actions");
if (lightboxActionsEl) lightboxActionsEl.addEventListener("click", function(e) { e.stopPropagation(); });


/* == CLEAR CHAT == */
clearChatBtn.addEventListener("click", function() {
  if (!state.activeChat) return;
  if (state.activeChat.type === "room") {
    if (!confirm("Purge this room's full message history for everyone?")) return;
    wsSend({ type: "room-purge", roomId: state.activeChat.name });
    return;
  }
  if (!confirm("Clear all local messages?")) return;
  var convType = "dm";
  if (state.activeChat.type === "group") convType = "group";
  if (state.activeChat.type === "room") convType = "room";
  wsSend({
    type: "clear-chat",
    convType: convType,
    convName: state.activeChat.name
  });
  var cid = activeConvId();
  convMessages.delete(cid);
  renderChat();
});

function renderRoomSearchResults(rooms) {
  if (!searchRoomResults) return;
  searchRoomResults.innerHTML = "";
  if (!rooms.length) {
    searchRoomResults.innerHTML = "<div class=\"conv-section\">No rooms found</div>";
    return;
  }
  rooms.forEach(function(room) {
    var joined = state.joinedRoomIds.has(room.id);
    var row = document.createElement("div");
    row.className = "conv-item";
    var iconHtml = room.iconUrl
      ? "<span class=\"avatar-sm avatar-img\" style=\"background-image:url('" + room.iconUrl + "')\"></span>"
      : "<span class=\"avatar-sm\" style=\"background:#0ea5e9\">#</span>";
    row.innerHTML = iconHtml +
      "<div class=\"conv-item-info\">" +
        "<div class=\"conv-item-name\">#" + esc(room.name) + "</div>" +
        "<div class=\"conv-item-last\">owner: " + esc(room.owner || "") + "</div>" +
      "</div>" +
      "<div class=\"conv-item-meta\"><button class=\"btn btn-outline btn-sm\">" + (joined ? "Open" : "Join") + "</button></div>";
    row.querySelector("button").addEventListener("click", function(ev) {
      ev.stopPropagation();
      if (joined) {
        searchRoomModal.style.display = "none";
        openChat("room", room.id);
      } else {
        wsSend({ type: "join-room", roomId: room.id });
      }
    });
    searchRoomResults.appendChild(row);
  });
}

function showRoomInfo(room) {
  if (!room) return;
  state.roomDetails[room.id] = room;
  var isOwner = room.owner === state.username;
  var isAdmin = (room.admins || []).indexOf(state.username) !== -1;
  var canManage = isOwner || isAdmin;
  var mutedUsers = Array.isArray(room.mutedUsers) ? room.mutedUsers : [];
  var mutedSet = new Set(mutedUsers.map(function(mu) { return mu.username; }));
  var manualMutedSet = new Set(
    mutedUsers
      .filter(function(mu) { return !!mu.manual; })
      .map(function(mu) { return mu.username; })
  );

  function canManageTarget(target) {
    if (!canManage) return false;
    if (!target || target === room.owner || target === state.username) return false;
    var targetIsAdmin = (room.admins || []).indexOf(target) !== -1;
    if (!isOwner && targetIsAdmin) return false;
    return true;
  }

  function mutedMark(username) {
    if (!mutedSet.has(username)) return "";
    return "<i class=\"fa-solid fa-volume-xmark member-muted-icon\" title=\"Muted\"></i>";
  }

  function bindRoomMemberContext(container) {
    if (!container) return;
    container.querySelectorAll(".member-item[data-user]").forEach(function(row) {
      row.addEventListener("contextmenu", function(e) {
        var target = row.dataset.user || "";
        if (!canManageTarget(target)) return;
        if (!roomMemberCtxMenu) return;
        e.preventDefault();
        var isManual = manualMutedSet.has(target);
        roomMemberCtxPayload = { roomId: room.id, target: target, action: isManual ? "unmute" : "mute" };
        roomMemberCtxMenu.innerHTML = isManual
          ? "<div class=\"ctx-item\" data-action=\"unmute\"><i class=\"fa-solid fa-volume-high\"></i> Unmute " + esc(target) + "</div>"
          : "<div class=\"ctx-item\" data-action=\"mute\"><i class=\"fa-solid fa-volume-xmark\"></i> Mute " + esc(target) + "</div>";
        roomMemberCtxMenu.style.display = "block";
        roomMemberCtxMenu.style.left = Math.min(e.clientX, window.innerWidth - 240) + "px";
        roomMemberCtxMenu.style.top = Math.min(e.clientY, window.innerHeight - 120) + "px";
      });
    });
  }

  modalRoomName.textContent = "#" + room.name;
  modalRoomOwner.textContent = room.owner || "";
  modalRoomOnline.textContent = String(room.onlineCount || 0);
  if (modalRoomDesc && modalRoomDescInput && modalRoomDescSave) {
    if (canManage) {
      modalRoomDesc.style.display = "none";
      modalRoomDescInput.style.display = "";
      modalRoomDescSave.style.display = "";
      modalRoomDescInput.value = room.description || "";
      modalRoomDescSave.onclick = function() {
        wsSend({ type: "room-profile", roomId: room.id, description: modalRoomDescInput.value.trim() });
      };
    } else {
      modalRoomDesc.style.display = "";
      modalRoomDesc.textContent = room.description || "No description";
      modalRoomDescInput.style.display = "none";
      modalRoomDescSave.style.display = "none";
    }
  }

  modalRoomAvatar.className = "avatar-xl clickable-avatar";
  if (room.iconUrl) {
    modalRoomAvatar.classList.add("avatar-img");
    modalRoomAvatar.style.backgroundImage = "url('" + room.iconUrl + "')";
    modalRoomAvatar.style.backgroundColor = "";
    modalRoomAvatar.textContent = "";
  } else {
    modalRoomAvatar.classList.remove("avatar-img");
    modalRoomAvatar.style.backgroundImage = "";
    modalRoomAvatar.style.backgroundColor = "#0ea5e9";
    modalRoomAvatar.textContent = "#";
  }

  modalRoomAvatar.onclick = function() {
    lightboxImg.src = room.iconUrl || "";
    var lightboxActions = document.querySelector(".lightbox-actions");
    if (isOwner) {
      lightboxActions.style.display = "";
      document.getElementById("lightboxChange").onclick = function(e) {
        e.stopPropagation();
        roomAvatarFile.click();
      };
      document.getElementById("lightboxDelete").onclick = function(e) {
        e.stopPropagation();
        wsSend({ type: "room-icon-delete", roomId: room.id });
        lightbox.style.display = "none";
      };
    } else {
      lightboxActions.style.display = "none";
    }
    lightbox.style.display = "";
  };

  roomAvatarFile.onchange = function(e) {
    var f = e.target.files[0];
    if (!f || !isOwner) return;
    var fd = new FormData();
    fd.append("avatar", f);
    fd.append("username", state.username);
    fd.append("roomId", room.id);
    fetch("/room-icon", { method: "POST", body: fd })
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data.ok && data.room?.id) {
          state.roomDetails[data.room.id] = data.room;
          lightbox.style.display = "none";
          renderRoomList();
          showRoomInfo(data.room);
        }
      });
  };

  modalRoomAdmins.innerHTML = "";

  /* ── Mode toggles (owner only) ──────────────────────────── */
  var toggleSection = document.getElementById("roomModeToggles");
  var toxicToggle   = document.getElementById("toggleToxicFilter");
  var trollToggle   = document.getElementById("toggleTrollMode");
  if (toggleSection && toxicToggle && trollToggle) {
    if (isOwner) {
      toggleSection.style.display = "";
      toxicToggle.checked = room.toxicFilter !== false;
      trollToggle.checked = !!room.trollMode;
      toxicToggle.disabled = false;
      trollToggle.disabled = false;

      toxicToggle.onchange = function() {
        wsSend({ type: "room-toggle-toxic-filter", roomId: room.id, value: toxicToggle.checked });
      };
      trollToggle.onchange = function() {
        wsSend({ type: "room-toggle-troll-mode", roomId: room.id, value: trollToggle.checked });
      };
    } else {
      toggleSection.style.display = "none";
    }
  }

  (room.admins || []).forEach(function(u) {
    var row = document.createElement("div");
    row.className = "member-item";
    var actions = "";
    if (isOwner && u !== state.username) {
      actions = "<div class=\"member-actions\"><button class=\"btn-action btn-demote room-demote\" data-user=\"" + esc(u) + "\" title=\"Demote\"><i class=\"fa-solid fa-arrow-down\"></i></button></div>";
    }
    row.innerHTML = avatarHtmlForUser(u) + "<span class=\"member-name js-open-profile\" data-username=\"" + esc(u) + "\">" + esc(u) + "</span><span class=\"member-badge badge-admin\">Admin</span>" + actions;
    modalRoomAdmins.appendChild(row);
  });
  bindProfileLinks(modalRoomAdmins);
  modalRoomAdmins.querySelectorAll(".room-demote").forEach(function(btn) {
    btn.addEventListener("click", function() {
      wsSend({ type: "room-demote-admin", roomId: room.id, target: btn.dataset.user });
      wsSend({ type: "room-detail", roomId: room.id });
    });
  });

  modalRoomOnlineUsers.innerHTML = "";
  var onlineUsers = Array.isArray(room.onlineUsers) ? room.onlineUsers : [];
  if (!onlineUsers.length) {
    modalRoomOnlineUsers.innerHTML = "<div class=\"conv-section\">No users online</div>";
  } else {
    onlineUsers.forEach(function(u) {
      var row = document.createElement("div");
      row.className = "member-item";
      row.dataset.user = u;
      var actions = "";
      if (canManage && u !== room.owner) {
        actions = "<div class=\"member-actions\">";
        if (isOwner && (room.admins || []).indexOf(u) === -1) {
          actions += "<button class=\"btn-action btn-promote room-promote\" data-user=\"" + esc(u) + "\" title=\"Promote\"><i class=\"fa-solid fa-arrow-up\"></i></button>";
        }
        actions += "<button class=\"btn-action btn-kick room-kick\" data-user=\"" + esc(u) + "\" title=\"Kick\"><i class=\"fa-solid fa-user-minus\"></i></button>";
        actions += "<button class=\"btn-action btn-ban room-ban\" data-user=\"" + esc(u) + "\" title=\"Ban\"><i class=\"fa-solid fa-gavel\"></i></button>";
        actions += "</div>";
      }
      row.innerHTML = avatarHtmlForUser(u) + "<span class=\"member-name js-open-profile\" data-username=\"" + esc(u) + "\">" + esc(u) + "</span>" + mutedMark(u) + "<span class=\"member-badge badge-online\">Online</span>" + actions;
      modalRoomOnlineUsers.appendChild(row);
    });
  }
  bindProfileLinks(modalRoomOnlineUsers);
  bindRoomMemberContext(modalRoomOnlineUsers);
  modalRoomOnlineUsers.querySelectorAll(".room-promote").forEach(function(btn) {
    btn.addEventListener("click", function() {
      wsSend({ type: "room-promote-admin", roomId: room.id, target: btn.dataset.user });
      wsSend({ type: "room-detail", roomId: room.id });
    });
  });
  modalRoomOnlineUsers.querySelectorAll(".room-kick").forEach(function(btn) {
    btn.addEventListener("click", async function() {
      var ok = await askActionConfirmation("Confirm Kick", "Kick " + btn.dataset.user + " from this room?", "Kick");
      if (ok) {
        wsSend({ type: "room-kick-member", roomId: room.id, target: btn.dataset.user });
        wsSend({ type: "room-detail", roomId: room.id });
      }
    });
  });
  modalRoomOnlineUsers.querySelectorAll(".room-ban").forEach(function(btn) {
    btn.addEventListener("click", async function() {
      var ok = await askActionConfirmation("Confirm Ban", "Ban " + btn.dataset.user + " from this room?", "Ban");
      if (ok) {
        wsSend({ type: "room-ban-member", roomId: room.id, target: btn.dataset.user });
        wsSend({ type: "room-detail", roomId: room.id });
      }
    });
  });

  /* Offline users list */
  modalRoomMembers.innerHTML = "";
  var offlineUsers = Array.isArray(room.offlineUsers) ? room.offlineUsers : [];
  if (!offlineUsers.length) {
    modalRoomMembers.innerHTML = "<div class=\"conv-section\">No offline users</div>";
  } else {
    offlineUsers.forEach(function(u) {
      if (u === room.owner) return;
      if ((room.admins || []).indexOf(u) !== -1) return;
      var row = document.createElement("div");
      row.className = "member-item";
      row.dataset.user = u;
      var actions = "";
      if (canManage) {
        actions = "<div class=\"member-actions\">";
        if (isOwner) {
          actions += "<button class=\"btn-action btn-promote room-promote-off\" data-user=\"" + esc(u) + "\" title=\"Promote\"><i class=\"fa-solid fa-arrow-up\"></i></button>";
        }
        actions += "<button class=\"btn-action btn-kick room-kick-off\" data-user=\"" + esc(u) + "\" title=\"Kick\"><i class=\"fa-solid fa-user-minus\"></i></button>";
        actions += "<button class=\"btn-action btn-ban room-ban-off\" data-user=\"" + esc(u) + "\" title=\"Ban\"><i class=\"fa-solid fa-gavel\"></i></button>";
        actions += "</div>";
      }
      var prof = getProfile(u);
      var lastSeenTxt = prof.lastSeen ? formatLastSeen(prof.lastSeen) : "";
      row.innerHTML = avatarHtmlForUser(u) +
        "<div class=\"member-info\"><span class=\"member-name js-open-profile\" data-username=\"" + esc(u) + "\">" + esc(u) + "</span>" +
        (lastSeenTxt ? "<span class=\"member-sub\">Last seen " + esc(lastSeenTxt) + "</span>" : "") +
        "</div>" + mutedMark(u) + "<span class=\"member-badge\" style=\"background:#64748b;color:#fff\">Offline</span>" + actions;
      modalRoomMembers.appendChild(row);
    });
  }
  bindProfileLinks(modalRoomMembers);
  bindRoomMemberContext(modalRoomMembers);
  modalRoomMembers.querySelectorAll(".room-promote-off").forEach(function(btn) {
    btn.addEventListener("click", function() {
      wsSend({ type: "room-promote-admin", roomId: room.id, target: btn.dataset.user });
      wsSend({ type: "room-detail", roomId: room.id });
    });
  });
  modalRoomMembers.querySelectorAll(".room-kick-off").forEach(function(btn) {
    btn.addEventListener("click", async function() {
      var ok = await askActionConfirmation("Confirm Kick", "Kick " + btn.dataset.user + " from this room?", "Kick");
      if (ok) {
        wsSend({ type: "room-kick-member", roomId: room.id, target: btn.dataset.user });
        wsSend({ type: "room-detail", roomId: room.id });
      }
    });
  });
  modalRoomMembers.querySelectorAll(".room-ban-off").forEach(function(btn) {
    btn.addEventListener("click", async function() {
      var ok = await askActionConfirmation("Confirm Ban", "Ban " + btn.dataset.user + " from this room?", "Ban");
      if (ok) {
        wsSend({ type: "room-ban-member", roomId: room.id, target: btn.dataset.user });
        wsSend({ type: "room-detail", roomId: room.id });
      }
    });
  });

  /* Banned users list (same behavior as group unban) */
  var roomBannedEl = document.getElementById("modalRoomBanned");
  if (roomBannedEl) {
    var bannedUsers = Array.isArray(room.banned) ? room.banned : [];
    if (canManage && bannedUsers.length > 0) {
      roomBannedEl.style.display = "";
      roomBannedEl.innerHTML = "<h4>Banned Users</h4>";
      bannedUsers.forEach(function(u) {
        var row = document.createElement("div");
        row.className = "member-item";
        row.innerHTML = avatarHtmlForUser(u) +
          "<span class=\"member-name js-open-profile\" data-username=\"" + esc(u) + "\">" + esc(u) + "</span>" +
          "<div class=\"member-actions\"><button class=\"btn-action btn-unban room-unban\" data-user=\"" + esc(u) + "\" title=\"Unban\"><i class=\"fa-solid fa-unlock\"></i></button></div>";
        roomBannedEl.appendChild(row);
      });
      bindProfileLinks(roomBannedEl);
      roomBannedEl.querySelectorAll(".room-unban").forEach(function(btn) {
        btn.addEventListener("click", function() {
          wsSend({ type: "room-unban-member", roomId: room.id, target: btn.dataset.user });
        });
      });
    } else {
      roomBannedEl.style.display = "none";
      roomBannedEl.innerHTML = "";
    }
  }

  /* ── Transfer Room Ownership (owner only) ─── */
  var roomTransferWrap = document.getElementById("roomTransferOwnership");
  if (roomTransferWrap) {
    roomTransferWrap.innerHTML = "";
    if (isOwner && (room.admins || []).length > 0) {
      var sel = document.createElement("select");
      sel.className = "input";
      sel.innerHTML = "<option value=\"\">Select new owner…</option>";
      (room.admins || []).forEach(function(a) {
        sel.innerHTML += "<option value=\"" + esc(a) + "\">" + esc(a) + "</option>";
      });
      var btn = document.createElement("button");
      btn.className = "btn btn-warn";
      btn.textContent = "Transfer Ownership";
      btn.addEventListener("click", async function() {
        if (!sel.value) return;
        var ok = await askActionConfirmation("Transfer Ownership", "Transfer room ownership to " + sel.value + "? You will become an admin.", "Transfer");
        if (ok) {
          wsSend({ type: "transfer-room-ownership", roomId: room.id, target: sel.value });
          closeModal("roomInfoModal");
        }
      });
      roomTransferWrap.appendChild(sel);
      roomTransferWrap.appendChild(btn);
      roomTransferWrap.style.display = "";
    } else {
      roomTransferWrap.style.display = "none";
    }
  }

  /* ── Muted users section (visible to admins/owners) ───────── */
  var mutedSection = document.getElementById("modalRoomMuted");
  if (mutedSection) {
    mutedSection.innerHTML = "";
    var mutedHeader = mutedSection.previousElementSibling;
    if (mutedUsers.length > 0 && canManage) {
      if (mutedHeader) mutedHeader.style.display = "";
      mutedSection.style.display = "";
      mutedUsers.forEach(function(mu) {
        var row = document.createElement("div");
        row.className = "member-item";
        var muteInfo = "";
        if (mu.muteUntil) {
          var mins = Math.ceil((mu.muteUntil - Date.now()) / 60000);
          muteInfo = mins > 0 ? " (" + mins + " min left)" : " (expired)";
        }
        var actions = "<div class=\"member-actions\"><button class=\"btn-action btn-unmute room-unmute\" data-user=\"" + esc(mu.username) + "\" title=\"Unmute\"><i class=\"fa-solid fa-volume-high\"></i></button></div>";
        var mutedLabel = mu.manual ? "Muted (manual)" : "Muted";
        row.innerHTML = avatarHtmlForUser(mu.username) + "<span class=\"member-name js-open-profile\" data-username=\"" + esc(mu.username) + "\">" + esc(mu.username) + "</span><span class=\"member-badge badge-muted\">" + mutedLabel + esc(muteInfo) + "</span>" + actions;
        mutedSection.appendChild(row);
      });
      bindProfileLinks(mutedSection);
      mutedSection.querySelectorAll(".room-unmute").forEach(function(btn) {
        btn.addEventListener("click", function() {
          wsSend({ type: "room-unmute", roomId: room.id, target: btn.dataset.user });
        });
      });
    } else {
      if (mutedHeader) mutedHeader.style.display = "none";
      mutedSection.style.display = "none";
    }
  }

  roomPurgeBtn.style.display = canManage ? "" : "none";
  roomPurgeBtn.onclick = function() {
    if (!canManage) return;
    if (confirm("Purge this room for everyone?")) wsSend({ type: "room-purge", roomId: room.id });
  };

  if (roomLogsBtn) {
    roomLogsBtn.style.display = canManage ? "" : "none";
    roomLogsBtn.onclick = function() {
      if (!canManage) return;
      roomLogsPayload = { roomId: room.id, canManage: true, logs: [] };
      wsSend({ type: "room-logs-get", roomId: room.id });
    };
  }

  leaveRoomBtn.onclick = function() {
    wsSend({ type: "leave-room", roomId: room.id });
    roomInfoModal.style.display = "none";
  };

  if (roomDeleteBtn) {
    roomDeleteBtn.style.display = isOwner ? "" : "none";
    roomDeleteBtn.onclick = function() {
      if (!isOwner) return;
      if (confirm("Delete this room forever?")) {
        wsSend({ type: "room-delete", roomId: room.id });
        roomInfoModal.style.display = "none";
      }
    };
  }

  roomInfoModal.style.display = "";
}

if (roomMemberCtxMenu) {
  roomMemberCtxMenu.addEventListener("click", function(e) {
    var item = e.target.closest(".ctx-item");
    if (!item || !roomMemberCtxPayload) return;
    var action = item.dataset.action;
    if (action === "mute") {
      openRoomMuteDurationModal({ roomId: roomMemberCtxPayload.roomId, target: roomMemberCtxPayload.target });
    } else if (action === "unmute") {
      wsSend({ type: "room-unmute", roomId: roomMemberCtxPayload.roomId, target: roomMemberCtxPayload.target });
    }
    roomMemberCtxMenu.style.display = "none";
    roomMemberCtxPayload = null;
  });
}


/* == GROUP INFO MODAL == */
function showGroupInfo(group) {
  if (!group) return;
  var gp = group;
  activeGroupInfoName = gp.name || "";
  var isOwner = gp.owner === state.username;
  var isAdmin = (gp.admins || []).indexOf(state.username) !== -1;
  var canManage = isOwner || isAdmin;

  var avatarEl = document.getElementById("modalGroupAvatar");
  var g = getGroupProfile(gp.name);
  avatarEl.className = "avatar-xl clickable-avatar";
  if (g.pfpUrl) {
    avatarEl.classList.add("avatar-img");
    avatarEl.style.backgroundImage = "url('" + g.pfpUrl + "')";
    avatarEl.style.backgroundColor = "";
    avatarEl.textContent = "";
  } else {
    avatarEl.classList.remove("avatar-img");
    avatarEl.style.backgroundImage = "";
    avatarEl.style.backgroundColor = "#6366f1";
    avatarEl.textContent = gp.name[0];
  }

  /* clicking avatar opens lightbox with change/delete options */
  avatarEl.onclick = function() {
    var lightboxActions = document.querySelector(".lightbox-actions");
    if (g.pfpUrl) {
      lightboxImg.src = g.pfpUrl;
    } else {
      lightboxImg.src = "";
    }
    if (canManage) {
      lightboxActions.style.display = "";
      document.getElementById("lightboxChange").onclick = function(e) {
        e.stopPropagation();
        document.getElementById("groupAvatarFile").click();
      };
      document.getElementById("lightboxDelete").onclick = function(e) {
        e.stopPropagation();
        if (confirm("Delete group photo?")) {
          wsSend({ type: "group-avatar-delete", group: gp.name });
          lightbox.style.display = "none";
        }
      };
    } else {
      lightboxActions.style.display = "none";
    }
    lightbox.style.display = "";
  };

  document.getElementById("modalGroupName").textContent = gp.name;
  document.getElementById("modalGroupOwner").textContent = gp.owner;
  document.getElementById("modalGroupCode").textContent = gp.code || "";
  var groupNameInput = document.getElementById("modalGroupNameInput");
  var groupRenameSave = document.getElementById("modalGroupRenameSave");

  /* description - single display */
  var descDisplay = document.getElementById("modalGroupDesc");
  var groupDescInput = document.getElementById("modalGroupDescInput");
  var groupDescSave = document.getElementById("modalGroupDescSave");
  var groupAvatarFile = document.getElementById("groupAvatarFile");

  if (canManage) {
    groupNameInput.style.display = "";
    groupRenameSave.style.display = "";
    groupNameInput.value = gp.name;
    groupRenameSave.onclick = function() {
      var nextName = groupNameInput.value.trim();
      if (!nextName || nextName === gp.name) return;
      wsSend({ type: "rename-group", group: gp.name, newName: nextName });
    };
    descDisplay.style.display = "none";
    groupDescInput.style.display = "";
    groupDescInput.value = gp.description || "";
    groupDescSave.style.display = "";
    groupDescSave.onclick = function() {
      wsSend({ type: "group-profile", group: gp.name, description: groupDescInput.value.trim() });
    };
    groupAvatarFile.onchange = function(e) {
      var f = e.target.files[0];
      if (!f) return;
      var fd = new FormData();
      fd.append("avatar", f);
      fd.append("username", state.username);
      fd.append("group", gp.name);
      fetch("/group-avatar", { method: "POST", body: fd })
        .then(function(r) { return r.json(); })
        .then(function(data) {
          if (data.ok) lightbox.style.display = "none";
        });
    };
  } else {
    groupNameInput.style.display = "none";
    groupRenameSave.style.display = "none";
    descDisplay.style.display = "";
    descDisplay.textContent = gp.description || "No description";
    groupDescInput.style.display = "none";
    groupDescSave.style.display = "none";
  }

  /* members list */
  var membersEl = document.getElementById("modalGroupMembers");
  membersEl.innerHTML = "";
  (gp.members || []).forEach(function(m) {
    var li = document.createElement("div");
    li.className = "member-item";
    var mIsOwner = m === gp.owner;
    var mIsAdmin = (gp.admins || []).indexOf(m) !== -1;

    var badge = "";
    if (mIsOwner) badge = "<span class=\"member-badge badge-owner\">Owner</span>";
    else if (mIsAdmin) badge = "<span class=\"member-badge badge-admin\">Admin</span>";

    var actions = "";
    if (canManage && m !== state.username && !mIsOwner) {
      actions = "<div class=\"member-actions\">";
      if (isOwner && mIsAdmin) {
        actions += "<button class=\"btn-action btn-transfer\" data-user=\"" + esc(m) + "\" title=\"Transfer Ownership\"><i class=\"fa-solid fa-crown\"></i></button>";
        actions += "<button class=\"btn-action btn-demote\" data-user=\"" + esc(m) + "\" title=\"Demote from Admin\"><i class=\"fa-solid fa-arrow-down\"></i></button>";
      }
      if (isOwner && !mIsAdmin) {
        actions += "<button class=\"btn-action btn-promote\" data-user=\"" + esc(m) + "\" title=\"Promote to Admin\"><i class=\"fa-solid fa-arrow-up\"></i></button>";
      }
      actions += "<button class=\"btn-action btn-kick\" data-user=\"" + esc(m) + "\" title=\"Kick\"><i class=\"fa-solid fa-user-minus\"></i></button>";
      actions += "<button class=\"btn-action btn-ban\" data-user=\"" + esc(m) + "\" title=\"Ban\"><i class=\"fa-solid fa-gavel\"></i></button>";
      actions += "</div>";
    }

    li.innerHTML = avatarHtmlForUser(m) + "<span class=\"member-name js-open-profile\" data-username=\"" + esc(m) + "\">" + esc(m) + "</span>" + badge + actions;
    membersEl.appendChild(li);
  });
  bindProfileLinks(membersEl);

  /* bind member action buttons */
  membersEl.querySelectorAll(".btn-transfer").forEach(function(btn) {
    btn.addEventListener("click", async function() {
      var ok = await askActionConfirmation("Transfer Ownership", "Transfer ownership to " + btn.dataset.user + "? You will become an admin.", "Transfer");
      if (ok) {
        wsSend({ type: "transfer-group-ownership", group: gp.name, target: btn.dataset.user });
      }
    });
  });
  membersEl.querySelectorAll(".btn-promote").forEach(function(btn) {
    btn.addEventListener("click", function() {
      wsSend({ type: "promote-admin", group: gp.name, target: btn.dataset.user });
    });
  });
  membersEl.querySelectorAll(".btn-demote").forEach(function(btn) {
    btn.addEventListener("click", function() {
      wsSend({ type: "demote-admin", group: gp.name, target: btn.dataset.user });
    });
  });
  membersEl.querySelectorAll(".btn-kick").forEach(function(btn) {
    btn.addEventListener("click", async function() {
      var ok = await askActionConfirmation("Confirm Kick", "Kick " + btn.dataset.user + " from this group?", "Kick");
      if (ok)
        wsSend({ type: "kick-member", group: gp.name, target: btn.dataset.user });
    });
  });
  membersEl.querySelectorAll(".btn-ban").forEach(function(btn) {
    btn.addEventListener("click", async function() {
      var ok = await askActionConfirmation("Confirm Ban", "Ban " + btn.dataset.user + " from this group?", "Ban");
      if (ok)
        wsSend({ type: "ban-member", group: gp.name, target: btn.dataset.user });
    });
  });

  /* banned users */
  var bannedEl = document.getElementById("modalBannedUsers");
  if (bannedEl) {
    if (canManage && gp.banned && gp.banned.length > 0) {
      bannedEl.style.display = "";
      bannedEl.innerHTML = "<h4>Banned Users</h4>";
      gp.banned.forEach(function(u) {
        var div = document.createElement("div");
        div.className = "member-item";
        div.innerHTML = avatarHtmlForUser(u) + "<span class=\"member-name js-open-profile\" data-username=\"" + esc(u) + "\">" + esc(u) + "</span>" +
          "<div class=\"member-actions\"><button class=\"btn-action btn-unban\" data-user=\"" + esc(u) + "\" title=\"Unban\"><i class=\"fa-solid fa-unlock\"></i></button></div>";
        bannedEl.appendChild(div);
      });
      bindProfileLinks(bannedEl);
      bannedEl.querySelectorAll(".btn-unban").forEach(function(btn) {
        btn.addEventListener("click", function() {
          wsSend({ type: "unban-member", group: gp.name, target: btn.dataset.user });
        });
      });
    } else {
      bannedEl.style.display = "none";
      bannedEl.innerHTML = "";
    }
  }

  /* pending requests */
  var pendingEl = document.getElementById("modalPendingRequests");
  if (pendingEl) {
    if (canManage && gp.pendingRequests && gp.pendingRequests.length > 0) {
      pendingEl.style.display = "";
      pendingEl.innerHTML = "<h4>Pending Requests</h4>";
      gp.pendingRequests.forEach(function(u) {
        var div = document.createElement("div");
        div.className = "member-item";
        div.innerHTML = avatarHtmlForUser(u) + "<span class=\"member-name js-open-profile\" data-username=\"" + esc(u) + "\">" + esc(u) + "</span>" +
          "<div class=\"member-actions\">" +
            "<button class=\"btn-action btn-approve\" data-user=\"" + esc(u) + "\" title=\"Approve\"><i class=\"fa-solid fa-check\"></i></button>" +
            "<button class=\"btn-action btn-reject\" data-user=\"" + esc(u) + "\" title=\"Reject\"><i class=\"fa-solid fa-xmark\"></i></button>" +
          "</div>";
        pendingEl.appendChild(div);
      });
      bindProfileLinks(pendingEl);
      pendingEl.querySelectorAll(".btn-approve").forEach(function(btn) {
        btn.addEventListener("click", function() {
          wsSend({ type: "approve-request", group: gp.name, target: btn.dataset.user });
        });
      });
      pendingEl.querySelectorAll(".btn-reject").forEach(function(btn) {
        btn.addEventListener("click", function() {
          wsSend({ type: "reject-request", group: gp.name, target: btn.dataset.user });
        });
      });
    } else {
      pendingEl.style.display = "none";
      pendingEl.innerHTML = "";
    }
  }

  /* toggle approval */
  var approvalToggle = document.getElementById("modalApprovalToggle");
  if (approvalToggle) {
    if (isOwner || isAdmin) {
      approvalToggle.style.display = "";
      approvalToggle.innerHTML = "<label class=\"toggle-label\"><input type=\"checkbox\" id=\"approvalCheckbox\" " + (gp.requireApproval ? "checked" : "") + "> Require approval for new members</label>";
      var cb = document.getElementById("approvalCheckbox");
      if (cb) {
        cb.addEventListener("change", function() {
          wsSend({ type: "toggle-approval", group: gp.name, requireApproval: cb.checked });
        });
      }
    } else {
      approvalToggle.style.display = "none";
    }
  }

  var leaveBtn = document.getElementById("leaveGroupBtn");

  /* ── Transfer ownership is now inline (crown button on admin names) ─── */
  var grpTransferWrap = document.getElementById("groupTransferOwnership");
  if (grpTransferWrap) grpTransferWrap.style.display = "none";

  /* ── Delete Group Forever (owner only) ─── */
  var grpDeleteWrap = document.getElementById("groupDeleteForever");
  if (!grpDeleteWrap) {
    grpDeleteWrap = document.createElement("div");
    grpDeleteWrap.id = "groupDeleteForever";
    grpDeleteWrap.className = "modal-section";
    leaveBtn.parentNode.insertBefore(grpDeleteWrap, leaveBtn);
  }
  grpDeleteWrap.innerHTML = "";
  if (isOwner) {
    var delBtn = document.createElement("button");
    delBtn.className = "btn btn-danger";
    delBtn.innerHTML = "<i class=\"fa-solid fa-trash\"></i> Delete Group Forever";
    delBtn.addEventListener("click", function() {
      if (confirm("DELETE \"" + gp.name + "\" forever? This cannot be undone!")) {
        wsSend({ type: "delete-group", group: gp.name });
        closeModal("groupInfoModal");
        activeGroupInfoName = "";
        pendingGroupInfoModal = false;
        pendingGroupInfoName = "";
        closeChat();
      }
    });
    grpDeleteWrap.appendChild(delBtn);
    grpDeleteWrap.style.display = "";
  } else {
    grpDeleteWrap.style.display = "none";
  }

  /* leave group */
  if (leaveBtn) {
    leaveBtn.onclick = function() {
      if (confirm("Leave " + gp.name + "?")) {
        wsSend({ type: "leave-group", group: gp.name });
        document.getElementById("groupInfoModal").style.display = "none";
        activeGroupInfoName = "";
        pendingGroupInfoModal = false;
        pendingGroupInfoName = "";
        closeChat();
      }
    };
  }

  document.getElementById("groupInfoModal").style.display = "";
}

chatInfoBtn.addEventListener("click", function() {
  if (!state.activeChat) return;
  if (state.activeChat.type === "group") {
    pendingGroupInfoModal = true;
    pendingGroupInfoName = state.activeChat.name;
    wsSend({ type: "group-detail", group: state.activeChat.name });
  } else if (state.activeChat.type === "room") {
    wsSend({ type: "room-detail", roomId: state.activeChat.name });
  }
});

document.getElementById("groupInfoClose").addEventListener("click", function() {
  document.getElementById("groupInfoModal").style.display = "none";
  activeGroupInfoName = "";
  pendingGroupInfoModal = false;
  pendingGroupInfoName = "";
});
if (groupInfoModal) {
  groupInfoModal.addEventListener("click", function(e) {
    if (e.target !== groupInfoModal) return;
    groupInfoModal.style.display = "none";
    activeGroupInfoName = "";
    pendingGroupInfoModal = false;
    pendingGroupInfoName = "";
  });
}
if (roomInfoClose) roomInfoClose.addEventListener("click", function() {
  roomInfoModal.style.display = "none";
  if (roomMemberCtxMenu) roomMemberCtxMenu.style.display = "none";
  roomMemberCtxPayload = null;
});
if (roomInfoModal) roomInfoModal.addEventListener("click", function(e) {
  if (e.target !== roomInfoModal) return;
  roomInfoModal.style.display = "none";
  if (roomMemberCtxMenu) roomMemberCtxMenu.style.display = "none";
  roomMemberCtxPayload = null;
});
if (roomLogsClose) roomLogsClose.addEventListener("click", function() {
  roomLogsModal.style.display = "none";
});
if (roomLogsDoneBtn) roomLogsDoneBtn.addEventListener("click", function() {
  roomLogsModal.style.display = "none";
});
if (roomLogsModal) roomLogsModal.addEventListener("click", function(e) {
  if (e.target !== roomLogsModal) return;
  roomLogsModal.style.display = "none";
});
if (roomLogsClearBtn) roomLogsClearBtn.addEventListener("click", async function() {
  if (!roomLogsPayload.roomId || !roomLogsPayload.canManage) return;
  var ok = await askActionConfirmation("Clear Logs", "Clear all moderation logs for this room?", "Clear");
  if (!ok) return;
  wsSend({ type: "room-logs-clear", roomId: roomLogsPayload.roomId });
});


/* == CONTEXT MENU (right-click on messages) == */
var ctxMenu = document.getElementById("msgContextMenu");
var ctxTarget = null;
var copiedMessageBuffer = [];

chatMessages.addEventListener("contextmenu", function(e) {
  var row = e.target.closest(".msg-row");
  if (!row) return;
  if (row.classList.contains("system")) return; /* ignore system messages */
  e.preventDefault();
  ctxTarget = row;
  var id = row.dataset.id;

  /* find the message */
  var cid = activeConvId();
  var arr = convMessages.get(cid) || [];
  var msg = arr.find(function(m) { return m.id === id; });
  if (!msg || msg.deletedForEveryone) { ctxMenu.style.display = "none"; return; }

  var me = msg.from === state.username;

  /* determine if user is admin/owner in current group */
  var canAdminDelete = false;
  if (state.activeChat && state.activeChat.type === "group") {
    var gp = state.groupProfiles[state.activeChat.name] || getGroupProfile(state.activeChat.name);
    if (gp) {
      var amOwner = gp.owner === state.username;
      var amAdmin = (gp.admins || []).indexOf(state.username) !== -1;
      var msgFromOwner = msg.from === gp.owner;
      if ((amOwner || amAdmin) && !me && !(amAdmin && msgFromOwner)) {
        canAdminDelete = true;
      }
    }
  } else if (state.activeChat && state.activeChat.type === "room") {
    var rp = state.roomDetails[state.activeChat.name];
    if (rp) {
      var roomOwner = rp.owner === state.username;
      var roomAdmin = (rp.admins || []).indexOf(state.username) !== -1;
      var msgFromOwner2 = msg.from === rp.owner;
      if ((roomOwner || roomAdmin) && !me && !(roomAdmin && msgFromOwner2)) canAdminDelete = true;
    }
  }

  ctxMenu.innerHTML = "";
  ctxMenu.innerHTML += "<div class=\"ctx-item\" data-action=\"reply\"><i class=\"fa-solid fa-reply\"></i> Reply</div>";
  ctxMenu.innerHTML += "<div class=\"ctx-item\" data-action=\"copy\"><i class=\"fa-solid fa-copy\"></i> Copy message</div>";
  if (copiedMessageBuffer.length > 0) {
    ctxMenu.innerHTML += "<div class=\"ctx-item\" data-action=\"copy-multi\"><i class=\"fa-solid fa-layer-group\"></i> Copy message (multiple)</div>";
  }

  if (me) {
    if (state.activeChat?.type !== "room") {
      ctxMenu.innerHTML += "<div class=\"ctx-item\" data-action=\"delete-me\"><i class=\"fa-solid fa-trash\"></i> Delete for me</div>";
    }
    /* Only show edit for messages less than 1h old */
    if (Date.now() - msg.ts <= 3600000) {
      ctxMenu.innerHTML += "<div class=\"ctx-item\" data-action=\"edit\"><i class=\"fa-solid fa-pen\"></i> Edit message</div>";
    }
    ctxMenu.innerHTML += "<div class=\"ctx-item\" data-action=\"delete-everyone\"><i class=\"fa-solid fa-trash-can\"></i> Delete for everyone</div>";
  } else {
    if (state.activeChat?.type !== "room") {
      ctxMenu.innerHTML += "<div class=\"ctx-item\" data-action=\"delete-me\"><i class=\"fa-solid fa-trash\"></i> Delete for me</div>";
    }
    if (canAdminDelete) {
      ctxMenu.innerHTML += "<div class=\"ctx-item ctx-danger\" data-action=\"admin-delete\"><i class=\"fa-solid fa-shield-halved\"></i> Delete for everyone (Admin)</div>";
    }
  }

  ctxMenu.style.display = "block";
  ctxMenu.style.left = Math.min(e.clientX, window.innerWidth - 220) + "px";
  ctxMenu.style.top = Math.min(e.clientY, window.innerHeight - 120) + "px";
});

document.addEventListener("click", function() {
  ctxMenu.style.display = "none";
  if (roomMemberCtxMenu) roomMemberCtxMenu.style.display = "none";
  roomMemberCtxPayload = null;
});

ctxMenu.addEventListener("click", function(e) {
  var item = e.target.closest(".ctx-item");
  if (!item || !ctxTarget) return;
  var action = item.dataset.action;
  var id = ctxTarget.dataset.id;
  var cid = activeConvId();

  if (action === "delete-me") {
    wsSend({ type: "delete-for-me", id: id });
    removeLocalMessage(id);
    ctxTarget.remove();
  } else if (action === "edit") {
    var current = findActiveMessageById(id);
    if (current) startInlineEdit(current);
  } else if (action === "reply") {
    var currentReply = findActiveMessageById(id);
    if (currentReply) setReplyTarget(currentReply);
  } else if (action === "copy") {
    var currentCopy = findActiveMessageById(id);
    if (currentCopy) {
      var copyText = (currentCopy.from ? currentCopy.from + ": " : "") + plainMessageSnippet(currentCopy, 500);
      copiedMessageBuffer = [copyText];
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(copyText).catch(function() {});
      }
    }
  } else if (action === "copy-multi") {
    var currentCopyMulti = findActiveMessageById(id);
    if (currentCopyMulti) {
      var part = (currentCopyMulti.from ? currentCopyMulti.from + ": " : "") + plainMessageSnippet(currentCopyMulti, 500);
      copiedMessageBuffer.push(part);
      var joined = copiedMessageBuffer.join("\n");
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(joined).catch(function() {});
      }
    }
  } else if (action === "delete-everyone") {
    wsSend({
      type: "delete-for-everyone",
      id: id
    });
  } else if (action === "admin-delete") {
    wsSend({
      type: "delete-for-everyone",
      id: id
    });
  }

  ctxMenu.style.display = "none";
  ctxTarget = null;
});


/* == DM SEARCH == */
if (dmSearchInput) {
  dmSearchInput.addEventListener("input", function(e) {
    state.dmSearch = e.target.value;
    renderDmList();
  });
}

if (cancelReplyBtn) {
  cancelReplyBtn.addEventListener("click", function() {
    clearReplyTarget();
  });
}


/* == BACK BUTTON (mobile) == */
var backBtn = document.getElementById("backBtn");
if (backBtn) {
  backBtn.addEventListener("click", function() {
    closeChat();
  });
}

/* == INITIAL RENDER == */
loadTheme();


/* ========================================== */
/* ==            POSTS FEATURE             == */
/* ========================================== */

const postsFeedArea = $("#postsFeedArea");
const postsFeed = $("#postsFeed");
const postsSidebarList = $("#postsSidebarList");
const createPostBtn = $("#createPostBtn");
const newPostFab = $("#newPostFab");
const createPostModal = $("#createPostModal");
const createPostClose = $("#createPostClose");
const createPostText = $("#createPostText");
const createPostPhoto = $("#createPostPhoto");
const createPostPreview = $("#createPostPreview");
const createPostPreviewImg = $("#createPostPreviewImg");
const createPostCancelPreview = $("#createPostCancelPreview");
const createPostSubmitBtn = $("#createPostSubmitBtn");
const createPostSpoilerText = $("#createPostSpoilerText");
const createPostSpoilerMedia = $("#createPostSpoilerMedia");

state.posts = [];
state.postsTabActive = false;

/* Handle incoming posts messages */
function handlePostMessage(msg) {
  switch (msg.type) {
    case "posts-list":
      state.posts = msg.posts || [];
      renderPostsSidebar();
      if (state.postsTabActive) renderPostsFeed();
      break;
    case "new-post":
      state.posts.unshift(msg.post);
      renderPostsSidebar();
      if (state.postsTabActive) renderPostsFeed();
      break;
    case "post-updated":
      if (msg.post) {
        const idx = state.posts.findIndex(function(p) { return p.id === msg.post.id; });
        if (idx !== -1) state.posts[idx] = msg.post;
        else state.posts.unshift(msg.post);
        renderPostsSidebar();
        if (state.postsTabActive) renderPostsFeed();
      }
      break;
    case "post-deleted":
      state.posts = state.posts.filter(function(p) { return p.id !== msg.postId; });
      renderPostsSidebar();
      if (state.postsTabActive) renderPostsFeed();
      break;
  }
}

/* Extend existing handle() function to route post messages */
var _originalHandle = handle;
handle = function(msg) {
  if (msg.type === "posts-list" || msg.type === "new-post" || msg.type === "post-updated" || msg.type === "post-deleted") {
    handlePostMessage(msg);
    return;
  }
  _originalHandle(msg);
};

/* Render sidebar list of posts */
function renderPostsSidebar() {
  if (!postsSidebarList) return;
  postsSidebarList.innerHTML = "";
  if (state.posts.length === 0) {
    postsSidebarList.innerHTML = "<div class=\"conv-section\">No posts yet. Create one!</div>";
    return;
  }
  state.posts.forEach(function(post) {
    var el = document.createElement("div");
    el.className = "conv-item";
    var text = post.text ? esc(post.text).substring(0, 50) : (post.photoUrl ? "\ud83d\udcf7 Photo" : "Post");
    var commentCount = (post.comments || []).length;
    var totalReactions = 0;
    if (post.reactions) {
      ["love","like","dislike","funny"].forEach(function(r) {
        totalReactions += (post.reactions[r] || []).length;
      });
    }
    var meta = [];
    if (totalReactions > 0) meta.push(totalReactions + " \u2764");
    if (commentCount > 0) meta.push(commentCount + " \ud83d\udcac");
    el.innerHTML = avatarHtmlForUser(post.from) +
      "<div class=\"conv-item-info\">" +
        "<div class=\"conv-item-name\">" + esc(post.from) + "</div>" +
        "<div class=\"conv-item-last\">" + text + "</div>" +
      "</div>" +
      "<div class=\"conv-item-meta\">" + timeStr(post.ts) + (meta.length ? "<br>" + meta.join(" ") : "") + "</div>";
    el.addEventListener("click", function() {
      openPostsTab();
      var target = document.getElementById("post-" + post.id);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    postsSidebarList.appendChild(el);
  });
}

/* Open posts tab / feed */
function openPostsTab() {
  state.postsTabActive = true;
  state.activeChat = null;
  chatArea.style.display = "none";
  noChatPlaceholder.style.display = "none";
  postsFeedArea.style.display = "";
  renderPostsFeed();
  renderConvLists();
}

/* Close posts feed (when switching to a chat) */
function closePostsFeed() {
  state.postsTabActive = false;
  if (postsFeedArea) postsFeedArea.style.display = "none";
}

/* Override openChat to close posts feed */
var _originalOpenChat = openChat;
openChat = function(type, name) {
  closePostsFeed();
  _originalOpenChat(type, name);
};

/* Override closeChat to also handle posts feed */
var _originalCloseChat = closeChat;
closeChat = function() {
  if (!state.postsTabActive) {
    _originalCloseChat();
  } else {
    state.activeChat = null;
    chatArea.style.display = "none";
  }
};

/* Tab click handler for Posts tab */
$$(".tab-btn").forEach(function(btn) {
  if (btn.dataset.tab === "posts") {
    btn.addEventListener("click", function() {
      openPostsTab();
    });
  }
});

/* Render full posts feed */
function renderPostsFeed() {
  if (!postsFeed) return;
  postsFeed.innerHTML = "";
  if (state.posts.length === 0) {
    postsFeed.innerHTML = "<div class=\"posts-empty\"><i class=\"fa-solid fa-newspaper\"></i><p>No posts yet. Be the first to share something!</p></div>";
    return;
  }
  state.posts.forEach(function(post) {
    var card = buildPostCard(post);
    postsFeed.appendChild(card);
  });
}

function postDateStr(ts) {
  var d = new Date(ts);
  var now = new Date();
  var diff = now - d;
  if (diff < 60000) return "Just now";
  if (diff < 3600000) return Math.floor(diff / 60000) + "m ago";
  if (diff < 86400000) return Math.floor(diff / 3600000) + "h ago";
  return d.toLocaleDateString() + " " + d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function buildPostCard(post) {
  var card = document.createElement("div");
  card.className = "post-card";
  card.id = "post-" + post.id;

  /* Header */
  var header = document.createElement("div");
  header.className = "post-header";
  header.innerHTML = avatarHtmlForUser(post.from) +
    "<div class=\"post-header-info\">" +
      "<span class=\"post-author\">" + esc(post.from) + "</span>" +
      "<span class=\"post-time\">" + postDateStr(post.ts) + "</span>" +
    "</div>";
  if (post.from === state.username) {
    var delBtn = document.createElement("button");
    delBtn.className = "icon-btn post-delete-btn";
    delBtn.title = "Delete post";
    delBtn.innerHTML = "<i class=\"fa-solid fa-trash\"></i>";
    delBtn.addEventListener("click", function() {
      if (confirm("Delete this post?")) {
        wsSend({ type: "delete-post", postId: post.id });
      }
    });
    header.appendChild(delBtn);
  }
  card.appendChild(header);

  /* Body */
  if (post.text) {
    var body = document.createElement("div");
    body.className = "post-body" + (post.spoilerText ? " spoiler-text" : "");
    body.innerHTML = markdownToHtml(post.text);
    if (post.spoilerText) {
      body.addEventListener("click", function(ev) {
        ev.stopPropagation();
        body.classList.toggle("revealed");
      });
    }
    body.querySelectorAll(".md-spoiler").forEach(function(el) {
      el.addEventListener("click", function(ev) {
        ev.stopPropagation();
        el.classList.toggle("revealed");
      });
    });
    card.appendChild(body);
  }
  if (post.photoUrl) {
    var photoDiv = document.createElement("div");
    photoDiv.className = "post-photo" + (post.spoilerMedia ? " spoiler-media" : "");
    var img = document.createElement("img");
    img.src = post.photoUrl;
    img.loading = "lazy";
    img.alt = "Post photo";
    img.addEventListener("click", function() {
      if (post.spoilerMedia && !photoDiv.classList.contains("revealed")) {
        photoDiv.classList.add("revealed");
        return;
      }
      lightboxImg.src = post.photoUrl;
      lightbox.style.display = "";
    });
    photoDiv.appendChild(img);
    card.appendChild(photoDiv);
  }

  /* Reactions bar */
  var reactionsBar = document.createElement("div");
  reactionsBar.className = "post-reactions-bar";
  var reactionTypes = [
    { key: "love", icon: "fa-heart", label: "Love", color: "#ef4444" },
    { key: "like", icon: "fa-thumbs-up", label: "Like", color: "#3b82f6" },
    { key: "dislike", icon: "fa-thumbs-down", label: "Dislike", color: "#f59e0b" },
    { key: "funny", icon: "fa-face-laugh-squint", label: "Funny", color: "#22c55e" },
  ];
  reactionTypes.forEach(function(rt) {
    var count = (post.reactions && post.reactions[rt.key]) ? post.reactions[rt.key].length : 0;
    var active = post.reactions && post.reactions[rt.key] && post.reactions[rt.key].includes(state.username);
    var btn = document.createElement("button");
    btn.className = "post-react-btn" + (active ? " active" : "");
    btn.title = rt.label;
    btn.style.setProperty("--react-color", rt.color);
    btn.innerHTML = "<i class=\"fa-solid " + rt.icon + "\"></i> <span>" + (count > 0 ? count : "") + "</span>";
    btn.addEventListener("click", function() {
      wsSend({ type: "post-react", postId: post.id, reaction: rt.key });
    });
    reactionsBar.appendChild(btn);
  });
  /* Comment toggle button */
  var commentCount = (post.comments || []).length;
  var commentBtn = document.createElement("button");
  commentBtn.className = "post-react-btn post-comment-toggle";
  commentBtn.title = "Comments";
  commentBtn.innerHTML = "<i class=\"fa-solid fa-comment\"></i> <span>" + (commentCount > 0 ? commentCount : "") + "</span>";
  reactionsBar.appendChild(commentBtn);
  card.appendChild(reactionsBar);

  /* Comments section (collapsible) */
  var commentsSection = document.createElement("div");
  commentsSection.className = "post-comments-section";
  commentsSection.style.display = "none";

  if (post.comments && post.comments.length > 0) {
    post.comments.forEach(function(c) {
      var cEl = document.createElement("div");
      cEl.className = "post-comment";
      var deleteHtml = "";
      if (c.from === state.username) {
        deleteHtml = "<button class=\"post-comment-delete\" data-comment-id=\"" + esc(c.id) + "\" title=\"Delete comment\"><i class=\"fa-solid fa-xmark\"></i></button>";
      }
      cEl.innerHTML = avatarHtmlForUser(c.from, "avatar-xs") +
        "<div class=\"post-comment-body\">" +
          "<span class=\"post-comment-author\">" + esc(c.from) + "</span>" +
          "<span class=\"post-comment-text" + (c.spoilerText ? " spoiler-text" : "") + "\">" + markdownToHtml(c.text) + "</span>" +
          "<span class=\"post-comment-time\">" + postDateStr(c.ts) + "</span>" +
        "</div>" + deleteHtml;
      commentsSection.appendChild(cEl);
    });
    commentsSection.querySelectorAll(".post-comment-text.spoiler-text").forEach(function(el) {
      el.addEventListener("click", function(ev) {
        ev.stopPropagation();
        el.classList.toggle("revealed");
      });
    });
    commentsSection.querySelectorAll(".post-comment-text .md-spoiler").forEach(function(el) {
      el.addEventListener("click", function(ev) {
        ev.stopPropagation();
        el.classList.toggle("revealed");
      });
    });
    commentsSection.querySelectorAll(".post-comment-delete").forEach(function(btn) {
      btn.addEventListener("click", function() {
        wsSend({ type: "delete-comment", postId: post.id, commentId: btn.dataset.commentId });
      });
    });
  }

  /* Comment input */
  var commentInputRow = document.createElement("div");
  commentInputRow.className = "post-comment-input-row";
  var commentInput = document.createElement("input");
  commentInput.type = "text";
  commentInput.placeholder = "Write a comment...";
  commentInput.className = "post-comment-input";
  var commentSpoilerToggle = document.createElement("label");
  commentSpoilerToggle.className = "chat-toggle";
  commentSpoilerToggle.innerHTML = "<input type=\"checkbox\" class=\"post-comment-spoiler\"><span>Spoiler</span>";
  var commentSendBtn = document.createElement("button");
  commentSendBtn.className = "icon-btn send-btn";
  commentSendBtn.innerHTML = "<i class=\"fa-solid fa-paper-plane\"></i>";
  var submitComment = function() {
    var txt = commentInput.value.trim();
    if (!txt) return;
    var spoilerText = !!commentSpoilerToggle.querySelector("input")?.checked;
    wsSend({ type: "post-comment", postId: post.id, text: txt, spoilerText: spoilerText });
    commentInput.value = "";
    var t = commentSpoilerToggle.querySelector("input");
    if (t) t.checked = false;
  };
  commentSendBtn.addEventListener("click", submitComment);
  commentInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") { e.preventDefault(); submitComment(); }
  });
  commentInputRow.appendChild(commentInput);
  commentInputRow.appendChild(commentSpoilerToggle);
  commentInputRow.appendChild(commentSendBtn);
  commentsSection.appendChild(commentInputRow);

  card.appendChild(commentsSection);

  /* Toggle comments */
  commentBtn.addEventListener("click", function() {
    var visible = commentsSection.style.display !== "none";
    commentsSection.style.display = visible ? "none" : "";
    if (!visible) {
      commentInput.focus();
    }
  });

  return card;
}

/* Create Post Modal */
if (createPostBtn) createPostBtn.addEventListener("click", openCreatePostModal);
if (newPostFab) newPostFab.addEventListener("click", openCreatePostModal);

function openCreatePostModal() {
  createPostText.value = "";
  createPostPhoto.value = "";
  if (createPostSpoilerText) createPostSpoilerText.checked = false;
  if (createPostSpoilerMedia) createPostSpoilerMedia.checked = false;
  createPostPreview.style.display = "none";
  createPostPreviewImg.src = "";
  createPostModal.style.display = "";
  createPostText.focus();
}

createPostClose.addEventListener("click", function() { createPostModal.style.display = "none"; });
createPostModal.addEventListener("click", function(e) { if (e.target === createPostModal) createPostModal.style.display = "none"; });

createPostPhoto.addEventListener("change", function() {
  var f = createPostPhoto.files[0];
  if (!f) return;
  createPostPreview.style.display = "";
  createPostPreviewImg.src = URL.createObjectURL(f);
});

createPostCancelPreview.addEventListener("click", function() {
  createPostPhoto.value = "";
  createPostPreview.style.display = "none";
  createPostPreviewImg.src = "";
});

createPostSubmitBtn.addEventListener("click", function() {
  var text = createPostText.value.trim();
  var photoFile = createPostPhoto.files[0];
  if (!text && !photoFile) return;
  var fd = new FormData();
  fd.append("username", state.username);
  fd.append("text", text);
  if (photoFile) fd.append("photo", photoFile);
  if (createPostSpoilerText && createPostSpoilerText.checked) fd.append("spoilerText", "1");
  if (createPostSpoilerMedia && createPostSpoilerMedia.checked) fd.append("spoilerMedia", "1");
  fetch("/create-post", { method: "POST", body: fd })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.ok) {
        createPostModal.style.display = "none";
      }
    });
});
