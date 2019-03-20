---
title: How to get cookies working in IE6 stand alone
date: '2007-03-19 15:39:19'
published: true
tags:
  - web
  - ie
  - tips
modified: '2014-09-03 16:15:12'
---
# How to get cookies working in IE6 stand alone

<abbr title="Internet Explorer">IE</abbr> is the biggest player in the browser land, and as much as I hate to do so, I have to test everything in IE.  Now since IE7 is picking up ground, testing is done in both IE6 and IE7.

So, I upgraded to IE7, and downloaded and use a [stand alone version IE6](http://browsers.evolt.org/download.php?/ie/32bit/standalone/ie6eolas_nt.zip).  The problem was cookies don't work in IE6 as a stand alone.

Here's the fix.


<!--more-->

After a reasonable amount of hunting around [Google](http://google.com), I came across an article on [Position Is Everything](http://www.positioniseverything.net/) explaining how to enable cookies in IE6, how to identify IE4, 5, 6 and 7 in the title bar, and importantly, how to enable conditional comments (i.e. if you're using <abbr title="Conditional Comments">CC</abbr> for browser fixes).

Here's the full article on [fixing stand alone IE](http://www.positioniseverything.net/articles/multiIE.html).

In summary - to get the cookies working in IE stand alone:

1. Download [Wininet.dll](/images/Wininet.dll) (version 5.0.2614.3400)
2. Drop it in to the stand alone IE directory

That's it, restart the stand alone browser, and cookies should work again.

All credit to Manfred Staudinger who wrote the '[Taming Your Multiple IE Standalones](http://www.positioniseverything.net/articles/multiIE.html)' article.
