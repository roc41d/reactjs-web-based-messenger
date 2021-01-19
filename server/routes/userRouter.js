const express = require("express");
const passport = require("passport");
const userRouter = express.Router();
const utils = require("../utils/utils");

require("../passport/passport");

userRouter.get(
  "/profile",
  passport.authenticate(process.env.JWT_SCHEME, { session: false }),
  (req, res) => {
    const token = utils.retrieveToken(req.headers);
    if (utils.verifyToken(token)) {
      res.status(200).send(req.user);
    } else {
      res.status(401).send({
        success: false,
        message: "Incorrect token",
      });
    }
  }
);

module.exports = userRouter;
