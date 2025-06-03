# component_tree.md – React Component Architecture for Droplink

This outlines the full component hierarchy for Droplink, your all-in-one Link-in-Bio app with Pi Network integration.

---

## 📂 src/
### 📁 components/
- **`<MainLayout />`** – Global layout: header, footer, theme wrapper
- **`<Sidebar />`** – Admin/User navigation panel
- **`<LinkCard />`** – Renders individual link items
- **`<ProfileHeader />`** – Displays avatar, username, bio
- **`<ThemeSelector />`** – Switch between profile themes
- **`<ProductCard />`** – Showcase digital products
- **`<QRCodeModal />`** – Display profile QR code
- **`<TipButton />`** – Pi Tip donation button with confirmation
- **`<TransactionList />`** – Shows tip & product payment history
- **`<GroupCard />`** – Display group info and join options
- **`<ChatBox />`** – Real-time chat for groups
- **`<MessageBubble />`** – Renders each chat message
- **`<AnalyticsPanel />`** – Optional view & click tracking

---

## 📁 pages/
### **Landing / Marketing**
- `index.tsx` – Public homepage with pricing and features
- `about.tsx` – About the Droplink platform
- `pricing.tsx` – Plans and subscription tiers

### **Authentication**
- `login.tsx` – Email/Pi Auth
- `signup.tsx` – New user onboarding
- `onboard.tsx` – Setup display name, avatar, theme

### **Dashboard (Authed User)**
- `dashboard.tsx` – Overview of links, stats, earnings
- `profile.tsx` – Customize bio, avatar, profile settings
- `links.tsx` – Manage all link blocks
- `products.tsx` – Upload/sell digital content
- `tips.tsx` – Manage Pi tip receipts and settings
- `groups.tsx` – Create and join monetized groups
- `chat/[groupId].tsx` – Real-time group chat room

### **Public Profiles**
- `u/[username].tsx` – Public Droplink profile (e.g. droplink.com/u/miko)

---

## 📁 hooks/
- `useUser.ts` – Get user session info from Supabase
- `useLinks.ts` – CRUD for links
- `useTips.ts` – Handle Pi Tips
- `useProducts.ts` – Upload/list products
- `useGroups.ts` – Group creation, join logic
- `useChat.ts` – Chat send/receive messages
- `useTheme.ts` – Profile theme logic

---

## 📁 utils/
- `pi.ts` – Pi Network SDK wrapper for payments & auth
- `supabase.ts` – Supabase client setup
- `verifyJWT.ts` – Validate auth tokens in Edge Functions
- `formatDate.ts` – Helper for timestamps

---

## 📁 styles/
- `tailwind.config.js` – Theme variables, branding
- `globals.css` – Global resets and custom styles

---

## Optional 🧪
### 📁 tests/
- `LinkCard.test.tsx` – Unit test for rendering links
- `ChatBox.test.tsx` – Simulates message sending

---

