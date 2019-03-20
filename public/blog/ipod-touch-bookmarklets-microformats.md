---
title: iPod Touch Bookmarklets & Microformats
date: '2007-11-06 19:13:30'
published: true
tags:
  - apple
  - bookmarklet
  - ipod
  - ipodtouch
  - javascript
  - microformats
modified: '2014-09-03 16:15:12'
---
# iPod Touch Bookmarklets & Microformats

Although this is should be obvious, since the iPod Touch comes with Safari, I've found to my pleasure: you can run bookmarklets through Safari (mobile).


<!--more-->

This means either I set up the bookmarklet on my desktop Safari and sync it across, or just spend a couple of minutes adding it manually.

I find bookmarklets useful for sites like Wikipedia and my del.icio.us links:

<pre><code>javascript:x=prompt('Wiki');window.location='http://wikipedia.com/wiki/'+x</code></pre>

<pre><code>javascript:x=prompt('Tag');window.location='http://del.icio.us/remy.sharp/'+x</code></pre>

It also supports much more complicated bookmarklets, like my [Microformats bookmarklet](http://leftlogic.com/lounge/articles/microformats_bookmarklet/):

<a href="http://www.flickr.com/photos/remysharp/1890904718/" title="Photo Sharing"><img src="https://farm3.static.flickr.com/2108/1890904718_a61336b868_m.jpg" width="240" height="180" alt="Microformats on my iPod Touch" /></a>

Sadly, but as expected, importing the vCard doesn't work :-( (certainly not on the iPod Touch - I'd be interested to hear what it does on an iPhone).

I also spotted the <code>overflow</code> style on the inner white div isn't working on the iPod (a bit of debugging may fix that).

As I said in the description on Flickr above, it might be worth adding the option to expand out all details, and even detecting the iPhone/Touch and adding support for [phone links](http://developer.apple.com/documentation/AppleApplications/Reference/SafariWebContent/UsingiPhoneApplications/chapter_6_section_3.html#//apple_ref/doc/uid/TP40006513-SW3).
