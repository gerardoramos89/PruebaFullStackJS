// src/models/employeeModel.js
// No se necesita archivo separado para modelos en Prisma. Prisma maneja esto a través de `schema.prisma`.
// Asegúrate de definir tu modelo en `prisma/schema.prisma`
// Aquí solo hay un ejemplo para referencia.

// Ejemplo (para referencia, no es necesario si estás usando Prisma)
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getEmployeeById = async (id) => {
  return await prisma.employee.findUnique({ where: { id: Number(id) } });
};

module.exports = { getEmployeeById };
