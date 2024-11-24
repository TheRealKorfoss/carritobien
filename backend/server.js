const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de la conexión MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',     // Cambia esto si tienes un usuario diferente
  password: '',     // Cambia esto si tienes una contraseña
  database: 'joyaslocas'
});

// Verificar conexión
connection.connect(error => {
  if (error) {
    console.error('Error conectando a la base de datos:', error);
    return;
  }
  console.log('Conectado exitosamente a la base de datos MySQL');
});

// Ruta para obtener productos
app.get('/api/productos', (req, res) => {
  const query = 'SELECT * FROM productos';
  
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).json({ error: 'Error al obtener productos' });
      return;
    }
    res.json(results);
  });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});