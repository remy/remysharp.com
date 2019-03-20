---
title: How to make a CMS editor more usable
date: '2007-03-16 01:30:16'
published: true
tags:
  - web
modified: '2014-09-03 16:15:12'
---
# How to make a CMS editor more usable

If you use [TinyMCE](http://tinymce.moxiecode.com/), or any other <abbr title="What you see is what you get">WYSIWYG</abbr> for that matter, to manage the content entry on your <abbr title="Content Managment System">CMS</abbr>, one of the reoccurring problems (I find) is formatting not being applied and blank line breaks when they're not wanted.

The client then thinks there's a problem with the styling of the page, when in fact the source of the problem is the content.

Here's a tip that will kill the issue and make the tool a little more usable for your clients.


<!--more-->

## Change the content CSS

Point the editor to use your web site's style sheet.  Obviously if the style is white on black you'll need to make a few small adjustments, but I'll go on the assumption it's dark on pale.

In the TinyMCE init code, add (assuming base is the key CSS):

`content_css : "/css/base.css",`

Alternatively you could create a cms.css sheet and @import the main web site's CSS and then add the bespoke helper CSS after.

## Helper CSS

Add the following CSS and your clients will immediately have a clear idea of when the content is formatted and when they've left blank lines without realising:

<code>body.mceContentBody {<br />
&nbsp;&nbsp;background: #ededed url([/images/greyed.gif](/images/greyed.gif));<br />
&nbsp;&nbsp;font-size: 80%;<br />
}<br />
<br />
body.mceContentBody * {<br />
&nbsp;&nbsp;background: #FFF;<br />
}<br />
</code>

<small>Obviously designed for TinyMCE, but your WYSIWYG editor should support something similar.</small>

## Result

Now your client has a more usable, clean CMS editor, that clearly marks out the padding, margin, non-formatted content and empty lines.

![Clean CMS](/images/clean_cms.gif)
