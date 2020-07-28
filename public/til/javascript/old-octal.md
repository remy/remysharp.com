# Old (way) Octal

JavaScript has lots of numerical type support, my usual default is decimal.

Then with a lot of the byte mangling work I do, I use hex a lot, so things like `0x80` give me a little more information than just `128` because it tells me that the MSB is on when all others are off.

This works well with binary too (which frankly looks weird in JavaScript): `0b10000000`.

Octal is knocking around in JavaScript, `0o40` (which is 32 - and no, I'm never quite sure when to use octal), but, TIL, octal has an "old format" in JavaScript: `040`. Yep, _just_ slap a `0` on the front and you get a different base 😱

Via [Martin Kleppe](https://twitter.com/aemkei/status/1286030684658769920)

*[MSB]: Most significant bit
*[TIL]: Today I learnt
