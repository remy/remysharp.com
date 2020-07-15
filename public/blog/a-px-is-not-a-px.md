---
title: A px is not a px
tags:
  - web
date: 2020-07-15
---

# A px is not a px

Recently I was trying to extract some glyphs from some various fonts and in doing so I had a fundamental assumption challenged and dispelled.

A `px` in terms of fonts, is not a pixel. Or certainly not in the way I was using them.

<!--more-->

For as long as I can remember I've used `px` for my CSS fonts. I tried with `em`s and usually ran into some sizing issues (better devs than me know how to use them properly). I had a lot of success with `rem`s (not only because clearly they're named after yours truly…not), but if you asked me yesterday how to a make a font sized at 16 pixels, I'd have said 'font-size: 16px`.

If I'm honest, it's close enough and when a font size isn't _quite_ right, I adjust. I tweak the font size, I tweak the line height, I tweak margins and padding until it looks right.

From a fully technical and exact perspective though, I didn't know what I was talking about!

## When I realised

I was trying to render tiny fonts, no larger than 8 pixels wide into a canvas, and extract the pixel data (for a ZX Spectrum project). So I unwittingly set the font size in the 2D drawing API to `8px` and ran the `fillText` method only to be faced with text that either didn't fit in the 8x8 square or was way too small.

I _thought_ (incorrectly) that `8px` meant the font would be 8 pixels tall. So utterly wrong.

This is also compounded by the fact that when you draw on a canvas, you need to specify the X and Y coordinate of the baseline - the specification suggests X/Y is the top left corner, but this isn't the case as drawing text in a canvas draws _upwards_ so with `x:0, y:0` you get nearly completely clipped text.

So I would have hoped the way to get the text to render on the canvas would be to add the pixel height of the font: `x:0, y:8` but as we already know, the height of the font isn't 8 pixels.

## What makes the height of a font?

I won't pretend to fully understand it (yet) but there's an [excellent breakdown post by Vincent De Oliveira](https://iamvdo.me/en/blog/css-font-metrics-line-height-and-vertical-align) that examines how to align 100px to a font height and how it breaks up. The practical example that De Oliverira gets into is if they want to place a checkbox image aligned with the text. It's not as easy as it might first sound.

Also, more practically, there is the [Capsize](https://seek-oss.github.io/capsize/) project that allows you to upload a font or select an existing Google font, and the page will read in the metadata about the font and help you adjust values to get the height of the font to best suit your needs.

**As it turns out, in a lot of cases, when I'm thinking of the _height_ of a font, I'm actually thinking about the height of a capital letter, which is the ascender in font metrics.**

## Bits of a font

In my side projects I spend a lot of time looking at binary data and parsing it in JavaScript so it made sense that I should poke around in the font to see if I could find these values myself.

Thus far I've only looked at TrueType fonts. The font file is structured as so:

1. Header (12 bytes) - which includes the font file signature and directly after includes the 32bit table count
2. Array of tables - each table includes: tag name (4 characters padded), checksum, file offset and length

With these small bits of information we will have an array of all the font tables that are included in the file. The tables of interests are required in the file format (according to [Apple's documentation](https://developer.apple.com/fonts//TrueType-Reference-Manual/RM06/Chap6.html#Overview)) and I want to look inside the tables: `OS/2`, `hhea` and `head`.

These tables can appear in any order in the file and have variable length - both depending on the tag name but also the version of the table.

To extract the information out of the file, first the file is uploaded into the browser and using the `FileReader` API I'll get an `ArrayBuffer` of the bytes:

```js
input.onchange = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    // do something with the buffer
    handleData(event.target.result);
  };
  reader.readAsArrayBuffer(file);
};
```

For instance, to extract the capital height, I can create a view on the buffer and extract the 16bit value I need:

```js
function handleData(buffer) {
  const view = new DataView(buffer);
  const tableCount = view.getUint16(5, true);

  let capitalHeight = null;

  // use a decoder to read the tag 4 character field
  const decoder = new TextDecoder();

  let ptr = 12; // where the header ends
  for (let i = 0; i < tableCount; i++) {
    // the tag is 4 characters long
    const tag = decoder.decode(data.slice(ptr, ptr + 4));

    // `offset` is where we find the table data in the file
    const offset = view.getUint32(ptr + 8);

    if (tag === 'OS/2') {
      // cap height sits 88 bytes from the start of the header
      capitalHeight = view.getInt16(offset + 88) / 1000;
    }

    // table headers are 16 bytes long
    ptr += 16;
  }
}
```

Now I can use the `capitalHeight` as I feel fit and all in the browser if I wanted to do work dynamically.

In practice, if the aim is to align text, then it makes sense to collect the font metric data ahead of time with a tool like [Capsize](https://seek-oss.github.io/capsize/) or if that resource ever disappears I've extended the code I wrote earlier to a barebones [TTF metrics extraction](https://font-size.isthe.link/) tool.
