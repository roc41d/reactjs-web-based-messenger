const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/userController");
const utils = require("../utils/utils");

userRouter.get("/profile", (req, res) => {
  userController.userProfile(req, res);
});

userRouter.get("/search", (req, res) => {
  userController.searchUsers(req, res);
});

module.exports = userRouter;
