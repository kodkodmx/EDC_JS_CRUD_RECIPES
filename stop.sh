#!/bin/bash

# Detener el servidor MySQL
echo "Deteniendo el servidor MySQL..."
sudo service mysql stop

# Detener el servidor Express
echo "Deteniendo el servidor Express..."
pkill -f "node index.js"

# Detener el servidor HTTP en vivo
echo "Deteniendo el servidor HTTP en vivo..."
pkill -f "live-server"

echo "Todos los servicios han sido detenidos."