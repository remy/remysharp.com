---
title: HTML5 enabling script
date: '2009-01-07 13:49:54'
published: true
tags:
  - code
  - html
  - html5
  - javascript
modified: '2014-09-03 16:15:12'
---
# HTML5 enabling script

Since HTML5 is getting [more](http://www.brucelawson.co.uk/tests/html5-elements.html) [attention](http://adactio.com/journal/1540/) by way of marking up our new pages, and the only way to get IE to acknowledge the new elements, such as <code>&lt;article&gt;</code>, is to use the [HTML5 shiv](http://ejohn.org/blog/html5-shiv/), I've quickly put together a mini script that enables *all* the new elements.


<!--more-->

## Usage & Download

Download [html5shiv.js](https://github.com/aFarkas/html5shiv/) and must be inserted in the <code>head</code> element (this is because IE needs to know about the element before it comes to render them - so it can't sit in the footer of the page, i.e. below the elements in question).

<div class="update">I've updated this post to link to Alexander Farkas's version of the shiv - it's the very latest and my simple one line script. The one I originally released was (I thought) beautifully small, but didn't support print styles nor dynamic injection of HTML5 elements. Good thing there are smarter folk than I!</div>
