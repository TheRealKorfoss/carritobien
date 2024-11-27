const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:4200', // La URL de tu aplicación Angular
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'Authorization']
}));

// Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
}); 
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

//conexion de Prueba
app.get('/api/test', (req, res) => {
  res.json({ message: 'API funcionando correctamente' });
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

//Ruta para el login
app.post('/api/login', async (req, res) => {
  try {
      const { email, contrasena } = req.body;
      
      // Validar que se proporcionaron email y contraseña
      if (!email || !contrasena) {
          return res.status(400).json({
              success: false,
              message: 'Email y contraseña son requeridos'
          });
      }

      // Consulta para buscar el usuario
      const query = 'SELECT * FROM clientes WHERE email = ?';
      
      connection.query(query, [email], async (error, results) => {
          if (error) {
              console.error('Error en la consulta:', error);
              return res.status(500).json({
                  success: false,
                  message: 'Error en el servidor'
              });
          }

          // Verificar si el usuario existe
          if (results.length === 0) {
              return res.status(401).json({
                  success: false,
                  message: 'Credenciales inválidas'
              });
          }

          const cliente = results[0];
          
          try {
              // Convertir la contraseña almacenada a string si es necesario
              const storedPassword = cliente.password.toString();
              
              // Comparar la contraseña
              const passwordMatch = await bcrypt.compare(contrasena, storedPassword);

              if (!passwordMatch) {
                  return res.status(401).json({
                      success: false,
                      message: 'Credenciales inválidas'
                  });
              }

              // Generar token JWT
              const token = jwt.sign(
                  {
                      userId: cliente.id,
                      email: cliente.email,
                      rol: cliente.rol || 'usuario' // valor por defecto si rol no existe
                  },
                  'tu_clave_secreta', // Cambia esto por una clave secreta segura
                  { expiresIn: '24h' }
              );

              // Enviar respuesta exitosa
              res.json({
                  success: true,
                  message: 'Login exitoso',
                  token,
                  user: {
                      id: cliente.id,
                      nombre: cliente.nombre,
                      email: cliente.email,
                      rol: cliente.rol || 'usuario'
                  }
              });

          } catch (bcryptError) {
              console.error('Error al comparar contraseñas:', bcryptError);
              return res.status(500).json({
                  success: false,
                  message: 'Error en el servidor'
              });
          }
      });

  } catch (error) {
      console.error('Error en el login:', error);
      res.status(500).json({
          success: false,
          message: 'Error en el servidor'
      });
  }
});

//Ruta para el registro
app.post('/api/register', async (req, res) => {
  console.log('Recibiendo petición en /api/register');
  console.log('Cuerpo de la petición:', req.body);
  
  const { nombre, email, telefono, direccion, password } = req.body;
  
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ error: 'La contraseña debe ser una cadena de texto válida' });
  }
  
  // Primero verificamos si el usuario ya existe
  const checkQuery = 'SELECT * FROM clientes WHERE email = ?';
  
  try {
    connection.query(checkQuery, [email], async (error, results) => {
      if (error) {
        console.error('Error en la consulta:', error);
        return res.status(500).json({ error: 'Error en el servidor' });
      }
      
      if (results.length > 0) {
        return res.status(400).json({ error: 'El email ya está registrado' });
      }
      
      try {
        // Generar el hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Insertar el nuevo usuario con rol por defecto (1 para usuario normal)
        const insertQuery = 'INSERT INTO clientes (nombre, email, telefono, direccion, password, rol) VALUES (?, ?, ?, ?, ?, ?)';
        
        connection.query(insertQuery, [nombre, email, telefono, direccion, hashedPassword, 1], (error, results) => {
          if (error) {
            console.error('Error al insertar usuario:', error);
            return res.status(500).json({ error: 'Error al crear usuario' });
          }
          
          const token = jwt.sign(
            { 
              userId: results.insertId, 
              email,
              rol: 1 
            },
            'tu_secret_key',
            { expiresIn: '24h' }
          );
          
          res.status(201).json({
            success: true,
            message: 'Usuario registrado exitosamente',
            token,
            user: {
              id: results.insertId,
              nombre,
              email,
              rol: 1
            }
          });
        });
      } catch (error) {
        console.error('Error al hashear la contraseña:', error);
        res.status(500).json({ error: 'Error en el servidor' });
      }
    });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log('Rutas disponibles:');
  console.log('POST /api/register');
  console.log('GET /api/test');
});