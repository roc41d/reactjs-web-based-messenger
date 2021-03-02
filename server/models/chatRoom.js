const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema(
  {
    chatInitiator: { type: String, required: true },
    userIds: { type: Array, required: true },
  },
  {
    timestamps: true,
    collection: "ChatRoom",
  }
);

chatRoomSchema.statics.getChatRoomsByUserId = async function (userId) {
  try {
    const rooms = await this.find({ userIds: { $all: [userId] } });
    return rooms;
  } catch (error) {
    throw error;
  }
};

chatRoomSchema.statics.getChatRoomByRoomId = async function (roomId) {
  try {
    const room = await this.findOne({ _id: roomId });
    return room;
  } catch (error) {
    throw error;
  }
};

chatRoomSchema.statics.initiateChat = async function (userIds, chatInitiator) {
  try {
    const availableRoom = await this.findOne({
      userIds: {
        $size: userIds.length,
        $all: [...userIds],
      },
      chatInitiator
    });
    if (availableRoom) {
      return {
        isNew: false,
        chatRoomId: availableRoom._doc._id,
      };
    }

    const newRoom = await this.create({ userIds, chatInitiator });
    return {
      isNew: true,
      chatRoomId: newRoom._doc._id,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("ChatRoom", chatRoomSchema);
