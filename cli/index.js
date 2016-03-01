#!/usr/bin/env node

require('es6-promise').polyfill(); // jshint ignore:line
var fs = require('then-fs');
var path = require('path');
var draftDir = path.resolve(process.cwd(), 'public', 'drafts');

fs.exists(draftDir).then(function (ok) {
  if (!ok) {
    throw new Error('Need to be in a blog directory');
  }
  // kick off
  return require('clite')(require('./config'));
}).catch(function (e) {
  console.log(e.stack);
  process.exit(1);
});