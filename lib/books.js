const fetch = require('node-fetch');
require('@remy/envy');
// eslint-disable-next-line node/no-unpublished-require
const glob = require('fast-glob');
const matter = require('gray-matter');
const path = require('path');
const fs = require('fs').promises;

main();

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
}

// request(
//   `https://www.goodreads.com/review/list_rss/63680802?shelf=read`,
//   (error, req, body) => {
//     const json = JSON.parse(parser.toJson(body)).rss.channel.item.slice(0, 1);

//     console.log(json);
//     // ;

//     const res = transform(json);

//     console.log(res);
//     process.exit(1);

//     fs.writeFileSync(
//       __dirname + '/../public/books/_books.json',
//       JSON.stringify(res, 0, 2),
//       'utf8'
//     );
//   }
// );

function transform($) {
  function parseDate($) {
    if ($.length > 0) {
      // $ = strptime($, '%a %b %d %H:%M:%S %z %Y');
      $ = new Date($).toJSON();
      $ = $.split('T')[0];
      return $;
    } else {
      return $;
    }
  }

  // $ = $.GoodreadsResponse.reviews.review;
  $ = $.map(($) => {
    let summary = null;
    if ($.user_review.includes('<i></i>')) {
      summary = $.user_review
        .split('<i></i>')[0]
        .replace(/<\/?[^>]+(>|$)/g, '');
    }

    if (!$.read_at) {
      console.warn(`missing "${$.book.title}", ${$.id}`);
    }

    return {
      id: $.id,
      summary,
      review: $.user_review,
      rating: $.user_rating,
      spoiler: $.spoiler_flag || false,
      read: parseDate($.user_read_at),
      started: parseDate($.started_at),
      url: $.url,
      book: {
        id: $.book.id.$t,
        author: $.book.authors.author.name,
        title: $.book.title,
        image: $.book.image_url,
        url: $.book.link,
        pages: $.book.num_pages,
        description: $.book.description,
      },
    };
  });

  return $;
}
