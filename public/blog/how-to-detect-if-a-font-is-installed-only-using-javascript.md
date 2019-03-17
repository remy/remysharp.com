---
title: How to detect if a font is installed (only using JavaScript)
date: '2008-07-08 17:06:57'
published: true
tags:
  - code
  - css
  - fonts
  - javascript
  - project
modified: '2014-09-03 16:15:12'
---
# How to detect if a font is installed (only using JavaScript)

In the pursuit of an idea I had recently, one tiny feature of the web site would be to detect whether the user had X font installed.

I've looked at flash solutions, since a SWF had access to enumerate the fonts, but ultimately if it could be done without flash, it would/should be faster and smarter.

So here's my pure JavaScript (okay, and a little CSS) solution: [font.js](http://remysharp.com/downloads/font.js)


<!--more-->

## Usage

Include the [font.js](http://remysharp.com/downloads/font.js) script in your page.

It relies on [jQuery](http://jquery.com) so include that somewhere too.

<pre><code>$(document).ready(function () {
  font.setup(); // run setup when the DOM is ready
});</code></pre>

Then to test:

<pre><code>font.isInstalled(fontname); // returns true or false</code></pre>

Simple.

## Example

I mention this little idea, and a fuller blog post on this later, but I've installed it and make use of it to preview a font-family list: 

[http://font-family.com/sandbox/optima,monaco,courier,random](http://font-family.com/sandbox/optima,monaco,courier,random)

## How It Works

### Comic Sans to the Rescue

For the first time in my career I've found a genuine use for Comic Sans. Due to it's huge Johnny Nomates status in typography circles, it's never been used as inspiration for any other fonts (I *may* generalising).

What makes this important is that: Comic Sans, in all it's glory, is actually unique.

From there it's a simple case of comparing the font in question against Comic Sans and if they match, it's not installed.

### Basic Matching

Since we've no way to examine the font, nor look, programmatically, at the characters, we're limited to just checking the width of the rendered text.

As such, this can cause some false negatives if the font has characters exactly the same width as Comic Sans.  However, this is less likely due, again, to it's uniqueness.

### Tricks

The key to a successful match are two tricks:

1. Large fonts.  Having the font size cranked right up, increases the margin for errors, i.e. if there's a subtle difference that would be hidden between pixels, increasing the font exaggerates this making it easier to spot.
2. Use wide letters.  I'm using 'w' and 'm' against each other.  It's almost arbitrary, but again, it increases the margin for error, and hence asserting the font is installed.
