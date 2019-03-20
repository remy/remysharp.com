---
title: 'Doing it right: skipping the iPhone url bar'
date: '2010-08-05 13:57:05'
published: true
tags:
  - apple
  - code
  - iphone
  - javascript
modified: '2014-09-03 16:15:12'
---
# Doing it right: skipping the iPhone url bar

**Important**: As of iOS7, this technique no longer works (because Apple "fixed" it).

With some mobile web sites when visited on the iPhone, you may want to skip past the url bar (something I'm not sure if it's possible, or even worth doing on other mobiles). There's a simple solution to doing this, but doing it right is the real trick.

<!--more-->

Below are two screenshots from the mobile view of [Full Frontal, my JavaScript conference](http://full-frontal.org):

<img width="280" style="margin-right: 20px;" src="/images/ff-with-bar.png" alt="Full Frontal with the url bar" /><img  width="280" src="/images/ff-without-bar.png" alt="Full Frontal without the url bar" />

Making the iPhone hide the url bar is fairly simple, you need run the following JavaScript:

<pre><code>window.scrollTo(0, 1);</code></pre>

However there's the question of when? You have to do this once the height is correct so that the iPhone can scroll to the first pixel of the document, otherwise it will try, then the height will load forcing the url bar back in to view.

You could wait until the images have loaded and the <code>window.onload</code> event fires, but this doesn't always work, if everything is cached, the event fires too early and the <code>scrollTo</code> never has a chance to jump. Here's an example using <code>window.onload</code>: [https://jsbin.com/edifu4/4/](https://jsbin.com/edifu4/4/)

I personally use a timer for 1 second - which is enough time on a mobile device while you wait to render, but long enough that it doesn't fire too early:

<pre><code>setTimeout(function () {
  window.scrollTo(0, 1);
}, 1000);</code></pre>

However, you only want this to setup if it's an iPhone (or just mobile) browser, so a sneaky sniff (I don't generally encourage this, but I'm comfortable with this to prevent "normal" desktop browsers from jumping one pixel):

<pre><code>/mobile/i.test(navigator.userAgent) && setTimeout(function () {
  window.scrollTo(0, 1);
}, 1000);</code></pre>

The very last part of this, and this is the part that seems to be missing from some examples I've seen around the web is this: if the user specifically linked to a url fragment, i.e. the url has a hash on it, you *don't* want to jump. So if I navigate to [http://full-frontal.org/tickets#dayconf](http://full-frontal.org/tickets#dayconf) - I want the browser to scroll *naturally* to the element whose id is *dayconf*, and not jump to the top using <code>scrollTo(0, 1)</code>:

<pre><code>/mobi/i.test(navigator.userAgent) && !location.hash && setTimeout(function () {
  if (!pageYOffset) window.scrollTo(0, 1);
}, 1000);</code></pre>

<div class="update"><strong>Updated 24-July-2012</strong> added <a href="#comment-360208">Daniel's Davis' suggestion</a> so this doesn't match Opera Mobile. In fact it's worth noting this only works on an iPhone Safari browser (and Android Browser - but not Chrome for Android?) - so perhaps we could tighten the nasty browser sniffing further?</div>

Try this out on an iPhone (or simulator) [https://jsbin.com/edifu4/10](https://jsbin.com/edifu4/10) and you'll see it will only scroll when you've landed on the page without a url fragment.
