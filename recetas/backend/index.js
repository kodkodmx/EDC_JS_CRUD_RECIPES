const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const recetasRouter = require('./routes/recetas');

// Configurar CORS para permitir solicitudes desde cualquier origen
app.use(cors());
app.use(express.json());
app.use('/recetas', recetasRouter);

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Recetas');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});