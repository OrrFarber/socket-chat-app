const express = require("express");
// const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const io = require("socket.io")(2000, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`roomate with ${socket.id} joined ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

// ------------------- 1 -------------
