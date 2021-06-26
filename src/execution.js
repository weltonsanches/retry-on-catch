const { sleep } = require('./utils');

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
      if (onError && typeof onError === 'function') {
        onError(error);
      }
      return error;
    }
    await sleep(secondsBetweenTries);
    logInfo(`Executing trie ${time} ${message}`);
    return executeTry(callback, time + 1, maxTimes, secondsBetweenTries, description, onError);
  }
};

module.exports = executeTry;
