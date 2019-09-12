---
title: CSS Compression
tags:
  - code
modified: '2009-02-01 16:37:30'
complete: false
---

# Title: CSS Compression

What follows is a blog post that I had partially written over 10 years ago. In fact, I wrote it on an afternoon on 1st Feb 2009. It was prompted by a blog post by Jeremy Keith writing about their concern for [view source](https://adactio.com/journal/1550) to which I added my own [comment](https://adactio.com/journal/1550#comment285) (a rarity for Jeremy to have comments enabled).

So I thought it would be interesting (and a little fun) to look at my post from 2009, then reflect back now that web development has aged a full decade since.

<!--more-->

---

**_Let's rewind time back to early 2009_**

---

When I said this [on Twitter](https://twitter.com/rem/status/1163407522):

> Curious as to why CSS minification isn't standard practise as JS minification is.

It incited/inspired a reasonable amount of discussion that I felt I should post my thoughts on the subject.

<!--more-->

## Quick Disclaimer

First off, I need to put my money where my mouth is - and start practising what I preach.  My personal sites don't minify, but I'll get on that argument in a minute.  My business sites (should and will) and I will always recommend this for client projects.

## JavaScript Compression

Today's internet (development community) is used to JavaScript minification. In fact, Steve Souders uses it as one of the [14 rules for high performance sites](http://stevesouders.com/hpws/ "High Performance Web Sites").  All the JavaScript libraries are available in uncompressed (development) and compressed (production) form.

What we're saying here is that minification is for production environments.  It reduces download speeds, and if the JavaScript has been minified in to one single script, then it also reduces HTTP requests - both of which are going to be a good thing for the user's experience on your site.

## JavaScript & CSS Similarities

In the stack that makes up a well developed web page

- View Source - defining aspect of the web
- 10 years ago
- Firebug - much much better for learning
- Plus Firebug doesn't decompress JavaScript, but it does markup and CSS

## Further thoughts

I posted this on Jeremy Keith's blog post and it's worth repeating here.

First off: I'm playing devil's advocate here, so don't burn me too much!

View sauce was also my own personal teacher as to acquiring my skills over the last decade. However, the web is changing - or even changed. We don't use tables for layout, we know better. We also use server side compression and minification to speed the delivery of the payload.

This is where view sauce will suffer (obviously not as badly as if the browser re-interprets the original source). I would, and am, arguing that JavaScript and CSS should be compressed. Even the HTML can be compressed if the site is high profile enough (see google.com). But! This all depends on the application.

High/medium performance sites, I believe, should minify, thus mangling the view sauce (though don't go changing your class names to ‘a', ‘b', etc).

Blogs, demos, show off sites should remain uncompressed to allow people to still learn (but you still need to consider your user - and whether compressing helps).

However! There's one big factor that means we can still learn from compressed CSS + HTML: Firebug. Firebug translates the markup in to a nicely laid out format, and we're all good to learn again - along with the simple fact that in 2009 client side engineering is a recognised practise - and there's much more learning resources available.

