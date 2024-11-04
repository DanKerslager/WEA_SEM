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

const express = require('express');
const BookModel = require('../models/Books'); // Import the Book model
const logger = require('../logger');

// Create a new router object
const router = express.Router();

// API endpoint for getting books with pagination and filtering
router.get('/:id', async (req, res) => {
  logger.info('/getBooks/id endpoint was hit' + JSON.stringify(req.query));
  try {
    let id = req.params.id;
    // Database query for one book
    let bookDetail = await BookModel.findOne({ _id: id });
    res.status(200).json(bookDetail);
  } catch (error) {
    logger.error('Error in /getBooks/:id endpoint:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// Export the router
module.exports = router;
