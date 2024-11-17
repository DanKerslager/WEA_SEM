const User = require('../models/Users'); // Import User model
const BookModel = require('../models/Books'); // Import Book model
const logger = require('../logger'); // Import logger

exports.addRatingToBook = async (req, res) => {
  const { id } = req.params; // Book ID
  const { user, rating } = req.body; // User ID and rating value

  try {
    // Find the book and user by their IDs
    logger.info(`Finding book and user by ID: Book ID: ${id}, User ID: ${user}`);
    const book = await BookModel.findById(id);
    const userDoc = await User.findById(user);

    // Check if book and user exist
    if (!book || !userDoc) {
      logger.warn(`Book or User not found: Book ID: ${id}, User ID: ${user}`);
      return res.status(404).json({ message: 'Book or User not found' });
    }

    logger.info(`Book and User found: Book ID: ${id}, User ID: ${user}`);

    // Check if the user has already rated this book
    const existingBookRating = book.user_ratings.find(r => r.user.toString() === user);
    const existingUserRating = userDoc.ratings.find(r => r.book.toString() === id);

    // Update or add the rating in the book document
    if (existingBookRating) {
      existingBookRating.rating = rating;
      existingBookRating.createdAt = new Date();
      logger.info(`Updated existing book rating for User ID: ${user}`);
    } else {
      book.user_ratings.push({ user, rating, createdAt: new Date() });
      logger.info(`Added new book rating for User ID: ${user}`);
    }

    // Update or add the rating in the user document
    if (existingUserRating) {
      existingUserRating.rating = rating;
      existingUserRating.createdAt = new Date();
      logger.info(`Updated existing user rating for Book ID: ${id}`);
    } else {
      userDoc.ratings.push({ book: id, rating, createdAt: new Date() });
      logger.info(`Added new user rating for Book ID: ${id}`);
    }

    // Perform updates with manual rollback logic
    let bookSaveSuccess = false;
    let userSaveSuccess = false;

    try {
      await book.save(); // Save book first
      bookSaveSuccess = true;

      await userDoc.save(); // Save user next
      userSaveSuccess = true;

      logger.info(`Successfully updated ratings for Book ID: ${id}, User ID: ${user}`);
      res.status(201).json({ book });
    } catch (error) {
      logger.error(`Error while saving book or user: ${error.message}`);

      // Rollback logic
      if (bookSaveSuccess && !userSaveSuccess) {
        logger.warn(`Rolling back book changes for Book ID: ${id}`);
        const rollbackBook = await BookModel.findById(id);
        rollbackBook.user_ratings = book.user_ratings.filter(r => r.user.toString() !== user);
        await rollbackBook.save();
      }

      throw error; // Re-throw the error to handle it in the catch block below
    }
  } catch (error) {
    logger.error('Error in addRatingToBook controller:', error.message);
    res.status(500).json({ message: 'Failed to add or update rating', details: error.message });
  }
};
