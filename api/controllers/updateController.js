const Story = require("../Models/Story");
const User = require("../Models/User");

const addStory = async (req, res) => {
  try {
    const { creatorId, stories } = req.body;
    if (!creatorId || !stories || !Array.isArray(stories)) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
      });
    }
    const story = new Story({
      creatorId,
      category: stories[0].category,
      slides: stories,
    });
    await story.save();
    res.status(200).json({
      success: true,
      message: "Stories added successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateLikes = async (req, res) => {
  try {
    const { id, slideId, currentStory } = req.query;
    const story = await Story.findById(currentStory);
    const slides = story.slides;
    const targetSlide = slides.find(
      (slide) => slide._id.toString() === slideId
    );
    if (!targetSlide) {
      res.json({ success: false, message: "Slide not found" });
    }
    if (!id) {
      const likesArray = targetSlide.likes;
      return res.json({ success: true, likesArray });
    }
    if (targetSlide.likes.includes(id)) {
      targetSlide.likes = targetSlide.likes.filter((userId) => userId !== id);
      await story.save();
      const updatedLikesCount = targetSlide.likes.length;
      return res.json({
        liked: false,
        message: "Story unliked successfully",
        likesCount: updatedLikesCount,
      });
    } else {
      targetSlide.likes.push(id);
      await story.save();
      const updatedLikesCount = targetSlide.likes.length;
      return res.json({
        liked: true,
        message: "Story liked successfully",
        likesCount: updatedLikesCount,
      });
    }
  } catch (error) {
    console.error("Error updating likes:", error.message);
    res.json({ success: false, message: error.message });
  }
};

const updateBookmarks = async (req, res) => {
  try {
    const { id, currentStory } = req.query;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (user.bookmarks.includes(currentStory)) {
      user.bookmarks = user.bookmarks.filter((story) => story != currentStory);
      await user.save();
      return res.json({
        success: true,
        bookmarked: false,
        message: "Removed from Bookmarks",
      });
    }
    user.bookmarks.push(currentStory);
    await user.save();
    return res.json({
      success: true,
      bookmarked: true,
      message: "Story bookmarked successfully",
    });
  } catch (error) {
    console.error("Error updating bookmarks:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateStory = async (req, res) => {
  try {
    const { id, stories } = req.body;

    if (!stories || !Array.isArray(stories) || stories.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid request.",
      });
    }
    const existingStory = await Story.findById(id);
    existingStory.slides = stories;
    await existingStory.save();
    res.status(200).json({
      success: true,
      message: "Story updated successfully",
      story: existingStory,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  addStory,
  updateStory,
  updateLikes,
  updateBookmarks,
};
