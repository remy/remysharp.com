const fs = require('fs-extra');
const { input, output } = require('./globals');

exports.saveTransformed = content =>
  Promise.all(
    content.map(content => {
      return fs.outputFile(content.outputPath, content.output);
    })
  );

exports.saveStatic = misc => {
  return Promise.all(
    misc.map(filename => fs.copy(filename, filename.replace(input, output)))
  );
};
