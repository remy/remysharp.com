const { readFileSync } = require('fs');
const { input, output } = require('./globals.js');

function load() {
  const inputPath = input + '/service-worker.js';
  const content = readFileSync(inputPath, 'utf8');
  const res = {
    inputPath,
    content
  };

  res.output = content.replace(/%%COMMIT%%/, process.env.COMMIT_REF || 'HEAD');
  res.outputPath = inputPath.replace(input, output);
  return res;
}

module.exports = () => {
  return load();
};

module.exports.single = () => load();
