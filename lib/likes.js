const request = require('request');

const token = process.env.WEBMENTIONS;

// limit to likes and GET THEM ALL!!!!! (we should fix this later)
const url = page =>
  `https://webmention.io/api/mentions.jf2?domain=remysharp.com&token=${token}&wm-property=like-of&per_page=20&page=${page}`;

const get = (page = 0, all = { children: [] }) => {
  if (process.env.NODE_ENV !== 'production') {
    // be nice during testing and constant reloads
    return Promise.resolve(require('../tmp/web-mentions.json'));
  }
  console.log(page, all.children.length);
  return new Promise((resolve, reject) => {
    request({ url: url(page), json: true }, (error, res, body) => {
      if (body) {
        if (body.children.length) {
          return get(page + 1, {
            children: all.children.concat(body.children),
          }).then(() => {
            resolve(all);
          });
        }

        return resolve(all);
      }
      if (error) {
        return reject(error);
      }

      // resolve(body);
    });
  });
};

module.exports = async () => {
  const body = await get();

  // reconstruct as { <slug>: [<Like>] }
  const reply = body.children.reduce((acc, curr) => {
    const slug = curr['wm-target'].split('/').pop() || '/';

    if (!acc[slug]) {
      acc[slug] = [];
    }

    acc[slug].push(curr);

    return acc;
  }, {});

  return reply;
};

if (!module.parent) module.exports().then(res => console.log(res));
