---
title: 'A few more jQuery plugins: crop, labelOver and pluck'
date: '2007-03-19 23:48:02'
published: true
tags:
  - code
  - jquery
  - labelover
  - pluck
  - plugin
modified: '2014-09-03 16:15:12'
---
# A few more jQuery plugins: crop, labelOver and pluck

I've been hoarding a few plugins which I thought it was about time I did some sharing.

They are:

1. [crop](#crop) - crop any image on the fly using JavaScript only
2. [labelOver](#labelOver) - based on an article over at [A List Apart](http://www.alistapart.com/articles/makingcompactformsmoreaccessible) an accessible method of compressing forms
3. [pluck](#pluck) - return an array of values for a specific attribute


<!--more-->

<h2 id="crop">crop</h2>

See the [crop image example](/images/crop_example.html)

The crop plugin takes an IMG element and crops them to the dimensions given.  The result is a DIV with a background image with the height and width and an offset.  The new DIV should also carry across the existing style attributes of the image.

Crops image to dimensions given.  If only width (and height), x and y are selected randomly based on the image's height and width.

<pre><code>$("img").crop(x, y, height, width, transparentURL) /* or */
$("img").crop({ x: x, y: y, height: height, width: width, transparentURL: url })</code></pre>

Unfortunately, this slick little plugin requires that pass in the [transparent gif](/images/transparent.gif) URL since <abbr title="Internet Explorer">IE</abbr> doesn't support the 'data:' pseudo protocol (which is what I used to generate and transparent gif on the fly)...making it a little less slick in my eyes.

The only thing to watch out for is cropped images should **not** have any padding.  Since we're using a background-image style to create the cropped appearance, it will bleed in to the padding.  You can use **margin** however with the same effect.

[Download the crop plugin](/images/crop.js)

<h2 id="labelOver">labelOver</h2>

See the [label over example](/images/label_over_example.html)

The labelOver plugin is a follow on from the [text hints](http://remysharp.com/2007/01/25/jquery-tutorial-text-box-hints/), but in fact the best practise solution.

It's based on the [A List Apart](http://www.alistapart.com/articles/makingcompactformsmoreaccessible) article that demonstrates using a label positioned **over** the input field.

It's important to enclose the label and input within a div that has the following CSS applied:

<pre><code>DIV { position: relative; float: left; }
LABEL.over-apply { color: #ccc; position: absolute; top: 5px; left: 5px;}</code></pre>

Obviously the top and left will depend on your own CSS, but it's easy to play with in Firbug to get the CSS just right.

Then apply the plugin using:

<pre><code>$('label').labelOver('over-apply')</code></pre>

The best way to understand how it works is to [view the example](/images/label_over_example.html), then view it with JavaScript turned off, and then CSS turned off.

[Download the labelOver plugin](/images/label_over.js)

<h2 id="pluck">pluck</h2>

Finally, pluck is a plugin inspired by [a comment](http://www.dustindiaz.com/javascript-chaining/#comment-23455) on [Dustin Diaz's web site](http://dustindiaz.com) by [Dean Edwards](http://dean.edwards.name) that I found I needed in a project I was working on lately.

It simply returns an array of attributes from the matched selector - simple, but useful enough to save me some coding time and maybe even share-worthy.

I used it to validate a form contained non-blank values:

<pre><code>if (jQuery.grep(jQuery('form :input').pluck('value'), function(e) {
  return (e.length == 0);
}).length) {
  submit.attr('disabled', 'disabled');
} else {
  submit.attr('disabled', '');
}</code></pre>

[Download the pluck plugin here](/images/pluck.js)
