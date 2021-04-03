const express = require("express");

const app = express();
var http = require("http").Server(app);
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const connectDB = require("./config/db");
//connectDB
connectDB();
// init middleware
app.use(cors());

app.use(express.json({ extended: false }));
app.get("/", (req, res) => {
  res.sendfile("index.html");
});

const server = app.listen(port, () => {
  console.log(`the app is running at ${port}`);
});
const sock = require("./socket");

const io = sock.init(server);

//routes
io.on("connection", (socket) => {
  console.log(" a user connected");

  socket.on("disconnect", function () {
    console.log("a user disconnected");
  });
});
