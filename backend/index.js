const dotenv = require("dotenv").config({path: __dirname+"\\config.env"})
const express = require('express');
const logger = require('./logger');
const mongoose = require("mongoose")
const cors = require("cors")
const path = require('path');

// Model pro vytváření dat knížek
const BookModel = require("./server/models/Books")

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

const PORT = process.env.PORT || 8002;
console.log("running index");

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


// API na získání knížek

/*app.get("/getBooks", (req, res) => {
  BookModel.find()
  .then(books => res.json(books))
  .catch(err => res.json(err))
})*/
app.get("/getBooks", async (req, res) => {
  try {
    // proměnné pro stránkování
    let page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10
    // proměnné pro filtraci
    let author = req.query.author
    let categories = req.query.categories
    let title = req.query.title
    //Vytvoř filter objekt, query parametrů poslané přes URL
    let filter = {};
    if (author) {
      filter.authors = { $regex: author, $options: "i" }; // Filtrace autora (case-insensitive)
    }
    if (categories) {
      filter.categories = { $regex: categories, $options: "i" }; // Filtrace žánru (case-insensitive)
    }
    if (title) {
      filter.title = { $regex: title, $options: "i" }; // Filtrace názvu (case-insensitive)
    }
    //vypočítání stránkování
    const skip = (page - 1) * limit;
    //filtrace
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
// Základní routa - logování při přístupu na hlavní stránku
app.get('/', (req, res) => {
  console.log("endpoint was hit");
  logger.info('Root endpoint was hit');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Nastavení složky public jako složky pro statické soubory (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Spuštění serveru na portu 3000 a logování
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  console.log(`Server is running on port ${PORT}`);
});

// časem rozsekat