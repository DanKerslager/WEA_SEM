// controllers/userController.js
const bcrypt = require('bcrypt');
const User = require('../models/Users'); // Assuming your User model is in the models folder

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

  return { message: 'Logged in successfully', user: { email: user.email, username: user.username, } };
};

// Function to set or unset a favorite book for a user
const setFavBook = async (userId, bookId, isFavorite) => {
  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return { success: false, message: "User not found." };
    }

    if (isFavorite) {
      // Add the book to favorites if not already present
      if (!user.favoriteBooks.includes(bookId)) {
        user.favoriteBooks.push(bookId);
        await user.save();
        return { success: true, message: "Book has been added to favorites." };
      } else {
        return { success: false, message: "Book is already in favorites." };
      }
    } else {
      // Remove the book from favorites if present
      user.favoriteBooks = user.favoriteBooks.filter(
        (favoriteBookId) => !favoriteBookId.equals(bookId)
      );
      await user.save();
      return { success: true, message: "Book has been removed from favorites." };
    }
  } catch (error) {
    return { success: false, message: "Error updating favorite status: " + error.message };
  }
};

// Export the controller functions
module.exports = {
  registerUser,
  loginUser,
  setFavBook
};
