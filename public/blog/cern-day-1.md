---
title: CERN day 1
date: '2019-02-12 09:49:02'
modified: '2019-02-11 23:59:35'
tags:
  - personal
published: true
---
# At CERN: building WorldWideWeb

This marks the beginning of a week long adventure in Geneva Switzerland at CERN, to work on a hack project.

<!--more-->

![my badge](/images/cern-2019/badge.jpg)

The project is to rebuilding the very first web browser, aptly called WorldWideWeb (though shortly thereafter being renamed to Nexus, since…the whole world wide web thing being a bigger deal). This browser was written by Sir Tim Berners-Lee in 1990 and the project marks the 30th anniversary of the web.

This event also reunites most of the team that made up the 2013 hack project to recreate the Line Mode Browser. On being asked if I was interested in returning, I jumped at the chance. It's CERN. There's some proper smarties rolling around here. Maybe some of that will rub off on me!

The project is a quasi historical restoration mixed with simulation as we bring the original browser to the public via modern technology, specifically and ironically, via today's browsers.

## Day 1

The first day is always a lot of finding our feet. Trying to articulate (to ourselves) what the scope of the problem is, what we need to achieve and what we _want_ to achieve.

This time around is made a little trickier (or interesting?) as there's more mixed overlap in arrivals of team members. It'll only be a single day on Wednesday that we'll be at full capacity, but compared to 2013's efforts, we have a full week to pull the job off rather than 3 days.

## The WorldWideWeb

The aim of the morning is to grasp exactly _what_ this browser did, how it did it, and what it looked like.

We've sourced [videos](https://www.youtube.com/watch?v=3c3Rt6QbHDw), [emulators](https://www.youtube.com/watch?v=XAF0xdIiI20&feature=youtu.be) and most importantly, and impressively, a [NeXTcube](https://en.m.wikipedia.org/wiki/NeXTcube) machine straight from the museum has been delivered to our (war room?…I want to say war room, but there's not much fighting going on…) room.

![NeXTcube](/images/cern-2019/nextcube.jpg)

One of the main challenges we faced (and still face at time of writing) is that we want the WorldWideWeb to run on the NeXTcube - and oddly this machine has a number of browsers, but none of them are the WorldWideWeb :-\

Somehow we'll deliver the WorldWideWeb.app directly to the machine…if only we could work out how to network the machine…

## Simulation

My role in the team is code. Firstly the server side aspect to the simulation. Then once that's solved, any interaction in the browser where we'll simulate the NeXTcube desktop and opening windows to the WorldWideWeb.

The server part is relatively small and involves:

1. Proxying requests to collect HTML and return it the client
2. Blocking all internal .cern.ch sites with a handful of whitelisted exceptions
3. In the returned HTML, strip out any unsupported tags (like `IMG` which appeared later in [Mosaic](https://en.m.wikipedia.org/wiki/Mosaic_(web_browser) - TIL: was named because it would fit together pieces like HTTP, FTP, Gopher and NNTP).

This part was partially lifted from the original [Line Mode Browser source](https://github.com/cern-hackdays/lmb) and cleaned up for the 5½ years worth of new knowledge I had :)

Then on with some traditional fondue with our team and some rest when tomorrow we might try to make some of the <abbr title="user interface">UI</abbr> come together.

![Fondue](/images/cern-2019/fondue.jpg)
