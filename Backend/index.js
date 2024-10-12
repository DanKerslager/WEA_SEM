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
// Samotné propojení
mongoose.connect("mongodb://sk03-mongo:27017/bookCatalog");

const PORT = process.env.PORT || 8002;
console.log("running index");

// API na získání knížek
app.get("/getBooks", (req, res) => {
  BookModel.find()
  .then(books => res.json(books))
  .catch(err => res.json(err))
})

// Nastavení složky public jako složky pro statické soubory (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Základní routa - logování při přístupu na hlavní stránku
app.get('/', (req, res) => {
  console.log("endpoint was hit");
  logger.info('Root endpoint was hit');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Spuštění serveru na portu 3000 a logování
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  console.log(`Server is running on port ${PORT}`);
});

// časem rozsekat