---
title: 'text-decoration-thickness discrepancies'
date: '2026-09-10 21:00:00'
tags:
  - web
  - css
  - quirks
---

# text-decoration-thickness discrepancies

I'm in the process of (attempting) to redesign this blog, and in doing so, I'm using a few of the new bits (to me) of CSS to make things fancy.

In this instance, I'm using `text-decoration-thickness` on my titles, and wanted to document the quirks I noticed.

<!-- more -->

**Worth adding** this is the state at time of writing on stable releases (ie. non-preview builds). That time of writing: September 2026.

## What I'm doing

On blog post headings are marked up as `h1 > a.permalink(href)`. The effect is: the title is not visibly underlined, and when you hover, the underline eases in over 50ms to a thickness of 4px.

```css

a {
  text-decoration-thickness: 0;
  transition: text-decoration-thickness 200ms ease-out;

  &:hover {
    text-decoration-thickness: 4px;
  }
}
```

As this specific link is marked up as the permalink (the [microformats](https://microformats.org/) die hard), it's a link to the page we're reading. As such, I make a exception and (even on this pre-redesign page) the link doesn't look like a link.

(I was going to end there, but want to acknowledge the a screen reader is still going to raise this as a link, and… I don't have a good work around for this yet - and yes, that's shitty of me - I'm trying to improve)

All other links have the underline visible, then on hover have the same animated effect to thicken out the underline.

## What Firefox does

It does exactly what I expected. And actually until I switched to give a cursory test of Chrome, I didn't actually expect to see anything different.

<video controls src="/images/text-decoration-thickness-firefox.mp4"></video>

## What Safari does

Safari doesn't animate the transition from `text-decoration-thickness: 0px` to `4px` - it just jumps into place.

<video controls src="/images/text-decoration-thickness-safari.mp4"></video>

## What Chrome does

My daily browser is Firefox, but I have a tendency to (lazily) assume that things "just work" in Chrome. Not a great strategy, eh?

Chrome has no animation, but moreover, a `text-decoration-thickness` of zero height is… still there.

<video controls src="/images/text-decoration-thickness-chrome.mp4"></video>

A note [on Chrome's implementation](https://bsky.app/profile/patrickbrosset.com/post/3mvaa3gy5uc2b), it was spec compliant, then it wasn't - so, I guess it's playing catchup.

Ah well, I guess it's a progressive enhancement.
