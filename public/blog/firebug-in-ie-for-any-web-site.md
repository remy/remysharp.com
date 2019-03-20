---
title: Firebug in IE for *any* web site
date: '2007-03-13 15:41:18'
published: true
tags:
  - bookmarklet
  - firebug
  - ie
  - web
modified: '2014-09-03 16:15:12'
---
# Firebug in IE for *any* web site

As a web developer, I'm constantly using [Firebug](http://getfirebug.com), but when it comes to testing in <abbr title="Internet Explorer">IE</abbr> it's a nightmare if there's any bugs.

Firebug does provide a '[lite](http://getfirebug.com/lite.html)' version, but you have to have in it in every page you want to debug.

Well, not anymore.


<!--more-->

Although the lite version of Firebug is nowhere near the fully featured Firefox version, it does allow me to do some interrogation of the DOM and objects I've created.

So I tweaked the lite version and now I can load the Firebug lite in to any page I want via a bookmarklet.

## Installing

I recommend you download the tweaked [firebug.js](/images/firebug.js) on to your own server for piece of mind<sup>&dagger;</sup>

<small>&dagger; If I was being malicious I could change the hosted JavaScript to post cookie data to another web site if I wanted.  I'm **not** malicious - but it's worth keeping in mind!</small>

To use the bookmarklet, drag the link below in to your links toolbar in IE.

<a href="javascript:var h=document.getElementsByTagName('html');h[0].setAttribute('debug', 'true');if (!document.getElementById('_fb')) { var q=document.createElement('script');q.setAttribute('id', '_fb');q.setAttribute('src', '/images/firebug.js');document.getElementsByTagName('body')[0].appendChild(q);void(q);}else{void(window.console.open());}" style="font-size: 150%;">Firebug Bookmarklet</a>

If you use your own version of firebug.js - change the following block in the bookmarklet's code to point to your code:

`http://remysharp.com/wp-content/uploads/2007/03/firebug.js`

### Safari

Currently I can't get the bookmarklet to work for Safari (though I've found 99.9% of the time, if the JS works in Firefox, it will work in Safari).  It's because I can't target the contents of the iFrame...yet.

## How it was done

In the interest of understanding what I did, I thought I'd quickly drop an explanation - and perhaps [Joe Hewitt](http://joehewitt.com/about.php) may consider adding the tweaked version.

### getFirebugConsoleiFrame()

I created a new function to return the Firebug console's HTML content.  This meant I didn't have to source the console's content (an iFrame) from another domain (which would lead to obvious permission problems).

### createFrame()

I removed the setting of the 'src' attribute on the iFrame (as discussed above), and once the iFrame was loaded in to the DOM, I could change it's HTML using

`consoleFrame.contentWindow.document.write(getFirebugConsoleiFrame());`

I tell you: I don't think I've used '.write' since the early 2000s - but it did the trick in IE.

Any comments, suggestions or problems let me know.
