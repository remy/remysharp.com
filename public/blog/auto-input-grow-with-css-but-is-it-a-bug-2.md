---
title: Auto input grow with CSS (but is it a bug?)
date: '2006-11-27 09:43:32'
published: true
tags:
  - bug
  - code
  - css
  - ie
modified: '2014-09-03 16:15:12'
---
# Auto input grow with CSS (but is it a bug?)

I've been looking at the [del.icio.us](http://del.icio.us/remy.sharp/) auto text grow functionality recently, and noticed you can achieve a similar effect in CSS, but only for <abbr title="Internet Explorer">IE</abbr>.

I originally thought this was a bug since it didn't work in [Firefox](http://mozilla.org/firefox) or [Safari](http://www.apple.com/safari/).


<!--more-->

The following CSS in IE causes any input element to grow to the max width of it's contents.

`input
{
      overflow: visible;
}`

The effect is that text input boxes automatically growth to the size of the content that you enter mirroring the functionality seen in the tag search on [del.icio.us](http://del.icio.us/remy.sharp/).  

However, the question is whether (and I've not read the [w3.org](http://w3.org) specs in detail) the 'width' CSS attribute should stop this from working, and whether it *should* work in Firefox and Safari.

My feeling was that IE was incorrectly making use of this CSS, but what do you think?
