/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for the new user
 *                 example: john_doe
 *               email:
 *                 type: string
 *                 description: The email address of the user
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 description: The password for the user
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *       400:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User already exists"
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

// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController'); // Import the controller

const router = express.Router();

// Register API
router.post('/', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const result = await userController.registerUser(username, email, password);
    res.status(201).json(result);
  } catch (error) {
    if (error.message === 'User already exists') {
      return res.status(400).json({ message: 'User already exists' });
    }
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
