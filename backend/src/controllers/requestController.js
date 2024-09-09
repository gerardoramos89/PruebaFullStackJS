const prisma = require('../db/prismaClient');

const createRequest = async (req, res) => {
  const { description } = req.body;

  try {
    const request = await prisma.request.create({
      data: {
        description,
      },
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ error: 'Error creating request' });
  }
};

const getAllRequests = async (req, res) => {
  try {
    const requests = await prisma.request.findMany();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching requests' });
  }
};

module.exports = { createRequest, getAllRequests };
