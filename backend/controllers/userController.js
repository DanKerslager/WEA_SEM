// controllers/userController.js
const bcrypt = require('bcrypt');
const User = require('../models/Users'); // Assuming your User model is in the models folder
const mongoose = require("mongoose");
const logAuditEvent = require('./AuditLogController'); // Import the audit log controller

// Function to register a new user
const registerUser = async (username, email, password) => {
  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash the password before saving it
  const saltRounds = 10; // You can adjust this for security/performance
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create and save the new user
  const newUser = new User({ username, email, password: hashedPassword }); // Store the hashed password
  await newUser.save();

  // Log the user registration event
  await logAuditEvent.logAuditEvent('user_registration', user.username, { email });

  return { message: 'User registered successfully' };
};

// Function to log in a user
const loginUser = async (email, password) => {
  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Compare the provided password with the hashed password in the database
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  // Log the user login event
  await logAuditEvent.logAuditEvent('user_login', user.username, { email });

  // Return the user data with favorites and user ID
  return {
    message: 'Logged in successfully',
    user: {
      userId: user._id,
      email: user.email,
      username: user.username,
      favorites: user.favoriteBooks, // Assuming 'favoriteBooks' is an array in the user schema
      ratedBooks: user.ratings, // Assuming 'ratedBooks' is an array in the user schema
    },
  };
};

// Function to set or unset a favorite book for a user and return the updated favorites
const setFavBook = async (userId, bookId, isFavorite) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      return { success: false, message: "User not found." };
    }

    if (isFavorite) {
      // Add the book to favorites if not already present
      if (!user.favoriteBooks.includes(bookId)) {
        user.favoriteBooks.push(bookId);
        await user.save();
        return {
          success: true,
          message: "Book has been added to favorites.",
          favorites: user.favoriteBooks,
        };
      } else {
        return {
          success: false,
          message: "Book is already in favorites.",
          favorites: user.favoriteBooks,
        };
      }
    } else {
      // Remove the book from favorites if present
      user.favoriteBooks = user.favoriteBooks.filter(
        (favoriteBookId) => !favoriteBookId.equals(bookId)
      );
      await user.save();
      return {
        success: true,
        message: "Book has been removed from favorites.",
        favorites: user.favoriteBooks,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Error updating favorite status: " + error.message,
      favorites: [],
    };
  }
};

// Function to update the address
const updateAddress = async (userId, personalAddress, billingAddress, sameAsPersonalAddress) => {
  const update = {};

  // Add personal address to update object
  if (personalAddress) {
    update.personalAddress = personalAddress;
  }

  // Handle billing address logic
  if (sameAsPersonalAddress) {
    update.billingAddress = personalAddress; // Set billing address same as personal address
  } else if (billingAddress) {
    update.billingAddress = billingAddress; // Update billing address separately if provided
  }

  // Find the user and update the address fields
  const updatedUser = await User.findByIdAndUpdate(userId, update, { new: true, runValidators: true });
  if (!updatedUser) {
    throw new Error('User not found');
  }

  return {
    message: 'Address updated successfully',
    user: {
      userId: updatedUser._id,
      personalAddress: updatedUser.personalAddress,
      billingAddress: updatedUser.billingAddress,
      sameAsPersonalAddress: updatedUser.sameAsPersonalAddress,
    },
  };
};

// Function to update personal info
const updatePersonalInfo = async (userId, personalInfo) => {
  // Find the user and update the personalInfo fields
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { personalInfo },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    throw new Error('User not found');
  }

  return {
    message: 'Personal information updated successfully',
    user: {
      userId: updatedUser._id,
      personalInfo: updatedUser.personalInfo,
    },
  };
};

// Export the controller functions
module.exports = {
  registerUser,
  loginUser,
  setFavBook,
  updateAddress,
  updatePersonalInfo,
};
