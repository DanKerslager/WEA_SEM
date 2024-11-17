/**
 * @swagger
 * /books/{id}/ratings:
 *   post:
 *     summary: Add a rating to a specific book
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
 *               rating:
 *                 type: number
 *                 description: The rating value
 *                 minimum: 1
 *                 maximum: 5
 *               user:
 *                 type: string
 *                 description: The name of the user posting the rating
 *     responses:
 *       201:
 *         description: Rating added successfully
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
 *                 average_rating:
 *                   type: number
 *                   description: The updated average rating of the book
 *                 ratings_count:
 *                   type: number
 *                   description: The updated count of ratings
 *                 ratings:
 *                   type: array
 *                   description: Array of ratings on the book
 *                   items:
 *                     type: object
 *                     properties:
 *                       rating:
 *                         type: number
 *                         description: The rating value
 *                       user:
 *                         type: string
 *                         description: The name of the user
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: The timestamp when the rating was created
 *       400:
 *         description: Invalid input (missing rating or user fields)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Rating and user are required"
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
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
 *                   example: "Failed to add rating"
 *                 details:
 *                   type: string
 *                   example: "Database error details here"
 */
const express = require('express');
const bookController = require('../controllers/bookUserController'); // Import the controller
const logger = require('../logger');

const router = express.Router();

router.post('/:id/ratings', (req, res) => {
  logger.info(`/books/${req.params.id}/ratings endpoint was hit with`);

  const { id } = req.params;
  const { user, rating } = req.body;

  // Validate required fields
  if (rating === null || !user) {
    logger.warn(`Invalid input: Missing rating or user for rating on book ID ${id}`);
    return res.status(400).json({ message: 'Rating and user are required' });
  }

  // Validate rating range
  if (rating < 1 || rating > 5) {
    logger.warn(`Invalid rating value: Rating must be between 1 and 5 for book ID ${id}`);
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  // Call the controller if validation passes
  bookController.addRatingToBook(req, res);
});

module.exports = router;
