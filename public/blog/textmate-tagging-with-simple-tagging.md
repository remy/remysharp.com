---
title: TextMate Tagging with Simple Tagging
date: '2007-07-22 00:39:11'
published: true
tags:
  - code
  - simple-tagging
  - tagging
  - textmate
  - tutorial
  - wordpress
modified: '2015-08-31 10:42:36'
---
# TextMate Tagging with Simple Tagging

I recently upgraded to WordPress 2.2 and found that Ultimate Tag Warrior wasn't working anymore for me.  Although I managed to hack it a bit and eventually found UTW 3, the biggest problem (and show stopper) was when a new comment was placed on a post, all the tags would disappear.

So I've moved to [Simple Tagging](http://trac.herewithme.fr/project/simpletagging/) which imports UTW tags and works just fine.

Now for the patch to allow me to tag from textmate.


<!--more-->

## Blogging Bundle

As per my tutorials on how to support tagging from [TextMate for Ultimate Tag Warrior](http://remysharp.com/2007/06/12/textmate-tagging-with-wordpress-22/) you have to patch the blogging bundle.  You can use my patch, or patch the blogging.rb file yourself.

Note: that if you've done this before (from a previous tutorial), you don't this to do this again and you can skip to the [XMLRPC changes](#xmlrpc).

### Automatically Patching Blogging Bundle

Download the latest [blogging.rb patch](/images/blogging.rb.patch) and run the patch command:

<pre><code>patch -p0 &lt; blogging.rb.patch</code></pre>

### Manually Patching Blogging Bundle

You'll need to edit the blogging.rb file in the /Applications/TextMate.app/Contents/SharedSupport/Bundles/Blogging.tmbundle/Support/lib/ directory.

Find the following lines:

<pre><code>@post['mt_tags'] = @headers['tags'] if @headers['tags']</code></pre>

Then copy it below the

<pre><code>elsif self.mode == 'wp'</code></pre>

Then change:

<pre><code>@post['mt_allow_comments'] = @headers['comments'] =~ /\b(on|1|y(es)?)\b/i ? 'open' : 'closed' if @headers['comments']
@post['mt_allow_pings'] = @headers['pings'] =~ /\b(on|1|y(es)?)\b/i ? 'open' : 'closed' if @headers['pings']</code></pre>

And change the instance of 'open' to '1' (keeping the number in the quotation) and 'closed' to '0' (again keeping the quotation), so you have this:

<pre><code>@post['mt_allow_comments'] = @headers['comments'] =~ /\b(on|1|y(es)?)\b/i ? '1' : '0' if @headers['comments']
@post['mt_allow_pings'] = @headers['pings'] =~ /\b(on|1|y(es)?)\b/i ? '1' : '0' if @headers['pings']</code></pre>

The second lot of changes (comments and pings) are added because WordPress 2.2 changes the flag it requires to turn these features on.

<h2 id="xmlrpc">XMLRPC Changes</h2>

Next we need to change the xmlrpc.php file that should be located in the root directory of your blog.  I am providing my own copy of [xmlrpc.php](/images/xmlrpc.php.txt) for download, but please be warned that I am using WordPress 2.2 and I have no idea whether this specific file will work with previous versions.

Either way: backup your files!

[Download xmlrpc.php for WordPress 2.2](/images/xmlrpc.php.txt)

I do know, however, that manually patched (using the instructions below) the tagging should work regardless of the WordPress version.

## Manually Modifying xmlrpc.php

### Step 1 - modify the setters

In the functions <code>mw\_newPost</code> and <code>mw\_editPost</code> add the following line of code:

<pre><code>$_REQUEST['tag_list'] = $content_struct['mt_tags'];</code></pre>

Above the comment in each of those functions, that reads:

<pre><code>// We've got all the data -- post it:</code></pre>

### Step 2 - modify the getters

In the functions <code>mw\_getRecentPosts</code> and <code>mw\_getPost</code>, find where the array is built (<code>$struct[] = array</code> and <code>$resp = array</code> respectively) and add the following as the first array item:

<pre><code>'mt_tags' => get_keywords($post_ID),</code></pre>

### Step 3 - get tags from Simply Tagging

Add the following function in the xmlrpc.php file (I've added it to the end of the file - but it doesn't matter, so long as it's global):

<pre><code>function get_keywords($postid) {
  global $STagging;
  $STagging->_postids = $postid;
  $tags = $STagging->getPostTags($postid, true);
  return (implode(', ', $tags));
}</code></pre>

## Finishing up

That's everything you should need to be able to enable tagging from TextMate to Wordpress using Simply Tagging.

Keep reading for a few other tips, and let me know how you find this tutorial.

### A Fix for Tag URLs

I noticed that my particular install of WordPress 2.2 and Simply Tagging 1.6.8 didn't handle [/tag/textmate](http://remysharp.com/tag/textmate) properly.  It kept saying 404 not found.

I wrote a fix and patched my version of Simply Tagging to get it to work.  Edit simpletagging.php and change line 697 from:

<pre><code>$this->search_tag = stripslashes(get_query_var($this->option['query_varname']));</code></pre>

To:

<pre><code>$this->search_tag = preg_replace('/\//', '', (get_query_var($this->option['query_varname'])));</code></pre>

### And Finally: Ecto Tagging

Though I don't use [Ecto](http://ecto.kung-foo.tv/), I'm pretty certain if you follow the instructions in the [xmlrpc section](#xmlrpc), and follow the first two steps from [Robin Lu's - How to make Ecto work](http://www.robinlu.com/blog/archives/57) it should enabling tagging.
