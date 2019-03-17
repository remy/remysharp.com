---
title: Download stats for S3
date: '2008-07-16 14:22:31'
published: true
tags:
  - google
  - s3
  - web
modified: '2014-09-03 16:15:12'
---
# Download stats for S3

As [jQuery for Designers](http://jqueryfordesigners.com/ "jQuery for Designers - Tutorials and screencasts") continued to grow in interest, so did the video downloads.

The main problem my server faced was that when a large influx of traffic came in all at once, say if [Smashing Magazine](http://www.smashingmagazine.com/ "Smashing Magazine") [publishes a post](http://www.smashingmagazine.com/2008/04/15/60-more-ajax-and-javascript-solutions-for-professional-coding/) covering a couple of tutorials, all the apache processes would be busy serving up 30Mb video files - traffic starts to build, the server starts to choke and it all goes downhill.

[S3](http://aws.amazon.com/s3 "Amazon Web Services @ Amazon.com") to the rescue, but I also wanted to make sure I could keep track of the download stats.


<!--more-->

## Step 1 - Upload to S3

For the Mac, I've traditionally used [Cyberduck](http://cyberduck.ch/ "Cyberduck | FTP, SFTP, WebDAV &amp; Amazon S3 Browser for Mac OS X.") for transferring files.  In the last 6 months or so, they added support to upload directly to S3 'buckets'.  I've tried the Firefox plugin (it was a bit clunky) and before finding Cyberduck support S3, I had used JungleDisk.

The advantage of Cyberduck is that a) it's free, and b) it's super easy to use - it treats it just like a traditional connection.

Once the files are uploaded, you need to make sure the files have read permission set on everything you want your users to see.

## Step 2 - Tidy URLs

So first off - this URL sucks:

http://8b8a7422192806b94844336167669d2-default.s3.amazonaws.com/coda-slider.mov

It's too long, and ideally it matches the domain your site is running from.

Digital Magazine have a superb article on [how to configure S3](http://www.digital-web.com/articles/scalable_hosting_s3/) to give you really clean URLs.

One tip I can offer when you're setting this up, you need to ensure your 'bucket' name matches the domain you redirect to.

In my case, it was going to be media.jqueryfordesigners.com, so the bucket name (actually just a new directory if you're using Cyberduck) had to match exactly.

I could now access all the files I had uploaded to the bucket, and marked as read through this clean URL:

http://media.jqueryfordesigners.com/coda-slider.mov

However, there's just one more simple step to keeping track of all the downloads.

## Step 3 - Track

To completely track the downloads, and make use of nice clean URLs, we need two things:

1. .htaccess
2. A logging script (taken almost entirely from [Linklove's analytics without JavaScript](http://www.vdgraaf.info/google-analytics-without-javascript.html))

As mentioned, in my case the target URL is: 

http://media.jqueryfordesigners.com/video.fmt

This is achieved by creating a logging script called <code>media.php</code> which requires the query string <code>url=video.fmt</code>.  The actual URL the user will see is:

http://jqueryfordesigners.com/media/video.fmt

This way I can process the call via the <code>media.php</code> script, then redirect the user off the real location.

### .htaccess

mod\_rewrite is used to keep the URL clean and redirect the request to the right script:

<pre><code>&lt;IfModule mod_rewrite.c&gt;
Options +FollowSymLinks +ExecCGI
RewriteEngine On
RewriteBase /

RewriteRule ^media/(.*)$ /media.php?url=$1 [L]

# other rules here...
&lt;/IfModule&gt;</code></pre>

### Logging Script

<pre><code>&lt;?php
$var_utmac='UA-1234567-8'; // your urchin code
$var_utmhn='jqueryfordesigners.com'; // your domain
$var_utmp='media/'.$_GET['url']; // this is the file name that will be logged in Google Analytics

// Shouldn't need to change these...
$var_utmn=rand(1000000000,9999999999); //random request number
$var_cookie=rand(10000000,99999999); //random cookie number
$var_random=rand(1000000000,2147483647); //number under 2147483647
$var_today=time(); //today
$var_referer=@$_SERVER['HTTP_REFERER']; //referer url
$var_uservar='-'; //enter your own user defined variable

// the Analytics URL - make sure this is still one line
$urchinUrl='http://www.google-analytics.com/__utm.gif?utmwv=1&utmn='
  .$var_utmn.'&utmsr=-&utmsc=-&utmul=-&utmje=0&utmfl=-&utmdt=-&utmhn='
  .$var_utmhn.'&utmr='.$var_referer.'&utmp='
  .$var_utmp.'&utmac='
  .$var_utmac.'&utmcc=__utma%3D'
  .$var_cookie.'.'.$var_random.'.'.$var_today.'.'.$var_today.'.'
  .$var_today.'.2%3B%2B__utmb%3D'
  .$var_cookie.'%3B%2B__utmc%3D'
  .$var_cookie.'%3B%2B__utmz%3D'
  .$var_cookie.'.'.$var_today
  .'.2.2.utmccn%3D(direct)%7Cutmcsr%3D(direct)%7Cutmcmd%3D(none)%3B%2B__utmv%3D'
  .$var_cookie.'.'.$var_uservar.'%3B';

// the request to Google is handled sent
$handle = fopen ($urchinUrl, "r");
$test = fgets($handle);
fclose($handle);

// finally we redirect the user to the real location of the file
header('Location: http://media.jqueryfordesigners.com/' . $_GET['url']);
?&gt;</code></pre>
