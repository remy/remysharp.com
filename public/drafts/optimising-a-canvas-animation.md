# Optimising a canvas animation

I've been working on a small canvas animation for [ffconf 2015](http://2015.ffconf.org) and realised two important optimisations that I've missed out on the past.

The net result: no more humming fan on my laptop.

<!--more-->

For the sake of brevity (and actually getting this post written under the usual *several hours*), I'm just going to talk about what I changed.

## Pinning FPS

I knew that the "right" approach was to use `requestAnimationFrame` (rAF) for animation, but my problems historically is that the call rate of my update function was way, way too often. This can either cause my animation to appear to be *too* quick, or results in the CPU overheating.

One nice advantage of rAF for animation is that it will stop firing when the tab is out of focus (i.e. if you switch to another tab). Whereas `setInterval` not only doesn't hit the timing you want, but it'll *keep* firing, burning up battery.

**TIL** `requestAnimationFrame` passes in a [high resolution timestamp](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame#Parameters) to the callback.

Using the timestamp, we can get a delta of the last run, and if, and only if, the last frame was drawn X FPS ago, then we'll draw a new frame. For example:

```js
var lastFrameTime = 0;
function draw(elapsedTime) {
  // calculate the delta since the last frame
  var delta = elapsedTime - (lastFrameTime || 0);

  // queue up an rAF draw call
  window.requestAnimationFrame(draw);

  // if we *don't* already have a first frame, and the
  // delta is less than 33ms (30fps in this case) then
  // don't do anything and return
  if (lastFrameTime && delta < 33) {
    return;
  }
  // else we have a frame we want to draw at 30fps...

  // capture the last frame draw time so we can work out
  // a delta next time.
  lastFrameTime = elapsedTime;

  // now do the frame update and render work
  // ...
}
```

## Minimise your paints

Originally my demo was drawing a number of squares that would scale towards the viewer giving the impression of movement. Initially innocuous:

```js
function draw() {
  // ... calculate x, y, scale, etc
  // makes the shape: |_|
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + y2);
  ctx.lineTo(x + x2, y + y2);
  ctx.lineTo(x + x2, y);
  ctx.stroke();
  ctx.closePath();
}

// update is called on a new frame
function update() {
  // ... update state then draw:
  for (i = 0; i < boxes.length; i++) {
    boxes[i].draw();
  }
}
```

This would be repeated for every "box" animating towards the viewer. Since I'm just drawing lines, I could batch all these together all in one go and group the collective shapes under one path, then run a *single* stroke:

```js
function draw() {
  // ... calculate x, y, scale, etc
  // makes the shape: |_|
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + y2);
  ctx.lineTo(x + x2, y + y2);
  ctx.lineTo(x + x2, y);
}

// update is called on a new frame
function update() {
  // ... update state then draw:
  ctx.beginPath();
  for (i = 0; i < boxes.length; i++) {
    boxes[i].draw();
  }
  ctx.stroke();
  ctx.closePath();
}
```

It's a fairly tiny optimisation, but the result is the same, but with less interaction with the canvas, and given we're aiming to be in and out quickly, it's not a bad thing.

## Single rAF handler




<!-- <a class="jsbin-embed" href="https://jsbin.com/zulaha/embed?js,output">JS Bin on jsbin.com</a><script src="https://static.jsbin.com/js/embed.min.js?3.30.3"></script> -->