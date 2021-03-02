const express = require("express");
const chatRouter = express.Router();
const chatController = require("../controller/chatController");

chatRouter.post("/initiate", chatController.initiateChatValidation, (req, res, next) => {
    chatController.initiate(req, res, next)
});

chatRouter.post("/:roomId/message", chatController.postMessageValidation, (req, res, next) => {
    chatController.postMessage(req, res, next)
});

module.exports = chatRouter;