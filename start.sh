#!/bin/bash

# Iniciar el servidor MySQL
echo "Iniciando el servidor MySQL..."
sudo service mysql start

# Iniciar el servidor Express
echo "Iniciando el servidor Express..."
cd /workspaces/EDC_JS_CRUD_RECIPES/recetas/backend
npm start &

# Iniciar el servidor HTTP en vivo
echo "Iniciando el servidor HTTP en vivo..."
cd /workspaces/EDC_JS_CRUD_RECIPES/recetas/frontend
live-server --port=8080 &

# Esperar unos segundos para asegurarse de que los servidores estén corriendo
sleep 5

echo "Todos los servicios están corriendo. Por favor, expón los puertos 3000 y 8080 manualmente en la interfaz de GitHub Codespaces."