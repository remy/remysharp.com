const fetch = require('node-fetch');
require('@remy/envy');
// eslint-disable-next-line node/no-unpublished-require
const glob = require('fast-glob');
const matter = require('gray-matter');
const path = require('path');
const fs = require('fs').promises;

// rebuilds the _books.json index and also downloads the missing images
function update() {
  main().then((data) => {
    fs.writeFile(
      __dirname + '/../public/books/_books.json',
      JSON.stringify(
        data.sort((a, b) => {
          return a.read.getTime() < b.read.getTime() ? 1 : -1;
        }),
        0,
        2
      )
    );
  });
}

if (!module.parent) update();
module.exports = update;

async function main() {
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

      return fs.readFile(filename).then(async (body) => {
        const data = matter(body).data;

        if (!covers.includes(data.goodreads_id.toString())) {
          console.log(
            `missing ${slug}, saving ${data.cover} @ ${data.goodreads_id}`
          );
          const res = await new fetch(data.cover);
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
      });
    })
  );

  return data;
}
