
const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")

// Model pro vytváření dat knížek
const { BookModel, BookMockModel } = require("./models/Books")
const PORT = process.env.PORT || 8002;


const app = express()
// Cors pro propojení mezi aplikací a serverem
app.use(cors())
app.use(express.json())
// Samotné propojení
//mongoose.connect("mongodb://sk03-mongo:27017/bookCatalog");
mongoose.connect("process.env.CONNECTION_STRING");

// API na získání knížek se stránkováním a filtrováním  
app.get("/books", async (req, res) => {
  try {
    // proměnné pro stránkování
    let page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10
    // proměnné pro filtraci
    let author = req.query.author
    let genre = req.query.genre
    let title = req.query.title
    console.log(title)
    //Vytvoř filter objekt, query parametrů poslané přes URL
    let filter = {};
    if (author) {
      filter.author = author; // Filtrace autora
    }
    if (genre) {
      filter.genre = genre; // Filtrace žánru
    }
    if (title) {
      filter.title = title; // Filtrace názvu
    }
    //vypočítání stránkování
    const skip = (page - 1) * limit;
    //filtrace
    let books = await BookMockModel.find(filter).skip(skip).limit(limit)

    const totalBooks = await BookMockModel.countDocuments();
    res.status(200).json({
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
      books,
      
    })
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//API na získání dat z cdb network
app.post("/data", async (req, res) => {
  try {
    // uložení do hlavní tabulky, kde budou data z cdb
    let sendBook = await BookModel.save()
    res.status(200).json(sendBook)
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
})


app.listen(PORT, () => {
  console.log("Server is running")
})