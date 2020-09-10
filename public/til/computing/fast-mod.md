# Fast mod

In my work and side projects I make use of bit manipulation and maths. One function I use a great deal is the modulo operator, in JavaScript it's `%`, so if I wanted to know if an X coordinate on an 8x8 tiled grid is in a movable position, I would use `if (x % 8 === 0)`, so when `x` is `192`, the result is `0` and when `x=190` the remainder is `6`.

I've also been looking at 8-bit computers and most (that I've looked at) don't have a machine code for division (nor modulo) so what's going on under the hood is a right shift on a loop until the remainder is found.

I'm not totally sure of the machine code operations that my desktop 64bit CPU has, but I'd argue this "fast mod" is still useful to know.

**Any modulo that is a power of 2 can be refactored to use a bitwise `and`**.

This means if our modulo is 1, 2, 4, 8, 16, 32 and so on, then we can use a bitwise `and` operation to find the remainder. Bitwise operations have a one-to-one relationship with machine code so there's no intermediate step.

So when my modulo is 8, I need to _mask out_ the bit representing the value 8 and keep all the other bits. So that means to test `x=190` I will mask `x` with `0b0111` (remember that I'm masking out the 8 value - the bit in position 4).

To visualise, here are the values in binary:

```text
     190 = 1011 1110
AND    7 = 0000 0111
         = 0000 0110 ∴ 190 % 8 = 6

     192 = 1100 0000
AND    7 = 0000 0111
         = 0000 0000 ∴ 192 % 8 = 0
```

A simpler way to write this is `if (x & 7 === 0)`.

Neat eh?
