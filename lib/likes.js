const { writeFileSync, readFileSync } = require('fs');
const { resolve } = require('path');
const request = require('request');

const token = process.env.WEBMENTIONS;
const likesPath = resolve(__dirname, '../public/_likes.json');

const data = JSON.parse(readFileSync(likesPath));

let since_id = Math.max(
  ...Object.values(data)
    .flat()
    .map((_) => _['wm-id'])
);

let forced = false;

// limit to likes and GET THEM ALL!!!!! (we should fix this later)
const url = (page) =>
  `https://webmention.io/api/mentions.jf2?domain=remysharp.com&token=${token}&wm-property=like-of&per_page=20&page=${page}&since_id=${since_id}`;

const writeLikes = (res) => {
  // reconstruct as { <slug>: [<Like>] }
  res.children.forEach((curr) => {
    const slug = curr['wm-target'].split('/').pop() || '/';

    if (!data[slug]) {
      data[slug] = [];
    }

    if (!data[slug].includes(curr)) {
      data[slug].push(curr);
    }
  }, {});

  for (const slug in data) {
    data[slug] = data[slug].reduce((acc, curr) => {
      if (!acc.find((_) => _['wm-id'] === curr['wm-id'])) {
        acc.push(curr);
      }
      return acc;
    }, []);
  }

  writeFileSync(likesPath, JSON.stringify(data, 0, 2));
  return data;
};

const getLikes = async function () {
  // if the likes are over a few days old, let's update behind the scenes
  if (forced) {
    since_id = 0;
    console.log('forced'); // just writes
    return await get().then(writeLikes);
  }

  // const stats = statSync(likesPath);
  // const twoDaysAgo = Date.now() - 24 * 60 * 60 * 1000;
  return get().then(writeLikes);
};

const get = async (page = 0, all = { children: [] }) => {
  return new Promise((resolve, reject) => {
    console.log(page, all.children.length, url(page));
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
