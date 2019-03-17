const fs = require('fs-extra');
const { resolve, sep, join } = require('path');

module.exports = (startAt, lookingFor) => {
  startAt = resolve(startAt);
  if (fs.existsSync(startAt) && fs.statSync(startAt).isDirectory()) {
    const dirs = resolve(startAt).split(sep);
    for (let i = 0; i < dirs.length; i++) {
      const basedir =
        i < dirs.length - 1 ? dirs.slice(0, dirs.length - i).join(sep) : sep;

      if (fs.existsSync(join(basedir, lookingFor))) {
        return join(basedir, lookingFor);
      }
    }
    /* if we reached here, nothing was found */
    return null;
  } else {
    throw new Error('startAt path must be an existing directory: ' + startAt);
  }
};
