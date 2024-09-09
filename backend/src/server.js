const app = require('./app');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

dotenv.config();

const prisma = new PrismaClient();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

prisma.$on('error', (error) => {
  console.error('Prisma error:', error);
});
