const request = require('request');
// eslint-disable-next-line node/no-unpublished-require
const parser = require('xml2json');
const fs = require('fs');
require('@remy/envy');
const token = process.env.GOODREADS_TOKEN;

request(
  `https://www.goodreads.com/review/list_rss/63680802?shelf=currently-reading`,
  (error, req, body) => {
    const json = parser.toJson(body);

    const res = transform(JSON.parse(json));

    fs.writeFileSync(
      __dirname + '/../public/books/_currently.json',
      JSON.stringify(res, 0, 2),
      'utf8'
    );
    // console.log(json);
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
      ({ title, book_image_url, author_name, link, book }) => {
        return {
          title,
          image: book_image_url,
          author: author_name,
          url: link,
          pages: book.num_pages,
        };
      }
    );
  }

  console.log(feed);

  return feed;
}
