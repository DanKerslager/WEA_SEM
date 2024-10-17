// /backend/index.js

const express = require('express');
const logger = require('./logger');
const mongoose = require("mongoose")
const cors = require("cors")
const path = require('path');

// Model for book database
const BookModel = require("./server/models/Books")

// Vytvoření instance expressu a přidání závyslostí
const app = express();
app.use(cors())
app.use(express.json())

// MongoDB connection URI
const mongoURI = `mongodb://${process.env.DB_User}:${process.env.DB_Password}@${process.env.DB_Host}:${process.env.DB_Port}/${'bookCatalog'}?authSource=admin`;

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });

// Port for the backend to listen to from the environment variable
const PORT = process.env.PORT || 8002;

// API endpoint for receiving POST data
app.post('/data', async (req, res) => {
  const books = req.body; // Expecting an array of books

  // Check if the input is an array
  if (!Array.isArray(books)) {
      return res.status(400).json({ error: 'Input must be an array of books' });
  }

  try {
      // Odstranění všech existujících knih
      await BookModel.deleteMany({});
      
      // Use Mongoose's insertMany method to insert multiple records at once
      const savedBooks = await BookModel.insertMany(books);
      
      // Respond with the saved data
      res.status(201).json({ status: 'Books added successfully', books: savedBooks });
  } catch (err) {
      console.error('Error saving books:', err);
      res.status(500).json({ error: 'Failed to save books', details: err.message });
  }
});

// API endpoint for getting books with pagination and filtering
app.get("/getBooks", async (req, res) => {
  try {
    // paging variables
    let page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10
    // filtration variables
    let author = req.query.author
    let categories = req.query.categories
    let title = req.query.title
    //Filter parameter object carrying the filter values
    let filter = {};
    if (author) {
      filter.authors = { $regex: author, $options: "i" }; // Author filtration (case-insensitive)
    }
    if (categories) {
      filter.categories = { $regex: categories, $options: "i" }; // Categories filtration (case-insensitive)
    }
    if (title) {
      filter.title = { $regex: title, $options: "i" }; // Title filtration (case-insensitive)
    }
    // Paging calculation
    const skip = (page - 1) * limit;
    // Database query
    let bookArray = await BookModel.find(filter).skip(skip).limit(limit)

    const totalBooks = await BookModel.countDocuments();
    res.status(200).json({
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
      bookArray,
    })
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Basic route to the main page
app.get('/', (req, res) => {
  console.log("endpoint was hit");
  logger.info('Root endpoint was hit');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Setting the public file fot static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Start server and listen of port
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  console.log(`Server is running on port ${PORT}`);
});
