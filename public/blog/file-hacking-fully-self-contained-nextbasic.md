---
title: 'File hacking: fully self contained NextBASIC [spectrum]'
date: '2021-05-31'
tags:
  - code
  - retro
---

# File hacking: fully self contained NextBASIC [spectrum]

With the new [Spectrum Next](https://www.specnext.com/) computer there's two main modes of distributing (new) games: the `NEX` file format, which "is good for a program that takes over the machine", and the `BAS` file format that "is the native SD-card format for BASIC programs".

There are others that are used, for instance, .snx, but I'm mostly seen these two afore mentioned for new projects.

What's particularly appealing about the `NEX` format is everything is self contained. If I want to distribute a game in this format, it's a single shot file that contains everything it needs to control the computer to make games, etc.

The hard part is that it needs to be compiled (the options are assembly - hard, C - easier, [Boriel's ZXBasic](https://www.boriel.com/pages/the-zx-basic-compiler.html) - actually very low level of entry).

The downside to nearly every* `BAS` format game I've seen is that it comes in a zip that you need to unpack and this has generally a _messy_ feel to it. So, I found a way around that :D

<!--more-->

<small>* _Nearly_ - I've investigated myself and indeed have seen that [Flappy Bird](https://retrobeachman.itch.io/flappybirdzxnext) for the Next can be bundled into a self extracting TAP file. There's one small downside (though not a blocker) that is: the user/player must select the right loader when a TAP file is about to load, and we as the authors (might) need to tell the user which option to select (it's "N" or enter).</small>

## TL;DR

Concatenate your assets to the end of your NextBASIC file then  use `.extract` to pull the asset out from `mygame.bas` into the appropriate bank, using syntax like `.extract game.bas +83454 16384 -mb 16` - which reads as: extract 16,384 bytes (16K) at the offset 83,454 and load it directly into bank 16. I would use this statement, instead of `LOAD "sprites.spr" BANK 16`.

You will need a build command (later in this post), but that's essentially the trick.

## Looking inside

I've been poking around bytes for a good few years now, learning how headers work for different file types and through this I a little about the PLUS3DOS format. This format is really just a header of 128 bytes and the file's contents. This file format is what's used to load NextBASIC files.

Inside the PLUS3DOS header is two length properties: one for the total length, and one for the total length of the body (so `length - 128`).

What I figured was that since the length of the data was in the header, it was super likely that the Spectrum was reading this value, then slurping that length (and nothing more) into memory.

Strictly speaking this isn't quite true, I believe there's some amount of the BASIC right at the end that's used for variable state (when you `SAVE "filespec" it captures some of the variables, but I'm not entirely clear how much). What I can say is that padding this out and making sure I don't rely on some previously saved state for my games ensures that this isn't a factor.

So, as per the TL;DR, because the exact file length of our program is in the header, I'm free to add in some stow away files to my file by concatenating my files together.

For example:

```
txt2bas -i game.txt -o game.bas
cat sprites.spr >> game.bas
```

This is perfectly valid and my `game.bas` will load without issue. The trick, is to then extract the assets back out.

## Extracting assets

Thankfully early distributions of the spectrum next OS ships with a dot command called `.extract`. This is a swiss army knife for hacking bytes up to suit our needs.

Specifically I can use it to extract out slices of my file and put the contents directly into banks. Although it's not entirely clear from the documentation, I can also extract across multiple banks _and_ I can extract into an exact offset inside of a bank. But let's start simple.

The only prerequisites are knowing exactly where the assets start and their length inside of game.bas. For that, I print out the length before appending assets:

```
txt2bas -i game.txt -o game.bas
stat -f %z game.bas # 33232
cat sprites.spr >> game.bas
```

_(Note that I'm using a Mac, so you might need to adjust your tooling to discover the file length of game.bas during the process)_

So now, _after_ the fact, I need to add a load routine in my game.bas that loads the sprites using the extract dot tool:

```
DEFPROC loadAssets()
  .extract game.bas +33232 16384 -mb 16
ENDPROC
```

In some cases I'll have a full screen bitmap that's loaded directly into a LAYER (effectively loading into banks 9-11 in serial).

So instead of this:

```
LAYER 2,1
LOAD "assets/welcome-screen.nxi" LAYER
```

I'll use this:

```
.extract game.bas +100353 49152 -mb 9
```

What's happening in this case is that 48K is being extracted and loaded into bank 9. But 48K doesn't fit, so it overflows to the next bank until we run out of bytes. It happens that banks 9-11 are the layer 2 screen memory and thusly the `welcome-screen.nxi` data is extracted from game.bas and shown on the screen.

If I need to write to a specific point in a bank, then `.extract` can use the linear addressing mode and a bit of maths. Say I want to write 128 bytes from offset 100 in my game.bas to bank 20 at an offset of 50 bytes. The maths is thus: `$bank * 16K + offset => 20 * 16384 + 50 => 327730` or hex `0x50032`. Using `.extract` this is:

```
.extract game.bas +100 128 -ml 0x50032
```

With all these tricks available, what follows is how I've configured this process for my own development process

## A (possible) build process

Since the offsets pointing inside my NextBASIC file are going to be moving during development, I need to have a "dev" mode and a "prod" mode - prod being the one that uses `.extract`.

In my game.bas, I have the following code:

```nextbasic
#autoline 10

TESTING=1 :; this is dynamically remove later on

PROC loadAssets()
PROG gameLoop()

DEFPROC loadAssets()
  ; if the TESTING flag is still in place, we don't both extracting
  IF TESTING THEN PROC testLoadBanks(): ELSE : GO SUB 9900

  ; then some more init
ENDPROC

DEFPROC testLoadBanks()
  LOAD "assets/game.pal" BANK 15
  LOAD "assets/sprites.spr" BANK 16
  ; etc - loading all my assets without needing to "build"
ENDPROC

# now turn off autoline so we can use labeled line numbers for jumping
#autoline

# this section below needs to be generated and then _reinserted_
# every time I want to test the game on hardware or distribute it
9900 .extract game.bas +33280 512 -mb 15 : ; pal
9901 .extract game.bas +33792 1536 -mb 29 : ; font
9902 .extract game.bas +35328 15232 -mb 22 : ; gfx A
9903 .extract game.bas +50560 15232 -mb 23 : ; gfx B
9904 .extract game.bas +65792 16384 -mb 28 : ; gfx C
9905 .extract game.bas +82176 1278 -mb 20 : ; lib
9906 .extract game.bas +83454 16384 -mb 16 : ; sprites
9907 .extract game.bas +99838 515 -mb 24 : ; fx
9909 ON ERROR GO TO 9911
9910 .extract game.bas +100353 572 -o /nextzxos/ayfx.drv : ; ayfx.drv
9990 ON ERROR : RETURN
```

From the code above you'll see that when `TESTING` is true the extract and offsets aren't needed, which allows me to quickly develop and modifying my assets on the fly.

But when I'm testing against hardware, or doing a production test or distributing, I run a build process (below) that concatenates all the files together and spits out a block of NextBASIC code that then gets put _back_ into my NextBASIC and it's then re-compiled. This is because the offsets need to be re-calculated and I won't know what they are until _after_ I've re-built the file. There's padding I add directly after the main game.bas that allows me some small wiggle run to tweak a value here or there without having to repeat the "build, copy, paste, build" loop.

Notice also towards the end of the 9900 block I use the following:

```
.extract game.bas +100353 572 -o /nextzxos/ayfx.drv
```

This is going to extract the [ayfx driver](https://github.com/remy/next-ayfx) directly into the `/nextzxos` directory (where drivers generally live) _but_ only if it doesn't exist already. If there's a file there with the same name, `.extract` will error and I'll have caught the error (line `9909`) and told it to move onto the next line. The point being: I don't want to be destructive when installing.

To generate the extract listing, I use a (not entirely optimal) `Makefile` - of course you don't need to use this yourself, I'm sharing it to give you an idea of how it can be done:

```makefile
INCLUDE_FILES = $(wildcard src/assets/*)
# shortcut command to getting the current file size
FILESIZE = stat -f %z game.bas

# macos flavour of getting file size
SIZE = stat -f %z

# my method to adding up multiple file sizes and getting the sum
SUM = awk '{s+=$$0} END {print s}'

# whenever _any_ of these files change, trigger a build
game.bas: src/game.bas.txt $(INCLUDE_FILES) Makefile
# change the first instance of "TESTING=1" to 0 and _then_ convert to NextBASIC from text
	@cat src/game.bas.txt | sed 's/TESTING=1/TESTING=0/' | txt2bas -o game.bas

# add padding to the nearest 256 edge, i.e. if the file is 200 bytes, it becomes 256, if it's 257, it becomes 512
	@truncate -s %256 game.bas

# beginning of the output to copy back into my basic file
# note the double $$ symbol, this is used to escape the $ so that the file command is:
# echo "9900 .extract game.bas +$(stat -f %z game.bas) $(stat -f %z src/assets/marbles.pal) -mb 15 : ; pal"
	@echo "9900 .extract game.bas +$$($(FILESIZE)) $$($(SIZE) src/assets/marbles.pal) -mb 15 : ; pal"
# then concatenate the specific file to the end of game.bas
	@cat src/assets/marbles.pal >> game.bas

# in this instance all the font files are expected to be loaded into a single bank 29
# so I'll add up the file size of all the font fils, and then concatenate them one by one to game.bas
	@echo "9901 .extract game.bas +$$($(FILESIZE)) $$($(SIZE) src/assets/font*.bin | $(SUM)) -mb 29 : ; font"
	@cat src/assets/font-computing-60s.bin >> game.bas
	@cat src/assets/font-coal.bin >> game.bas

# similar process here where I'm adding 3 individual NXI screen data dumps together and expect
# to find them in bank 22
	@echo "9902 .extract game.bas +$$($(FILESIZE)) $$($(SIZE) src/assets/controls.nxi src/assets/new-game.nxi src/assets/next-level-small.nxi | $(SUM)) -mb 22 : ; gfx A"
	@cat src/assets/controls.nxi >> game.bas
	@cat src/assets/new-game.nxi >> game.bas
	@cat src/assets/next-level-small.nxi >> game.bas

# and so on, until we reach the last statement:
	@echo "9990 ON ERROR: RETURN"

.PHONY: all clean

all: game.bas
```

The above `Makefile` is when I run. It spits out a block of NextBASIC code that I paste back into my file and then run `make` again - and now I have a single file, that's entirely self contained that can be run on a Next.

## Overheads?

There's two overheads to consider. The first is the performance. The `.extract` is doing _slightly_ more than `LOAD`, but not much. `LOAD` needs to read off the disk (the SD card) and needs to loop reading the bytes until it reaches the end. `.extract` is doing more in that it will load 8K pages into a single MMU to write linearly and it also watch for a user interrupt.

The `.extract` dot file is also cranking to 28Mhz on entry, but in most cases, my own NextBASIC is running at that speed in the first place. But importantly, the `.extract` is all machine code level and it's going to be quick enough that **the difference is negligible**.

The second consideration is your own workflow. Does this method with the overhead of the build process make for a better experience? That's really for you to decide.

I plan to use this method of distribution for the [game I'm working on currently](https://remysharp.itch.io/marbles2) because I think it's rather fancy!
