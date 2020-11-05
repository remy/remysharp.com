const request = require('request');
// eslint-disable-next-line node/no-unpublished-require
const parser = require('xml2json');
const fs = require('fs');
require('@remy/envy');
const token = process.env.GOODREADS_TOKEN;

request(
  `https://www.goodreads.com/review/list/63680802.xml?key=${token}&v=2&shelf=read&per_page=200`,
  (error, req, body) => {
    const json = parser.toJson(body);

    const res = transform(JSON.parse(json));

    console.log(res.length);

    fs.writeFileSync(
      __dirname + '/../public/books/_books.json',
      JSON.stringify(res, 0, 2),
      'utf8'
    );
  }
);

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

  $ = $.GoodreadsResponse.reviews.review;
  $ = $.filter(($) => {
    return $.body.length > 1; // typeof  $.read_at === 'string' &&
  }).map(($) => {
    let summary = null;
    if ($.body.includes('<i></i>')) {
      summary = $.body.split('<i></i>')[0].replace(/<\/?[^>]+(>|$)/g, '');
    }

    if (!$.read_at) {
      console.warn(`missing "${$.book.title}", ${$.id}`);
    }

    return {
      id: $.id,
      summary,
      review: $.body,
      rating: $.rating,
      spoiler: $.spoiler_flag,
      read: parseDate($.read_at),
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
