# MERN Stack Blog App

A full-stack blog application built with **MongoDB, Express, React, and Node.js**. Users can sign up, publish and manage their own posts organized by category, and manage or delete their account.

**🔗 Live demo:** [https://blog-inky-five-66.vercel.app/](https://blog-inky-five-66.vercel.app/)
**API:** [https://backend-git-main-realrayza.vercel.app/](https://backend-git-main-realrayza.vercel.app/)

**Demo account:** `test@test.dev` / `Testing1234_`

![Home page](./docs/home.png)
<!-- Add one or two screenshots in docs/ and update the paths -->

## Features

**Authentication**
- Sign up and log in with JWT
- Passwords hashed with bcrypt
- Protected routes for authenticated actions

**Blog management**
- Create, edit, delete, and view posts
- Organize posts by category
- Image uploads via Cloudinary

**Account management**
- Edit account information
- Delete account: a **MongoDB transaction** removes the user and all of their posts together, so you never end up with orphaned posts or a half-deleted account

## Tech Stack

**Frontend:** React, React Router, Axios, Material UI, React Hook Form

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, Cloudinary

## Project Structure

```
MERN-stack-blog-app/
├── blog/       # React frontend
└── backend/    # Express API
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/realrayza/MERN-stack-blog-app.git
cd MERN-stack-blog-app
```

### 2. Install dependencies

```bash
cd backend
npm install

cd ../blog
npm install
```

### 3. Configure environment variables

Create a `.env` file in `backend/`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
# Cloudinary (check the variable names your code reads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Never commit your `.env` file.

> MongoDB transactions require a replica set. MongoDB Atlas works out of the box; a plain local `mongod` does not unless you enable a replica set.

### 4. Run the app

In one terminal:

```bash
cd backend
npm run dev
```

In another:

```bash
cd blog
npm run dev
```

Open the local URL printed by the frontend dev server.

## Main Functionality

| Feature | Description |
| ------- | ----------- |
| Sign up | Create a new account |
| Log in | Authenticate with JWT |
| Create / edit / delete post | Manage your own posts |
| Edit account | Update your account information |
| Delete account | Remove the account and all its posts in one transaction |

## Security

- JWT-based authentication with protected routes
- bcrypt password hashing
- Secrets kept in environment variables
- Transactional account deletion

## Roadmap

- Comments, likes, and reactions
- Rich text editor
- Search and improved pagination
- Public user profiles
- Email verification and password reset

## License

Available for educational and development purposes.
