const chokidar = require('chokidar');
const { resolve, extname } = require('path');
const browserSync = require('browser-sync');
const request = require('request');
const fs = require('fs');
const { cwd, output, input } = require('./globals');
const loadMarkdown = require('./markdown');
const { saveStatic, saveTransformed } = require('./save');
const generateCollections = require('./collections');
const loadLess = require('./less');
const loadTemplates = require('./templates');
const port = process.env.PORT || 9000;
const server = browserSync.create();

require('./index');

let redirects = [];

try {
  redirects = fs
    .readFileSync(resolve(cwd, output, '_redirects'), 'utf8')
    .split('\n')
    .map(_ => _.trim())
    .filter(Boolean)
    .map(_ => {
      let [route, url, status] = _.split(/\s+/g).map(_ => _.trim());
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

const middleware = (req, res) => {
  const match = redirects.find(_ => {
    if (_.wild) {
      return req.url.startsWith(_.route);
    }

    return req.url === _.route;
  });

  if (!match || match.status === 404) {
    try {
      const exists = fs.existsSync(
        resolve(output, req.url.substring(1) + '.html')
      );
      if (exists) {
        return request({ url: `http://localhost:${port}${req.url}.html` }).pipe(
          res
        );
      }
    } catch (E) {
      console.log(E);
    }
    if (!match) {
      res.writeHead(400);
      res.end('404');
      return;
    }
  }

  let { status, url, splat, route } = match;

  if (splat) {
    url = url + req.url.replace(route, '');
  }

  if (status > 300 && status < 400) {
    res.writeHead(status, {
      Location: splat ? url.replace(':splat', req.url.replace(route, '')) : url,
    });
    return res.end();
  } else if (url.startsWith('http')) {
    return request({ url })
      .on('error', () => {
        res.writeHead(404);
        res.end();
      })
      .pipe(res);
  }

  res.writeHead(status, { 'content-type': 'text/html' });
  request({ url: `http://localhost:${port}${url}` })
    .pipe(res)
    .on('error', () => {});
  // next();
};

server.init({
  watch: true,
  open: false,
  notify: false,
  ignored: [/(^|[/\\])\../],
  server: resolve(cwd, output),
  port,
  // middleware: (req, res, next) => {
  //   next();
  // },
  callbacks: {
    ready: (error, bs) => {
      bs.addMiddleware('*', middleware);
    },
  },
});

chokidar
  .watch(input, { ignored: /(^|[/\\])\../, persistent: true })
  .on('change', async filename => {
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

    if (content !== null) {
      return saveTransformed(content);
    }

    // static
    return saveStatic([filename]);
  });
