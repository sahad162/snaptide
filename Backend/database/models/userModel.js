const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  gender: {
    type: String
  },
  profileImage: {
    type: String
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
