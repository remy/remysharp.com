---
title: "How I made an LED driver smart…"
date: 2025-04-18
tags:
  - personal
  - home_assistant
summary: A long form post that basically ended with _if it ain't broke…_
---

# How I made an LED driver smart…

…by just a little.

Our family bathroom has a cabinet with an IR sensor that turns on LEDs in the side of the cabinet. The IR sensor is "wave your hand under the cabinet" and the lights go on or off. The littlest uses this light (instead of the overhead which is connected to the extractor fan - i.e. loud) as a night light.

Since it's usually left on at night, I wanted to give the LEDs some smarts so when I go to bed, it automatically turns off with my blanket "turn all the lights out" home assistant command.

<!-- more -->

## How the cabinet worked, emphasis on past tense

After I removed the doors and the enclosure housing all the electrics, I found the following inside:

1. Mains supply coming in
2. Goes into a mains power transformer to reduce the current
3. Supply is then split between a "shaver socket" (which charges our toothbrushes) and a control box that takes input from the IR sensor and outputs to an LED driver
4. The control box is responsible for converting the signal from the IR sensor to a relay, if the relay is closed it then powers the LED driver
5. The LED driver then lights up the cabinet

![The wiring before I got my hands on it](/images/cabinet_before.jpg)

I'd found that the voltage going to the IR sensor was 5V which was perfect for an ESP32 and I had planned to incept the IR sensor and then send signals to the control box to "pretend" hand movement was detected, and thus turn the lights off.

That completely failed, and in the end I would connect to the output of the LED driver (which has stepped down to 12V) and add my own relay.

## First though, here's the mistakes I made

There were a few (though hopefully you guessed the biggest one already - I'll save that for the end).

### 1. Current

The 5V that powered the IR sensor didn't provide enough current to boot up the ESP32. I'm not sure _how_ much current it was providing, but when I connected the ESP to the control box it just wouldn't complete the boot process, which is (usually) indicative of not having enough current.

I think this makes sense, as the IR sensor wouldn't need a lot of current to detect a change.

### 2. Shorting

I decided perhaps I could pick up a decent supply elsewhere on the control box. I went probing around and noticed my multimeter wasn't really giving me the values I expected. Until, rather quickly, a loud BANG and flash made me jump and I realised I had blown the circuit.

The mistake here was that at some point, I had put my multimeter in current mode (which requires removing one of the probes and plugging it into a different socket). What that actually means is that when I probed the control box for voltage, instead of finding it, I created a short across the mains live and neutral. Hence the bang.

Thankfully the fuse box had just flipped the breaker.

After removing the control box and inspecting, I found that the trace I had been probing had been blown right off the PCB and eventually I spotted that my multimeter probe tips had melted!

### 3. Assuming it would be okay after blowing

After cleaning up the control box I decided that the only damage was my multimeter and the trace (which I had repaired with copious solder). I reinserted the control box, flipped the breaker only for it to immediately flip back down along with a bang (again) from the bathroom.

The control box had obviously been damaged (and frankly I should have known better), but now it was _really_ dead. Lots of soot like black around components that I don't particularly recognise.

So now the cabinet lights are dead (well, the trigger mechanism) and it's coming to night time (since the electrics would be off for me to work on it, I'd be in the dark) - so the kids' night light was hosed for the next few nights.

![The control box completely blown](/images/control_blown.jpg)

### 4. Did I really make a better wheel?

Now this is the big mistake: I'm fairly sure I made this smart for the sake of making something smart, *not* because it would enhance things.

I was stuck in this mess because I wanted to automate turning the light off at bedtime, but each night the process has been incredibly simple: right before I go to bed (and the kids are finally asleep), I lean into the bathroom, wave my hand, then carry on to bed.

I've written over 1,100 words, and spent a good few hours dismantling, fixing, breaking, testing, fixing and finally reassembling all to save myself from waving my hand in the evening. Even as I write, although the lights work again, the IR sensor doesn't - I _still_ need to restore that functionality.

Lesson: weigh the pros and cons first, rather than diving straight in 🤦

## The smart LED driver

Since I had blown the original control box beyond useful, I had to set my work on the output side of the LED driver.

I reused the relay from the control box and use a transistor to turn the relay on (because the ESP32-C3 GPIO isn't 5V safe, and the relay needed 5V).

![The ESP32 wiring](/images/cab_esp_wiring.jpg)

This is what the schematic looks like (chatgpt suggested I include a flyback diode, which worked, but I really need to read up as to how and why - it's related to voltage spikes IIRC):

![Smart LED driver schematic](/images/smart-led-driver.png){.bwimg}

I also have a heat sink on the back of the 12V regulator. Finally, when this booted up, it was able to control the lights - or rather specifically: I was able to turn the lights _on_ again.

![The lights are finally on](/images/cabinet_lights_up.jpg)

The [esphome](https://esphome.io) config revolves around this small snippet:

```yaml
light:
  - platform: binary
    name: 'Cabinet Lights'
    output: cabinet_lights_output

output:
  - platform: gpio
    pin: GPIO1
    id: cabinet_lights_output
```

It did then appear on my home assistant panel, and although the IR sensor is still disconnected, at least I can turn on the light (plus the littlest can use their Google Home voice thingy to turn the cabinet lights on too).

![Home assistant showing me control over the cabinet lights](/images/ha-cabinet.png)

What a palava.

## What remains

I do need to restore the IR sensor because that's the primary way of interacting with the light.

I would have liked to include a fuse where the 12V comes in, but I forgot to originally so to put it in requires disassembling the whole thing (which I will probably do).

I _could_ put in a MM wave sensor to be used to turn the lights on automatically, but referring back to mistake number 4, I think perhaps the project doesn't _really_ need it…

An interesting learning experience, with important learning lessons for me, specifically: **if it ain't broke, don't fix it**.