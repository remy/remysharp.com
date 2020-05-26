const { resolve } = require('path');
const { gitlogPromise: git } = require('gitlog');
const { glob } = require('./glob');

async function main(subDir) {
  const dir = resolve(__dirname, '/../public/', subDir);

  const repo = resolve(__dirname, '..');
  const options = {
    repo,
    number: 1,
    fields: ['authorDate', 'authorDateRel'],
  };
  const files = await glob(`.${dir}/**/*.md`);
  const res = (
    await Promise.all(files.map((_) => git({ ...options, file: _ })))
  )
    .flat()
    .reduce((acc, curr) => {
      acc[curr.files[0]] = curr.authorDate;
      return acc;
    }, {});
  return res;
}

module.exports = main;

if (!module.parent) {
  main('til').then((res) => console.log(res));
}
