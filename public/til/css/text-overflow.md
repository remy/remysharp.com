# Text overflow

I know about CSS's `text-overflow: ellipsis` but it nearly never works first time for me. I totally missed that the property needs **two** other properties in play against the element:

```css
overflow: hidden;
white-space: nowrap;
```

It's that second one, the `white-space` I *always* forget!
