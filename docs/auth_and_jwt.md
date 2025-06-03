# Authentication and JWT Integration Guide for Droplink

---

## 1. Overview

This document outlines the approach to securely authenticate users in Droplink and manage sessions using JWTs (JSON Web Tokens). It covers:

* User signup/login flow
* JWT token issuance and verification
* Token storage and expiration
* Securing API endpoints with JWT

---

## 2. User Authentication Flow

### 2.1 Signup

* User provides email, username, and password
* Passwords are hashed securely (e.g., using bcrypt) before storage
* User record saved in database
* Optionally, send verification email

### 2.2 Login

* User submits email/username and password
* Server verifies credentials by comparing hashed passwords
* On success, server generates a JWT token with user info and expiration
* JWT token returned to client

---

## 3. JWT Structure

* JWT contains three parts: Header, Payload, Signature
* Payload includes:

  * `userId` (unique user identifier)
  * `email`
  * `roles` (e.g., admin, user)
  * `iat` (issued at timestamp)
  * `exp` (expiration timestamp)

---

## 4. Token Issuance and Storage

* Use a strong secret key or RSA key pair to sign tokens
* Recommended token expiry: 1 hour to 24 hours, depending on security needs
* Client stores token in secure storage:

  * For web apps: HttpOnly secure cookies (best for security) or localStorage/sessionStorage (less secure)
* On each API request, client sends JWT in Authorization header:

  ```
  Authorization: Bearer <token>
  ```

---

## 5. Token Verification

* Backend verifies JWT signature and expiration on every protected API request
* If token is invalid or expired, return 401 Unauthorized
* Optionally, implement token refresh mechanism using refresh tokens

---

## 6. Protecting Routes

* Middleware verifies JWT before accessing protected routes
* Example in Express.js:

```javascript
const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
}
```

---

## 7. Refresh Tokens (Optional)

* Issue a long-lived refresh token along with access JWT
* Refresh tokens stored securely (HttpOnly cookie)
* Client can request a new access token when old one expires
* Server verifies refresh token validity and issues new access token

---

## 8. Security Best Practices

* Use HTTPS exclusively to protect tokens in transit
* Store JWT secrets securely (environment variables, secrets manager)
* Use short expiration times for access tokens
* Revoke tokens on logout or password change by blacklisting or token versioning
* Avoid storing sensitive info in JWT payload

---

## 9. Example Signup and Login Flow (Node.js / Express)

```javascript
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  // Save user with hashed password to DB
  // ...
  res.status(201).send('User created');
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) return res.status(400).send('User not found');
  
  const match = await bcrypt.compare(password, user.hashedPassword);
  if (!match) return res.status(401).send('Invalid credentials');
  
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.json({ token });
});
```

