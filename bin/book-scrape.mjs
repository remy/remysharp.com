export const config = {
  url: 'https://www.goodreads.com/review/list/63680802-remy-sharp?utf8=%E2%9C%93&title=remy-sharp&per_page=100',
};

const ratings = [
  'did not like it',
  'it was ok',
  'liked it',
  'really liked it',
  'it was amazing',
];

export default function ({ doc }) {
  return doc
    .find('.bookalike')
    .map((tr) => {
      const get = (s) =>
        tr
          .find(`.${s} .value`)
          .text()
          .trim()
          .replace(/[\s\n]+/g, ' ');

      const goodreads = tr.find('.title a').attr('href');

      return {
        title: get('title'),
        author: get('author').replace(/ \*$/, ''),
        pages: parseInt(get('num_pages'), 10),
        rating:
          ratings.indexOf(tr.find('.staticStars.notranslate').attr('title')) +
          1,
        read: new Date(get('date_read')),
        started: new Date(get('date_started')),
        published: new Date(get('date_pub')).getFullYear() || '?', // returning NaN would cause entire data to fail
        goodreads,
        goodreads_id: parseInt(
          goodreads.split('/').pop().split('-').shift(),
          10
        ),
        cover: tr.find('.cover img').attr('src').replace(/Y75/, 'X315'),
      };
    })
    .sort((a, b) => (a.read - b.read < 0 ? 1 : -1));
}
