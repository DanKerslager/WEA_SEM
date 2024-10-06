const winston = require('winston');
const path = require('path');
const fs = require('fs');

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
    // Zapisuje logy do souboru logs/app.log
    new winston.transports.File({ filename: path.join(logDir, 'app.log') })
  ],
});

// Pokud jste v režimu vývoje, logy se budou zobrazovat i v konzoli
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

module.exports = logger;

// rolování souborů - když přeteče filesize
// logger pro errory