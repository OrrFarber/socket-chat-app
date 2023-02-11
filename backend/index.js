const express = require("express");
const app = express();
// const http = require("http");
const cors = require("cors");
// const { Server } = require("socket.io");

app.use(cors());

// const server = http.createServer(app);

const io = require("socket.io")(3001, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("add_username", (username) => {
    socket.join(username);
    console.log(`Username: ${username} User ID: ${socket.id} `);
  });

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`Joined room: ${room}`);
  });

  socket.on("send_mesaage", (message) => {
    socket.to(room).emit("recieve_message", message);
    console.log(message);
  });

  // socket.on("disconnect", () => {
  //   console.log(`User Disconnected: ${socket.id}`);
  // });
});
