# 📚 Complete Documentation Package for Droplink

Welcome to the official Droplink Dev Documentation! This document outlines all the available technical resources included in the monorepo for building, extending, and maintaining the Droplink app — a powerful Link-in-Bio platform integrated with Pi Network.

---

## 🧭 High-Level Documents

### `masterplan.md`
- Vision, purpose, target audience
- Business strategy
- Long-term roadmap
- Monetization model via Pi plans

### `implementation_plan.md`
- Timeline of app features
- Weekly sprints
- Dev team tasks and milestones
- Launch plan and testing checklist

### `design_guidelines.md`
- Mobile-first UI/UX design principles
- Button/link styles
- Color system
- Room-based customization for pets (optional)
- Avatar and theme assets

---

## 🔧 Core Architecture

### `component_tree.md`
- Visual hierarchy of frontend components
- Pages, reusable elements, logic separation

### `api_routes.md`
- Full REST API endpoint documentation
- Auth, links, profiles, payments, groups, and chat

### `database_schema.md`
- Supabase table schema: users, links, products, transactions, chat, groups
- Field types, constraints, relationships

---

## 🔐 Integration Docs

### `pi_payment_integration.md`
- Pi Network payment flow
- Handling tips, product purchases, and group joins
- Verifying transactions with Edge Functions

### `auth_and_jwt.md`
- Supabase Auth setup
- JWT handling inside Edge Functions
- Frontend token storage and refresh best practices

---

## 💬 Real-Time Features

### `chat_realtime.md`
- Group chat logic
- Supabase Realtime channel setup
- Event listeners for new messages

---

## 🧪 DevOps & Contribution

### `README.md`
- How to set up and run the project
- Frontend + backend + Supabase instructions
- Local and production setup guide

### `CONTRIBUTING.md`
- Fork, PR, and review guidelines
- Naming conventions and commit messages

### `CHANGELOG.md`
- Version history and updates

### `FUTURE_FEATURES.md`
- Wishlist: gamified stats, group badges, AI link suggestions, voice rooms

---

## 📦 Bonus Files

- `docs/schema.sql` – Ready-to-deploy Supabase schema
- `docs/openapi.yaml` – OpenAPI/Swagger spec
- `docs/erd_diagram.png` – Entity Relationship Diagram
- `docs/notion_roadmap.md` – Exported roadmap for devs

---
