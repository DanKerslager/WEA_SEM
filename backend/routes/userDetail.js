const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Update personal info
router.put('/:userId/personal-info', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { firstName, lastName, gender, age, favoriteGenres, referenceSource } = req.body;

    const result = await userController.updatePersonalInfo(userId, { firstName, lastName, gender, age, favoriteGenres, referenceSource });
    res.status(200).json(result);
  } catch (error) {
    console.error('Error updating personal info:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

module.exports = router;
