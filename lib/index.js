const { resolve, parse } = require('path');
const fs = require('fs-extra');
const { glob } = require('./glob');
const copy = require('recursive-copy');
const md = require('markdown-it')({ html: true });
const less = require('less');
const matter = require('gray-matter');
const _generateOutputPath = require('./generate-output-path');
const redirects = require('./redirects');
const loadContent = require('./load-content');
const loadTransforms = require('./load-transforms');
console.time('total');

// settings
const { output, input, cwd } = require('./globals.js');
const generateOutputPath = _generateOutputPath.bind(null, input, output);

async function main() {
  // run all files through transform
  let content = await loadContent(
    'md',
    async content => {
      const fm = matter(content.input);
      content.data = fm.data;
      content.output = await md.render(fm.content);
    },
    generateOutputPath
  );

  const collections = require('./collections')(content);

  // const results =
  content = await loadTransforms(content, collections);

  // const transformed = contents.map()
  console.log(`> ${content.length} posts`);

  // return;

  // if we got this far, blow away the previous site and save out
  await fs.emptyDir(resolve(cwd, output));

  // misc other files
  const miscPattern = [
    `!${resolve(cwd, input)}/**/*.md`,
    `!${resolve(cwd, input)}/**/*.pug`,
    `!${resolve(cwd, input)}/images/**/*.*`,
    `!${resolve(cwd, input)}/css/**/*.less`,
    `${resolve(cwd, input)}/**/*.*`,
  ];
  const misc = (await glob(miscPattern)).filter(filename => {
    // remove any starting with _
    if (filename === '_redirects' || filename === '_headers') return true;
    return !(filename.startsWith('_') || filename.includes('/_'));
  });

  console.time('less');
  const css = await loadContent(
    'less',
    content =>
      less
        .render(content.input, { paths: [parse(content.inputPath).dir] })
        .then(res => {
          content.output = res.css;
        }),
    content =>
      content.inputPath.replace(/\.less$/, '.css').replace(input, output)
  );
  console.timeEnd('less');

  // this await ensures all the directories are in place
  console.time('generate');
  await Promise.all(
    content.concat(css).map(content => {
      return fs.outputFile(content.outputPath, content.output);
    })
  );

  console.timeEnd('generate');

  console.time('copy misc');
  Promise.all(
    misc.map(filename => fs.copy(filename, filename.replace(input, output)))
  ).then(() => console.timeEnd('copy misc'));

  console.time('assets');
  Promise.all(
    ['images'].map(src =>
      copy(resolve(cwd, input, src), resolve(cwd, output, src))
    )
  ).then(() => console.timeEnd('assets'));

  fs.writeFile(resolve(cwd, output, '_redirects'), redirects(collections));
}

main()
  .catch(e => console.log(e))
  .then(() => console.timeEnd('total'));
