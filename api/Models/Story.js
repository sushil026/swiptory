const mongoose = require('mongoose');

const SlideSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
  },
});

const Slide = mongoose.model('Slide', SlideSchema);

const StorySchema = new mongoose.Schema({
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  slides: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slide',
  }],
}, { timestamps: true });

const Story = mongoose.model('Story', StorySchema);
module.exports = { Story, Slide };
