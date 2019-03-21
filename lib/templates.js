const fs = require('fs-extra');
const { join, parse } = require('path');
const md = require('markdown-it')({ html: true });
const format = require('date-fns/format');
const findPartial = require('./find-partial');
const loadLocalData = require('./load-local-data');
const pug = require('pug');
const matter = require('gray-matter');
const generateOutputPath = require('./generate-output-path');
const now = new Date();

const { cwd, input, output, ...globals } = require('./globals');
const { glob, globFor } = require('./glob');

const commons = {
  pretty: true,
  filters: {
    marked: s => md.render(s),
    markdown: s => md.render(s),
  },
  moment(date = now) {
    return {
      format: str => format(date, str),
    };
  },
  ...globals,
};

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

  const pages = [];
  const templates = [];
  const layouts = {};

  commons.collections = collections;
  commons.partial = partial({ collections, commons });

  filenames.forEach(_ => {
    if (!(_.startsWith('_') || _.includes('/_'))) {
      return pages.push(_);
    }

    if (_.includes('layout.pug')) {
      const parsed = parse(_);

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
      ? pages.map(inputPath => {
          const res = {
            inputPath,
          };
          res.outputPath = generateOutputPath(input, output, res);

          const { dir, name } = parse(inputPath);

          res.output = pug.renderFile(inputPath, {
            current: {
              path: dir.split('/').slice(1),
              source: name,
              ...res,
            },
            _data: loadLocalData(inputPath),
            ...res,
            ...commons,
          });

          return res;
        })
      : [];

  return content.concat(pagesRendered).map(post => {
    const { dir, name } = parse(post.inputPath);

    const layout = layouts[dir] || layouts.public;
    if (layout) {
      let title = post.data && post.data.title;
      const [_title, ...rest] = post.output.split('\n');
      post.output = rest.join('\n');
      if (_title.includes('<h1>')) {
        title = _title.replace(/<h1>(.*)<\/h1>/, '$1');
      }
      post.output = layout({
        current: {
          path: dir
            .split('/')
            .slice(1)
            .concat(name),
          source: name,
          ...post,
        },
        yield: post.output,
        title, // can be overwritten by `data`
        ...(post.data || {}),
        ...post,
        ...commons,
      });
    }
    return post;
  });
};
