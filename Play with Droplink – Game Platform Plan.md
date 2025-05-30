# 🎮 Play with Droplink – Game Platform Documentation

Welcome to **Play with Droplink** — a Pi Network-integrated gaming platform offering both free and premium interactive games with monetization through Pi AdNetwork and monthly subscriptions.

---

## 🌟 Features

### ✅ Free Users
- Access to a limited set of games (e.g., 10 out of 50+)
- Pi AdNetwork enabled (ads between stages or rounds)
- Games include stages: Easy, Medium (limited)
- Unlock premium content by subscribing or paying Pi

### 💎 Premium Users (10 Pi/month)
- Access **all 50+ games**
- **No Pi AdNetwork** – 100% ad-free gameplay
- Full access to all difficulty levels: Easy, Medium, Hard, Extreme
- Early access to new games
- Exclusive badge and leaderboard tier

---

## 🧠 Game Types

### 🧩 Puzzle & Logic
- Memory Match
- Word Guess
- Pi Wordle
- Logic Flow
- Match 3
- Tile Flipper

### 🚀 Action & Reflex
- Droplink Runner
- Tap the Drop
- Jump & Catch
- Avoid the Spike
- Pi Dash

### 🧠 Trivia & Quiz
- Pi Trivia Tower
- Emoji Quiz
- Fact or Fake
- Typing Speed Test

### 🎨 Creative & Fun
- Droplink Dress Up
- Paint Pi
- Mascot Builder
- Fortune Teller

Each game features **staged difficulty**:  
🔹 Easy → 🟡 Medium → 🔴 Hard → 🔥 Extreme

---

## 🔁 Infinite Games

Designed for endless replayability with leaderboard integration:
- Infinite Quiz
- Endless Memory Match
- Pattern Repeat
- Pi Galaxy Shooter
- Typing Chain

Players continue as long as they survive. Difficulty increases dynamically each stage.

---

## 💸 Paid Games (One-time Pi Purchase)
- No Pi AdNetwork
- Access restricted to paid users only
- Games include:
  - Pi Chess (1 Pi)
  - Droplink Dash Extreme (0.5 Pi)
  - Puzzle Builder Pro (0.75 Pi)
  - Build-a-Mascot (0.75 Pi)

---

## 💳 Monthly Subscription – 10 Pi/month

### Benefits:
- Unlock all games
- Remove Pi AdNetwork
- Unlock all stages
- Special in-game rewards and early access
- Premium badge

### Subscription Flow:
1. User logs in via Pi Auth
2. Clicks **Subscribe**
3. Triggers Pi Payment:
   ```js
   Pi.createPayment({
     amount: 10,
     memo: "Droplink Premium Game Pass",
     metadata: { type: "subscription" }
   });