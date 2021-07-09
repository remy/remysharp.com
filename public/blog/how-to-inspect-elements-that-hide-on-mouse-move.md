---
title: 'How to inspect elements that hide on mouse move'
date: '2021-07-09'
tags:
  - code
---

# How to inspect elements that hide on mouse move

Specific blog post title, eh? But very specific problem that's a pain in the backside when it comes to debugging it.

How do you inspect an element that hides on mouse move? Such as a tooltip (though I'm not a fan of the UI element, if only for the lack of accessibility) it's certainly not obvious.

<!--more-->

This is a short post on how to keep elements from hiding allowing me to inspect the elements in devtools.

I'm also afraid that this only works in Chrome - because Firefox triggers a mouse move at the point I want to capture the newly visible element and thusly hides again before I can debug.

Here are the steps:

1. Prepare by opening devtools and setting it open in a separate window (whilst in devtools, open the palette by using ctrl or cmd + `p` - then type _>undock_)
2. Now focusing on the browser window again, hover over the triggering element and leave the mouse pointer where it is
3. **Using the keyboard** switch focus to devtools - on a mac that's cmd+`` ` `` (backtick), otherwise you can use the "Developer Tools" shortcut (again, mac is cmd+alt+`I`)
4. Now in the console type `debugger` - if you're not focused on the console, switch using ctrl or cmd + `[` and `]` to move panels
5. Now the browser is in a hung mode, no JavaScript can run, you're free to inspect the exposed element and debug the CSS.

If those steps weren't entirely obvious, I've included a video walk-through below:

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/e3giXinNiP8" title="YouTube video player" frameborder="0" allow="picture-in-picture" allowfullscreen></iframe>

That all said and done, I had to debug an existing system, but when it comes to hover effects, at the very least toggling a CSS class makes it a lot easier to debug. It also means it can be a default state of shown if there's no JavaScript (for instance).

Even better: don't resort to help that's hidden to the visitor by default!
