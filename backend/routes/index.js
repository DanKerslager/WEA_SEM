// routes/index.js
const express = require("express");

// Import individual route modules
const getBooksRoute = require("./getBooks");
const getBooksDetailRoute = require("./bookId");
const dataImportRoute = require("./dataImport");
const registerRoute = require("./register");
const loginRoute = require("./login");
const addCommentRoute = require("./addComment");
const setFavoriteRoute = require("./setFavorite");

// Function to initialize all routes
const initializeRoutes = (app) => {
  app.use("/getBooks", getBooksRoute);          // Retrieve books
  app.use("/getBooks", getBooksDetailRoute);     // Retrieve book detail
  app.use("/data", dataImportRoute);             // Import books into the database
  app.use("/register", registerRoute);           // Register a new user
  app.use("/login", loginRoute);                 // Login a user
  app.use("/getBooks", addCommentRoute);         // Add a comment to a book
  app.use("/setFavorite", setFavoriteRoute);     // Set a book as favorite
};

module.exports = initializeRoutes;