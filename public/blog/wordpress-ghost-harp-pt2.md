---
title: WordPress -> Ghost -> Harp (part 2)
date: '2014-09-30 09:00:00'
published: true
tags:
  - web
modified: '2014-09-29 20:01:46'
---
# WordPress to Ghost to Harp: part 2

I wrote about moving away from WordPress to Ghost and then to Harp in [part 1](/2014/09/18/wordpress-ghost-harp-pt1), this post details some of the specifics of my blog's implementation.

<!--more-->

## Technical overview

I'm using [Harp](http://harpjs.com) which is incredibly easy to get running with, but I'm also running Harp as a dependency inside my own custom node web server which allows me to add a few bells a whistles to my implementation.

* [Custom URL rewriting](#custom-url-rewriting)
* [Static caching](#static-caching)
* [Use of special helpers inside Harp, such as moment.js](#use-of-special-helpers-inside-harp)
* [List of recently modified posts](#list-of-recently-modified-posts)
* [Archive & tag pages without the repetition of files](#archive--tag-pages-without-the-repetition-of-files)
* [Makefile based release process](#makefile-based-release-process)

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

Supporting my date base URL format was trickier. The actual file lives in `/blog/<title>` so when the URL hits my static server, it needs to be in that form. So supporting date base URL requires:

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

## Static caching

Having used Harp in previous projects ([JS Bin's documentation](https://github.com/jsbin/learn), [our event site](https://github.com/leftlogic/fullfrontalconf2014/) and [my business site](https://github.com/leftlogic/leftlogic)) and have created [harp-static@npm](https://npmjs.org/package/harp-static) which uses [st@npm](https://npmjs.org/package/st) to cache and serve static files.

So in my custom server, I point all routes down to the `st` served content. I also support hitting the URLs *without* `.html` at the end, again, to keep my old URLs working. I'd recommend checking out the [harp-static source](https://github.com/remy/harp-static) if this interests you.

## Use of special helpers inside Harp

At present, if you want to use a library inside Harp, like [moment.js](http://momentjs.com), the work around for this is to create a `.jade` file with the source of moment.js (in this case) as script. Essentially the minified one line file prefixed with a `-` character.

Then include the library in a common file, like the layout, and you have the helper available:

```jade
!- load the moment.js library for server side access
!= partial('/js/moment')
```

Except this would break during compilation to static files. I'm certain it's to do with my custom serving process, but the path would somehow be wrong (so the library wouldn't load and further down my code there would be exceptions in Jade about the library not existing).

The *smart* way around this is to expose a global from *outside of Harp*. So in my `server.js` (that does all the routing, etc) I `require` in moment.js and then I [expose it globally](https://github.com/remy/remysharp.com/blob/master/server.js#L26):

```js
// this line, although dirty, ensures that Harp templates
// have access to moment - which given the whole partial
// import hack doesn't work consistently across dynamic vs
// compiled, this is the cleanest solution.
global.moment = moment;
```

Very simple, but now any Harp rendered file has access to moment.js. I use the same technique to expose the recently modified posts for listing on the homepage.

## List of recently modified posts

The best way to get a list of all the post from *outside* of Harp (i.e. when you're requiring Harp as a dependency), is to simply load the `_data.json` file. It felt wrong initially, but it's perfect:

```js
var blogs = require('./public/blog/_data.json');
var slugs = Object.keys(blogs);
```

Now I have an object lookup by slug to the actual blog posts *and* I have an array of the slugs.

From this, I was able to `fs.stat` all the blog posts and sort to return the 3 most recently modified and then using the previous trick, expose it globally so it's included on my homepage (where `recent` is the global exposed in `server.js`):

```jade
each post in recent
  li
    a(href="#{ public.blog._data[post.slug].relative }") #{ public.blog._data[post.slug].title }
    small &nbsp;updated #{ moment(post.date).fromNow() }
```

## Archive & tag pages without the repetition of files

There's two parts to this section. Firstly there's the support for individual years or tags without duplication of (too much) code. Secondly is the Jade code that runs the archive listing.

### Reducing duplication of code

I *could* have a directory for each year there are blog posts (which I do have now) and each could contain the archive listing code. The problem (obviously) is duplication of code. You fix it one place, and (in my case, since I have 2006-2014) you have 8 files to update.

Instead, a single file `index.jade` sits in tagged folder (and similarly with year folders) which contains:

```jade
!= partial('../../_partials/tag')
```

So we load a single partial. The `tag.jade` file simply reads the path of the request, and uses the last part as a filter against all the posts:

```jade
tag = filter === undefined ? current.path.slice(-2, -1)[0] : filter;
posts = partial('posts', { filter: function (post) { return post.tags.indexOf(tag) !== -1 } })
.post
  h1.title Tagged with "#{ tag }"
  .post-content
    ul
      while posts.length
        post = posts.shift()
        if post.date
          li
            a(href="#{ post.relative }") #{ post.title }
            small.date #{ moment(post.date).format('D-MMM YYYY')}
```

Note that `partial('posts')` is a magic partial that simply returns an array of blog posts with the passed in filter applied.

Simple. Now if I want to add more support for tags, I just create a directory and the simple `index.jade` and it works.

### An archive listing

A while loop that looks for a year change in the date, then works through each year, popping from the posts array looping through each post in the month.

It's pretty cool (I think) because it works for entire years *and* all years: [archive.jade](https://github.com/remy/remysharp.com/blob/a198a4235634a3c7ac747ab403ac13bc49140a39/public/_partials/archive.jade)

## Makefile based release process

Disclaimer: this is a terrible use of a Makefile, it doesn't leverage *any* of the benefits of make, and honestly, it *could* be a bash script. However, I like that I can run `make publish`.

Taking a lead from [Makefile recipes for Node.js packages](https://andreypopp.com/posts/2013-05-16-makefile-recipes-for-node-js.html), my [makefile](https://github.com/remy/remysharp.com/blob/master/Makefile) allows me to run commands like:

```bash
$ make release-minor publish
```

The `release-*` tasks will:

1. Bump the package version (according to patch/minor/major)
2. Compile Harp to static files
3. Commit all changes and tag
4. Push to github

The version bump has to happen first so that the version I used to cache bust in the compiled output is correct (otherwise you bump after the compilation, and then your released version is one step ahead of the version that appears in the source).

And that's it! Here's the full running [source to remysharp.com](https://github.com/remy/remysharp.com) - feel free to help yourself to anything that's useful for your own blogs or sites.
