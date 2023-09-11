---
title: 'Getting daily notifications my parent is okay'
date: '2023-09-11'
image: /images/kettle-missed.jpg
tags:
  - personal
---

# Getting daily notifications my parent is okay

About a year ago I came across the [Kettle Companion](https://kettlecompanion.com/) which is a lovely idea: you share a device with a loved one, and when they boil their kettle, you get a little notification on a device (a toy kettle) either letting you know they're okay or maybe you want to give them a call for a coffee and a chat.

However, I have my reservations: firstly, I don't need a toy kettle in my own home, more importantly, the service has a hosted server monitoring for some kind of event, is that service going to stay online for perhaps 20 years?

Anything that I rely on for actual long term living I'm am _extremely_ wary of relying on a 3rd party company for. So, although I think Kettle Companion is a neat service, I'd rather have control.

So this is how I've solved it myself.

<!--more-->

## The desired effect

Ideally, what I want is: when my loved one boils their kettle, I want a notification. But more importantly, I want a notification _if they haven't boiled the kettle_ (probably a bit after their "usual time").

This "missed event" notification would prompt me to check-in on that loved one is okay.

I've read (and know) that some elderly people might phone a loved one at a specific time of day, let it ring three times and hang up. If the other didn't get that call, they'll pay their friend or loved one a visit.

So for me, I want a notification to my phone (or possibly more than one person's phone) and I want to be able to manage and be responsible for the online services it uses (as much as I can).

If they miss their morning tea or coffee, I want to be notified like this:

![](/images/kettle-missed.jpg)

Finally, it needs to be easy to set up at the loved one's home and unobtrusive for them:

![](/images/kettle.jpg)

## Prerequisites

I've used the following parts:

- [Tasmota compatible plug](https://kettlecompanion.com/product/power-metering-smart-plug/) - this I was able to buy from Kettle Companion site because they use this same technology.
- Messaging app, I wanted to use WhatsApp but bots require a business account, so I ended up using Telegram Messenger
- MQTT server (aka broker) using [Mosquitto](https://mosquitto.org/)

## The How

This is all possible with [Tasmota](https://tasmota.github.io/docs/) which I've only really used a small amount of. The "smart plug" has the Tasmota software running on it which allows me to configure a lot.

In my case I have the following on the plug:

1. Sending messages to the MQTT server
2. Timers set a specific cut off times
3. Rules that trigger when either a timer fires, or when the current draw on the plug changes

Timer 1 is set at 10am and if it fires, it sends an MQTT message saying the user hasn't boiled the kettle.

Timer 2 is set at 3am every night which re-arms Timer 1 (i.e. loved one is on holiday, the "they didn't boil the kettle" fires, but I know to ignore it, so the Timer 1 must be re-armed).

An additional Rule is triggered if the current draw raises above `1` (i.e. there's some draw, they're boiling the kettle), which does two things: firstly disarms Timer 1, and secondly it sends an MQTT message saying the kettle has been boiled (so I'll potentially get multiple messages during the day).

On the client side of things, I have a telegram bot that subscribes to the MQTT messages and listens for these specific states sending the appropriate messages.

For those wanting to copy code, here are the rules and timer payloads I used. I found the syntax a little tricky (and there's no validation) so this might be useful.

Rule 1:

```
ON ENERGY#Current>1 DO Backlog Timer1 {"Enable": 0 }; publish state/%topic%/kettle 1 ENDON
ON ENERGY#Current<1 DO publish state/%topic%/kettle 0 ENDON
```

Rule 2:

```
ON Clock#Timer=1 DO publish state/%topic%/kettle -1 ENDON
ON Clock#Timer=2 DO Backlog Timer1 {"Enable": 1 }; publish state/%topic%/kettle 0 ENDON
```

Timer 1

```json
{
  "Mode": 0,
  "Enable": 1,
  "Time": "10:00",
  "Days": "SMTWTFS",
  "Repeat": 1,
  "Action": 3
}
```

Timer 2:

```json
{
  "Mode": 0,
  "Enable": 1,
  "Time": "03:00",
  "Days": "SMTWTFS",
  "Repeat": 1,
  "Action": 3
}
```


## The Telegram Client

I'll provide a link to the git repo with all the code, but this is the interesting part. I wanted the Telegram bot to be able to discover all the connected clients (the kettle smart plugs) because I intend to use this for our family's parents (whom live alone).

I used the two libraries for the grunt work: [telegraf](https://npmjs.com/telegraf) and [mqtt](https://npmjs.com/mqtt).

Once the client starts, I immediately subscribe to the Tasmota discovery channel `tasmota/discovery/#`. This means when retained messages on this channel are received, my code will know "who" the messages are coming from.

This code picks up the discovery messages and creates a map of device ID to device name:

```js
client.on('message', (topic, message) => {
  if (topic.startsWith('tasmota/discovery/') && topic.endsWith('/config')) {
    const data = JSON.parse(message.toString());

    // collect for mapping
    devices.set(data.t, data.fn[0]);

    // send a general message saying we found a device
    bot.telegram.sendMessage(channelId, `Discovered "${data.fn[0]}" device`);
  }
});
```

In addition to discover, in the `message` event I've also subscribed to my own custom `state/+/kettle` channel (where `+` is a wildcard). Then I when I receive messages on on this channel, I check if I've discovered the device, then handle the state change by posting a Telegram message:

```js
if (topic.startsWith('state/')) {
   // this is the kettle or an error
   const [, device, mode] = topic.split('/');
   const name = devices.get(device);

   if (!name) {
      // log error and then ignore
      return;
   }

   const value = parseInt(message.toString(), 10);
   if (value === 1) {
      bot.telegram.sendMessage(channelId, `${name} is boiling the kettle`);
   }
   if (value === 2) {
      // means the timer has expired and we expected them to have boiled
      bot.telegram.sendMessage(channelId, `⚠️ ${name} hasn't checked in`);
   }
}
```

There's not much more involved. If the MQTT server disconnects, a telegram message is fired. I'm also running the client using [PM2](https://pm2.io/) to keep it running.

Currently both the MQTT server and my Telegram client run on an AWS hosted server, but there's no reason I couldn't run this on a Raspberry Pi Zero from inside my house. So long as the DNS pointing to my internet connection is maintained and the Pi Zero is running (which I could set up some fail safe), then I'd have completely ownership of the system.

For now, this is a start and enough. Importantly, the Tasmota and MQTT allows the installation of this device to be very simple.

All that's required is that the smart plug is connected to the loved one's own Wifi and then the smart plug is configured to connect to the MQTT server. The rest of the configuration is handled remotely.

## Final thoughts

With systems like this, where I'm relying on technology to play a key role in my real life, it's all about making sure there's fail safes applied *everywhere*.

I prefer systems that don't require habitual change - i.e. it might be hard to for the loved one to create a new habit that they call someone every morning (though this is obviously an excellent low cost solution).

The risk here is when one part of the system fails. Even in writing this, I can see if the kettle smart plug disconnects, I'm not capturing that event - so that's straight forward for me to add, but obviously less moving parts for critical systems, the better.

The source code is available [on github](https://github.com/remy/kettle-notify).
