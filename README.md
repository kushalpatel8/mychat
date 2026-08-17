# Chat App

A real-time, Discord-inspired chat application designed with a sleek "Dark Slate & Neon" aesthetic. Built for speed and seamless communication using modern web technologies.

## 🚀 Features

- **Real-Time Messaging**: Instant message delivery using WebSockets.
- **1-on-1 Chats**: Private conversations that dynamically resolve peer names.
- **Gaming Aesthetic**: A modern Dark Slate & Cyber Violet UI inspired by Discord.
- **Authentication**: Secure user registration and login with JWT.
- **Responsive Design**: Fluid and responsive layout across devices.

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18 (via Vite)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: Context API

### Backend
- **Language**: Go
- **Framework**: Gin Web Framework
- **Database**: MongoDB
- **Real-time**: Gorilla WebSockets
- **Authentication**: JWT & bcrypt

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Go](https://golang.org/) (1.20 or higher)
- A MongoDB cluster or local instance (Atlas recommended)

## 🔧 Setup & Installation

### 1. Database Configuration
In the `backend/` directory, create a `.env` file with the following variables:
```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
FRONTEND_URL=http://localhost:5173
```

### 2. Start the Backend
Navigate to the backend directory and run the Go server:
```bash
cd backend
go mod tidy
go run ./cmd/server/main.go
```
The server will start on `http://localhost:8080`.

### 3. Start the Frontend
In a new terminal, navigate to the frontend directory, install dependencies, and start the Vite development server:
```bash
cd frontend
npm install
npm run dev
```
The frontend will be accessible at `http://localhost:5173`.

## 🤝 Usage
1. Open the frontend URL in your browser.
2. Register a new account (or login).
3. To test the chat functionality, open a second browser window (or incognito tab) and create another account.
4. Click the "New Chat" icon to search contacts and start sending messages!
