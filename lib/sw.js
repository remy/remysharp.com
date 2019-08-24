const { readFileSync } = require('fs');
const { input, output } = require('./globals.js');

function load() {
  const inputPath = input + '/service-worker.js';
  const content = readFileSync(inputPath, 'utf8');
  const res = {
    inputPath,
    content
  };

  let hash = 'HEAD';

  if (process.env.COMMIT_REF) {
    hash = process.env.COMMIT_REF.slice(-6);
  }

  res.output = content.replace(/%%COMMIT%%/, hash);
  res.outputPath = inputPath.replace(input, output);
  return res;
}

module.exports = () => {
  return load();
};

module.exports.single = () => load();
