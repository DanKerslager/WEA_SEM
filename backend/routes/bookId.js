/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Retrieve a single book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the book
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the book details
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
 *                 publishedDate:
 *                   type: string
 *                   format: date
 *                   description: The publication date of the book
 *                 isbn:
 *                   type: string
 *                   description: The ISBN number of the book
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
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
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
 *                 message:
 *                   type: string
 *                   example: "Error fetching book details"
 */

// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController'); // Import the controller
const logger = require('../logger');

// API endpoint for getting book details by ID
router.get('/:id', (req, res) => {
  logger.info(`/getBooks/${req.params.id} endpoint was hit`);

  // Check if the provided ID is a valid MongoDB ObjectId format
  const { id } = req.params;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    logger.warn(`Invalid book ID format: ${id}`);
    return res.status(400).json({ message: 'Invalid book ID format' });
  }

  // If validation passes, call the controller
  bookController.getBookDetailsById(req, res);
});

module.exports = router;
