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
const logger = require('../logger');
const bookController = require('../controllers/bookController'); // Import the controller

// Create a new router object
const router = express.Router();

// API endpoint for getting books with pagination and filtering
router.get('/', (req, res) => {
  logger.info('/getBooks endpoint was hit' + JSON.stringify(req.query));

  // Delegate to the controller
  bookController.getBooks(req, res);
});

// Export the router
module.exports = router;
