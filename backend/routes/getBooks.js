// routes/bookRoutes.js
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
