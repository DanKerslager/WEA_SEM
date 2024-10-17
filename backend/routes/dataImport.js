/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Import an array of books
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
 *                   description: The ISBN number of the book
 *     responses:
 *       201:
 *         description: Books added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Books added successfully"
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
 *         description: Failed to save books
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

// /routes/dataImport.js

const express = require('express');
const BookModel = require('../models/Books'); // Import the Book model

// Create a new router object
const router = express.Router();

// API endpoint for receiving POST data
router.post('/', async (req, res) => {
  const books = req.body; // Expecting an array of books

  // Check if the input is an array
  if (!Array.isArray(books)) {
    return res.status(400).json({ error: 'Input must be an array of books' });
  }

  try {
    // Remove all existing books
    await BookModel.deleteMany({});

    // Use Mongoose's insertMany method to insert multiple records at once
    const savedBooks = await BookModel.insertMany(books);

    // Respond with the saved data
    res.status(201).json({ status: 'Books added successfully', books: savedBooks });
  } catch (err) {
    console.error('Error saving books:', err);
    res.status(500).json({ error: 'Failed to save books', details: err.message });
  }
});

// Export the router
module.exports = router;
