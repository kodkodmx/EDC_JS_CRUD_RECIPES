const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Configuración de la conexión a la base de datos
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

// Agregar una nueva receta
router.post('/', (req, res) => {
  const { nombre, descripcion } = req.body;
  connection.query('INSERT INTO recetas (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion], (error, results) => {
    if (error) throw error;
    res.status(201).json({ id: results.insertId, nombre, descripcion });
  });
});

// Votar una receta
router.put('/:id/votar', (req, res) => {
  const id = parseInt(req.params.id);
  connection.query('SELECT * FROM recetas WHERE id = ?', [id], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      const receta = results[0];
      connection.query('UPDATE recetas SET votos = votos + 1 WHERE id = ?', [id], (error) => {
        if (error) throw error;
        res.json({ ...receta, votos: receta.votos + 1 });
      });
    } else {
      res.status(404).send('Receta no encontrada');
    }
  });
});

// Marcar una receta como favorita
router.put('/:id/favorita', (req, res) => {
  const id = parseInt(req.params.id);
  connection.query('SELECT * FROM recetas WHERE id = ?', [id], (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      const receta = results[0];
      const nueva_favorita = !receta.es_favorita;
      connection.query('UPDATE recetas SET es_favorita = ? WHERE id = ?', [nueva_favorita, id], (error) => {
        if (error) throw error;
        res.json({ ...receta, es_favorita: nueva_favorita });
      });
    } else {
      res.status(404).send('Receta no encontrada');
    }
  });
});

module.exports = router;