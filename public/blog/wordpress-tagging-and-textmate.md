---
title: 'Wordpress, Tagging and TextMate'
date: '2006-10-01 00:12:08'
published: true
tags:
  - code
  - tagging
  - textmate
  - tips
  - wordpress
modified: '2014-09-18 15:08:55'
---
# Wordpress, Tagging and TextMate

I use [TextMate](http://macromates.com) Blogging bundle to post my blogs - it's very cool, [check out the screencast](http://macromates.com/blog/archives/2006/06/19/blogging-from-textmate/).

My blog is running off [Wordpress](http://wordpress.com) (version 2), which was incredible simple to install.

However, it doesn't come with '[tag](http://en.wikipedia.org/wiki/Tags)' support.

But help was at hand...


<!--more-->

Job number 1: get tags working in Wordpress.
Job number 2: get tags recognised in the blogging TextMate bundle.

## Tag Support

This was pretty simple after a bit of trial and error.  After hunting around, installing plugins I didn't want/need/understand, I found: [Ultimate Tag Warrior 3](http://www.neato.co.nz/ultimate-tag-warrior).

The install is straight forward and you can start tagging pretty quickly from the web interface.

Luckily the theme that I had chosen<sup>*</sup> supported <abbr title="Ultimate Tag Warriro">UTW</abbr> out of the box.

<small>Yes, I know, I should really design my own blog layout, but I wanted something quick and dirty running, and this theme, I thought, is actually not bad.</small>

Admittedly I did edit my theme files so that the tags would appear on all the pages, rather than just the single page.  I did that by searching for 'Filed' and below was the tag code, then I removed the 'is_single' check.

## Tag Support for TextMate

By default Wordpress isn't supposed to support tagging, so there's a bit of fiddle that has to be done.

First stop: [xmlrpc](http://en.wikipedia.org/wiki/Xmlrpc).

### XMLRPC

This is the script that handles the posting on the server side.  Basically, it needs to be hacked to support tags.

<div style="border:1px solid #ccc; padding: 5px;">
<p><b>Updated: Jan 2007</b></p>
<p>On <a href="/2006/10/01/wordpress-tagging-and-textmate/#comment-154">Dan's suggestion</a>, I am <a href="/images/xmlrpc.php.txt">offering my own xmlrpc.php</a> file for you to use. </p>
<p>Please, please make sure you backup your own copy before you overwrite it.  I'm not taking responsibility for any problems you might experience, but I will be happy to help where I can.</p>
<p>Note that I am running <b>WordPress 2.0.4</b> - and Dan has suggested this isn't compatible with 2.1 (I'll get round to it if there's requests) - so again: BACKUP!!!</p>
<p><a href="/images/xmlrpc.php.txt">Download the xmlrpc.php file</a></p>
</div>

Rather than explain it myself, a chap called Robin Lu has already written it up.

Step 1: [How to make ecto work with Ultimate Tag Warrior](http://www.robinlu.com/blog/archives/57).

Step 2: [How to make ecto work with Ultimate Tag Warrior - Part II](http://www.robinlu.com/blog/archives/86)

Ignore the '[ecto](http://ecto.kung-foo.tv/archives/000991.php)' part - it's a blogging software product, but it'll do for our purposes.

**The key change you need** is *mt_keywords* to **mt_tags**.

### Tweaking the Blogging Bundle

You'll need to edit the blogging.rb file in the /Applications/TextMate.app/Contents/SharedSupport/Bundles/Blogging.tmbundle/Support/lib/ directory.

Find the following line:

<pre><code>@post['mt_tags'] = @headers['tags'] if @headers['tags']</code></pre>

Then copy it below the

<pre><code>elsif self.mode == 'wp'</code></pre>

This means it will read the tags if the blogging software is Wordpress.

That should be it.  You should be able to see my tags working on my Wordpress blog right now.
