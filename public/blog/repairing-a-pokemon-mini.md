---
title: 'Repairing a Pokémon Mini'
date: '2023-05-21'
draft: true
tags:
  - personal
  - hardware
---

# Repairing a Pokémon Mini

## Resources

- [Interactive trace tool](https://pm.remysharp.com)
- [Schematic (on archive.org)](https://web.archive.org/web/20151213074941/https://www.tauwasser.eu/files/MIN/Main.PDF)
- [Discord channel/chat](https://www.pokemon-mini.net/chat/)

## Corrosion on negative

If there's corrosion on the negative battery terminal, you'll possible have problems with:

- Power button
- Shock sensor
- A button
- [EEPROM](http://ww1.microchip.com/downloads/en/devicedoc/21189f.pdf) (for game saves)

## Power button

- TP2 is continuity to power button.
- TP2 is connected to _two_ diodes: D5 and D6.
- D6 goes to the power regulator (the daughter board) to the bottom center pad (there's a via directly between the U1 symbol).
- D5 goes to the CPU. When looking at the epoxy blob, there's L shaped series of vias (laying on it's back) on the right hand side. The power via is second in from the right (refer to [the trace](https://pm.remysharp.com) with nets turned on).

## Shock sensor

- The shock sensor is SW2 and pin 1 is the output pin (where pin 2 is tied to ground)
- The positive leg goes up to the left side of R15 (and then into the CPU)

## A button

- TP1 is a test point for the A button
- However, the TP1 has more vias to reach the A button than the A button needs to reach the CPU (which is obviously more important)

## EEPROM

The read and write data lines have vias just under the negative terminal so if there's corrosion in these vias, games won't save. You'll need a cart that reads and writes to the EEPROM, Pokémon Party Mini is a good test case.

If the mini can't talk to the EEPROM, you'll should a visual error on the LCD saying firstly that the EEPROM is full and then later with an error that reads "EEPROM". The clock should also fail to be set.

