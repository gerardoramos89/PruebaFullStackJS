const express = require('express');
const router = express.Router();
const { getEmployees, createEmployee } = require('../controllers/employeeController');

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
 *                   position:
 *                     type: string
 *                     description: The employee's position
 *                     example: Developer
 *       500:
 *         description: Internal server error
 */
router.get('/', getEmployees);

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
 *               position:
 *                 type: string
 *                 example: Manager
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
 *                 position:
 *                   type: string
 *                   example: Manager
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', createEmployee);

module.exports = router;
