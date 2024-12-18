// /backend/index.js
const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const logger = require('./logger');
const initializeRoutes = require("./routes");

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
    logger.info("MongoDB connected successfully");
    console.log("MongoDB connected successfully");
  })
  .catch(err => {
    logger.info("MongoDB connection error:", err);
  });

// Initialize routes
initializeRoutes(app);

// Swagger UI setup and route
const swaggerDocs = require('./swaggerOptions'); // Import the swagger options

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Základní routa - logování při přístupu na hlavní stránku
app.get('/', (req, res) => {
  logger.info('Root endpoint was hit');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Setting the public file for static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 8002;
// Start server and listen on port
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
