const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const port = process.env.PORT || 4000;

const users = [];

io.on('connection', (socket) => {
  console.log("Novo usuário conectado!");

  socket.on("join", (name) => {
    const user = { id: socket.id, name };
    users.push(user);

    io.emit("message", { name: null, message: `${name} entrou no chat` });
    io.emit("users", users);
  });

  socket.on("message", (message) => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    const userIndex = users.findIndex((u) => u.id === socket.id);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      io.emit("users", users); // Apenas atualiza a lista de usuários
    }
  });
});

server.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
