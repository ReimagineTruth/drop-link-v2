# Implementation Plan - Droplink

## Objective
Build a full-featured, scalable Link-in-Bio app with support for:
- User profile pages
- Unlimited links
- Custom branding
- Pi tips and digital product sales
- Group memberships and chat
- Analytics and monetization tools

---

## Phase 1: Core System (MVP)

✅ **User Authentication**
- Supabase Auth
- Pi Network login (fallback with email optional)

✅ **Public Profiles**
- URL: `/@username`
- Avatar, bio, social links
- Unlimited link blocks

✅ **Link Manager**
- Add/edit/delete links
- Reorder via drag-and-drop
- Button style selector (custom colors, icons, animations)

✅ **Theme Manager**
- Basic theme templates (Light, Dark, Minimal)
- .pi domain upgrade

✅ **Basic Analytics**
- Total clicks
- Link-specific click count
- Location-based views

✅ **QR Code Generator**
- Generate and download QR linked to profile

---

## Phase 2: Monetization Layer

✅ **Pi Tips Integration**
- Users can receive tips via Pi SDK
- Tip button visible on profile

✅ **Product Sales**
- Upload digital products (PDFs, assets)
- Sell directly from profile
- Pi payment checkout and download link after success

✅ **Group Creation**
- Create paid groups (10π creation fee)
- Set joining fee
- Revenue goes to group creator
- Group preview/profile page

✅ **Chat System**
- Real-time chat per group (Supabase Realtime)
- Moderation tools (ban, mute)
- Attachments, emoji, pinned messages

---

## Phase 3: Premium Features

✅ **Link Scheduling**
- Schedule links to go live at specific dates/times
- Set expiry dates

✅ **Spotlight Links**
- Highlight important links with glow/shake/bounce

✅ **Email/Phone Collection**
- Add opt-in block to collect user data

✅ **Advanced Analytics**
- Click source
- Device type
- Heatmaps (if possible)

✅ **Whitelabeling**
- Hide "Droplink" branding
- Use custom domains

✅ **Custom Themes**
- Upload background images
- Full CSS override (Pro plan)

---

## Phase 4: Community Expansion

✅ **Follow System**
- Follow other Droplink creators
- See updates and tips

✅ **Public Group Directory**
- Explore paid/free groups
- Trending & top earners

✅ **Creator Leaderboard**
- Weekly/monthly top earners
- Gamification features

✅ **Community Forums**
- Powered by Pi login
- Channels by topic (e.g. SEO, content tips, Pi economy)

✅ **Pi Ad Network Integration**
- Creators can earn from ads
- Boost profiles via paid impressions

---

## Dev Timeline Example (6 Weeks)

| Week | Milestone                              |
|------|----------------------------------------|
| 1    | Supabase setup, Auth, Profile Pages    |
| 2    | Link Manager, Themes, QR Codes         |
| 3    | Pi Tips, Digital Products, Pi SDK      |
| 4    | Paid Groups, Group Page, Chat System   |
| 5    | Analytics, Link Scheduling, Spotlight  |
| 6    | Follow System, Leaderboards, Whitelabeling |

---

## Priorities
1. Authentication + Profile Core
2. Pi Payment & Tips
3. Group Creation + Monetization
4. UI Polish + Social Features

---

## Final Deliverables
- Supabase schema
- API documentation
- Edge functions (Tips, Chat, Groups)
- Responsive frontend (React or Next.js)
- Mobile-ready full screen mode
- GitHub monorepo + Notion roadmap
