/**
 * @swagger
 * /users/{userId}/favorites:
 *   patch:
 *     summary: Add or remove a book from user's favorites
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The unique identifier of the user
 *         schema:
 *           type: string
 *       - in: body
 *         name: favoriteData
 *         description: Object containing bookId and favorite status
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bookId:
 *                   type: string
 *                   description: The unique identifier of the book
 *                 isFavorite:
 *                   type: boolean
 *                   description: True to add to favorites, false to remove from favorites
 *     responses:
 *       200:
 *         description: Successfully updated favorite status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book has been added to favorites."
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid bookId or userId."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error updating favorite status."
 */

const express = require("express");
const logger = require("../logger"); // Assuming you have a logger setup
const { setFavBook } = require("../controllers/userController"); // Import the function from UserController

const router = express.Router();

// Route to handle adding/removing favorites
router.patch("/users/:userId/favorites", async (req, res) => {
  const { userId } = req.params;
  const { bookId, isFavorite } = req.body;
  // Input validation
  if (!bookId || typeof isFavorite !== "boolean") {
    logger.warn(`Invalid input for userId: ${userId} - bookId: ${bookId}, isFavorite: ${isFavorite}`);
    return res.status(400).json({ message: "Invalid bookId or isFavorite flag." });
  }

  logger.info(`User ${userId} is updating favorites: bookId ${bookId}, isFavorite ${isFavorite}`);

  try {
    const response = await setFavBook(userId, bookId, isFavorite);

    if (!response.success) {
      return res.status(400).json({ message: response.message, favorites: response.favorites });
    }

    res.status(200).json({
      message: response.message,
      favorites: response.favorites,
    });
  } catch (error) {
    logger.error(`Error updating favorite for user ${userId}: ${error.message}`);
    res.status(500).json({ message: "Error updating favorite status.", details: error.message });
  }
});

module.exports = router;
