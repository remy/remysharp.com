---
title: 'IE8 hands on: a developer''s view'
date: '2008-03-06 02:29:12'
published: true
tags:
  - beta
  - ie
  - ie8
  - review
  - web
modified: '2014-09-03 16:15:12'
---
# IE8 hands on: a developer's view

Microsoft this week announced that they had [reversed their decision](http://blogs.msdn.com/ie/archive/2008/03/03/microsoft-s-interoperability-principles-and-ie8.aspx) on the whole [backward rendering fiasco](http://alistapart.com/articles/theyshootbrowsers), and today [released details](http://www.microsoft.com/windows/products/winfamily/ie/ie8/readiness/DevelopersNew.htm) of their plans for IE8.

I think Microsoft have earned themselves a hearty pat on the back, and perhaps even a nicely baked brownie and a cuppa tea.  Assuming they deliver on what they're promising.

The particular thing of interest to me was the integrated [web development tools](http://www.microsoft.com/windows/products/winfamily/ie/ie8/readiness/DevelopersNew.htm), so I've gone through it in some detail and reported here what I've found.


<!--more-->

## Debugging Tools

The biggest point of interest is the versioning combined with the development tools.  This seems to imply that since we can change the rendering engine in IE8 using a meta tag, then we should be able to use the same debugging tools against the IE7 rendered version of the page.

There is, however, a snag: if you look at the [versioning details](http://www.microsoft.com/windows/products/winfamily/ie/ie8/readiness/DevelopersNew.htm#tools) you'll see that it only supports rendering as IE8, IE7 and IE5...no IE6.

IE6 is browser most in need of these development tools.  That's a real shame.

The debugger feels like a hybrid of the Visual Studio Wed Developer Edition and the old Windows Script Editor.  It's all built in to IE which is great - no booting up extra apps, and ultimately, being able to set breakpoints and stepping through is perfect for finding that deeply set bug.

<img alt="IE 8 Debugger window" title="IE 8 Debugger window" src="/images/ie-8-debugger-window.jpg" width="600" width="320" />

The CSS treeview is very cool and gives you a good idea where an element is deriving it's style from.  You can also see in real time the effect of disabling a particular style.

However, the debugger is missing some functionality the Developer Toolbar had.  In particular the ability to add styles to the DOM element.  Maybe I've missed the functionality during my time playing with IE8 - someone please correct me if I'm wrong - but it doesn't seem to allow me to edit styles on the fly.

## Does IE8 Overwrite IE7?

Yes.

However, it does let you emulate IE7 via toolbar button.  This is good.

However (again), if you're running a stand alone IE6, is *seems* to be okay, but the actual application itself might be a little broken.  For example, going to the about page for IE6 throws a JavaScript exception...odd.  This kind of behaviour makes me suspicious.

## JavaScript 1.6

Sadly, it doesn't look like it's there.  I ran a few tests probing for <code>forEach</code> and <code>map</code> and [the like](http://developer.mozilla.org/en/docs/New_in_JavaScript_1.6) but it doesn't look like they're in place.

There are also reports that Microsoft's <code>attachEvent</code> is here to stay, so we shouldn't go removing our currying just yet.

## CSS Support

IE8 is supposed to cover all of CSS 2.1.  [Andrew Dupont](http://andrewdupont.net/) has posted with a [CSS validator](http://andrewdupont.net/2008/03/05/thought-internet-explorer-8/) that runs the query against IE8's <code>querySelector</code> function.

From my own testing, it looks like all of CSS 2.1 is in place, but Andrew has pointed out that <code>:first-child</code> isn't being supported.  I'm not sure if I've tested incorrectly, if it's a discrepancy in versions or what, but it's definitely worth giving it a test yourself to be sure.

## HTML Support

I didn't expect the HTML to be a problem, but looking at my blog in IE8, I can see a few small errors.  The first thing that stood out to me, is that it looks like the hasLayout bug is still in place.  However, using <code>zoom: 1;</code> didn't seem to shift it.  I'm not an expert here, so I'll leave this one to colleagues, readers and the experts alike.

Also, where a <code>legend</code> element has always sat on the <code>fieldset</code> border - in IE8 it doesn't:

![Legend in IE8](/images/legend-in-ie8.jpg)

## Wrap Up

Overall, I think IE8 is an exciting release.  John Resig also [points out](https://twitter.com/jeresig/statuses/767241778) IE8 will have ARIA support, which, as he suggests, shifts the focus back on to the *other* browsers to raise the bar.

This release from Microsoft has sparked as much interest in me as when IE4 was being touted about and we first started being able to play with DHTML.

I genuinely think that Microsoft have a chance of regaining respect in the development community again if they keep this up.  I am, however, not going to hold my breath for too long.  We still need to get IE6 under the carpet, and that's still years away - particularly in the UK corporate market.
