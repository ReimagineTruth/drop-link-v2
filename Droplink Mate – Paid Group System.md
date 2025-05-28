# 🔗 Droplink Mate – Paid Group System

Droplink Mate is an advanced social and interactive system within the Droplink platform, allowing users to create **groups**, follow each other, and interact via activities. The **Paid Group Hosting** feature adds monetization and management capabilities for creators.

---

## 📦 Features Overview

| Feature                | Description |
|------------------------|-------------|
| 🔧 Create Group        | Admins can create a group for a one-time 10π fee |
| 💰 Set Join Price      | Admins define their own join price (e.g., 5π, 20π) |
| 👥 Member Limit        | Groups start with 10 users, expand in 10-member blocks (10π per block) |
| 💸 Revenue             | Admins receive 100% of join payments |
| 🧾 Payment Logs        | All transactions logged securely |
| ✅ Secure Payments     | Integrated with the Pi Network SDK |
| 🧩 Built with Supabase | Uses Supabase for auth, database, and RLS |
| 🔐 RLS Protection      | All group and member actions are permission-controlled |

---

## 🧱 Supabase Database Schema

```sql
-- Table: groups
CREATE TABLE groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES users(id),
  name TEXT NOT NULL,
  description TEXT,
  join_price FLOAT DEFAULT 0.0,
  member_limit INT DEFAULT 10,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table: group_members
CREATE TABLE group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES groups(id),
  user_id UUID REFERENCES users(id),
  joined_at TIMESTAMP DEFAULT NOW(),
  paid BOOLEAN DEFAULT false
);

-- Table: group_payments
CREATE TABLE group_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES groups(id),
  user_id UUID REFERENCES users(id),
  amount FLOAT NOT NULL,
  payment_type TEXT CHECK (payment_type IN ('creation', 'join', 'upgrade')),
  to_admin BOOLEAN DEFAULT true,
  timestamp TIMESTAMP DEFAULT NOW()
);
````

---

## 🔁 API Endpoints

### `POST /api/groups/create`

Create a group after verifying payment of `10π` to the platform.

**Payload:**

```json
{
  "name": "Mate Pro Group",
  "description": "A private pro community",
  "join_price": 25
}
```

---

### `POST /api/groups/join`

Join a group and pay the admin's defined fee.

**Payload:**

```json
{
  "groupId": "abc-123-def"
}
```

---

### `POST /api/groups/upgrade`

Expand the group limit by 10 members with an extra `10π` fee.

**Payload:**

```json
{
  "groupId": "abc-123-def"
}
```

---

## 💵 Pi Payment Flow (Example)

```ts
const payment = await Pi.createPayment({
  amount: 10,
  memo: "Droplink Mate - Group Creation",
  metadata: { type: "group-creation", groupName: "Mate World" }
});

if (payment.status === 'COMPLETED') {
  // Proceed to Supabase insert
}
```

---

## 🧪 GitHub Branching Strategy

| Branch Name               | Purpose                       |
| ------------------------- | ----------------------------- |
| `main`                    | Stable production code        |
| `dev-droplink`            | Ongoing development           |
| `feature/droplink-mate`   | Entire Droplink Mate system   |
| `feature/paid-groups`     | Paid Group functionality      |
| `feature/pi-domain`       | Future .pi domain integration |
| `feature/ui-enhancements` | UI improvements and polish    |
| `feature/sticker-system`  | Future sticker packs          |

---

## 🧠 Future Ideas (Coming Soon)

* AI Content Assistant for groups
* Marketplace for Templates
* Affiliate System with Pi rewards
* Merch integration with Pi checkout
* Advanced automation tools
* Multi-language support

---

## 📌 License & Ownership

This module is part of the **Droplink** platform and owned by the original project founder. All payments and group monetization flows are managed through the **Pi Network** and integrated via secure SDK endpoints.
