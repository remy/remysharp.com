---
title: 'CSS sticky nav & smooth scroll (#3/3)'
date: '2017-06-29 17:30:59'
modified: '2017-06-28 17:56:51'
tags:
  - code
published: true
---
# CSS only sticky nav and smooth scroll (part 3/3)

In the last 2 posts, I wrote about best practises around handling scroll events and then how to combine a sticky nav with smooth scrolling. Both solutions required JavaScript, but there's solutions right around the corner that allows us to do away with all the JavaScript and let the browser do all the work with a few directions from CSS.

<!--more-->

Firstly, I've replicated the ffconf2016 site and stripped out all the JavaScript that ran the smooth scrolling and sticky nav.

Then I turn to two CSS properties:

- `position: sticky` - currently [supported](http://caniuse.com/#feat=css-sticky) in Firefox, Chrome and Safari
- `scroll-behavior: smooth` - currently [supported](http://caniuse.com/#feat=css-scroll-behavior) in Firefox only

The effect is exactly what I want and the final code is extremely light compared to the original JavaScript version.

<video loop controls muted width="640">
  <source src="/images/css-sticky.webm" type='video/webm;codecs="vp8, vorbis"'/>
  <source src="/images/css-sticky.mp4" type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"'/>
</video>

## Implementation details

The `scroll-behavior` is applied directly on the `html` element so that it applies to whole window scrolling.

The `position: sticky` always catches me out. First I applied it to the navigation element, but this doesn't work because it's sticky to it's parent, and the parent doesn't have an inner scroll. The `html` element is the element that's scrolling, so the stickiness is applied to the whole header element on the page (that includes the navigation bar).

Since the sticky is applied to the entire header block (which is the height of the page), the `top` position for the sticky element, needs to be the height of the header element (`100%`) less the height of the navigation (in my case `100px`). So I'm going to make use of the excellent CSS `calc` value (which is [very well supported](http://caniuse.com/#search=calc)): `top: calc(-100% + 100px)`.

The final code is shown below. I've only applied it when the navigation is full present, in my case at `> 768px` wide, and I've had to tweak the header component to use flex box to keep it set to the height of the window (note that this in only specific to my case, it's likely you wouldn't need this).

```css
@media all and (min-width: 768px) {
  html {
    scroll-behavior: smooth;
  }

  #masthead {
    position: sticky;
    top: calc(-100% + 100px);
    /* make sure stick above images */
    z-index: 1;

    /* tweaks to the ffconf design
       to keep the height right */
    display: flex;
    flex-direction: column;
  }

  .logo-wrapper {
    flex-basis: 85vh;
  }
}
```

[Full working demo here](https://css-smooth-sticky-demo.now.sh/) - currently only Firefox supports both `position: sticky` *and* `scroll-behavior` so it's best viewed there. But you can also see it working nicely (without enhancements) in Chrome and other browsers.
