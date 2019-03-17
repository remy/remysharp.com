---
title: CORS isn't just for XHR
date: '2013-01-14 12:00:50'
published: true
tags:
  - ajax
  - cors
  - html5
  - javascript
  - web
modified: '2014-09-03 16:15:12'
---
# CORS isn't just for XHR

Cross Origin Resource Sharing (CORS) is what allows XHR (i.e. Ajax) requests to go cross domain. It's a simple header response to the XHR request that says "yes, you can complete your request", looking like this (if we allowed any client to place an XHR request against our service):

    Access-Control-Allow-Origin: *

Should you be adding this header to your existing API services? **[Yes](http://annevankesteren.nl/2012/12/cors-101)**. 

If you want more details on how it works check out this [HTML5 Rocks article](http://www.html5rocks.com/en/tutorials/cors/) and make sure to watch out for [preflight issues](http://remysharp.com/2011/04/21/getting-cors-working/).

But this post isn't about CORS for XHR, it's about CORS for images. CORS for images is important for remixing content and sites such as [Flickr](http://flickr.com/photos/remysharp), [Instagram](http://instagram.com/remysharp), [Imgur](http://imgur.com/r/lolcats) and the like.

## What use is CORS for images?

(As far as I know) there's one major use case: when you're creating a dynamic canvas image and *you want to export it*. The canvas element has a method called `toDataURL` which gives you a base64 string representing the content of the canvas.

Perhaps you're creating a collage of your flickr photos and want to print that collage out. More specifically, in my case, I've been taking a photo a day for 3 years, and I wanted to print the entire collection out on a material canvas. I use the canvas API to generate my image, but I can't export it.

That's to say, if you use canvas API method `drawImage` to paint a flickr photo (perhaps even *your own*) on to a canvas element, you can't use `getImageData` to further manipulate the pictures, nor can you use `toDataURL` because the url your script executed on is not the same origin* as the flickr photo.

<small>* *origin*, which is made up of the protocol, host and port number.</small>

The solution to allowing us to export our canvas creations is to enable CORS from the source origin. Simply adding the `Access-Control-Allow-Origin` header when an image requests origin rights.

So in my case, where I wanted to generate a file to be sent to the printers, I moved my code to using Node.js (which I'll post about in detail another day). Couldn't do the export in the browser - but *I should have been able to*.

## How to request images with CORS

You have to set the [crossOrigin](http://www.w3.org/html/wg/drafts/html/master/infrastructure.html#cors-settings-attribute) attribute, which can be set via HTML attributes or via JavaScript.

A blank value (as an HTML attribute) has the default value of `anonymous` - which is likely what you want. Alternatively you can set this to `use-credentials` which sets the credentials request header - which the server can use to decide whether you have rights to the content.

When the CORS headers are sent back from the server for an image, and that image is used on a canvas, the *origin-clean* flag is true, and we are able to remix the content as we please. 

Below you can see a simple working example. The script reads the image element, draws and scales it to a new canvas, then creates a circular version of the picture, and it's then exported to a new *real* image element, and finally the original image is replaced with the *cirlified* image. The source image is hosted on http://rem.io (the `<img>` element with the `crossOrigin` attribute at the top of the HTML) but the image remixing is happening on http://jsbin.com (as an embed on this site via an iframe).  This is all possible with CORS support.

<a class="jsbin-embed" href="http://jsbin.com/ijimay/2/embed?live,html">canvas resizer</a><script src="http://static.jsbin.com/js/embed.js"></script>

## Go forth!

So if you happen to work at a company, or know someone that works at a company that hosts user images - please please add CORS support to your images (if an origin header is sent in the request). 

<div class="update">There's some <a href="https://plus.google.com/u/0/116910304844117268718/posts/96bSWSQ9zLY">good discussion going on</a> over at Google+ whereby Matle Ubl disagrees that you should slap on a whitelist star rule. Worth reading too.</div>

Go, go make that change, now!
