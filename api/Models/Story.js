const mongoose = require("mongoose");

const slide = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const storySchema = new mongoose.Schema({
  creatorId: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  slides: [slide],
});

module.exports = mongoose.model("Story", storySchema);
