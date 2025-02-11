const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app =express ();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 4000;

io.on('connection', (socket) =>{
  console.log(socket.id)
})

server.listen(port, () => console.log(`servidor rodando na porta ${port}`))