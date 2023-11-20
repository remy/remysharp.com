const fs = require('fs-extra');
const { promisify } = require('util');
const { join, parse } = require('path');
const md = require('markdown-it')({ html: true });
const format = require('date-fns/format');
const distanceInWordsStrict = require('date-fns/formatDistanceStrict');
const differenceInCalendarDays = require('date-fns/differenceInCalendarDays');
const differenceInCalendarYears = require('date-fns/differenceInCalendarYears');
const getDayOfYear = require('date-fns/getDayOfYear');
const addDays = require('date-fns/addDays');
const findPartial = require('./find-partial');
const loadLocalData = require('./load-local-data');
const pug = require('pug');
const matter = require('gray-matter');
const approx = require('approximate-number');
const generateOutputPath = require('./generate-output-path');
const permalink = require('./permalink');
const TurndownService = require('turndown');
const slugify = require('slugify');
const hashFiles = promisify(require('hash-files'));
const books = require('../public/books/_books.json');

const now = new Date();
const td = new TurndownService();

const { cwd, input, output, ...globals } = require('./globals');
const { glob, globFor } = require('./glob');
const numWords = require('num-words');

const simpleSort = (a, b) => (a < b ? -1 : 1);

const commons = {
  pretty: true,
  basedir: input,
  markdown: (s) => md.render(s.replace(/\\([->_*])/g, '$1')),
  turndown: (s) => td.turndown(s).replace(/\\([->_*])/g, '$1'),
  filters: {
    marked: (s) => md.render(s),
    markdown: (s) => md.render(s),
  },
  slugify: (s) =>
    slugify(s, {
      remove: /[*+~.()'"!:@,#]/g,
    }).toLowerCase(),
  firstDate(date) {
    if (Array.isArray(date)) {
      date = date.sort(simpleSort)[0];
    }
    return date;
  },
  filenameToUrl(filename) {
    return filename
      .replace(/\.md$/, '')
      .replace(/\/index$/, '')
      .replace(/^(.*\/)?public\//, '/');
  },
  seriesBooks(series, ignore) {
    if (!series) return [];
    const res = books
      .filter((_) => _.series === series && _.slug !== ignore)
      .sort((a, b) => a.seriesNumber - b.seriesNumber);
    return res;
  },
  lastDate(date) {
    if (Array.isArray(date)) {
      date = [...date].sort(simpleSort).pop();
    }
    return date;
  },
  approx,
  readCount(date) {
    let res = '';
    if (Array.isArray(date)) {
      if (date.length === 2) {
        res += `(twice)`;
      } else if (date.length > 2) {
        res += `(${numWords(date.length)} times)`;
      }
    }

    return res;
  },
  moment(date = now) {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return {
      age: () => differenceInCalendarYears(new Date(), date),
      ageInDays: () => differenceInCalendarDays(new Date(), date),
      ago: () => distanceInWordsStrict(new Date(), date),
      format: (str) => {
        let after = date;
        if (Array.isArray(after)) {
          after = after.sort(simpleSort)[0];
        }
        if (typeof after === 'string') {
          if (after === 'NaN') {
            after = now;
          } else {
            after = new Date(date);
          }
        }
        try {
          return format(after || now, str);
        } catch (e) {
          return '(Unknown)';
        }
      },
      modDOY: (n) => getDayOfYear(date) % n,
    };
  },
  duration(fromDate, toDate) {
    let res = '?';

    if (Array.isArray(fromDate)) {
      fromDate = fromDate.sort(simpleSort)[0];
    }

    if (Array.isArray(toDate)) {
      toDate = toDate.sort(simpleSort)[0];
    }

    try {
      res = distanceInWordsStrict(
        new Date(fromDate),
        addDays(new Date(toDate), 1)
      );

      if (res === '0 seconds') {
        return '1 day';
      }
    } catch (_) {
      // nop
    }

    return res;
  },
  ...globals,
};

async function getRevHashes() {
  const hashes = await Promise.all([
    hashFiles({ files: input + '/js/**/*.js' }),
    hashFiles({ files: input + '/css/*' }),
  ]);

  commons.hashes = {
    js: hashes[0].slice(-6),
    css: hashes[1].slice(-6),
  };
}

// FIXME - I don't think partial blocks are working properly
function partial({ collections, commons }) {
  return (filename, locals) => {
    const ext = ['pug', 'md', 'html'].find(
      findPartial.bind(null, join(cwd, input), filename)
    );

    const options = {
      ...locals,
      ...commons,
      collections,
    };

    filename = join(cwd, input, filename + '.' + ext);

    if (ext === 'md') {
      // transform first
      const content = md.render(fs.readFileSync(filename, 'utf8'));
      return pug.render(content, filename, { ...options, filename });
    }

    return pug.renderFile(filename, options);
  };
}

module.exports = async function loadTransforms(content, collections) {
  const filenames = await glob(globFor('pug'));

  await getRevHashes();

  const pages = [];
  const templates = [];
  const layouts = {};

  commons.collections = collections;
  commons.partial = partial({ collections, commons });

  filenames.forEach((_) => {
    if (!(_.startsWith('_') || _.includes('/_'))) {
      return pages.push(_);
    }

    if (_.includes('layout.pug')) {
      const parsed = parse(_);

      // NOTE: I'm using sync read here because I know there will be a limited
      // number of layouts, so the perf cost is very low.
      layouts[parsed.dir] = pug.compile(fs.readFileSync(_, 'utf8'), {
        compileDebug: true,
        filename: _,
        ...commons,
      });
      return;
    }

    templates.push(_);
  });

  const pagesRendered =
    content.length > 1
      ? pages.map((inputPath) => {
          const content = {
            inputPath,
          };
          const { dir, name } = parse(inputPath);

          content.outputPath = generateOutputPath(input, output, content);
          content.dir = dir;
          content.dirname = dir.split('/').pop();
          content.filename = name;

          content.input = fs.readFileSync(inputPath, 'utf8');
          const fm = matter(content.input);
          content.data = { ...fm.data }; // ensure it's a copy

          // replace the templates in the front matter
          Object.keys(content.data).forEach((key) => {
            content.data[key] = (content.data[key] + '').replace(
              /(?:{{\s*(\S+)\s*}})/g,
              (all, match) => {
                return content[match];
              }
            );
          });

          if (content.data.permalink) {
            content.outputPath = permalink(content);
          }

          content.url = content.outputPath
            .replace(/(\/index)?\.html$/, '')
            .replace(output, '');

          if (!content.url) content.url = '/';

          // console.log('🖌  ' + content.inputPath);
          try {
            content.output = pug.render(fm.content, {
              filename: inputPath,
              current: {
                path: dir.split('/').slice(1),
                source: name,
                ...content,
              },
              ...loadLocalData(inputPath),
              ...content,
              ...content.data,
              ...commons,
            });
          } catch (e) {
            console.log(e, inputPath, content);
          }

          return content;
        })
      : [];

  return content.concat(pagesRendered).map((post) => {
    const { dir, name } = parse(post.inputPath);

    let layoutDir = dir;
    while (layoutDir) {
      if (layouts[layoutDir]) break;
      layoutDir = layoutDir.split('/').slice(0, -1).join('/');
    }

    const layout =
      layouts[post.data.layout] || layouts[layoutDir] || layouts.public;
    if (layout && post.data.layout !== 'false') {
      let title = post.data && post.data.title;
      const [_title, ...rest] = post.output.split('\n');
      post.output = rest.join('\n');
      if (_title.includes('<h1>')) {
        title = _title.replace(/<h1>(.*)<\/h1>/, '$1');
      } else {
        post.output = _title + '\n' + post.output;
      }
      const localData = loadLocalData(post.inputPath);

      post.output = layout({
        current: {
          path: dir.split('/').slice(1).concat(name),
          source: name,
          ...post,
        },
        ...localData,
        yield: post.output,
        title, // can be overwritten by `data`
        ...(post.data || localData._data || {}),
        ...post,
        ...commons,
      });
    }
    return post;
  });
};
