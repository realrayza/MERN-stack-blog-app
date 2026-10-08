# MERN Chat App

A real-time private messaging app built with the **MERN stack** and **Socket.IO**. Users create accounts, add contacts by unique user ID, and exchange private messages that arrive instantly, with conversation history, unread counts, and browser notifications.

**🔗 Live demo:** https://chat-app-realrayza.vercel.app

**Demo accounts** (open two browser windows to see real-time delivery):

| User | Email / Username | Password |
| ---- | ---------------- | -------- |
| Demo A | `REPLACE_ME` | `REPLACE_ME` |
| Demo B | `REPLACE_ME` | `REPLACE_ME` |

![Chat screen](./docs/chat-screenshot.png)
<!-- Add a screenshot or GIF at docs/chat-screenshot.png (or change the path) -->

## Features

- JWT authentication with bcrypt password hashing
- Unique user ID per account
- Private one-to-one messaging
- Real-time delivery to sender and receiver via Socket.IO
- Persistent message storage in MongoDB
- Contact-based conversations and full conversation history
- Read/unread status with unread counts
- Browser notifications for incoming messages
- Responsive interface
- Protected API routes and server-side message ownership checks

## Tech Stack

**Frontend:** React, React Router, Context API with `useReducer`, Socket.IO Client, Fetch API, CSS

**Backend:** Node.js, Express.js, MongoDB, Mongoose, Socket.IO, JSON Web Tokens, bcrypt, CORS

## Project Structure

```
Chat-App/
├── chat-app/        # React frontend
│   ├── src/
│   └── package.json
├── backend/         # Express + Socket.IO API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/realrayza/Chat-App.git
cd Chat-App
```

### 2. Install dependencies

```bash
cd backend
npm install

cd ../chat-app
npm install
```

### 3. Configure environment variables

Create a `.env` file inside `backend/`:

```env
dbURL=mongodb://localhost:27017/chatapp
SECRET=your_jwt_secret
frontEnd=http://localhost:5173
```

`.env` is ignored by Git. Never commit it.

### 4. Run the app

In one terminal:

```bash
cd backend
npm run dev
```

In another:

```bash
cd chat-app
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:4000

### Testing on a phone (same Wi-Fi)

Use your computer's local IP instead of `localhost`, for example `http://192.168.1.10:5173`, and set the same address in the backend:

```env
frontEnd=http://192.168.1.10:5173
```

You may need to allow the dev ports through your firewall.

## How Real-Time Messaging Works

HTTP handles authentication, history, and saving messages. Socket.IO handles live delivery.

```
Sender → HTTP request → Express API
                          ├── save message to MongoDB
                          └── emit Socket.IO event → receiver's room → new message appears
```

Each user joins a private Socket.IO room named after their unique user ID, so the server can deliver a message only to its intended recipient.

### Message model

```js
{
  senderId: String,
  receiverId: String,
  text: String,
  isUnknownContact: Boolean,
  readAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

Messages store user IDs rather than display names, so they never go stale if a user changes their name.

### Contacts and read status

The backend verifies the relationship between sender and receiver before treating a message as a known-contact conversation; otherwise it is flagged as coming from an unknown contact. Opening a conversation marks its messages as read, which drives the unread counts.

## Security

- JWT authentication and bcrypt password hashing
- Protected API endpoints
- CORS restricted to the configured frontend origin
- Contact validation and server-side message ownership checks
- Secrets loaded from environment variables

## Deployment Notes

- Set `dbURL`, `SECRET`, and `frontEnd` as environment variables on your host.
- CORS must allow the production frontend origin, and the Socket.IO client must point at the production backend.
- Serve everything over HTTPS (required for browser notifications).
- Socket.IO needs a host that supports long-lived connections (e.g. Render, Railway, Fly.io). Serverless platforms generally do not.

## Roadmap

- [ ] Typing indicators
- [ ] Online/offline presence and last seen
- [ ] Message delivery status
- [ ] Edit and delete messages
- [ ] Image and file sharing
- [ ] Group conversations
- [ ] Message search and pagination
- [ ] Push notifications

## License

Available for learning and development purposes.
