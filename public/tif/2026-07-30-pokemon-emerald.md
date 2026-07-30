---
title: Pokémon Emerald
date: 2026-07-30
---

Similar to the Pokemon Yellow recently, I had a GBA Emerald Green sent in for repair.

Just 24 hours ago, this was going to be a post on how I had _failed_ to repair it, but in a last minute ditch, I managed to save it.

Loading up the game resulted in nothing, and opening the shell explained why. There was a lot of corrosion around the PCB, but more importantly, two of the legs on the ROM had completely dissolved:

![Extreme close-up of a corroded green printed circuit board showing oxidized metal contacts, vias, and labeled solder pads.](/images/tif/2026-07-30-gba-pe-1.jpg.avif "It doesn't photograph well, but the crud at the top left is where the chip legs had turned to mush")

The first task is to remove the main chips (the ROM and the RAM) and examine and then clean up the damage under the chips. The black around the vias (the holes) aren't a great sign either.

![Close-up of a the circuit board showing severe corrosion, damaged traces, and flux residue around small surface-mount component pads and vias.](/images/tif/2026-07-30-gba-pe-2.jpg.avif "Initially looked like the pads had been lost too, but thankfully they were under there")

Whilst the chips are off, this is a good time to (try to) check the traces for continuity throughout the board.

Once the chips were replaced, I then have to repair the lost legs. To do this, I use a small Dremel-like hand tool that can burr into the epoxy (the black part of the chip that you would handle) until I'm able to expose the internal part of the leg before it was lost.

From there, very carefully, I'm soldering a 30 AWG (hair-thin at 0.1mm) to the inside of the chip to the pad it originally connected to.

![Extreme macro photo of an integrated circuit chip on a circuit board, where thin enamel jumper wires have been soldered directly into scraped-open chip package leads for repair.](/images/tif/2026-07-30-gba-pe-3.jpg.avif "Drilling into the epoxy is always nerve wracking stuff")

Then using the same 30 AWG jumper wire, I proceeded to jump all the locations that I knew the trace was bad. It ended up a bit of a spaghetti board:

![Top-down view of a modified 2002 Nintendo Game Boy Advance cartridge circuit board featuring multiple bodge wires routed across broken traces.](/images/tif/2026-07-30-gba-pe-4.jpg.avif "Lots of tiny wires snake across the board")

At this point, it was time to test.

And…it wouldn't boot. I debugged a lot more, but decided the PCB itself had suffered too much damage, and managed to order a new bare PCB for £6.50 - which came reasonably quickly.

I then proceeded to move all the components across from the old PCB to the new. The larger components are pretty straightforward, but the passives, such as the resistors and capacitors are harder, especially without a template.

I also decided to use my own new passives for the resistors, and at the time I didn't have any new capacitors, so I carried these across assuming, since I had always considered them to be pretty robust (spoiler: they aren't).

![Two Game Boy Advance cartridge circuit boards held in clamps side-by-side on a workbench, one fully harvested down to bare pads and the other populated with the transferred chips and components.](/images/tif/2026-07-30-gba-pe-5.jpg.avif "The new PCB definitely got me out of a corner")

When I was finally done soldering down all the individual components and checking and _re-checking_ the pads on the chips, I finally tried to boot it up to… another fail.

I was going to email the customer and tell them it was a dead end, when I decided I might splash out on Amazon (booo) for some 0402 SMD capacitors - at least I'd have some more for future.

As it turned out, _this_ was the last of the issues. The caps had somehow gone bad on the original board and replacing them brought the whole cart back to life!

![Clear shell Game Boy Advance with a backlit screen displaying the title screen of Pokémon Emerald fully loading](/images/tif/2026-07-30-gba-pe-6.jpg.avif "It lives!!!")

Another one saved. Quite a challenge, and I know if I were a real electronics shop I would have cut the losses much earlier. But I'm not a _real_ shop, this is a distraction hobby and this one was certainly a challenge!