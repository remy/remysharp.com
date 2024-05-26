---
title: 'Casio f-91w Modding'
date: '2024-05-25'
tags:
  - personal
---

# Casio f-91w Modding

I do love my [Pebble](https://remysharp.com/search?q=pebble) mostly because it still uses tactile buttons and it's a slim watch. Though recently I saw that Casio offered a design in a bright orange colour (and then found a multitude of colours available) and really wanted to brighten up my style.

Obviously, quickly it got out of hand!

![Casio watch colours](/images/casio/array.jpg)

<!--more-->

However, the one thing that I absolutely adore about Pebble is the app that I wrote that I rely heavily when I (managed to) go to the gym: [My Rest App](https://apps.rebble.io/en_US/application/53ff41ed8cdf37902b000050?query=rest&section=watchapps).

But you can't write apps for a Casio… lol, of course you can!

## Sensor Watch

There's a few different PCB replacement projects for the Casio f-91, but I quickly found the [Sensor Watch](https://www.sensorwatch.net/) project, and though I don't need the sensors (and actually I bought the "lite" version that doesn't let you add more sensors beyond the temperature), you *can* write your own watch faces for it.

The documentation is a little spread out, but [github repo](https://github.com/joeycastillo/Sensor-Watch) has everything I needed to create my own customisations and to create my own watch face.

[Ordering and delivery](https://www.crowdsupply.com/oddly-specific-objects/sensor-watch#products) was pretty quick (I assumed it was delivered from the US to the UK) and installation was very straight forward. You need to make sure you have a small enough screw driver to remove the back panel, otherwise everything slots out.

You will also need a solder iron if you want the buzzer support (it's a wafer thin piezo buzzer glued to the metal backing).

With a few hours of programming in C, I was able to port the functionality of my Rest app to the Sensor Watch. If you're interested, the [source code is on github](https://github.com/remy/Sensor-Watch/blob/main/movement/watch_faces/complication/rest_face.c). One of the key design aspects was that the "start" button (the alarm right hand side button) would restart the timer whether it's overrun or still running - making it a timer I can use with minimal fuss.

It's not much to look at, but here's my Rest app side by side:

![Casio Rest App](/images/casio/rest_app.jpg)

The light button (top left) cycles the timers (30 seconds, 60 seconds and 120 seconds), the alarm button (bottom right) starts the timer (and restarts if it's overrun), the mode button (bottom left) stops and resets the timer _if_ it's running, and if it's not running, cycles to the next watchface.

However, there is one pretty important feature that I miss from the Pebble: the vibration motor. My Pebble would give me a tactile nudge when the timer was up, but the Casio only has an LED (which is much brighter than the default LED that comes with the Casio watches) and buzzer, and most of the time in the gym, I have headphones on (plus, being British I would _hate_ to make a sound that might disturb anyone!).

## Vibrate support for the f-91

Other people have already faced this problem, and smart cookie has already documented and created themselves a PCB that adds a vibration motor to the Casio f-91 and documented it in [an Instructable](https://www.instructables.com/MAKE-IT-VIBRATE-Vibrator-Module-for-Casio-F-91W/).

It does add extra thickness, but it's so cramped inside the watch that there's really no option.

I've messaged the author to ask (as they have written) for the PCB CAD files but I've not heard back. However, I plan to recreate this PCB but with a cut out for the motor to try to sit more shallow inside the watch. I'm also going to test with a coin and a column based motor to see how they sit.

Once I've got vibrate support, I think my orange watch will be perfect.

## Backlight

If you've ever owned a Casio watch, you'll know that the "light" is extremely weak and probably only going to give you the hour (since the rest of the watch is in darkness).

The sensor watch does replace the LED, which is actually bright enough to use as a weak torch in the dark. But when if you _just_ want a better backlight?

There's a few options.

The first is to "simply" swap the LED with a new surface mount LED. If you're happy with surface mount soldering and tiny components, _and_ you have an SMD LED knocking around, a green LED is a good substitute.

![LED swap](/images/casio/led.jpg)

In the photo above, the LED is a 0603 (I think) which is too small so I had to bridge the tabs with solder. It's a little messy, but it does the job. Here's the comparison - though appreciate that the photo is trying to make the light much better than appears in reality. The left shows the original LED, the right shows the newly installed LED:

![LED swap](/images/casio/led_compare.jpg)

### Light spreader

This is a no solder modification that much more evenly spreads the light on the watch, even with the original LED.

I found a [supplier on Etsy](https://www.etsy.com/uk/listing/1448973768/back-light-spreader-for-casio-f-91w-a) and their delivery arrived in good time.

The installation was straightforward (though they also include a video to follow too), but it's a matter of disassembly, removing the white backing to the LCD, and inserting both a new backing (which can be paper, though I chose "ESR") and then inserting the spreader. The spreader is a thin layer of transparent plastic with a gradient of layered white dots which helps spread the light much more evenly.

The reviews of the product are extremely positive and when it came to installing the plastic on my own watch (this time the pink Casio variant) I was a little doubtful of how well it worked. But once it was installed, it really did improve the backlight many, many times over.

![Light spreader in action](/images/casio/light_spreader_in_dark.jpg)

The backlight is really even and incredibly easy to see in the dark.

## LCD filters

The filters (can) look really cool as a simple mod. It's an extremely thin, partially transparent layer that sits on the lens.

I bought a pack of [colour filters from Etsy](https://www.etsy.com/uk/listing/1374696404/casio-f-91w-monochrome-gradient-filter) (via Germany to the UK, again pretty quick).

I'm on the fence on these though. The problem I faced was that there was no guidance on how to remove the filter (in case of mistake), and I hadn't realised how delicate the Casio's own lens printed image is (the bit around the LCD). It's _incredibly_ thin paint.

I installed the filter on a blue watch I had, but decided that I didn't like the colour and wanted to try a different colour (since the pack included the full range), but when I was trying to remove the filter, I nicked the paint on the lens. It's extremely small, but _I know_ it's there.

If you install these, I would strongly advise that you expose nearly all of the self adhesive, but not all. I kept a corner still covered (after learning from my mistake).

I also felt like I could never quite get it 100% perfectly flat against the glass lens. There were no air bubbles, but when the light catches you can see there's something in the way. I was using the light blue Casio I had, and started with the blue filter (which I thought was _too_ blue), then the green, but I thought I had air under the lens, then the red (which you can see below), which actually makes the LCD quite hard to read.

![Lens filter](/images/casio/lens_mod.jpg)

You can see from the angle I've tilted the watch that it's not quite 100% flat to the glass, and I did eventually notice the same effect on the Etsy page too. It's certainly not noticeable from arm's length, but if you know it's there, then the obsessive perfectionist sees it.

In the end however, I removed these entirely - but I do think they're a nice idea.

## Misc other modding ideas

There's a couple more mods that might be interesting to play with. Once is a lens replacement (though the only supplier I can find has closed their store as of a year ago, and I can't seem to find anyone else). I've got a couple of Casio watches with broken glass lens (which I was going to harvest the straps), but a new lens would be fun.

Finally, you can invert the colours of the LCD by removing the original polarizer and [replacing and rotating accordingly](https://www.watchuseek.com/threads/casio-f91w-mod-negative-display-diy.757778/). It's a neat hack (and might look good with the red filter from earlier) and given my experience with Game Boy polarizers, should be fairly accessible to me.

I'll try to update this post if/when I get around to adding a vibration motor to the Casio watch too.
