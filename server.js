'use strict';

const Marked = require('terraform/node_modules/marked');
const sizeOf = require('image-size');

// no widows in paragraphs
Marked.Renderer.prototype.paragraph = function(text) {
  const words = text.split(' ');
  if (words.length > 1) {
    return `<p>${words.slice(0, -1).join(' ')}&nbsp;${words[words.length-1]}</p>\n`;
  }
  return `<p>${text}</p>`;
}

// dynamically get the dimensions of the images
Marked.Renderer.prototype.image = function(href, title, text) {
  var out = '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  if (!href.endsWith('.svg')) {
    try {
      if (href.includes('://remysharp.com')) {
        href = href.replace(/^https?:\/\/remysharp.com/, '');
      }
      const dim = sizeOf(__dirname + '/public' + href);
      out += `width="${dim.width/2|0}" height="${dim.height/2|0}"`;
    } catch (e) {
      console.log('failed', href);
    }
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};

// require('es6-promise').polyfill(); // jshint ignore:line
var http = require('http');
var fs = require('fs');
var st = require('st');
var glob = require('glob');
var harp = require('harp');
var querystring = require('querystring');
var outputPath = __dirname + '/www';
var port = process.env.PORT || 9000;
var router = require('router-stupid');
var blogs = require('./public/blog/_data.json');
var pages = Object.keys(require('./public/_data.json'));
const harpcfg = require('./harp.json');
var slugs = Object.keys(blogs).sort(function (a, b) {
  return blogs[a].date < blogs[b].date ? 1 : -1;
});

var route = router();
var fourohfour = '';
var mount;
var moment = require('moment');
var pkg = require('./package');
var htmlFiles = [];
var elasticsearch = require('elasticsearch');

// this line, although dirty, ensures that Harp templates
// have access to moment - which given the whole partial
// import hack doesn't work consistently across dynamic vs
// compiled, this is the cleanest solution.
global.moment = moment;

global.split = function (content) {
  var res = [];
  if (content.split(/<!--\s*more\s*-->/).length > 1) {
    res = content.split(/<!--\s*more\s*-->/);
  } else if (content.split('<hr>').length > 1) {
    res = content.split('<hr>');
  } else {
    res = [
      content.split('<p>').slice(0, 4).join('<p>'),
      content.split('<p>').slice(4).join('<p>'),
    ];
  }

  return res.map((_, i) => {
    if (i === 0) {
      _ = _.replace(/<h1>.*?<\/h1>/, ''); // strip the initial heading
    }
    return _.trim();
  });
};

// we use versions to cachebust our CSS & JS, but we only
// cachebust on minor or major releases. A new blog post is
// considered a patch, and therefore doesn't require a rebuild
// of the entire /www directory.
if (!pkg.version) {
  pkg.version = 'dev';
}
global.version = pkg.version.split('.').slice(0, 2).join('.');
global.fullversion = pkg.version;

function redirect(res, url) {
  res.writeHead(302, { location: url });
  res.end();
}

/* legacy for feedburner */
route.all('/feed/', function (req, res, next) {
  // required by harp because it thinks I'm using express...
  req.url = '/feed.xml';
  next();
});

/* redirect for book */
route.get('/cli-book', function (req, res, next) {
  // required by harp because it thinks I'm using express...
  redirect(res, 'https://abookapart.com/products/working-the-command-line');
});

/* redirect to s3 hosted urls */
route.all(/\/downloads\/(.*)$/, function (req, res) {
  redirect(res, 'http://download.remysharp.com/' + req.params[1]);
});

route.post('/search', function (req, res) {
  var query = req.url.split('?').slice(1).join('?');
  var search = querystring.parse(query);

  var client = new elasticsearch.Client({
    host: process.env.BONSAI_URL,
    // log: 'trace',
  });

  client.search({
    index: 'blog-posts',
    body: {
      query: {
        match: {
          body: search.q,
        },
      },
      highlight: {
        'pre_tags': ['<strong class="highlight"><em>'],
        'post_tags': ['</em></strong>'],
        fields: {
          body: {
            'number_of_fragments': 10,
            'fragment_size': 400,
          },
        },
      },
    },
    fields: 'title,date,highlight',
  }, function (error, response) {
    if (error) {
      res.writeHead(500, { 'content-type': 'application/json' });
      return res.end(JSON.stringify({ error: true, message: error.message }));
    }
    res.writeHead(200, { 'content-type': 'application/json' });

    if (response.hits.total === 0) {
      return res.end('[]');
    }

    var results = response.hits.hits.map(function (res) {
      var date = moment(res.fields.date.pop());
      return {
        title: res.fields.title.pop(),
        date: date.format('D-MMM YYYY'),
        score: res._score,
        url: 'https://remysharp.com/' + date.format('YYYY/MM/DD') + '/' + res._id,
        highlight: (res.highlight.body.pop() || ''),
      };
    });

    res.end(JSON.stringify(results));
  });
});

// redirect to the latest post
route.get('/latest', function (req, res, next) {
  var post = blogs[slugs[0]];
  if (post) {
    var url = moment(post.date).format('/YYYY/MM/DD/') + slugs[0];
    redirect(res, url);
    return;
  }
  next();
});

route.get('/random', function (req, res, next) {
  var slug = slugs[Math.random() * slugs.length | 0];
  var post = blogs[slug];
  if (post) {
    var url = moment(post.date).format('/YYYY/MM/DD/') + slug;
    redirect(res, url);
    return;
  }
  next();
});

/* allow fast redirects to edit pages */
route.get(/^\/(.*)\/edit(\/)?$/, function (req, res, next) {
  var match = [];

  // first check it's not a static file in /public
  if (pages.indexOf(req.params[1]) !== -1) {
    match = [req.params[1]];
  }

  if (match.length === 0) {
    if (req.params[1].indexOf('/') !== -1) {
      // just take the last bit and assume this this is a blog post
      match = req.params[1].split('/').slice(-1);
      match[0] = 'blog/' + match[0];
    } else {
      match = slugs.filter(function (slug) {
        return slug.indexOf(req.params[1]) !== -1;
      }).map(function (s) {
        s = 'blog/' + s;
        return s;
      });
    }
  }

  if (match.length) {
    var url = 'https://github.com/remy/remysharp.com/blob/master/public/' +
      match.shift() + '.md';
    return redirect(res, url);
  }

  next();
});

/* redirect to s3 hosted urls */
route.all('/wp-content/uploads/{year}/{month}/{filename}', function (req, res) {
  redirect(res, 'http://download.remysharp.com/' + req.params.filename);
});

/* redirect to s3 hosted urls */
route.all('/demo/{filename}', function (req, res) {
  redirect(res, 'http://download.remysharp.com/' + req.params.filename);
});

/* redirect /blog/{slug} to the date formatted url */
route.all('/{blog}?/{post}', function (req, res, next) {
  var post = blogs[req.params.post];
  if (post) {
    var url = moment(post.date).format('/YYYY/MM/DD/') + req.params.post;
    redirect(res, url);
    return;
  }
  next();
});

/* main url handler: /{year}/{month}/{day}/{slug} */
route.all(/^\/([0-9]{4})\/([0-9]{1,2})\/([0-9]{1,2})\/([a-z0-9\-].*?)(\/amp)?(\/)?$/, function (req, res, next) {
  var params = req.params;
  var post = blogs[params[4]];
  const amp = !!params[5];

  if (post && post.date) {
    // test if the date matches

    // note that with moment, we're specifying the parse format
    var date = moment(post.date.split(' ')[0]);
    var requestDate = params.slice(1, 4).join('-');

    if (date.format('YYYY-MM-DD') !== requestDate) {
      return next();
    }

    if (params[5] === '/') {
      redirect(res, req.url.replace(/(.)\/$/, '$1'));
      return;
    }

    // this allows Harp to pick up the correct post
    req.url = '/blog/' + params[4];

    if (amp) {
      req.url += '/amp';
    }
  }

  next();
});

/* handle /{year} in url */
route.get(/^\/([0-9]{4})(\/?)$/, function (req, res, next) {
  req.url = '/archive/' + req.params[1] + '/';
  next();
});

/* match slug partial and redirect to post */
route.all(/^\/([a-z0-9\-]+)(\/?)$/i, function (req, res, next) {
  // first check it's not a static file in /public
  if (pages.indexOf(req.params[1]) !== -1) {
    return next();
  }

  var match = slugs.filter(function (slug) {
    return slug.indexOf(req.params[1]) !== -1;
  });

  if (match.length) {
    var matched = match.shift(); // use the latest
    var post = blogs[matched];
    var url = moment(post.date).format('/YYYY/MM/DD/') + matched;
    redirect(res, url);
    return;
  }

  next();
});

var server = function (root) {
  // manually glob all the .html files so that we can navigate
  // without .html on the end of the urls
  glob('**/*.html', {
    cwd: root,
    dot: false,
  }, function (er, files) {
    htmlFiles = files.map(function (file) {
      return '/' + file;
    });
  });

  // use st module for static cached routing
  mount = st({
    path: root,
    url: '/',
    index: 'index.html', // server index.html for directories
    passthrough: true // pass through if not found, so we can send 404
  });

  console.log('compilation complete');
};

function tryAMP(req, res) {
  return () => {
    if (req.url.indexOf('/amp') === req.url.length - 4) {
      const root = req.url.replace(/\/amp$/, '');
      req.url = root;

      // this is an OTT way to get an external value into Harp
      req.setup = {
        projectPath: __dirname,
        publicPath: __dirname + '/public',
        config: {
          globals: Object.assign({ amp: true }, harpcfg.globals),
        }
      };

      // resets the renderer
      delete req.poly;

      return harp.mount(__dirname)(req, res, () => {
        res.writeHead(404);
        res.end(fourohfour);
      });
    }
    res.writeHead(404);
    res.end(fourohfour);
  };
}

function run() {
  if (process.env.NODE_ENV === 'production') {
    fourohfour = require('fs').readFileSync(outputPath + '/404.html');
    // lastly...
    route.get('*', function (req, res, next) {

      // simplify the url (remove the ?search) and test if
      // we have a file that exists (in `htmlFiles`)
      req.url = req.url.replace(/\?.*$/, '').replace(/(.)\/$/, '$1');
      if (htmlFiles.indexOf(req.url + '.html') !== -1) {
        // then we requested /foo/bar and we know there's a
        // generated file that matches
        req.url += '.html';
      }

      // if our server is ready, respond using the st module
      // and if it's a 404, respond with `serve404`.
      if (mount) {
        mount(req, res, tryAMP(req, res));
      } else {
        res.writeHead(404);
        res.end();
      }
    });

    console.log('Running harp-static on ' + port);
    http.createServer(route).listen(port);
    server(outputPath, port);
  } else {
    // this is used for offline development, where harp is
    // rebuilding all files on the fly.
    route.get(/^\/archive$/, function (req, res) {
      redirect(res, '/archive/');
    });
    route.get(/^\/drafts$/, function (req, res) {
      redirect(res, '/drafts/');
    });
    route.all('*', (req, res, next) => {
      req.originalUrl = req.url;
      next();
    });
    route.all('*', harp.mount(__dirname));
    route.all('*', (req, res) => {
      tryAMP(req, res)()
    });
    // route.all('*', function (req, res) {
    //   req.url = '/404';
    //   harp.mount(__dirname)(req, res);
    // });
    console.log('Running harp-static on ' + port);
    http.createServer(route).listen(port);

    server(__dirname + '/public');
  }
}

function stat(filename) {
  return new Promise(function (resolve) {
    fs.stat(__dirname + '/public/blog/' + filename + '.md', function (error, stat) {
      if (error) {
        resolve({ slug: filename, date: new Date(0) });
      } else {
        resolve({ slug: filename, date: stat.mtime });
      }
    });
  });
}

global.recent = slugs.slice(0).sort(function (a, b) {
  return blogs[a].modified < blogs[b].modified ? 1 : -1;
}).slice(0, 3).map(function (id) {
  return {
    slug: id,
    date: blogs[id].modified,
  };
});

if (process.argv[2] === 'compile') {
  process.env.NODE_ENV = 'production';
  harp.compile(__dirname, outputPath, function (errors) {
    if (errors) {
      console.log(JSON.stringify(errors, null, 2));
      process.exit(1);
    }

    process.exit(0);
  });
} else {
  run();
}
