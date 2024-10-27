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
    let bookDetail = await BookModel.findOne({ _id: id })
    res.status(200).json(bookDetail);
  } catch (error) {
    logger.error('Error in /getBooks/:id endpoint:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// Export the router
module.exports = router;