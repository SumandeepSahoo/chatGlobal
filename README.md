# 💬 Real-Time Chat App

A responsive, real-time chat application built using **Node.js**, **Express.js**, and **Socket.IO**. This project allows multiple users to send messages instantly, see who's online, and get typing feedback in a smooth UI experience. Great for learning about WebSockets and building real-time features!

---

## 🚀 Features

- 🔄 Real-time messaging using WebSockets (Socket.IO)
- 🧠 Typing feedback indicator
- 👥 Live count of connected users
- ⏰ Message timestamps (like “a few seconds ago”)
- 💡 Auto-scrolls to latest message
- 🕵️‍♂️ Anonymous or named chatting
- 🎨 Clean, minimal, responsive UI

---

## 🛠️ Tech Stack

| Layer       | Technology           |
|------------|----------------------|
| Backend     | Node.js, Express.js  |
| WebSockets  | Socket.IO            |
| Frontend    | HTML, CSS, JavaScript |
| Time Display| Day.js               |

---

## 📁 Project Structure

├── public/
│   ├── index.html
│   ├── style.css
│   ├── main.js
│   └── public_message-tone.mp3
├── app.js
├── package.json

---

## 🚀 How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/chatGlobal.git
cd chatGlobal-app
```

---

## 2. Install Dependencies
npm install

---

## 3. Start the Server
node app.js

---

🧠 How It Works

When a client connects, their socket ID is stored and the total number of clients is broadcast.
Messages are emitted using socket.emit() and received using socket.on() across all clients.
Typing feedback is shown when users are actively writing a message.
Messages are displayed on the UI with timestamps using Day.js.

---

🔖 Topics

chat

real-time

socket.io

nodejs

express

websockets

realtime-chat

fullstack

javascript

---
