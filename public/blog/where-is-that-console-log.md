---
title: Where is that console.log?
date: '2014-05-23 12:16:21'
published: true
tags:
  - code
  - console
  - de
  - debug
  - javascript
modified: '2014-09-03 16:15:12'
---
# Where is that console.log?

Did you ever have phantom `console.log` - or more specifically you've no idea
where it was happening?

I have. This tiny bit of code will help you identify *where* the logging is
being called from. The nice thing is it works in the browser *and* in node.

<!--more-->

<small>Honourable mention: [@garychambers108's](https://medium.com/@garychambers108/b3cc6fd0dafd) node.js better logging - I've been wanting to do something about my rogue consoles and Gary's article kicked me in to action.</small>

## Upgrading log to show *where* logging is happening

    ['log', 'warn'].forEach(function(method) {
      var old = console[method];
      console[method] = function() {
        var stack = (new Error()).stack.split(/\n/);
        // Chrome includes a single "Error" line, FF doesn't.
        if (stack[0].indexOf('Error') === 0) {
          stack = stack.slice(1);
        }
        var args = [].slice.apply(arguments).concat([stack[1].trim()]);
        return old.apply(console, args);
      };
    });

If you include this as high as possible in your code base, all subsequent `console.log` (or `warn`) calls will include the line the call was made from:

<img src="/images/where-logging.png" style="border: 1px solid #ccc; display: block; margin: 0 auto; max-width: 100%">

Here's a simplified demo: [https://jsbin.com/wataw/2/edit?js,console](https://jsbin.com/wataw/2/edit?js,console)

All the code is doing is rewriting the `log` and `warn` methods and appending the location of the call at the end of the log. Note that I'm not overloading the `error` method because it comes with it's own stacktrace.

The location of the call is deduced using `new Error`, then looking at the `stack` property (disclaimer: this won't work in *all* browsers - I've only tested in Firefox, Chrome and Node).

Simple. Now I can hunt down those rogue logs and remove them from the codebase.
