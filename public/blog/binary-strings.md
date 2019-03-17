---
title: Binary strings…and -1
date: '2017-11-24 11:36:05'
modified: '2017-11-24 12:22:48'
tags:
  - code
published: true
---
# Binary to string…and -1

Working with (quite) a few projects that required binary representations of
data, I wanted to note down the _right_ way to get a binary string. In
particular when handling negative numbers…

<!--more-->

A cheap and easy way of getting a binary string for a number is to use
`toString` using base 2:

```js
const n = 39; // a random int
console.log(n.toString(2));
// => 100111
```

Since my value started as a byte, I'd rather see my binary as 8 bits (although
the value is still good in it's 6 digit form):

```js
const n = 39; // a random int
console.log(n.toString(2).padStart(8, '0'));
// => 00100111
```

The `String.prototype.padStart` is an ES6 method that's pretty handy. There's a
[polyfill](https://cdn.polyfill.io/v2/polyfill.js?features=String.prototype.padStart|always)
that you might need (there's also a version on
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart#Polyfill)).

## Hex too

This same method works for hex too:

```js
const n = 39;
console.log(n.toString(16).padStart(2, '0'));
// => 27
```

I'd usually be inclined to prefix my hex values with `0x` just so it's
completely clear (and binary can/should be `0b`).

## Binary for strings

Strings really aren't a big deal, since I can use the `charCodeAt` method to get
the character representation.

```js
const name = 'Remy';
console.log(
  name.split('').map(n =>
    n
      .charCodeAt(0)
      .toString(2)
      .padStart(8, '0')
  )
);
// => Array (4)[ "01010010", "01100101", "01101101", "01111001" ]
```

## 🚨 Negatives and pandora's box

For most of my projects this earlier simple method worked fine, but it doesn't
fly for negative numbers:

```js
const n = -39; // a random int
console.log(n.toString(2).padStart(8, '0'));
// => 0-100111
```

The string result is completely corrupted. Honestly, I'm not sure what's going
on in the internals of ECMAScript (I'm sure I'll land myself in the spec one day
to learn), but I need to revise my code if the number is going to be correct.

My first run at solving this was to use a bitwise left shift and cycle through
the entire byte length and test the value against a binary `and` operator. In
code (since I'm not sure that sentence is entirely clear!):

```js
const toBinary = n => {
  return Array.from({ length: 8 }, (_, i) => {
    return ((n << i) & 128) === 128 ? 1 : 0;
  }).join('');
};

console.log(toBinary(-39));
// => 11011001
```

A note about 128: in the 8 bit value, 128 is the Most Significant Bit (MSb), as
I'm shifting left, and forward through our bits, my code keeps checking the
<abbr title="Most Significant Bit">MSb</abbr>. In the following screenshot I've
shown how the number is tested against each index and the final binary string
value is calculated (the MSb highlighted in grey in the screenshot):

[![-39 in binary](/images/negative-39.gif)](https://bitcalc.isthe.link)

To test this value is correct, I'll put this binary value into an `Int8Array`
and test the decimal value is -39:

```js
console.log(new Int8Array([0b11011001]));
// => Int8Array (1)[ -39 ]
```

But here's where pandora's box opens up. This is binary for -39 **in an 8 bit
integer**. This is _not_ -39 in a 16 bit integer (that binary value as a 16 bit
in results in 217). So it's important that I consider the _type_ that I'm
working with (equally my earlier `toString` example didn't consider anything
other than 8 bit values).

So it's important to consider exactly the value type when this function is
called. The first limitation in this code is the number of bits returned is hard
coded to `8` values. There's also a killer bug in my code! If I try to get -1
for a 32 bit signed integer, my function returns 0 (or more precisely: 32
zeros!).

The problem comes from when -1 is shifted left by the
<abbr title="Most Significant Bit">MSb</abbr> for a 32 bit value: 2,147,483,648
(which, as numbers go, is full of
[fun facts](https://en.m.wikipedia.org/wiki/2,147,483,647)).

## Final version: shifting to the right

The answer is to shift to the <abbr title="Least Significant Bit">LSb</abbr>,
but this puts the actual bit order in reverse. So, when negative, the result is
shifted right using the LSb (`1` in all cases), reversed and returned.

Using the right shift avoids the overflow issue that would trigger with the 32
bit signed int.

```js
const toBinary = (n, size = 8) => {
  if (n < 0) {
    return Array.from({ length: size }, (_, i) => {
      return ((n >> i) & 1) === 1 ? 1 : 0;
    })
      .reverse()
      .join('');
  }
  return n.toString(2).padStart(size, 0);
};

// --- tests ----

// 8 bit signed int
console.assert(-39 === new Int8Array([parseInt(toBinary(-39), 2)])[0]);
// 32 bit signed int
console.assert(-1 === new Int8Array([parseInt(toBinary(-1, 32), 2)])[0]);
// this is only reached if the tests are good
console.log('tests passed');
```

[Demo](https://jsbin.com/fezevey/edit?js,console)

In JavaScript, it's a highly dynamic language. Some people don't like that about
JavaScript. I kinda like it. It throws some fun challenges every now and then.
