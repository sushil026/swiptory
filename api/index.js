const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookie_parser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const User = require("./Models/User");
require("dotenv").config();

const app = express();
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URL);
const jwtSecret = process.env.JWT_SECRET;

app.use(cookie_parser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json("hello");
});
const bcrypt_salt = bcrypt.genSaltSync(10);

app.get("/profile", (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.json({ error: "Not logged in" });
    }
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) {
        throw err;
      }
      const { id, username } = userData;
      res.json(userData);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, bcrypt_salt);
    const newPayload = await User.create({
      username,
      password: hashedPassword,
    });
    const token = jwt.sign({ userId: newPayload._id, username }, jwtSecret, {});
    res.cookie("token", token, { sameSite: "none", secure: true });
    res.status(201).json({
      id: newPayload._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const targetedUser = await User.findOne({ username });
    if (targetedUser) {
      if (bcrypt.compareSync(password , targetedUser.password)) {
        const token = jwt.sign({ userId: targetedUser._id, username }, jwtSecret, {});
        res.cookie("token", token, { sameSite: "none", secure: "true" });
        res.status(201).json({
          id: targetedUser._id,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/logout', (req, res)=>{
  res.cookie('token', '', {sameSite: 'none', secure: 'true'}).json('ok');
})

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
