const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator/check");
const User = require("../models/user");
const utils = require("../utils/utils");
const saltRounds = 10;
const JWT_TOKEN_EXPIRATION = 60 * 60 * 24; // 1day

const register = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    newUser
      .save()
      .then((user) => {

        const payload = {
          id: user._id,
          username: user.username,
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: JWT_TOKEN_EXPIRATION,
        });

        res
          .status(201)
          .cookie('token', token, { httpOnly: true, maxAge: JWT_TOKEN_EXPIRATION })
          .send({
            success: true,
          });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  });
};

const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {

    const user = await User.findOne({ username: username });
    if (!user) {
      res
        .status(400)
        .send({
          success: false,
          message: "User with username " + username + " not found",
        });
    } else {
      user.comparePassword(password, (error, isMatch) => {
        if (isMatch && !error) {

          const payload = {
            id: user._id,
            username: username,
          };

          const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: JWT_TOKEN_EXPIRATION,
          });

          res
            .status(201)
            .cookie('token', token, { httpOnly: true, maxAge: JWT_TOKEN_EXPIRATION })
            .send({
              success: true,
              data: utils.formatUserJson(user),
            });
        } else {
          res
            .status(400)
            .send({
              success: false,
              message: "Incorrect password",
            });
        }
      });
    }

  } catch (err) {
    res.status(500).send('Server Error');
  }
}

const signUpValidation = [
  check("username")
    .notEmpty()
    .trim()
    .escape()
    .custom((value, { req }) => {
      return User.findOne({ username: value }).then((user) => {
        if (user) {
          return Promise.reject("Username already in use");
        }
      });
    }),
  check("email")
    .notEmpty()
    .isEmail()
    .withMessage("Email is not valid")
    .trim()
    .escape()
    .custom((value, {req}) => {
      return User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject("Email already in use");
        }
      });
    }),
  check("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be 6+ characters long"),
];

const authController = {
  register,
  login,
  signUpValidation,
};

module.exports = authController;
