const { resolve } = require('path');
const { glob } = require('./glob');
const { cwd, input } = require('./globals');

module.exports = async () => {
  // misc other files
  const miscPattern = [
    `!${resolve(cwd, input)}/**/*.md`,
    `!${resolve(cwd, input)}/**/*.pug`,
    `!${resolve(cwd, input)}/css/**/*.less`,
    // `${resolve(cwd, input)}/images/**/*.*`,
    `${resolve(cwd, input)}/**/*.*`,
  ];

  return glob(miscPattern);
};
