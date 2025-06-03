# Real-Time Chat Integration Guide for Droplink

---

## 1. Overview

This guide covers implementing a **real-time chat system** enabling users to:

* Send and receive messages instantly
* Have multiple chat rooms or private conversations
* See online/offline status
* Get message delivery/read indicators

---

## 2. Technology Choices

Common real-time communication technologies:

* **WebSockets** — Persistent, low-latency full-duplex connection
* **Socket.IO** (Node.js) — WebSocket abstraction with fallbacks and extra features
* **Firebase Realtime Database or Firestore** — Real-time syncing with offline support
* **Supabase Realtime** — Built-in Postgres-based real-time subscriptions
* **Third-party APIs** — Pusher, Ably, etc.

---

## 3. Architecture Overview

* Client connects to chat server via WebSocket or uses Supabase realtime subscriptions
* Server handles message events: send, receive, typing indicators, status updates
* Messages stored persistently in database (e.g., PostgreSQL)
* Server broadcasts new messages to relevant connected clients

---

## 4. Database Schema Example

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  username TEXT NOT NULL,
  ...
);

CREATE TABLE chat_rooms (
  id UUID PRIMARY KEY,
  name TEXT,
  is_private BOOLEAN DEFAULT FALSE,
  ...
);

CREATE TABLE messages (
  id UUID PRIMARY KEY,
  room_id UUID REFERENCES chat_rooms(id),
  sender_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_read BOOLEAN DEFAULT FALSE
);
```

---

## 5. Backend Setup (Node.js + Socket.IO example)

```javascript
const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('User connected', socket.id);

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
  });

  socket.on('sendMessage', ({ roomId, message, senderId }) => {
    // Save message to DB here...

    // Broadcast to all in room
    io.to(roomId).emit('receiveMessage', { message, senderId, timestamp: new Date() });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
});

server.listen(3000, () => console.log('Server running on port 3000'));
```

---

## 6. Frontend Setup (React example)

```jsx
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('https://yourserver.com');

export default function ChatRoom({ roomId, userId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.emit('joinRoom', roomId);

    socket.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [roomId]);

  const sendMessage = () => {
    if (input.trim() === '') return;
    socket.emit('sendMessage', { roomId, message: input, senderId: userId });
    setInput('');
  };

  return (
    <div>
      <div className="messages">
        {messages.map((m, i) => (
          <p key={i}><strong>{m.senderId}:</strong> {m.message}</p>
        ))}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
```

---

## 7. Features to Consider Adding

* **Typing indicators:** Broadcast when user is typing
* **Read receipts:** Mark messages as read/unread
* **Message reactions:** Emojis or likes on messages
* **File/image sharing:** Attach media to chat
* **User presence:** Show online/offline status
* **Private messaging and group chats**

---

## 8. Scaling and Security

* Authenticate users before allowing socket connections
* Use namespaces or rooms for chat separation
* Rate-limit message sending to prevent spam
* Store messages encrypted if privacy is critical
* Consider horizontal scaling with Redis pub/sub or other message brokers

---

## 9. Alternative Approach: Supabase Realtime

* Use Supabase’s realtime Postgres subscriptions to listen to new messages
* Automatically sync frontend state when new rows are inserted
* Simpler backend with database-driven events

---

