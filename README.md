# 👗 Clothing Studio platform

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge&logo=mongodb)
![React](https://img.shields.io/badge/Frontend-React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

A full-stack, premium e-commerce clothing studio tailored for boutique fashion businesses. This application provides a modern, interactive, and seamless shopping experience with real-time updates and an administrative dashboard to manage products, collections, and configurations.

---

## ✨ Features

- **Modern & Responsive UI**: Built with React, TailwindCSS, and Framer Motion for beautiful interactions on desktop and mobile.
- **Real-Time Communication**: Integrated `Socket.IO` for live inventory parsing and instant dashboard notifications.
- **Admin Dashboard**: Comprehensive back-office application to handle products, orders, collections, and team members. 
- **Media Management**: Secure integration with Cloudinary & Multer for uploading and hosting product thumbnails.
- **Authentication**: JWT-based secure authentication pipeline with role-based access control.
- **State Management**: Highly optimized caching and state handling utilizing `Zustand` and `React Query`.
- **Form Validations**: Deep validation handled consistently via `React Hook Form` and `Express Validator`.

---

## 🛠️ Tech Stack

### Client (Frontend)
- **Framework**: React 18, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **State/Caching**: Zustand, @tanstack/react-query
- **Networking**: Axios, Socket.IO-Client
- **Routing**: React Router DOM (v6)

### Server (Backend)
- **Engine**: Node.js, Express (v5)
- **Database**: MongoDB (Mongoose)
- **Authentication**: JSON Web Tokens, Bcrypt.js
- **File Uploads**: Cloudinary, Multer
- **WebSockets**: Socket.IO
- **Mailing**: Nodemailer

---

## 📂 Project Structure

```text
clothing-studio/
├── client/                 # Frontend React Application
│   ├── public/             # Static Assets
│   ├── src/
│   │   ├── api/            # API endpoints & Axios instances
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── layouts/        # Page layouts (Admin vs Public)
│   │   ├── pages/          # Application views 
│   │   └── ...
│   ├── tailwind.config.js  # Tailwind config
│   └── vite.config.js      # Vite build configuration
│
├── server/                 # Backend Node/Express Application
│   ├── config/             # DB & 3rd party configurations
│   ├── controllers/        # Route logic and request handlers
│   ├── middleware/         # Auth, validation, error handlers
│   ├── models/             # Mongoose schemas
│   ├── routes/             # RESTful API endpoints
│   ├── utils/              # Helper functions
│   ├── app.js              # Express app initialization
│   └── index.js            # Server entry point
│
├── shared/                 # Shared types/constants
└── .gitignore              # Git ignore file
```

---

## 🚀 Local Development Setup

### 1. Prerequisites
Ensure you have the following installed on your machine:
- Node.js (v18+)
- MongoDB (Local or Atlas URI)
- Cloudinary Account (for image uploads)

### 2. Clone the repository
```bash
git clone https://github.com/amankumar26/clothing-studio.git
cd clothing-studio
```

### 3. Install Dependencies
You need to install dependencies for both the frontend and backend environments.

```bash
# Install Server Dependencies
cd server
npm install

# Install Client Dependencies
cd ../client
npm install
```

### 4. Environment Configuration
Create a `.env` file in both the `server` and `client` directories and provide the respective variables.

#### `server/.env`
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### `client/.env`
```env
VITE_SERVER_URL=http://localhost:5000
```

### 5. Running the Application
You can run both environments concurrently from their respective folders.

**Start the Server:**
```bash
cd server
npm run dev
```

**Start the Client:**
```bash
cd client
npm run dev
```

The frontend will be exposed locally (usually on `http://localhost:5173/`) and the API will listen on your specified `$PORT`.

---

## 📝 License
This project is proprietary and confidential. Only authorized collaborators have permission to modify or deploy to production.
