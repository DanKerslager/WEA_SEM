const mongoose = require("mongoose");

// Address schema for storing personal and billing addresses
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


// User schema, users are defined by their email and nickname
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    maxlength: 10,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  favoriteBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books", // Reference to Book model
    },
  ],
  ratings: [userRatingSchema],
  personalAddress: AddressSchema, // Embeds personal address
  billingAddress: {
    type: AddressSchema, // Embeds billing address
  },
  sameAsPersonalAddress: {
    type: Boolean,
    default: false, // Flag to indicate if billing and personal addresses are the same
  },
  consentToDataProcessing: {
    type: Boolean,
    default: false,
  },
  personalInfo: {
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
    
  },
});
// Vytvoření modelu
const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
