---
title: 'Notes on neptUNO'
date: '2021-05-06'
draft: true
tags:
  - code
---

# Notes on neptUNO

I recently - randomly - bought myself a [neptUNO FPGA machine](https://www.antoniovillena.es/store/product/neptuno/), which is somewhere between a MiST and a [MiSTer machine](https://www.youtube.com/watch?v=lJZwMUaJmc0).

The neptUNO works well as a middle weight retro gaming/platform machine. It can run Spectrum (and the new Spectrum Next), C64, NES, Megadrive, SNES, PC Engine, Amiga 500, Vectrex, original arcade like Galaxian and Bubble Bobble and some more. To run the "core" it does require that someone has written the code to program the FPGA but there's a pretty [good collection already available](https://github.com/neptuno-fpga/Binaries/).

What appealed to me was that firstly it was all prebuilt (I'd learnt a little about the MiSTer machines but it seemed I needed to find the right parts and put it together, and goodness knows I'd frankenstein mine!), but also €150 (plus postage) wasn't too tough on the wallet.

Getting set up however is a bit of wild west situation, partly because it's new, partly because it's fairly unique. So I've written up my notes, either to help remind myself in years to come or for other english readers (there's a lot of resources in spanish).

<!--more-->

## Contents

- [Getting started](#getting-started)
- [Keyboards](#keyboards)
- [Important keys](#important-keys)
- [Cores](#cores)
  - [ZX Next](#zx-next)
  - [Amiga](#amiga)
  - [Atari 800 XL](#atari-800-xl)
  - [Next186](#next186)
  - [Commodore 64](#commodore-64)

## Getting started

Things you'll need:

- SD card - class 10 is generally better all round
- keyboard either: with a PS/2 port or "non active" USB port (more on this later)
- DB9 compatible joystick/pad - this [megadrive one](https://www.8bitdo.com/m30-2-4g/) is particularly popular
- VGA monitor (or [VGA to HDMI converter](https://www.amazon.co.uk/VENTION-Converter-Adapter-Digital-Projector-black/dp/B07F7WYGHV/ref=sr_1_8) - make sure that it's VGA _to_ HDMI)

On the SD card, drop the contents of the [binaries repo](https://github.com/neptuno-fpga/Binaries/) into it. The core files use the extension `np1` and it doesn't really matter where they live - but it does matter where their dependencies live - I'll come on to this.

There's also [Victor Trucco's repo](https://gitlab.com/victor.trucco/Multicore_Bitstreams/-/tree/master/Neptuno) (also known for the Spectrum Next FPGA efforts) and he's been working on arcade machine cores (as well as a PC Engine and SNES).

I've personally put the binaries directory in a root directory called `/_System/` - this is just so it appears at the top of the boot menu (which is, from what I can tell, just a file browser).

![neptuno system menu](/images/neptuno-menu.png)

_(excuse the crunchy image, something was up with my capture device)_

Navigating the menu can be done using a joystick/joypad or the keyboard, but you will need a keyboard to proceed with any of the cores.

## Keyboards

There seems to be a lot of hit and miss out there with respect to keyboards. I've got four(!) keyboards and they work at varying degrees, to the point where I've [built my own solution for use with any keyboards](https://remysharp.com/2021/04/14/building-a-ps2-remote-keyboard).

I can explain why they don't work, but it's a detail that you (probably) won't find on a product page.

This is what's important for your keyboard:

- If it's USB, it must not have any "active" components, like a USB hub (which tends to be the give away)
- It really wants F12 and scroll lock as _real_ buttons, not "function buttons" (where you press an FN key to access it)
- If it's PS/2 it's probably better if it's an older model - in my experience they tend to be a bit more flexible with respect to operation, which gives you a higher chance of it working

[This USB keyboard](https://shop.pimoroni.com/products/wired-slim-chiclet-keyboard) ([archive version for reference](https://web.archive.org/web/20210227054648if_/https://shop.pimoroni.com/products/wired-slim-chiclet-keyboard)) is an absolute bargain for £3.24p, but if you look closely you'll see that the F12 is access using the FN modifier key, and the neptUNO doesn't recognise it at all.

**A note on PS/2 keyboards** - not all keyboards are built equally. After digging into how these work, _some_ PS/2 keyboards won't work until they get an ack message from the machine (the "host"). I bought a [Perixx PS/2 keyboard](https://www.amazon.co.uk/Perixx-PERIBOARD-409P-Mini-Keyboard-12-40x5-79x0-79/dp/B00JV08TIA/ref=sr_1_3) (amazon link - non affiliate) which doesn't work because the keyboard itself sends a "BAT" message and won't work until it's replied to - which the neptUNO core doesn't do (yet).

## Important keys

- `F12` - brings up the OSD. This can be used to load roms into the core and change settings.
- `Scroll lock` - switches between (I believe) VGA and 15Hz mode - so when my monitor doesn't get a signal (the Amiga core starts like this for me) hitting `scroll lock` switches the mode and the signal will work again.
- `1` - for arcades, starts 1 player mode
- `2` - for arcades, starts 2 player mode
- `5` - for arcades, adds coin 1
- `6` - for arcades, adds coin 2

F12 is common amongst the cores, which is why it's important to have a keyboard that actually has this key.

Note that for the arcade cores, using the "select" joypad button also acts as "add coin" and "start" will start the game.

## Cores

The cores (sort of) split between: arcade (stand alone), console (just need a ROM) and computers (which have dependencies).

For organisation, I tend to put the console ROMs in the console core directories (i.e. NES games in my NES core directory).

Computer cores have different requirements, but most (or all that I've tested so far) require boot files available in the root of the SD card, which makes things a little messy, but it works.

I've only documented those that I've actually used.

### ZX Next

Although the neptUNO comes with cores for the Spectrum 48K and the 128K - the Spectrum Next fully replicates these machines so, for me, it's the only core I need for running Spectrum games. I own a "real" Spectrum Next, but under the hood it's also an FPGA chip, so from a software perspective, I've not noticed and differences.

You'll need the `TBBLUE.FW` and related OS files. All of these can be download from the [ZX Next gitlab repo](https://gitlab.com/thesmog358/tbblue/).

If you want a minimum setup, you'll need the following files:

- `TBBLUE.FW`
- `TBBLUE.TBU`
- `/sys` directory
- `/nextos` directory
- `/machines` directory
- `/dot` directory

Otherwise, grab the entire repo and deploy on the SD card - there's some great demos included in the ZX Next project too.

You can (and should) also [download the ZX Next manual](https://www.specnext.com/zx-spectrum-next-user-manual-first-edition/).

### Amiga

When I was a kid my best friend owned an Amiga and it was a different take on games, and when I was around his house we'd play games like Speedball, Syndicate, James Pond and hte like.

There's two Amiga cores available:

- Amiga AGA
- Amiga AGA RTG

I've generally stuck with the RTG version (it's supposed to have better graphics - I don't know the Amiga well enough to know though).

In the RTG directory you'll need to decompress the `SD25_12_2020.rar` into the root of the SD card to get the core to load.

The neptUNO project is mostly (if not entirely) supported by the spanish community, so the Amiga OSD menu is in spanish. For me I needed it in English (though I could just about understand the menu items).

For english language you can download any of the [latest zip files from here](https://retroramblings.net/?page_id=1422) and unzip and grab `832OSDAD.bin` then rename it to `minimig.bin` and add this to the root of your SD card.

I found that this video, although for MiSTer, it's a pretty good guide on [how to configure MiniMig](https://www.youtube.com/watch?v=VhUsCgTI0o0) for the Amiga.

### Atari 800 XL

In the `Binaries/Computers/Atari800XL/` directory is `Atariroms.rar` - this needs to be decompressed into `/atari800` in the root of the SD card. This should give you a path of `/atari800/rom/`.

This computer needs some attention to keys, but [these are all documented](https://github.com/neptuno-fpga/Binaries/blob/main/Computers/ZZ--Infocomputer/Atari800XL_EN.md), the additional important keys (beyond F12 and scroll lock) are:

- `F6` - start
- `F7` - select
- `F8` - option (hold this button and press `F9` to reset without BASIC loaded - which apparently makes more games load)
- `F9` - reset
- `F10` - cold reset

To load cartridges and disk you need to use F12 and load up the port (by selecting a file on the SD card). Loading a cartridge and exiting the OSD then immediately loads the cart (as if the Atari had been turned on with it inserted).

To load a disk, you'll need to run the following command:

```
LOAD"D1:GAME.ATR"
```

Non alphabetical letters are found mostly in the same position as a PC keyboard, i.e. `"` is found at `shift`+`2`.

### Next186

The Next186, to me, is a PC DOS system from bygone days. I had a 286, 368, 486 and upwards but these are the PCs that I got to play games like [Beneath a Steel Sky](https://en.m.wikipedia.org/wiki/Beneath_a_Steel_Sky) or [Day of the Tentacle](https://en.m.wikipedia.org/wiki/Day_of_the_Tentacle).

First point to note: I've not managed to get this core to boot without using a completely separate SD card (so maybe have a few spare).

So although the BIOS is in the Next186 binaries directory, you're better off getting a [full SD card image from here](http://www.forofpga.es/viewtopic.php?f=37&t=120#p1580) (the .rar file). Write that entire image using a tool like [Etcher](https://www.balena.io/etcher/) and once that's complete, copy the [Next186_SoC.np1](https://github.com/neptuno-fpga/Binaries/tree/main/Computers/Next186_SoC) file into the new SD card. Now the with this new SD card the Next186 core can be loaded.

I did notice that my PS/2 keyboard was not compatible with DOS at all, but I found that a USB keyboard worked fine. I suspect in my case however it was the timing of the messages over the PS/2 (having poked around with a logic analyser).

### Commodore 64

There's two flavours to select from:

- C64 MiSTer (I'd imagine came from the MiSTer core)
- Commodore 64

The OSD menus are slightly different between the two, the MiSTer one offering slightly more options - mostly under the video, audio and tape control, but note that both options are in spanish (I've not found a way to change the menu as yet).

Going from a [YouTube video](https://youtu.be/YNR3aRTseMc?t=715) a good for audio is:

- SID Izquierdo 8580 (SID left: 8580)
- SID Derecho 6581 (SID right: 6581)
- SID Derecho Addr Ingual (SID right addr: same)
- Expansion de Sonido No (Sound expander: no)
- Mezcla stereo no (Stereo mix: none)

You can load disks and carts. To load a disk, bring up the OSD (F12) and select the .D64 file you want (I've been enjoying [Neptune Lander Elite](https://c64mark.itch.io/neptune-lander-elite)), then from the prompt:

```
LOAD "*", 8
```

Then wait around a minute or two until `LOADING` is complete and `READY.` is shown. Then use `RUN`.

Note that apparently joystick ports can be reversed depending on the game.

*[OSD]: On Screen Display
*[AGA]: Advanced Graphics Architecture
*[RTG]: Real time graphics
