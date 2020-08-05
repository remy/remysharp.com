const { resolve } = require('path');
const cwd = process.cwd();

const { input } = require('./globals.js');

exports.glob = require('fast-glob');
exports.globFor = (ext) => `${(resolve(cwd), input)}/**/*.${ext}`;
