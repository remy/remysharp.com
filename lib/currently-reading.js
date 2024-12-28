require('@remy/envy');
const request = require('request');
// eslint-disable-next-line node/no-unpublished-require
const parser = require('xml2json');
const fs = require('fs');
const glob = require('fast-glob');
const slugify = require('slugify');
const { basename } = require('path');
const update = require('./books');
const cheerio = require('cheerio');

function slug(s) {
  return slugify(s, {
    remove: /[*+~.()'"!:@,#?]/g,
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
    'spectrum-machine-language-for-the-absolute-beginner-2-retro-reproductions',
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
  'spectrum-machine-language-for-the-absolute-beginner-2-2-retro-reproductions',
  'spectrum-machine-language-for-the-absolute-beginner-2-retro-reproductions',
  // 'dark-matter',
]);

function markdown(data) {
  return `---
title: "${data.title}"
${
  data.series
    ? `seriesEntry: "${data.seriesEntry}"
seriesNumber: "${data.seriesNumber}"
series: "${data.series}"\n`
    : ''
}author: "${data.author}"
published: ${data.published}
pages: ${data.pages}
goodreads: ${data.goodreads}
goodreads_id: ${data.goodreads_id}
cover: ${data.cover}
read: ${
    Array.isArray(data.read) ? JSON.stringify(data.read) : data.read.toJSON()
  }
start: ${
    Array.isArray(data.start) ? JSON.stringify(data.start) : data.start.toJSON()
  }
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

const correctedDate = (date) => {
  const d = new Date(date.trim() + ', Z');

  if (isNaN(d)) {
    return '?'; // or any other default value
  }

  return d;
};

request(
  'https://www.goodreads.com/review/list/63680802-remy-sharp?utf8=%E2%9C%93&title=remy-sharp&per_page=100&shelf=read&page=1',
  {
    headers: {
      Cookie: process.env.GOODREADS_SESSION,
    },
  },
  async (error, req, body) => {
    console.log('updating read');
    // const json = parser.toJson(body);

    // fs.writeFileSync('test.html', body, 'utf8');

    const $ = cheerio.load(body);

    const res = $('.bookalike')
      .map((i, tr) => {
        const el = $(tr);
        const get = (s) =>
          el
            .find(s.includes(' ') ? s : `.${s} .value`)
            .text()
            .trim()
            .replace(/[\s\n]+/g, ' ');

        const goodreads = el.find('.title a').attr('href') || '';
        // const goodreads = el.find('.viewLink').attr('href') || '';
        const cover = el.find('.cover img').attr('src') || '';
        const title = get('title');
        let series = get('.title .value .darkGreyText').replace(
          /\((.*)\)/,
          '$1'
        );
        let seriesEntry = title.replace(`(${series})`, '').trim();
        let seriesNumber = null;

        if (series) {
          seriesNumber = (series.match(/#(\d+)/) || []).pop() || null;
          series = series.replace(/, #(\d+)/, '').trim();
        }

        // if (title.toLocaleLowerCase().includes('pixie')) {
        // debugger;
        // }

        let read = el.find('.date_read span');
        let start = el.find('.date_started span');

        if (read.length > 1) {
          read = read.map((i, _) => correctedDate($(_).text())).get();
        } else {
          read = correctedDate(read.text());
        }

        if (start.length > 1) {
          start = start.map((i, _) => correctedDate($(_).text())).get();
        } else {
          start = correctedDate(start.text());
        }

        let review = (el.find('td.review .value span:last').html() || '')
          .replace(/<br>/g, '\n')
          .replace(/<.*?>/g, '')
          .trim();

        const spoiler = review.startsWith('**spoiler alert**');
        if (spoiler) {
          review = review.replace('**spoiler alert**', '').trim();
        }

        return {
          title,
          seriesEntry,
          seriesNumber,
          series,
          author: get('author')
            .replace(/ \*$/, '')
            .split(', ')
            .reverse()
            .join(' '), // change to first name, last name
          pages: parseInt(get('num_pages'), 10),
          rating: el.find('.rating .staticStars .p10').length,
          read,
          start,
          published: new Date(get('date_pub')).getFullYear() || '?', // returning NaN would cause entire data to fail
          goodreads: `https://www.goodreads.com${goodreads}`,
          goodreads_id: parseInt(
            goodreads.split('/').pop().split('-').shift(),
            10
          ),
          cover: cover.replace(/Y75/, 'X315').trim(),
          review: review || null,
          spoiler,
          slug: slug(title),
        };
      })
      .get();

    /** @type Map */
    const slugs = res.reduce(
      (/** @type Map */ acc, curr) => acc.set(slug(curr.title), curr),
      new Map()
    );

    // get all the current reviews I've made and collect in `reviews`
    const reviews = (await glob(`${__dirname}/../public/books/**/*.md`)).map(
      (_) => basename(_, '.md')
    );

    // fs.writeFileSync('test.json', JSON.stringify(res), 'utf8');

    for (let [slug, book] of slugs.entries()) {
      if (ignore.has(slug)) {
        continue;
      }

      if (aliases.has(slug)) {
        slug = aliases.get(slug);
      }

      // if there's a new incoming review (and one I've not already created),
      // then go ahead and create it
      if (!reviews.includes(slug)) {
        if (!ignore.has(slug)) {
          try {
            const year = Array.isArray(book.read)
              ? [...book.read].sort((a, b) => (a < b ? -1 : 1))[0].getFullYear()
              : book.read.getFullYear();
            const filename = `${__dirname}/../public/books/${year}/${slug}.md`;
            await fs.promises.writeFile(filename, markdown(book));

            console.log(`+ generated new book: ${book.title} / ${slug}`);
          } catch (e) {
            console.log(
              '- failed to generate (likely missing dates)',
              book.title
            );
            console.log(e.stack);
          }
        }
      }
    }

    return update(res.filter((_) => !ignore.has(_.slug)));
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
