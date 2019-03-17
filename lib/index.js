const { resolve, parse, relative, join } = require('path');
const fs = require('fs-extra');
const glob = require('fast-glob');
const slugify = require('slugify');
const pug = require('pug');
const format = require('date-fns/format');
const copy = require('recursive-copy');
const md = require('markdown-it')('commonmark');
const less = require('less');

const now = new Date();
console.time('total');

// settings
const cwd = process.cwd();
const output = '_site';
const input = 'public';
const globals = require('../harp.json').globals;

const through = _ => _;

const blogData = require(resolve(cwd, input, 'blog', '_data.json'));
const draftData = require(resolve(cwd, input, 'drafts', '_data.json'));
const speakingData = require(resolve(cwd, input, 'speaking', '_data.json'));

const globFor = ext => `${(resolve(cwd), input)}/**/*.${ext}`;

function generatePermalink(filename) {
  const { name, dir } = parse(filename);
  // FIXME not quite right
  const args = [cwd, dir.replace(input, output)];
  if (name !== 'index') {
    const slug = slugify(name);

    if (blogData[slug]) {
      // console.log(blogData[slug]);
      args.pop();
      args.push(output);
      args.push(format(blogData[slug].date, 'YYYY/MM/DD'));
    }
    args.push(slug);
  }
  args.push('index.html');

  const res = relative(cwd, resolve(...args));

  // console.log(res);
  return res;
}

async function loadContent(pattern, transform = through, permalink = through) {
  const res = (await glob(globFor(pattern))).filter(filename => {
    // remove any starting with _
    return !(filename.startsWith('_') || filename.includes('/_'));
  });

  const contents = await Promise.all(
    res.map(filename => fs.readFile(filename, 'utf8'))
  );

  return Promise.all(
    res.map(async (filename, i) => {
      const input = contents[i];
      const outputPath = permalink(filename);
      const res = {
        inputPath: filename,
        outputPath,
        slug: parse(outputPath)
          .dir.split('/')
          .pop(),
        input,
      };

      res.output = await transform(res);
      return res;
    })
  );
}

function findPartial(filename, ext) {
  let root = join(cwd, input, filename);
  try {
    fs.statSync(root + '.' + ext);
    return true;
  } catch (e) {
    return false;
  }
}

async function loadTransforms(content, collections) {
  const filenames = await glob(globFor('pug'));

  const pages = [];
  const templates = [];
  const layouts = {};

  const partial = filename => {
    const ext = ['pug', 'md', 'html'].find(findPartial.bind(null, filename));

    return pug.renderFile(join(cwd, input, filename + '.' + ext), {
      compileDebug: true,
      current: global.current,
      ...commons,
    });
  };

  const commons = {
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

  content.forEach(c => {
    const { dir, name } = parse(c.inputPath);
    const slug = parse(c.outputPath)
      .dir.split('/')
      .pop();

    const layout = layouts[dir];
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
        },
        yield: c.output,
        title,
        ...blogData[slug],
        ...c,
        ...commons,
      });
    }
  });

  content.push(
    ...pages.map(inputPath => {
      const outputPath = generatePermalink(inputPath);
      const res = {
        inputPath,
        outputPath,
      };

      const { dir, name } = parse(inputPath);
      const slug = parse(outputPath)
        .dir.split('/')
        .pop();

      res.output = pug.renderFile(inputPath, {
        current: {
          path: dir.split('/'),
          source: name,
        },
        ...blogData[slug],
        ...res,
        ...commons,
      });

      return res;
    })
  );
}

async function main() {
  // run all files through transform
  const content = await loadContent(
    'md',
    file => md.render(file.input),
    generatePermalink
  );

  // add rules here…

  const collections = {
    all: content,
    latest: content[400],
    blog: content.filter(_ => _.inputPath.includes('blog/')),
    drafts: content.filter(_ => _.inputPath.includes('drafts/')),
    recent: content.slice(-3),
  };

  const results = await loadTransforms(content, collections);

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
    `!${resolve(cwd, input)}/css/**/*.*`,
    `${resolve(cwd, input)}/**/*.*`,
  ];
  const misc = (await glob(miscPattern)).filter(filename => {
    // remove any starting with _
    return !(filename.startsWith('_') || filename.includes('/_'));
  });

  // this await ensures all the directories are in place
  console.time('generate');
  await Promise.all(
    content.map(content => {
      return fs.outputFile(content.outputPath, content.output);
    })
  );

  console.timeEnd('generate');

  console.time('less');
  loadContent(
    'less',
    css =>
      less
        .render(css.input, { paths: [parse(css.inputPath).dir] })
        .then(res => res.css),
    filename => filename.replace(/\.less$/, '.css')
  ).then(() => console.timeEnd('less'));

  console.time('copy misc');
  Promise.all(
    misc.map(filename => fs.copy(filename, filename.replace(input, output)))
  ).then(() => console.timeEnd('copy misc'));

  console.time('assets');
  Promise.all(
    ['images', 'css'].map(src =>
      copy(resolve(cwd, input, src), resolve(cwd, output, src))
    )
  ).then(() => console.timeEnd('assets'));
}

main()
  .catch(e => console.log(e))
  .then(() => console.timeEnd('total'));
