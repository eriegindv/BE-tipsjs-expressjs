const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const socketRoute = require("./socket.route");
const SocketServices = require("./socket.services");

require("dotenv").config();
const app = express();
const httpServer = createServer(app);

const PORT = process.env.PORT || 4000;
const io = new Server(httpServer);
global._io = io;

app.use((req, res, next) => {
  res.io = io;
  next();
});

app.use("/socket", socketRoute);

// middleware
global._io.use((socket, next) => {
  console.log(`socketid::: ${socket.id}`);

  // check jwt
  /**
   * client
   * var socket = io({extaHeaders: {token: "Bearer abc123"}})
   */
  const { token } = socket.handshake.headers;
  // jsonwebtoken
  if (token && token === "Bearer abc123") return next();
  next(new Error("Please login"));
});
global._io.on("connection", SocketServices.connection);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
