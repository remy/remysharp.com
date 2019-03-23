const { resolve } = require('path');
const fs = require('fs-extra');
const redirects = require('./redirects');
const loadMarkdown = require('./markdown');
const loadLess = require('./less');
const loadTemplates = require('./templates');
const loadMisc = require('./misc');
const generateCollections = require('./collections');
const { saveStatic, saveTransformed } = require('./save');
console.time('total');

// settings
const { output, cwd } = require('./globals.js');

async function main() {
  // run all files through transform
  console.time('transform');
  let content = await loadMarkdown();
  const collections = await generateCollections(content);
  content = await loadTemplates(content, collections);

  // if we got this far, blow away the previous site and save out
  await fs.emptyDir(resolve(cwd, output));

  const misc = await loadMisc();
  const css = await loadLess();
  console.timeEnd('transform');

  // this await ensures all the directories are in place

  console.time('save process');
  await Promise.all([
    saveTransformed(content),
    saveTransformed(css),
    saveStatic(misc),
  ]);
  await redirects(collections).then(res =>
    fs.writeFile(resolve(cwd, output, '_redirects'), res)
  );
  console.timeEnd('save process');
  console.log(`> ${content.length} posts`);
}

main()
  .catch(e => console.log(e))
  .then(() => console.timeEnd('total'));
