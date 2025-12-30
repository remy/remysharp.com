---
title: Code I can delete after all this time
date: 2025-11-30
draft: true
tags:
  - web
---

# Code I can delete after all this time

For the last few years my work-work has mostly focused on back end software (particularly around APIs). This meant that any front end work I was doing was for myself.

Being an long-in-the-tooth old dog, I tend to learn and trick, and roll it out again and again typically without taking the time to find whether I still need the trick. Case and point, I learnt about the JavaScript performance trick of `~~float` to floor a value (and the same `float | 0`) but really these days it's not "faster" than doing it the legible way.

Given I've had a bit of time away from the backend, here's an unorganised list of things I've found I can use, and thusly remove extra code that I no longer need.

<!-- more -->

## The list

- CSS: `text-underline-offset`
- CSS: `gap`
- CSS: nested simplified media queries `h1 { font-size: 1rem; @media (min-width: 600px) { font-size: 2rem; } }`
- CSS: `clamp`
- CSS: `content: open-quote` localised quotes
- JS: `catch` without catching the variable
- JS: pointer events have improved (though still from experience they're not 100% perfect) but are to replace the double click+touch handlers
- avif images are fully supported - easily getting 50% file size savings