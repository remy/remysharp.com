const md = require('markdown-it')({ html: true });
const matter = require('gray-matter');
const { loadFromGlob, loadContent } = require('./load-content');
const { input, output } = require('./globals');
const _generateOutputPath = require('./generate-output-path');
const generateOutputPath = _generateOutputPath.bind(null, input, output);

const transform = async content => {
  const fm = matter(content.input, { excerpt_separator: '<!--more-->' });
  content.data = fm.data;
  if (!content.data.modified) {
    content.data.modified = content.data.date;
  }
  content.output = await md.render(fm.content);
  content.excerpt = fm.excerpt;
};

module.exports = async () => {
  let content = await loadFromGlob('md', transform, generateOutputPath);
  return content;
};

module.exports.single = async filename => {
  return loadContent([filename], transform, generateOutputPath);
};
