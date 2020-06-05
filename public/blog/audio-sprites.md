---
title: Audio Sprites (and fixes for iOS)
date: '2010-12-23 15:03:48'
published: true
tags:
  - audio
  - code
  - html5
  - ios
  - javascript
modified: '2014-09-03 16:15:12'
---

# Audio Sprites (and fixes for iOS)

I recently had to work on a project for iOS that required that sound play on particular actions being performed. The problem is that iOS and HTML5 has been seriously oversold by Apple and the devices are pretty poor in comparison to the desktop. Audio and video are particularly poor, so to solve my problem I used an audio sprite, a technique that was similar to CSS sprites, just for audio.

<!--more-->

## The Problems

I'll first explain some of the problems I encountered, because these issues are particular to iOS - but could be common to mobile devices.

1. iPhones don't like playing too much audio at once, it gets very choppy.
2. iPads don't play more than one audio stream at once. There's some good info on 24 Ways, in the [State of Audio - Early Findings](http://24ways.org/2010/the-state-of-html5-audio) - sadly this was published after I discovered this for myself!
3. iOS won't download the audio unless the user initiates the action.
4. There's about a 1/2 second delay before iOS is able to play the audio - this is because the audio object (in iOS, not HTML5) is being created.

Given some of these problems, multiple audio files wasn't going to solve my problem, so I needed to create a sprite for my audio and work with that in iOS.

## Audio Sprite

If you think CSS sprite, just with audio, then you'll already know that each playable part of a sprite should be the same size. That said, you could program your app to have variable size sprites - but I just think it's easier to build and develop with if they're the same size.

So if your audio is 1 second long, and you want 10 audio clips to play, you need a sprite that's 10 seconds long. Not rocket science.

One thing I did notice: using Audacity to create the sprite, shifted all the audio. This may have been me messing things up, but it's something I consistently noticed, so I adjusted for it in the code using a lead time (something that's included in the final source code). Not ideal though, really you want each sprite to start on the 10s modulus 1s increment.

## Audio Sprite Track

The concept of playing a sprite is simple. You pass the index of the audio you want to play, and the track moves the playhead to index times sprite length and starts playing. You also need to know when to stop the sprite, so that's the start time + sprite length, and there's a `setInterval` that's constantly watching for when to stop.

Here's what the track code would look like (note that we've not fixed all the iOS issues yet):

```js
function Track(src, spriteLength) {
  var audio = document.createElement('audio');
  audio.src = src;
  audio.autobuffer = true;
  audio.load(); // force the audio to start loading...doesn't work in iOS
  this.audio = audio;
  this.spriteLength = spriteLength;
}

Track.prototype.play = function (position) {
  var track = this,
    audio = this.audio, // the audio element with our sprite loaded
    length = this.spriteLength, // the length of the individual audio clip
    time = position * length,
    nextTime = time + length;
  audio.pause();
  audio.currentTime = time;
  audio.play();
  // clear any stop monitoring that was in place already
  clearInterval(track.timer);
  track.timer = setInterval(function () {
    if (audio.currentTime >= nextTime) {
      audio.pause();
      clearInterval(track.timer);
    }
  }, 10);
};
```

## Fixing the iOS issues

The biggest problem with iOS is that the audio hasn't loaded at all. So when we try to set `audio.currentTime = time` a fatal JavaScript error will be thrown because the audio doesn't have that length loaded and all the code will go to crap.

So we need to wrap it with a try/catch:

```js
try {
  audio.pause();
  audio.currentTime = time;
  audio.play();
} catch (e) {
  // what now?
}
```

But now we've wrapped it in a try/catch, what do we do? We could play the audio and keep try/catching to move the `currentTime` but the problem is that the audio will start playing in the wrong place.

What we need to do is _try_ to play the audio, and as soon as it has loaded the data for the audio, pause it, move to the right position and _then_ start playing again. This is the tricky bit.

From experimenting with iOS, I found that the `progress` event was the one that told me I had enough data to fast forward _before_ the user heard any sound. I would have expected this to be `canplay` or `canplaythrough` - but alas, this is iOS and all is not what you'd expect!

So if the catch in our code fires, we need to listen for the `progress` and then try to set the currentTime. So I'm changing the catch to this:

```js
try {
  audio.currentTime = time;
  audio.play();
} catch (e) {
  track.updateCallback = function () {
    track.updateCallback = null;
    audio.currentTime = time;
    audio.play();
  };
  audio.play();
}
```

Now inside the `Track` object function, I've also adding the following code:

```js
var track = this;

var progress = function () {
  audio.removeEventListener('progress', progress, false);
  if (track.updateCallback !== null) track.updateCallback();
};

audio.addEventListener('progress', progress, false);
track.updateCallback = null;
```

This means that we're listening for the `progress` event, and when it fires for the first time, we remove the handler, and if there's a callback, we'll call it. The `progress` is triggered by trying to play. So now we've got it jumping to the right point, but we still have the 1/2 second delay.

That we're going to _try_ to fix by preloading the audio secretly in the background. Since the audio can only be loaded when the user clicks, let's listen for that at the top level of the document and kick off the audio loading. However, the only way you can start the audio loading is by playing it. So that's what we'll do, but once the `play` event fires, we'll pause it right away to stop the audio from playing back, but forcing it to move on to the `progress` event.

Again inside the new track object, we add the code to try to load the audio:

```
var force = function () {
  audio.pause();
  audio.removeEventListener('play', force, false);
};
audio.addEventListener('play', force, false);

var click = document.ontouchstart === undefined ? 'click' : 'touchstart';
var kickoff = function () {
  audio.play();
  document.documentElement.removeEventListener(click, kickoff, true);
};
document.documentElement.addEventListener(click, kickoff, true);
```

Now we're try to forcibly load the audio as early as possible, which will trigger the `progress` event, which in turn will allow us to set the `currentTime` correctly in our audio sprite.

## The completed code

I've also implemented a simple player to allow you to utilise multiple tracks (something that works very well on the desktop) or you can use a single track object directly. The completed code, with a few more comments and attempts to mute the audio has been included in a gist: [HTML5 audio sprites](https://gist.github.com/753003)
