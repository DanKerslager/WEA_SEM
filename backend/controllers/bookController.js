// controllers/bookController.js
const BookModel = require('../models/Books'); // Import the Book model
const logger = require('../logger'); // Import the logger

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

// Controller function to add a rating to a specific book
exports.addRatingToBook = async (req, res) => {
  const { id } = req.params;
  const { rating, user } = req.body;

  try {
    // Find the book by ID
    const book = await BookModel.findById(id);

    // Check if the book exists
    if (!book) {
      logger.warn(`Book with ID ${id} not found.`);
      return res.status(404).json({ message: 'Book not found' });
    }

    // Create a new rating object
    const newRating = { rating, user, createdAt: new Date() };
    book.user_ratings.push(newRating);

    // Update the average rating and ratings count using the schema method
    book.updateAverageAndCount();

    // Save the updated book document
    await book.save();

    res.status(201).json(book); // Return the updated book with the new rating
  } catch (error) {
    logger.error('Error in addRatingToBook controller:', error.message);
    res.status(500).json({ message: 'Failed to add rating', details: error.message });
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
    // Paging variables
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    // Filtration variables
    let isbn = req.query.isbn;
    let author = req.query.author;
    let categories = req.query.categories;
    let title = req.query.title;

    // Filter parameter object carrying the filter values
    let filter = {};
    if (isbn) {
      filter.isbn13 = { $regex: isbn, $options: 'i' };
    }
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

// Function to chunk the array
function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

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

  try {
    // Process each chunk
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

      // Execute bulkWrite operation for the current chunk
      await BookModel.bulkWrite(operations);
    }
  } catch (err) {
    logger.error('Error in bulk save:', err);
    throw new Error('Failed to save books');
  }
};
