---
title: CSS Compression
date: '2009-02-01 12:00:00'
tags:
  - code
modified: '2009-02-01 16:37:30'
draft: true
---
Title: CSS Compression
Category: Web
Keywords: css

When I said this [on Twitter](http://twitter.com/rem/status/1163407522):

> Curious as to why CSS minification isn't standard practise as JS minification is.

It incited/inspired a reasonable amount of discussion that I felt I should post my thoughts on the subject.

✂------✂------✂------✂------✂------✂------✂------✂------✂------✂------

## Quick Disclaimer

First off, I need to put my money where my mouth is - and start practising what I preach.  My personal sites don't minify, but I'll get on that argument in a minute.  My business sites (should and will) and I will always recommend this for client projects.

## JavaScript Compression

Today's internet (development community) is used to JavaScript minification. In fact, Steve Souders uses it as one of the [14 rules for high performance sites](http://stevesouders.com/hpws/ "High Performance Web Sites").  All the JavaScript libraries are available in uncompressed (development) and compressed (production) form.

What we're saying here is that minification is for production environments.  It reduces download speeds, and if the JavaScript has been minified in to one single script, then it also reduces HTTP requests - both of which are going to be a good thing for the user's experience on your site.

## JavaScript & CSS Similarities

In the stack that makes up a well developed web page



- View Sauce - defining aspect of the web
- 10 years ago
- Firebug - much much better for learning
- Plus Firebug doesn't decompress JavaScript, but it does markup and CSS
