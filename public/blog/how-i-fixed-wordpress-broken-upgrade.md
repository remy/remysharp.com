---
title: How I Fixed WordPress' Broken Upgrade
date: '2008-02-06 12:08:10'
published: true
tags:
  - fix
  - web
  - wordpress
modified: '2014-09-03 16:15:12'
---
# How I Fixed WordPress' Broken Upgrade

This morning I was greeted by a big upgrade button on my wordpress admin page.  Clicking on it returned:

> WordPress database error: [Unknown column 'user_nickname' in 'field list']

What's worse, it also broke my blog, because all the plugins were turned off by default.  Here's how I fixed it.

<!--more-->

There wasn't <del>much</del> any material explaining how to get past this problem, so I went about hacking wordpress until it was working again.

I later found that, somehow, a file had been uploaded designed to compromise my machine.  It was left in /tmp/ - with a random.txt name. **Update** I've since upgraded the latest version following [these instructions](http://codex.wordpress.org/Upgrading_WordPress_Extended#Step_6:_Download_and_extract_the_WordPress_package).  I recommend you do the same if you found yourself in the same position.

### Step 1

Add the missing column it was looking for.  In MySQL run the following:

<pre><code>alter table wp_users add column user_nickname varchar(250);</code></pre>

### Step 2

If you go back to the admin login page, and then proceed, it will show a half empty page.  It's because the code is bombing out and throwing a fatal error.

Edit wp-admin/upgrade-functions.php, and edit this line (around line 654):

<pre><code>$all_options->{$option->option_name} = stripslashes($option->option_value);</code></pre>

To read:

<pre><code>if ($option->option_name) $all_options->{$option->option_name} = stripslashes($option->option_value);</code></pre>

### Step 3

Go back to the login page, and proceed.  It will complain about a missing category list table, but it will proceed. 

You can then re-enable all the plugins.  I noticed the upload folder is corrupted as well, so you'll need to update that from the admin page.

I'll be upgrading the base code shortly, but hopefully this helps anyone else stuck in the same position I was this morning.
