---
title: Wiki to HTML using JavaScript
date: '2008-04-01 22:55:35'
published: true
tags:
  - code
  - javascript
  - project
  - wiki
modified: '2014-09-03 16:15:12'
---
# Wiki to HTML using JavaScript

In building the [jQuery API browser](/jquery-api/), since the source of the API comes from the wiki pages over at [docs.jquery.com](http://docs.jquery.com), I had to handle some wiki parsing and convert it to HTML.

However, the more I browsed the API, the more I realised there were aspects of wiki parsing I had missed.

So I built a (fairly) fully fledged wiki parser in JavaScript.


<!--more-->

I've not run any serious performance tests, but as simple parsing goes it does the job.

There's two different modes you can use it - either straight function or extending the String object.  Just change the boolean at the top of the script to flip between modes to suit your code.

[Download wiki2html.js](/downloads/wiki2html.js)

[Try out a live demo](/demo/wiki2html.html)

## Example usage

<pre><code>// include the script
var wikiContents = document.getElementById('wiki-content');
wikiContents.innerHTML = wikiContents.innerHTML.wiki2html();</code></pre>

There's also a simple check method in the script that tests if the content *looks* like wiki text:

<pre><code>// include the script
var wikiContents = document.getElementById('wiki-content');
if (wikiContents.innerHTML.iswiki()) {
  wikiContents.innerHTML = wikiContents.innerHTML.wiki2html();
}</code></pre>

## Notes

* The wiki conversion is based on [Wikipedia's cheatsheet](http://en.wikipedia.org/wiki/Wikipedia:Cheatsheet).
* It doesn't support images since the cheatsheet references them from an internal database.

Any feedback or bugs, let me know.
