require('@remy/envy');
const glob = require('fast-glob');
const matter = require('gray-matter');
const path = require('path');
const TurndownService = require('turndown');
const fs = require('fs').promises;
const td = new TurndownService();

function toMd(source) {
  if (!source.includes('<')) return source;
  return td
    .turndown(source)
    .replace(/\\([->_*])/g, '$1')
    .trim();
}

// rebuilds the _books.json index and also downloads the missing images
function update(delta = null) {
  return main(delta).then((data) => {
    fs.writeFile(
      __dirname + '/../public/books/_books.json',
      JSON.stringify(
        data
          .sort((a, b) => {
            let aDate = a.read;
            let bDate = b.read;
            if (Array.isArray(aDate)) aDate = aDate[0];
            if (Array.isArray(bDate)) bDate = bDate[0];

            return new Date(aDate).getTime() < new Date(bDate).getTime()
              ? 1
              : -1;
          })
          .map((_) => {
            if (Array.isArray(_.read)) {
              _.read = _.read.sort(dateSort);
            }
            if (Array.isArray(_.start)) {
              _.start = _.start.sort(dateSort);
            }
            return _;
          }),
        0,
        2
      )
    );
  });
}

if (!module.parent) update();
module.exports = update;

function simpleSort(a, b) {
  return a < b ? -1 : 1;
}

function dateSort(a, b) {
  return new Date(a) < new Date(b) ? -1 : 1;
}

function dateHasChanged(prev, next, key) {
  let prevDate;
  let nextDate;
  if (Array.isArray(prev[key])) {
    prevDate = prev[key].sort(simpleSort)[0];
  } else {
    prevDate = prev[key];
  }

  if (!prevDate) return true;

  prevDate = prevDate.toString().split('T')[0];

  if (Array.isArray(next[key])) {
    nextDate = next[key].sort(simpleSort)[0];
  } else {
    nextDate = next[key];
  }

  nextDate = nextDate.toString().split('T')[0];

  return prevDate !== nextDate;
}

async function main(delta) {
  const covers = await glob(`${__dirname}/../public/images/books/**/*`).then(
    (res) => {
      return res.map((_) => path.basename(_, '.jpg'));
    }
  );

  const files = await glob(`${__dirname}/../public/books/**/*.md`);
  const data = await Promise.all(
    files.map((_) => {
      const filename = path.resolve(_);
      const slug = path.basename(path.resolve(_), '.md');

      return fs
        .readFile(filename)
        .then(async (body) => {
          const data = matter(body).data;

          if (delta) {
            const book = delta.find((_) => _.slug === slug);
            if (book && book.read) {
              if (
                dateHasChanged(data, book, 'read') ||
                dateHasChanged(data, book, 'start') ||
                (book.series && book.series !== data.series) ||
                (book.seriesNumber && book.seriesNumber !== data.seriesNumber)
              ) {
                data.read = book.read;
                data.start = book.start;

                if (book.series) {
                  data.series = book.series;
                  data.seriesNumber = book.seriesNumber;
                }

                // now rewrite the front matter to the file
                const meta = { ...book };
                // always use the review from the file
                let review = toMd(
                  body.toString().replace(/^---\n(.|\n)+---\n+/, '')
                );

                if (!review) {
                  review = book.review;
                }

                if (!review) {
                  review = '';
                }

                meta.summary = review
                  .trim()
                  .split('\n')
                  .shift()
                  .replace(/"/g, '\\"')
                  .trim();

                delete meta.review;

                console.log('+ updating', slug);

                const updatedContent = matter.stringify(review, meta);
                await fs.writeFile(filename, updatedContent.toString());
              }
            }
          }

          if (!covers.includes(data.goodreads_id.toString())) {
            console.log(
              `missing ${slug}, saving ${data.cover} @ ${data.goodreads_id}`
            );
            const res = await fetch(data.cover);
            /* @type {ArrayBuffer} */
            const content = await res.arrayBuffer();
            await fs.writeFile(
              `${__dirname}/../public/images/books/${data.goodreads_id}.jpg`,
              new Uint8Array(content),
              'binary'
            );
          }

          return {
            ...data,
            filename,
            slug,
          };
        })
        .catch((e) => {
          console.log(`- failed on ${slug} / ${filename}`);
          console.log(e);
        });
    })
  );

  return data;
}
