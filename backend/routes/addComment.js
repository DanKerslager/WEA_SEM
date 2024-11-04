// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController'); // Import the controller
const logger = require('../logger');

// API endpoint pro přidání komentáře ke knize podle ID
router.post('/:id/comments', (req, res) => {
  logger.info(`/books/${req.params.id}/comments endpoint was hit`);

  const { id } = req.params;
  const { text, user } = req.body;

  // Základní validace povinných polí
  if (!text || !user) {
    logger.warn(`Invalid input: Missing text or user for comment on book ID ${id}`);
    return res.status(400).json({ message: 'Text and user are required' });
  }

  // Pokud je validace úspěšná, zavolá se controller
  bookController.addCommentToBook(req, res);
});

module.exports = router;
