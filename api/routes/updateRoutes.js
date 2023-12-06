const express = require("express");
const router = express.Router();
const {
  updateLikes,
  updateBookmarks,
  addStory,
  updateStory,
} = require("../controllers/updateController");

router.post("/like", updateLikes);
router.post("/bookmark", updateBookmarks);
router.post("/add-story", addStory);
router.put("/update-story", updateStory);

module.exports = router;
