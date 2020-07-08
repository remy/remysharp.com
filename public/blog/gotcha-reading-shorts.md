---
title: 'Gotcha: Reading shorts'
tags:
- code
date: 2020-07-08
image: /images/reading-shorts.jpg
summary: "Just in case you came here to find out what kind of shorts you need to wear for the best reading experience, I'll tell you up front, I'll be talking bits…"
---

# Gotcha: Reading shorts

Just in case you came here to find out what kind of shorts you need to wear for the best reading experience, I'll tell you up front: you'll be disappointed. A [short is a 16 bit integer](https://en.m.wikipedia.org/wiki/Integer_(computer_science)#Common_integral_data_types). Though I think this is just as interesting!

Recently I had a requirement to read a file that contained an array of 16bit values. This means _pairs of bytes_. When we read files in the browser or in Node we get byte (8bit) and the process _should_ be straight forward to view this data as 16bit data, but, as you might guess, it's not.

<!--more-->

## On the web

The web makes it mostly straight forward so long as you're working with files arranged in the same endianness as your own system.

I want to write about endianness (mostly for my own understanding and recollection), but in lieu of that, MDN have a [good article on endianness](https://developer.mozilla.org/en-US/docs/Glossary/Endianness) (TL;DR: defines the byte order, little being the bytes are reversed, which is also the most common format).

To get a 16bit array out of a file, the process is relatively straight forward:

```js
// assuming result is an arrayBuffer, possibly from readAsArrayBuffer
// [1, 2, ...]
result.byteLength // ? 512
const data = new Uint16Array(result);
data.length // ? 256 elements - correct (2 bytes per value)
data[0] // ? first value is 513 (0x0201)
```

However, if your machine is little endian and your file is big endian (not super likely, but still), there's no straight forward way of getting this data so it needs a helping hand:

```js
// result is an arrayBuffer - as above
const view = new DataView(result);
const data = new Uint16Array(result.byteLength/2);
for (let i = 0; i < data.length; i++) {
  data[i] = view.getUint16(i * 2, false); // false = read as big endian
}
data[0] // ? first value is now 258 (0x0102)
```

Though, I still find it odd that the system defaults to little endian and yet `getUint16` defaults to big endian (if the `false` boolean is omitted).

Node is a bit more of a struggle.

## Inside node

When reading a file in Node using the `fs` module, either `readFile` or `readFileSync` you'll get a Node specific `Buffer` back. It extends the `ArrayBuffer` so you can get to the underlying buffer but you can't throw it into a new 16bit array - you need to use some careful code.

I don't fully understand the inner workings, but when you do a `readFile` there's a `poolSize` property that changes has the data sits in the buffer. From the [docs](https://nodejs.org/dist/latest-v14.x/docs/api/buffer.html#buffer_buf_byteoffset):

> …when allocating a buffer smaller than Buffer.poolSize, the buffer doesn't start from a zero offset on the underlying ArrayBuffer.

To see this in action, I can read a file and throw the buffer into a `Uint16Array` and see how wrong it is:

```js
// result is a Buffer object, which contains the same data arrangement
// as our earlier example: [1, 2, ...] an a length of 512 bytes
const bad = new Uint16Array(file.buffer);
bad.length // ? 4096 - 😱wat
bad[0] // ? 8827 (and changes each time I run the code)
```

Clearly not good. This is because there's junk bytes on our buffer, and so we need to makes sure we pick out the data correctly:

```js
const good = new Uint16Array(file.buffer, file.byteOffset, file.length / 2);
good.length // ? 256 👍
good[0] // ? 513 👍
```

Node has a [convenience method for swapping](https://nodejs.org/dist/latest-v14.x/docs/api/buffer.html#buffer_buf_swap16) the endianness of the bytes: `swap16`. Calling this method before loading the buffer into the `Uint16Array` will change the data from little endian (in my current case) to big endian.

So that's how to get 16bit data.
