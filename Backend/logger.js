const winston = require('winston');
const path = require('path');
const fs = require('fs');
require('winston-daily-rotate-file');


// Vytvoření složky pro logy, pokud ještě neexistuje
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}


// Vytvoření a konfigurace loggeru

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    // Daily rotating transport for general logs
    new winston.transports.DailyRotateFile({
      filename: path.join(logDir, 'app-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
      level: 'info', // Only info-level logs and higher will be logged here
    }),
  ],
});

// Create a separate logger for error logs
const errorLogger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    // Daily rotating transport for error logs
    new winston.transports.DailyRotateFile({
      filename: path.join(logDir, 'error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '30d',
      level: 'error', // Only error-level logs will be logged here
    }),
  ],
});

// Optionally log to the console during development for both loggers

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));

  errorLogger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

module.exports = { logger, errorLogger };
