const sleep = (s) => new Promise((resolve) => setTimeout(resolve, (Number(s) * 1000)));

module.exports = { sleep };
