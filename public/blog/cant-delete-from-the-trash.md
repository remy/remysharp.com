---
title: Can't delete from the trash?
date: '2007-02-04 20:44:21'
published: true
tags:
  - apple
  - tips
modified: '2014-09-03 16:15:12'
---
# Can't delete from the trash?

Recently I tried to empty the trash on my Mac only to be continuously prompted with "cannot delete, file is locked".

I found the guilty party was Windows Media Player (because the best place for that on a Mac is the trash - use VLC instead!).

It didn't really matter what the file was, I couldn't remove it.  So here's how I **did** get rid of it.


<!--more-->

I opened the Terminal app.  I then entered the hidden Trash directory in my home folder:

`cd ~/.Trash`

Note that I found the trash directory using two commands, the first located the directory in question, the second shows me hidden files when running 'ls':

`locate .Trash`

<small>The dot indicates it's hidden.</small>

`ls -ltrFa`

<small>Shows all the files (including hidden) in the current directory - quite handy as a default.</small>

Once I'm certain where the .Trash directory is, I run the following command (in my particular case I'm getting rid of Windows Media Player):

`sudo su -
cd /Users/remy/.Trash/
rm -rf Windows\ Media\ Player/`

<small>After I type 'sudo su -' I am prompted for **my** password.</small>
<small>Please be very careful with 'rm -rf' it recursively removes all the files in given directory without prompting for confirmation.  Use it carefully, or don't use it at all.</small> 

Now I went back the Trash in OS X, and ran 'Empty Trash' and it went about it's business cleaning up the remaining files.
