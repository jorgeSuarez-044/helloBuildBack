const mongoose = require('mongoose');
const log = require('./../utils/logger');

const mongoUrl = 'mongodb://localhost:27017/nodetemplate';

mongoose.Promise = global.Promise;

mongoose.set('useCreateIndex', true);
mongoose.set('runValidators', true);
mongoose.set('useFindAndModify', false);

const db = mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      log.error('Error connecting to MongoDB');
    } else {
      log.info('Connected to MongoDB');
    }
  });

module.exports = db;
