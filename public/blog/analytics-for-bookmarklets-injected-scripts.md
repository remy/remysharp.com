---
title: Analytics for Bookmarklets & Injected Scripts
date: '2009-02-27 08:40:22'
published: true
tags:
  - code
  - google
  - javascript
modified: '2014-09-03 16:15:12'
---
# Analytics for Bookmarklets & Injected Scripts

Lately I've been working on a number of different pure JavaScript projects ranging from widgets that are injected, bookmarklets and include scripts ([red your site](http://redyoursite.com/) for example).

The one big thing that I've always wanted to see is analytics for usage, in particular referral tracking. So I've written code for that too :-)

<!--more-->
## Usage

I would recommend including the minified source for in your script/bookmarklet rather than loading in (another) external library (given the whole point of your code might be to inject a tiny bit of code).  Then the call is simple:

<pre><code>gaTrack('UA-123456', 'yoursite.com', '/js/script.js');</code></pre>

## Download

I've posted the project up on Google code - though plan (at some point...) to move it to github with the aim to let other developers improve the script (i.e. it doesn't track browser information as yet).

[Download Google Anayltics JS](http://code.google.com/p/google-analytics-js/downloads/list)

## Notes

Currently the tracking is picking up the number of times it's downloaded and from where via the referral information. This was pretty much all I really find important in Google Anayltics, but if you want to add more information such as browser info, screen res, etc - let me know and I'll patch in the change.
