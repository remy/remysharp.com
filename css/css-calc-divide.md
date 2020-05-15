# CSS calc's divide is unitless only

On the iPhone 8 the `env(safe-area-inset-left)` value is `0px` but on the iPhone 11 it's (around) `40px`. To use this information to offset elements correctly, I wanted to use `calc` to generate `10px` and `40px` respectively.

The first thing: `calc` does not let you divide with a unit, like `px` (and multiplication requires _one side_ to have a unit).

For the maths, I ended up with this (sorting the desired value in `--env-margin`):

```css
:root {
  --tmp-a: calc(env(safe-area-inset-left) / 13.3333333);
  --tmp-b: calc(var(--tmp-a) + 1px);
  --env-margin: calc(var(--tmp-b) * 10);
}
```

This ensures that the source value is never a denominator and gets pretty close to my values.

But there's more. CSS has `max` (and `min`) and in fact all I needed was:

```css
:root {
  --env-margin: max(env(safe-area-inset-left), 10px);
}
```

Took me about 4 hours to work that one out.
