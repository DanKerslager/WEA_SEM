/**
 * @swagger
 * /books/{id}/comments:
 *   post:
 *     summary: Add a comment to a specific book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the book
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The content of the comment
 *               user:
 *                 type: string
 *                 description: The name of the user posting the comment
 *     responses:
 *       201:
 *         description: Comment added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the book
 *                 title:
 *                   type: string
 *                   description: The title of the book
 *                 author:
 *                   type: string
 *                   description: The author of the book
 *                 comments:
 *                   type: array
 *                   description: Array of comments on the book
 *                   items:
 *                     type: object
 *                     properties:
 *                       text:
 *                         type: string
 *                         description: The content of the comment
 *                       user:
 *                         type: string
 *                         description: The name of the user
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: The timestamp when the comment was created
 *       400:
 *         description: Invalid input (missing text or user fields)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Text and user are required"
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: objects
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to add comment"
 *                 details:
 *                   type: string
 *                   example: "Database error details here"
 */

const express = require('express');
const BookModel = require('../models/Books'); // Import the Book model
const logger = require('../logger');

// Create a new router object
const router = express.Router();

// API endpoint for adding a comment to a specific book by ID
router.post('/:id/comments', async (req, res) => {
  logger.info(`/books/${req.params.id}/comments endpoint was hit`);

  try {
    const { id } = req.params;
    const { text, user } = req.body;

    // Validate required fields
    if (!text || !user) {
      return res.status(400).json({ message: 'Text and user are required' });
    }

    // Find the book by ID
    const book = await BookModel.findById(id);

    // Check if the book exists
    if (!book) {
      logger.warn(`Book with ID ${id} not found.`);
      return res.status(404).json({ message: 'Book not found' });
    }

    // Add the new comment to the comments array
    const newComment = { text, user, createdAt: new Date() };
    book.comments.push(newComment);

    // Save the updated book document
    await book.save();

    res.status(201).json(book); // Return the updated book with the new comment
  } catch (error) {
    logger.error('Error in /books/:id/comments endpoint:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// Export the router
module.exports = router;
