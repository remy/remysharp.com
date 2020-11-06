const { resolve } = require('path');
const fs = require('fs-extra');
const redirects = require('./redirects');
const loadMarkdown = require('./markdown');
const loadLess = require('./less');
const loadTemplates = require('./templates');
const loadMisc = require('./misc');
const loadSW = require('./sw');
const generateCollections = require('./collections');
const { saveStatic, saveTransformed } = require('./save');
console.time('total');

// settings
const { output, cwd } = require('./globals.js');

async function main() {
  // run all files through transform
  console.time('transform');
  console.time('loadMarkdown');
  let content = await loadMarkdown();
  console.timeEnd('loadMarkdown');
  console.time('generateCollections');
  const collections = await generateCollections(content);
  console.timeEnd('generateCollections');
  console.time('loadTemplates');
  content = await loadTemplates(content, collections);
  console.timeEnd('loadTemplates');

  // if we got this far, blow away the previous site and save out
  await fs.emptyDir(resolve(cwd, output));

  console.time('loadMisc et el');
  const misc = await loadMisc();
  const css = await loadLess();
  const sw = await loadSW();
  console.timeEnd('loadMisc et el');
  console.timeEnd('transform');

  // this await ensures all the directories are in place

  console.time('save process');
  await Promise.all([
    saveTransformed(content),
    saveTransformed(css),
    saveTransformed([sw]),
    saveStatic(misc),
  ]);
  await redirects(collections).then((res) =>
    fs.writeFile(resolve(cwd, output, '_redirects'), res)
  );
  console.timeEnd('save process');
  console.log(`> ${content.length} posts`);
}

main()
  .catch((e) => console.log(e))
  .then(() => console.timeEnd('total'));
