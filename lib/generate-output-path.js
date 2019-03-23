const slugify = require('slugify');
const format = require('date-fns/format');
const { resolve, parse, relative } = require('path');

const cwd = process.cwd();

module.exports = function(input, output, record) {
  const { name, dir } = parse(record.inputPath);
  const root = dir.replace(new RegExp(input + '/?'), '');

  // FIXME not quite right
  const args = [cwd, dir.replace(input, output)];
  if (name !== 'index') {
    const slug = slugify(name);

    if (record.data && record.data.complete !== false && root === 'blog') {
      // console.log(blogData[slug]);
      args.pop();
      args.push(output);
      args.push(format(record.data.date, 'YYYY/MM/DD'));
    }
    args.push(slug + '.html');
  } else {
    args.push('index.html');
  }

  const res = relative(cwd, resolve(...args));

  return res;
};
