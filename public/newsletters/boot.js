const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);

function header(data) {
  return `---
title: "${data.title}"
date: ${data.date}
permalink: /newsletters/${data.date
    .split('-')
    .slice(0, 2)
    .join('-')}/index.html
source: ${data.url}
---

# ${data.title}`;
}

async function main() {
  const data = (await readFile(__dirname + '/data.txt', 'utf8'))
    .split('\n')
    .filter(Boolean)
    .map((line, i) => {
      const [date, m, d, y, url] = line.split(/\s+/);
      return { date, m, d, y, url, title: `# ${24 - i}: Remy's b:log` };
    });
  const files = (await readdir(__dirname)).filter(_ => _.endsWith('md'));

  data.map(async data => {
    const filename = `${__dirname}/${data.date}.md`;
    console.log(filename);

    const file = await readFile(filename, 'utf8');

    const contents = header(data) + file;

    // console.log(contents);

    await writeFile(filename, contents, 'utf8');
  });
}

console.clear();

main();
