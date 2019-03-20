---
title: Safari's problem with @font-face
date: '2009-06-23 16:58:55'
published: true
tags:
  - css
  - css3
  - safari
  - web
modified: '2014-09-03 16:15:12'
---
# Safari's problem with @font-face

<code>@font-face</code> is definitely a huge string to the CSS author's bow, in fact, it's like a freekin' flamin' arrow, but watch out, Safari isn't very nice to slow connections.

<!--more-->
I recently peaked my total broadband usage and as a slap me down, my ISP, Plusnet, put me on about a 6Kb connection.  Which sucks.  Web pages are slow, email is slow: it's slow.

Anyway, I'm doing a talk at [Standards.next](http://standards-next.org) this weekend on HTML 5 JavaScript APIs ([slides will be available here too](/talks/) if you can't make it), and upon visiting the site in Safari - I got to see pretty much a blank page.

This was the sequence of events I saw in Safari as the browser downloaded the <code>@font-face</code> fonts:

![Safari showing @font-face progressively loading, but the text is completely invisible until the font is downloaded](/images/safari-showing-font-face-progressively-loading-but-the-text-is-completely-invisible-until-the-font-is-downloaded.jpg)

I've run the same test against Opera 10b and Firefox 3.5b and both render the text out, and only once the font has been downloaded, do they then re-render the text, here's Opera (I also captured Firefox, but the heading is clearer in Opera for this example):

![Opera rendering @font-face after showing the default font](/images/opera-rendering-font-face-after-showing-the-default-font.jpg)

<small>I'm not sure if that first screen is the <abbr title="Flash of Unstyled Content">FOUC</abbr> bug - I didn't think it was...</small>

The real issue for me, is the simple fact the text is missing. It's not *that* unique that I'm on a slow connection.  It's slow when I'm using my 3G dongle.  It's slow when my laptop is tethered to my iPhone. The more we use mobile telephony to do wireless connectivity, the more we're going to see slow download speeds (certainly for the next few years).  We *need* to keep in mind those slow connections are out there as real users, and not just some family farm in the middle of The States somewhere.

Oh, and Webkit should fix that bug!
