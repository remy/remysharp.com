const { join } = require('path');
const fs = require('fs-extra');

module.exports = function findPartial(path, filename, ext) {
  let root = join(path, filename);
  try {
    fs.statSync(root + '.' + ext);
    return true;
  } catch (e) {
    return false;
  }
};
