const express = require('express');
const log = require('../utils/logger');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Status
 *   description: Status check
 */

/**
 * @swagger
 * path:
 *  /api/:
 *    get:
 *      tags: [Status]
 *      summary: Check api status
 *      requestBody:
 *        required: false
 *      responses:
 *        "200":
 *          description: Api is active
 */
router.get('/', (req, res) => {
  log.info('Received api request');
  return res.send({ status: 'ok', code: 200, variable: process.env.TEST || 'algo' });
});

module.exports = router;
