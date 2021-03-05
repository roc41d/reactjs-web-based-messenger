const express = require("express");
const chatRouter = express.Router();
const chatController = require("../controller/chatController");
const utils = require("../utils/utils");

chatRouter.post("/initiate", chatController.initiateChatValidation, (req, res, next) => {
    chatController.initiate(req, res, next)
});

chatRouter.post("/:roomId/message", chatController.postMessageValidation, (req, res, next) => {
    chatController.postMessage(req, res, next)
});

chatRouter.get("/user-chatrooms", (req, res, next) => {
    chatController.getUserChatRooms(req, res, next)
})

chatRouter.get("/:roomId", (req, res, next) => {
    chatController.getChatMessageByRoomId(req, res, next)
});

module.exports = chatRouter;