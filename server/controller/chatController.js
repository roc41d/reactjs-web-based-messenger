const ChatRoomModel = require("../models/chatRoom");
const ChatMessageModel = require("../models/chatMessage");
const { check, validationResult } = require("express-validator");

initiate = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userIds = req.body.userIds;
        const chatInitiator = req.user.id;
        const allUserIds = [...userIds, chatInitiator];
        const chatRoom = await ChatRoomModel.initiateChat(allUserIds, chatInitiator);
        return res.status(200).json({ success: true, chatRoom });
    } catch (error) {
        return res.status(500).json({ success: false, error: error });
    }
};

postMessage = async (req, res) => {
    try {
        const roomId = req.params.roomId;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const message = req.body.message;
        const currentUser = req.user.id;

        const post = await ChatMessageModel.createPostInChatRoom(roomId, message, currentUser);
        return res.status(200).json({ success: true, post });
    } catch (error) {
        return res.status(500).json({ success: false, error: error })
    }
},

getChatMessageByRoomId = async (req, res) => {
    try {
      const roomId = req.params.roomId;
      const room = await ChatRoomModel.getChatRoomByRoomId(roomId)
      if (!room) {
        return res.status(400).json({
          success: false,
          message: 'No room exists for this id',
        })
      }

      const conversation = await ChatMessageModel.getChatMessageByRoomId(roomId);
      return res.status(200).json({
        success: true,
        conversation
      });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
},

getUserChatRooms = async (req, res) => {
    try {
      const currentUser = req.user.id;

      const rooms = await ChatRoomModel.getChatRoomsByUserId(currentUser);
      const roomIds = rooms.map(room => room._id);

      const userChatRooms = await ChatMessageModel.getUserChatRooms(roomIds, currentUser);
      return res.status(200).json({ success: true, conversation: userChatRooms });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },

initiateChatValidation = [
    check("userIds")
        .exists()
        .isArray(),
    check("chatInitiator")
        .exists()
        .isString()
];

postMessageValidation = [
    check("message")
        .exists()
        .isString(),
    check("userId")
        .exists()
        .isString()
];

const chatController = {
    initiate,
    postMessage,
    getChatMessageByRoomId,
    getUserChatRooms,
    initiateChatValidation,
    postMessageValidation
};

module.exports = chatController;
