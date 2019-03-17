---
title: TinyURL JavaScript API
date: '2007-03-27 15:46:28'
published: true
tags:
  - api
  - code
  - javascript
  - project
  - tinyurl
  - tool
modified: '2014-09-03 16:15:12'
---
# TinyURL JavaScript API

I've been writing a bookmarklet for [Twitter](http://twitter.com/rem) that will allow you to post URLs to Twitter, that are first compressed using [TinyURL](http://tinyurl.com).

So I thought I'd share the TinyURL callback <abbr title="application programming interface">API</abbr> I wrote.


<!--more-->

The API allows the dynamic creation of TinyURLs on the fly using JavaScript.

The API url is: [http://remysharp.com/tinyurlapi](http://remysharp.com/tinyurlapi)

Here's the source code for your own hosting: [http://remysharp.com/downloads/tinyurlapi.php](http://remysharp.com/downloads/tinyurlapi.php)

There are full instructions and examples on the page along with a demonstration.

<small>Note that since creating the script, TinyURL have changed their page so we can't create tinyurls on the fly (though we can still look up), so I've plugged in is.gk instead for creation.</small>
