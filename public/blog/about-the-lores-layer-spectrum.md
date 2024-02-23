---
title: 'About the LoRes layer 1,0 [spectrum]'
date: 2020-09-18
tags:
  - retro
---

For the most part I use layer 2 (L2) for my projects on the Spectrum Next, so when I wanted to start incorporating layer 1 (L1) there were some surprises waiting for me.

<!--more-->

## Context: Layer 2

Layer 2 is 256x192 pixels with 256 colour support and 2 palettes (with an available colour palette of 512 colours).

The pixel data (values from 0-255 that tell the machine which palette colour to use) take up 49,152 bytes which splits evenly across three 16K blocks. This means that you'll find the pixel data in banks 9-11 (again, by default) if you happen to want to manipulate screen memory (or copy or restore it).

The image below is the default palette and the full 512 colour palette available for layer 2. The grey 1x1 square and 2x1 square in the odd position is the default transparent palette value (index 227).

![](/images/spectrum/l2-colour.png)

The default layer ordering (found in the first edition manual on page 139) is Sprites over Layer 2 over ULA (Layer 1). What this means is if you draw on L1, L2 is going to be above and the use of transparency is going to let you see the L1 underneath.

However, when you select L2 for the first time the screen will be painted with the `PAPER` value for that layer, which by default is white. This will block your L1 contents, so to fix this you can set the paper to `227` and clear the layer:

```nextbasic
10 LAYER 1,0
20 LAYER ERASE 10,10,20,20,1 :; paint a blue box on L1
30 LAYER 2,1
40 PAPER 227 :; set the paper to transparent
50 CLS :; fill the pixels with the paper value and reveal L1
```

However, putting L1 _above_ L2 and revealing it's contents is a little more involved.

## Layer 1

L1 in LoRes mode arranges it's pixels similarly to L2, and that's to say it does _not_ split into 3rds the way the "legacy" spectrum screen data does.

L1 is half resolution of L2 so 128x96 and thusly takes up 12,288 bytes. L1 (and L0) is have two palettes available to them, but importantly the default palette for L1/L0 is arranged in a legacy mode (from what I understand, this ensures compatibility with the previous generation of Spectrum).

The raw screen data can be found in bank 5, but the data is non-contiguous - which means that the first half of the screen is found at byte range 0-6144 and the second half of the screen is found at 8192-14,336. These are (if I understood correctly) referred to as `DISP_FILE1` and `DISP_FILE2` respectively. I'm not sure how accurate the follow is, but in theory, if bank 5 doesn't get swapped around you can access this directly in memory at 0x4000 and 0x6000 (again, respectively).

I don't know what the remaining 2K in each half is used for, but I do know that erasing (or writing over) these values causes (effectively) a crash (it actually corrupts memory, but the machine is useless at this point).

Below you can see the default palette of 256 colours and you can see that they're arranged in repeating blocks of 15 unique colours (since black and bright black are black):

![](/images/spectrum/l0-colour.png)

If you wanted to put L1 over L2, you would need to use order `2`: _Sprites over ULA (Layer 1) over Layer 2_ (assuming you want sprites on top).

However, the technique of painting 227 won't work because, as you may have noticed above, there's no transparent palette selected. In fact, palette index 227 is magenta (because 227 modulo 16 = 3 and 3 is the non-bright magenta in the default spectrum colour range).

So to clear (or paint transparency) the palette needs adjusting. You could load the default L2 palette into L1 or you can modify the palette value directly which is a lot simpler:

```nextbasic
10 LAYER 1,0
20 LAYER PALETTE 0,227,455
30 CLS
```

Now `CLS` will paint a transparent value and the layer beneath can be seen:

```nextbasic
10 LAYER OVER 2
20 LAYER 2,1
30 LAYER ERASE 10,10,20,20,3 :; paint a blue box on L2
40 LAYER 1,0
50 INK 15: PAPER 227 :; set the paper to transparent
60 LAYER PALETTE 0,227,455
70 CLS :; fill the pixels with the paper value and reveal L2
80 PRINT "Hello" :; prints on L1 over the square
```

## Layer 1 border

If you don't change the palette for layer beyond the transparency at index 227 then setting the border with values 0-7 will behave as you expect. However, if you load a custom palette then you'll likely get unexpected border colours.

The border for L1, from what I can tell, is taken from palette index 16-23. So if you want to make `BORDER 0` black (again), you'd use `LAYER PALETTE 0,16,0` (0 being the palette number, 16 is the offset and last 0 is the black index in the 512 palette).

If you want to view the full 512 colours on the border, you can use this:

```nextbasic
10 FOR %i=0 TO 511
20   LAYER PALETTE 0,16,%i
30   BORDER 0
40   PAUSE 1 :; just slow down a bit
50 NEXT %i
```

You can also use this as a routine to change the colour of the border to match the screen colours you're using (I did this in my [Go Mummy!](https://remysharp.itch.io/go-mummy) game).
