---
title: 'Hard(ware) failures'
date: 2023-01-23
tags:
  - personal
---

# Hard(ware) failures

As I enter the year 2023, I started to collect more and more mini hardware based projects that I wanted to try out.

So far, it's been 100% failure, so I figured I'd make a note here - in the hope I wouldn't repeat the failings!

<!--more-->

## Arduboy

In the spirit of handheld gaming with constraints I found the [Arduboy](https://www.arduboy.com/) last year and though it's been out of stock the whole time I've known about it (though now apparently taking pre-orders), there's a strong community around building your own - which I'm much more interested in anyway.

I happened to have a lot of the basic parts required, and could use an Arduino Pro Micro (clone) as the main board and I had the small 96x128 OLED display.

I promised the boy we'd make one over christmas. Of course, this was the first failing. The only OLED displays I had (and I had multiple) were driven by I2C (4 pins) - which apparently isn't fast enough for the Arduboy's rendering. I _actually_ needed the SPI (7 pin) variation.

Off to Amazon (because I was impatient) and it arrived. I wired everything and I was presented with… a bar of yellow on the display.

Turns out the OLED displays can be split _and_ because of the colour split it also has a gap between the two colours. Yay. Double fail. I've since bought the parts I need (and the _right_ screen!) so we'll have another go this weekend.

![Arduboy own build](/images/arduboy-v1.jpg)

I've got to admit though, as ugly as this Arduboy is, it has a lot of personality!

## GB Interceptor

Next was this impressive project called the [GB Interceptor](https://there.oughta.be/a/game-boy-capture-cartridge) which is a really fun idea. The project also details how you can order these through sites like [JLCPCB](https://jlcpcb.com/).

I decided to order myself a build, but as the video demo points out, it's more cost effective to buy 10 rather than 1 and share the cost with friends (or random fellow enthusiasts!) - which I decided to also do.

The problem came when I was considering the price. I happened to already have 10 RP2040 chips (which the GB Interceptor uses) and I could surface mount these myself to the board. The cost reduction affected the postage (which was a large part of the order) and pushed the price right down.

So I kept going back and forth in the order process adjusting the BOM and checking the final price. Of course this is where it went wrong…

The Game Boy cart PCBs are usually between 0.8mm and 1mm so as to fit in the cartridge shells. The GB Interceptor is clear about printing the PCB as 1mm.

So of course I printed the default (by accident) and got a 1.6mm PCB - which isn't thick enough to sit in the Game Boy game slot directly, and so thick that when it's in a cart shell it can't be forced into the slot at all.

Thankfully, some weeks later, and after a _lot_ of iterations, I managed to remix an existing Game Boy cartridge 3D print and modified so that it fit the thicker PCB - so not a total failure!

![GB Interceptor](/images/gb-interceptor.jpg)

## DMG Gamepad

I'm really quite bad at games. I like playing them, though I enjoy the tinkering and creating side more (which is why I prefer puzzle games), but I'm so bad at games, I thought it might be fun to upload some of my terrible skills for the world to see.

It's easier to record from my computer (or in fact my [MiSTer](https://mister-devel.github.io/MkDocs_MiSTer/)) but if I wanted to play a Game Boy game, it wouldn't quite be the same as playing with a joystick or joypad.

So I figured, why not turn a Game Boy _into_ a gamepad - the protocol is pretty well supported, and there's many libraries available to do this.

At first, I thought about using a hollowed out Game Boy shell - I have enough spares from refurbishments that I wouldn't be going short…

![Many, many Game Boy shells](/images/gameboy-shells.jpg)

But then, what if I could make something that other people could use themselves, and if it could be done without having to having a "spare" shell.

I also had a one of these adapters which is [intended for online Tetris multiplayer](https://www.youtube.com/watch?v=KtHu693wE9o) and found that someone has already written firmware to use the Pico's PIO system to [work as a gamepad](https://github.com/marian-m12l/gb-link-gamepad-firmware).

But, as this blog post is about failings, yep, this failed too. Frustratingly the logic is sound, but for some reason - that still escapes me, the clock signal from the Game Boy when sending data goes bonkers, in that it suddenly fluctuates which causes the byte parsing to corrupt and I ended up with _ghost gamepad presses_. I tried this across multiple cables, multiple Game Boys (both modded and unmodded) and none worked. Oddly, the only time it worked was with an [Analogue Pocket](https://www.analogue.co/pocket) - but that doesn't make it entirely accessible.

![A Game Boy with a game link connected into a Raspberry Pico with a logic analyser connected](/images/gb-gamepad-fail.jpg)

So, lots of failings, and hopefully a few lessons. I'm sure I'll revisit the GB Gamepad (very soon actually - thinking about using an ATtiny85), otherwise even if I end up using one of those many empty shells!

*[BOM]: Bill of materials
