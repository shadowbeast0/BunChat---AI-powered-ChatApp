# BunChat - AI-Powered Real-Time Chat App

BunChat is a real-time chat platform that blends classic messaging with AI moderation, social posting, and community controls.

It supports groups, DMs, and public rooms in one interface, plus a built-in safety system that helps keep conversations active without turning them toxic.

## Web App Preview (Placeholder)

> Replace this section with your hosted demo link/video/gif later.

- Live URL: `COMING_SOON`
- Demo Video: `COMING_SOON`
- Screenshot/GIF: `PASTE_IMAGE_OR_GIF_LINK_HERE`

## Feature Highlights

### Real-time communication
- Real-time messaging over WebSockets.
- 1:1 direct messages.
- Group chats with invite code join flow.
- Public rooms users can create, search, join, and leave.
- Typing indicators for active conversations.
- Message reply support.
- Inline message edit support.
- Delete for me and delete for everyone options.
- Media messaging (images + videos) with captions.

### Smart message controls
- Mention system with user mentions.
- `@here` and `@everyone` permissions for owner/admin roles.
- Spoiler support for text and media.
- OTP-like content confirmation in groups/rooms (to reduce accidental leaks).
- Inline embed command support: `!embed #RRGGBB <message>`.

### Community and moderation system
- Group management:
  - Owner/admin roles.
  - Approval-required mode for group joins.
  - Approve/reject join requests.
  - Promote/demote admin.
  - Kick/ban/unban members.
  - Transfer group ownership.
  - Group profile updates and avatar customization.
- Room management:
  - Owner/admin roles.
  - Promote/demote admins.
  - Kick/ban/unban members.
  - Manual mute/unmute with optional duration.
  - Toggle toxic filter per room.
  - Toggle troll mode per room.
  - Room moderation logs with clear/delete controls.
  - Room icon and profile customization.
  - Room purge and delete operations.
  - Transfer room ownership.

### AI moderation engine (hybrid Node + Python)
- Multi-model toxicity ensemble (toxic-bert, roberta toxicity classifier, martin-ha model).
- Room-level moderation scoring (MSS: Mental-State Score) persisted per user.
- Progressive mute ladder on repeated abuse.
- Repeat toxic paste detection and auto-mute behavior.
- Room spam slowdown protection (rate abuse handling).
- Admin/owner bypass for moderation checks where applicable.
- AI therapist-style de-escalation DM for heated users.
- Optional BunBot troll replies (when room troll mode is enabled).
- `/health` endpoint in moderation service for model readiness checks.

### Social feed features
- Posts feed integrated into chat app.
- Create post with text and optional media.
- Post reaction system (`love`, `like`, `dislike`, `funny`).
- Post comments and comment deletion.
- Post deletion controls.
- Automatic 24-hour post expiry cleanup.

### Profile and personalization
- User profile with bio/about and status modes.
- Avatar upload/delete.
- Banner upload/delete and position control.
- Accent and banner color customization.
- Profile decorations.
- GitHub username field in profile.
- DM block/unblock controls.
- Unread tracking and mention-aware unread behavior.

### Hidden and bonus features
- Hidden chats support (hide/unhide groups and DMs).
- Secret sequence unlock flow for hidden tab.
- Konami unlock typing arena.
- Typing test with WPM, accuracy, consistency, time, and leaderboard.

### Data and persistence
- SQLite-backed persistence (`better-sqlite3`).
- Automatic migration path from legacy JSON files to SQLite on first run.
- WAL mode enabled for SQLite.
- Persisted storage for:
  - Users
  - Messages
  - Groups
  - Rooms
  - Posts
  - Moderation scores
  - Room moderation logs

## Tech Stack

- Backend: Node.js, Express, ws (WebSocket), Multer
- Frontend: Vanilla JS + Pug templates + CSS
- Database: SQLite (`better-sqlite3`)
- AI Moderation Service: Python, Flask, Transformers, Sentence-Transformers, optional Groq API

## Project Structure

```text
.
|- server.js
|- db.js
|- moderation.js
|- moderation_service.py
|- package.json
|- requirements.txt
|- public/
|- views/
`- storage/
```

## Quick Start

### 1) Install Node dependencies

```bash
npm install
```

### 2) Install Python dependencies

```bash
pip install -r requirements.txt
```

### 3) (Optional) configure environment

Create a `.env` file for moderation service settings:

```env
GROQ_API_KEY=your_groq_api_key_here
MODERATION_PORT=5050
MODERATION_URL=http://localhost:5050
```

### 4) Start Python moderation service

```bash
python moderation_service.py
```

### 5) Start BunChat server

```bash
npm start
```

### 6) Open in browser

```text
http://localhost:3000
```

## Notes

- Keep both services running for full AI moderation behavior.
- Without `GROQ_API_KEY`, core toxicity checks still work; advanced LLM-generated responses gracefully fall back.

## License

This project is licensed under the terms in [LICENSE](LICENSE).
