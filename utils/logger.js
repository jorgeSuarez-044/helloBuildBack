const chalk = require('chalk');

const appName = process.env.APP_NAME || 'node-backend-template';
const env = process.env.ENV || process.env.GCP_ENV || process.env.NODE_ENV || 'Unknown';
const debugEnabled = (process.env.DEBUGGABLE || '1').toString() !== '0';

const LOG_LEVEL_DEBUG = 0;
const LOG_LEVEL_INFO = 1;
const LOG_LEVEL_WARN = 2;
const LOG_LEVEL_ERROR = 3;
const LOG_LEVEL_UNKNOWN = 4;

const { log } = console;

const safeLog = (what) => {
  if (typeof what !== 'string') {
    log('Only strings can be logged');
    return;
  }
  try {
    log(what);
  } catch (e) {
  }
};

const getLogLevelText = (level) => {
  let logLevelText;
  switch (level) {
    case LOG_LEVEL_DEBUG:
      logLevelText = 'DEBUG';
      break;
    case LOG_LEVEL_INFO:
      logLevelText = 'INFO';
      break;
    case LOG_LEVEL_WARN:
      logLevelText = 'WARNING';
      break;
    case LOG_LEVEL_ERROR:
      logLevelText = 'ERROR';
      break;
    default:
      logLevelText = 'UNKNOWN';
      break;
  }
  return logLevelText;
};

const formatMessage = (message, level) => {
  if (level === LOG_LEVEL_DEBUG && !debugEnabled) return '';
  const dateText = new Date().toISOString()
    .replace('T', ' ')
    .substring(0, 19);
  return `${dateText} ${getLogLevelText(level)} -> ${appName} @ ${env}: ${message}`;
};

const getActualLogMessage = (message, stackTrace, level, pretty = true) => {
  let actualMessage = '';
  // Set the actual message to either the stack trace or the message parsed to string
  if (stackTrace.length > 0) {
    actualMessage = stackTrace;
  } else {
    try {
      if (typeof message === 'string') {
        actualMessage = message.toString();
      } else {
        // If message is not a string, we try to parse it using JSON.stringify function
        try {
          actualMessage = pretty ? JSON.stringify(message, null, 2) : JSON.stringify(message);
        } catch (e) {
          actualMessage = message.toString();
        }
      }
    } catch (e) {
      // An unexpected error occurred while getting actual message, let's log it
      const errorMessage = (e.stack || e.message || e || '').toString();
      safeLog(chalk.red(formatMessage(errorMessage, level)));
    }
  }
  return actualMessage;
};

const formatAndPrint = (message, level) => {
  // Ensure the actual message is not empty
  if (message.length <= 0) return;

  let formattedMessage = '';
  try {
    formattedMessage = formatMessage(message, level);
  } catch (e) {
    return;
  }
  if (formattedMessage.length <= 0) return;

  switch (level) {
    // Log with purple color
    case LOG_LEVEL_DEBUG:
      if (debugEnabled) safeLog(chalk.magenta(formattedMessage));
      break;
    // Log with green color
    case LOG_LEVEL_INFO:
      safeLog(chalk.green(formattedMessage));
      break;
    // Log with yellow color
    case LOG_LEVEL_WARN:
      safeLog(chalk.yellow(formattedMessage));
      break;
    // Log with red color
    case LOG_LEVEL_ERROR:
      safeLog(chalk.red(formattedMessage));
      break;
    // Log with cyan color
    default:
      safeLog(chalk.cyan(formattedMessage));
      break;
  }
};

const actualLog = (message, level, pretty = true, printFullStack = false) => {
  // Ensure the message is defined
  if (typeof message === 'undefined' || message === null) return;

  // Ensure the log level is error, if the message is actually an error
  const isError = message instanceof Error;
  // eslint-disable-next-line no-param-reassign
  if (isError && level !== LOG_LEVEL_DEBUG) level = LOG_LEVEL_ERROR;

  let stackTrace = '';
  // Ensure error stack trace exists and get it
  if (isError && typeof message.stack !== 'undefined' && printFullStack) {
    stackTrace = message.stack.toString() || '';
  }
  // Ensure error message exists and get it
  if (isError && typeof message.message !== 'undefined' && stackTrace.length <= 0) {
    stackTrace = (message.message || '').toString();
  }

  const actualMessage = getActualLogMessage(message, stackTrace, level, pretty);
  formatAndPrint(actualMessage, level);
};

const debug = (message, pretty = true) => {
  actualLog(message, LOG_LEVEL_DEBUG, pretty);
};

const time = (message, pretty = true) => {
  const now = new Date();
  const actualMessage = `${now.toISOString()} --> ${message}`;
  debug(actualMessage, pretty);
};

const info = (message, pretty = true) => {
  actualLog(message, LOG_LEVEL_INFO, pretty);
};

const warn = (message, pretty = true) => {
  actualLog(message, LOG_LEVEL_WARN, pretty);
};

const error = (message, pretty = true, printFullStack = false) => {
  actualLog(message, LOG_LEVEL_ERROR, pretty, printFullStack);
};

const doLog = (message, level, pretty = true) => {
  const actualLevel = typeof level === 'number' ? level || LOG_LEVEL_UNKNOWN : LOG_LEVEL_UNKNOWN;
  actualLog(message, actualLevel, pretty);
};

module.exports = doLog;
module.exports.debug = debug;
module.exports.time = time;
module.exports.info = info;
module.exports.warn = warn;
module.exports.error = error;
