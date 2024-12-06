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
const addRatingRoute = require("./addRating");
const userAddressRoute = require("./userAddress");
const userDetailRoute = require("./userDetail");
const createOrderRoute = require("./createOrder");
const getOrdersRoute = require("./getOrders");

// Function to initialize all routes
const initializeRoutes = (app) => {
  app.use("/getBooks", getBooksRoute);           // Retrieve books
  app.use("/getBooks", getBooksDetailRoute);     // Retrieve book detail
  app.use("/data", dataImportRoute);             // Import books into the database
  app.use("/register", registerRoute);           // Register a new user
  app.use("/login", loginRoute);                 // Login a user
  app.use("/getBooks", addCommentRoute);         // Add a comment to a book
  app.use("/setFavorite", setFavoriteRoute);     // Set a book as favorite
  app.use("/getBooks", addRatingRoute);          // Add a rating to a book
  app.use("/user", userAddressRoute);            // Add a user address
  app.use("/user", userDetailRoute);             // Get user details
  app.use("/createOrder", createOrderRoute);     // Create an order
  app.use("/getOrders", getOrdersRoute);         // Get orders
};

module.exports = initializeRoutes;
