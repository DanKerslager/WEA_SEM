const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

// Get orders for a user
router.get('/:userId/orders', (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required.' });
  }

  try {
    orderController.getOrdersByUserId(req, res);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

module.exports = router;
