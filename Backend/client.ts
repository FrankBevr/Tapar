import io from "socket.io-client";

const socket = io("http://localhost:3000");

// Send the score to the server
function sendScore(score: number) {
  socket.emit("score", score);
}

// Receive the score from the server
socket.on("score", (score: number) => {
  console.log("Received score:", score);
});

sendScore(5);
