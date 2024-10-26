const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const recetasRouter = require('./routes/recetas');

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend')));

app.use(express.json());
app.use('/recetas', recetasRouter);

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://0.0.0.0:${port}`);
});