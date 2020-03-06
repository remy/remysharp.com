---
title: Auto-growing inputs
tags:
  - code
date: '2020-03-06 10:00:00'
nosubscribe: true
---

# Auto-growing inputs

I was tinkering with an electron app I wanted to make for screencasting and it needed some input elements that were positioned in a very tight spot. As powerful as HTML and CSS is, one weird thing about the `input` elements is that they don't (typically) size to their content.

Then I found a post by [Ariel Flesler](https://github.com/flesler) from 2013 and with a little tweaking, all of a sudden input elements can size themselves to their content. What's cool (to me), is that I knew Ariel from back in the jQuery hey days (/waves).

<!--more-->

## The effect

As I mentioned, I had a very small amount of space but also I wanted the text in this particualr example to visually close to the next input. The effect can be seen below:

![Demo of autogrowing inputs](/images/input-grow.gif)

## Prior art

I've come across this problem in the past too. I posted two blog posts some 14 years ago! The first was [a full JavaScript solution](https://remysharp.com/2006/11/27/delicious-like-text-grow-jquery-plugin-2) to create the effect, more elegantly was the [so called bug in IE](https://remysharp.com/2006/11/27/auto-input-grow-with-css-but-is-it-a-bug-2), and IE only, using the following CSS would allow the `input` elements to grow to fix their contents:

```css
input { overflow: visible; }
```

How smart is that? Except it didn't work in any other browser, and it doesn't work today and thus it was quietly snuffed out.

What I really like about Ariel's solution though is that it requires no JavaScript at all and relies entirely on native features of HTML and CSS.

## Ariel's auto-grow

Based on Ariel's [CodePen demo](https://codepen.io/flesler/pen/AEIFc) which original intends to add placeholder support for contenteditable elemenent, I can adjust the code to use a `span` (instead of a `div`) and add a little CSS to improve upon his work (the CSS came from someone else via StackOverflow and comment on the CodePen demo IIRC).

The actual technique is frustrating obvious (but only once you know how), it uses `contenteditable`. Ariel's demo also shows how to include a placeholder and there's additional CSS that means that new lines are ignored (or more specifically: hidden).

```css
[contenteditable="true"]:empty:before {
  content: "0";
  color: gray;
}

/* prevents the user from being able to make a (visible) newline */
[contenteditable="true"] br {
  display: none;
}
```

The element itself is a `span`, so it appears inline and now it's automatically focusable through the keyboard.

In the demo animation above, I'm binding the keypress event handler to cycle a number up or down within limits I've defined in `data-*` attributes, but that's out of scope.

Like I said, suprisingly obvious once you know it's done using `contenteditable`.