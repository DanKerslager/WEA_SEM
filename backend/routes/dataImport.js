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

// Funkce pro chunkování pole
function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

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
    await BookModel.updateMany({}, { $set: { available: false } });
  } catch (err) {
    logger.error('Error setting all books to unavailable:', err);
    return res.status(500).json({ error: 'Failed to set books as unavailable', details: err.message });
  }

  // Nastavení velikosti chunku (například 100 knih na jeden chunk)
  const chunkSize = 100;
  const bookChunks = chunkArray(books, chunkSize);

  try {
    // Zpracování každého chunku postupně
    for (const chunk of bookChunks) {
      const operations = chunk.map(book => ({
        updateOne: {
          filter: { isbn13: book.isbn13 }, // Používáme isbn13 jako unikátní identifikátor
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
              ratings_count: book.ratings_count,
              available: true, // Nastavíme knihu jako dostupnou
            },
            // Připojíme komentáře, pokud jsou poskytnuty, bez přepsání existujících komentářů
            $push: book.comments ? { comments: { $each: book.comments } } : {}
          },
          upsert: true
        }
      }));

      // Provedení bulkWrite operace pro aktuální chunk
      await BookModel.bulkWrite(operations);
    }

    res.status(201).json({
      status: 'Books added or updated successfully',
    });
  } catch (err) {
    logger.error('Error in bulk save:', err);
    res.status(500).json({ error: 'Failed to save books', details: err.message });
  }
});

module.exports = router;
