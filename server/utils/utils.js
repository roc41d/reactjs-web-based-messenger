const jwt = require("jsonwebtoken");

const verifyToken = (token) => {

    console.log("verifyToken", token);

  try {
    jwt.verify(token, process.env.SECRET_KEY);
    return true;
  } catch (error) {
    // error
    return false;
  }
};

const retrieveToken = (headers) => {
    if (headers && headers.authorization) {
      const tokens = headers.authorization.split(' ');
      if (tokens && tokens.length === 2) {
        return tokens[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
  
  const utils = {
    verifyToken,
    retrieveToken,
  };

  module.exports = utils;
