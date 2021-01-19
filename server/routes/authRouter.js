const express = require("express");
const authRouter = express.Router();
const authContoller = require("../controller/authContoller");

authRouter.post("/signup", authContoller.signUpValidation, (req, res, next) => {
    authContoller.register(req, res, next);
});

authRouter.post("/login", (req, res, next) => {
    authContoller.login(req, res, next)
});

module.exports = authRouter;
