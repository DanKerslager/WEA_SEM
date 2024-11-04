// /backend/index.js
const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const logger = require('./logger');

// Create an instance of express and add dependencies
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// If you’re using other parsers like urlencoded, also set a limit
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// MongoDB connection URI
const mongoURI = `mongodb://${process.env.DB_User}:${process.env.DB_Password}@${process.env.DB_Host}:${process.env.DB_Port}/${'bookCatalog'}?authSource=admin`;

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });

// Port for the backend to listen to from the environment variable
const PORT = process.env.PORT || 8002;

// Import routes
const getBooksRoute = require('./routes/getBooks');
const getBooksDetailRoute = require('./routes/bookId');
const dataImportRoute = require('./routes/dataImport');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const addCommentRoute = require('./routes/addComment');

// Use routes
app.use('/getBooks', getBooksRoute);  // The /getBooks route, used by frontend to retrieve books
app.use('/getBooks', getBooksDetailRoute);  // The /getBooks/:id route, used by frontend to retrieve book detail
app.use('/data', dataImportRoute);    // The /data route, that imports the books into the database
app.use('/register', registerRoute); // The /register route, used to register a new user
app.use('/login', loginRoute);      // The /login route, used to login a user
app.use('/getBooks', addCommentRoute); // The /addcomment route, used to add a comment to a book

// Swagger UI setup and route
const swaggerDocs = require('./swaggerOptions'); // Import the swagger options

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Základní routa - logování při přístupu na hlavní stránku
app.get('/', (req, res) => {
  console.log("endpoint was hit");
  logger.info('Root endpoint was hit');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Setting the public file for static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/logs', express.static(path.join(__dirname, 'logs')));

// Start server and listen on port
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  console.log(`Server is running on port ${PORT}`);
});
