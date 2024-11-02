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


const express = require('express');
const BookModel = require('../models/Books'); // Import the Book model
const logger = require('../logger');

const router = express.Router();

// API endpoint for receiving POST data
router.post('/', async (req, res) => {
  const books = req.body; // Expecting an array of books
  logger.info('Received POST data:', books);

  // Check if the input is an array
  if (!Array.isArray(books)) {
    logger.error('Invalid input: not an array');
    return res.status(400).json({ error: 'Input must be an array of books' });
  }

  try {
    // Map each book to a bulkWrite operation
    const operations = books.map(book => ({
      updateOne: {
        filter: { isbn13: book.isbn13 }, // Use isbn13 as the unique identifier
        update: {
          $set: {
            isbn10: book.isbn10,
            title: book.title,
            categories: book.categories,
            subtitle: book.subtitle,
            authors: book.authors,
            thumbnail: book.thumbnail,
            description: book.description,
            published_year: book.published_year,
            average_rating: book.average_rating,
            num_pages: book.num_pages,
            ratings_count: book.ratings_count
          },
          // Append comments if provided, without overwriting existing ones
          $push: book.comments ? { comments: { $each: book.comments } } : {} 
        },
        upsert: true
      }
    }));

    // Execute bulkWrite operation
    const result = await BookModel.bulkWrite(operations);

    res.status(201).json({
      status: 'Books added or updated successfully',
      result
    });
  } catch (err) {
    logger.error('Error in bulk save:', err);
    res.status(500).json({ error: 'Failed to save books', details: err.message });
  }
});

module.exports = router;
