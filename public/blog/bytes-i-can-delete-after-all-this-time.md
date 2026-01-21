---
title: Bytes I can delete after all this time
date: 2026-01-13 10:00:00
tags:
  - web
---

# Bytes I can delete after all this time

For the last few years my work-work has mostly focused on back end software (particularly around APIs). This meant that any front end work I was doing was for myself.

Being an long-in-the-tooth old dog, I tend to learn and trick, and roll it out again and again typically without taking the time to find whether I still need the trick. Case and point, I learnt about the JavaScript performance trick of `~~1.4 === 1` to floor a value (and the same `float | 0`) but really these days it's not "faster" than doing it the legible way (i.e. `Math.floor(1.4)`).

Given I've had a bit of time away from the backend, here's an unorganised list of things I've found I can use, and thusly remove extra code that I no longer need.

<!-- more -->

## The list

1. CSS: `text-underline-offset` - the distance I can set the <span style="text-decoration: underline; font-family: 'Ubuntu Mono'; text-underline-offset: 12px">text-underline-offset: 12px</span>
2. CSS: `gap` - no more faffing with margins in flexbox.
3. CSS: nested media queries on selectors (and nesting general):

  ```css
  h1 {
    font-size: 1rem;
    @media (min-width: 600px) {
      font-size: 2rem;
    }
  }
  ```
4. CSS: `clamp(min, variable, max)` - I used this extensively on FFConf 2025's [css](https://github.com/leftlogic/ffconf2025/blob/fdb687636450058afbfb67c846a32667bdbe6c8e/style.css#L62), the process of finding the right values is very much
5. CSS: `content: open-quote` can localised quotes _and_ the `q` tag does this by default, [via this neat insight from Stefan Judis](https://www.stefanjudis.com/today-i-learned/how-to-use-language-dependent-quotes-in-css/)
6. JS: `catch` without catching the variable, let's me get past the `'error' is defined but never used`:

  ```js
  try {
    doTheDodgyStuff();
  } catch {
    // nothing, it's fine
  }
  ```

7. JS: pointer events have improved (though still from experience they're not 100% perfect) but are to replace the old double click & touch handlers nonsense as seen in [the W3C spec](https://www.w3.org/TR/pointerevents/#example_1)
8. AVIF images are fully supported - I benefited from a train ride with [Jake Archibald](https://jakearchibald.com/) and in chatting I discovered AVIF are very well supported. This means [easily getting 50% file size savings on JPEGs](https://github.com/remy/remysharp.com/commit/19a32efcb719d1b125017577e48330606ef20ef7#diff-43c10c1d3f992c362c956760385e6ad7397a2345f90c0709e2d4da765ab2d255). I'm regularly running the [avidenc](https://github.com/AOMediaCodec/libavif/) command in directories:

  ```sh
  ls *.jpg | xargs -P 8 -I {} avifenc -q 50 "{}" "{}".avif
  ```

So that's my little list.

Not even 10 things. I guess I've not learnt much yet, but even though I return to the server side of APIs in 2026, I'm sure I'll be kicking the tyres in the front again soon enough and adding to my measly list.