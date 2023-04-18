const { exec } = require('child_process');
const { writeFileSync, statSync } = require('fs');
const { resolve } = require('path');
const { glob } = require('./glob');

let forced = false;

const filename = resolve(__dirname, '../public/_dates.json');

async function git({ repo, file }) {
  let command = `git log --pretty='format:@begin@%aI' --follow -- "${file}"`;

  return new Promise((resolve, reject) => {
    exec(command, { cwd: repo }, (err, stdout, stderr) => {
      const commits = stdout.split('@begin@').map((_) => _.trim());

      if (commits[0] === '') {
        commits.shift();
      }

      if (stderr || err) {
        console.log(command);
        console.log(stderr | err);

        return reject(stderr ? new Error(stderr) : err);
      }

      resolve({
        file,
        commits: commits.map((c) => {
          return new Date(c);
        }),
      });
    });
  });
}

async function write(res) {
  writeFileSync(filename, JSON.stringify(res, 0, 2));
  return res;
}

async function main(dir) {
  if (forced) {
    console.log('forced'); // just writes
    return get(dir).then(write);
  }

  const stats = statSync(filename);
  const twoDaysAgo = Date.now() - 24 * 60 * 60 * 1000;
  if (stats.mtimeMs < twoDaysAgo) {
    await get(dir).then(write);
  }

  return Promise.resolve(require(filename));
}

async function get(subDir) {
  const dir = resolve(__dirname, '/../public/', subDir);

  const repo = resolve(__dirname, '..');
  const options = {
    repo,
    number: 100,
    fields: ['authorDate'],
  };
  const files = await glob(`.${dir}/**/*.md`);
  const res = (
    await Promise.all(files.map((_) => git({ ...options, file: _ })))
  )
    .flat()
    .reduce((acc, curr) => {
      acc[curr.file.replace(/^\.\//, '')] = {
        created: curr.commits[curr.commits.length - 1],
        modified: curr.commits[0],
      };
      return acc;
    }, {});

  return res;
}

module.exports = main;

if (!module.parent) {
  forced = true;
  main('.').then(() => {
    console.log('post dates complete');
  });
}
