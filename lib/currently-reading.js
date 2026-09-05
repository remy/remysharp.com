require('@remy/envy');
const fs = require('fs/promises');
const slugify = require('slugify');
const path = require('path');
const { dump } = require('js-yaml');

const username = process.env.BOOKS_USERNAME;
const password = process.env.BOOKS_PASSWORD;
const root = process.env.BOOKS_URL;
const auth = 'Basic ' + btoa(`${username}:${password}`);

const aliases = new Map([
  ['another-england', 'another-england-how-to-reclaim-our-national-story'],
  [
    'bear-head-dogs-of-war-2',
    'bear-head',
  ],
  ['empire-of-ai', 'empire-of-ai-dreams-and-nightmares-in-sam-altmans-openai'],
  ['rivers-of-london-rivers-of-london-1', 'rivers-of-london'],

]);


function toSlug(s) {
  return slugify(s, {
    remove: /[*+~.()'"!:@\,,#?]/g,
  }).toLowerCase();
}

async function downloadCover(id, url) {
  const cover = path.resolve(__dirname, `../public/images/books/${id}.avif`);

  if (await fs.access(cover).then(() => true).catch(() => false)) {
    return cover;
  }

  // download book.cover_url to a temp file, then using `avifenc -q 50 "${temp_file}" ${cover}`
  const temp_file = path.resolve(__dirname, `../public/images/books/${id}.jpg`);
  const cover_response = await fetch(url, {
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

  return cover;
}

async function getCurrentlyReading() {
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
    const cover = await downloadCover(id, book.cover_url);

    // const sidecar = book.custom?.cc_ko_sidecar ? JSON.parse(book.custom?.cc_ko_sidecar.value || "{}") : {};
    const pages = book.custom.cc_pages;
    const started = book.custom?.cc_ko_start?.value ?? null;
    const published = parseInt(book.pubdate.split('-')[0], 10);

    reading.push({
      id,
      slug,
      title: book.title,
      author: book.authors.join(', '),
      cover: '/' + path.relative(path.resolve(__dirname, '../public'), cover),
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

async function getRecentlyRead() {
  if (!username || !password) {
    throw new Error('Missing BOOKS_USERNAME or BOOKS_PASSWORD');
  }

  const recentlyRead = await fetch(`${root}/api/feed/finished`, {
    headers: {
      Authorization: auth,
    },
  }).then((res) => res.json());

  const books = [];
  for (const book of recentlyRead.books) {

    const id = `book-${book.id}`;
    const sidecar = JSON.parse(book.custom?.cc_ko_sidecar.value || "{}") || {};
    const rating = sidecar.summary.rating;
    const pages = parseInt(sidecar.pagemap_doc_pages || sidecar.book_map_pages_per_row || 0, 10) || '?';
    const start = book.custom?.cc_ko_start?.value ?? null;
    const read = book.custom?.cc_ko_finish?.value ?? null;
    const published = parseInt(book.pubdate.split('-')[0], 10);

    let title = book.title;
    let series = null;
    let seriesNumber = null;
    let seriesEntry = null;
    if (book.series) {
      series = book.series;
      seriesNumber = book.series_index.toFixed(0);
      title += ` (${series}, #${seriesNumber})`;
      seriesEntry = book.title;
    }

    const slug = toSlug(title);

    await downloadCover(id, book.cover_url);

    const filename = path.resolve(__dirname, `../public/books/${read.split('-')[0]}/${aliases.has(slug) ? aliases.get(slug) : slug}.md`);
    const cover = '/' + path.relative(path.resolve(__dirname, '../public'), path.resolve(__dirname, `../public/images/books/${id}.avif`));

    // check if the file exists, if not, create it
    fs.access(filename)
      .catch(async () => {

        const clippings = [];

        if (sidecar.annotations) {
          // const docpages = sidecar.doc_pages;
          for (const key in sidecar.annotations) {
            const annotation = sidecar.annotations[key];
            // not really the page, but we can't get it for now
            const page = Math.floor(annotation.pageno);
            clippings.push({
              page,
              text: annotation.text,
              note: annotation.note,
            });
          }
        }

        const identifiers = {
          isbn: book.identifiers.isbn,
          asin: book.identifiers.asin,
          goodreads: book.identifiers.goodreads,
          storygraph: book.identifiers.storygraph,
          hardcover: book.identifiers.hardcover,
        }

        const frontMatterData = {
          id,
          title,
          author: book.authors.join(', '),
          pages,
          rating: rating || '?',
          published,
          start: start || '',
          read: read || '',
          cover,
          slug,
          identifiers,
          clippings,
        };

        if (series) {
          frontMatterData.seriesEntry = seriesEntry || '';
          frontMatterData.seriesNumber = seriesNumber || '';
          frontMatterData.series = series || '';
        }

        const frontMatterYaml = dump(frontMatterData, { noRefs: true, skipInvalid: true });

        const frontMatter = `---
${frontMatterYaml}
---

`;

        await fs.mkdir(path.dirname(filename), { recursive: true });
        await fs.writeFile(filename, frontMatter);
        console.log('+ generated new book: ', title, ' / ', slug);
      });

    books.push({
      id,
      title,
      seriesEntry,
      seriesNumber,
      series,
      author: book.authors.join(', '),
      pages,
      published,
      start,
      read,
    })
  }


  return books
};

console.clear();
Promise.all([getCurrentlyReading(), getRecentlyRead()])
  .then(([currentlyReading, recentlyRead]) => {
    console.log('Currently Reading:', currentlyReading.length);
    console.log('Recently Read:', recentlyRead.length);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });