# 💬 MERN Chat App with Socket.IO

A real-time chat application built using the **MERN stack** (MongoDB, Express.js, React, Node.js) and **Socket.IO**. This app features **JWT-based authentication and authorization**, scalable backend architecture, and a modern responsive UI powered by **React**, **Tailwind CSS**, **DaisyUI**, and **Zustand** for state management.

---

## 🚀 Features

### 🔐 Authentication & Authorization

- Secure **JWT (JSON Web Token)** authentication.
- Passwords hashed using **bcrypt**.
- Role-based access control (if needed for admin/moderator functions).

### 🧠 Backend (Node.js, Express.js, MongoDB)

- **Socket.IO** integration for real-time chat functionality.
- **Custom middleware** for:
  - Authenticating users via JWT.
  - Error handling and logging.
  - API response formatting.
- **Custom asyncHandler** to eliminate repetitive try-catch blocks.
- **Centralized error and response handling** to maintain clean code.
- **Production-grade structure** for scalability and maintainability.
- MongoDB with Mongoose for database interactions.

### 🎨 Frontend (React.js)

- Modern UI using **Tailwind CSS** and **DaisyUI**.
- **Zustand** for lightweight and scalable state management.
- Responsive design, suitable for all screen sizes.
- Seamless integration with WebSocket for real-time chat.

---

## 📂 Project Structure

---

## 🛠️ Tech Stack

| Tech                       | Purpose                                |
| -------------------------- | -------------------------------------- |
| **MongoDB**                | Database                               |
| **Express**                | Web server framework                   |
| **React**                  | Frontend library                       |
| **Node.js**                | JavaScript runtime for server          |
| **Socket.IO**              | Real-time, bidirectional communication |
| **Tailwind CSS + DaisyUI** | Styling and UI components              |
| **Zustand**                | State management                       |
| **JWT**                    | Authentication tokens                  |
| **bcrypt**                 | Password hashing                       |

---

## 📦 Installation

### Prerequisites

- Node.js
- MongoDB
- npm / yarn

cd backend
npm install
npm run dev

cd ../frontend
npm install
npm run dev

---

Let me know if you'd like the README personalized with your name, GitHub link, deployment instructions, or contribution guidelines!

signing off ADITYA SABAT
