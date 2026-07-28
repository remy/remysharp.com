---
title: Rescued Pokémon Yellow
date: 2026-07-24
---

# Rescued Pokémon Yellow

I guess I just want bragging rights, but here's the short story of rescuing Pokémon Yellow.

I run "fix your gameboy game for £10" which occasionally I get orders for. This one was a challenge.

<!-- more -->

First it had a battery swap attempt (I spotted on the melted shell), but it had also suffered A LOT of flux and grim inside and initially I couldn't see any corrosion.

There were solder bridges on the ROM and eventually I spotted that the VCC vias to the ROM were corroded, so I got a jumper in place from the rear to the VCC pin on the ROM and it started booting.

But…not all was well…

![The Pokémon Yellow title screen running on a Game Boy](/images/gameboy/pokemon-yellow-1.avif "Yellow boots, but …")

![The game running in-game with the large sprites visibly broken](/images/gameboy/pokemon-yellow-2.avif "Although sprites work, large sprites did not…")

My guess it was related to the RAM chip (assuming the sprites are built in RAM when they're big) and [other reddit posts confirmed this](https://www.reddit.com/r/Gameboy/comments/veqaz1/pok%C3%A9mon_yellow_game_and_everything_works_fine_but/).

The old multimeter is my friend, I could see the power monitor/reset chip wasn't getting power. In fact, the trace was fudged where it joins up to a 10K resistor.

I completely removed and rehomed the resistor, found even more vias that were corroded and using this [excellent post](https://www.reddit.com/r/Gameboy/comments/v5n5ab/not_completely_complete_but_it_already_helps_a/) to trace out from the reset chip to the RAM, I was able to add two more jumpers and only then did it come back to life:

![The Pokémon Yellow board with the rehomed resistor and jumper wires added](/images/gameboy/pokemon-yellow-3.avif "In the top left you can see the rehomed resistor and the trace that had been completely removed.")

I usually use the hair-thin wires, but I figured if someone was going to replace the battery on this in 5 or more years, hopefully the big blue and yellow wires were shouting I'M HERE ON PURPOSE!

![Pokémon Yellow running properly with a battle scene and full size sprites](/images/gameboy/pokemon-yellow-4.avif "All good again, and Yellow can battle those pokemon.")

I love getting these challenges - and definitely couldn't do what I do without the wealth of info on the web and reddit on the gameboy.

Another game saved from landfill 💪
