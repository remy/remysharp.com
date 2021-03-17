# Perfect fullscreen 4:3 aspect ratio

I had been tinkering with a game/toy in the browser where the playable area was 256x192 using a canvas element. Then to scale up on the desktop computer, I used the following CSS to scale and keep the pixels crisp:

```css
canvas {
  width: 100%;
  image-rendering: pixelated; /* for blink */
  image-rendering: crisp-edges; /* for all others */
}
```

Which is great, except for when the browser width (viewport more specifically) is wider than the height of the browser by more than 33% (or is it 25%? ¯\\_(ツ)_/¯). Specific, eh? i.e. the aspect ratio of the browser moves above 1.333 (repeating).

At this point the bottom of the canvas gets cropped which I didn't want.

I searched and found [some really interesting solutions](https://css-tricks.com/aspect-ratio-boxes/), but none fitted the specific use case that was: 4:3 of the element and not bigger than 4:3 of the viewport.

I did learn about the [`aspect-ratio` CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio) (though currently prefixed with `--aspect-ratio`) - which is great, but still doesn't fit my problem.

The solution, I happened to stumble upon is annoyingly simple (…obviously in retrospect): use `max-width` with an aspect ratio:

```css
canvas {
  max-width: calc(100vh / 3 * 4);
  width: 100%;
  image-rendering: pixelated; /* for blink */
  image-rendering: crisp-edges; /* for all others */
}
```

I've gone for a more verbose version of aspect ratio, but this `max-width` is also the same as (or rather: very close to) `100vh * 1.3` (though `100vh / 3 * 4` is technically closer).

Now my canvas doesn't scale beyond the height of my screen.
