const sleep = (s) => new Promise((resolve) => setTimeout(resolve, (Number(s) * 1000)));

const executeTry = async (callback, time, maxTimes, secondsBetweenTries, description, onError) => {
  const message = description ? `| ${description}` : '';

  try {
    return callback();
  } catch (error) {
    if (time >= maxTimes) {
      console.log(`Max tries limit reached ${message}`);
      console.log('Error on the last try:', error);
      if (onError && typeof onError !== 'function') {
        onError(error);
      }
      return error;
    }
    await sleep(secondsBetweenTries);
    console.log(`Executing trie ${time} ${message}`);
    return executeTry(callback, time + 1, maxTimes, secondsBetweenTries, description, onError);
  }
};

const retry = (params, callback) => {
  const {
    tries = 3,
    secondsBetweenTries = 3,
    description,
    onError,
  } = params;

  if (typeof callback !== 'function') {
    console.error('Error when execute try, the second parameter must be a function');
    return callback;
  }

  const firstTry = 1;
  return executeTry(callback, firstTry, tries, secondsBetweenTries, description, onError);
};

export default retry;
