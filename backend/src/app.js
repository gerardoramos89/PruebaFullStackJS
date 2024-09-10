const express = require('express');
const cors = require('cors');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const employeeController = require('./controllers/employeeController');
const authController = require('./controllers/authController');


// Middleware para desactivar el caché en todas las respuestas
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});


// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for your project',
    },
  },
  apis: ['./src/routes/*.js'], // Ruta donde están tus archivos de rutas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:3000', // El origen del frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(express.json());
app.use(cors(corsOptions));

// Rutas para empleados (sin autenticación)
app.post('/employees', employeeController.createEmployee);
app.get('/employees', employeeController.getAllEmployees);

// Otros controladores (con autenticación)
app.post('/auth/register', authController.register);
app.post('/auth/login', authController.login);

// Documentación Swagger
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;
