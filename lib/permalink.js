const { resolve, relative } = require('path');
const { cwd, output, input } = require('./globals');

module.exports = function permalink(res, altFunction) {
  if (res.data && res.data.permalink) {
    if (res.data.permalink.startsWith('/')) {
      res.data.permalink = res.data.permalink.substring(1);
    }

    return relative(
      cwd,
      resolve(
        output,
        res.data.permalink
          .replace(/(?:{{\s*(\S+)\s*}})/g, (all, match) => {
            return res.data[match] || res[match];
          })
          .replace(/^\//, '')
      )
    );
  }

  if (altFunction) {
    return altFunction(res);
  }

  return res.inputPath.replace(input, output);
};
