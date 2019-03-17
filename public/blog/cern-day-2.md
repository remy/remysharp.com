---
title: CERN day 2
date: '2019-02-13 10:05:36'
modified: '2019-02-12 21:40:51'
tags:
  - personal
published: true
---
# CERN day 2

Though my body clock says it 7:30pm it feels like it's midnight—it's been a long, busy, interesting and surprisingly productive day.

![WorldWideWeb renders](/images/cern-2019/www-at-remy.jpg)

_(Oooh look, the old NeXTcube with WorldWideWeb browser can see yesterday's blog post!)_

<!--more-->

## Digging into memories

The team had a short morning of coding and trying to overcome problems before shooting across the campus to meet [Robert Cailliau](https://en.m.wikipedia.org/wiki/Robert_Cailliau) for lunch at the main canteen, where team member, Jeremy Keith worked at picking his brain to the events some 30 years ago. 

As much as this project is to recreate the original WorldWideWeb browser, it's also a digital archaeology (or excavation?) project which will be weaved into a story (by the wordsmiths of our team) and published online once our work is done.

We had already spent some time with [Jean-François Groff](https://www.youtube.com/watch?v=rKaAVobE-3k) who (as far as I understood) contributed on the WorldWideWeb browser and the [libwww](https://en.m.wikipedia.org/wiki/Libwww) library (that powered a lot of http servers and clients). He shared a fun anecdote on how the Line Mode Browser (the 2nd browser) announced itself to the world.

If a user anonymously connected to cern.ch via telnet, instead of a static text notice, they would be presented with the output of the Line Mode Browser rendering a web page (I'd imagine the [first web page](http://info.cern.ch/hypertext/WWW/TheProject.html)) and, if I followed correctly, the user could interact and navigate through the the sign in software. Pretty smart!

Along with our own team efforts to document, there's CERN videographer and editors _and then_ we also had the US mission team (sounds serious!) filming and interviewing.

![Jeremy talks](/images/cern-2019/jeremy-talks.jpg)

## All the data

We're also working right next to the main data centre for CERN (the picture at the start of this post) and we had a tour of the centre. Tonnes of great (geek) photo ops too!

![Tapes](/images/cern-2019/tapes.jpg)

<video loop autoplay muted width="680">
  <source src="/images/cern-2019/dc.mp4" type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"'/>
</video>

CERN still make large use of tape based storage (since it's durable, it'll still work in 20 years of being at rest, and if it tears, it's taped back together and only a few files are lost!). I hadn't expected that, but makes a lot of sense.

## Progress!

With all the activities it felt like we wouldn't make much tangible progress, but that wasn't so.

The morning was spent trying and experimenting to see if we could generate an aliased Helvetica font to replicate the visual feel of the text.

The `font-smoothing: none` were tried but just don't get the _jaggies_ we want. I'm also experimenting with drawing all the text to canvas with `imageSmoothingEnabled=false` and then generating a jaggy png for each glyph to then be used for The Mother Of All text replacement techniques. But it might be overkill, so we've move font parity to a "stretch goal".

My main role is to write code to handle server requests and deal with the interaction. The server was written in a few hours on Monday (barring a few security tweaks), and the front end simulation is being written (quickly) using React (mostly for the benefit of code organisation via components).

So far though, I'm able to:

- Navigate to any URL
- Render it into a "window" (akin to the WorldWideWeb windows)
- Edit the content (yes, edit! I'll explain in another post)
- Navigate relative links (using double click - WorldWideWeb allowed editing, so a single click would place the cursor)
- Move windows about

![Sample!](/images/cern-2019/day-2-sample.png)

The day closed out with us trying to get the NeXTcube to browse a page. Team member [Kimberly Blessing](https://www.kimberlyblessing.com/) _finally_ managed to get a binary of (one of) the original WorldWideWeb browsers onto our NeXTcube machine (oddly had a number of _other_ browsers, just not the one we needed).

The machine also needed special network connectivity to connect which we didn't have on Monday. From there we were able to view pages as they had been viewed in the early 90s.

However trying to visit a public URL just didn't seem to work. That obviously didn't stop us :) Using [some code I'd written](https://github.com/remy/old-servers) a couple of years ago, I was able to run an HTTP 0.9 compatible server on my laptop that would then serve as a proxy to the "modern" web (ie. running HTTP 1, 1.1 or 2.0).

The HTML is then thrown back to the poor old machine for some interesting rendering challenges.

All in all though, seeing our own blogs being rendered on a browser that was written 30 years ago is pretty amazing. More so as a testament to the power of HTML. Though there was a lot of junk markup in the WorldWideWeb browser window, we could also very clearly read the content of our web sites. 

Proving that HTML really is very, very backward compatible, [as shown](https://adactio.com/notes/14801) by Jeremy's adactio web site:

![](https://adactio.com/images/uploaded/14801/original.jpg)
