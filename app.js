const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

require('./drivers/mongo-connector');

dotenv.config();

const log = require('./utils/logger');

const statusRoutes = require('./routes/status');
const docsRoutes = require('./routes/swagger');
const dataRoutes = require('./routes/data');
const gitRoutes = require('./routes/endpointGit');
const peopleRoutes = require('./routes/people');

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/', statusRoutes);
app.use('/api/docs', docsRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/people', peopleRoutes);
app.use('/api/GitRepos', gitRoutes);

if (module === require.main) {
  app.listen(port, () => {
    log.info(`App listening on port ${port}`);
  });
}
