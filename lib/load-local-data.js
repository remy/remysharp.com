const path = require('path');

const cache = {};
const cwd = process.cwd();

module.exports = inputPath => {
  const dirname = path.dirname(inputPath);

  if (cache[dirname]) {
    return cache[dirname];
  }

  const modulePath = path.resolve(cwd, dirname);

  let res = {};
  try {
    res = require(`${modulePath}/_data.json`);
  } catch (e) {
    try {
      res = require(`${modulePath}/_data.js`);
    } catch (e) {
      // noop
    }
  }

  cache[dirname] = res;
  return res;
};
