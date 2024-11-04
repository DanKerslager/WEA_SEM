/**
 * @swagger
 * /books/{id}/comments:
 *   post:
 *     summary: Add a comment to a specific book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the book
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The content of the comment
 *               user:
 *                 type: string
 *                 description: The name of the user posting the comment
 *     responses:
 *       201:
 *         description: Comment added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the book
 *                 title:
 *                   type: string
 *                   description: The title of the book
 *                 author:
 *                   type: string
 *                   description: The author of the book
 *                 comments:
 *                   type: array
 *                   description: Array of comments on the book
 *                   items:
 *                     type: object
 *                     properties:
 *                       text:
 *                         type: string
 *                         description: The content of the comment
 *                       user:
 *                         type: string
 *                         description: The name of the user
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: The timestamp when the comment was created
 *       400:
 *         description: Invalid input (missing text or user fields)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Text and user are required"
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: objects
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to add comment"
 *                 details:
 *                   type: string
 *                   example: "Database error details here"
 */
const express = require('express');
const bookController = require('../controllers/bookController'); // Import the controller
const logger = require('../logger');

const router = express.Router();

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
