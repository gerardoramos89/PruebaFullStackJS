const prisma = require('../db/prismaClient'); // Asegúrate de que el cliente Prisma esté correctamente importado

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Retrieve all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The employee ID
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The employee's name
 *                     example: John Doe
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The employee's creation date
 *                     example: 2024-09-09T00:00:00Z
 *                   salary:
 *                     type: number
 *                     format: float
 *                     description: The employee's salary
 *                     example: 50000.00
 *       500:
 *         description: Internal server error
 */
const getAllEmployees = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Error fetching employees' });
  }
};

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Doe
 *               salary:
 *                 type: number
 *                 format: float
 *                 example: 60000.00
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The employee ID
 *                   example: 2
 *                 name:
 *                   type: string
 *                   example: Jane Doe
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-09-09T00:00:00Z
 *                 salary:
 *                   type: number
 *                   format: float
 *                   example: 60000.00
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
const createEmployee = async (req, res) => {
  const { name, salary } = req.body;

  try {
    const employee = await prisma.employee.create({
      data: {
        name,
        salary: parseFloat(salary),
      },
    });
    res.status(201).json(employee);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ error: 'Error creating employee' });
  }
};

module.exports = { getAllEmployees, createEmployee };
