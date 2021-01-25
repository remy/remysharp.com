const request = require('request');
// eslint-disable-next-line node/no-unpublished-require
const parser = require('xml2json');
const fs = require('fs');
require('@remy/envy');
const glob = require('fast-glob');
const slugify = require('slugify');
const { basename } = require('path');
const update = require('./books');

function slug(s) {
  return slugify(s, {
    remove: /[*+~.()'"!:@,#]/g,
  }).toLowerCase();
}

const aliases = new Map([
  ['record-of-a-spaceborn-few-wayfarers-3', 'record-of-a-spaceborn-few'],
  [
    'the-long-way-to-a-small-angry-planet-wayfarers-1',
    'the-long-way-to-a-small,-angry-planet',
  ],
  ['dogs-of-war-dogs-of-war-1', 'dogs-of-war'],
  ['neuromancer-the-neuromancer-trilogy', 'neuromancer'],
  [
    'spectrum-machine-language-for-the-absolute-beginner-2',
    'spectrum-machine-language-for-the-absolute-beginner',
  ],
]);

const ignore = new Set([
  'reasons-to-stay-alive',
  'marge-the-collection-9-stories-in-1',
  'zx-spectrum-great-games-from-a-z',
  'we-should-all-be-feminists',
  'wrongun-clement-2',
  'pricing-design',
  'dark-matter',
]);

function markdown(data) {
  return `---
title: "${data.title}"
author: "${data.author}"
published: ${data.published}
pages: ${data.pages}
goodreads: ${data.goodreads}
goodreads_id: ${data.goodreads_id}
cover: ${data.cover}
read: ${data.read}
start: ${data.start}
rating: ${data.rating}
---

${data.review ? data.review : ''}
`;
}

request(
  `https://www.goodreads.com/review/list_rss/63680802?shelf=currently-reading`,
  (error, req, body) => {
    const json = parser.toJson(body);

    const res = transform(JSON.parse(json));
    console.log('updating currently');

    fs.writeFileSync(
      __dirname + '/../public/books/_currently.json',
      JSON.stringify(res, 0, 2),
      'utf8'
    );
  }
);

request(
  'https://www.goodreads.com/review/list_rss/63680802?shelf=read',
  async (error, req, body) => {
    const json = parser.toJson(body);

    /** @type Map */
    const slugs = transform(JSON.parse(json)).reduce(
      (/** @type Map */ acc, curr) => acc.set(slug(curr.title), curr),
      new Map()
    );

    const reviews = (
      await glob(`${__dirname}/../public/books/**/*.md`)
    ).map((_) => basename(_, '.md'));

    for (let [slug, book] of slugs.entries()) {
      if (aliases.has(slug)) {
        slug = aliases.get(slug);
      }
      if (!reviews.includes(slug)) {
        if (!ignore.has(slug)) {
          book = {
            slug,
            ...book,
            read: new Date(book.read).toJSON().split('T')[0],
            start: new Date(book.start).toJSON().split('T')[0],
            review: JSON.stringify(book.review) === '{}' ? null : book.review,
          };

          const year = book.read.split('-')[0];
          const filename = `${__dirname}/../public/books/${year}/${slug}.md`;
          await fs.promises.writeFile(filename, markdown(book));

          console.log(`generated new book: ${book.title} / ${slug}`);
        }
      }
    }

    update();
  }
);

function transform(source) {
  let feed = [];

  if (source.rss.channel.item) {
    if (!Array.isArray(source.rss.channel.item)) {
      source.rss.channel.item = [source.rss.channel.item];
    }
    // .item | map({ title, book_image_url, author_name, link, pages: .book.num_pages })
    feed = source.rss.channel.item.map(
      ({ title, author_name, link, book, ...rest }) => {
        return {
          title,
          author: author_name,
          pages: parseInt(book.num_pages, 10),
          read: rest.user_read_at,
          start: rest.user_date_created,
          rating: parseInt(rest.user_rating, 10),
          published: parseInt(rest.book_published, 10),
          cover: rest.book_large_image_url,
          goodreads_id: parseInt(rest.book_id, 10),
          goodreads: link.replace(/\?.*$/, ''),
          review: rest.user_review,

          /*
title: "The Master and Margarita"
author: "Mikhail Bulgakov"
published: 1967
pages: 369
goodreads: https://www.goodreads.com/review/show/1873373881
goodreads_id: 53769829
cover: https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1591106736l/53769829._SX318_.jpg
read: 2020-12-31
start: 2020-11-04
rating: 3
spoiler: false
summary: "I literally have no idea what I read!"
*/
        };
      }
    );
  }

  return feed;
}
