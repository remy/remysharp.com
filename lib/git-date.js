const { exec } = require('child_process');
const { writeFileSync } = require('fs');
const { resolve } = require('path');
const { glob } = require('./glob');

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

async function main(subDir) {
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
  main('.')
    .then((res) =>
      writeFileSync(
        resolve(__dirname, '../public/_dates.json'),
        JSON.stringify(res)
      )
    )
    .then(() => {
      console.log('post dates complete');
    });
}
