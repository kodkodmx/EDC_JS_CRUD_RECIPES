const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'recetas_db',
  port: 3306
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos como id ' + connection.threadId);
});

// Obtener todas las recetas
router.get('/', (req, res) => {
  connection.query('SELECT * FROM recetas', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Crear una nueva receta
router.post('/', (req, res) => {
  const { nombre, descripcion } = req.body;
  connection.query('INSERT INTO recetas (nombre, descripcion, votos) VALUES (?, ?, 0)', [nombre, descripcion], (error, results) => {
    if (error) throw error;
    res.status(201).json({ id: results.insertId, nombre, descripcion, votos: 0 });
  });
});

// Alternar estado de favorita
router.put('/:id/favorita', (req, res) => {
  const { id } = req.params;
  connection.query('UPDATE recetas SET es_favorita = NOT es_favorita WHERE id = ?', [id], (error) => {
    if (error) throw error;
    res.sendStatus(204);
  });
});

// Votar por una receta
router.put('/:id/votar', (req, res) => {
  const { id } = req.params;
  connection.query('UPDATE recetas SET votos = votos + 1 WHERE id = ?', [id], (error) => {
    if (error) throw error;
    res.sendStatus(204);
  });
});

module.exports = router;