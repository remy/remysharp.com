---
title: What is codecasting?
date: '2013-11-14 17:59:17'
published: true
tags:
  - jsbin
  - web
modified: '2014-09-03 16:15:12'
---
# What is codecasting?

Codecasting is the process of recording your coding session, and casting it out to any number of participants, generally in real-time.

JS Bin supports codecasting out of the box, for free, to both registered and anonymous users. Just share your bin's url with `/watch` instead of `/edit`.

<!--more-->

## My backstory with codecasting

September 28th 2008 is when [jsbin was put live for the first time](/2008/10/06/js-bin-for-collaborative-javascript-debugging/). There's somewhat of a backstory as to why I created it, and there's even a precursor site I built. That's since faded into obscurity.

It was December 2008 I went to visit [Jeremy](http://adactio.com) & [Andy](http://andybudd.com) at the [Clearleft](http://clearleft.com) offices to ask their advice about the first workshop I would run (Iceweb 2008 in Reykjavik, Iceland). I sat down and told them my fantasy would be to use jsbin ([the 2008 version](http://www.flickr.com/photos/remysharp/4284906136/)) and anything I typed on my presenter machine, the student could follow along and see the code, and could switch back and forth from the output to the code on their own machine.

I referred to this as Codecasting*.

<small>* It was a term that had come naturally to me, and I'm pretty sure I found an entry in Wikipedia way back and felt disappointed I hadn't invented the term, but now (2013) I look for the wiki page and I can't find anything. I digress.</small>

The problem was streaming and persistent connections were hard (for me) with a [LAMP](http://en.wikipedia.org/wiki/LAMP_%28software_bundle%29) stack.

In fact, I did get a [version working using cometd and the bayeux protocol](https://github.com/remy/jsbin/tree/e895c32089ac1bd310b5d91aecabda219f2eccea), and recall testing it with John Resig (partly because jsbin's simplicity was inspired by his [Learning Advanced JavaScript site](http://ejohn.org/apps/learn/)).  It did just about work, but I knew it couldn't handle a lot of users because Apache would eventually bail.

So I left it.

...until I saw Ryan Dahl present Node.js at jsconf.eu nearly a year later in 2009. Codecasting suddenly was a) easy, and b) JavaSript based.

## Hacking codecasting in to jsbin

A year later, I built (a still unfinished) [Förbind](http://forbind.net/) - as "Sockets as a Service" site. This would be the ground work for adding codecasting to jsbin. In fact, there's still a link on the homepage to the [bin](http://jsbin.com/edifi3/1/edit) that you could enable codecasting with (note that this doesn't work anymore - because codecasting is now native to jsbin).

In the few days that I built Förbind (a swedish word for join, or as I liked to think: connect), the codecasting was surprisingly stable.

But then my life around that time was hard, and jsbin (version 2) was [still written in PHP](https://github.com/remy/jsbin/tree/v2.9.16) and I wanted native support for codecasting. So began the big rewrite of jsbin in the start of 2012.

Here's a video of the first implementation of codecasting in JS Bin back in late 2010. Note that codecasting wasn't and isn't limited to a single browser or single machine, JS Bin's version could run on multiple machines at once and all different types of browsers (though the Förbind version relied on Socket.IO, the current version doesn't and it relies entirely on EventSource and polyfilled techniques).

<iframe src="//www.youtube.com/embed/FjusnOgJE_I" frameborder="0" allowfullscreen></iframe>

## Native codecasting in jsbin

As of version 3 of jsbin, released in June 2012, codecasting is possible out of the box.

Take any bin you've created, and instead of /edit in the url, change it to /watch, and any number of participants can watch you live code, and the output will automatically update as they watch.

If you (the owner of the bin) creates a new revision, this update will automatically propagate to the participants and they'll continue to be able to watch your work.

If the participant wants to create their own copy, they can just create a clone, and now they have a copy from that point in time.

<small>This is also referred to as "Professor Mode" for pro users of CodePen (I believe). Codecasting in jsbin will remain free, even after pro users are added.</small>

## How it works in jsbin

Since v3 of jsbin saves pretty much every keystroke, when a save occurs on the server side, it triggers a "ping" event. This is listened to by the `EventSource` code. The code looks up the bin's url, and if anyone is listening, it pushes down the new code for that particular panel.

Both the full output views and the codecasting views listening to this EventSource endpoint, and since EventSource can be polyfilled, it works like a charm on all platforms. Simple.

In the future (of JS Bin) codecasts will be recordable and let you play them back (at a later date) and allowing you to add audio, video, annotations and anything else you want to create tutorials and examples of your work.
