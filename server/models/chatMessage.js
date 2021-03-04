const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const chatMessageSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => uuidv4() },
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

chatMessageSchema.statics.createPostInChatRoom = async function (chatRoomId, message, postedByUser) {
  try {
    const post = await this.create({
      chatRoomId,
      message,
      postedByUser
    });

    return post;
  } catch (error) {
    throw error;
  }
}

chatMessageSchema.statics.getConversationByRoomId = async function (chatRoomId) {
  try {
    return this.aggregate([
      { $match: { chatRoomId } },
      { $sort: { createdAt: 1 } },
      {
        $lookup: {
          from: 'users',
          localField: 'postedByUser',
          foreignField: '_id',
          as: 'postedByUser',
        }
      },
      { $unwind: "$postedByUser" }
    ]);
  } catch (error) {
    throw error;
  }
}

module.exports = mongoose.model("ChatMessage", chatMessageSchema);
