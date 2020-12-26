---
title: One decade waiting for web APIs
tags:
- web
- code
draft: true
date: 2020-11-09
---

# One decade waiting for web APIs

Lately this year a number of new browser APIs have started to land that I had wanted ten years ago. That's not to say that the process is slow, more that the technology simply didn't exist a decade ago, and now the APIs exist, it took me a matter of hours to build the small bit of software I so desperately wanted back then.

<!--more-->

## What I needed

A little over ten years ago personal tragedy struck. If you know my story, you'll know what this is. The night I arrived home and I lay in bed trying to sleep, I brought up a photo that had been taken that day that I **needed** to burn into my memory. I did this using my phone propped up and the photos app to bring up the photo. The problem was that my phone kept dimming the screen, and eventually turning it off.

I know this is typically the best practice for a device to follow, but at this particular point in time I needed the picture to remain on. I needed it to be the first thing I saw if I opened my eyes.

There wasn't an app I knew of and getting a photo printed (though it's what we did) didn't give me the photo quickly enough.

A decade later I am able to write this software using browser technology as plain text without the need for build tools, special libraries or any hacks.

**Caveat:** it's important to point out that not all these APIs work in all browsers. What's important to me was that I could write this software for myself and this post is meant to share what's possible today.

## The parts

To create a persistent picture frame, I would need the following technology available in the browser:

- Fullscreen - all browser element hidden so the focus is entirely on the photo: `element.requestFullscreen()`
- Filling the screen - the photo should take up the full space on the screen, ideally leaving no edges visit: `object-fit: cover`
- Orientating itself - the screen should automatically rotate to the orientation of the photo, i.e. a landscape photo should rotate the screen to landscape: `screen.orientation.lock()` ([limited support](https://caniuse.com/mdn-api_screenorientation_lock))
- I can pick a photo from either my camera or my photos collection - `input[type="file"][accept="image/*"]`
- The screen doesn't sleep - `navigator.wakeLock` ([limited support](https://caniuse.com/wake-lock))
- I don't need a working internet connection - `event.respondWith(cache)`
- Installed to my homescreen - service worker + `manifest.webmanifest` + `display: standalone`

