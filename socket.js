let io;
let socket;
module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer);
    console.log("connected");
    return io;
  },
  getIO: () => {
    if (!io) {
      console.log("connnection not established");
    }
    return io;
  },
};
