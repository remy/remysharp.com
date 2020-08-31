# NextBASIC new routines switch out the "original" ROM

In trying to blanket copy a block of the Spectrum's ROM using `PEEK$` it turns out that in using `PEEK$` the ROM isn't actually available to be copied.

This was the code:

```nextbasic
REM system font position @ 15616 / 0x3D00
%b=%15616
REM using string peek because it can read variable length
f$= PEEK$ (%b,768)
REM poke the contents into a new location
POKE 64000,f$
REM this should have printed the '!' character
PRINT PEEK 64008
```

This doesn't work because when you use PEEK\$ **a different ROM is paged in** and the memory map changes. So you’ll never be able to do it like this. Indeed this is true for _all_ new NextBASIC routines.
