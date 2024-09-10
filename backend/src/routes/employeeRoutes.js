const express = require('express');
const router = express.Router();
const { getAllEmployees, createEmployee } = require('../controllers/employeeController');

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Employee management
 */

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
router.get('/', getAllEmployees);

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
router.post('/', createEmployee);

module.exports = router;
