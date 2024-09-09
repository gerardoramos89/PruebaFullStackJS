// src/models/User.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUsers = async () => {
  return await prisma.user.findMany();
};

const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id: parseInt(id, 10) }
  });
};

const createUser = async (data) => {
  return await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      role: data.role
    }
  });
};

const updateUser = async (id, data) => {
  return await prisma.user.update({
    where: { id: parseInt(id, 10) },
    data: {
      email: data.email,
      name: data.name,
      role: data.role
    }
  });
};

const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id: parseInt(id, 10) }
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
