const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
  
const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now }
});

const AddressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});
  
const userRatingSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now }
});

const personal = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other", "Prefer not to say"], // Options for gender
  },
  age: {
    type: Number,
    min: 0,
  },
  favoriteGenres: [
    {
      type: String,
    },
  ],
  referenceSource: {
    type: String, // Where did the user find this platform?
  },
});

module.exports = { commentSchema, ratingSchema, AddressSchema, userRatingSchema, personal };