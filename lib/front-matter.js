const { resolve, parse } = require('path');
const fs = require('fs-extra');
const glob = require('fast-glob');

const matter = require('gray-matter');

console.time('total');

// settings
const cwd = process.cwd();
const input = 'public';

const data = {
  blog: require(resolve(cwd, input, 'blog', '_data.json')),
  drafts: require(resolve(cwd, input, 'drafts', '_data.json')),
};

function addMetadata(meta, content) {
  return matter.stringify(content, meta);
}

async function loadContent() {
  const res = (
    await glob([
      resolve(cwd, input, 'blog') + '/*.md',
      resolve(cwd, input, 'books') + '/*.md',
      resolve(cwd, input, 'drafts') + '/*.md',
    ])
  ).filter((filename) => {
    // remove any starting with _
    return !(filename.startsWith('_') || filename.includes('/_'));
  });

  const contents = await Promise.all(
    res.map((filename) => fs.readFile(filename, 'utf8'))
  );

  return Promise.all(
    res.map(async (inputPath, i) => {
      const input = contents[i];
      const parsed = parse(inputPath);
      const dir = parsed.dir;
      const slug = parsed.name;

      const res = {
        inputPath,
        slug,
        input,
      };

      res.output = addMetadata(data[dir.split('/').pop()][slug], input);
      return res;
    })
  );
}

async function main() {
  // run all files through transform
  const content = await loadContent();

  console.log(`> ${content.length} posts`);

  // this await ensures all the directories are in place
  console.time('generate');
  await Promise.all(
    content.map((content) => {
      return fs.outputFile(content.inputPath, content.output);
    })
  );

  console.timeEnd('generate');
}

main()
  .catch((e) => console.log(e))
  .then(() => console.timeEnd('total'));
