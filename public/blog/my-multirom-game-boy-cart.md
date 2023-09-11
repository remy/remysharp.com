---
title: 'My multi-ROM Game Boy cart'
date: '2023-06-14'
draft: true
tags:
  - retro
  - hardware
  - personal
---

# My multi-ROM Game Boy cart

As I continue messing around in the land of Game Boys, I had developed my own test ROM that lets me system check a refurbished Game Boy. Of course then I started thinking it would be nice to have my very own personal cartridge.

I'm on my way (using tools like KiCAD), but along the way I accidentally made a _stupid_ feature that let me put _two_ 32K Game Boy ROMs on a single cart and I could manually switch between the two.

<!--more-->

Here it is for your viewing pleasure - and yes, instead of a useful ROM, I put my own message (instead of "Nintendo") at boot, at which point it locks up (and I have to flip the switch):

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/EuTih2PnDJY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

What's more interesting is how it works, and what makes it stupid.

## How it works

On the PCB I have an [AT49F040](https://media.digikey.com/pdf/Data%20Sheets/Atmel%20PDFs/AT49F040.pdf) flash chip. This chip has the following properties that are useful:

- 512K storage
- One shot erase
- 19 address pins

Since the PCB itself _only_ includes the flash chip and not a Memory Bank Controller (MBC) it means that _only_ 32K can be addressed whilst in the Game Boy.

There's only a handful of 32K games (though Tetris is included), but my own test program is 32K, so this suits me.

But what about the *other* 480K?

- switch
- custom rom with custom logo
- url
- how the mapping works
- the process: erase one shot, then write twice
