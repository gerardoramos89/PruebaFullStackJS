const express = require('express');
const router = express.Router();
const { getRequests, createRequest, deleteRequest } = require('../controllers/requestController');

/**
 * @swagger
 * tags:
 *   name: Requests
 *   description: Request management
 */

/**
 * @swagger
 * /requests:
 *   get:
 *     summary: Retrieve all requests
 *     tags: [Requests]
 *     responses:
 *       200:
 *         description: A list of requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The request ID
 *                     example: 1
 *                   title:
 *                     type: string
 *                     description: The title of the request
 *                     example: Request Title
 *                   description:
 *                     type: string
 *                     description: The description of the request
 *                     example: Detailed description of the request
 *       500:
 *         description: Internal server error
 */
router.get('/', getRequests);

/**
 * @swagger
 * /requests:
 *   post:
 *     summary: Create a new request
 *     tags: [Requests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: New Request
 *               description:
 *                 type: string
 *                 example: This is a new request
 *     responses:
 *       201:
 *         description: Request created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The request ID
 *                   example: 2
 *                 title:
 *                   type: string
 *                   example: New Request
 *                 description:
 *                   type: string
 *                   example: This is a new request
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
//router.post('/', createRequest);
router.post('/', authMiddleware, authorize(['administrador']), createRequest); // Inserción permitida solo para administradores

/**
 * @swagger
 * /requests/{id}:
 *   delete:
 *     summary: Delete a request by ID
 *     tags: [Requests]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the request to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Request deleted successfully
 *       404:
 *         description: Request not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authMiddleware, authorize(['administrador']), deleteUser); // Eliminación permitida solo para administradores

module.exports = router;
