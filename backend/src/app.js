const express = require('express');
const cors = require('cors');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const employeeController = require('./controllers/employeeController');
const authMiddleware = require('./middlewares/authMiddleware');
const authController = require('./controllers/authController');


const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'API documentation for your project',
      },
    },
    apis: ['./src/routes/*.js'], // Cambia esta ruta a donde tienes tus archivos de rutas
  };

const swaggerDocs = swaggerJsDoc(swaggerOptions);
const corsOptions = {
  origin: 'http://localhost:3000', // El origen del frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(express.json());
app.use(cors(corsOptions));

// Rutas para empleados
app.post('/employees', authMiddleware, employeeController.createEmployee);
app.get('/employees', authMiddleware, employeeController.getAllEmployees);
app.get('/employees/:id', authMiddleware, employeeController.getEmployeeById);
app.put('/employees/:id', authMiddleware, employeeController.updateEmployee);
app.delete('/employees/:id', authMiddleware, employeeController.deleteEmployee);

// Otros controladores
app.post('/auth/register', authController.register);
app.post('/auth/login', authController.login);

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;
