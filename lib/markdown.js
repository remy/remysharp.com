/* eslint-disable require-atomic-updates */
global.Prism = require('prismjs');

require('prismjs/components/prism-markup-templating');
require('../public/js/prism-jq');
require('../public/js/prism-z80');
require('../public/js/prism-nextbasic');
require('../public/js/prism-awk');
const taskLists = require('markdown-it-task-lists');
const markdownAbbr = require('markdown-it-abbr');
const markdownItAttrs = require('markdown-it-attrs');
const prism = require('./markdown-it-prism');

const md = require('markdown-it')({ html: true, linkify: true });
md.use(markdownAbbr);
md.use(markdownItAttrs);
md.use(prism);
md.use(taskLists);

const matter = require('gray-matter');
const { loadFromGlob, loadContent } = require('./load-content');
const { input, output } = require('./globals');
const _generateOutputPath = require('./generate-output-path');
const generateOutputPath = _generateOutputPath.bind(null, input, output);

const transform = async (content) => {
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
  try {
    content.light = await md.render(
      fm.content
        .replace(/^#\s.*\n\n/m, '')
        .replace(/\n^_Source: \[.*\)_$\n/m, '')
    );
    content.output = await md.render(fm.content);
    content.excerpt = fm.excerpt;

    const max = 159;

    content.metaExcerpt = fm.excerpt
      .replace(/<(?:.|\n)*?>/gm, '')
      .replace(/^#.*?\n+/m, '')
      .replace(/(?:!)?\[(.*?)\]\(.*?\)/g, '')
      .replace(/\n{2,}/g, '\n')
      .replace(/"/g, '&quot;')
      .trim()
      .slice(0, max);

    if (content.metaExcerpt.length === max) {
      content.metaExcerpt += '…';
    }
  } catch (e) {
    console.log(e);
    console.log({ fm });
  }
};

module.exports = async () => {
  let content = await loadFromGlob('md', transform, generateOutputPath);
  return content;
};

module.exports.single = async (filename) => {
  return loadContent([filename], transform, generateOutputPath);
};
