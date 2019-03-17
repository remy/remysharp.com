---
title: Simple Offline Application
date: '2011-01-31 16:18:13'
published: true
tags:
  - code
  - html5
  - offline
modified: '2014-09-18 21:50:34'
---
# Simple Offline Application

I've written my fair share of single file applications. All the JavaScript and CSS are inline, and if I'm feeling particularly ninja, I'll base64 encode the images, and make them inline too.

To make the whole thing completely available offline is insanely easy, and reusable to boot.

<!--more-->

The first step is to add the `manifest` attribute to the `html` element:

    <html manifest="self.manifest">

In this case we've got a file called `self.manifest` which is pretty simple. It contains the following:

    CACHE MANIFEST

Yep, that's it. Since the application cache automatically includes the file that references the manifest file, we've now got an offline application cache for our single file app.

Make sure you're serving the manifest file correctly, if you're not sure, check out the [HTML5 Doctor introduction to offline applications](http://html5doctor.com/go-offline-with-application-cache/), but otherwise, that's it.

When I went away this last week, I wrote a little Boggle clone, and wanted it work offline on the plane - so I added this technique to the [single file app](http://rem.io/boggle/) (it's only the board and a countdown, not interactive).

Dirt simple, but totally reusable!

<div class="update"><strong>Note:</strong> the manifest file is subject to the same-origin rule, in that you can't point the manifest attribute to something like <em>http://simpleapp.com/self.manifest</em>. Equally, you can't base64 encode the manifest file as some people have asked in the comments - that would be really awesome!</div>
