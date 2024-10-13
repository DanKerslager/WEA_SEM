const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    isbn13: String,
    isbn10: String,
    title: String,
    categories: String,
    subtitle: String,
    authors: String,
    thumbnail: String,
    description: String,
    published_year: Number,
    average_rating: Number,
    num_pages: Number,
    ratings_count: Number
});

const BookModel = mongoose.model("books", BookSchema);
module.exports = BookModel;
