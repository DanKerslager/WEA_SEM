const mongoose = require("mongoose");
const { AddressSchema, userRatingSchema, personal } = require("./Schemes");

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
  billingAddress: AddressSchema, // Embeds billing address
  sameAsPersonalAddress: {
    type: Boolean,
    default: false, // Flag to indicate if billing and personal addresses are the same
  },
  consentToDataProcessing: {
    type: Boolean,
    default: false,
  },
  personalInfo: personal,
});

// Vytvoření modelu
const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
