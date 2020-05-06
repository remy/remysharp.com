# Mobile device selector

As much as it pains me, I've been working on a project that is _nearly_ responsive but wants the "mobile" design to only appear on mobile phones, and *not* on desktop devices (aka: laptops, etc).

Tablets are a grey area…

At first I took the approach of a `max-width` media query:

```css
@media screen and (max-width: 900px) {

}
```

But this catches the desktop popup window (which launches under 900 pixels wide), so I discovered the `hover` media query:

```css
@media screen and (max-width: 900px) and (hover: none) {
  
}
```

This means the device does not have hover capabilites (i.e. a mouse), except… of course… the OnePlus range of phones reports to have hover capabilities. So the last part of the puzzle is what type of pointer this is, in the OnePlus' case it's `coarse`:

```css
@media screen and (max-width: 900px) and (hover: none), (max-width: 900px) and (pointer: coarse) {

}
```

Though, this still treats iPad in portrait as mobile and in landscape as desktop - but that's why it should really, simply be, mobile first.
