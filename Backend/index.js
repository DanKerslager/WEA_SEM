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
const mongoUser = "admin" // User from environment variables
const mongoPassword = "password" // Password from environment variables
const mongoHost = 'sk03-mongo'; // Use the service name if using Docker Compose
const mongoPort = 27017; // Default MongoDB port
const mongoDatabase = 'bookCatalog'; // Your database name

const mongoURI = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDatabase}?authSource=admin`;

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

// API endpoint pro příjem POST dat a jejich uložení do MongoDB
app.post("/data", async (req, res) => {
  try {
    // Vytvoření nového objektu podle modelu BookModel
    const newBook = new BookModel({
      isbn13: req.body.isbn13,
      isbn10: req.body.isbn10,
      title: req.body.title,
      categories: req.body.categories,
      subtitles: req.body.subtitles,
      authors: req.body.authors,
      thumbnail: req.body.thumbnail,
      description: req.body.description,
      published_year: req.body.published_year,
      average_rating: req.body.average_rating,
      num_pages: req.body.num_pages,
      ratings_count: req.body.ratings_count
    });

    // Uložení knihy do databáze
    const savedBook = await newBook.save();

    // Odpověď zpět s uloženými daty
    res.json({ status: "Book saved", book: savedBook });
  } catch (error) {
    console.error("Error saving book:", error);
    res.status(500).json({ error: "Error saving book" });
  }
});

// API na získání knížek
app.get("/getBooks", (req, res) => {
  BookModel.find()
  .then(books => res.json(books))
  .catch(err => res.json(err))
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