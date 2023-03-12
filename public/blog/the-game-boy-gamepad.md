---
title: 'The Game Boy GamePad'
date: '2023-01-29'
tags:
  - personal
---

# The Game Boy GamePad

I posted recently about trying to make a [DMG GamePad](https://remysharp.com/2023/01/23/hardware-failures#dmg-gamepad) - where I could use a full Game Boy as a gamepad on something like a [MiSTer device where I could easily record](https://github.com/MiSTer-devel/Gameboy_MiSTer) or really anything that accepted a USB gamepad.

First try failed, I then pivoted and success! Here's how.

<!-- more -->

## How it works

Using an Arduino Pro Micro acting as the gamepad and wired into a game link cable, the Arduino serves two purposes. Firstly, it listens for messages from the Game Boy over, what is effectively, SPI protocol.

When those messages come in, using the "DaemonBite Retro Controllers" as the basis for the code, the appropriate gamepad signal is sent over USB (the USB port that's normally used to program the Arduino).

The result is a low latency, simple to use Game Boy as gamepad.

## Requirements

Here's the parts I used:

- [Arduino Pro Micro](https://www.sparkfun.com/products/12640) - 16Mhz flavour (I used a cheap clone board from AliX)
- [DMG 04](https://en.m.wikipedia.org/wiki/Game_Link_Cable) - link cable (of course you could use a GBA or GBC link cable)
- (Optionally) [Game link port](https://duckduckgo.com/?t=ffab&q=game+boy+game+link+port+replacement&atb=v215-1&ia=web) - this part really isn't required if you're happy with permanently soldering the game link cable to the Arduino

Tools are:

- Flush cutters
- Soldering iron
- Arduino IDE

### The code




*[SPI]: Serial Peripheral Interface
