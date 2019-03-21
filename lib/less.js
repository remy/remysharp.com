const { parse } = require('path');
const less = require('less');
const { loadFromGlob, loadContent } = require('./load-content');
const { input, output } = require('./globals.js');

const transform = content =>
  less
    .render(content.input, { paths: [parse(content.inputPath).dir] })
    .then(res => {
      content.output = res.css;
    });

const permalink = content =>
  content.inputPath.replace(/\.less$/, '.css').replace(input, output);

module.exports = () => {
  return loadFromGlob('less', transform, permalink);
};

module.exports.single = filename =>
  loadContent([filename], transform, permalink);
