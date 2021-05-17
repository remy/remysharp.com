---
title: 'My childhood companion: the Quickshot'
date: '2021-05-17'
tags:
  - personal
---

# My childhood companion: the Quickshot

I was an 80s kid and growing up we had a Spectrum computer. As much as Sinclair intended the machine to be used for business purposed, it became hugely popular for games and was in part, responsible for the computer literacy of the UK.

As a kid I went through _a lot_ of joysticks and the iconic joysticks of that era were the aviator/cockpit style joystick. Specifically the [Cheatah 125+](http://www.computinghistory.org.uk/det/13190/Cheetah-125-Joystick/) (which retailed originally for £8.95) and the [Quickshot II](http://www.computinghistory.org.uk/det/36095/QuickShot-II-Deluxe-Joystick-Controller/) - which I took to pieces today.

<!--more-->

## The Quickshot II

With this joystick, and what I remember, also the Cheatah 125+, the buttons were "clicky" (not microswitch-clicky though) and the actual shaft of the joystick was… loose. You could wiggle the joystick and it had no impact on movement. Contrast to a joypad you might own today, the lightest touch will show some amount of pressure in a particular direction.

I was testing with the [Gamepad Tester tool](https://gamepad-tester.com/) and I could see the Quickshot would only register a direction when I held the joystick after all way in a particular direction.

Since the joystick isn't that good for playing with (and somehow I own *another* six joysticks for retro gaming), I decided it was time to peek inside.

I should add that I've been opening devices a lot lately, and it's really satisfying discovering what's going on. I never did this as a kid, and it never even occurred to me (though I suspect my parents might have told me off for breaking the thing) - but I'd like to encourage my kids to poke inside - or at least if the device is defunct.

![The quickshot joystick](/images/quickshot/quickshot-joystick.jpg)

There was a lot of screws holding this thing together, and this particular joystick I'm pretty sure was straight from 1982 - the screws had rust and generally quick crappy.

Below is the fire button/trigger pad. It's held on with sellotape (which has a worn hole where the trigger scraped against it). The pad is a "clicky" metal dome, that when pressed, clicks into the inverted position and creates a contact - and thus _fire_.

![quickshot trigger pads](/images/quickshot/quickshot-trigger.jpg)

Unsurprisingly there's a [555 timer module](https://www.youtube.com/watch?v=kRlSFm519Bo) doing the autofire. The capacitors and resistors control the speed of the trigger rate. Triple 5 timers are very neat low level components. I've no idea if there was any kind of standard on the timing to trigger the pulse - but I would suspect not and this was probably tuned manually and then mass shipped.

![quickshot autofire using a 555 timer module](/images/quickshot/quickshot-555.jpg)

Soldering the 80s was… an art? I feel like there's a LOT of solder going on here. And yes, it's filthy inside (ebay job, quite possibly bought originally in the 80s). Seb offered a [bit of historical context saying that](https://twitter.com/seb_ly/status/1394229207480340481) PCBs were largely designed by hand back in those days!

![quickshot trigger pads](/images/quickshot/quickshot-solder.jpg)

This for me is the pièce de résistance: the directional triggers. No sign of micro switches anywhere! What we're seeing is a metal pad that has to be pushed *ALL* the way down to make contact.

Hence why you had to yank the joystick *ALL* the way to actually move, and why you could wiggle the joystick to absolutely no effect!

![quickshot directional triggers](/images/quickshot/quickshot-direction.jpg)

So, that was my morning and now the joystick is in bits on my floor. I wonder if I'll reassembly it with upgrades, up cycle it (taking the DB9 cable and 555 timer for other projects) or send it to the dump - and given the object is 30 years old, I think that's generally better than most items going to the dump!

*[PCB]: Printed Circuit Board
*[IIRC]: if I recall correctly
