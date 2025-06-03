# Droplink

Droplink is a Pi Network-powered Link-in-Bio platform — like Linktree — enabling users to create personalized profiles with multiple social links, analytics, and integrated Pi crypto payments and tips.

---

## Features

- User registration and login with JWT authentication  
- Create and manage multiple profile links  
- Customizable profile themes and layouts  
- Real-time analytics on link clicks and visitor data  
- Pi Network payment integration for subscriptions and tipping  
- QR code generation for profile links  
- Link scheduling and visibility control  
- Real-time chat and social interactions (planned)  
- Responsive mobile-first design  

---

## Tech Stack

- Frontend: React, Next.js (or your frontend framework)  
- Backend: Node.js, Express.js  
- Database: PostgreSQL (via Supabase)  
- Real-time: WebSockets / Socket.IO or Supabase Realtime  
- Authentication: JWT tokens  
- Payments: Pi Network SDK integration  
- Hosting: Vercel / Netlify  

---

## Getting Started

### Prerequisites

- Node.js (v16+) and npm/yarn  
- PostgreSQL database (or Supabase account)  
- Pi Network developer account for payment integration  

### Installation

1. Clone the repo:  
   ```bash
   git clone https://github.com/yourusername/droplink.git
   cd droplink
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory with the following keys:

   ```
   DATABASE_URL=your_database_connection_string
   JWT_SECRET=your_jwt_secret_key
   PI_APP_ID=your_pi_app_id
   PI_APP_SECRET=your_pi_app_secret
   NEXT_PUBLIC_BASE_URL=https://droplink.space
   ```

4. Run database migrations (if applicable):

   ```bash
   npx prisma migrate deploy
   ```

5. Start development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Usage

* Register a new account or sign in
* Create and customize your profile with social links
* Share your unique Droplink URL (`https://droplink.space/username`)
* Upgrade your plan via Pi payments to unlock premium features
* Track your link clicks and visitor analytics in your dashboard

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests for new features, bug fixes, or improvements.

---

## License

MIT License © 2025 Your Name

---

## Contact

* Website: [https://droplink.space](https://droplink.space)
* Email: [support@droplink.space](mailto:support@droplink.space)
* GitHub: [https://github.com/yourusername/droplink](https://github.com/yourusername/droplink)

---

## Acknowledgements

* Pi Network SDK and community
* Supabase for backend and realtime database
* Open source libraries and tools used in this project

```


```
