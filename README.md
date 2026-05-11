# MERN Blog Application

A simple blog application built with the MERN stack (MongoDB, Express, React, Node.js) using Vite for frontend build tooling and Tailwind CSS for styling.

## Features

- Create, read, update, and delete blog posts
- Beautiful UI with Tailwind CSS
- Fast development experience with Vite
- MongoDB for persistent data storage
- RESTful API with Express
- Responsive design

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (running locally on port 27017)

## Project Structure

```
blog-app/
├── backend/
│   ├── models/
│   │   └── Post.js
│   ├── routes/
│   │   └── posts.js
│   ├── package.json
│   ├── server.js
│   ├── .env
│   └── .gitignore
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── PostForm.jsx
    │   │   ├── PostList.jsx
    │   │   ├── PostCard.jsx
    │   │   └── EditPostForm.jsx
    │   ├── App.jsx
    │   ├── App.css
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── .gitignore
```

## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure MongoDB is running locally on port 27017

4. Start the backend server:
   ```bash
   npm run dev
   ```


### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```


## Environment Variables

### Backend (.env)

```
MONGODB_URI=mongodb://localhost:27017/blog-app
PORT=5000
```



## Technologies Used

- **Frontend**:
  - React 18
  - Vite 4
  - Tailwind CSS 3
  - PostCSS
  - Autoprefixer

- **Backend**:
  - Node.js
  - Express 4
  - MongoDB
  - Mongoose
  - CORS

