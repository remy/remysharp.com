---
title: 'The Missing Stat: noscript'
date: '2009-10-15 15:41:50'
published: true
tags:
  - code
  - javascript
  - plugin
  - wordpress
modified: '2014-09-03 16:15:12'
---
# The Missing Stat: noscript

I use Google Analytics for my web sites, you might use [Mint](http://haveamint.com/) or something else bespoke, but if you're using JavaScript to track those stats (as Google does), you're not capturing how many users you have that *don't* have JavaScript installed.  

I've written a plugin which I'll share with you and also explain how it works (so you can add it to a non-WordPress site).

<!--more-->
## WordPress Plugin

The WordPress plugin has it's own control panel that you'll need to add your site's analytic's ID, something like <code>UA-12345-6</code>, save settings and you're off.

[Download the noscript wordpress plugin](http://remysharp.com/downloads/noscript.php)

## Reporting

All the stats on users without JavaScript will be stored under a page /noscript, the page the user was actually on will be the page referring to /noscript.

![noscript reporting](http://remysharp.com/wp-content/uploads/2009/10/noscript-reporting.jpg)

## Doing it manually

Doing it manually is very simple.  If you want to record where the user is coming from, then you'll want to grab this code, and replace the variables with your own values.  I'd recommend either grabbing the plugin and whipping the code out of there, or copying the code below and making the changes for your own site.

<pre><code>$var_utmac = 'UA-12345-6'; // your identifier
$var_utmhn = 'http://mydomain.com'; //enter your domain
$var_referer = @$_SERVER['HTTP_REFERER']; //referer url

$var_utmp = '/noscript'; //this example adds a fake file request to the (fake) tracker directory

$var_utmn = rand(1000000000,9999999999); //random request number
$var_cookie = rand(10000000,99999999); //random cookie number
$var_random = rand(1000000000,2147483647); //number under 2147483647
$var_today = time(); //today
$var_uservar = '-'; //enter your own user defined variable

$urchinUrl = 'http://www.google-analytics.com/__utm.gif?utmwv=1&utmn='.$var_utmn.'&utmsr=-&utmsc=-&utmul=-&utmje=0&utmfl=-&utmdt=-&utmhn='.$var_utmhn.'&utmr='.$var_referer.'&utmp='.$var_utmp.'&utmac='.$var_utmac.'&utmcc=__utma%3D'.$var_cookie.'.'.$var_random.'.'.$var_today.'.'.$var_today.'.'.$var_today.'.2%3B%2B__utmb%3D'.$var_cookie.'%3B%2B__utmc%3D'.$var_cookie.'%3B%2B__utmz%3D'.$var_cookie.'.'.$var_today.'.2.2.utmccn%3D(direct)%7Cutmcsr%3D(direct)%7Cutmcmd%3D(none)%3B%2B__utmv%3D'.$var_cookie.'.'.$var_uservar.'%3B';

echo '&lt;noscript&gt;&lt;img src="' . $urchinUrl . '" /&gt;&lt;/noscript&gt;';
</code></pre>

## Share

Then later, let's share the results and see what kind of sites actually have visitors with JavaScript disabled.  That kind of information makes me more comfortable with things like the [HTML5 shiv](http://remysharp.com/2009/01/07/html5-enabling-script/).
