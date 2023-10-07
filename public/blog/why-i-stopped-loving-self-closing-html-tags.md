---
title: 'Why I stopped (loving) self closing HTML tags'
date: '2023-10-09 10:00:00'
tags:
  - code
---

# Why I stopped (loving) self closing HTML tags

Specifically the [space] [slash] combo before the closing bracket: ` />`.

I've had history with these particular two characters, but until recently that history of going back and forth was entirely based on aesthetic.

Then React came along (or rather I climbed aboard) and I found myself _always_ adding the trailing slash to element regardless if they actually required it or not.

Then today, I got bit in the arse by a self closing tag and it reminds me of [Jake's very recent post on the exact same thing](https://jakearchibald.com/2023/against-self-closing-tags-in-html/).

<!--more-->

## When did it change from opinion to requirement?

I'd be remissed to suggest that React wasn't an important actor in the way that we (web devs) write code today - and even then I'm not actually referring to React but JSX, the bastard child that React shat out.

JSX makes consistent use of the trailing slash in self closing element. If you don't include the slash, it won't work. Even the `script` tag allows for a trailing slash:

```jsx
{'/* invalid JSX */'}
<script src="app.js">

{'/* valid JSX */'}
<script src="app.js" />
```

The thing that's easy to forget is that JSX is a language that only lives inside the React compilers. It _looks_ like HTML but it's not HTML, at all.

With the exception of the `script` tag, it's a convenience that I can reuse the HTML-like syntax in real HTML.

…Except that's not actually true, and that's how I got bit in the butt.

## When self closing doesn't self close

Given this code:

```html
<script src="app.js" />
<p>Oh nooos!!!!
<p>We're all lost :(
```

Everything following the script tag's "closing" marker is swallowed. It's swallowed because the HTML parsing routine doesn't recognise it as valid and then goes on to move the following tags as child nodes of the script element.

Maybe this is obvious, but there's a handful of HTML elements that have the same properties as the script tag, specifically:

1. Must be explicitly closed (using the closing tag)
2. Hide **and** ignore the nested content

This last point is important. Some others include: `iframe`, `textarea`, `video`, `audio` and `canvas` (though see [footnote](#footnote-1){#footnote-1-back}).

On one hand memorising a list of elements that require a closing tag is probably okay. It's not a huge list and given that I've got over 20 years experience in writing code (myself, rather than libraries or AI generators), I should be fine.

Where I got completely tripped up was with web components _and_ Prettier. I'll explain.

## Web Components require explicit closing tags

Web Components can (to me at least) have similar feelings to React. They're elements that don't exist as part of the spec and I've introduced them.

Except I already forgot that JSX is not HTML. Web Components, when writing the actual tag, is HTML. Web Components, if not properly closed will slurp up all the following markup.

So this doesn't _activate_ my Web Component at all, because the following script tag has been slurped and swallowed into a void:

```html
<hello-world />
<script type="module" src="hello-world.mjs"></script>
```

It's because of this specific case that I lost time trying to work out why a Web Component wasn't handling user interaction, because my eyes were _too_ used JSX, HTML-like syntax.

I know HTML well enough, and I care about my craft enough, that I'd rather have full control over these decisions, and in HTML I'd rather code knowing there's two types of tags: those that require closing and those that don't. I don't want to deal with a third kind (the trailing slash kind).

```html
<!-- just two types of tags -->
<title>It must be closed</title>
<input value="does not need close">

<!-- the three kinds, which I don't like -->
<title>It must be closed</title>
<input value="does not need close">
<br /> <!-- but sometimes we do 🤷‍♂️ -->
```

Except Prettier (which I use in VS Code upon save) *insists* on three kinds. Specifically, it will always convert `<input>` to `<input />` - which, as Jake said right up front in [his post](https://jakearchibald.com/2023/against-self-closing-tags-in-html/), I don't think is a good thing (and neither does the [five year (currently) running open](https://github.com/prettier/prettier/issues/5246) issue on Prettier).

So, I'm left in a bit of a pickle. When my code autoformats, it'll format it in a way that I don't agree with, and so I write this post remind myself try to remember to _not_ write the trailing slash, and close explicitly, even if it feels a little ugly!

---

<small id="footnote-1">_Footnote:_ Importantly with `canvas` (and I'm not sure if this applies to other elements), any elements inside do make up part of the DOM and are there for assistive technologies, such as screen readers. ([back](#footnote-1-back))</small>
