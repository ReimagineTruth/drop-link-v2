# database_schema.md - Supabase Tables for Droplink

This schema defines all tables used in Droplink, the all-in-one Link-in-Bio + Pi monetization platform.

---

## 🔐 `users`
Stores all authenticated users and profile data.

| Column        | Type      | Description                          |
|---------------|-----------|--------------------------------------|
| id            | uuid      | Primary key, matches Supabase auth   |
| username      | text      | Unique public handle (e.g. @miko)    |
| display_name  | text      | Name shown on profile                |
| bio           | text      | Short bio or intro                   |
| avatar_url    | text      | Profile image URL                    |
| theme_id      | uuid      | FK to themes table                   |
| plan          | text      | Plan name (free, starter, pro, etc.) |
| created_at    | timestamp | Account creation time                |

---

## 🔗 `links`
User-customizable buttons and URLs.

| Column      | Type      | Description                        |
|-------------|-----------|------------------------------------|
| id          | uuid      | Primary key                        |
| user_id     | uuid      | FK to users                        |
| title       | text      | Button title (e.g. "My YouTube")   |
| url         | text      | Destination link                   |
| icon        | text      | Optional emoji/icon                |
| style       | jsonb     | Styling overrides (color, etc.)    |
| order_index | integer   | For drag-and-drop reordering       |
| is_active   | boolean   | Whether link is live               |
| schedule_at | timestamp | Optional publish time              |
| expire_at   | timestamp | Optional expiry time               |
| created_at  | timestamp | Created time                       |

---

## 🎨 `themes`
Design templates and branding.

| Column       | Type    | Description                          |
|--------------|---------|--------------------------------------|
| id           | uuid    | Primary key                          |
| name         | text    | Theme name (e.g. Minimal Dark)       |
| background   | text    | Background color or image URL        |
| button_style | jsonb   | Default button settings              |
| is_premium   | boolean | Whether theme is locked by plan      |

---

## 💰 `tips`
Tracks all Pi tips given to users.

| Column       | Type      | Description                        |
|--------------|-----------|------------------------------------|
| id           | uuid      | Primary key                        |
| sender_id    | uuid      | FK to users                        |
| recipient_id | uuid      | FK to users                        |
| amount       | float     | Pi amount                          |
| tx_id        | text      | Pi transaction ID                  |
| message      | text      | Optional note or message           |
| created_at   | timestamp | Time of tip                        |

---

## 🛍️ `products`
Digital items or services sold on profiles.

| Column       | Type      | Description                        |
|--------------|-----------|------------------------------------|
| id           | uuid      | Primary key                        |
| user_id      | uuid      | Seller (FK to users)               |
| title        | text      | Product name                       |
| description  | text      | Short description                  |
| price        | float     | Price in Pi                        |
| file_url     | text      | URL to deliverable (PDF, ZIP, etc.)|
| created_at   | timestamp | When product was listed            |

---

## 🛒 `transactions`
Successful Pi purchases (e.g. for products, group joins).

| Column       | Type      | Description                        |
|--------------|-----------|------------------------------------|
| id           | uuid      | Primary key                        |
| buyer_id     | uuid      | FK to users                        |
| seller_id    | uuid      | FK to users                        |
| product_id   | uuid      | FK to products (nullable if group) |
| group_id     | uuid      | FK to groups (nullable if product) |
| amount       | float     | Pi paid                            |
| tx_id        | text      | Transaction ID                     |
| created_at   | timestamp | Time of transaction                |

---

## 👥 `groups`
Community groups or clubs created by users.

| Column       | Type      | Description                        |
|--------------|-----------|------------------------------------|
| id           | uuid      | Primary key                        |
| admin_id     | uuid      | FK to users                        |
| name         | text      | Group name                         |
| description  | text      | Public description                 |
| join_fee     | float     | Fee to join (in Pi)                |
| member_limit | int       | Max members (upgradeable)          |
| created_at   | timestamp | Group creation time                |

---

## 🤝 `group_members`
Tracks members of paid/free groups.

| Column     | Type      | Description                  |
|------------|-----------|------------------------------|
| id         | uuid      | Primary key                  |
| user_id    | uuid      | Member (FK to users)         |
| group_id   | uuid      | FK to groups                 |
| joined_at  | timestamp | Time of membership           |
| role       | text      | Member, moderator, banned    |

---

## 💬 `messages`
Real-time group chat messages.

| Column      | Type      | Description                  |
|-------------|-----------|------------------------------|
| id          | uuid      | Primary key                  |
| group_id    | uuid      | FK to groups                 |
| sender_id   | uuid      | FK to users                  |
| content     | text      | Message content              |
| created_at  | timestamp | Time of message              |

---


