---
title: 'Home Assistant: how get real-time UK electricity and gas'
date: '2025-02-03 10:00:00'
tags:
  - personal
  - home_assistant
---

# Home Assistant: how get real-time UK electricity and gas

There's a number of ways to get real-time electricity readings into Home Assistant. I'm currently using a Puck.js to read the [blinking light on my meter](https://www.espruino.com/Smart+Meter) but our gas meter is one of the new ultrasonic ones (in particular there's no readings or lights without physically interacting with it), so there was no obvious means to getting this data.

Most UK based energy companies don't have public methods to get your data out. I know Octopus does have APIs (which isn't _our_ supplier), and there's a specific smart meter that also makes the data available on MQTT - but it's been out of stock for (at least) the last 12 months.

However, this last weekend I discovered, so long as you have a smart meter, you can actually collect this data from the DCC.

<!-- more -->

## TL;DR

1. Register with [Bright](https://bright.glowmarkt.com)
2. Install the [integration](https://github.com/HandyHat/ha-hildebrandglow-dcc)

Job done.

## DCC and getting your data

The Data Communications Company (DCC) enables standardised data exchange across the national smart meter network, allowing energy consumption data can be accessed securely.

Not particularly open to Joe Public, but if you have authorised access, such as the _"Other User"_ role, you (they, the 3rd party) can get the data for us (not all of it, as the Other User from what I've read understandably has restricted access). The technical phrasing is:

> As a DCC Other User, we are also able to support SMETS data services without hardware.

Creators of the Glow smart meter, Hildebrand, also have a mobile app called [Bright](https://bright.glowmarkt.com) (native _and_ web) that doesn't require any special hardware, that can collect your energy readings on a 30 minute interval (okay, not "real-time", but real enough!). This is because Hildebrand have the Other User access.

Since the Bright is on the web, and there's an API that drives it (as seen in the network requests), there's now a way to get energy data into Home Assistant.

## The integration

From here it's a matter of wiring up the software. The integration is available via HACS with the [install guide on github](https://github.com/HandyHat/ha-hildebrandglow-dcc), and a few clicks later I now have the daily running cost of both electricity _and_ gas and the usage, which can help me make decisions about how we use the energy at home.

![Visualisation of energy flow on Home Assistant](/images/hass-energy.png)

Plus, it looks cool 🤓

I know this is data for data's sake, but it's actually helped us to make a change at home, which should have a positive financial impact (I/we hope!). I have a glass infrared radiator in the office, which although is energy efficient, actually accounts for a fairly large whack of our daily electricity usage.

Switching back to the gas heating (whilst _not_ heating the entire floor) is what we're testing now and should make an impact on our bills.