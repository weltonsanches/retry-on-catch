/* eslint-disable no-console */
const sleep = (s) => new Promise((resolve) => setTimeout(resolve, (Number(s) * 1000)));

const executeTry = async ({
  secondsBetweenTries,
  description,
  callback,
  maxTimes,
  onError,
  logInfo,
  time,
}) => {
  const message = description ? `| ${description}` : '';

  try {
    return callback();
  } catch (error) {
    if (time >= maxTimes) {
      logInfo(`Max tries limit reached ${message}`);
      logInfo('Error on the last try:', error);
      if (onError && typeof onError !== 'function') {
        onError(error);
      }
      return error;
    }
    await sleep(secondsBetweenTries);
    logInfo(`Executing trie ${time} ${message}`);
    return executeTry(callback, time + 1, maxTimes, secondsBetweenTries, description, onError);
  }
};

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
