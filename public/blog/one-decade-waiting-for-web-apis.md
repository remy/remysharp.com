---
title: One decade waiting for web APIs
tags:
- web
- code
date: "2022-06-13 12:00:00"
---

# One decade waiting for web APIs

In the last couple of years (rather slowed by the pandemic), a number of new browser APIs have started to land that I had wanted over a decade ago. That's not to say that the process is slow, more that the technology simply didn't exist a 10 years ago, and now the APIs exist, it took me a matter of hours to build the small bit of software I so desperately needed back then.

<!--more-->

## What I needed

In August 2010, a personal tragedy struck. If you know my story, you'll know what this is (and in fact it's critical to how much I needed the right technology). The night I arrived home and I lay in bed trying to sleep, or rather become unconscious so I didn't need to face reality.

I brought up a photo that had been taken that day that I **needed** to burn into my memory.

I did this using my phone propped up and the photos app to bring up the photo. The problem was that my phone kept dimming the screen, and eventually turning it off.

I know this is typically the best practice for a device to follow (to avoid screen burn), but at this particular point in time I needed the picture to remain on. I needed it to be the first thing I saw when I opened my eyes.

There wasn't an app I knew of and getting a photo printed (though it's what we did as soon as we could) didn't give me the photo quickly enough.

A decade later I am able to write this software using browser technology as plain text without the need for build tools, special libraries or any hacks.

**Caveat:** it's important to point out that not all these APIs work in all browsers. What's important to me was that I could write this software for myself and this post is meant to share what's possible today.

## The criteria

I wanted a web app that could load any photo off my phone, work without an internet connection (if required) and then put the photo on the screen, using all the available space and _without_ turning the screen off.

## The parts

To create a persistent picture frame, I would need the following technology available in the browser:

- I can pick a photo from either my camera or my photos collection - `input[type="file"][accept="image/*"]`
- Fullscreen - all browser element hidden so the focus is entirely on the photo: `element.requestFullscreen()`
- Filling the screen - the photo should take up the full space on the screen, ideally leaving no edges visit: `object-fit: cover`
- Orientating itself - the screen should automatically rotate to the orientation of the photo, i.e. a landscape photo should rotate the screen to landscape: `screen.orientation.lock()` ([limited support](https://caniuse.com/mdn-api_screenorientation_lock))
- The screen doesn't sleep - `navigator.wakeLock` ([limited support](https://caniuse.com/wake-lock))
- I don't need a working internet connection - `event.respondWith(cache)`
- Installed to my home screen - service worker + `manifest.webmanifest` + `display: standalone`

Again, I wanted to do this without the need for libraries and without the need for build tools.

## The HTML

Besides general decorative and instructional markup, the few important bits that I needed were:

```html
<link rel="manifest" href="/manifest.webmanifest">
<input id="file" type="file" accept="image/*">
```

Obviously I'm going to be adding script tags, but the above two tags give me the setup for a PWA and the `input` tag gives me a file picture that's going to filter to images.

## The JavaScript

Due to how permissions work that require "user gestures" there's a two-tap process to actually getting the image to render. The first is to pick the image, the second is to launch to full screen and to handle any screen rotation and finally setting the wake lock.

### 1. Getting the file as an image url

When the `input[type=file]` has it's `change` event firing, it means the visitor has selected an image and we're ready to go to work.

To get a URL that I can put into an image tag, I need to read the `target.result` into a `Blob` and then create a URL to that blob.

```js
input.addEventListener('change', async (e) => {
  // new FileReader gives us a way to convert to file
  // formats, but specifically an ArrayBuffer
  const fileReader = new FileReader();
  fileReader.onloadend = function (e) {
    // now we have an ArrayBuffer, we can make this
    // into a blob
    const blob = new Blob([e.target.result], {
      type: 'image/png',
    });

    // and now a URL
    url = URL.createObjectURL(blob);

    // after which we'll change the button so we
    // can show the visitor the "start" button
    input.parentNode.hidden = true;
    start.hidden = false;
  };
  fileReader.readAsArrayBuffer(e.target.files[0]);
});
```

Now that I have a URL to the image, it's ready to be rendered, but first I need the screen setup.

### 2. Trigger all the "user gestured" tasks

As the title says, to go full screen, and to lock the orientation _and_ to request a wake lock, this must be done via a "user gesture" - that's to say, I can't just trigger a wake lock with you having requested _something_ first.

_Though, funnily enough, [Henrik Joreteg](https://joreteg.com/) wrote a [polyfill for wake lock](https://github.com/HenrikJoreteg/wakelock-lazy-polyfill) that works rather well and by it's nature does not require user permission!_

What follows is an abbreviated version of the actual code used (specifically I'm skipping some of the more verbose checking I would do for brevity of this post):

```js
// when "start" is clicked, now we:

// set the entire document to full screen.
await document.documentElement.requestFullscreen();

// request a wake lock (usually wrapped in try/catch)
await navigator.wakeLock.request('screen');

// now create a new image to load our `url` into,
// but creating an image we'll wait until it's loaded
// to then read the dimensions and work out what
// orientation to lock the screen in too.
const i = new Image();
i.onload = async () => {
  // read the current screen orientation
  let { type } = screen.orientation;
  const currentType = type;

  const portrait = type.startsWith('portrait');

  // if we need to change to portrait
  if (i.width < i.height && !type) {
    type = 'portrait';
  // else if we need to change to landscape
  } else if (i.width > i.height && type) {
    type = 'landscape';
  }

  // now lock the orientation
  await screen.orientation.lock(type);

  // finally add the image to the document, note that
  // CSS will also have this fill the element using
  // img { object-fit: cover; width: 100%; height: 100% }
  document.body.append(i);
}

// now that the `onload` is set up - actually load the image:
i.url = url; // url = the blob from the previous function
```

And that's it. There's really nothing more to the software than that. No build process and it all works in the browser exactly as I needed.

Here it is, a simple PWA:

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/earzWSjoRy8?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The full source code is [available on GitHub](https://github.com/remy/phrame), and you can try the demo (again, this is chrome only for the time being for reasons I explained before) here: https://phrame.isthe.link (ignore the stupid name!).

## Bits that still don't quite work

Here's an unordered list of things I've noticed that are a bit…weird:

- If the phone's screen is turned off and on again, the orientation lock changes from landscape to portrait
- On a desktop, when it launches into full screen, it needs me to click the page before the image is shown
- I can't actually launch the fullscreen mode after the visitor as selected the photo - it needs a further gesture. You might think I could go fullscreen first but using the `input[type=file]` I can't trigger a click (without fullscreen going batty), and I can't use the [`window.showOpenFilePicker()`](https://web.dev/file-system-access/) because it's not supported on mobile (yet).
