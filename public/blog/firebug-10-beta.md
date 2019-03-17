---
title: Firebug 1.0 beta
date: '2006-12-30 12:37:04'
published: true
tags:
  - css
  - debug
  - development
  - firebug
  - firefox
  - javascript
  - web
modified: '2014-09-03 16:15:12'
---
# Firebug 1.0 beta

[<img src="http://remysharp.com/wp-content/uploads/2006/12/firebug_logo.jpg" alt="Firebug logo" title="Firebug logo" style="float: left; padding: 0 10px 10px 0; border: 0;" />](http://www.getfirebug.com)[Firebug 1.0 beta](http://www.getfirebug.com/blog/2006/12/04/firebug-10-news/) for [Firefox](http://www.mozilla.com/en-US/firefox/) was released this month, and oh my, the Swiss Army knife of the browsers just got wings - and there's even support (via a [Firebug Lite](http://www.getfirebug.com/lite.html)) for IE, Safari and Opera.


<!--more-->

I've been a big fan of Firebug for JavaScript debugging.  Particularly since this one of the tough things to do in JavaScript.  I usually resorted to using 'alert' boxes or writing to some dummy SPAN element.  

Firebug allows you to interrogate any object and execute JavaScript inline and with respect to the current page - superb for debugging.

The most significant upgrade to Firebug for me, is the HTML + Style tabs.  I can 'inspect' the page, and once I select Firebug will highlight the element and all the style associated - including the inherited style (and where it was inherited from).  From there, I can edit, add or disable style to debug the layout of the page.  

![Firebug HTML Debugging](http://remysharp.com/wp-content/uploads/2006/12/firebug_html_debugging.gif)

Another new (and important to me) upgrade is the 'Net' tab.  This will time the load times for all aspects of the page.  Good for killing images that slow the page down.  Too often are we now assuming it's okay for a 100k image to live on the page because users have broadband.

Finally, the [Firebug Lite](http://www.getfirebug.com/lite.html) application.  I've given it a brief test in Safari, but I wasn't particularly impressed.  This maybe because it's such a powerful tool in Firefox, that the lite version isn't even a shadow of it's big brother.  I also found that some simple, expected functionality was lacking (though this may well be a bug).  I just tried to create an element, var d = document.createElement("DIV") - but it returned undefined.  It looks like it's mostly to avoid the console.log() causing an error on the page.

So all in all, thumbs up for Firebug 1.0 beta.

By the way - want to know how to crash Safari consistently?  Safari has it's own console that you can write to.  If you execute (in JavaScript) console.log("test"), Safari will log it.  However, if you execute console.log("test", "ok") it will crash out.  Fun eh!?
