# 📹 Droplink Reels Feature Plan

## 🎯 Objective
Introduce short-form video content ("Reels") inside Droplink to:
- Boost user engagement
- Increase Pi Browser traffic
- Enable creator monetization via Pi
- Differentiate Droplink in the Pi ecosystem

---

## 🧩 Feature Overview

| Feature | Description |
|--------|-------------|
| Reels Upload | Allow users to upload 15–60 second vertical videos from their Droplink dashboard |
| In-Profile Reels Player | Visitors can watch reels from a user's profile (like IG Stories or TikTok) |
| Global Reels Feed (Explore) | Optional page showing trending or recent reels across Droplink |
| Pi-Powered Engagement | Users can tip with Pi, comment, or react inside the Pi Browser |
| Reels Only in Pi Browser | Videos are locked outside Pi Browser to encourage ecosystem usage |
| Monetization Options | Tag products, links, or offer paid content inside reels |
| Admin Moderation | Tools to flag, report, and manage abusive content |

---

## 🔧 Technical Components

### Frontend (User Dashboard)
- Reels uploader (video format: MP4, vertical aspect ratio)
- Preview tool before publishing
- Add title, description, link tags, and Pi pricing (if any)

### Frontend (Public Profile)
- Reels carousel UI (swipe/scroll interface)
- "Tip Pi" button under each reel
- Optional: Comment or like system (stored on backend)

### Backend
- Reels storage (e.g., cloud storage or IPFS)
- Metadata DB: userID, video URL, likes, tips, timestamp, etc.
- Pi Payments integration for tipping
- Visibility settings (public/private/unlisted)

### Admin Tools
- Review dashboard for moderation
- Report system (users can flag reels)
- Auto-hide on report threshold

---

## 🔐 Pi SDK Integration Points

| SDK Component | Use Case |
|---------------|----------|
| Pi Auth       | Reels upload/viewing restricted to Pi users |
| Pi Payments   | Tip creators via reels, sell digital content |
| Pi AdNetwork  | Rewarded ads before/after reels (optional) |
| Pi Meta       | Auto-generates metadata to help reels rank inside Pi |
| DITO (optional) | Verified creator badge or trust signal for video content |

---

## 🚀 Development Timeline (MVP Focused)

| Week | Milestone |
|------|-----------|
| 1    | Design UI for upload & profile Reels viewer |
| 2    | Backend setup for video storage & metadata |
| 3    | Pi Auth + Payments integration (tip system) |
| 4    | In-profile Reels playback | 
| 5    | Testing + mobile optimization in Pi Browser |
| 6    | Launch Beta to 100 test users |
| 7    | Fix bugs + roll out explore feed (optional) |
| 8    | Full Launch with Creator Challenge campaign |

---

## 📈 Marketing & Growth Strategy

- **Creator Challenge**: Reward users who get the most tips/views using Reels
- **"Only on Pi Browser" Campaign**: Position Droplink Reels as an exclusive Pi-native experience
- **Cross-Promotion**: Feature top reels across Droplink.pi homepage
- **Incentivize Sharing**: Offer Pi or points when reels are shared/viewed

---

## 🧠 Future Enhancements

- Live Reels / Pi Live Streaming (Phase 2)
- Comment Threads (on-chain or off-chain)
- Verified Reels / Pi Creator Badges
- Reels Analytics (views, earnings, engagement rate)

---

## 👥 Team & Roles (suggested)

| Role | Responsibility |
|------|----------------|
| Frontend Dev | UI for uploading, playing reels |
| Backend Dev | DB, video storage, Pi SDK integration |
| Designer | Reels UI/UX mockups |
| Moderator/Admin | Content review + community rules |
| Growth/Community | Drive engagement & campaigns |

---

## 📌 Notes
- Reels size limit: 20MB (adjustable)
- Formats: MP4 only for now
- Reels may autoplay on profile, muted by default