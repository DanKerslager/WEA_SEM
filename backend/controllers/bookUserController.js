const User = require('../models/Users'); // Assuming your User model is in the models folder
const BookModel = require('../models/Books'); // Import the Book model
const mongoose = require("mongoose");
const logger = require('../logger'); // Import the logger

exports.addRatingToBook = async (req, res) => {
  const { id } = req.params; // Book ID
  const { user, rating } = req.body; // User ID and rating value

  // Start the session for the update operation
  const session = await mongoose.startSession();

  try {
    // Find the book and user by ID (no session for reads)
    logger.info(`Finding book and user by ID: Book ID: ${id}, User ID: ${user}`);
    const book = await BookModel.findById(id);
    const userDoc = await User.findById(user);

    if (!book || !userDoc) {
      logger.warn(`Book or User not found: Book ID: ${id}, User ID: ${user}`);
      return res.status(404).json({ message: 'Book or User not found' });
    }

    logger.info(`Book and User found: Book ID: ${id}, User ID: ${user}`);

    // Start the transaction
    session.startTransaction();

    // Check if the user already has a rating for this book in the book document
    const existingBookRating = book.user_ratings.find(r => r.user.toString() === user);
    const existingUserRating = userDoc.ratings.find(r => r.book.toString() === id);

    if (existingBookRating) {
      // Update the book rating
      existingBookRating.rating = rating;
      existingBookRating.createdAt = new Date();
    } else {
      // Add a new rating to the book
      book.user_ratings.push({ rating, user, createdAt: new Date() });
    }

    if (existingUserRating) {
      // Update the user rating
      existingUserRating.rating = rating;
      existingUserRating.createdAt = new Date();
    } else {
      // Add a new rating to the user
      userDoc.ratings.push({ book: id, rating, createdAt: new Date() });
    }

    // Save the book and user documents within the session
    await Promise.all([book.save({ session }), userDoc.save({ session })]);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Return the updated book and user data
    res.status(201).json({ book, userDoc });
  } catch (error) {
    // Rollback the transaction on error
    await session.abortTransaction();
    session.endSession();

    logger.error('Error in addRatingToBook controller:', error.message);
    res.status(500).json({ message: 'Failed to add or update rating', details: error.message });
  }
};
