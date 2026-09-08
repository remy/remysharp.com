const { createHash } = require('crypto');
const { readFile } = require('fs/promises');
const fg = require('fast-glob');

// Drop-in replacement for the abandoned `hash-files` package.
// Globs the given pattern(s), sorts + dedupes the matches, then returns a
// hex digest of their concatenated contents (sha1, matching the old default).
async function hashFiles({ files, algorithm = 'sha1' } = {}) {
  if (!files) {
    throw new Error('Missing or invalid parameters');
  }

  const matches = [...new Set(await fg(files))].sort();
  const contents = await Promise.all(matches.map((file) => readFile(file)));

  return createHash(algorithm).update(Buffer.concat(contents)).digest('hex');
}

module.exports = hashFiles;
