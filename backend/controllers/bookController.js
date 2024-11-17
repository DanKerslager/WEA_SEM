// controllers/bookController.js
const BookModel = require('../models/Books'); // Import the Book model
const logger = require('../logger'); // Import the logger
const e = require('express');
const { chunkArray, makeFilterObject } = require('./utils');
const logAuditEvent = require('./AuditLogController'); // Import the audit log controller

// Controller funkce pro přidání komentáře ke konkrétní knize
exports.addCommentToBook = async (req, res) => {
  const { id } = req.params;
  const { text, user } = req.body;

  try {
    // Najdeme knihu podle ID
    const book = await BookModel.findById(id);

    // Kontrola, zda kniha existuje
    if (!book) {
      logger.warn(`Book with ID ${id} not found.`);
      return res.status(404).json({ message: 'Book not found' });
    }

    // Přidáme nový komentář do pole komentářů
    const newComment = { text, user, createdAt: new Date() };
    book.comments.push(newComment);

    // Uložíme aktualizovaný dokument knihy
    await book.save();

    res.status(201).json(book); // Vrátíme aktualizovanou knihu s novým komentářem
  } catch (error) {
    logger.error('Error in addCommentToBook controller:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Controller function for getting book details by ID
exports.getBookDetailsById = async (req, res) => {
  const { id } = req.params;

  try {
    // Database query to find the book by ID
    const bookDetail = await BookModel.findById(id);

    if (!bookDetail) {
      logger.warn(`Book with ID ${id} not found.`);
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(bookDetail); // Return book details
  } catch (error) {
    logger.error('Error in getBookDetailsById controller:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Controller function for getting books with pagination and filtering
exports.getBooks = async (req, res) => {
  try {
    // Paging
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Filter object creation
    filter = makeFilterObject(req.query);

    // Database query
    let bookArray = await BookModel.find(filter).skip(skip).limit(limit);
    // Total number of pages, gets updated by the filter
    const totalBooks = await BookModel.countDocuments(filter); // Updated to use the filter correctly
    res.status(200).json({
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
      bookArray,
    });
  } catch (error) {
    logger.error('Error in /getBooks endpoint:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Add or update books in the database
exports.addOrUpdateBooks = async (books) => {
  try {
    await BookModel.updateMany({}, { $set: { available: false } });
  } catch (err) {
    logger.error('Error setting all books to unavailable:', err);
    throw new Error('Failed to set books as unavailable');
  }

  // Set the chunk size
  const chunkSize = 100;
  const bookChunks = chunkArray(books, chunkSize);

  // Iterate over each chunk (assuming books are already chunked)
  for (const chunk of bookChunks) {
    const operations = chunk.map(book => ({
      updateOne: {
        filter: { isbn13: book.isbn13 }, // Use isbn13 as unique identifier
        update: {
          $set: {
            isbn10: book.isbn10,
            title: book.title,
            categories: book.categories,
            subtitle: book.subtitle,
            authors: book.authors,
            thumbnail: book.thumbnail,
            description: book.description,
            published_year: book.published_year,
            average_rating: book.average_rating,
            num_pages: book.num_pages,
            ratings_count: book.ratings_count,
            available: true, // Set book as available
          },
          $push: book.comments ? { comments: { $each: book.comments } } : {}
        },
        upsert: true
      }
    }));

    try {
      // Execute bulkWrite operation for the current chunk
      await BookModel.bulkWrite(operations);
    } catch (err) {
      // Log the error for the current chunk and proceed to the next one
      logger.error('Error processing chunk:', err);
    }
  }
  await logAuditEvent.logAuditEvent('BOOKS_UPDATED', 'CDB', { count: books.length });
};
