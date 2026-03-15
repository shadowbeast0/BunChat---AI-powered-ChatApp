<div align="center">

# 🍔BunChat 

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)

**AI-Powered Real-Time Chat App**

*BunChat is a real-time chat platform that blends classic messaging with AI moderation, social posting, and community controls. It supports groups, DMs, and public rooms in one interface, plus a built-in safety system that helps keep conversations active without turning them toxic.*

---

### 🎥 Web App Preview

<video controls width="100%">
  <source src="./preview/BunChat_Demo.mp4" type="video/mp4">
</video>

> ⚠️ **Note:** If your local Markdown previewer does not support video playback, **[click here to view the BunChat_Demo.mp4](./preview/BunChat_Demo.mp4)**. (The video player will render automatically once pushed to GitHub).

</div>

---

## ✨ Feature Highlights

### 💬 Real-Time Communication
* **Lightning Fast:** Real-time messaging powered by WebSockets.
* **Versatile Chats:** 1:1 Direct Messages, Group chats with an invite-code join flow, and Public rooms you can create, search, and join.
* **Rich Messaging:** Media support (images + videos) with captions, inline message edits, and message replies.
* **Live Feedback:** Typing indicators for active conversations.
* **Privacy Controls:** "Delete for me" and "Delete for everyone" options.

### 🛡️ Smart Message Controls
* **Mentions:** Target specific users or use `@here` and `@everyone` (owner/admin only).
* **Content Safety:** Spoiler tags for both text and media.
* **Leak Prevention:** OTP-like content confirmation in groups/rooms.
* **Custom Embellishments:** Inline embed command support: `!embed #RRGGBB <message>`.

### 👑 Community & Moderation System
* **Group Management:** Owner/admin roles, approval-required join modes, and member management (kick/ban/unban). Transfer ownership or customize the group profile and avatar.
* **Room Management:** Advanced moderation including manual mutes (with optional durations), moderation logs (with clear/delete controls), and purge/delete operations.
* **Vibe Checks:** Toggle **Toxic Filter** or **Troll Mode** on a per-room basis.

### 🧠 AI Moderation Engine *(Hybrid Node + Python)*
* **Multi-Model Toxicity Ensemble:** Utilizes `toxic-bert`, `roberta toxicity classifier`, and `martin-ha` models.
* **Smart Scoring:** Room-level moderation scoring (MSS: Mental-State Score) persisted per user.
* **Automated Discipline:** Progressive mute ladder for repeated abuse, repeat toxic paste detection, and room spam slowdown protection.
* **De-escalation:** AI therapist-style DM intervention for heated users.
* **Troll Mode:** Optional *BunBot* troll replies when the room's Troll Mode is activated.
* **System Health:** `/health` endpoint in the moderation service for model readiness checks.

### 📰 Social Feed Integration
* **Built-in Feed:** A posts feed integrated directly into the chat app.
* **Rich Posts:** Create posts with text and optional media.
* **Engagement:** Reaction system (`love`, `like`, `dislike`, `funny`) and comment threads.
* **Ephemeral Content:** Automatic 24-hour post expiry cleanup.

### 👤 Profile & Personalization
* **Identity:** User profiles with bio/about sections, status modes, and avatar upload/delete.
* **Control:** DM block/unblock lists.
* **Tracking:** Mention-aware unread message tracking.

### 🕵️ Hidden & Bonus Features
* **Incognito:** Hidden chats support (hide/unhide groups and DMs).
* **Easter Eggs:** Secret sequence unlock flow for the hidden tab.
* **Konami Code:** Unlocks a typing arena! Test your WPM, accuracy, consistency, and time against a leaderboard.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Backend** | Node.js, Express, ws (WebSocket), Multer |
| **Frontend** | Vanilla JS, Pug templates, CSS |
| **Database** | SQLite (`better-sqlite3`) with WAL mode enabled |
| **AI Moderation** | Python, Flask, Transformers, Sentence-Transformers, Groq API (Optional) |

> **Note on Data Persistence:** Uses a SQLite-backed system. Features an automatic migration path from legacy JSON files to SQLite on the first run. Persists Users, Messages, Groups, Rooms, Posts, Moderation Scores, and Logs.

---

## 📂 Project Structure

```text
.
├── server.js
├── db.js
├── moderation.js
├── moderation_service.py
├── package.json
├── requirements.txt
├── public/
├── views/
└── storage/
```

---

## 🚀 Quick Start

### 1. Install Node dependencies
```bash
npm install
```

### 2. Install Python dependencies
```bash
pip install -r requirements.txt
```

### 3. (Optional) Configure environment
Create a `.env` file for moderation service settings:
```env
GROQ_API_KEY=your_groq_api_key_here
MODERATION_PORT=5050
MODERATION_URL=http://localhost:5050
```
> *Without `GROQ_API_KEY`, core toxicity checks still work; advanced LLM-generated responses will gracefully fall back.*

### 4. Start the Python Moderation Service
```bash
python moderation_service.py
```

### 5. Start the BunChat Server
```bash
npm start
```
*Note: Keep both services running for full AI moderation behavior.*

### 6. Open in your browser
Navigate to `http://localhost:3000`

---

## 📄 License
This project is licensed under the terms in the [LICENSE](LICENSE) file.
