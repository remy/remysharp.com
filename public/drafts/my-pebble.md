# On my Pebble

Back in April 2012 I joined the bandwagon and backed the hyped kickerstarter campaign for the very first Pebble.

After waiting way way too long and abandoning my original choice for an orange watch I was forced to choose the black, only to get my hands on it earlier.

I also hadn't worn a watch in well over 15 years. I'm not 100% what prompted me to buy the watch. Perhaps the promise of an open source platform...?

When it *fin-nal-ly* arrived, what I noticed immediately was that it was massive on my wrist. The strap was particularly large and never really felt snug.

**I figured it wouldn't even last 3 months on my wrist.**

---

## What was the point of the Pebble?

The Pebble gave me one important (to me) feature. Text messages (and calls) would vibrate on my wrist.

I'd found that when I was away from home, I'd nearly always miss text messages from my wife. Even when my phone was on vibrate and loud, I'd still miss them.

A small vibration on my wrist would *subtlety* alert me to something I could decide to action or not. For me, this was a big deal and an important feature.

---

For the first 3 months it was a novelty. I kept reading about cool apps that could do text responses - but alas I was using an iPhone and none of this functionality was available to my phone.

The first turning point to my unimpressed state was spending 1 month trailing a move to Android. This experience totally opened up the Pebble's functionality to me. But that was *just* a trial, and I would move back to the (limiting) iPhone.

So, why and how am I still wearing my Pebble today?

## My Pebble today

Some 2 years later I still wear my Pebble. Every day. It helps that I finally ditched my iPhone for an Android (a OnePlus One - and that's another blog post).

The strap has broken, it needs charging once a week (insane if you compare to a regular watch) and the bottom right action button (1 out of 4 buttons) is playing up.

One strange thing that kept happening, particularly strange if you consider how conservative the British are: random people would ask my "how am I finding my watch?". A guy on a plane, someone in the gym changing rooms, it was all very strange (to me).

But with all these issues, the clunkiness and being forced to converse with other human beings: *why* am I still wearing it??!

I customised it. I made it mine. It's *my* watch, and there's no other watch like it.

## Open source: learning & modifying other people's&nbsp;code

I'd tried in the past to make my own watch face but failed pretty hard. But then my second attempt took an existing [watch face](https://github.com/edwinfinch/simplyclean) and made [my own](https://github.com/remy/simplyclean/) modifications, including using a custom font.

There *is* a memory leak in the original code that causes the watch face to crash every now and then, and I'll likely get around to debugging and fixing it...one day.

<small>A tiny note: since I forked the project, the license on Simply Clean has changed/been removed. It doesn't affect my code, but I thought it was fair to point out.</small>

I used [CloudPebble](https://cloudpebble.net) for all of the development I've done so far on the Pebble, and it's an absolutely superb resource.

## I know JavaScript!

Although there's a couple of limitations in the JS apps, the simple fact is: I can create my ideas as JavaScript based Pebble apps in a matter of hours.

I recently wrote a [quick interface](https://github.com/remy/pebble-brighton-buses) to a [local bus time webapp](http://buses.leftlogic.com) that I wrote. Now from my wrist, in a few presses I have the bus times on my wrist.

From a practical use, this is actually easier than using my phone because it takes a few seconds to do the geo-lookup and then request the content from the bus website, so when I'm rushing around in the morning, I don't have to mess around with my phone.

I also wrote a simple prototype with a Spark that I could control LEDs from my watch. Pointless, but cool ([see this short video demo](https://instagram.com/p/sDFL0aqavo/)).

There is, however, a small cost to pay with JavaScript apps:

- They *only* work whilst you have a connection from your watch to your phone (since the actual JS is executed on the phone)
- There's a laggy response time on the button presses, particularly (I've noticed) going backwards through the app (or unloading)
- Firing up the JS based Pebble app can interfere with apps running on the phone - I noticed that it would stop my OnePlus One's camera from recording video as I launch the JS app (which is where there's no video yet)

### I (kinda) know C too...

The *actual reason* the button is failing on my Pebble is because I use it so much: I wrote a C based app that I use in the gym to time my rest time between sets. I called it (cleverly...) [Rest](https://apps.getpebble.com/en_US/application/53ff41ed8cdf37902b000050).

![Rest app](/images/pebble-rest.jpg)

Its simple. No animations, no nonsense. Three pre-set (configurable) times in seconds, and a timer. I'm in the gym 4 times a week, and usually have around 20-25 sets. I use my app between *every* set. My app is **exactly** what I need for the task I perform multiple times a day.

## How it affects my daily routine

As with the Rest app being part of my daily routing, the alarms are also an important part of my routing. I have alarms set throughout the day to remind me exactly when I need to eat. Silly as it sounds, making the watch integral to my daily routine is what's given me a reason to keep it charged and keep it on.

Being able to customise it, using my knowledge of code and knowing how to hack through other people's code has lulled me into loving this small piece of tech.

**Being able to express myself in my pebble is what's made me love it.**

I've also realised that I always prefered the look of services like de.licio.us (circa 2005) over Magnolia, and in a way, the Pebble is when compared to the other smart watches out there.

A *lot* of my friends have asked me "when are you getting the iWatch", to which I say I'm not interested (*seriously*, [follow me on twitter](https://twitter.com/rem) if you need an idea of how [sick I am of Apple](https://twitter.com/search?q=from%3Arem%20apple&src=typd)) - and in fact, I *also* backed the new Pebble Time project and I can't wait to get my hands on that device and play some more.

## Next: Time

Akin with simplicity of the Pebble, my Pebble Time arrived in this simple cardboard, no-frills packaging, and I'm keen to see how I can customise this watch and make it mine, again.

![Pebble Time packaging](/images/pebble-time-packaging.jpg)