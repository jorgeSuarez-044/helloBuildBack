const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerInfo = require('../utils/swagger-info');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Swagger
 *   description: App's API swagger documentation
 */

const options = {
  swaggerDefinition: {
    basePath: '/',
    openapi: '3.0.0',
    info: {
      ...swaggerInfo,
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
      contact: {
        name: 'BPSmart',
        url: 'https://bpsmart.ai',
        email: 'dev.ci@bpsmart.ai',
      },
    },
  },
  apis: ['./routes/*'],
};

const specs = swaggerJSDoc(options);

router.use('/', swaggerUI.serve);
router.get('/', swaggerUI.setup(specs, { explorer: true }));

/**
 * @swagger
 * path:
 *  /api/docs/swagger.json:
 *    get:
 *      tags: [Swagger]
 *      summary: Get swagger specification in JSON format
 *      requestBody:
 *        required: false
 *      responses:
 *        "200":
 *          description: Swagger specification in JSON format
 */
router.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  return res.send(specs);
});

module.exports = router;
