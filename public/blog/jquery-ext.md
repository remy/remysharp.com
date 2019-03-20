---
title: jQuery & Ext
date: '2007-04-20 12:22:47'
published: true
tags:
  - ext
  - code
  - tutorial
modified: '2014-09-03 16:15:12'
---
# jQuery & Ext

I've started playing with [Ext](http://extjs.com) with [jQuery](http://jquery.com), and although the tutorials on the Ext web site are superb, I found that I hit a few stumbling blocks - so I've written up the little gotchas.


<!--more-->

## Example

I mocked up a quick [Ext with jQuery example](/images/ext_layout.html) to create a framed layout.  Below is some information on how I got to the final output.

## Custom Builds

Firstly, the best thing about Ext is the ability to [dynamically build](http://extjs.com/download/build) what you need for your app.

You can base Ext on [Yahoo! UI](http://developer.yahoo.com/yui/), [jQuery](http://jquery.com) or [Prototype](http://www.prototypejs.org/), then you can pick a chose the functionality you want supported.  Excellent if you want to reduce the overhead on your servers.

## Ext Support

The [tutorials](http://extjs.com/learn-about-ext-javascript-library) and introduction on the Ext web site is very good though not yet in abundance.

The problem is coming from the jQuery corner, this all looks new to me, and very much like YUI (i.e. the function names).

## Problems I faced

### My assumptions

When I heard Ext was to support jQuery - I thought the syntax would be similar, and it would done using the same chaining methods.  This was totally wrong.

Ext support jQuery is simply that Ext was written for YUI originally - now you can use it with jQuery, **without** the need to include the YUI.  Beyond that it's just another library, albeit an awesome one.

### Missing scripts

The first stumbling block in getting Ext working with jQuery was the missing script: [jquery-plugins.js](/js/jquery-plugins.js).  Once that had been added, things got a little easier.

### HTML

Where I really fell down, embarrassingly, was the HTML.  The API examples don't really talk about the underlying HTML and how it should be structured.

I initially thought the HTML produced itself, but quickly realised this was madness and would negate the unobtrusiveness of the libraries.

If you lift the HTML used in the samples, and make sure you match the IDs properly, then the examples will work.

The result of not having the HTML correct was:

<code>el has no properties</code>

With jQuery, if you try to execute a function against elements that have not been found, so long as it's in a chained call, it won't throw an error - and that's what threw me, since I wasn't used to seeing errors!

### Sometime breaks without JavaScript

I found that if I turned JavaScript off, sometimes the page wouldn't render at all.  It would just remain blank.

I've not investigated this further because I know this is relatively new so I expect it was just a teething problem.

## Ext with jQuery

Overall it looks like the bag has opened up for faster web application development (I'm already working on my first jQuery + Ext app).

Watch this space for some examples and tutorials.
