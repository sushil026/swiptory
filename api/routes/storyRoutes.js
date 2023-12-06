const express = require("express");
const router = express.Router();
const {
  getFoodStories,
  getHealthFitnessStories,
  getMoviesStories,
  getTravelStories,
  getEducationStories,
  getYourStories,
  getStoryById,
  getSlideById,
  fetchBookmarks,
} = require("../controllers/storyController");

router.route("/food-stories").get(getFoodStories);
router.route("/hnf-stories").get(getHealthFitnessStories);
router.route("/travel-stories").get(getTravelStories);
router.route("/movies-stories").get(getMoviesStories);
router.route("/education-stories").get(getEducationStories);
router.route("/my-stories/:id").get(getYourStories);
router.route("/story/:id").get(getStoryById);
router.route("/slide").get(getSlideById);
router.route('/bookmarks').get(fetchBookmarks);

module.exports = router;
