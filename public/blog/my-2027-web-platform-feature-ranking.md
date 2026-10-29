---
title: 'My 2027 Web Platform Feature Ranking'
date: '2026-10-29'
tags:
  - web
  - standards
  - w3c
---

# My 2027 Web Platform Feature Ranking

Like my peers, I've decided to publish my personal ranking preference for the 2027 interop project.

I'm doing this from a phone, so I can't link to the others that have published theirs, but I think it's interesting to see and compare what we feel is important.

<!-- more -->

I did want to also comment on my ordering process. Originally I had something like 20 selected items, and even after using the "hot or not" selection process, my list is still pretty long. 

The `Temporal` API landed at the top because I think the `Date` object is one of the most cursed JavaScript APIs and anyone who's had to wrangle dates definitely deserves some respite - and I get the sense it close to done (though that's utterly unvalidated).

The rest of my choices are based around compatibility and accessibility support, until the WebUSB and onwards (I had more submitted but appreciate it's probably the top 3 that are valuable).

The transition on `display` is a gotcha for many, and causes a jarring effect when moving from `none`.

The `at-rule` isn't something I originally knew about until seeing the interop list, but being able to test makes for a better progressive enhancement (I think!).

Then it's security with the sanitiser and accessibility on `ariaNotify` and the WebDriver BiDi (which, yes, as a Brit I read this as an old lady in an electric wheelchair driving the web) - the better we can automate actually browsers, the better our tests *will* be. 

So here's my list. Thanks to others for publishing theirs and thusly encouraging me to do so 🙏

1. [JavaScript `Temporal`](https://github.com/web-platform-tests/interop/issues/1381). A modern and extensive date/time API to replace `Date`.
2. [Allow CSS transitioning/animating `display` and `content-visibility`](https://github.com/web-platform-tests/interop/issues/1384). Useful for delaying `display: none` until an exit animation completes.
3. [CSS `@supports at-rule()`](https://github.com/web-platform-tests/interop/issues/1434). Checks if a CSS at-rule is supported.
4. [Sanitizer API, via `document.parseHTML()` and `element.setHTML()`](https://github.com/web-platform-tests/interop/issues/1336). Customizes the sanitization of HTML inserted into the DOM, to prevent cross-site scripting attacks.
5. [`ariaNotify()`](https://github.com/web-platform-tests/interop/issues/1387). Requests that assistive technology, such as a screen reader, announces a message to the user.
6. [WebDriver BiDi](https://github.com/web-platform-tests/interop/issues/1417). A new protocol for browser automation, extending 'classic' WebDriver by introducing bidirectional communication.
7. [WebVTT](https://github.com/web-platform-tests/interop/issues/1447). WebVTT files are loaded using the `<track>` element, and the `VTTCue` API can be used to create or update cues dynamically.
8. [CSS `var()` in size container queries](https://github.com/web-platform-tests/interop/issues/1344). Such as `@container (width >= var(--min-width))`.
9. [WebUSB API](https://github.com/web-platform-tests/interop/issues/1331). Exposes USB-compatible devices to web pages.
10. [Web app installation via `<install>` and `navigator.install()`](https://github.com/web-platform-tests/interop/issues/1430). Prompts the user to install a progressive web app.