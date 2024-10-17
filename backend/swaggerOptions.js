// swaggerOptions.js

const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0", // Specify the OpenAPI version
    info: {
      title: "WEA App API",
      version: "1.0.0",
      description: "Semestral app API documentation",
      contact: {
        name: "Dan Keršláger",
        email: "dan.kerslager@tul.cz",
      },
    },
    servers: [
      {
        url: `http://localhost:8002`, // Change this dynamically later if needed
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to your route files to auto-generate docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
