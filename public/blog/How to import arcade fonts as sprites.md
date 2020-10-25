---
title: 'How to import arcade fonts as sprites [spectrum]'
date: 2020-10-25
tags:
  - spectrum
---

# How to import arcade fonts as sprites

Here's a quick tutorial on how to add custom arcade fonts into a ZX Spectrum Next game - either using NextBASIC or assembly.

<!--more-->

## Steps

1. Visit http://arcade.photonstorm.com - select your font from the dropdown.
2. Still on the font web site, type out the letters you want, or if you're comfortable, open the browser's devtools console and run the the following code in the console:

```js
Array.from({ length: 59 }, (_, i) => 0x20 + i).map(_ => String.fromCharCode(_)).forEach(k => window.keyPress(k));
```

3. This will generate all the letters in the Spectrum character set - adjust as you feel fit, but this will map nicely to the `CODE "a"` NextBASIC routine.
4. Zoom out the font to fairly small - you want either 16 pixels high or 8 pixels, you might need to try a few times to get it right, then hit "save" to download.
5. Visit https://zx.remysharp.com/sprites/#importer
6. Drag your `arcade-font-writer.png` into the import canvas window.
7. Align the viewfinder over the first character (I find this easier to align over a whole letter or the # symbol, then use shift+right to move to the first character)
8. In the "Auto repeat import" section, set the width to 59 (if you have 59 character, or the number of characters you have)
9. Click "Copy in" and then "Download spritesheet"

![](/images/import-view-finder.png)

## Using in NextBASIC

You can use this spritesheet as either individual sprites or as tiles (which keeps your sprites free for more interactive use).

This example code will let me render any character using the `Tile` features.

First I need to load up the sprite sheet which I'll store in `BANK 15` and I'll use `BANK 16` for the tiling process:

```nextbasic
#autoline 10

LAYER 2,1
LOAD "font.spr" BANK 15
TILE DIM 16,0,59,8 :; change this to 16 if you selected a 16x16 font
TILE BANK 15
```

Now two routines, one to write characters (using the `TILE` routine) and one to loop through each character to print a line - note that the characters I'm generating exclude the lowercase set, so there's code to adjust appropriately.

```nextbasic
DEFPROC writeLine(l$)
  %x=0
  %l= LEN (l$)
  FOR i=1 TO %l
    PROC writeChar(l$(i))
  NEXT i
  %y=%y+1
ENDPROC

DEFPROC writeChar(c$)
  %i=( CODE c$)-32
  IF %i > 63 THEN %i=%i-32: ; we don't have lowercase, so shift down
  BANK 16 POKE 0,%i
  TILE 1,1 AT 0,0 TO %x,%y
  %x=%x+1
ENDPROC
```

Rolled together you can get some nice fonts draw up. You can also switch this around to use it in a sprite for some scrolling effects too.

![](/images/hello-world-font.png)

[Download all the files for the NextBASIC example](https://gist.github.com/remy/2cedcc5186c6b25bcb68f74c1181eeff)
