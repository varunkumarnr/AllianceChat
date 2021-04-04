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
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  online: {
    type: Boolean,
    default: true,
  },
  notifications: [{ type: moongoose.Types.ObjectId, ref: "notification" }],
  unReadNotifications: {
    type: Number,
    default: 0,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
