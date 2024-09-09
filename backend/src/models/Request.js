// src/models/Request.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getRequests = async () => {
  return await prisma.request.findMany();
};

const getRequestById = async (id) => {
  return await prisma.request.findUnique({
    where: { id: parseInt(id, 10) }
  });
};

const createRequest = async (data) => {
  return await prisma.request.create({
    data: {
      description: data.description
    }
  });
};

const updateRequest = async (id, data) => {
  return await prisma.request.update({
    where: { id: parseInt(id, 10) },
    data: {
      description: data.description
    }
  });
};

const deleteRequest = async (id) => {
  return await prisma.request.delete({
    where: { id: parseInt(id, 10) }
  });
};

module.exports = {
  getRequests,
  getRequestById,
  createRequest,
  updateRequest,
  deleteRequest
};
