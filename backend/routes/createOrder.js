/**
 * @swagger
 * /createOrder:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     description: Place a new order with user information, books, and a payment method.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                     description: First name of the user.
 *                   lastName:
 *                     type: string
 *                     description: Last name of the user.
 *                   email:
 *                     type: string
 *                     description: Email address of the user.
 *                   shippingAddress:
 *                     $ref: '#/components/schemas/Address'
 *                   billingAddress:
 *                     $ref: '#/components/schemas/Address'
 *               books:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     bookId:
 *                       type: string
 *                       description: ID of the book.
 *                     quantity:
 *                       type: integer
 *                       description: Quantity of the book to order.
 *               paymentMethod:
 *                 type: string
 *                 description: Payment method (e.g., Dobírka, Bankovní převod, Kartou online).
 *     responses:
 *       201:
 *         description: Order created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                 order:
 *                   type: object
 *                   description: Details of the created order.
 *       400:
 *         description: Invalid request parameters.
 *       500:
 *         description: Internal server error.
 */

const express = require('express');
const logger = require('../logger');
const orderController = require('../controllers/orderController'); // Import the controller

// Create a new router object
const router = express.Router();

// API endpoint for creating an order
router.post('/', (req, res) => {
  logger.info('/createOrder endpoint was hit', req.body);
  const { user, books, paymentMethod } = req.body;

  // Validate user data
  if (!user || !user.firstName || !user.lastName || !user.email || !user.shippingAddress || !user.billingAddress) {
    return res.status(400).json({ message: 'Invalid or incomplete user data.' });
  }
  // Validate books array
  if (!Array.isArray(books) || books.length === 0) {
    return res.status(400).json({ message: 'No books provided for the order.' });
  }
  // Validate payment method
  const validPaymentMethods = ['Dobírka', 'Bankovní převod', 'Kartou online'];
  if (!validPaymentMethods.includes(paymentMethod)) {
    return res.status(400).json({ message: 'Invalid payment method.' });
  }

  // Delegate to the controller
  orderController.createOrder(req, res);
});

// Export the router
module.exports = router;
