const mongoose = require("mongoose")

const BookMockSchema = new mongoose.Schema( {
    isbn13: String,
    isbn10: String,
    title: String,
    categories: String,
    subtitles: String,
    authors: String,
    thumbnail: String,
    description: String,
    published_year: String,
    average_rating: String,
    num_pages: Number,
    ratings_count: Number
})
