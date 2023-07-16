---
title: 'Custom backlight for a Wonder Swan'
date: '2023-07-12'
image: /images/ws-mod/12.jpg
tags:
  - personal
---

# Custom backlight for a Wonder Swan

I've been branching out from my usual Game Boy folly and have been tinkering with the Wonder Swan (an interesting little Japanese exclusive handheld). The original Wonder Swan can do sixteen shades of grey and has no backlight (very much like the original Game Boys for viewing).

Given my experience with Game Boys and recent (basic) electronics, I thought I'd try my hand at a backlight mod (where LEDs are used light up behind the display). I'm pretty happy with the final result and this is how I did it.

<!-- more -->

## Build steps

For the backlight, I used a faulty DS Lite display - both bottom or top screen will work as we're only interested in the LED and filters.

![](/images/ws-mod/1.jpg)

From the DS Lite display, remove the metal shielding from the back, remove the front polarizer (I'm guessing) and then separate the back (white) plastic away from the LCD (careful as this can crack and it's glass).

![](/images/ws-mod/2.jpg)

Once that's done, you should be left with a white plastic layer, a reflective layer, a clear layer with the LEDs attached and then a number of diffusion layers. Try to keep all these together and avoiding touching the front most diffusion layers. This is our backlight kit.

![](/images/ws-mod/3.jpg)

Next, remove the LCD from the Wonder Swan and measure the screen up against the backlight kit.

I used a sharpie to mark on the clear plastic attached to the LEDs to mark where I need to trim down the display.

![](/images/ws-mod/4.jpg)

**⚠️ Important** when you trim the left side of the LED layer (assuming you're not trimming the right hand side with the ribbon connector), you need to ensure you don't cut through the circuit. There's a large ground layer on the left that you can safely cut, but make sure you do not break the circuit otherwise your backlight kit won't work.

You can just about see the ground plane looping back from the last LED (on the far right):

![](/images/ws-mod/4a.jpg)

To install, you also need to peel away the reflective layer on the existing Wonder Swan display (not photographed). I heated this up with hot air at around 100 degrees celsius (but a hair dryer will work too).

Take care not to touch the layer under the reflective layer as it's sticky and can leave a print. You _should_ be able to leave this in place (and keep it safe from dust) - but I found that the glue on mine was very mottled so I removed the back polarizing lens and installed a new one (I had spare polarizing sheets to hand).

As preparation it's worth trimming back the voltage regulator pins that stick through to the display side (as well as the nub from the cart slot that pokes through) with flush cutters.

However, the group of diodes (DA1, DA2 and DA3) are going to put pressure on the display which you might be able to mitigate by trimming the LED plastic layer and creating a gap, but I didn't do this and I found I could use less tension when screwing the shell back together (you'll see in later photos).

![](/images/ws-mod/5.jpg)

Now solder thin wires to the LED ribbon cable. There's 4 pads on the ribbon, but they're just grouped together, so it's ground, ground, VCC, VCC.

My photo isn't super clear, but if you can trace the connections, the VCC goes into the LEDs from left to right (the bottom two pads), and the ground is on the top (and the top two pads).

![](/images/ws-mod/5a.jpg)

Now put the LCD back in, and add the diffusion layers, and the LED layer and then the final reflective and white layers. Aligning it can be tricky, I suggest doing this with the LCD ribbon removed from the main board as it'll make it easier.

I opted for running the LEDs across the bottom of the display. This way the display lens covers the full run of LEDs, plus I'm able to run the wires out next to the link port.

Now we need to connect VCC to the 15v source. There's a stable/direct current of 15v on the power regulator. I originally found a 16v source, which was nicely tied to the contrast wheel (so I could adjust the brightness of the backlight), but it's not stable and once music started playing, it would interfere with the LCD refresh rates.

![](/images/ws-mod/6.jpg)

The 15v comes off the Q2 component and into a via on the edge of the power regulator board, so I added my VCC line to the via.

![](/images/ws-mod/7.jpg)

Finally, using a 2.2K resistor from the ground on our backlight to the ground pad for the battery, our circuit is complete.

For my own reassurance (to prevent shorting), I also wrapped the resistor in some Kapton tape (it doesn't look great, but it does the job).

![](/images/ws-mod/8.jpg)

As I mentioned before, the array of diodes on the front side of the main board causes pressure on the display, which you can see below.

![](/images/ws-mod/9.jpg)

The solution (or, as close to a solution as I could get) is to loosen the middle right screw by a couple of turns and you'll quickly see the mark dissipate.

![](/images/ws-mod/10.jpg)

The final results can be seen below, though the first image (the brighter one) is _without_ the resistor for comparison - which affects power consumption, which I'll finish with.

![](/images/ws-mod/11.jpg)
![](/images/ws-mod/12.jpg)

## Power consumption

Given that the Wonder Swan runs on a single AA battery, pulling 15v is going to have some impact on that battery life.

I ran tests for the following cases, using Gunpey running the introduction screens and with volume on full. Let's assume a 2000mAh battery capacity. The amperage was recorded thusly:

- No backlight: 40mA ~ 40hrs
- backlight installed, but no resistor (brightest image above): 140mA ~ 14hrs
- 2.2K resistor: 55-60mA ~ 33hrs

So I think the resistor, at the cost of a little brightness, is definitely worthwhile.
