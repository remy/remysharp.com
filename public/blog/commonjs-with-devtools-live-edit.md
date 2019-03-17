---
title: CommonJS modules with live edit in devtools
date: '2014-05-30 12:07:56'
published: true
tags:
  - code
  - devtools
  - fail
modified: '2014-09-03 16:15:12'
---
# CommonJS modules with live edit in devtools

As you might know, I'm a big fan of [Chrome devtools' live edit and workspaces](http://www.youtube.com/playlist?list=PLXmT1r4krsTq7w7hDV6zfirrs4NJlzJX5) (video playlist), and it's this workflow that's kept me away from [Browserify](http://browserify.org). 

So I went about creating an experiment that allowed me to use CommonJS modules in development *and* that allowed me to edit and save directly in devtools *without* a build step.

<!--more-->

## Some context

As far as I know, Browserify is the bees knees for using CommonJS modules in the client side. However, it's also got a build step. I know it supports sourcemaps, but I've personally had mixed (about 20%) success with sourcemaps, and particularly when it comes to saving directly in devtools.

I'm happy with a build step for production, but not in dev. I want to know the files I'm working with are being saved to disk without any extra steps.

It's entirely possible I've reinvented the wheel here (feel free to point me in the right direction!).

So...I had a go at re-inventing the `require` method...

## Demo

For your viewing pleasure, here's the experiment using my dev require.js. It supports CommonJS modules. I've only tested a few levels deep, and it's *only* for client side code.

The main requirements were to ensure:

1. Line numbers in the console mapped correctly to the line in the file
2. Saving the file would commit the save to disk
3. Saving the file would update memory

These *kinda* work as you'll see in the video.

<iframe width="1280" height="720" src="//www.youtube.com/embed/uHxxcnJi4BE?rel=0" frameborder="0" allowfullscreen></iframe>

## How it works

Pretty simple (and stupid) really, require.js is just this:

    function require(path) {
      var xhr = new XMLHttpRequest();

      if (path[0] === '.') {
        path = path.substr(2);
      }

      path += '.js';

      var module = {
        exports: {}
      };

      xhr.open('GET', path, false); // sync
      xhr.send();

      var code = xhr.responseText;

      if (code.indexOf('//# sourceURL') === -1) {
        code += '\n\n//# sourceURL=' + path;
      }

      eval(code);

      return module.exports;
    }

The code boils down to:

1. Make an *synchronous* XHR call to the script
2. Insert a `sourceURL` in the code so devtools knows what file it was
3. Create a `module` object in scope
4. Then eval and return the updated `module.exports`

Pretty filthy really. Also obviously missing the require path resolution.

I've created a little repo with the [code I used in the demo on github](https://github.com/remy/require-for-dev) too.

## Known and potential issues

- Using the `setInterval` you may have noticed in foo.js, when changing the code, devtools loses access to the `app` variable. Unsure why.
- Using Workspaces is a no-no, it seems to get really confused and *very* sticky about what's in memory (i.e. the file shown in sources does not match what's being run)
- The full require resolution isn't implemented at all (so only relative URLs are loaded)
- Saving the file in devtools will insert the `sourceURL` in the file permanently
- I'm not 100% of the security of the modules - in fact I'm pretty sure (since they're not running inside a new document context) that there would be namespace collision (which is kind of the point of CommonJS to avoid!!!)
- Probably a lot more potential issues - like I said, this is an *experiment*!

## Does it really work?

I'm not sure. It's not perfect, and I'm not 100% sure it's 100% usable...so I'm classing this as a failed experiment.

I thought about seeing if I could make an iframe on the fly, and inject the content, but the iframe would have to be appended to the document to execute the code, and the code is only executed on the "next tick", i.e. *after* the `return module.exports` so the module would be loaded, but the code would not. Poop.

On the upside, I figured it was worth sharing, because some bright mind might just solve the memory linking issues that I'm seeing or create some clever work around.
