const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  recepient: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  lastmessage: {
    type: string,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = Conversation = mongoose.model(
  "conversation",
  ConversationSchema
);
