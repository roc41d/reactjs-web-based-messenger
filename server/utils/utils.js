
const formatUserJson = (user) => {
  const userJson = {
    id: user._id,
    username: user.username,
    email: user.email
  };
  return userJson
}

const utils = {
  formatUserJson
};

module.exports = utils;
