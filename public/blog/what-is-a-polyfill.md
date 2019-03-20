---
title: What is a Polyfill?
date: '2010-10-08 12:55:09'
published: true
tags:
  - browsers
  - code
  - html5
  - web
modified: '2015-01-02 16:15:37'
---
# What is a Polyfill?

A polyfill, or polyfiller, is a piece of code (or plugin) that provides the technology that you, the developer, expect the browser to provide *natively*. Flattening the API landscape if you will.

<!--more-->

## Where polyfill came from / on coining the term

It was when I was writing [Introducing HTML5](http://introducinghtml5.com) back in 2009. I was sat in a coffeeshop (as you do) thinking I wanted a word that meant "replicate an API using JavaScript (or Flash or whatever) if the browser doesn't have it natively".

Shim, to me, meant a piece of code that you could add that would fix some functionality, but it would most often have it's own API. I wanted something you could drop in and it would silently work (remember the old shim.gif? that required you actually inserted the image to fix empty `td` cells - I wanted something that did that for me automatically).

I knew what I was after wasn't progressive enhancement because the baseline that I was working to required JavaScript and the latest technology. So that existing term didn't work for me.

I also knew that it wasn't graceful degradation, because without the native functionality and without JavaScript (assuming your polyfill uses JavaScript), it wouldn't work at all.

So I wanted a word that was simple to say, and could conjure up a vague idea of what this thing would do. *Polyfill* just kind of came to me, but it fitted my requirements. Poly meaning it could be solved using any number of techniques - it wasn't limited to just being done using JavaScript, and fill would fill the hole in the browser where the technology needed to be. It also didn't imply "old browser" (because we need to polyfill new browser too).

Also for me, the product Polyfilla (spackling in the US) is a paste that can be put in to walls to cover cracks and holes. I really liked that idea of visualising how we're fixing the browser. Once the wall is flat, you can paint as you please or wallpaper to your heart's content.

I had some feedback that the "word should be changed" but it's more that the community at the time needed a word, like we needed Ajax, HTML5, Web 2.0 - something to hang our ideas off. Regardless of whether the word is a perfect fit or not, it's proven it has legs and developers and designers understand the concepts.

I intentionally never really pushed the term out there, I just dropped it in a few key places (most notably the book), and I think it's when +Paul Irish  gave a presentation some (many?) months later, directly referencing the term polyfill, was when the term really got a large amount of exposure (I think this was also helped with the addition of the Modernizr HTML5 shims & polyfill page).

## Definitions

[Alex Sexton](http://alexsexton.com/ "AlexSexton.com") also [classifies polyfilling as a form of Regressive Enhancement](http://twitter.com/SlexAxton/status/25600963629). I think that sums it up nicely.

[Paul](http://paulirish.com) also [defines it as](http://paulirish.com/i/7570.png):

> A shim that mimics a future API providing fallback functionality to older browsers.

## Some Examples

Here's an example: <code>sessionStorage</code> is available in all the latest browsers (IE8 and upwards) but isn't in IE7 and below.

A polyfill can be used to [plug the support](http://gist.github.com/350433) for older browsers that don't provide <code>sessionStorage</code>.

Now with the polyfiller in place, as a developer I can rely on using the Web Storage API (for sessions) and not have to feature test in my code or fork to handle different situations.

Another example is providing canvas support in IE. This is really where the *poly* part can be seen. If there's no native canvas, we can provide [canvas support using Silverlight](http://blogs.msdn.com/b/delay/archive/2009/08/24/using-one-platform-to-build-another-html-5-s-canvas-tag-implemented-using-silverlight.aspx). If Silverlight isn't available, we can drop down to using VML using [excanvas](http://code.google.com/p/explorercanvas/) (note that excanvas actually does also include a Silverlight bridge which I'd expect it would try first anyway). Using these two scripts provides the developers with a (fairly) solid canvas backup should it not be native in the browser.

# Where it's from and where it's going

Earlier on this year I co-authored [Introducing HTML5](http://introducinghtml5.com) with Bruce Lawson. During the R&D time I was looking at shims and techniques to plug missing APIs but they weren't quite progressive enhancement. I wanted a single word that represented this idea that there was a 'thing' that could plug browsers but wasn't progressive enhancement but wasn't graceful degradation either.

Polyfilling seemed to fit what I wanted to say (in my head!).

Ployfilla is a UK product known as Spackling Paste in the US. With that in mind: think of the browsers as a wall with cracks in it. These polyfills help smooth out the cracks and give us a nice smooth wall of browsers to work with.

I tentatively used the new term during my [HTML5 talk](/talks/#2010_html5conf) for [ThinkVitamin](http://thinkvitamin.com/online-conferences/html5/) back in June, but I didn't want to push it for fear of trying too hard to push a new term out. However I did sneak it in to Introducing HTML5, which I can only assume lead to what happened recently.

Recently at [JS Conf](http://jsconf.us/2010/), [Paul Irish](http://paulirish.com/ "Paul Irish") released a [list of polyfills and shims](http://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills) - an awesome resource list to save us developers the pain of older browsers.

It looks like polyfilling has some legs, so let's start using them, and dragging older (and even the newer) browsers up to our expectations.
