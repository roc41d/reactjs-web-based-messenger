const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator/check");
const User = require("../models/user");
const saltRounds = 10;

const register = (req, res, next) => {
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
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  });
};

const login = async (request, response) => {
    const username = request.body.username || '';
    const password = request.body.password || '';
    if (username && password) {
      User.findOne({userName: username}, (error, user) => {
        if (error) {
          response.status(401).send({
            success: false,
            message: error.message,
          });
        } else {
          if (!user) {
            response.status(401).send({
              success: false,
              message: "User not found",
            });
          } else {
            user.comparePassword(password, (error, isMatch) => {
              if (isMatch && !error) {

                const token = jwt.sign(
                    user.toJSON(),
                    process.env.SECRET_KEY, {
                      expiresIn: process.env.JWT_TOKEN_EXPIRATION,
                    });
  
                response
                    .status(200)
                    .send({
                      success: true,
                      user: user,
                      token: token,
                    });
              } else {
                response
                    .status(401)
                    .send({
                      success: false,
                      message: "Wrong password",
                    });
              }
            });
          }
        }
      });
    } else {
      return response
          .status(401)
          .send({
            success: false,
            message: "Invalid logins",
          });
    }
  };

const signUpValidation = [
    check("username")
      .exists()
      .trim()
      .escape()
      .custom((value, { req }) => {
        return User.findOne({ userName: value }).then((user) => {
          if (user) {
            return Promise.reject("Username already in use");
          }
        });
      }),
    check("email")
      .exists()
      .isEmail()
      .withMessage("Email is not valid")
      .trim()
      .escape(),
    check("password")
      .exists()
      .isLength({ min: 6 })
      .withMessage("Password must be 6+ characters long"),
    check("passwordConfirmation")
      .exists()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password confirmation does not match password");
        }
        return true;
      }),
  ];
  
  const authController = {
    register,
    login,
    signUpValidation,
  };

module.exports = authController;