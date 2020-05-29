const { readFileSync } = require('fs');
const { promisify } = require('util');
const hashFiles = promisify(require('hash-files'));
const { input, output } = require('./globals.js');

async function load() {
  const inputPath = input + '/service-worker.js';
  const content = readFileSync(inputPath, 'utf8');
  const res = {
    inputPath,
    content,
  };

  const hash = await hashFiles({
    files: [input + '/js/**/*.js', input + '/css/*'],
  });

  res.output = content.replace(/%%FILE_HASH%%/, hash.slice(-6));
  res.outputPath = inputPath.replace(input, output);
  return res;
}

module.exports = () => {
  return load();
};

module.exports.single = () => load();
