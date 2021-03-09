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

const searchUsers = async (req, res) => {
  try {
    const searchQuery = req.query.searchquery;

    if (searchQuery != null) {

      const users = await User.find({username: { $regex: searchQuery, $options: 'i' }})
      return res.status(200).json({
        success: true,
        users
      });
    } else {
      res.end();
    }

  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
}

const userController = {
    userProfile,
    getUserByIds,
    searchUsers
};

module.exports = userController;