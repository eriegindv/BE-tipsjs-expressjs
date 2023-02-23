class SocketServices {
  // connection socket
  connection(socket) {
    socket.on("connection", () => {
      console.log(`User connection id is ${socket.id}`);
    });

    // event on here
    socket.on("chat message", (msg) => {
      console.log(`message is :::: ${msg}`);
      _io.emit("chat message", msg);
    });
  }
}

module.exports = new SocketServices();
