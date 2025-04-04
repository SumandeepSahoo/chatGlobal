const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

let socketConnected = new Set();

io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    socketConnected.add(socket.id);

    // Emit total connected clients
    io.emit('clients-total', socketConnected.size);

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
        socketConnected.delete(socket.id);

        // Emit updated total clients
        io.emit('clients-total', socketConnected.size);
    });

    socket.on('message', (data) => {
        console.log(`Message received:`, data);
        socket.broadcast.emit('chat-message', data);
    });

    socket.on('feedback', (data) => {
        console.log(`Feedback received: ${data.feedback}`);
        socket.broadcast.emit('feedback', data);
    });
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
