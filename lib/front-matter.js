const { resolve, parse, relative, join } = require('path');
const fs = require('fs-extra');
const glob = require('fast-glob');
const slugify = require('slugify');
const format = require('date-fns/format');
const copy = require('recursive-copy');
const md = require('markdown-it')('commonmark');
const less = require('less');

console.time('total');

// settings
const cwd = process.cwd();
const output = '_site';
const input = 'public';

const data = {
  blog: require(resolve(cwd, input, 'blog', '_data.json')),
  drafts: require(resolve(cwd, input, 'drafts', '_data.json')),
};

const globFor = ext => `${(resolve(cwd), input)}/**/*.${ext}`;

function generatePermalink(filename) {
  const { name, dir } = parse(filename);
  // FIXME not quite right
  const args = [cwd, dir.replace(input, output)];
  if (name !== 'index') {
    const slug = slugify(name);

    if (data[dir][slug]) {
      // console.log(blogData[slug]);
      args.pop();
      args.push(output);
      args.push(format(data[dir][slug].date, 'YYYY/MM/DD'));
    }
    args.push(slug);
  }
  args.push('index.html');

  const res = relative(cwd, resolve(...args));
  return res;
}

async function loadContent() {
  const res = (await glob(globFor('md'))).filter(filename => {
    // remove any starting with _
    return !(filename.startsWith('_') || filename.includes('/_'));
  });

  const contents = await Promise.all(
    res.map(filename => fs.readFile(filename, 'utf8'))
  );

  return Promise.all(
    res.map(async (filename, i) => {
      const input = contents[i];
      const outputPath = permalink(filename);
      const res = {
        inputPath: filename,
        outputPath,
        slug: parse(outputPath)
          .dir.split('/')
          .pop(),
        input,
      };

      res.output = addMetadata();
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
    content.map(content => {
      return fs.outputFile(content.inputPath, content.output);
    })
  );

  console.timeEnd('generate');
}

main()
  .catch(e => console.log(e))
  .then(() => console.timeEnd('total'));
