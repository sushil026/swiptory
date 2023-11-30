// // authRoutes.js
// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const User = require('../Models/User');
// require('dotenv').config();



// const jwtSecret = process.env.JWT_SECRET;
// const bcrypt_salt = bcrypt.genSaltSync(10);


// router.get('/', (req, res) => {
//   res.json('Auth routes');
// });

// router.get('/profile', (req, res) => {
//   try {
//     const token = req.cookies?.token;
//     if (!token) {
//       return res.json({ error: 'Not logged in' });
//     }
//     jwt.verify(token, jwtSecret, {}, (err, userData) => {
//       if (err) {
//         throw err;
//       }
//       const { id, username } = userData;
//       res.json(userData);
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// router.post('/register', async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ error: 'Username already exists' });
//     }
//     const hashedPassword = bcrypt.hashSync(password, bcrypt_salt);
//     const newPayload = await User.create({
//       username,
//       password: hashedPassword,
//     });
//     const token = jwt.sign({ userId: newPayload._id, username }, jwtSecret, {});
//     res.cookie('token', token, { sameSite: 'none', secure: true });
//     res.status(201).json({
//       id: newPayload._id,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const targetedUser = await User.findOne({ username });
//     if (targetedUser) {
//       if (bcrypt.compareSync(password, targetedUser.password)) {
//         const token = jwt.sign({ userId: targetedUser._id, username }, jwtSecret, {});
//         res.cookie('token', token, { sameSite: 'none', secure: true });
//         res.status(201).json({
//           id: targetedUser._id,
//         });
//       } else {
//         // Password doesn't match
//         res.status(401).json({ error: 'PasswordMismatch' });
//       }
//     } else {
//       // Username not found
//       res.status(404).json({ error: 'UsernameNotFound' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// router.post('/logout', (req, res) => {
//   res.cookie('token', '', { sameSite: 'none', secure: 'true' }).json('ok');
// });

// module.exports = router;


// authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', authController.getAuthRoutes);

router.get('/profile', authController.getProfile);

router.post('/register', authController.postRegister);

router.post('/login', authController.postLogin);

router.post('/logout', authController.postLogout);

module.exports = router;
