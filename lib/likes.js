const request = require('request');

const token = process.env.WEBMENTIONS;

const url = `https://webmention.io/api/mentions.jf2?domain=remysharp.com&token=${token}&wm-property[]=like-of&per_page=20000`;

const get = () => {
  return new Promise((resolve, reject) => {
    request({ url, json: true }, (error, res, body) => {
      if (error) {
        return reject(error);
      }

      resolve(body);
    });
  });
};

module.exports = async () => {
  if (process.env.NODE_ENV !== 'production') {
    return Promise.resolve(require('../tmp/web-mentions.json'));
  }
  const body = await get();
  const reply = body.children
    .filter(_ => _['wm-property'] === 'like-of')
    .reduce((acc, curr) => {
      const slug = curr['wm-target'].split('/').pop() || '/';

      if (!acc[slug]) {
        acc[slug] = [];
      }

      acc[slug].push(curr);

      return acc;
    }, {});

  console.log(JSON.stringify(reply));

  return reply;
};
if (!module.parent) module.exports().then(res => console.log(res));
