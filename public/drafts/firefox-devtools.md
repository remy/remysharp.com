# Firefox devtools notes

A week of Firefox devtools. Please note that this document is for me to recall issues (or good things) I encountered during immercing myself in devtools (instead of Chrome devtools) and I am also recording screencasts of my sessions which (I may edit) and hope to send to the devtools team (if they think it'll be useful).

**Important note:** When I ran Nightly for the first time (just before the screencasts), I was asked if I wanted to opt-in to multi-process test feedback. I said yes (I had a new laptop, and I was trying to help out). As it turns out, that multi-process mode happened to cause a lot of the buggyness that I was seeing in the first half of my testing. I'm not *100%* what was affected, but it was [definitely a factor](https://twitter.com/canuckistani/status/520332616688345088).

---

Build: 35.0a1 (2014-09-30)

## Task: change font weight

- Increase font size - hover information and style editor code complete is not aligned
- Styles panel in elements is not linked to the style editor. Changes aren't linked so editing doesn't reflect.
- Unsure what green line is next to in the inspector view against CSS changes
- SVG icons for warnings (when CSS isn't valid)
- For compressed CSS, inspector view says "screen.css:1", but the styles editor automatically "pretty prints" so there's no link between line 1 and the style editor view
- In inspector, space is auto completed to `!important` regardless of cursor position *or* actual CSS property

Video: https://www.youtube.com/watch?v=_37j1cU5VWU (3m44s)

## Task: fix padding on heading

- Box model view: wasn't clear what is padding/margin/etc - since everything is highlighted when I hover over box model. Took me a while to cognitively link the value to the visual area on the page
- Changing the padding in the box model view was very/unusably slow
- Responsive view: Great tool, would be great if I could use the cursors to change the height & width of the element

I can't find the video for this, so I'll try to find the time to capture a gif of what I mean in the first point...damn screenflow kept crashing on me :(

## Task: fix jsbin's linting not appearing (note: run in Firefox, not Nightly - sorry!)

- Most time spent in debugging panel to solve this problem
- Find is excellent, really like that I can use special commands like ! and @ for code wide or function definition searches.
- Find's function definition search having the object property next to function name is very useful
- Also really liked the stack trace breadcrumbs across the top of the source - very easy to navigate
- Had some weird issues where the debugger would get lost, and no longer be in a paused state
- Big issue when code was paused and I stepped back using stack trace, it would jump to totally arbitrary line of code, and not the executed line, however the green arrow indicating the execution took "this route" was a very useful visual tool
- Was a shame that I couldn't change the code whilst in a paused state - I'm very used to debugging this way in chrome
- I tried to hide away the list of source files…and managed, but then couldn't get it back - and then the hover to inspect object would randomly cause the source list to reappear (then vanish), so the ui would jump under my cursor a lot
- Hover to inspect was quite powerful, though I found it hard to get the actual property that I was interested in

Video: https://www.youtube.com/watch?v=vaiC0N64bwg (37m47s)

Build: 35.0a1 (2014-10-02)

## Task: add keyboard support to JS Bin navigation (v1)

- Nightly seemed to break entirely: picking an element from the page became sticky and wouldn't stop highlighting elements (see video)
- Firefox stable (32.0.3) I couldn't open the devtools at all from keyboard command. Using menu opened devtools, but it appeared blank.
- Returned to Nightly (after restarts of devtools) and devtools works again...
- Constrast for highlighted element from picker (on dark theme) was so low I thought it was broken (switching to light theme made this much clearer)

Video: https://www.youtube.com/watch?v=4muwlibj6zA (9m47s)

## Task: add keyboard support to JS Bin navigation (v2)

- Opening and closing devtools too quickly would seem to break devtools and require browser restart to fix
- I'd love to be able to hide the sources, call stack, etc. (in both orientations) - it takes up a lot of precious space when using the source of JS + console to debug
- When devtools is full screen, when I inspect an element on the page, devtools doesn't come in to focus: I would expect it to, because my intent is to inspect the element using devtools.
- When devtools is open, and I reload the page, the source on debugging panel doesn't update. So the code appears to be stale, yet running in memory is fresh (because I can see console.logs working when they don't appear in the source). Opening and closing devtools works around this.

Video: https://www.youtube.com/watch?v=6GLyaChRBgg (42m47s)

## Task: debug errors from console code

- Works as expected, if break on exceptions is turned on, running buggy code in the console, *correctly* breaks excution and pauses
- Debugger doesn't take focus
- The console also doesn't work when the debugger is paused...but this might just be a natural state of debugging the console means you can't use the console..!
- The debugger settings cog feels like it should be click to open, not mouse down to open - as mouse up clicks first item and reloads page

Video: https://www.youtube.com/watch?v=TNMqFkrgC5I (5m08s)


## Task: debug why an element is not visible (intend to use 3D viewer)

35.0a1 (2014-10-07)

- Generally exactly what I expected. 3D video is super useful for identifying DOM pile ups
- The zoom in/out was a little overly sensitive, but suspect that might be mixed with the 3D rendering and mouse input

Video: https://www.youtube.com/watch?v=BQ5H-R20Dho (11m02s)

## Task: use network panel to check and test headers on image uploads

- "Edit and send" on individual network items is very useful, particularly with server debugging
- Firefox devtools gave me everything I'd expect from the network tools for this particular task
- One issue though: with a cached image (in jsbin's output) - the network request was not appearing *at all*. This was confusing because I wasn't sure if the request was being made or not...

Video: http://youtu.be/maohiQY29_U (14m02s)

Missing network request: http://youtu.be/maohiQY29_U?t=8m56s

---

## Misc issues

- Keyboard shortcuts seem to exist, but the documentation seemed to be lacking. I found the browser shortcuts webpage (which wouldn't be useful if coding offline), but it only listed a few

## Misc awesome

- Event listeners on DOM nodes visible from the inspector view *and* being able to set breakpoints directly from there - very cool.
- Find (cmd+o and cmd+p - same effect) is very cool with the command prefixes: ! @ # *
- Event listeners on DOM, then click on code line to see actual code - super cool.
- Network: edit and send - super handy!