const { resolve, extname } = require('path');
const DevServer = require('@11ty/eleventy-dev-server');
const fs = require('fs');
const { cwd, output, input } = require('./globals');
const loadMarkdown = require('./markdown');
const { saveStatic, saveTransformed } = require('./save');
const generateCollections = require('./collections');
const loadLess = require('./less');
const loadTemplates = require('./templates');
const port = process.env.PORT || 9000;

require('./index');

let redirects = [];

try {
  redirects = fs
    .readFileSync(resolve(cwd, output, '_redirects'), 'utf8')
    .split('\n')
    .map((_) => _.trim())
    .filter(Boolean)
    .map((_) => {
      let [route, url, status] = _.split(/\s+/g).map((_) => _.trim());
      let wild = false;
      let splat = false;

      if (route.endsWith('*')) {
        route = route.slice(0, -1);
        wild = true;
      }

      if (url.endsWith(':splat')) {
        url = url.replace(/:splat/, '');
        splat = true;
      }

      return { route, url, status: parseInt(status), wild, splat };
    });
} catch (e) {
  console.log(e);
}

// Netlify semantics: a real file in the output dir always wins over a
// redirect rule, so let the dev server serve it and only fall back to
// `_redirects` when nothing is on disk. This ordering matters: rules like
// `/images/* https://download-remysharp.netlify.com/:splat 200` would
// otherwise proxy every local image out to the internet.
const middleware = async (req, res, next) => {
  const { pathname, searchParams } = new URL(req.url, `http://localhost:${port}`);

  if (pathname === '/redirect') {
    res.writeHead(302, { Location: searchParams.get('url') });
    return res.end();
  }

  const staticMatch = server.mapUrlToFilePath(req.url);
  if (staticMatch && staticMatch.statusCode !== 404) {
    return next();
  }

  const match = redirects.find((_) => {
    if (_.wild) {
      return pathname.startsWith(_.route);
    }

    return pathname === _.route;
  });

  if (!match) {
    // no rule either: let the dev server render its own 404
    return next();
  }

  let { status, url, splat, route } = match;

  if (splat) {
    url = url + pathname.replace(route, '');
  }

  if (status > 300 && status < 400) {
    res.writeHead(status, { Location: url });
    return res.end();
  }

  if (url.startsWith('http')) {
    try {
      const response = await fetch(url);
      const buffer = Buffer.from(await response.arrayBuffer());
      res.statusCode = response.status;
      const type = response.headers.get('content-type');
      if (type) res.setHeader('content-type', type);
      return res.end(buffer);
    } catch (error) {
      res.statusCode = 502;
      return res.end();
    }
  }

  res.statusCode = status;
  res.isCustomErrorPage = status !== 200;
  req.url = url;
  return next();
};

const server = DevServer.getServer('site', resolve(cwd, output), {
  port,
  domDiff: true,
  liveReload: true,
  watch: [],
  middleware: [middleware],
});

async function init() {
  const chokidar = await import('chokidar');
  server.serve(port);
  startWatch(chokidar.default);
}

function startWatch(chokidar) {
  chokidar
    .watch(input, { ignored: /(^|[/\\])\../, persistent: true })
    .on('change', async (filename) => {
      const ext = extname(filename);
      console.log('+ %s', filename);

      let content = null;

      if (ext === '.md') {
        content = await loadMarkdown.single(filename);
        const collections = await generateCollections(content);
        content = await loadTemplates(content, collections);
      }

      if (ext === '.less') {
        content = await loadLess();
      }

      if (ext === '.pug') {
        content = await loadMarkdown();
        const collections = await generateCollections(content);
        content = await loadTemplates(content, collections);
      }

      // not a .css or .html path, so this triggers a full page reload
      setTimeout(() => {
        server.reloadFiles([resolve(cwd, output)]);
      }, 1000);

      if (content !== null) {
        return saveTransformed(content);
      }

      // static
      return saveStatic([filename]);
    });
}

init();
