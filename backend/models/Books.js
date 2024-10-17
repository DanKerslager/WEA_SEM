const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    isbn13: {
        type: String,
        required: true, // povinné pole
        minlength: 13,
        maxlength: 13,
        unique: true, // zajistí, že každá kniha bude mít jedinečné ISBN
    },
    isbn10: {
        type: String,
        required: true, // povinné pole
        minlength: 10,
        maxlength: 10,
        unique: true,
    },
    title: {
        type: String,
        required: true, // povinné pole
        maxlength: 255,
    },
    categories: {
        type: String,
        required: false, // volitelné pole
    },
    subtitle: {
        type: String,
        required: false, // volitelné pole
    },
    authors: {
        type: String,
        required: false, // volitelné pole
    },
    thumbnail: {
        type: String,
        required: false, // volitelné pole
    },
    description: {
        type: String,
        required: false, // volitelné pole
    },
    published_year: {
        type: Number,
        required: false, // volitelné pole
    },
    average_rating: {
        type: Number,
        required: false, // volitelné pole
    },
    num_pages: {
        type: Number,
        required: false, // volitelné pole
    },
    ratings_count: {
        type: Number,
        required: false, // volitelné pole
    }
});

// Vytvoření modelu
const BookModel = mongoose.model("books", BookSchema);
module.exports = BookModel;
