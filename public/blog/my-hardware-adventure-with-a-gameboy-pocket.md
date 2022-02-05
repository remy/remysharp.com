---
title: 'My hardware adventure with a Gameboy Pocket'
date: '2022-02-05'
tags:
  - personal
---

# My hardware adventure with a Gameboy Pocket

I bought this Gameboy Pocket off eBay in the hope that I could bring it back to life...

![](/images/gbp-restore/before.jpg)

I'd seen this before and suspected that the game couldn't be loaded due to corruption during boot (on the GB side). I was wrong, but I definitely enjoyed the challenge!

<!-- more -->

Opening up the Gameboy up and took a peek, and yep, found game pak loading doberry had been messed with. Bit of a duff job on whoever tried to repair it before me - and it even looks like they spotted there was a short and tried to slice through it with a knife:

![](/images/gbp-restore/pins-before.jpg)

Pins A2 and A1 were definitely connected! Some flux and solder later and it looks more like this:

![](/images/gbp-restore/pins-after.jpg)

And now the Gameboy boots with a nice clean Nintendo logo. Except… it doesn't go past that point at all - and in fact the screen looks like it's doing some weird flash dance, going between dim and off (and I could see the amperage being pulled was fluctuating and not steady). On top of which, I'd also noticed I hadn't heard the speaker.

Fixed (replaced) the speaker first - it had no continuity between the two pins at all, so the only spare I had was this bigger one, but now I had sound again (but loading isn't working still):

![](/images/gbp-restore/speaker.jpg)

Under the microscope I found there was corrosion (possibly it was dropped in liquid, my best guess), around the contrast wheel. After I tried to clean it, two of the five pads completely removed themselves from the PCB and I started noticing more corrosion across the board.

![](/images/gbp-restore/bad-contrast.jpg)

The far left and middle trace pads were completely removed. To (sort of) fix the contrast wheel, according the to schematics, I could jump the far left pins together, and then the next pins together.

Still didn't work though. So search again under the microscope and came across this via with all it's copper gone (on the far right)

![](/images/gbp-restore/bad-vias.jpg)

You can also see some residue green around some of the vias from corrosion.

I traced this line and it joined the S-RAM to the cartridge slot and then back to the CPU, and from the underside of the board, where the via was missing the copper - there was no continuity between the two chips - when there definitely needed to be.

So jumper to the rescue (I had to use a spare resistor lead as a jumper, turns out all my wires were too fat!):

![](/images/gbp-restore/fixed-with-a-jumper.jpg)

And after that rather dodgy soldering job - the Gameboy Pocket is back to life!

![](/images/gbp-restore/after.jpg)

Now I've just got to find it a new home (I've already got too many Gameboys!)
