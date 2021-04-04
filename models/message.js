const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    conversation: {
      type: Schema.Types.ObjectId,
      ref: "conversations",
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    from: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    messageType: {
      type: String,
      enum: ["text", "file", "image", "audio"],
      default: "text",
    },
    fileLink: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = Message = mongoose.model("message", MessageSchema);
