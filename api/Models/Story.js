const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  category: {
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
  creator: {
    type: String,
    required: true,
  },
  cover: {
    type: String, // Assuming the cover is a URL or a file path
  },
  // Additional fields can be added as needed
  // For example: content, date, etc.
});

const Story = mongoose.model("Story", storySchema);

module.exports = Story;
