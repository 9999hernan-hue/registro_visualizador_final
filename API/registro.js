const express = require('express');
const router = express.Router();

router.get('/registro', (req, res) => {
  res.json({ mensaje: 'API funcionando en Render' });
});

module.exports = router;