const clippings = require('./public/books/_clippings_input.json');
const slugify = require('slugify');
const cheerio = require('cheerio');
const fg = require('fast-glob');
const fs = require('fs');
const path = require('path');

const skip = new Set(['The Time-travelling Caveman']);

const retain = new Set([
  'The Murderbot Diaries',
  'Binti',
  'The Prostrate Years',
  'The Stories in Our Genes',
  'Adventures for the Anxious',
  'Wayfarers 2',
  'Wayfarers 3',
  'Wayfarers 4',
  'Broad Band',
]);
const replace = new Map([
  ['Dune', 'Dune (Dune Chronicles, #1)'],
  ['Nineteen Eighty-Four (Penguin Modern Classics)', '1984'],
  ['The Audacity: Why Being Too Much Is Exactly Enough', 'The Audacity'],
]);

let files = [];

if (process.argv[2] === 'parse') {
  console.log(extractKindleHighlights(temp()));
} else {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

async function main() {
  files = await fg('public/books/2*/*.md');

  const result = clippings
    .filter((_) => _.highlights.length > 0)
    .filter((_) => !skip.has(_.title))
    .map((book) => {
      const title = decodeHtmlEntities(book.title);
      book.title = title;
      const lastSplit = title.lastIndexOf(': ');
      if (lastSplit === -1) {
        return book;
      }

      const prefix = title.slice(0, lastSplit);
      const suffix = title.slice(lastSplit + 2);

      if (retain.has(prefix) || retain.has(suffix)) {
        return book;
      }

      return {
        ...book,
        title: prefix,
      };
    })
    .map((book) => {
      if (replace.has(book.title)) {
        book.title = replace.get(book.title);
      }

      const highlights = book.highlights.map((highlight) => {
        const text = decodeHtmlEntities(highlight.text)
          .replace(/“|”/g, `"`)
          .replace(/‘|’/g, `'`);

        highlight.text = text;

        return highlight;
      });
      return {
        ...book,
        highlights,
        slug: slug(book.title),
      };
    });

  for (const book of result) {
    const { highlights, slug } = book;
    const file = await findClosestFile(slug);
    if (file) {
      book.slug = path.basename(file, '.md');
    }
  }

  const res = {};
  for (const book of result) {
    const { slug, ...rest } = book;
    res[slug] = rest;
  }
  console.log(JSON.stringify(res, null, 2));
}

async function findClosestFile(slug) {
  const normalise = (str) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // normalise to slug-like
      .replace(/(^-+|-+$)/g, '');

  const target = normalise(slug);

  let bestMatch = null;
  let bestScore = Infinity;

  for (const file of files) {
    if (file.includes(slug)) {
      return file;
    }
    const filename = path.basename(file, '.md');
    const score = levenshteinDistance(normalise(filename), target);
    if (score < bestScore) {
      bestScore = score;
      bestMatch = file;
    }
  }

  return bestMatch;
}

function levenshteinDistance(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[a.length][b.length];
}

function decodeHtmlEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&ldquo;/g, '“')
    .replace(/&rdquo;/g, '”')
    .replace(/&lsquo;/g, '‘')
    .replace(/&rsquo;/g, '’')
    .replace(/&hellip;/g, '…')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&nbsp;/g, ' ');
}

function slug(s) {
  return slugify(s, {
    remove: /[*+~.()'"!:@,#]/g,
  }).toLowerCase();
}

/**
 * Extracts Kindle highlights and notes from HTML markup.
 * @param {string} html
 */
function extractKindleHighlights(html) {
  const $ = globalThis.$ || cheerio.load(html);

  const title = $('h3.kp-notebook-selectable').first().text().trim();
  const author = $('p.kp-notebook-selectable.a-spacing-none')
    .first()
    .text()
    .trim();
  const highlights = [];

  $('#kp-notebook-annotations > div').each((_, el) => {
    const locationText = $(el).find('#annotationHighlightHeader').text().trim();
    const highlight = $(el).find('.kp-notebook-highlight').text().trim();
    const note = $(el).find('.kp-notebook-note span:last').text().trim();

    const locationMatch = locationText.match(/Location:\s*([\d,]+)/);
    const pageMatch = locationText.match(/Page:\s*(\d+)/);

    const location = locationMatch
      ? parseInt(locationMatch[1].replace(/,/g, ''), 10)
      : null;
    const page = pageMatch ? parseInt(pageMatch[1], 10) : null;

    if (highlight) {
      highlights.push({
        text: highlight,
        note: note || null,
        location,
        page,
      });
    }
  });

  return { title, author, highlights };
}

function __extractKindleHighlights(html) {
  const result = {
    author: null,
    title: null,
    highlights: [],
  };

  const frag = document.createDocumentFragment();
  const root = document.createElement('div');
  root.innerHTML = html;
  frag.appendChild(root);

  result.title = root.querySelector('h3').textContent.trim();
  result.author = root.querySelector('h3').nextElementSibling.textContent;

  const highlightElements = Array.from(
    root.querySelectorAll('#kp-notebook-annotations > .a-row.a-spacing-base')
  );

  for (const highlightElement of highlightElements) {
    const el = highlightElement.firstChild;
    const page = el
      .querySelector('.kp-notebook-metadata')
      .textContent.split(':')
      .pop()
      .trim();
    const text = el.querySelector('.kp-notebook-highlight').textContent.trim();
    const note = el
      .querySelector('.kp-notebook-note span:last-child')
      .textContent.trim();

    result.highlights.push({
      text,
      note: note || null,
      page: parseInt(page.replace(/,/g, ''), 10),
    });
  }

  return result;
}

async function parseFromPage() {
  // via https://read.amazon.com/notebook
  const ids = $$('#kp-notebook-library > div').map((_) => _.id);
  const res = [];
  for (let id of ids) {
    const t = await fetch(
      `https://read.amazon.com/notebook?asin=${id}&contentLimitState=&`,
      {
        credentials: 'include',
        mode: 'cors',
      }
    ).then((_) => _.text());
    res.push(__extractKindleHighlights(t));
  }
  return res;
}

function temp() {
  return fs.readFileSync('./temp.html', 'utf-8');
}
