const cwd = process.cwd();
const settings = require(cwd + '/config.js')();
const version = require('./version')();

module.exports = {
  ...settings,
  ...process.env,
  version,
  cwd,
  environment: process.env.NODE_ENV,
};
