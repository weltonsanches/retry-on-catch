const sleep = (s) => new Promise((resolve) => setTimeout(resolve, (Number(s) * 1000)));

const retry = (params, callback) => {
  return callback;
}

export default retry;
