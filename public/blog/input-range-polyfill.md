---
title: input range polyfill
date: '2011-07-18 13:00:24'
published: true
tags:
  - code
modified: '2018-08-24 13:09:28'
---
# input range polyfill

During [The Highland Fling](http://thehighlandfling.com/) (an excellent conference by the way - highly recommend), James Edwards aka [Brothercake](http://www.brothercake.com/) was talking about the graceful degradation of HTML5 Web Form elements, in particular the [input range type](http://www.w3.org/TR/html-markup/input.range.html).

He points out that degrading to text isn't graceful at all, because with a range, you have predefined options. Much like a select box.

## In the wild

In the last week I've worked on two small projects of which both needed a slider aka range element. In one the user gives a rating to an item, 1 - 5. In the second, the user slides from a scale from 10 to 3000.

With `<input type=range>` the apps looked great. Then I opened them in Firefox 5 and iOS 4.x and there's no range, but a text box. Not useful at all.

Good thing that during James' Q&A session at The Highland Fling I wrote the solution he was describing :)

<a href="https://twitter.com/jackosborne/status/89370027802902528"><img alt="Jack watching me code" src="/images/jack-watching-me-code.png" style="display: block; margin: 0 auto;" /></a>

## Solution

Instead of the input range, you use a select with a type attribute of range. In that select you offer the options the user can select (in the case of my problem 10-3000, actually I wanted them to chose device widths, so the options were 10, 320, 340, 420, etc for various device widths).

For a rating, here's what you'd have without JavaScript:

    <select data-type="range" name="rating">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>

After the DOM is ready, my range polyfill kicks in, and upgrades our select elements with `data-type=range` to an input range type only if the browser supports it.
My code tries to replicate all the attributes from the select element, class, id, etc. It will read the first and last options and use those as the min and max, and then read the selected value and use that as the initial value.

## The code

You can download it from here: [range.js](https://github.com/remy/polyfills/blob/master/range.js)

Here's a live example using the range.js code: [https://jsbin.com/atocep/11/edit](https://jsbin.com/atocep/11/edit#html,live)

I've included the range.js script in my polyfills github repo, so if you find a bug do help yourselves to contributing too.

<div class="update">I've changed the search for the select to look for <code>data-type="range"</code> instead of <code>type="range"</code> - for those validation junkies out there :)</div>
