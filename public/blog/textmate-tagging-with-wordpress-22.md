---
title: TextMate tagging with WordPress 2.2
date: '2007-06-12 10:39:36'
published: true
tags:
  - code
  - tagging
  - textmate
  - ultimate-tag-warrior
  - utw
  - wordpress
modified: '2014-09-03 16:15:12'
---
# TextMate tagging with WordPress 2.2

I've just upgraded to WordPress 2.2 and now Ultimate Tag Warrior is broken and my TextMate tagging doesn't work anymore.

So here is the explanation on how to get the two working again.


<!--more-->

Job number 1: get tags working in Wordpress.
Job number 2: get tags (and comments and pingback) recognised in the blogging TextMate bundle.

## Tag Support

Firstly, we need to add tag support.  I found [Ultimate Tag Warrior 3](http://www.neato.co.nz/ultimate-tag-warrior) which did the job just fine.

There's a few alternatives, like [Simply Tagging](http://sw-guide.de/wordpress/plugins/simple-tagging/) - but it will require a different tagging function in the XMLRPC changes below (which, for now, I've not figured out).

The install is straight forward and you can start tagging pretty quickly from the web interface.

### Ultimate Tag Warrior working in 2.2

There are three simple steps to fixing UTW in 2.2 - which I've summarised from [moeffju.net](http://moeffju.net/blog/2007/04/10/utw-wordpress-22-tags/):

1. Search and replace is\_tag with UTW\_is\_tag in ultimate-tag-warrior.php
2. Search and replace is\_tag with UTW\_is\_tag in all the files in your active theme directory.
3. If you use '/tag/mytag' as your link structure - ensure you have the following in your .htaccess:

```
RewriteRule ^tag/(.*)$ /index.php?tag=$1 [QSA,L]
```

## Tag Support for TextMate

### XMLRPC

This is the script that handles the posting on the server side.  Basically, it needs to be hacked to support tags.

### Backup

You need to backup a copy of your xmlrpc.php file.  That's just good practice.

### Download patch XMLRPC

On [Dan's suggestion](/2006/10/01/wordpress-tagging-and-textmate/#comment-154), I am [offering my own xmlrpc.php](/images/xmlrpc.php.txt) file for you to use.

This is the xmlrpc for WordPress 2.2.  For WordPress 2.0 - see my earlier post on getting [tagging working in Wordpress 2.0](/2006/10/01/wordpress-tagging-and-textmate/)

[Download the xmlrpc.php file](/images/xmlrpc.php.txt)

### Details on XMLRPC changes

Rather than explain it myself, a chap called Robin Lu has already written it up.  However, watch out for the quotation marks - in Rubin Lu's blog, they're formatted, so if you paste the changes in, it will more than likely break your xmlrpc.

Step 1: [How to make ecto work with Ultimate Tag Warrior](http://www.robinlu.com/blog/archives/57).

Step 2: [How to make ecto work with Ultimate Tag Warrior - Part II](http://www.robinlu.com/blog/archives/86)

Ignore the '[ecto](http://ecto.kung-foo.tv/archives/000991.php)' part - it's a blogging software product, but it'll do for our purposes.

<strong>The key change you need is <em>mt\_keywords</em> to <em>mt\_tags</em></strong>.

### Patching Blogging Bundle

You can use my patch, or patch the blogging.rb file yourself.

Download the latest [blogging.rb patch](/images/blogging.rb.patch) and run the patch command:

`patch -p0 < blogging.rb.patch`

### Manually Patching Blogging Bundle

You'll need to edit the blogging.rb file in the /Applications/TextMate.app/Contents/SharedSupport/Bundles/Blogging.tmbundle/Support/lib/ directory.

Find the following lines:

`@post['mt_tags'] = @headers['tags'] if @headers['tags']`

Then copy it below the

`elsif self.mode == 'wp'`

Then change:

<pre><code>@post['mt_allow_comments'] = @headers['comments'] =~ /\b(on|1|y(es)?)\b/i ? 'open' : 'closed' if @headers['comments']
@post['mt_allow_pings'] = @headers['pings'] =~ /\b(on|1|y(es)?)\b/i ? 'open' : 'closed' if @headers['pings']</code></pre>

And change the instance of 'open' to '1' (keeping the number in the quotation) and 'closed' to '0' (again keeping the quotation), so you have this:

<pre><code>@post['mt_allow_comments'] = @headers['comments'] =~ /\b(on|1|y(es)?)\b/i ? '1' : '0' if @headers['comments']
@post['mt_allow_pings'] = @headers['pings'] =~ /\b(on|1|y(es)?)\b/i ? '1' : '0' if @headers['pings']</code></pre>

That should be it.  You should be able to see my tags working on my Wordpress blog right now.
