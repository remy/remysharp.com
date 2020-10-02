---
title: When magenta isn't magenta
tags:
  - web
date: 2020-10-02
---

# When magenta isn't magenta

Posting this mostly to help some future developer if they run into this issue or even myself after falling down a rabbit hole only to come up empty.

The short version: what are colours anyway 🤷‍♀

<!--more-->

On the side I've been working on some tools to help with graphic imports into my ZX Spectrum Next. The original Spectrum had a 4 bit colour palette (practically this meant 15 colours - 16 actually, but it was light black and dark black which was…black). The one colour of interest is magenta.

From what I can tell from other developers, magenta is generally used as a transparent key for when there's no alpha transparency support. i.e. When you're working with anything less than and including 24 bit colours, you have to pick a specific colour to act as transparent to layer up your graphics. With a lot of the 8bit bitmap files I've seen, the magenta colour is used to act as transparent.

What this means from a byte-by-byte perspective is that the palette index includes magenta. The bitmap palette index structure sits at byte offset 54, and for an 8 bit bitmap then follows the palette as 256 sets of 4 bytes. The 4 bytes are: blue, green, red and "reserved" (normally 0).

So, when I look inside an 8bit bitmap that uses magenta, I'll find `FF 00 FF 00` - which translates to `#FF00FF` - magenta.

This is when things get weird.

If you take some code to load an image in JavaScript and paint that image into a canvas, you can then get the RGB values back out:

```js
const img = new Image();
img.onload = () => {
  document.body.appendChild(img);
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

  // collect the top left pixel's rgba channels
  const [r, g, b, a] = imageData.data;
};
img.url = urlToImage;
```

On a Windows machine, on Chrome, Edge (yeah, same thing as Chrome…) _and_ Firefox, inspecting an 8bit bitmap with magenta in the top left _correctly_ reads the RGB as 255, 0, 255.

The Mac is a different story. On my own machine the numbers are wrong, but I also ran a [half-cocked survey on Twitter](https://twitter.com/rem/status/1312021153276362755) and from non-Firefox it's always fine. Then it's _sometimes_ okay on Mac Firefox, and then it's not.

On my Mac, magenta (from an 8bit indexed bitmap) turns up as 255, 1, 251, which is #FF01FB which is pretty damn close, but not close enough if you rely on the pixel data being accurate.

I collected some of the variations from the replies I got on twitter and you can get a bit of an idea of how it looks below. The left side is the reference colour, supposedly pure magenta #FF00FF and on the right are the RGB values from different Firefox browsers (mostly on a Mac, though there was a result from Ubuntu):

![Comparisons of magenta on Firefox, they range slightly differently](/images/magenta.png)

What's more interesting is that when I run a colour picker/eye dropper over the image above, nowhere does it report the magenta values as I entered them - but there, I believe, the colour profile of the screen is coming into play.

## In practice

What does this mean? Well, if you happen to be looking for a specific colour value **and** you're working with indexed bitmap **and** you support Firefox (which, not sure why you wouldn't), then you need to be wary that the colour isn't going to render perfectly (yes, this is also a convoluted bug report).

If you, like me, needed to be exact about the palette, you could detect the bitmap and manually parse the byte data. The bitmap format is not too complicated (compared to today's modern formats), and you'll find the the correct colour in the palette index. You could, if you were really determined, then generate a simple PNG from the raw bitmap data (I'm sure it's possible, I'd personally be looking for libraries to do the work for me though).

Ultimately though, colour is a weird thing. My son asks me who decided magenta was called magenta, and surely there's no universal source of truth on the matter. Monitor colour profiles affect how pixels are painted on the screen and external light affects how the magenta light his our eyes.

And then I'm left with the question: if it's dark, and I can't see light, is magenta still magenta, if there's no light to reflect the colour? What is even colour?
