---
title: Google Assistive Technology Detection
date: '2009-07-01 14:25:20'
published: true
tags:
  - accessibility
  - aria
  - code
  - google
  - web
modified: '2014-09-03 16:15:12'
---
# Google Assistive Technology Detection

We all know Google engineers are working away a stuff that's so amazing they have to wait a couple of years before releasing it otherwise it'll blow our minds up (Gmail, maps, etc).

That said, they've released functionality tucked away inside the search results page that I never knew existed. Full accessibility support.

<!--more-->
I spotted this when I was preparing my slides for the [Sweden Geek Meet](http://robertnyman.com/2009/05/04/geek-meet-charity-june-4th-2009-chris-mills-and-remy-sharp-speaking/) talk: [Blueprint for Unobtrusive Web Development](/talks/#2009_geekmeet).

When using [FireVox](http://firevox.clcworld.net/ "Fire Vox: A Screen Reading Extension for Firefox") the free screen reader extension for Firefox, Google's search results automatically detected the assistive device and changed the experience for me.

Below is a video demonstrating the experience:

<video width="597" height="373" autobuffer controls>
  <source src="http://jqueryfordesigners.com/media/google-axsjax.ogg" type="video/ogg"/>
  <source src="http://jqueryfordesigners.com/media/google-axsjax.mov" type="video/quicktime"/>
  <p>The video is available for download here: <a href="http://jqueryfordesigners.com/media/google-axsjax.mov">http://jqueryfordesigners.com/media/google-axsjax.mov</a>
</video>
## What happened

I've not looked too deeply in to it yet, but as far as I understand, using the [AxsJAX](http://code.google.com/p/google-axsjax/ "google-axsjax - Google Code") library, Google is able to detect assistive devices and respond accordingly.

Here's a list of what changed from the *traditional* experience:

1. The first result is made to appear much bigger and easier to read
2. The screen reader, via ARIA (I believe), jumps to the first result, skipping over the header gumph
3. Results are navigable using the cursor keys: up & down
4. As the next result is highlighted and before the screen reader announces the detail, an audible cue tells us it has moved on
5. If we reach the last result and press the down cursor, it returns to the first result, triggering a higher pitched audible cue, telling me it has started again

All this happens without me having to *tell* Google that I'm using a screen reader.

I definitely want to see more of this in upcoming applications (note: from what I understand, this is also built in to Gmail, Reader and number of other apps).
