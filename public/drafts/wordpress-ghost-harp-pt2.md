# WordPress to Ghost to Harp: part 2

I wrote about moving away from WordPress to Ghost and then to Harp in [part 1](/2014/09/18/wordpress-ghost-harp-pt1), this post details some of the specifics of my blog's implementation.

<!--more-->

## Technical overview

I'm using [Harp](http://harpjs.com) which is incredibly easy to get running with, but I'm also running Harp as a dependencies inside my own custom node web server which allows me to add a few bells a whistles to my implementation.

* Custom URL rewriting
* Static caching
* Use of special helpers inside Harp, such as [moment.js](http://momentjs.com)
* List of recently modified posts
* Archive & tag pages without the repetition of files
* Makefile based release process
* Control over when to cachebust a release

## Custom URL rewriting

Since I was porting an existing blog, I wanted to ensure that the URLs didn't change. This meant supported my old `/year/month/day/title` format. Which over the years I dislike, but when I moved to Harp, I decided to drop the date from the body of my posts and allow the URL to speak for that metadata.

I *also* wanted to host my old downloads and demos on Amazon S3, but the URLs from old posts would be relative to my blog, so I needed to rewrite these.

I forked [router@npm](https://www.npmjs.org/package/router) to create [router-stupid@npm](https://www.npmjs.org/package/router-stupid) - which is essentially the same, slightly cut down, but importantly: if you modify the `req.url` in a route handler, that would affect the subsequent matched routes.

Redirecting is simple:

```js
/* redirect to s3 hosted urls */
route.all('/demo/{filename}', function (req, res, next) {
  res.writeHead(302, { 'location': 'http://download.remysharp.com/' + req.params.filename });
  res.end();
});
```

Supporting my date base URL format was tricker. The actual file lives in `/blog/<title>` so when the URL hits my static server, it needs to be in that form. So supporting date base URL requires:

1. The URL format is correct
2. The title of the post actually finds a post
3. The date in the URL matches the date for the post

```js
/* main url handler: /{year}/{month}/{day}/{post} */
route.all(/^\/([0-9]{4})\/([0-9]{1,2})\/([0-9]{1,2})\/([a-z0-9\-].*?)(\/)?$/, function (req, res, next) {
  var params = req.params;

  // the title slug of the url
  var post = blogs[params[4]];

  // make sure we have a real post before even proceeding
  if (post && post.date) {
    // test if the date matches

    // post.date is a timestamp, so splitting gets us the date
    var date = moment(post.date.split(' ')[0]);

    var requestDate = params.slice(1, 4).join('-');

    // compare the date of post _in the same format_ as requestDate
    if (date.format('YYYY-MM-DD') !== requestDate) {
      // if it's not good, move on - will likely result in a 404
      return next();
    }

    // if there's a trailing slash, remove it and redirect
    if (params[5] === '/') {
      res.writeHead(302, { 'location': req.url.replace(/(.)\/$/, '$1')});
      res.end();
      return;
    }

    // this now allows Harp to pick up the correct post
    req.url = '/blog/' + params[4];
  }

  // then let the rest of the router do it's work
  next();
});
```

