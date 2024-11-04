/**
 * @swagger
 * /data:
 *   post:
 *     summary: Add or update an array of books
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
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
 *                   description: The ISBN number of the book (used as a unique identifier)
 *     responses:
 *       201:
 *         description: Books added or updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Books added or updated successfully"
 *                 books:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       author:
 *                         type: string
 *                       publishedDate:
 *                         type: string
 *                         format: date
 *                       isbn:
 *                         type: string
 *       400:
 *         description: Invalid input (not an array)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Input must be an array of books"
 *       500:
 *         description: Failed to save or update books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to save books"
 *                 details:
 *                   type: string
 *                   example: "Database error details here"
 */

// routes/bookRoutes.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const logger = require('../logger');
const bookController = require('../controllers/bookController'); // Import the controller

const router = express.Router();

// API endpoint for receiving POST data
router.post('/', async (req, res) => {
  const books = req.body; // Expecting an array of books

  // Log the number of books received
  logger.info(`Received a POST request with ${books.length} books`);

  // Check if the input is an array
  if (!Array.isArray(books)) {
    logger.error('Invalid input: not an array');
    return res.status(400).json({ error: 'Input must be an array of books' });
  }

  // Write the last call's books to a file
  const lastCallFilePath = path.join(__dirname, '../logs/lastCallBooks.json');
  fs.writeFile(lastCallFilePath, JSON.stringify(books, null, 2), (err) => {
    if (err) {
      logger.error('Failed to write last call books to file:', err);
    } else {
      logger.info('Last call books successfully written to file');
    }
  });

  // Delegate to the controller
  try {
    const result = await bookController.addOrUpdateBooks(books); // Pass the body to the controller
    res.status(201).json({
      status: 'Books added or updated successfully',
      result,
    });
  } catch (error) {
    logger.error('Error processing books:', error);
    res.status(500).json({ error: 'Failed to save books', details: error.message });
  }
});

// Export the router
module.exports = router;
