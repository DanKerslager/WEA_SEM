const mongoose = require("mongoose");
const { commentSchema, ratingSchema } = require("./Schemes");

const BookSchema = new mongoose.Schema({
  isbn13: { type: String, required: true, minlength: 13, maxlength: 13, unique: true },
  isbn10: { type: String, required: true, minlength: 10, maxlength: 10, unique: true },
  title: { type: String, required: true, maxlength: 255 },
  categories: String,
  subtitle: String,
  authors: String,
  thumbnail: String,
  description: String,
  published_year: Number,
  // External ratings info
  average_rating: { type: Number, required: false, default: 0 },
  ratings_count: { type: Number, required: false, default: 0 },
  num_pages: Number,
  price: { type: Number, required: false, min: 0, set: v => Math.round(v * 100) / 100, // Zaokrouhlení na dvě desetinná místa
  },
  available: { type: Boolean, default: false },
  comments: [commentSchema],
  user_ratings: [ratingSchema]
});

// Function to calculate the combined average rating and total ratings count
BookSchema.methods.updateAverageAndCount = function () {
  const userRatings = this.user_ratings.map(r => r.rating);
  const userRatingsTotal = userRatings.reduce((acc, rating) => acc + rating, 0);
  const userRatingsCount = userRatings.length;

  // Combined ratings count
  const combinedRatingsCount = this.ratings_count + userRatingsCount;
  const combinedRatingsTotal = (this.average_rating * this.ratings_count) + userRatingsTotal;

  // Update the average rating and ratings count based on combined data
  this.average_rating = combinedRatingsCount ? (combinedRatingsTotal / combinedRatingsCount) : 0;
  this.ratings_count = combinedRatingsCount;
};

// Middleware to update combined average and ratings count before saving
BookSchema.pre('save', function (next) {
  if (this.isModified('user_ratings') || this.isModified('average_rating') || this.isModified('ratings_count')) {
    this.updateAverageAndCount();
  }
  next();
});

// Create the Book model
const BookModel = mongoose.model("books", BookSchema);
module.exports = BookModel;
