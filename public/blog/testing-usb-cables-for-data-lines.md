---
title: 'Testing USB cables for data lines'
date: '2023-02-27'
tags:
  - personal
---

# Testing USB cables for data lines

I've got many, many USB A to USB micro cables and I still have a good number of devices that make use of the micro connection.

The USB (2) port generally have four wires - ground, power and then D+ and D- (for data exchange). USB micro has a 5th line, though when it's connected to USB A on the other side that 5th line isn't connected.

My problem is that I also have a boat load of _power only_ USB cables - and there's no way to tell using a visual inspection. You can buy tools that tell you if there's a data line, but I can make one fairly simply.

<!-- more -->

I should caveat this with the fact that I just happened to have the parts laying around.

## In short

The device is an LED power a battery power source and the USB's data wire is used to complete the circuit.

## Parts

- Protoboard
- USB A port
- USB micro port
- LED
- 220ohm (ish) resistor
- Battery (I used a game boy cartridge battery - again I had them laying around)

## Wiring

In my version, I've included separate LEDs and checks for both the D+ and the D- but it's not really necessary - if D+ isn't there, neither is D-.

The pinout on the USB ports is the important detail, the outside pins (far left and far right) are VCC and ground (which we don't care about). The centre pins are what we're interested in. The centre pins will make up the circuit.

![schematic](/images/schematic-usb.jpg)

## Result

Now I have a simple tool that can help me weed out those pesky power-only USB cables!

![final product](/images/usb-on.jpg)