const TurndownService = require('turndown');
const MarkdownIt = require('markdown-it');
const slugify = require('slugify');
const fs = require('fs');
const { resolve } = require('path');
const td = new TurndownService();
const md = new MarkdownIt({
  linkify: true,
});

let books = require('../public/books/_data');

if (process.argv[2]) {
  books = books.filter((_) => _.id === process.argv[2]);
}

const years = require('./years.json').map((_) => {
  _.slug = slug(_.title);
  return _;
});
const root = __dirname + '/../public/books/';

function slug(s) {
  return slugify(s, {
    remove: /[*+~.()'"!:@,#]/g,
  }).toLowerCase();
}

function turndown(s) {
  return td.turndown(s).replace(/\\([->_*])/g, '$1');
}

function toMd(source) {
  return turndown(source).trim();
}

function frontMatter({ book, ...meta }) {
  const year = years.find((_) => _.slug === meta.slug) || { year: '?' };

  if (!year) {
    console.log(book);
  }

  return `
  ---
  title: "${book.title.replace(/"/g, '\\"')}"
  author: "${book.author.replace(/"/g, '\\"')}"
  published: ${year.year}
  pages: ${book.pages}
  goodreads: ${book.url}
  cover: ${book.image}
  read: ${meta.read}
  start: ${meta.started}
  rating: ${meta.rating}
  spoiler: ${meta.spoiler}
  summary: "${meta.summary.replace(/"/g, '\\"').trim()}"
  ---
  `
    .split('\n')
    .map((_) => _.trim())
    .join('\n')
    .trim();
}

books
  .filter((_) => _.review)
  .forEach((book) => {
    if (!book.read || typeof book.read !== 'string') {
      console.log(book);
    }
    const year = book.read.split('-').shift();

    const slug = slugify(book.book.title, {
      remove: /[*+~.()'"!:@,#]/g,
    }).toLowerCase();

    const filename = resolve(root + year + '/' + slug + '.md');
    const content = toMd(book.review);
    const summary = content.split('\n').shift();
    const pages = book.book.pages;
    if (isNaN(pages)) book.book.pages = book.pages;
    const fm = frontMatter({ ...book, summary, slug });

    fs.writeFile(filename, `${fm}\n\n${content}`, (err) => {
      if (err) {
        console.log(filename + '\n' + err);
      }
    });
  });
