const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const connectDB = require("./config/db");
//connectDB
connectDB();
// init middleware
app.use(express.json({ extended: false }));
app.get("/", (req, res) => {
  res.send("hello");
});

const server = app.listen(port, () => {
  console.log(`the app is running at ${port}`);
});

const io = require("socket.io")(server);
