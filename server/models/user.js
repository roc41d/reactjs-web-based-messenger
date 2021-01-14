const mongoose      = require("mongoose");
const { Schema }    = require("mongoose");

const userSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("User", userSchema);