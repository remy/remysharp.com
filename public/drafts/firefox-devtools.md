# Firefox devtools notes

A week of Firefox devtools. Please note that this document is for me to recall issues (or good things) I encountered during immercing myself in devtools (instead of Chrome devtools) and I am also recording screencasts of my sessions which (I may edit) and hope to send to the devtools team (if they think it'll be useful).

---

35.0a1 (2014-09-30)

## Task: change font weight

- Increase font size - hover information and style editor code complete is not aligned
- Styles panel in elements is not linked to the style editor. Changes aren't linked so editing doesn't reflect.
- Unsure what green line is next to in the inspector view against CSS changes
- SVG icons for warnings (when CSS isn't valid)
- For compressed CSS, inspector view says "screen.css:1", but the styles editor automatically "pretty prints" so there's no link between line 1 and the style editor view
- In inspector, space is auto completed to `!important` regardless of cursor position *or* actual CSS property

## Task: fix padding on heading

- Box model view: isn't clear what is padding/margin/etc - since everything is highlighted when I hover over box model. Took me a while to cognitively link the value to the visual area on the page
- Changing the padding in the box model view was very/unusably slow
- Responsive view: Great tool, would be great if I could use the cursors to change the height & width of the

## Task: fix jsbin's linting not appearing

- Most time spent in debugging panel to solve this problem
- Find is excellent, really like that I can use special commands like ! and @ for code wide or function definition searches.
- Find's function definition search having the object property next to function name is very useful
- Also really liked the stack trace breadcrumbs across the top of the source - very easy to navigate
- Had some weird issues where the debugger would get lost, and no longer be in a paused state
- Big issue when code was paused and I stepped back using stack trace, it would jump to totally arbitrary line of code, and not the executed line, however the green arrow indicating the execution took "this route" was a very useful visual tool
- Was a shame that I couldn't change the code whilst in a paused state - I'm very used to debugging this way in chrome
- I tried to hide away the list of source files…and managed, but then couldn't get it back - and then the hover to inspect object would randomly cause the source list to reappear (then vanish), so the ui would jump under my cursor a lot
- Hover to inspect was quite powerful, though I found it hard to get the actual property that I was interested in


---

## Misc issues

- Keyboard shortcuts seem to exist, but the documentation seemed to be lacking. I found the browser shortcuts webpage (which wouldn't be useful if coding offline), but it only listed a few

## Misc awesome

- Event listeners on DOM nodes visible from the inspector view *and* being able to set breakpoints directly from there - very cool.
- Find (cmd+o and cmd+p - same effect) is very cool with the command prefixes: ! @ # *
