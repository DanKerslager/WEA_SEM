/**
 * @swagger
 * /{userId}/personal-info:
 *   put:
 *     summary: Update the user's personal information
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the user
 *         example: "605c72d7e25e5c23a8a5f2b4"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The user's first name
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 description: The user's last name
 *                 example: "Doe"
 *               gender:
 *                 type: string
 *                 enum: ["Male", "Female", "Other", "Prefer not to say"]
 *                 description: The user's gender
 *                 example: "Male"
 *               age:
 *                 type: number
 *                 description: The user's age
 *                 example: 29
 *               favoriteGenres:
 *                 type: array
 *                 description: A list of the user's favorite book genres
 *                 items:
 *                   type: string
 *                 example: ["Fiction", "Science Fiction", "Mystery"]
 *               referenceSource:
 *                 type: string
 *                 description: Where the user learned about this platform
 *                 example: "Social Media"
 *     responses:
 *       200:
 *         description: Personal information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Personal information updated successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: "605c72d7e25e5c23a8a5f2b4"
 *                     personalInfo:
 *                       type: object
 *                       description: Updated personal information
 *                       properties:
 *                         firstName:
 *                           type: string
 *                         lastName:
 *                           type: string
 *                         gender:
 *                           type: string
 *                         age:
 *                           type: number
 *                         favoriteGenres:
 *                           type: array
 *                           items:
 *                             type: string
 *                         referenceSource:
 *                           type: string
 *       400:
 *         description: Bad request due to missing or invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input"
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
