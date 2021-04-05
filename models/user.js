const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  socketId: {
    type: String,
    default: "",
  },
  online: {
    type: Boolean,
    default: false,
  },
  notifications: [{ type: moongoose.Types.ObjectId, ref: "notification" }],
  unReadNotifications: {
    type: Number,
    default: 0,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
