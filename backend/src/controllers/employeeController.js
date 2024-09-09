// src/controllers/employeeController.js
const prisma = require('../db/prismaClient');

const createEmployee = async (req, res) => {
  try {
    const { name, position } = req.body;
    const employee = await prisma.employee.create({
      data: { name, position },
    });
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Error creating employee' });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving employees' });
  }
};
/**
 * @openapi
 * /employees/{id}:
 *   get:
 *     summary: Get employee by ID
 *     description: Retrieves a single employee by their ID.
 *     tags:
 *       - Employees
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the employee to retrieve
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Employee details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 position:
 *                   type: string
 *                   example: Software Engineer
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await prisma.employee.findUnique({ where: { id: Number(id) } });
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving employee' });
  }
};
/**
 * @openapi
 * /employees/{id}:
 *   put:
 *     summary: Update employee details
 *     description: Updates the details of an existing employee.
 *     tags:
 *       - Employees
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the employee to update
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               position:
 *                 type: string
 *                 example: Senior Software Engineer
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 position:
 *                   type: string
 *                   example: Senior Software Engineer
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position } = req.body;
    const employee = await prisma.employee.update({
      where: { id: Number(id) },
      data: { name, position },
    });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Error updating employee' });
  }
};
/**
 * @openapi
 * /employees/{id}:
 *   delete:
 *     summary: Delete an employee
 *     description: Deletes an employee by their ID.
 *     tags:
 *       - Employees
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the employee to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.employee.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting employee' });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
