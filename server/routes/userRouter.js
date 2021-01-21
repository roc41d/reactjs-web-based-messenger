const express = require("express");
const userRouter = express.Router();
const auth = require("../middleware/auth");
const userController = require("../controller/userController");
const utils = require("../utils/utils");

userRouter.get("/profile", auth, (req, res) => {
  userController.userProfile(req, res);
});

module.exports = userRouter;
