// /backend/index.js

const express = require('express');
const logger = require('./logger');
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');

// Import routes
const getBooksRoute = require('./routes/getBooks');
const dataImportRoute = require('./routes/dataImport');

// Model for book database
const BookModel = require("./models/Books");

// Create an instance of express and add dependencies
const app = express();
app.use(cors());
app.use(express.json());

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

// Use routes
app.use('/getBooks', getBooksRoute);  // The /getBooks route, used by frontend to retrieve books
app.use('/data', dataImportRoute);    // The /data route, that imports the books into the database

// Basic route to the main page
app.get('/', (req, res) => {
  console.log("endpoint was hit");
  logger.info('Root endpoint was hit');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Setting the public file for static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Start server and listen on port
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  console.log(`Server is running on port ${PORT}`);
});
