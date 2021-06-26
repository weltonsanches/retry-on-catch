/* eslint-disable no-console */
const executeTry = require('./execution');

const retry = (params, callback) => {
  const {
    secondsBetweenTries = 3,
    logInfo = console.log,
    logError = console.error,
    tries = 3,
    description,
    onError,
  } = params;

  if (typeof callback !== 'function') {
    logError('Error when execute try, the second parameter must be a function');
    return callback;
  }

  const firstTry = 1;
  return executeTry({
    maxTimes: tries,
    time: firstTry,
    secondsBetweenTries,
    description,
    callback,
    logInfo,
    onError,
  });
};

export default retry;
