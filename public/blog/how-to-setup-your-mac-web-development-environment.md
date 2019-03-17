---
title: How to setup your Mac web development environment
date: '2007-01-06 16:35:42'
published: true
tags:
  - apache
  - apple
  - development
  - howto
  - mysql
  - php
  - tips
  - tutorial
  - web
modified: '2014-09-03 16:15:12'
---
# How to setup your Mac web development environment

Following [my accident](http://remysharp.com/2006/12/14/the-delicate-apple/) a couple of weeks ago, I've now been blessed with a [new MacBook Pro](http://www.flickr.com/photos/remysharp/tags/macbookpro) which needs setting up again.

So, I thought I'd document setting up MySQL, PHP5 and Apache with multiple virtual hosts.


<!--more-->

## Tasks

1. [Install PHP5](#install_php)
2. [Install MySQL](#install_mysql)
3. [Configure MySQL](#configure_mysql)
4. [Configure Apache with virtual hosts](#configure_apache)

## Notes

- I'm not upgrading Apache to version 2 - I don't see the point since 1.3x is perfectly good.
- I prefer to use PHP5 because I started making more use of the XML functions (though I've never coded in PHP4, I've been told to watch out for the '&lt;? ?&gt;' vs. '&lt;?php ?&gt;').
- I am assuming you can open Terminal and can cut and paste.

## Quick Disclaimer

I'm going to document *my* installation.  Make sure you backup where ever necessary, and please don't blame me if it all goes to hell.  Don't get me wrong, if you drop a comment, I'll be more than happy to help where I can, but backup, backup and <abbr title="Read the Frickin' Manual">RTFM</abbr>.

## Step 1 - installations

<h3 id="install_php">PHP</h3>

Download PHP5 from [Marc Liyanage's PHP web site](http://www.entropy.ch/software/macosx/php/) and follow the [simple install](http://www.entropy.ch/software/macosx/php/#install) instructions.

Note that Marc explicitly states to **NOT USE** [stuffit expander](http://www.stuffit.com/), and rather use [Apple's BOMArchiveHelper](http://en.wikipedia.org/wiki/BOMArchiveHelper) or the command line.

Via the command line (via Terminal or your preferred app), if the file is still compressed - i.e. ends with .gz:

<pre><code>tar -zxvf entropy-php-5.x.tar.gz</code></pre>

Or if it was uncompressed through Safari's download:

<pre><code>tar -xvf entropy-php-5.x.tar</code></pre>

Install the package that you just untarred, and test PHP5 is fully installed (following Marc's test.php instructions).

<h3 id="install_mysql">MySQL</h3>

[Download MySQL](http://dev.mysql.com/downloads/) - I'm assuming since you're setting up a development environment on your Mac, you're a confident user - so I'm choosing the [MySQL Community Server](http://dev.mysql.com/downloads/mysql/?rz=gdl#downloads).

Select the right <a href="http://dev.mysql.com/downloads/mysql/5.0.html#Mac_OS_X_(package_format)">Mac OS X MySQL installation</a> that suits your machine (Intel based machines are the x86 installs).  I chose to install the 'standard' install because it suits my needs.

Note that you don't particularly have to put in the details on the download page, you can skip it.  I did because I've filled it in before, and letting them know how you plan to use their product may actually contribute to a better MySQL.

Double click the MySQL package (rather than the startup packge), and install away.

If you want MySQL to start automatically, install the startup package that also came in the [.dmg](http://en.wikipedia.org/wiki/.dmg).

Note the following from the MySQL readme.txt:

> After the installation, you can start up MySQL by running the following
> commands in a terminal window. You must have administrator privileges
> to perform this task.
>
>If you have installed the Startup Item, use this command:
>
>     shell> sudo /Library/StartupItems/MySQLCOM/MySQLCOM start
>     (ENTER YOUR PASSWORD, IF NECESSARY)
>     (PRESS CONTROL-D OR ENTER "EXIT" TO EXIT THE SHELL)
>
>If you don't use the Startup Item, enter the following command sequence:
>
>     shell> cd /usr/local/mysql
>     shell> sudo ./bin/mysqld_safe
>     (ENTER YOUR PASSWORD, IF NECESSARY)
>     (PRESS CONTROL-Z)
>     shell> bg
>     (PRESS CONTROL-D OR ENTER "EXIT" TO EXIT THE SHELL)

Give it a little test:

<pre><code>$ /usr/local/mysql/bin/mysql
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| test               |
+--------------------+
2 rows in set (0.00 sec)</code></pre>

### A quick break for some useless knowledge...

I was once told by a MySQL engineer that MySQL was named after the creator's daughter (I say creator because it was in a pub and I can't remember who he said!), and being Swedish she was called 'My', pronounced: 'Mee'.

So, MySQL, is supposed to be pronounced: Mee-S-Q-L.

Ah...back to work.

## Step 2 - configure

<h3 id="configure_mysql">MySQL</h3>

Let's add MySQL to our path so we can just type 'mysql' from the prompt.

Edit (or create) .profile (that's prefixed with a dot) in your home directory, and add the following line:

<pre><code>export PATH=$PATH:/usr/local/mysql/bin</code></pre>

If you're not sure, from the command line run this command (it will add the appropriate line):

<pre><code>printf "\nexport PATH=\$PATH:/usr/local/mysql/bin" >> ~/.profile</code></pre>

If you open a new Terminal session (or run 'source ~/.profile'), you should now be able  to run MySQL from the prompt (i.e. just type 'mysql').

Note that if you want password protect the administration of mysql, you will need to enter the following command (here NEWPASSWORD is your own password):

<pre><code>sudo mysqladmin password NEWPASSWORD</code></pre>

I don't personally both, because it's an offline environment and secured on my laptop.

<h3 id="configure_apache">Apache and multiple offline domains</h3>

Personally, since I work on multiple websites, so I have to set up offline versions, such as: http://apple.**dev** ([why no www?](http://remysharp.com/2006/09/08/dub-dub-dub-or-how-we-pronounce-the-world-wide-web/)) (and then at a later date upload to the production web site...though thankfully not [apple.com](http://apple.com)!)

#### 1. Set up directories

In your home directory you will find a 'Sites' folder.  

Create a new directory, in my case I'm creating 'apple.dev'.  Inside of that directory I am adding one further directory: htdocs.

I am also going to create a logs folder in /var/logs/httpd/ called apple.dev.  This is so I keep all my logs in a consistent directory (and I can use the console app to view them at a later date if I please).  You can do this from the command line using this command:

<pre><code>sudo mkdir /var/logs/httpd/apple.dev</code></pre>

Now I create a symbolic link to the logs directory (assuming I am in the /Users/USERNAME/Sites/apple.dev directory):

<pre><code>ln -sf /var/logs/httpd/apple.dev logs</code></pre>

My directory structure now looks like this:

<pre><code>ls -ltr /Users/remy/Sites/apple.dev
total 8
drwxr-xr-x   2 remy  remy  68 Jan  6 15:04 htdocs
lrwxr-xr-x   1 remy  remy  24 Jan  6 15:05 logs -> /var/log/httpd/apple.dev</code></pre>

#### 2. Add a host entry

Edit /etc/hosts with your [favourite text editor](http://macromates.com) and add the following (obviously replacing *apple.dev* with your own offline domain):

<pre><code>127.0.0.1 apple.dev</code></pre>

<small>You can use TextEdit to make the changes, but you probably won't be able to navigate to the /etc/ directory.  In which case, press command + shift + g and enter '/etc/', then you will be able to pick the file out to edit.</small>

You'll be prompted for the password to change protected files, go ahead and stick it in.

Depending on whether your domain exists in the real world you may have to run the following command from Terminal (though it won't hurt if you run it regardless):

<pre><code>lookupd -flushcache</code></pre>

This will clear the DNS cache on your machine, meaning that the DNS lookup daemon process will re-read /etc/hosts for the domain in question.

#### 3. Add virtual host entry

Again in your editor, you will need to edit /private/etc/httpd/users/${USER}.conf (in my case the file is called remy.conf).

In this file, add the following (changing USERNAME to your home directory username)

<pre><code>NameVirtualHost *:80
&lt;VirtualHost *:80&gt;
  DocumentRoot /Users/USERNAME/Sites/apple.dev/htdocs
  ServerName apple.dev
  ErrorLog /Users/USERNAME/Sites/apple.dev/logs/error_log
  CustomLog /Users/USERNAME/Sites/apple.dev/logs/access_log common
&lt;/VirtualHost&gt;</code></pre>

<small>Note that if you add further domains, you only need the line 'NameVirtualHost *:80' once.</small>

#### 4. Restart Apache and test

Now everything is place, we should be able to restart and test.  First things first, test our config changes:

<pre><code>sudo /usr/sbin/apachectl configtest</code></pre>

This should say everything is fine.  Now for a restart.

<pre><code>sudo /usr/sbin/apachectl restart</code></pre>

<small>If this doesn't work, do a 'apachectl stop', then 'apachectl start'.</small>

Now in your browser go to your offline dev web site, in my case: http://apple.dev.  You should see an empty directory.

Drop in a [dummy index file](/uploads/2007/01/index.html) to truly test the pages are being served up.  You should find you have no problems (well...I didn't!).

## Finishing up

So, there you have it.  You should now have a multi-domain offline development environment.  

You can start putting PHP files in the htdocs directory and connecting MySQL and all that jazz.  

Please let me know if there were any glaring errors or if you found this tutorial super useful!
