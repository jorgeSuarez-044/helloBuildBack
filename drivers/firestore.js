const admin = require('firebase-admin');
const log = require('../utils/logger');

let serviceAccount;

const env = process.env.ENVIRONMENT || process.env.GCP_ENV || 'local';
const remoteEnvs = ['prod', 'qa', 'dev'];

try {
  serviceAccount = remoteEnvs.includes(env)
    ? null
    : require('./../hellobuild-b26f1-e5f3fe432409.json');
} catch (e) {
  log.error(e);
}

let app;
let firestoreRef;
try {
  app = admin.initializeApp({
    credential: remoteEnvs.includes('hellobuild-b26f1')
      ? admin.credential.applicationDefault()
      : serviceAccount
        ? admin.credential.cert(serviceAccount)
        : null,
  });
  firestoreRef = admin.firestore();
} catch (e) {
  log.error(e);
}

module.exports = {
  app,
  firestoreRef,
  admin,
};
