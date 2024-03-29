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

        const isUserInChat = await ChatRoomModel.isUserInChatRoom(roomId, currentUser);

        if (!isUserInChat) {
          return res.status(400).json({ message: "User not in chat" });
        }

        const post = await ChatMessageModel.createPostInChatRoom(roomId, message, currentUser);
        return res.status(200).json({ success: true, post });
    } catch (error) {
        return res.status(500).json({ success: false, error: error })
    }
},

getChatMessageByRoomId = async (req, res) => {
    try {
      const roomId = req.params.roomId;
      const currentUser = req.user.id;
      const room = await ChatRoomModel.getChatRoomByRoomId(roomId)
      if (!room) {
        return res.status(400).json({
          success: false,
          message: 'No room exists for this id',
        })
      }

      const isUserInChat = await ChatRoomModel.isUserInChatRoom(roomId, currentUser);

      if (!isUserInChat) {
        return res.status(400).json({ message: "User not in chat" });
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

getUserRecentChats = async (req, res) => {
    try {
      const currentUser = req.user.id;

      const rooms = await ChatRoomModel.getChatRoomsByUserId(currentUser);
      const roomIds = rooms.map(room => room._id);

      const options = {
        page: req.query.page ? parseInt(req.query.page) : 0,
        limit: req.query.limit ? parseInt(req.query.limit) : 10,
      };

      const userChatRooms = await ChatMessageModel.getUserRecentChats(roomIds, options);
      return res.status(200).json({ success: true, chats: userChatRooms });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
},

markMessageAsRead = async (req, res) => {
  try {
    const currentUser = req.user.id;
    const roomId = req.params.roomId;

    const isUserInChat = await ChatRoomModel.isUserInChatRoom(roomId, currentUser);

    if (!isUserInChat) {
      return res.status(400).json({ message: "User not in chat" });
    }

    await ChatMessageModel.markMessageAsRead(roomId);
    return res.status(200).json({ success: true });
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
    getUserRecentChats,
    markMessageAsRead,
    initiateChatValidation,
    postMessageValidation
};

module.exports = chatController;
