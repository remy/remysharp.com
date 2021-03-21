# On Layer 1,1 enhanced ULA mode

If you want control of the `PAPER` colour, you'll need to use `PALETTE FORMAT` _and_ `LAYER PALETTE` - read on:

With `LAYER 1,1`:

- To make use of the fuller colour set, you need to enable _"Enhanced ULA functionality_" which is achieved using the `PALETTE FORMAT n` routine.
- The `PALETTE FORMAT n` value is allowed 255, 127, 63, 31, 15, 7, 3, 1 and 0. The pattern here is 255 shifted right.
- To then select a colour for the layer, the `LAYER PALETTE 0, i, v` routine is used (or a palette can be loaded with `LAYER PALETTE 0 BANK n, i`).
- The maximum number of `INK` is dictated by the `PALETTE FORMAT 255`, and in this case calling `INK 255` is legal. If the palette were formatted to `127`, calling `INK 255` would result in a `K Invalid Colour` exception.
- `PAPER` is limited. Essentially it supports `256 / (palette format+1)` colours. So if you call `PALETTE FORMAT 255`, you get one paper colour (and 255 inks). If you `PALETTE FORMAT 63`, you get four paper colours. This is because paper is using the MSB, and with 64 inks available (colour is zero indexed), the top 2 bits of the byte are available so `0b00` (0), `0b01` (1), `0b10` (2) and `0b11` (3).
- The paper value from 0 onwards is taken from palette index 128. So you can change the paper colour by doing `LAYER PALETTE 0, 128, 0` to set `PAPER 0` to black, **or with `PALETTE FORMAT 63 : LAYER PALETTE 0, 129, 292 : PAPER 1` sets the paper to grey**.

So if you want 64 paper colours, you can use `PALETTE FORMAT 1`

`PALETTE FORMAT 1` gets you 1 paper - so only `PAPER 0` is legal, and all else fails. 127 gets you 2 paper. 63, 4 papers, and so on. Paper is using the MSB and the ink is using the LSBs.

_(MSB = most significant bits (LSB = least), i.e. when you have `PALETTE FORMAT 127` then that's 1 bit that's unused (the MSB - as the far left bit is the 128 value bit), so that MSB is used for two states: on and off, so you get 2 `PAPER` colours with `PALETTE FORMAT 127`)_
