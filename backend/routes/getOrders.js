/**
 * @swagger
 * /{userId}/orders:
 *   get:
 *     summary: Retrieve all orders for a specific user
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the user
 *         example: "605c72d7e25e5c23a8a5f2b4"
 *     responses:
 *       200:
 *         description: A list of orders for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Order ID
 *                     example: "5f8d04a4b54764421b7156d3"
 *                   user:
 *                     type: object
 *                     description: User details
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: User ID
 *                         example: "605c72d7e25e5c23a8a5f2b4"
 *                       name:
 *                         type: string
 *                         description: User's name
 *                         example: "John Doe"
 *                   items:
 *                     type: array
 *                     description: List of items in the order
 *                     items:
 *                       type: object
 *                       properties:
 *                         book:
 *                           type: object
 *                           description: Book details
 *                           properties:
 *                             title:
 *                               type: string
 *                               example: "Book Title"
 *                             price:
 *                               type: number
 *                               example: 19.99
 *                         quantity:
 *                           type: number
 *                           example: 2
 *                   payment:
 *                     type: string
 *                     description: Payment method
 *                     example: "Dobírka"
 *                   total:
 *                     type: number
 *                     description: Total price
 *                     example: 39.99
 *       400:
 *         description: User ID is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User ID is required."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

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
