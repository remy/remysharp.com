# Firefox devtools notes

A week of Firefox devtools.

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

## Misc issues

- Keyboard shortcuts seem to exist, but the documentation seemed to be lacking. I found the browser shortcuts webpage (which wouldn't be useful if coding offline), but it only listed a few

## Misc awesome

- Event listeners on DOM nodes visible from the inspector view *and* being able to set breakpoints directly from there - very cool.