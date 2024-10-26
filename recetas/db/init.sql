CREATE DATABASE recetas_db;

USE recetas_db;

CREATE TABLE recetas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    es_favorita BOOLEAN DEFAULT FALSE,
    votos INT DEFAULT 0
);