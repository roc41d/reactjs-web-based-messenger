const mongoose      = require("mongoose");
const { Schema }    = require("mongoose");

const userSchema = new Schema({
  userName: String,
  email: String,
  password: String,
  isActive: Boolean // use to check/control user online status
});

module.exports = mongoose.model("User", userSchema);