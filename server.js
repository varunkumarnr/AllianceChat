const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const connectDB = require("./config/db");
userRoute = require("./routes/user");

//connectDB
connectDB();
// init middleware
app.use(cors());

app.use(express.json({ extended: false }));
app.get("/", (req, res) => {
  res.send("index.html");
});
//routes
app.use("/api/users", userRoute);
const server = app.listen(port, () => {
  console.log(`the app is running at ${port}`);
});
const sock = require("./socket");

const io = sock.init(server);

io.on("connection", (socket) => {
  if (socket.connected) console.log("socket.io is connected.");
  socket.on("disconnect", function () {
    console.log("a user disconnected");
  });
});
