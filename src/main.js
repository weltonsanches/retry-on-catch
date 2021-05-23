const sleep = (s) => new Promise((resolve) => setTimeout(resolve, (Number(s) * 1000)));

const executeTry = async (callback) => {
  return callback
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
  return executeTry(callback);
};

export default retry;
