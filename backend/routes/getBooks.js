// /routes/getBooks.js

const express = require('express');
const BookModel = require('../models/Books'); // Import the Book model

// Create a new router object
const router = express.Router();

// API endpoint for getting books with pagination and filtering
router.get('/', async (req, res) => {
  try {
    // Paging variables
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    // Filtration variables
    let author = req.query.author;
    let categories = req.query.categories;
    let title = req.query.title;

    // Filter parameter object carrying the filter values
    let filter = {};
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

    const totalBooks = await BookModel.countDocuments();
    res.status(200).json({
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
      bookArray,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Export the router
module.exports = router;
