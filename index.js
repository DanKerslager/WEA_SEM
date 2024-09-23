const express = require('express');
const app = express();

// Definování základní cesty, která vrací Hello World
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Spuštění serveru na portu 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
