const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../db/prismaClient'); // Asegúrate de que el cliente Prisma esté exportado correctamente desde este archivo

const register = async (req, res) => {
  const { email, password, name, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    // Registrar el error en el servidor para diagnóstico
    console.error('Error creating user:', error);

    // Enviar una respuesta de error más informativa al cliente
    if (error.name === 'ValidationError') {
      // Ejemplo: error de validación
      res.status(400).json({ error: 'Invalid input data', details: error.message });
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      // Ejemplo: error de duplicado en MongoDB
      res.status(409).json({ error: 'Email already in use' });
    } else {
      // Error general
      res.status(500).json({ error: 'Error registering user', details: 'An unexpected error occurred' });
    }
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token, role: user.role });
  } catch (error) {

    // Registrar el error en el servidor para diagnóstico
    console.error('Error login user:', error);

    // Enviar una respuesta de error más informativa al cliente
    if (error.name === 'ValidationError') {
      // Ejemplo: error de validación
      res.status(400).json({ error: 'Invalid input data', details: error.message });
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      // Ejemplo: error de duplicado en MongoDB
      res.status(409).json({ error: 'Email already in use' });
    } else {
      // Error general
      res.status(500).json({ error: 'Error registering user', details: 'An unexpected error occurred' });
    }

  }
};

module.exports = { register, login };
