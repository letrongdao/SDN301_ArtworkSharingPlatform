const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userId: {
      type: Number,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    nickname: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    createdTime: {
      type: Date,
      required: true
    },
    numOfFollower: {
      type: Number,
      required: true
    },
    avatar: {
      type: String,
      required: false
    },
    status: {
      type: Boolean,
      required: true
    }
  });

const User = mongoose.model('user', userSchema);
module.exports = User;