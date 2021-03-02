const User = require("../models/user");
const utils = require("../utils/utils");

const userProfile = async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res
      .status(400)
      .send({ error: 'User not found' });

    } else {

      return res
      .status(201)
      .send(utils.formatUserJson(user));
    }
};

const getUserByIds = async (userIds) => {
  try {
    const users = await User.find({ _id: { $in: userIds } });
    return users;

  } catch (error) {
    throw error;
  }
}

const userController = {
    userProfile,
    getUserByIds
};

module.exports = userController;