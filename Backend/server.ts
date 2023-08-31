import express from "express";
import { Server } from "socket.io";

const app = express();
const server = app.listen(3000, () => {
  console.log("Server started on port 3000");
});

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("score", (score) => {
    console.log("Received score:", score);

    // Broadcast the score to all connected clients
    io.emit("score", score);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
