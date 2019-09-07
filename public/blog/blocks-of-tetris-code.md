---
title: "Blocks of Tetris code"
tags:
- code
date: "2019-09-10 11:00:00"
draft: true
---

# Blocks of Tetris code

In one of [my Twitch](https://www.twitch.tv/remysharp) hour sessions I decided to _attempt_ to build a Tetris clone inspired by news that Tetris turned 35 years old in June 2019. Given it was an hour of coding the game was far from complete but I had the shapes and I had dropping blocks and with around 4 more (offline) hours, I had a fully working clone of the original _NES_ Tetris game.

I wanted to share some of the (array based) development highlights and tricks I used to make the game work.

<!--more-->

## Research

Originally I decided to just eyeball how Tetris worked and replicated what I remembered from playing the Gameboy version when I was a kid. After the twitch session was over, I decided some reading would be useful to get a clear idea of how the blocks rotated, what the timing increases were (as the speed increases on each block of 10 rows cleared) and various other insights.

There's a [wiki for Tetris](https://tetris.fandom.com/wiki/Tetris_Wiki) gaming, but it's mostly based on the [official guidelines](https://tetris.fandom.com/wiki/Tetris_Guideline) that The Tetris Company (TTC) itself has published, and these are based on the 2001 (and onward) version of Tetris - which I didn't want. I wanted the old school original game play (again, since it was all I had ever played).

Thankfully, someone has [painstakingly disassembled the NES cartridge code and documented](https://meatfighter.com/nintendotetrisai/) exactly how Tetris worked so that they could build a Tetris AI. From this, I was able to extract details I wanted about game play, block rotation, block selection and the random function used and timings.

## Representing game memory

The game itself plays out on an HTML5 canvas (which I believe to the best suited tech for this particular job) but in my Twitch coding attempt I tried to detect collision from the canvas itself (when the block bumps into a used pixel). This didn't scale at all and quickly became a headache.

Since the game is so clearly defined as a 10x20 it made sense to quickly move to representing memory in an array of some sort. As the blocks themselves can be represented by a single value a typed array is a good fit. In my typed array, I can choose to either store `0` and `1` for available and unavailable, or I could use the numeric value of the block letter (tetrominoes are named as T, L, J, S, Z, O).

Either way, initialising memory is simple and in fact resetting the game benefits from the `.fill` method:

```js
const ROWS = 20;
const COLS = 10;

const memory = new Uint8Array(ROWS * COLS);
const reset = () => memory.fill(0);
```

In addition to the memory array, for debugging, I also copy the state of the memory into another array so I can page back and forwards through the current state of memory to ensure game play worked as I intended.

## Tetromino rotation

Remembering that my memory is stored as a linear array it means I'll store my representations of tetrominoes in the same way.

Using bitwise operations allows for a "simple" block rotation. I say simple, because it's a single operation against a single predetermined number. It's useful to also understand how XOR operations work.

If you have a value such as `9`, in binary (prefixed with `0b`) is `0b1001`. Let's look at how xor works:

```js
// 9 in binary is
1 0 0 1

// where a 1 appears, it will flip the bit in that position,
// so the XOR operand we use is
1 0 1 0

// So 0b1001 (decimal 9) ^ (xor) 0b1010 (decimal 10)
   1 0 0 1
^  1 0 1 0
   -------
=  0 0 1 1 // decimal 3

// importantly the same XOR operand can be used to flip
// 3 _back_ to 9:
   0 0 1 1
^  1 0 1 0
   -------
=  1 0 0 1 // decimal 9
```

Here's how the T shaped tetromino goes:

```js
// using 0 for empty and 1 for filled, the T tetromino can be
// represented in a 9 element array, where I've added wrapping
// to make it easier to visualise
0 0 0
1 1 1
0 1 0

// which is the binary representation
0b000111010 === 58

// now applying an XOR operation we're able to flip bits
0b000111010 ^
0b010100000 ===
0b010011010

// and that binary, in a 3x3 square is
0 1 0
0 1 1
0 1 0
```

This whole process makes rotating the blocks very simple in the code, and simple to represent. However, this process only works to rotate the shape in a single direction, it can't be used to do 180 degree rotation. I could use another xor value (the T tetromino's rotation is `160`), but what also works if the value is reversed.

Using a reverse on the tetromino rotates my shape 180 degrees:

```js
// the start position for the T block is
0 0 0
1 1 1
0 1 0

// which is actually
0 0 0 1 1 1 0 1 0

// which reversed is
0 1 0 1 1 1 0 0 0

// and now wrapped into 3x3 square
0 1 0
1 1 1
0 0 0
```

To complete 270 degree rotation is a combination of the xor and the reverse method. There might be an easier way to do this, but it worked for my purposes.

## Collision testing

As the memory is held in a (relatively) simple array, collision testing - for when the tetromino moves left, right or down - is relatively straight forward. Before allowing the tetromino to move, I test if the memory has anything written to the array in that particular X/Y position that the tetromino wants to move to.

So it's useful to have functions that can translate X/Y to an index in our memory (since the memory is held in a linear fashion):

```js
export const getIndexForXY = (x, y, width = COLS) => {
  if (x < 0) { // too far left
    throw new Error(`out of bounds: x(${x}) < 0`);
  }

  if (x >= COLS) { // too far right
    throw new Error(`out of bounds: x(${x}) > COLS(${COLS})`);
  }

  if (y >= ROWS) { // offscreen at the bottom
    throw new Error(`out of bounds: y(${y}) > ROWS(${ROWS})`);
  }

  // the actual formula
  return width * y + x;
};
```

It's also useful to have the inverse function, to get the X/Y from the index:

```js
export const getXYForIndex = i => {
  const x = i % COLS;
  const y = (i / COLS) | 0;

  return { x, y };
};
```

Then, as I said, it's a matter of [checking the location and the shape](https://github.com/remy/tetrisy/blob/be715b0d6521ee22d02c5aff5c17b8320ef0e5c0/src/memory.js#L97-L118) of the tetromino and making sure the memory is "free" (the value is `0`) for the entire height and width of the shape for the offset `x` and `y`.

## Clearing entire lines

Probably my favourite bit of code in this project was the logic for clearing each line and moving the tetrominoes down. Again, because I'm using an array, the _only_ two methods I need are `copyWithin` and `fill`.

The practical logic is: for the given line number, take all the lines above and push them down by one line.

The actual logic is to use `copyWithin` to copy array elements to the `COLS` index (the start of the second line). The array elements are selected from `0` (the top left) to the index of the _end of the removed line_ (achieved with `getIndexForXY(COLS - 1, y - 1) + 1)`).

<!-- insert drawing -->

Then, fill the top line (from `0` to `COLS`) with zeros:

```js
export const removeLine = y => {
  // copy all the content above down to and over this line
  memory.copyWithin(COLS, 0, getIndexForXY(COLS - 1, y - 1) + 1);

  // clear the top line last
  memory.fill(0, 0, COLS);
};
```


<!--
## Modern development

- Coded in the browser using `import`
- Deployed with a small build script for `nomodule` support

## User experience

- UI attempts to get out of the way
- Web font is limited to 0-9 so it's super small
- Some mangling of touchstart/click (to prevent doubles) -->
