const express = require('express');
const path = require('path');
const app = express();

// Servir frontend
app.use('/', express.static(path.join(__dirname, 'frontend')));

// Ruta API
app.use('/api', require('./api/registro'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});