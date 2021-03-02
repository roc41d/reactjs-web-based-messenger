const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema(
  {
    chatRoomId: { type: String, required: true },
    message: { type: String, required: true },
    postedByUser: { type: String, required: true },
    readByRecipient: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: "chatmessage",
  }
);

export default mongoose.model("ChatMessage", chatMessageSchema);
