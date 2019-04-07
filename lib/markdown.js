global.Prism = require('prismjs');

require('prismjs/components/prism-markup-templating');
require('../public/js/prism-jq');
const prism = require('markdown-it-prism');
const markdownAbbr = require('markdown-it-abbr');

const md = require('markdown-it')({ html: true });
md.use(markdownAbbr);
md.use(prism); //, { plugins: ['keep-markup'] });

const matter = require('gray-matter');
const { loadFromGlob, loadContent } = require('./load-content');
const { input, output } = require('./globals');
const _generateOutputPath = require('./generate-output-path');
const generateOutputPath = _generateOutputPath.bind(null, input, output);

const transform = async content => {
  const fm = matter(content.input, { excerpt_separator: '<!--more-->' });
  content.data = fm.data;

  // ensure the date is a date and not a string
  if (typeof content.data.date === 'string') {
    content.data.date = new Date(content.data.date);
  }
  if (!content.data.modified) {
    content.data.modified = content.data.date;
  } else {
    content.data.modified = new Date(content.data.modified);
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
