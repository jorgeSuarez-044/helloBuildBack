const DEFAULT_ERROR_MESSAGE = 'Error inesperado';

const successResponse = (data) => ({ success: true, data });

const errorToText = (err, defaultErrorMessage) => {
  if (err) {
    try {
      // eslint-disable-next-line no-nested-ternary
      return err instanceof Error
        ? err.message || err.toString()
        : typeof err === 'string'
          ? err
          : err.toString() || defaultErrorMessage || DEFAULT_ERROR_MESSAGE;
    } catch (_) {
    }
  }
  return defaultErrorMessage || DEFAULT_ERROR_MESSAGE;
};

const errorToResponse = (err, defaultErrorMessage, data) => ({
  success: false,
  error: errorToText(err, defaultErrorMessage),
  data,
});

module.exports = {
  successResponse,
  errorToResponse,
  errorToText,
};
