const express = require('express');
const controller = require('./../controllers/data-controller');

const router = express.Router();

/**
 * @swagger
 * path:
 *  /api/GitRepos:
 *    get:
 *      tags: [Git-Repo-list]
 *      summary: get all information user
 *      parameters:
 *        - name: userGit
 *          required: false
 *          type: string
 *          in: query
 *      requestBody:
 *        required: false
 *      responses:
 *        "200":
 *          description: Data is available. Returns list repos
 *        "500":
 *          description: Couldn't connect to database or an unexpected error occurred.
 */
router.get('/', controller.endpointGit);

module.exports = router;
