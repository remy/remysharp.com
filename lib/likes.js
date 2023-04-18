const { writeFileSync, statSync } = require('fs');
const { resolve } = require('path');
const request = require('request');

const token = process.env.WEBMENTIONS;
const likesPath = resolve(__dirname, '../public/_likes.json');

let forced = false;

// limit to likes and GET THEM ALL!!!!! (we should fix this later)
const url = (page) =>
  `https://webmention.io/api/mentions.jf2?domain=remysharp.com&token=${token}&wm-property=like-of&per_page=20&page=${page}`;

const writeLikes = (res) => {
  // reconstruct as { <slug>: [<Like>] }
  const reply = res.children.reduce((acc, curr) => {
    const slug = curr['wm-target'].split('/').pop() || '/';

    if (!acc[slug]) {
      acc[slug] = [];
    }

    acc[slug].push(curr);

    return acc;
  }, {});

  writeFileSync(likesPath, JSON.stringify(reply, 0, 2));
  return reply;
};

const getLikes = async function () {
  // if the likes are over a few days old, let's update behind the scenes
  if (forced) {
    console.log('forced'); // just writes
    return await get().then(writeLikes);
  }

  const stats = statSync(likesPath);
  const twoDaysAgo = Date.now() - 24 * 60 * 60 * 1000;
  if (stats.mtimeMs < twoDaysAgo) {
    get().then(writeLikes);
  }

  return Promise.resolve(require(likesPath));
};

const get = async (page = 0, all = { children: [] }) => {
  if (all.children.length >= 50) {
    // return all;
  }

  return new Promise((resolve, reject) => {
    console.log(page, all.children.length);
    request({ url: url(page), json: true }, (error, res, body) => {
      if (body) {
        if (!body.children) {
          console.log('likes failed', { body });
        } else if (body.children.length) {
          return get(page + 1, {
            children: all.children.concat(body.children),
          }).then((all) => {
            resolve(all);
          });
        }

        return resolve(all);
      }
      if (error) {
        return reject(error);
      }

      // should never happen
      resolve(all);
    });
  });
};

module.exports = getLikes;

if (!module.parent) {
  forced = true;
  getLikes();
}
