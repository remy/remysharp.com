---
title: when-do web component
date: 2026-07-24
tags:
  - web
  - code
---

I saw recently saw a blog post (which annoyingly I can't find any more, but I'll link it if I do), showing off a web component that if I recall correctly, would show (or hide) it's contents depending on a browser feature (I'd guess using the `@supports` query).

That reminded me that I wrote a web component that I use quite a bit (particularly with [FFConf](https://2026.ffconf.org)), which should really be called `do-when`, but it's not, it's (stupidly) called `when-do` (the dash, I guess, being a comma in my head).

The component says: `when` a time occurs or passes, `do` a `what`: show, hide or scroll-to.

You can get the code [from github](https://github.com/remy/web-components/tree/main/when-do) - which also includes an [interactive demo](https://github.com/remy/web-components/blob/main/when-do/example/index.html) that lets you try the settings.

<!-- more -->

## What it is

A small web component to toggle on or off depending on wall clock (date) time without affecting the visual layout (with it's own element).

## Use case

I've been using this web component on the FFConf event pages for a number of years to reveal the ticket button if a visitor is sitting on the page (though I appreciate that's unlikely!).

```html
<when-do what="hide" datetime="{ticket-live}">
<p>Tickets live at {nice-ticket-live}</p>
</when-do>
<when-do what="show" datetime="{ticket-live}">
<p>Buy <a href="…">now</a>
</when-do>
```

I've also used the `what="scroll"` for our schedule page, to automatically scroll to the current speaker.

Though I do appreciate my "battle testing" has been rather limited, so if you use this and spot bugs, please let me know!

## API

- `what="show|hide|scroll"` - the component also throws an exception if a non valid string is used
- `datetime="isodate"` - recommended that you include the timezone, ie. "2026-09-13T10:00Z" is 10am on 13th September on UTC
- `apply="classname"` optional class name to apply to the `when-do` element when it activates, useful if you wanted to transition your contents into view, or highlight the newly scrolled element

## How it works/styling

The web component makes use of `display: contents` to prevent itself from modifying the visual layout.

Due to this display method, it means you can't style the element directly, in that styling has no effect.

If you want to style the contents when the element is active, such as when it has been scrolled into view, it's recommended you wrap the child elements it a parent element, such as a `div`.

You can also use the `apply` property to indicate the current `when-do` has activated.

---

AI wasn't used in any part of this web component (which is also why the demo page is so ugly).