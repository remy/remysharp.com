const { resolve, parse, join } = require('path');
const format = require('date-fns/format');
const slugify = require('slugify');
const fs = require('fs-extra');
const glob = require('fast-glob');
const pug = require('pug');
const copy = require('recursive-copy');
const md = require('markdown-it')('commonmark');
const less = require('less');
const matter = require('gray-matter');
const findPartial = require('./find-partial');
const _generateOutputPath = require('./generate-output-path');
const loadLocalData = require('./load-local-data');

const now = new Date();
console.time('total');

// settings
const cwd = process.cwd();
const output = '_site';
const input = 'public';
const globals = require('../harp.json').globals;
const generateOutputPath = _generateOutputPath.bind(null, input, output);

const through = _ => _.inputPath;

const blogData = require(resolve(cwd, input, 'blog', '_data.json'));
const draftData = require(resolve(cwd, input, 'drafts', '_data.json'));
const speakingData = require(resolve(cwd, input, 'speaking', '_data.json'));

const globFor = ext => `${(resolve(cwd), input)}/**/*.${ext}`;

async function loadContent(pattern, transform = through, permalink = through) {
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
}

async function loadTransforms(content, collections) {
  const filenames = await glob(globFor('pug'));

  const pages = [];
  const templates = [];
  const layouts = {};

  const partial = (filename, locals) => {
    const ext = ['pug', 'md', 'html'].find(
      findPartial.bind(null, join(cwd, input), filename)
    );
    return pug.renderFile(join(cwd, input, filename + '.' + ext), {
      compileDebug: true,
      current: global.current,
      ...locals,
      ...commons,
      collections,
    });
  };

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
    partial,
    environment: process.env.NODE_ENV,
    collections,
    public: {
      blog: { _data: blogData },
      drafts: { _data: draftData },
      speaking: { _data: speakingData },
    },
    ...globals,
  };

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

  const pagesRendered = pages.map(inputPath => {
    const res = {
      inputPath,
    };
    res.outputPath = generateOutputPath(res);

    const { dir, name } = parse(inputPath);

    res.output = pug.renderFile(inputPath, {
      current: {
        path: dir.split('/'),
        source: name,
        ...res,
      },
      _data: loadLocalData(inputPath),
      ...res,
      ...commons,
    });

    return res;
  });

  return content.concat(pagesRendered).map(c => {
    const { dir, name } = parse(c.inputPath);
    const slug = parse(c.outputPath)
      .dir.split('/')
      .pop();

    const layout = layouts[dir] || layouts.public;
    if (!layout) {
      console.log('no loayout for', c.inputPath, dir);
    }
    if (layout) {
      let title = blogData[slug];
      const [_title, ...rest] = c.output.split('\n');
      c.output = rest.join('\n');
      if (_title.includes('<h1>')) {
        title = _title.replace(/<h1>(.*)<\/h1>/, '$1');
      }
      c.output = layout({
        current: {
          path: dir.split('/'),
          source: name,
          ...c,
        },
        yield: c.output,
        title,
        ...blogData[slug],
        ...c,
        ...commons,
      });
    }
    return c;
  });
}

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
}

main()
  .catch(e => console.log(e))
  .then(() => console.timeEnd('total'));
