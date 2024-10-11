const dotenv = require("dotenv").config({path: __dirname+"\\config.env"})
const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")

// Model pro vytváření dat knížek
const BookModel = require("./models/Books")
const PORT = process.env.PORT || 8002;


const app = express()
// Cors pro propojení mezi aplikací a serverem
app.use(cors())
app.use(express.json())
// Samotné propojení
mongoose.connect("mongodb://sk03-mongo:27017/bookCatalog");

// API na získání knížek
app.get("/getBooks", (req, res) => {
  BookModel.find()
  .then(books => res.json(books))
  .catch(err => res.json(err))
})

app.listen(PORT, () =>{
  console.log("Server is running")
})