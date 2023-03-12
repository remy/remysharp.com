const slugify = require('slugify');
const format = require('date-fns/format');
const { resolve, parse, relative } = require('path');
const isDraft = require('./is-draft');

const cwd = process.cwd();

module.exports = function (input, output, record) {
  const { name, dir } = parse(record.inputPath);
  const root = dir.replace(new RegExp(input + '/?'), '');

  // FIXME not quite right
  let args = [cwd, dir.replace(input, output)];
  if (name !== 'index') {
    const slug = slugify(name);

    if (record.data && root === 'blog') {
      args.pop();
      args.push(output);
      if (isDraft(record)) {
        // draft
        console.log('draft: %s', slug, record.data.date);

        args.push('drafts');
      } else {
        args.push(format(record.data.date, 'yyyy/MM/dd'));
      }
    }
    args.push(slug + '.html');
  } else {
    args.push('index.html');
  }

  const res = relative(cwd, resolve(...args));

  return res;
};
