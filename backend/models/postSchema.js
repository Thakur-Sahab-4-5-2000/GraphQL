const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  comments: [
    {
      body: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      userID: {
        type: String,
        required: true,
      },
    },
  ],
  likes: [
    {
      userID: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  userID: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("postSchema", postSchema);
