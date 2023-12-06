const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/", authController.getAuthRoutes);

router.get("/profile", authController.getProfile);

router.post("/register", authController.postRegister);

router.post("/login", authController.postLogin);

router.post("/logout", authController.postLogout);

router.get("/user/:id", authController.getUserById);

module.exports = router;
