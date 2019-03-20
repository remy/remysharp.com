const { resolve } = require('path');
const browserSync = require('browser-sync');
const { cwd, output } = require('./globals');
const server = browserSync.create();
const handle = (req, res) => {
  res.writeHead(302, {
    Location: `https://download-remysharp.netlify.com${req.url}`,
  });
  res.end();
};

server.init({
  middleware: [{ route: '/images', handle }],
  watch: true,
  open: false,
  server: resolve(cwd, output),
  port: process.env.PORT || 9000,
});
