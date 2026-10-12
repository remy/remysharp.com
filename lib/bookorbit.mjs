import "@remy/envy";
import slugify from 'slugify';
import fs from 'fs/promises';
import path from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { exec } from 'node:child_process';
import { dump } from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const username = process.env.ORBIT_USERNAME;
const password = process.env.ORBIT_PASSWORD;
const url = process.env.ORBIT_URL + '/api/v1';

const collections = {
  recentlyRead: 2,
  reading: 3
};

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

async function downloadCover(token, id) {
  const cover = path.resolve(__dirname, `../public/images/books/book-o-${id}.avif`);

  if (await fs.access(cover).then(() => true).catch(() => false)) {
    return cover;
  }

  // download book.cover_url to a temp file, then using `avifenc -q 50 "${temp_file}" ${cover}`
  const temp_file = path.resolve(__dirname, `../public/images/books/${id}-orbit.jpg`);
  const cover_response = await fetch(`${url}/books/${id}/thumbnail`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const cover_buffer = await cover_response.arrayBuffer();
  await fs.writeFile(temp_file, Buffer.from(cover_buffer));

  // convert to avif

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

async function auth() {
  const res = await fetch(`${url}/auth/login`, {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  });

  if (res.status === 200) {
    return await res.json().then(_ => _.accessToken);
  }

  throw new Error('bad request')
}

async function getAnnotations(token, bookId) {
  const res = await fetch(`${url}/books/${bookId}/annotations`, {
    headers: {
      'authorization': `Bearer ${token}`,
      'content-type': 'application/json'
    }
  });
  return await res.json();
}

async function getBook(token, bookId) {
  const res = await fetch(`${url}/books/${bookId}`, {
    headers: {
      'authorization': `Bearer ${token}`,
      'content-type': 'application/json'
    }
  });
  return await res.json();
}

async function getBooks(token, slug) {
  const res = await fetch(`${url}/smart-scopes/${collections[slug]}/books/query`, {
    method: 'post',
    headers: {
      'authorization': `Bearer ${token}`,
      'content-type': 'application/json'
    }
  });
  return await res.json();
}

async function recentlyRead(token) {
  const currently = await getBooks(token, 'recentlyRead');
  const books = [];

  for (const book of currently.items) {
    const id = `book-o-${book.id}`;
    const rating = book.rating;
    const pages = parseInt(book.pageCount, 0, 10) || '?';
    const start = book.readStatus.startedAt ?? null;
    const read = book.readStatus.finishedAt ?? null;
    const published = parseInt(book.publishedYear, 10);

    let title = book.title;
    let series = null;
    let seriesNumber = null;
    let seriesEntry = null;
    if (book.seriesId) {
      series = book.seriesName;
      seriesNumber = book.seriesIndex;
      title += ` (${series}, #${seriesNumber})`;
      seriesEntry = book.title;
    }

    const slug = toSlug(title);

    const filename = path.resolve(__dirname, `../public/books/${read.split('-')[0]}/${aliases.has(slug) ? aliases.get(slug) : slug}.md`);

    // check if the file exists, if not, create it
    fs.access(filename)
      .catch(async () => {

        const clippings = [];

        const annotations = await getAnnotations(token, book.id);

        if (annotations) {
          for (const annotation of annotations) {
            // not really the page, but we can't get it for now
            const page = Math.floor(annotation.pageno);
            clippings.push({
              page,
              text: annotation.text.replace(/[“”]/g, '"'),
              note: annotation.note,
              chapterIndex: annotation.chapterIndex
            });
          }
        }

        const providers = await getBook(token, book.id);
        const identifiers = {
          isbn: providers.isbn13,
          asin: providers.providerIds.amazon,
          goodreads: providers.providerIds.goodreads,
          storygraph: providers.providerIds.storygraph,
          hardcover: providers.providerIds.hardcover,
        }

        const cover = await downloadCover(token, book.id);

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
}

async function currentlyReading(token) {
  const currently = await getBooks(token, 'reading');

  const reading = [];

  for (const book of currently.items) {
    const slug = toSlug(book.title);

    const id = `book-o-${book.id}`;
    const cover = await downloadCover(token, book.id);
    const pages = book.pageCount;
    const started = book.readStatus.startedAt;
    const published = parseInt(book.publishedYear, 10);

    reading.push({
      id,
      slug,
      title: book.title,
      author: book.authors.join(', '),
      cover: '/' + path.relative(path.resolve(__dirname, '../public'), cover),
      pages,
      started,
      published,
      progress: Math.round(book.readingProgress),
    });
  }

  await fs.writeFile(
    path.resolve(__dirname, '../public/books/_currently.json'),
    JSON.stringify(reading, null, 2)
  );

  return reading;
}

const token = await auth();
await currentlyReading(token);
await recentlyRead(token);
// const reading = await getBooks(token, 'reading');
