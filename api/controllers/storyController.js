const express = require("express");
const Story = require("../Models/Story");
const User = require("../Models/User");

const getFoodStories = async (req, res) => {
  try {
    const foodStories = await Story.find({ category: "Food" });
    res.status(200).json({
      success: true,
      message: "Food stories fetched successfully",
      stories: foodStories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getHealthFitnessStories = async (req, res) => {
  try {
    const healthFitnessStories = await Story.find({
      category: "Health & Fitness",
    });
    res.status(200).json({
      success: true,
      message: "Health & Fitness stories fetched successfully",
      stories: healthFitnessStories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMoviesStories = async (req, res) => {
  try {
    const moviesStories = await Story.find({ category: "Movies" });
    res.status(200).json({
      success: true,
      message: "Movies stories fetched successfully",
      stories: moviesStories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTravelStories = async (req, res) => {
  try {
    const travelStories = await Story.find({ category: "Travel" });
    res.status(200).json({
      success: true,
      message: "Travel stories fetched successfully",
      stories: travelStories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getEducationStories = async (req, res) => {
  try {
    const educationStories = await Story.find({ category: "Education" });
    res.status(200).json({
      success: true,
      message: "education stories fetched successfully",
      stories: educationStories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getYourStories = async (req, res) => {
  try {
    const { id } = req.params;
    const yourStories = await Story.find({ creatorId: id });
    res.status(200).json({
      success: true,
      message: "Your stories fetched successfully",
      stories: yourStories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getStoryById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!(id === null)) {
      const targetStory = await Story.findOne({ _id: id });
      res.status(200).json({
        success: true,
        stories: targetStory,
      });
    } 
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSlideById = async (req, res) => {
  try {
    const { currentStory, slideId } = req.query;
    const story = await Story.findOne({ _id: currentStory });
    if (!story) {
      return res.json({ message: "no story found" });
    }
    const targetSlide = story.slides.find(
      (slide) => slide._id.toString() === slideId
    );
    if (!targetSlide) {
      return res.json({ message: "slide not found" });
    }
    res.json({ message: "success", targetSlide });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const fetchBookmarks = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ success: false });
    }
    const user = await User.findById(userId);
    res.json({ success: true, bookmarks: user.bookmarks });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = {
  getFoodStories,
  getHealthFitnessStories,
  getMoviesStories,
  getTravelStories,
  getEducationStories,
  getYourStories,
  getStoryById,
  getSlideById,
  fetchBookmarks,
};
