const express = require("express");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator/check");
const router = express.Router();

const User = require("../models/user");

const saltRounds = 10;

const validateParams = [
  check("username")
    .trim()
    .escape()
    .custom((value, { req }) => {
        return User.findOne({ userName: value }).then(user => {
            if (user) {
                return Promise.reject("Username already in use")
            }
        });
    }),
  check("email").isEmail().withMessage("Email is not valid").trim().escape(),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6+ characters long"),
  check("passwordConfirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),
];

router.post("/", validateParams, (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    const newUser = new User({
      userName: req.body.username,
      email: req.body.email,
      password: hash,
    });

    newUser
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  });
});

module.exports = router;
