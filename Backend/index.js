const express = require('express');
const logger = require('./logger');  // Import loggeru
const errorLogger = require('./logger');  // Import loggeru
const path = require('path');        // Modul pro práci s cestami

const app = express();

// Nastavení složky public jako složky pro statické soubory (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Základní routa - logování při přístupu na hlavní stránku
app.get('/', (req, res) => {
  logger.info('Root endpoint was hit');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Spuštění serveru na portu 3000 a logování
const PORT = 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  console.log(`Server is running on port ${PORT}`);
});

// časem rozsekat