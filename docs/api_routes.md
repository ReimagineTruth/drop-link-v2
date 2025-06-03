
# api_routes.md - RESTful API Endpoints for Droplink

This document defines all backend API routes for Droplink's key features: links, profiles, tips, groups, chat, and payments. All requests require a valid Supabase JWT unless marked as public.

---

## 🧑‍💼 Auth & Users

### `GET /api/user/me`
Returns current user profile.

- Headers: `Authorization: Bearer <JWT>`
- Response:
```json
{
  "id": "uuid",
  "username": "miko",
  "display_name": "Miko Santos",
  "avatar_url": "...",
  "plan": "starter"
}
````

### `POST /api/user/update`

Update profile data.

* Body:

```json
{
  "display_name": "Miko S.",
  "bio": "Pi enthusiast",
  "avatar_url": "..."
}
```

---

## 🔗 Links

### `GET /api/links/:username`

Public profile link data (no auth required).

* Response:

```json
{
  "links": [
    { "title": "My Store", "url": "https://...", "icon": "🛍️" }
  ],
  "profile": { ... }
}
```

### `POST /api/links`

Create or update a link.

* Body:

```json
{
  "title": "YouTube",
  "url": "https://youtube.com/@...",
  "icon": "▶️",
  "style": { "color": "#FF0000" }
}
```

### `DELETE /api/links/:id`

Delete a link by ID.

---

## 🎨 Themes

### `GET /api/themes`

Get all available themes.

### `POST /api/user/theme`

Apply a theme to your profile.

* Body:

```json
{ "theme_id": "uuid" }
```

---

## 💰 Pi Tips

### `POST /api/tips`

Send a Pi tip to a user.

* Body:

```json
{
  "recipient_id": "uuid",
  "amount": 1.5,
  "tx_id": "PiTx_12345",
  "message": "Thanks!"
}
```

### `GET /api/tips/me`

View tips you’ve received.

---

## 🛍️ Products

### `GET /api/products/:username`

Get a user’s listed products.

### `POST /api/products`

Create a new digital product.

* Body:

```json
{
  "title": "My E-book",
  "description": "Learn to earn Pi",
  "price": 3,
  "file_url": "https://..."
}
```

---

## 🛒 Transactions

### `POST /api/transactions`

Log completed Pi payment.

* Body:

```json
{
  "tx_id": "PiTx_789",
  "amount": 3,
  "buyer_id": "...",
  "seller_id": "...",
  "product_id": "..."
}
```

---

## 👥 Groups

### `POST /api/groups`

Create a new group.

* Body:

```json
{
  "name": "Pi Creators",
  "description": "For digital pioneers",
  "join_fee": 10,
  "member_limit": 10
}
```

### `POST /api/groups/join`

Join a paid group.

* Body:

```json
{
  "group_id": "uuid",
  "tx_id": "PiTx_2025"
}
```

---

## 💬 Chat

### `GET /api/messages/:group_id`

Fetch latest group messages.

### `POST /api/messages`

Send a message to group.

* Body:

```json
{
  "group_id": "uuid",
  "content": "Hi everyone!"
}
```

---

## 📈 Analytics (optional)

### `POST /api/analytics/view`

Track profile visit.

* Body:

```json
{
  "user_id": "uuid",
  "location": "PH",
  "device": "mobile"
}
```

