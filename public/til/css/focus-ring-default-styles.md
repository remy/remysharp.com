# Focus ring default styles

I've been tinkering on a tool that has a custom UI but I wanted to still support keyboard navigation and with keyboard navigation comes tabbing to focus elements.

I have an element that is an underlying checkbox, but toggles between the label of "T" and "-", so I'm using CSS to change visual state:

```css
.bool input:checked + label.t::before {
  content: 'T';
}
.bool input + label::before {
  content: '-';
  width: 100%;
  font-size: inherit;
  line-height: inherit;
}
```

The problem was that when I tabbed focus to the checkbox, the label text didn't look focused. I could add a border (or something) to the label, but I wanted it to look the same as the browser default focus ring.

TIL: Firefox has a `Highlight` that compliments webkit's focus ring colour, and (thankfully) Firefox ignores the `-webkit-` prefixed colour:

```css
.bool input:focus + label::before {
  outline: 5px auto Highlight;
  outline: 5px auto -webkit-focus-ring-color;
}
```

Now it looks right:

![TIL: focus rings](/images/til/focus-rings.png)
