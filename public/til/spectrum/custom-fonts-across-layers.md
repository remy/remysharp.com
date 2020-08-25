# Custom fonts across layers

Custom fonts on the Spectrum require loading a font file (768 bytes of 8x8 bit data - 96 characters from 0x20 to 0x80) but it's reasonably straight forward:

```nextbasic
LOAD "font.bin" CODE 64000
POKE 23607,249
```

But this works on the "regular" ULA layer - to make this work on layer 1 or layer 2, you need some magic:

```nextbasic
PRINT CHR$ 2;
```

Note that the semi-colon at the end of the statement ensures that there's no extra carriage returns printed to the screen.

Explained [here](https://www.facebook.com/groups/ZXNextBasic/?post_id=834716357054705) by Gary Lancaster, author of NextBASIC:

> You can replace the standard font for LAYER 0 by loading a standard 768-byte character set into memory and using:
> DPOKE 23606,address-256
>
> This can then be used to replace the standard 8-bit font for all other layers with:
>
> PRINT CHR\$ 2
>
> And, if desired, you can generate the other sizes (3- to 7-bit) from this with:
>
> PRINT CHR\$ 3
>
> (You must be in LAYER 1 or LAYER 2 for these two commands to take effect).

The 256 offset is because the first character in the font is a space, set at ascii 32, and the glyphs are 8 bytes, so 32\*8 = 256 offset.

There's a better explanation of the [256 offset here](https://spectrumcomputing.co.uk/forums/viewtopic.php?p=29248#p29248) and setting the 16bit address.
