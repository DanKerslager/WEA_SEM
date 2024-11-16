const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Update personal address
router.put('/:userId/address', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { personalAddress, billingAddress, sameAsPersonalAddress } = req.body;

    const result = await userController.updateAddress(userId, personalAddress, billingAddress, sameAsPersonalAddress);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

module.exports = router;
