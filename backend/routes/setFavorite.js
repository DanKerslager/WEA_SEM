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
const UserModel = require("../models/Users"); // Import the User model
const router = express.Router();

// Function to set or unset a favorite book for a user
async function setFavoriteBook(userId, bookId, isFavorite) {
  try {
    const user = await UserModel.findById(userId);

    if (!user) throw new Error("User not found.");

    if (isFavorite) {
      // Add the book to favorites if not already present
      if (!user.favoriteBooks.includes(bookId)) {
        user.favoriteBooks.push(bookId);
        await user.save();
        return { message: "Book has been added to favorites." };
      } else {
        return { message: "Book is already in favorites." };
      }
    } else {
      // Remove the book from favorites if present
      user.favoriteBooks = user.favoriteBooks.filter(
        (favoriteBookId) => !favoriteBookId.equals(bookId)
      );
      await user.save();
      return { message: "Book has been removed from favorites." };
    }
  } catch (error) {
    throw new Error("Error updating favorite status: " + error.message);
  }
}

// Route to handle adding/removing favorites
router.patch("/users/:userId/favorites", async (req, res) => {
  const { userId } = req.params;
  const { bookId, isFavorite } = req.body;

  if (!bookId || typeof isFavorite !== "boolean") {
    return res.status(400).json({ message: "Invalid bookId or isFavorite flag." });
  }

  try {
    const response = await setFavoriteBook(userId, bookId, isFavorite);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
