'use strict';

var http = require('http');
var fs = require('fs');
var st = require('st');
var glob = require('glob');
var harp = require('harp');
var outputPath = __dirname + '/www';
var port = process.env.PORT || 9000;
var router = require('router');
var blogs = require('./public/blog/_data.json');
var route = router();
var fourohfour = '';
var mount;
var moment = require('moment');
var htmlFiles = [];

// this line, although dirty, ensures that Harp templates
// have access to moment - which given the whole partial
// import hack doesn't work consistently across dynamic vs
// compiled, this is the cleanest solution.
global.moment = moment;

route.all('*', function (req, res, next) {
  // required by harp because it thinks I'm using express...
  req.originalUrl = req.url;
  next();
});

route.all('/feed/', function (req, res, next) {
  // required by harp because it thinks I'm using express...
  req.url = '/feed.xml';
  next();
});

route.all(/\/downloads\/(.*)$/, function (req, res, next) {
  res.writeHead(302, { 'location': 'http://download.remysharp.com/' + req.params[1] });
  res.end();
});

route.all('/wp-content/uploads/{year}/{month}/{filename}', function (req, res, next) {
  res.writeHead(302, { 'location': 'http://download.remysharp.com/' + req.params.filename });
  res.end();
});

route.all('/{blog}?/{post}', function (req, res, next) {
  var post = blogs[req.params.post];
  if (post) {
    var url = moment(post.date).format('/YYYY/MM/DD/') + req.params.post;
    res.writeHead(302, { 'location': url });
    res.end();
    return;
  }
  next();
});

route.all(/^\/([0-9]{4})\/([0-9]{1,2})\/([0-9]{1,2})\/([a-z0-9\-].*?)(\/)?$/, function (req, res, next) {
  var params = req.params;
  var post = blogs[params[4]];

  if (post && post.date) {
    // test if the date matches

    // note that with moment, we're specifying the parse format
    var date = moment(post.date.split(' ')[0]);
    var requestDate = params.slice(1, 4).join('-');

    if (date.format('YYYY-MM-DD') !== requestDate) {
      return next();
    }

    if (params[5] === '/') {
      res.writeHead(302, { 'location': req.url.replace(/(.)\/$/, '$1')});
      res.end();
      return;
    }

    req.url = '/blog/' + params[4];
  }

  next();
});

route.all(/^\/([0-9]{4})(\/?)$/, function (req, res, next) {
  req.url = '/archive/' + req.params[1] + '/';
  next();
});

var server = function (root) {
  glob('**/*.html', {
    cwd: root,
    dot: false
  }, function (er, files) {
    htmlFiles = files.map(function (file) {
      return '/' + file;
    });
  });

  mount = st({
    path: root,
    url: '/',
    index: 'index.html', // server index.html for directories
    passthrough: true // pass through if not found, so we can send 404
  });

  console.log('compilation complete');
};

function run() {

  if (process.env.NODE_ENV === 'production') {
    // lastly...
    route.get('*', function (req, res, next) {
      req.url = req.url.replace(/\?.*$/, '').replace(/(.)\/$/, '$1');
      if (htmlFiles.indexOf(req.url + '.html') !== -1) {
        // then we requested /foo/bar and we know there's a
        // generated file that matches
        req.url += '.html';
      }

      if (mount) {
        mount(req, res, function serve404() {
          res.writeHead(404);
          res.end(fourohfour);
        });
      } else {
        res.writeHead(404);
        res.end();
      }
    });

    console.log('Running harp-static on ' + port);
    http.createServer(route).listen(port);

    fourohfour = require('fs').readFileSync(outputPath + '/404.html');
    server(outputPath, port);
  } else {
    route.all('*', harp.mount(__dirname));
    route.all('*', function (req, res) {
      req.url = '/404';
      harp.mount(__dirname)(req, res);
    });
    console.log('Running harp-static on ' + port);
    http.createServer(route).listen(port);

    server(__dirname + '/public');
  }
}

if (process.argv[2] === 'compile') {
  harp.compile(__dirname, outputPath, function(errors){
    if(errors) {
      console.log(JSON.stringify(errors, null, 2));
      process.exit(1);
    }

    process.exit(0);
  });
} else {
  run();
}