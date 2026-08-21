require('@remy/envy');
const fs = require('fs/promises');
const slugify = require('slugify');
const path = require('path');

const username = process.env.BOOKS_USERNAME;
const password = process.env.BOOKS_PASSWORD;
const root = process.env.BOOKS_URL;
const auth = 'Basic ' + btoa(`${username}:${password}`);

function toSlug(s) {
  return slugify(s, {
    remove: /[*+~.()'"!:@\,,#?]/g,
  }).toLowerCase();
}

async function main() {
  if (!username || !password) {
    throw new Error('Missing BOOKS_USERNAME or BOOKS_PASSWORD');
  }

  const currentlyReading = await fetch(`${root}/api/progress`, {
    headers: {
      Authorization: auth,
    },
  }).then((res) => res.json());

  const reading = [];

  for (const data of currentlyReading.positions.filter((book) => book.reading)) {
    const book = await fetch(`${root}/api/books/${data.book_id}`, {
      headers: {
        Authorization: auth,
      },
    }).then((res) => res.json());
    const slug = toSlug(book.title);

    // id is actually a koreader binary hash
    const id = `book-${book.id}`;
    const cover = path.resolve(__dirname, `../public/images/books/${id}.avif`);

    // download book.cover_url to a temp file, then using `avifenc -q 50 "${temp_file}" ${cover}`
    const temp_file = path.resolve(__dirname, `../public/images/books/${id}.jpg`);
    const cover_url = book.cover_url;
    const cover_response = await fetch(cover_url, {
      headers: {
        Authorization: auth,
      },
    });
    const cover_buffer = await cover_response.arrayBuffer();
    await fs.writeFile(temp_file, Buffer.from(cover_buffer));

    // convert to avif
    const { exec } = require('child_process');
    await new Promise((resolve, reject) => {
      exec(`avifenc -q 50 "${temp_file}" "${cover}"`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error converting to AVIF: ${error.message}`);
          reject(error);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
        }
        resolve();
      });
    });

    await fs.unlink(temp_file);


    const sidecar = JSON.parse(book.custom?.cc_ko_sidecar || "{}").value || {};
    const pages = parseInt(sidecar.pagemap_doc_pages || 0, 10) || '?';
    const started = book.custom?.cc_ko_start?.value ?? null;
    const published = parseInt(book.pubdate.split('-')[0], 10);

    reading.push({
      slug,
      title: book.title,
      author: book.authors.join(', '),
      cover: '/' + path.relative(path.resolve(__dirname, '../public'), cover),
      id,
      pages,
      started,
      published,
    });
  }

  await fs.writeFile(
    path.resolve(__dirname, '../public/books/_currently.json'),
    JSON.stringify(reading, null, 2)
  );

  return reading;
}

console.clear();
main().then((res) => {
  console.log(JSON.stringify(res, null, 2));
}).catch((err) => {
  console.error(err);
  process.exit(1);
});