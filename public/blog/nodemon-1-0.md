---
title: nodemon 1.0
date: '2014-01-20 13:00:02'
published: true
tags:
  - javascript
  - node
  - nodemon
  - project
  - web
modified: '2015-07-29 14:31:53'
---
# nodemon 1.0

For the past few months I've been working on a re-factor of [nodemon](http://github.com/remy/nodemon). The two main drivers were to make the code base easier to maintain and to make nodemon more extendible.

Nodemon is a command line utility to detect file changes and restart your application. Typically node apps, but it can restart any kind of program, ruby, python, make commands and more.

## A bit of background

Originally nodemon was a simple one file script, only a few hundred lines, if that. As more people used it in different environments for completely different things, more code was added (to properly support windows for instance), and more people committed changes.

I came across [Michael Brooks](https://github.com/mwbrooks) and [Fil Maj](https://github.com/filmaj)'s slides from jsconf.us 2013 on [building a better cli](http://michaelbrooks.ca/deck/2013-node-brigade/) and though I hadn't seen the talk, I got a lot of inspiration from the slides, and went ahead to try to break nodemon up in to much, much smaller components. This would make it (I hoped) easier to maintain, but also to narrow down where bugs were occurring.

It also allowed me the opportunity to write tests. Something I've always been poor at doing in the first place, so this was a great excuse to ensure they were in place from the get go.

It took about 4 months of snatching a few hours in the evening here and there, but eventually my [pull request](https://github.com/remy/nodemon/pull/200) was ready to be merged, and 1.0.0 went [live on 29-Dec 2013](https://github.com/remy/nodemon/compare/v0.7.10...v1.0.0).

## What's new

A lot of bugs have been closed, though it's likely these bugs didn't affect you, because nodemon is used in such a wide range of environments, weird things would come up.

The headlines are:

- global and local configs
- exec map
- requireable
- tests
- auto update notification
- [nodemon.io](http://nodemon.io) site, because...well, just because.
- sweet logo (and [amazing contributions](https://github.com/remy/nodemon/issues/217) from the community) by [@aesthetics-io](https://github.com/aesthetics-io)

## More control over your config

Nodemon still supports the old plain text `.nodemonignore` file, but now firstly looks for a `nodemon.json` file in your present working directory, then for the same file in your home directory. Since the config file is JSON, you can preconfigure nodemon with any command you use on the CLI.

The old config file only allowed you to specific what you wanted to ignore, but now you can define what you want to ignore *and* what you want to *watch*.

If you *always* ignore `public/*` in your project and want verbose on, as I do, then you can have a global `nodemon.json` that states just that:

<pre><code>{
  "ignore": "public/*",
  "verbose": true
}</code></pre>

And if some project is getting too verbose for my liking, I can just use the CLI to quiet it down, and the CLI takes priority:

<pre><code>$ nodemon -q</code></pre>

Now it'll ignore `public/` but not echo out any nodemon messages.

Out of the box, nodemon will also ignore everything in `.git` and `node_modules/**/node_modules`, but of course you can add to that or change it yourself. More [defaults can be found](https://github.com/remy/nodemon/blob/master/lib/config/defaults.js) in the project repo.

## "execMap"

This feature allows you to predefine what application runs what extension, and if it were me, I'd put this in the global `nodemon.json` so it's always used.

By default, the exec map includes support for python and ruby:

<pre><code>{
  "execMap": {
    "py": "python",
    "rb": "ruby"
  }
}</code></pre>

If you're like some users on the edge of the future and want to always use node in harmony mode, then that's simple:

<pre><code>{
  "execMap": {
    "js": "node --harmony",
    "py": "python",
    "rb": "ruby"
  }
}</code></pre>

Now nodemon will fire up .js files with `node --harmony`. This means it's super easy to make nodemon run with any application from a single global config. I'm also [open to suggestions](https://github.com/remy/nodemon/blob/master/lib/config/defaults.js#L7) for further exec map support (so long as it's cross platform), so do get in touch if you have an idea.

## Requireable

There's a nodemon [grunt plugin](https://github.com/ChrisWren/grunt-nodemon) by Chris Wren, but he had to spawn nodemon from his code. I wanted it so that he could include nodemon directly and have more control.

So nodemon now supports being required in as a module. It's pretty cool :)

It also means that Chris' grunt plugin can make [some cool integrations](https://github.com/ChrisWren/grunt-nodemon#advanced-usage) (if nodemon detects a restart, his plugin will trigger a browser reload using live reload).

It also means that there's already a [gulp plugin](https://npmjs.org/package/gulp-nodemon) using nodemon.

Required nodemon gives you a way of communicating through [events](https://github.com/remy/nodemon/blob/master/doc/events.md). Everything ranging from when nodemon restarts (which includes an array of filenames that triggered the reload), to nodemon's logging, to the spawned script's stdout.

## Tests

I'm using Mocha for tests and wear the [Travis badge](https://travis-ci.org/remy/nodemon) with pride on pass (and less pride on fail!).

There's just over [100 tests](https://travis-ci.org/remy/nodemon/jobs/17161118) for nodemon right now, ranging from small internal tests (like CLI parse testing) to tests that forks nodemon, that in turn spawn a web server and force crashes to ensure everything stops and starts correctly.

It's actually quite tricky to get the timing right (so the forked tests tend to be littered with `setTimeout` to make sure we have clear delays between start up and touching files).

The compound that with different behaviour on Mac (which I'm working from), on Linux and on Windows, and Travis runs on Linux so I had fun switching between 100% tests passing on my mac to jumping inside of vagrant to figure out why Linux wasn't passing 100%. Definitely a few lessons learnt (which I've quickly forgotten now they pass!).

## Update notification

Nodemon original had zero dependencies, which I was proud of (not sure why), but I came across [update-notifier](https://github.com/yeoman/update-notifier/) which *mostly* works, but there's [issues](https://github.com/yeoman/update-notifier/issues) I've raised and not heard back on (which worries me a little), but I do I know that users have been notified successfully of updates (at time of writing, nodemon is already 1.0.12).

So I bit the bullet and took on a dependency, and *I think* it's paying off - people are keeping with the most bug free version of nodemon.

## Sweet logo

First, I was so amazed and impressed by user contributions to logo ideas for nodemon. In the end, you folk (or at least people on twitter and github) voted for this one below (which I also like - along with a few others), and I reckon it could make a pretty cool sticker for the laptop. What do you think?

<img style="display: block; margin: 0 auto; max-width: 100%;" src="http://remysharp.com/images/nodemon.png">

So get updating:

<pre><code>npm install -g nodemon@latest</code></pre>
