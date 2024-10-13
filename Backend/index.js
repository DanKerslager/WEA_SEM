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