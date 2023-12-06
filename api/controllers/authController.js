const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Models/User');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;
const bcrypt_salt = bcrypt.genSaltSync(10);

const getAuthRoutes = (req, res) => {
  res.json('Auth routes');
};

const getProfile = (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.json({ error: 'Not logged in' });
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
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const postRegister = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    const hashedPassword = bcrypt.hashSync(password, bcrypt_salt);
    const newPayload = await User.create({
      username,
      password: hashedPassword,
    });
    const token = jwt.sign({ userId: newPayload._id, username }, jwtSecret, {});
    res.cookie('token', token, { sameSite: 'none', secure: true });
    res.status(201).json({
      id: newPayload._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const postLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const targetedUser = await User.findOne({ username });
    if (targetedUser) {
      if (bcrypt.compareSync(password, targetedUser.password)) {
        const token = jwt.sign({ userId: targetedUser._id, username }, jwtSecret, {});
        res.cookie('token', token, { sameSite: 'none', secure: true });
        res.status(201).json({
          id: targetedUser._id,
        });
      } else {
        res.status(401).json({ error: 'PasswordMismatch' });
      }
    } else {
      res.status(404).json({ error: 'UsernameNotFound' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const postLogout = (req, res) => {
  res.cookie('token', '', { sameSite: 'none', secure: 'true' }).json('ok');
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (id) {
      const targetUser = await User.findOne({ _id: id });
      if (targetUser) {
        res.status(200).json({
          success: true,
          message: "User data fetched successfully",
          user: targetUser,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAuthRoutes,
  getProfile,
  postRegister,
  postLogin,
  postLogout,
  getUserById
};
