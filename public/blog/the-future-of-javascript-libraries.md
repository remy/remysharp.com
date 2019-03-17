---
title: The Future of JavaScript Libraries
date: '2008-10-27 13:07:48'
published: true
tags:
  - code
  - jquery
  - library
  - web
modified: '2014-09-03 16:15:12'
---
# The Future of JavaScript Libraries

Libraries have been a huge contributor to the surge in popularity of JavaScript in the last few years. JavaScript developers have had the cumbersome tasks lifted and have been able to get back to business in developing interesting solutions to interesting problems.

I've been thinking about the next steps for JavaScript libraries, and I really would like to see the separation of the engine from the API. My gut tells me we're close.


<!--more-->

## Selector Engine Portability

There's a lot of discussion about the speed of a library's selector engine, but the bottom line how you use your selector engine.  Which is why I want to customise this choice to my application.

So what do I mean by selector engine portability?  

I mean I want to be able to chop and change the selector engine depending on the project I'm working on.

For example:

1. I'm building a full <del>desktop</del> web application - I want to use as complete as possible selector engine.
2. I'm building a version of the site specifically for the iPhone - I only want to use <code>querySelectorAll</code> because I *know* it's supported.
3. I'm building a lite/[fat free](http://twitter.com/themattharris/statuses/975974785) version that will be accessed by mobile devices, so I'll limit my JavaScript to just targeting elements by id to keep the work as tight as possible.

There's [so](http://github.com/jeresig/sizzle/tree/master) [much](http://jamesdonaghue.com/?p=40) [work](http://webkit.org/blog/156/queryselector-and-queryselectorall/) going in to selector engines right now (has been for a few years now, but the bar keeps on getting raised).  So there's more and more choice of raw selector engines especially if you've got a good idea how you want to optimise your application.

John's sizzle library has already been [alluded to being portable](http://simonwillison.net/2008/Aug/24/jeresigs/) (or certainly that's how I'm reading into it) - and what I'd really love to see is:

1. Whether we can write plugins (or hacks if you like) that allow new engines to be shoehorned into the library (jQuery, Prototype, Mootools, etc).
2. Will future versions of popular libraries will support a pluggable query engine.

My feeling is that the developer should be able to select the selector engine based on the application's specific needs.

## API of Choice

Once you've separated out the engine, the library selected is really a matter of preference.  Which ever grammar suits you best.

In addition, the separation would allow more companies to create their own libraries based on existing engines or APIs.  For example, I remember reading (somewhere...) that one of reasons the BBC created Glow, their own JavaScript library, was because (the latest) jQuery didn't support Safari 1.  However, if they only had to write their own engine, they could have reused the API and the plugin architecture.

## Challenge

I would love to see plugins for all the major libraries that allow us to plug a new selector engine in to the library.  So that's the challenge.  

Is it possible?  I'm not sure.  I don't know the Prototype and Mootools, etc architectures well enough to know whether the engines can be replaced programatically - but it's worth a try, right?
