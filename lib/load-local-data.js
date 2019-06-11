const fs = require('fs');
const path = require('path');

const cache = {};
const cwd = process.cwd();

module.exports = inputPath => {
  const dirname = path.dirname(inputPath);

  if (cache[dirname]) {
    return cache[dirname];
  }

  const modulePath = path.resolve(cwd, dirname);

  const files = fs
    .readdirSync(modulePath)
    .filter(
      f => f.startsWith('_') && (f.endsWith('.js') || f.endsWith('.json'))
    );

  let res = {};
  files.forEach(file => {
    try {
      res[file.replace(/^(.*?)\..*$/, '$1')] = require(`${modulePath}/${file}`);
    } catch (e) {
      console.log('err', e);
    }
  });

  cache[dirname] = res;
  return res;
};
