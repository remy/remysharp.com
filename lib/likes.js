const request = require('request');

const token = process.env.WEBMENTIONS;

const url = `https://webmention.io/api/mentions.jf2?domain=remysharp.com&token=${token}&wm-property[]=like-of`;

const main = (module.exports = () =>
  new Promise((resolve, reject) => {
    request({ url, json: true }, (error, res, body) => {
      if (error) {
        return reject(error);
      }

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

      resolve(reply);
    });
  }));

if (!module.parent) main().then(res => console.log(res));
