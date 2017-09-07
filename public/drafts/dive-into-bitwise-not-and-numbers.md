# Dive into bitwise not and numbers

Sometimes you want to perform bit operations in JavaScript, and due to it's mutating nature, it's easy to get in a muddle. I recently wanted to run a bitwise `not` on `0FF` (cyan) expecting `F00` (red) and of course that's not what I saw, so I've written up (so I remember) how it works.

<!--more-->

## Bits

Everything is represented computationally as a bit. A bit is a `0` or `1`. Character, for instance, are typically 8 bits. The letter `R` has a decimal value of `82` (via `"R".charCodeAt(0)`), which has a hex value of `0x52` and a binary value of `0b1010010`. Although the binary shows as 7 bits, it's more useful to think of it as 8 bits AKA 1 byte (or certainly in my case).

Note the preceding `0x` means hex, and `0b` means binary (off topic, but octal is `0o`).

So, my (cyan) value of `0x0FF` can be represented as 4 `0`s and two sets of 4 `0`s: `0b000011111111`. Let's look at bitwise not'ing the value.

## Bitwise not

The not operation will invert the binary value (example taken from [MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_NOT)):

|a|NOT a|
|-|-|
|0|1|
|1|0|

In JavaScript this is represented as `~ 0b1` (where `1` is the binary value I want to invert).

Here's when things get hairy. Running `~ 0b1` in JavaScript yields `-2`:

<iframe src="https://jsconsole.com/?~0b1" class="jsconsole" height="130" border=0></iframe>

## What is a number?

In the example above, I expected to see `0` as the result, but I see `-2`. Why is that?

There's a few things going on that are initially misleading. First of all, the result is a decimal, not binary. In all the REPLs I've come across (devtools' console, [jsconsole](https://jsconsole.com), etc) show the results as a `Number` type. Numbers are decimal in JavaScript.

Knowing that numbers are decimal isn't quite enough though. Numbers in JavaScript are [double-precision floating-point](https://en.m.wikipedia.org/wiki/Double-precision_floating-point_format) format occupying 64 bits (or 8 bytes).

If I transform the result to binary, we can get a better idea of what's going on:

<iframe src="https://jsconsole.com/?n%20%3D%20-2%3B%20sign%20%3D%20n%20%3C%200%20%3F%201%20%3A%200%3B%20%28n%20%3E%3E%3E%200%29.toString%282%29.padStart%2864%2C%20sign%29" class="jsconsole" height="130" border=0></iframe>

A quick breakdown:

1. `n >>> 0` is a [zero-fill right](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Unsigned_right_shift) which will (if I understood correctly) drop the sign on the integer which results in a large decimal value (i.e. -1 in binary is all `1` values including the far left sign bit).
2. `Number.toString(2)` sets the radix to base 2 (binary) and returns a string
3. `padStart(64, sign)` uses the ES6 padStart (aka pad left) with the sign bit (if our number was negative, the sign is `1` otherwise `0`) and fills the left part of the string until the length is 64 characters (or to us: 64 bits)

## Why does not 1 equal minus 2?

Now that we have a better understanding of 64 bit numbers, we can see that inverting `0b1` is actually inverting the first 63 zero bits and then the final one bit. Because the sign bit is also flipped, the result is 63 one bits and one zero bit: `-2`.

What we really want is some kind of _clamping_ on our bits. Here we can use typed arrays to help.

## Typed arrays for unsigned bytes

Creating a `new Uint8Array` will give us an array containing 8 unsigned bytes. The _unsigned_ is key getting the not operation to work the way we expect, but importantly, it's 8 _bytes_, not 8 bits. So `0b1` will look like `00000001` and flipping correctly will be `11111110`.

Keeping things simple, I'll create a new typed array with single element containing the `0b1` value from earlier. Now, with this unsigned bit, running the not operation yields the same result in the console, but the stored result is actually as expected:

<iframe class="jsconsole" height="320" src="https://jsconsole.com/?a%20%3D%20new%20Uint8Array%28%5B0b1%5D%29%3B%0Aconsole.log%28a%5B0%5D.toString%282%29.padStart%288%2C%200%29%29%3B%0Aconsole.log%28a%5B0%5D%20%3D%20~a%5B0%5D%29%3B%0Aconsole.log%28a%5B0%5D.toString%282%29.padStart%288%2C%200%29%29%3B"></iframe>

## Flipping #0FF

My original requirements were also hugely flawed. I had hoped to flip red to cyan with the assumption that `#0FF` would flip to `#F00`. I spotted my mistake though. The hex number is `0xFF` (or leading zeros, as with decimal, aren't required), if we pad left, the value is `0x0000FFFF`.

That value isn't red at all. In fact, in most browsers (at time of writing) don't support 8 digit hex values (although apparently Firefox does and so does Chrome Canary). This colour (in 8 digit hex) is blue!

The next job would be to put this value into the typed array, but now the `Unit8Array` is too small. Each array element in the `Uint8Array` can be 8 bits, the value in hex is 32 bits (including the leading zeros). I _could_ switch out to using the `Uint32Array` and repeat the process from eariler, and it would work, but it feels…clunky. To the point where I'm realising that the entire premise was floored.

But now I've learnt all about bitwise not, the answer to my original problem lies in using the bitwise XOR.

## XOR…or: what I should have done

This was a fun dive into understanding the not operator, but if I had really just wanted to flip red to cyan, XOR against `0xFFF` would have been the way.

For `a XOR b`, XOR yields binary `1` if a and b are different, and binary `0` if they're the same. Thus generating an inverted result. So, a bitwise XOR against `0xFFF` will always flip every individual bit, and importantly, it will leave the sign bit alone (i.e. we won't suddenly get negative values).

<iframe src="https://jsconsole.com/?%280x0FF%20%5E%200xFFF%29.toString%2816%29.padStart%283%2C%20%270%27%29" height="130" class="jsconsole"></iframe>

Well, that was fun. I've crawled out of my rabbit hole, and returning to work. I hope it was fun for you too!
