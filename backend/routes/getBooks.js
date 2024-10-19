/**
 * @swagger
 * /getBooks:
 *   get:
 *     summary: Retrieve a list of books
 *     tags: [Books]
 *     description: Fetch a list of books with optional pagination and filtering by author, categories, and title.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve (for pagination).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page (for pagination).
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Filter books by author (case-insensitive).
 *       - in: query
 *         name: categories
 *         schema:
 *           type: string
 *         description: Filter books by categories (case-insensitive).
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter books by title (case-insensitive).
 *     responses:
 *       200:
 *         description: A paginated list of books.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalBooks:
 *                   type: integer
 *                   description: Total number of books in the database.
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages.
 *                 bookArray:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Book ID.
 *                       title:
 *                         type: string
 *                         description: Book title.
 *                       authors:
 *                         type: string
 *                         description: Book author(s).
 *                       categories:
 *                         type: string
 *                         description: Book categories.
 *       500:
 *         description: Internal server error.
 */

// /routes/getBooks.js

const express = require('express');
const BookModel = require('../models/Books'); // Import the Book model
const logger = require('../logger');

// Create a new router object
const router = express.Router();

// API endpoint for getting books with pagination and filtering
router.get('/', async (req, res) => {
  logger.info('/getBooks endpoint was hit' + JSON.stringify(req.query));
  try {
    // Paging variables
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    
    // Filtration variables
    let isbn = req.query.isbn;
    let author = req.query.author;
    let categories = req.query.categories;
    let title = req.query.title;

    // Filter parameter object carrying the filter values
    let filter = {};
    if (isbn){
      filter.isbn13 = { $regex: isbn, $options: 'i' };
    }
    if (author) {
      filter.authors = { $regex: author, $options: 'i' }; // Author filtration (case-insensitive)
    }
    if (categories) {
      filter.categories = { $regex: categories, $options: 'i' }; // Categories filtration (case-insensitive)
    }
    if (title) {
      filter.title = { $regex: title, $options: 'i' }; // Title filtration (case-insensitive)
    }

    // Paging calculation
    const skip = (page - 1) * limit;

    // Database query
    let bookArray = await BookModel.find(filter).skip(skip).limit(limit);
    // Total number of pages, gets updated by the filter
    const totalBooks = await BookModel.find(filter).countDocuments(bookArray);
    res.status(200).json({
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
      bookArray,
    });
  } catch (error) {
    logger.error('Error in /getBooks endpoint:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// Export the router
module.exports = router;
