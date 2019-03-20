---
title: 'Continuous integration with static site generator: Harp.js'
date: '2014-05-05 12:00:00'
tags:
  - code
modified: '2014-10-04 23:44:57'
draft: true
---
# Continuous integration with static site generator: Harp.js

I've recently been investigating static site generators, and first tried my hand at installing Jekyll and the like but struggled and failed at the initial ruby and related dependencies (not an request for help - I had lots, but thanks). So I looked at Node offerings.

I looked at [Cabin](http://cabinjs.com), [Blacksmith](https://github.com/flatiron/blacksmith), [Hexo](http://zespia.tw/hexo/) and finally settled (IMHO) the excellent [Harp](http://harpjs.com). I also found [staticsitegenerators.net](http://staticsitegenerators.net/) to be a pretty helpful resource.

This post is a walk through as to how you can do a `git push` and have an automated sequence of events deploy your Harp static site to a live site (hosted on Heroku). And when I had continuous integration working, I kinda felt like a god!

I've broken this post up into sections, and some bits are already familiar,
just right on to the next.

<!-- more -->

## Topics

1. [Prerequisites](#prerequisites)
- [Installing Harp](#gettingharp)
- [Custom server for Heroku to generate the static site](#customserverforherokutogeneratethestaticsite)
- [Manually pushing to live](#manuallypushingtolive)
- [Automatically deploying upon git push](#automaticallydeployingupongitpush)

## Prerequisites

I'm going to proceed assuming that you have a [GitHub](http://github.com) login
and can create and push to your own repositories (be it on the command line or using your favourite application).

You will also need to install [Node.js](http://nodejs.org) and be able to copy
and paste commands into your terminal from this post to get a couple of bits
installed.

You'll also need a [Heroku account](https://www.heroku.com/) - which offers free hosting for simple applications...like a static site!

## Installing Harp

From the terminal, you need to install the Harp utility:

```nohighlight
npm install -g harp
```

You should see this:

![/images/harp-install.gif](/images/harp-install.gif)

Note that you can install Harp locally to your project, but for simplicity's sake in this post, we're using it as a utility.

Now we're going to take the simplest approach to building a static site with Harp: the "[framework style]()", but all this really means is my web content is served from my `/public` directory. I've put a couple of images, some CSS and then an `index.html` and `about.md` in there for now:

```nohighlight
my-site.com
└── public
    ├── css
    │   └── style.css
    ├── images
    │   └── play.jpg
    ├── about.md
    └── index.html
```

The `about.md` is a simple markdown file that has some bits about my site. Harp
also supports Jade and EJS and also supports having a common layout file, which
I would call `_layout.jade` (`_` prefix mean hidden from public) which could look like:

```jade
doctype
html
  head
    title My awesome site
  body
    article
      != yield
  footer
    p Made with love
```

The [Harp documentation](http://harpjs.com/docs/) is really simple, and the
`yield` statement above is where the body of `index.html` and `about.md` would
be inserted.

I then kick off the server using `harp server` from the web site's root directory:

```nohighlight
$ harp server
------------
Harp v0.11.2 – Chloi Inc. 2012–2014
Your server is listening at http://localhost:9000/
Press Ctl+C to stop the server
------------
```

So now the web site running on `http://localhost:9000` and I can visit the root
url or `http://localhost:9000/about` (or with `.html` also works).

I'm not a big fan of making these extensions a requirement of my site, **but**
if you want Harp out of the box, for now, you need to make sure you're linking
your pages together with `.html`. I do have a work around for this that I'll show you at the end of this post.

So that's the first phase.

## Set up Heroku



## Automatically deploying upon git push

## Custom server for Heroku to generate the static site
