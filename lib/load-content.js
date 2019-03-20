const slugify = require('slugify');
const fs = require('fs-extra');
const { parse } = require('path');
const through = _ => _.inputPath;
const { glob, globFor } = require('./glob');
const { output } = require('./globals.js');

module.exports = async function loadContent(
  pattern,
  transform = through,
  permalink = through
) {
  const res = (await glob(globFor(pattern))).filter(filename => {
    // remove any starting with _
    return !(filename.startsWith('_') || filename.includes('/_'));
  });

  const contents = await Promise.all(
    res.map(filename => fs.readFile(filename, 'utf8'))
  );

  return Promise.all(
    res.map(async (inputPath, i) => {
      const input = contents[i];
      const res = {
        inputPath,
        slug: slugify(parse(inputPath).name),
        input,
      };

      // adds .output and .data
      await transform(res);

      res.outputPath = permalink(res);
      res.url = res.outputPath.replace(/\/index.html$/, '').replace(output, '');

      return res;
    })
  );
};
