// app/backend/logger.js

const winston = require('winston');
const path = require('path');
const fs = require('fs');
const DailyRotateFile = require('winston-daily-rotate-file');

// Create the logs directory if it doesn't exist
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

// Create a logger instance
const logger = winston.createLogger({
    level: 'info', // Set the default log level
    format: winston.format.combine(
        winston.format.timestamp(), // Add timestamp to logs
        winston.format.json() // Log in JSON format
    ),
    transports: [
        // Daily rotate file for error logs
        new DailyRotateFile({
            filename: path.join(logsDir, 'error-%DATE%.log'), // Error logs
            datePattern: 'YYYY-MM-DD', // Date format
            zippedArchive: true, // Compress old logs
            maxSize: '20m', // Maximum size of each log file
            maxFiles: '14d', // Keep logs for 14 days
            level: 'error', // Only log error level messages
        }),
        // Daily rotate file for combined logs
        new DailyRotateFile({
            filename: path.join(logsDir, 'combined-%DATE%.log'), // Combined logs
            datePattern: 'YYYY-MM-DD', // Date format
            zippedArchive: true, // Compress old logs
            maxSize: '20m', // Maximum size of each log file
            maxFiles: '14d', // Keep logs for 14 days
        }),
    ],
});

// If you want to log to console as well, uncomment the following line
// logger.add(new winston.transports.Console({ format: winston.format.simple() }));

// Export the logger instance
module.exports = logger;
