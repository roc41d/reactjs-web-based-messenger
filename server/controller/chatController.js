const ChatRoomModel = require("../models/chatRoom");
const ChatMessageModel = require("../models/chatMessage");
const { check, validationResult } = require("express-validator");

const initiate = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userIds = req.body.userIds;
        const chatInitiator = req.body.chatInitiator;
        const allUserIds = [...userIds, chatInitiator];
        const chatRoom = await ChatRoomModel.initiateChat(allUserIds, chatInitiator);
        return res.status(200).json({ success: true, chatRoom });
    } catch (error) {
        return res.status(500).json({ success: false, error: error });
    }
};

const postMessage = async (req, res) => {
    try {
        const roomId = req.params.roomId;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        console.log("postMessage", req.body, req.params);
        const message = req.body.message;
        const currentUser = req.userId;
        //   const post = await ChatMessageModel.createPostInChatRoom(roomId, messagePayload, currentUser);
        //   return res.status(200).json({ success: true, post });
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
    initiateChatValidation,
    postMessageValidation
};

module.exports = chatController;
