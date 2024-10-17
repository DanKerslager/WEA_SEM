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
