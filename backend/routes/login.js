const express = require('express');
const User = require('../models/Users'); // Assuming your User model is in the models folder
const router = express.Router();

// Login API
router.post('/', async (req, res) => {
  const { email, password } = req.body;
S
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Login success (For now, you can send the user info back)
    res.status(200).json({ message: 'Logged in successfully', user: { email: user.email, username: user.username } });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
