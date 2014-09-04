# Visited plugin

The idea that you can track [which links](http://jeremiahgrossman.blogspot.com/2006/08/i-know-where-youve-been.html) users have visited [re-emerged](http://www.niallkennedy.com/blog/2008/02/browser-history-sniff.html) earlier this month.

In my (rather drawn out) blog redesign process, I considered that when showing a list of [del.icio.us](http://del.icio.us) link, I could hide those ones my visitor had already been to.

Here's a jQuery plugin to filter for just visited links:

[jquery.visited.js](/downloads/jquery.visited.js)


<!--more-->

The plugin is written to filter to the visited links, and does so by plugging in an iframe and inserting all the links of interest and filtering through until it finds all the visited links.

The plugin also allows you to drop in a function to easily run against each visited link.

## Usage

<pre><code>$('#sidebar a').visited().addClass('visited');</code></pre>

Or

<pre><code>$('#sidebar li > a').visited(function () {
  // hides the li element
  $(this).parent().hide();
});</code></pre>

## Demo

I've quickly included a working demo that shows a list of del.icio.us links, and hides the ones that you've already visited.  If you click on 'show visited links' it will run the filter and show the correct links.

Note that in the demo, I've used a more complicated selector than above because I don't want to match the 'show'.

[See the demo making use of the visited plugin](/demo/visited.html)

...and yes, that is the re-design I've been working on.  It's pretty plain, but purposefully as my blog focuses so much on code.