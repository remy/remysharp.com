const { resolve } = require('path');
const { cwd, output, input } = require('./globals');

module.exports = function permalink(res, altFunction) {
  if (res.data && res.data.permalink) {
    return resolve(
      cwd,
      output,
      res.data.permalink
        .replace(/(?:{{\s*(\S+)\s*}})/g, (all, match) => {
          return res.data[match] || res[match];
        })
        .replace(/^\//, '')
    );
  }

  if (altFunction) {
    return altFunction(res);
  }

  return res.inputPath.replace(input, output);
};
