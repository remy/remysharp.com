---
title: WordPress -> Ghost -> Harp (part 1)
date: '2014-09-18 12:00:00'
published: true
tags:
  - web
modified: '2014-09-18 08:14:34'
---

# WordPress to Ghost to Harp: part 1

I've been running my "b:log" on WordPress since late [2006](/2006), but today I give you the node backed blog.

This is a two part blog post, the first covering why I moved, what I tried and a few of the high level issues I ran in to. Part two will cover some of the technical detail that goes in to running my blog on the new node platform.

These posts are not intended as walkthrough on how to do it yourself, but simply sharing my experience and bumps I ran into on the way, hoping to impart some useful knowledge along the way.

<!--more-->

---

Over the years I've had all the injections of Viagra adverts and the like over and over and over. Whenever I want to change anything, I'd tend to give up, and for a few years now, I've really wanted the source of my blog posts available in (something like) github.

This post is about the move and how I run my blog now.

## My goals

In a totally ideal world, I wanted:

- A fast blogging platform (not particularly for publishing, but for serving)
- Backed by JavaScript (Node specifically) - because it's the most familiar language to me
- Edit links for posts to go to github allowing anyone to make a suggested edit
- Archives and tag listings
- URLs would be customisable (because I have old URLs that I want to support)
- Could run on a free hosting platform like Heroku
- As a bonus, I could hack and improve the system

TL;DR here's the full source of my blog as it is today, on github: [https://github.com/remy/remysharp.com/](github.com/remy/remysharp.com).

## Ghost

I knew that I wanted to move to a node backed platform. Ghost seemed like the best fit, and I've had the pleasure of meeting and listening to John O'Nolan and Hannah Wolfe speak about Ghost, and I complete buy into the philosophy.

Exporting WordPress posts (and pages) to Ghost was actually very simple (I used the developer version of Ghost locally).

The only bump in the road was the error messaging during the Ghost import was pretty vague. But checking the devtools console yielded the answer, a 324 from my server during the upload process. So I tweaked nginx to allow for larger files to be uploaded and bosh. Fixed.

The next trick was the comments - which Disqus seemed like the default that everyone moves to. Obviously nothing to do with Ghost, but this process was tricky. The best advice I can give if you're doing this and keep hitting failed imports is: validate the XML (w3c validator is just fine), and hand-fix the invalid XML.

### Why I didn't stick with Ghost

For the record, I think Ghost is an excellent platform for most users, particularly if they're coming to blogging for the first time or wanting to shift away from WordPress.

However, being a developer I wanted to add a few custom tweaks, specifically I wanted an archive page, a handful of URL rewrite rules and a few of the Ghost ways of doing things weren't quite what I wanted.

One particular example is all my old WordPress posts had split markers in them which Ghost doesn't support. They do have support for creating excepts, but if you want HTML you can't (at time of writing) append a read more to the link.

I tried to contribute to the Ghost project, but I ended up going down a rabbit hole for what was effectively a tiny change (submitting a pull request to a Ghost dependency Downsize).

The (understandable) problem is that Hannah and the Ghost team are producing code that works in a great deal of environments and so a quick PR here and there are great, but I can understand why they're not merged in right away if at all: there's a much bigger picture to consider.

I thought about just forking Ghost and permanently running my own version, but there's a fairly big system to inherit when all I'm doing is serving pages...which I had done with Harp.js before.

So I made the jump to Harp.

### Ghost to Harp

Harp is a static site generator. I've used it in the past for [our conference site](http://2014.full-frontal.org) this year and for the [JS Bin help & blog](https://jsbin.com/help) so I was already familiar with it.

However, harp requires static markdown files, so I went about connecting to the Ghost database via sqlite3 and exporting each of these records out as a static HTML file, whilst building up the `_data.json` file required by harp to represent the metadata.

The code I used to convert is on github here: [remy/ghost-harp](https://github.com/remy/ghost-harp). _Disclaimer_: I wrote this for my own database and requirements, so this may not work for you out of the box.

The conversion process is pretty simple, read the sqlite database, write to files. So I ended up with a folder structure like this:

```nohighlight
.
├── harp.json
└── public
    ├── _data.json
    ├── about.md
    ├── blog
    │   ├── 2007-moments.md
    │   ├── 8-questions-after-ie-pissed-the-community-off.md
    │   ├── _data.json
    │   ├── _drafts
    │   │   ├── _data.json
    │   │   ├── my-velveteen-rabbit.md
    │   │   └── why-i-prefer-mobile-web-apps-to-native-apps.md
    │   ├── a-better-twitter-search.md
    │   ├── wordpress-tagging-and-textmate.md
    │   └── youre-paying-to-speak.md
    ├── talks.md
    └── twitter.md
```

Some contents are going to be in HTML, but Ghost seemed to put my HTML posts in the markdown column (and since it's valid, it doesn't really matter).

One significant tweak I made was to put the post title _into_ the post itself. For example, if you look at the source [about](https://github.com/remy/remysharp.com/blob/main/public/about.md) page, you'll see the title in the markdown. Ghost separates out the title and the body when you're editing, but I wanted a single markdown file.

The next task was to fire up harp and have it running from my newly generated `public` directory.

## Harp

Now that all my content is in the `public/blog` directory (via my little rewrite script) harp could serve my content. Using a simple (empty) `harp.json` as the config, harp automatically knows to serve anything under `public` as the root of the site (i.e. `/blog/foo` will serve the file `/public/blog/foo.md`):

My specific requirements for using harp were:

- Serves _static_ content (so I'd have to compile to static .html)
- Serves in production _without_ the `.html` extension visible
- Support rewriting of URLs, so that I could maintain my original URL structure of `/<year>/<month>/<day>/<post>` rather than pointing to `/blog/<post>`
- I _really_ wanted an archive, since I was simplifying a lot of my blog design, and losing a _lot_ of navigation

In the end, I had to create my own custom `server.js` that would run a bespoke router (I did use an existing library, but I needed changes, so I forked my own copy).

Harp certainly made things harder than using Ghost, but I had the flexability I needed.

I'm particularly proud of the [archive](/archive) page, partly because I managed to write it entirely with Jade (which over the years I'm slowly starting to warm to) and partly because I now have a page that lists _all_ my posts since the first in 2006!

The version I'm running today satisfies all the goals I outlined at the start of the project, and more.

A few bonus features I built are:

- I can add `/edit` to any page to quickly jump to github to edit (along with edit links being on all the posts)
- All the old demos and uploads from my WordPress site are hosted on Amazon S3 and redirected to via my `server.js`
- My development environment is slightly different to production, such as drafts are visible and the disqus comments are removed

The _one_ thing I'd like harp to be better at would be knowing what to regenerate. Due to this my release process involves rebuilding the entire blog site (~300 posts) and then pushing the changes to github and then heroku (where I'm now hosting my blog) - though this is effectively an rsync, so it's not everything that goes up.

## The final product

The final product and platform consists of:

- Statically generated content in `/www`
- Source control in github
- Production is hosted on a single dyno on Heroku
- Using [dnsimple](https://dnsimple.com/r/5bc02f2ef8976f) for `ALIAS` hosting to the heroku instance (so I can serve "naked" domains)
- CloudFlare fronts the production blog
- The major and minor version are used to cachebust the CSS & JavaScript, due to this, it means changes to content are a patch release and all others are minor (or major) releases
- The release process is a bash-like makefile that does all the compiling and revisioning for me

So my whole release process for this blog post is now:

```bash
$ make release-patch publish
```

And boom, just like that, you're reading the post!

In part 2, I'll explain some of the code that's used to drive my blog and some of the tricks I had to use to get harp to play exactly the way I wanted.
