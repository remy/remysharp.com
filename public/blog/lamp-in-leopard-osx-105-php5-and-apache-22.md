---
title: LAMP in Leopard OSX 10.5 (PHP5 and Apache 2.2)
date: '2007-10-27 02:00:37'
published: true
tags:
  - apache
  - apple
  - development
  - lamp
  - leopard
  - osx
  - tips
  - tutorial
  - web
modified: '2014-09-03 16:15:12'
---
# LAMP in Leopard OSX 10.5 (PHP5 and Apache 2.2)

Following my [how to setup your mac web development environment](/2007/01/06/how-to-setup-your-mac-web-development-environment/), and today moving to Leopard, my entire offline environment is broken - this is entirely due to the move from Apache 1.3 to Apache 2.2.

This article will discuss the changes required to get your multi-host mac dev environment running again with PHP5, MySQL, Apache 2 and Leopard.


<!--more-->

## Orientation

Since we're running Apache 2.2, it means a few files have new homes.  Here's a comparison:

<pre><code>/etc/httpd/httpd.conf => /etc/apache2/httpd.conf
/etc/httpd/users/ => /etc/httpd/users/</code></pre>

## Get your virtual hosts back

Copy your .conf from your old <code>httpd/users/</code> directory in to the new one (above).  For example:

<code>cp /etc/httpd/users/remy.conf /etc/apache2/users/remy.conf</code>

If you restart apache (<code>sudo apache restart</code>) you should have the domains pointing to your sites.

## PHP5

PHP5 *appears* to come with Leopard (though I could be wrong, since I upgraded - please feel free to correct me).  To re-enable it, within <code>/etc/apache2/httpd.conf</code>, around line 114 - you should find <code># LoadModule php5_module</code> - uncomment this and restart apache.

Run a little PHP test, and you'll find you're running PHP again.

## MySQL

You have two options to get MySQL running again if you have the following error:

<code>Can't connect to local MySQL server through socket '/var/mysql/mysql.sock' (2)</code>

1. Reinstall PHP5 and compile it with the new path to the MySQL socket (<code>/tmp/mysql.sock</code>)
2. Change MySQL's conf to run the socket out of the old location

Since Leopard gave me PHP 5.2.4, which according to [Entropy PHP](http://www.entropy.ch/software/macosx/php/#install), is the latest version for Apache 2.x, I went with option 2.

If you don't already have the MySQL conf in <code>/etc/my.cnf</code> (I didn't), then you need to copy a template out of the support files from MySQL.  If you followed the instructions from my [previous article](/2007/01/06/how-to-setup-your-mac-web-development-environment/) - then you'll need to run the following:

<pre><code>sudo cp /usr/local/mysql-standard-5.0.27-osx10.4-i686/support-files/my-small.cnf /etc/my.cnf</code></pre>

Replace small with whatever suits your setup best.

Now follow these steps:

### 1. Shutdown MySQL

<code>mysqladmin -uroot shutdown</code>

### 2. Change the conf

Change all occurrences of <code>/tmp/mysql.sock</code> to <code>/var/mysql/mysql.sock</code>

### 3. Create /var/mysql/

<pre><code>sudo mkdir /var/mysql
sudo chmod 777 /var/mysql</code></pre>

### 4. Start MySQL back up again

<pre><code>cd /usr/local/mysql/
sudo ./bin/safe_mysqld &</code></pre>

## Wrap Up

That should be it.  I've tried to document every change I made to get going again, but if you spot any mistakes or have trouble with these instructions let me know and I'll try to help.
