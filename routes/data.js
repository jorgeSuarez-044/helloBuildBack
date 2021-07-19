const express = require('express');
const controller = require('./../controllers/data-controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Data
 *   description: Manage data on firestore
 * definitions:
 *   Data:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         required: false
 *         description: Person's name
 *       email:
 *         type: string
 *         required: false
 *         format: email
 *         description: Person's email
 *       phone:
 *         type: number
 *         required: false
 *         description: Person's age
 *       password:
 *         type: string
 *         required: false
 *         format: email
 *         description: Person's email
 */

/**
 * @swagger
 * path:
 *  /api/data:
 *    get:
 *      tags: [Data]
 *      summary: Get all items in collection
 *      requestBody:
 *        required: false
 *      responses:
 *        "200":
 *          description: Data is available. Returns an array of items in collections
 *        "500":
 *          description: Couldn't connect to database or an unexpected error occurred.
 */
router.get('/', controller.getItemsFromDb);

/**
 * @swagger
 * path:
 *  /api/data/{id}:
 *    get:
 *      tags: [Data]
 *      summary: Get a specific item in collection
 *      parameters:
 *        - name: id
 *          required: false
 *          type: string
 *          in: path
 *      requestBody:
 *        required: false
 *      responses:
 *        "200":
 *          description: Data is available. Returns an array of items in collections
 *        "500":
 *          description: Couldn't connect to database or an unexpected error occurred.
 */
router.get('/:id', controller.getItemFromDbById);

/**
 * @swagger
 * path:
 *  /api/data/:
 *    post:
 *      tags: [Data]
 *      summary: Create a new record in the data collection
 *      requestBody:
 *        description: The information about the new item
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Data'
 *      responses:
 *        "200":
 *          description: The new item was saved on firestore
 *        "500":
 *          description: Couldn't connect to database or an unexpected error occurred.
 */
router.post('/', controller.createItemInDb);

/**
 * @swagger
 * path:
 *  /api/data/{id}:
 *    put:
 *      tags: [Data]
 *      summary: Updates a specific item in collection
 *      parameters:
 *        - name: id
 *          required: true
 *          type: string
 *          in: path
 *      requestBody:
 *        description: The new data to be updated for the given item
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Data'
 *      responses:
 *        "200":
 *          description: The item was updated successfully
 *        "500":
 *          description: Couldn't connect to database or an unexpected error occurred.
 */
router.put('/:id', controller.updateItemInDb);

/**
 * @swagger
 * path:
 *  /api/data/{id}:
 *    delete:
 *      tags: [Data]
 *      summary: Deletes a specific item from collection
 *      parameters:
 *        - name: id
 *          required: true
 *          type: string
 *          in: path
 *      requestBody:
 *        required: false
 *      responses:
 *        "200":
 *          description: The item was deleted successfully
 *        "500":
 *          description: Couldn't connect to database or an unexpected error occurred.
 */
router.delete('/:id', controller.deleteItemFromDb);

module.exports = router;
