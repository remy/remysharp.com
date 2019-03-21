const slugify = require('slugify');
const fs = require('fs-extra');
const { parse } = require('path');
const through = _ => _.inputPath;
const { glob, globFor } = require('./glob');
const { output } = require('./globals.js');

module.exports = {
  loadFromGlob,
  loadContent,
};

async function loadFromGlob(pattern, transform, permalink) {
  return loadContent(await glob(globFor(pattern)), transform, permalink);
}

async function loadContent(files, transform = through, permalink = through) {
  const contents = await Promise.all(
    files.map(filename => fs.readFile(filename, 'utf8'))
  );

  return Promise.all(
    files.map(async (inputPath, i) => {
      const input = contents[i];
      const res = {
        inputPath,
        slug: slugify(parse(inputPath).name),
        input,
      };

      // adds .output and .data
      await transform(res);

      res.outputPath = permalink(res);
      res.url =
        res.outputPath.replace(/\/index.html$/, '').replace(output, '') + '/';

      return res;
    })
  );
}
