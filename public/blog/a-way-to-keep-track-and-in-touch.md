---
title: A way to keep track and in touch
date: '2007-07-03 20:52:52'
published: true
tags:
  - apple
  - mail
  - tool
  - business
modified: '2014-09-03 16:15:12'
---
# A way to keep track and in touch

In reading my usual digest of RSS feeds, I came across [Merlin Mann's "I could totally use this"](http://www.43folders.com/2007/06/28/featured-links-for-june-28th/) and then the source [lazy contact manager](http://www.scottandrew.com/wordpress/archives/2007/06/a_few_music_20_ideas.html) - I figured it wouldn't be too hard to write, albeit roughly - and I would also find it useful.


<!--more-->

So, I've written a widget (because I have no idea where to start on an Object-C app...) that lets you know which of your friends or contacts you've not been in touch with since a specified cut off time.

[Download the widget](/downloads/Ketchup.zip) (but it may require some Perl modules, outlined below)

![Ketchup Widget](/images/ketchup-widget.png)

The guts of the widget is written in Perl, and there's some specific modules you'll need to install if you want to use this.

## Installing CPAN modules

* [Download DBI](http://search.cpan.org/~timb/DBI-1.58/).

To install run the following in the Terminal app:

<pre><code>sudo su -
tar -zvf DBI-xxx.tar
cd DBI-xxx/
perl Makefile.pl
make && make install</code></pre>

* [Download DBD::SQLite](http://search.cpan.org/~msergeant/DBD-SQLite-1.13/)

<pre><code>sudo su -
tar -zvf DBD-SQLite-xxx.tar
cd DBD-SQLite-xxx/
perl Makefile.pl
make && make install</code></pre>

## Get the widget

With those modules installed you can [download the Ketchup Widget](/downloads/Ketchup.zip)<sup>&dagger;</sup>

<small>&dagger; Ketchup...like 'catch-up'...</small>

It should flip to the backside of the widget to start with.  Enter the list of email addresses, comma or space separated, as you like, and then enter the cut off period in hours, days, months, etc.

If anyone can do a better job of the widget design, or even take the Perl code and port it to an Cocoa plugin I would be happy to hear from you.
