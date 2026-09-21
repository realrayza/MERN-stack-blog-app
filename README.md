# MERN stack blog app


A full-stack blog application built with the **MERN stack (MongoDB, Express.js, React, Node.js)**.

Users can create accounts, publish and manage blog posts, and manage their account. Authentication is secured with **JWT** and passwords are hashed using **bcrypt**.

## Features

### User Authentication

* Create a user account
* Login and authentication using JWT
* Password hashing with bcrypt
* Protected user actions

### Blog Management

* Create blog posts
* Edit blog posts
* Delete blog posts
* View blog posts
* Organize blogs by category

### Account Management

* Edit account information
* Delete account

When a user deletes their account, the application uses a **MongoDB transaction** to delete the user's previously created blogs along with the user account. This helps ensure the related database operations are completed together.

## Tech Stack

### Frontend

* React
* React Router
* Axios
* Material UI
* React Hook Form

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Cloudinary

## Project Structure

```text
blog-app/
├── client/          # React frontend
└── server/          # Node.js/Express backend
```

## Authentication

The application uses **JSON Web Tokens (JWT)** for authentication.

Passwords are never stored as plain text. They are hashed using **bcrypt** before being stored in MongoDB.

Authenticated routes require a valid JWT before protected operations can be performed.

## Database

The application uses **MongoDB** as its database and **Mongoose** for data modeling and database operations.

User accounts and blog posts are stored in MongoDB.

When an account is deleted, a MongoDB transaction is used to remove the user's associated blogs and account as part of the same database operation.

## Installation

Clone the repository:

```bash
git clone https://github.com/realrayza/MERN-stack-blog-app/
```

Navigate into the project:

```bash
cd blog-app
```

Install the frontend dependencies:

```bash
cd client
npm install
```

Install the backend dependencies:

```bash
cd ../server
npm install
```

## Environment Variables

Create a `.env` file in the backend directory and add the required environment variables.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not commit your `.env` file or other sensitive credentials to Git.

## Running the Application

Start the backend:

```bash
npm run dev
```

Then start the React frontend from the client directory:

```bash
npm run dev
```

The application will then be available through the local development server.

## Main Functionality

| Feature        | Description                         |
| -------------- | ----------------------------------- |
| Sign Up        | Create a new account                |
| Login          | Authenticate using JWT              |
| Create Blog    | Publish a new blog post             |
| Edit Blog      | Modify an existing blog             |
| Delete Blog    | Remove a blog post                  |
| Edit Account   | Update account information          |
| Delete Account | Delete account and associated blogs |

## Security

The application includes:

* JWT-based authentication
* bcrypt password hashing
* Protected authenticated operations
* Environment variables for sensitive configuration
* MongoDB transactions for account deletion and related blog cleanup

## Future Improvements

Potential improvements include:

* Blog comments
* Likes and reactions
* Rich text editing
* Image optimization
* Search functionality
* User profiles
* Pagination improvements
* Email verification
* Password reset functionality

## License

This project is available for educational and development purposes.


