# Notes on porting my Pebble app to SDK3

Late last night I decided to update my Rest pebble app to make use of the colour features of BASALT, i.e. the Pebble Time's colour features.

In particular, I wanted the resting time to show in green and overtime to show as red. These are my notes that I gathered in porting the app to SDK 3 whilst still supporting the APLITE Pebble (or OG as I like to think).

<!--more-->

## Layout

With my app, I have a `ActionBarLayer` on the right with arrows and `TextLayer`s with the second countdown. I noticed when deploying to BASALT, the position was off, and in fact everything was closer.

I did some simple repositioning, but you can see from the screenshot below that the `ActionBarLayer` is actually slightly wider:

![APLITE vs BASALT side-by-side](/images/pebble-comparison1.png)

This is emphasised when the count is actually going down:

![APLITE vs BASALT side-by-side](/images/pebble-comparison2.png)

This is due to BASALT being "full screen" by default. So to compensate for this, I need to do conditional positioning on the elements. For the position of the `TextLayer`, I'm using `134 - ACTION_BAR_WIDTH` (which is 30 for BASALT and 20 for APLITE):

```cpp
s_textlayer_120 = text_layer_create(GRect(0, 12, 134 - ACTION_BAR_WIDTH, 42));
```

To get the top positioning on the `TextLayer`s I couldn't seem to calculate the values correctly, so I had a conditional set of defines:

```cpp
#ifdef PBL_PLATFORM_BASALT
  #define MENU_TOP 16
  #define MENU_MIDDLE 64
  #define MENU_BOTTOM 112
#else
  #define MENU_TOP 6
  #define MENU_MIDDLE 54
  #define MENU_BOTTOM 102
#endif
```

## Developing for APLITE *and* BASALT

I've got an origial (kickstarter) Pebble and a Pebble Time. I'm used to deploying to devices (rather than emulators, though I'll come on to this).

However, I found (after a *lot* of failure) that you can't develop for more than one Pebble device at a time. Importantly, on the phone Pebble app (be it Pebble or Pebble Time) **you can only have one watch enabled for development**.

The workaround is to keep switching between the two apps, flipping the developer checkbox.

Or...use the emulator on the command line. It's pretty solid, and conviently you can have both the BASALT *and* APLITE running side by side (as you seen from my shots above).

## UI tweaks

Since my Rest app is designed to be used in the gym (I use the gym 4 times a week and use the Rest app *all* the time), there's a few important requirements:

- Clear to read (quickly)
- Show the time

Being clear to read was the motivation behind using colour in my app. Now I can quickly see if I'm over or not based on colour.

However, BASALT apps all run in fullscreen - so you lose the time, which is useful to me because I need to know if my gym session is running over or not. Thankfully the developer docs include putting the time back in on their [migration guide](http://developer.getpebble.com/sdk/migration-guide/#using-the-status-bar).

What I needed to specifically do was ensure the `StatusBarLayer` was *under* my `ActionBarLayer`, otherwise you get this effect, where the `StatusBarLayer` cuts into the menu:

![BASALT status bar layer order](/images/pebble-status-layer.png)

The fix is to simply ensure the `ActionBarLayer` is drawn *after* the `StatusBarLayer`.

## Get it

So if you have a Pebble Time, or Pebble OG, and you use the gym, you can get the [free app here](http://apps.getpebble.com/en_US/application/53ff41ed8cdf37902b000050) - and don't forget to *heart* it!
