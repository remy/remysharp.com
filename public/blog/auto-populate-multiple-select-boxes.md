---
title: Auto-populate multiple select boxes
date: '2007-09-18 23:46:35'
published: true
tags:
  - code
  - jquery
  - mysql
  - project
  - select-boxes
  - tutorial
modified: '2014-09-03 16:15:12'
---
# Auto-populate multiple select boxes

To follow on from [Auto-populating Select Boxes using jQuery & AJAX](http://remysharp.com/2007/01/20/auto-populating-select-boxes-using-jquery-ajax/), I've had more than a few requests for how to do this for multiple select boxes.

In response, I've written a jQuery plugin and have included a simple example of three select boxes populating each other driven by a MySQL database.


<!--more-->

## Download

* [Download the selectChain plugin](/images/select-chain.js)
* [View the demo PHP script source](http://remysharp.com/downloads/select-chain.php)
* [View the demo SQL source](/images/select-chain.sql)
* [Demonstration](/images/select-chain.php)

## Prerequisites

* [jQuery](http://jquery.com) (this has been tested with 1.1.1 and 1.2 - so it should be fine).
* Basic knowledge of [JSON](http://www.json.org/)
* Access to the server side for PHP and MySQL if you want the selects driven by a database.

## Disclaimer

I have to admit I wrote the plugin pretty quickly, so it might not have all the bells and whistles you might want it to have - but it definitely does the job.

Also, the demo I've provided does not degrade if JavaScript is turned off.  I advocate that you practise accessible JavaScript.  This example is just to show the plugin working.  **Remember to make it work via the server-side too!**

## Demonstration

This demonstration uses three select boxes, the first (element category) drives the next (elements) which drives the next (attributes).

You should keep in mind this demo was written quickly, and I would never normally use the same name attribute on a select box, because when it comes to actually submitting the form, it would be a mess of values.

[See the multiple-select population in action](/images/select-chain.php)

## Usages / Config

<pre><code>$('#categorySelect').selectChain({
    target: $('#childCategorySelect'),
    url: 'update-options.php'
});</code></pre>

### Required

* target: jQuery object or HTML element
* url: string to Ajax request

### Optional

* key: key of the key/value pair if you're returning an array of objects.  Defaults to 'id'.
* value: value of the key/value pair if you're returning an array of objects.  Defaults to 'label'.
* data: additional data values to send in the request (can be a string or object)
* type: Ajax request type, i.e. post or get

## What next?

Here's a list of small bits that I think could be added to improve this plugin, but should be simple enough for anyone to write:

* Caching Ajax results.
* Ability to send the data (posted or get) based on a dynamic criteria - i.e. perhaps there's another static select box.
* Using meta data in the classes to link the targets to the parents - but this might make for sloppy markup.

Feel free to add any suggestions or improvements.
