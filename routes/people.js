const express = require('express');
const controller = require('./../controllers/people-controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Person
 *   description: Manage person data on mongoDB
 * definitions:
 *   Person:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         required: true
 *         description: Person's name
 *       email:
 *         type: string
 *         required: false
 *         format: email
 *         description: Person's email
 *       age:
 *         type: number
 *         required: false
 *         description: Person's age
 */

// Create -> POST
router.post('/', controller.createPerson);

// Read -> GET
/**
 * @swagger
 * path:
 *  /api/people:
 *    get:
 *      tags: [Person]
 *      summary: Get all people in collection
 *      requestBody:
 *        required: false
 *      responses:
 *        "200":
 *          description: Data is available. Returns an array of people in collection
 *        "400":
 *          description: Couldn't connect to database or an unexpected error occurred.
 */
router.get('/', controller.getPeople);
router.get('/:id', controller.getPeople);

// Update -> PUT
router.put('/:id', controller.updatePerson);

// Delete -> DELETE
router.delete('/:id', controller.deletePerson);

module.exports = router;
