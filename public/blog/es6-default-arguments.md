---
image: /images/es6-defaults.png
title: 'ES6: Default arguments'
date: '2017-10-25 14:15:51'
modified: '2017-10-25 14:14:41'
tags:
  - code
published: true
---
# ES6: Default arguments

Default arguments in ES6, put simply: I'm a huge fan.

I wanted to document a few of the ways I use default args and how they've made my old ES5 workarounds go away in favour of a much more elegant code design.

<!--more-->

## The backets-or

Here's my original function. It takes an argument for the DOM node to append a child node to, but if it's omitted (because `target` is optional), then it'll be inserted into the body. I've wrapped the optional element in bracket, and used `||` (or) to use the body element if `target` is undefined.

```js
function show(target) {
  const canvas = document.createElement('canvas');
  (target || document.body).appendChild(canvas);
  // <snipped-code>
}
```

Instead with default args, much more elegant:

```js
function show(target = document.body) {
  const canvas = document.createElement('canvas');
  target.appendChild(canvas);
  // <snipped-code>
}
```

Elegant because it immediately shows:

1. the reader what the default is if `target` is omitted.
2. `target` *can* be omitted.
3. what type the target should be.
4. avoids the ugly `(x || default)` statement which could look a bit weird anyway.

## Defaults from other arguments

When combining defaults with defaults that (optionally) rely on another argument, the code can get unnecessarily hairy (this example is rather tame to some of my older code!):

```js
function crop(source, width, height) {
  if (width === undefined) {
    width = 200;
  }

  if (height === undefined) {
    height = width;
  }

  // => 200, 200 when called with `crop()`
  console.log(width, height);

  // <snipped-cropping-code>
}
```

By using the argument defaults, the width is easily defaulted to `200`, and since the `width` is defined first, the `height` argument can rely on the `width` argument. This makes for quite a nice pattern, so long as you're careful about the order that you declare the variables:

```js
function crop(source, width = 200, height = width) {
  console.log(width, height); // => 200, 200
  // <snipped-cropping-code>
}
```

## Argument validation

Argument defaults can also be used for some enforced argument validation, although it only checks for presence rather than correct types (which may arguably have more use).

```js
function required(what) {
  throw new Error(`Param ${what} is required`);
}

function createUser({
  username = required('username'),
  password = required('password'),
}) {
  // <snipped-sign-in>
}
```

Although this same code could go inside the function, it does leave the argument checking in the place that arguments are slurped up, and leaves the function body for doing only what it intends to do.

Note that I've also used object destructuring in my `createUser` function, which means that the _order_ of the arguments is no longer important - which I personally think is pretty useful when there's a number of arguments all pertaining to the same model.


## Initialising during destructuring

This one isn't technically a default argument…I don't think, but it looks awfully similar, and it's useful in the same manner. Below I have a `blogPost` object with a number of properties and `status` is optional and if omitted needs to be set to `DRAFT`. Using this syntax makes the default easily readable:

```js
const { title, description, status = 'DRAFT' } = blogPost;
```

## Overboard…

You can of course go utterly overboard, and I'd consider the following change an anti-pattern:

```js
function imageToPixels(img, scale) {
  const ctx = imageToCanvas(img, scale);
  return ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
}
```

Changed to:

```js
const imageToPixels = (img, scale, ctx = imageToCanvas(img, scale)) =>
  ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height));
```

## What inspired this post

I've been meaning to write up some of my usage of argument defaults as I remember having them in my Perl days (late 90s, early 2000s) and always missed them as I used JavaScript.

Just today I wrote the following line of code:

```js
let [{ ink: paper }, { ink } = { ink: 0 }] = Array.from(inks)
  .map((count, ink) => ({ ink, count }))
  .filter(({ count }) => count)
  .sort((a, b) => a.count - b.count)
  .slice(-2);
```

This code does a number of things, only to then utterly exploit defaults and destructuring! A quick summary: turn `inks` from a `UInt8Array` into an `Array` so when I `map` it doesn't get cast back into a `uint_8`. I'm mapping the array into a two property array (`ink` is the value I need, and `count` is the occurrences). Then filter and sort by those having a count, and `slice` to return an array whose length is 2 (or less).

The resulting array is capture and destructured into two objects, that are also destructured collecting the `ink` property. The first is renamed to `paper` (which would be the 2nd most popular ink colour) and the second item is captured as ink, but before we're done, it's possible the `slice(-2)` returned an array length of 1, so I need to provide a default which sets the `ink` value to 0. Fancy. Possibly a bit obtuse. But I like it :-)
