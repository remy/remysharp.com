---
title: 'Why I stopped loving slashes in self closing tags'
date: '2023-10-09 10:00:00'
tags:
  - code
---

# Why I stopped loving slashes in self closing tags

Specifically the [space] [slash] combo before the closing bracket: ` /`.

I've had history with these particular two characters, but until recently that history of going back and forth was entirely based on aesthetic.

Then React came along (or rather I climbed aboard) and I found myself _always_ adding the trailing slash to elements, regardless of whether I was writing React or plain old HTML.

Then today, I got bit in the arse by a self closing tag and it reminds me of [Jake's very recent post on the exact same thing](https://jakearchibald.com/2023/against-self-closing-tags-in-html/).

<!--more-->

## When did it change from opinion to requirement?

I'd be remissed to suggest that React wasn't an important actor in the way that we (web devs) write code today - and even then I'm not actually referring to React but JSX, the bastard child that React shat out.

JSX makes consistent use of the trailing slash in self closing element. If you don't include the slash, it won't work. Even the innocuous `br` tag allows for a trailing slash:

```jsx
{'/* invalid JSX */'}
<br>

{'/* valid JSX */'}
<br />
```

The thing that's easy to forget is that JSX is a language that only lives inside the React compilers. It _looks_ like HTML but it's not HTML, at all.

It's a convenience that I can reuse the HTML-like syntax in real HTML, with a few exceptions, most notably the `script` tag (if used with a `src` attribute, React allows me to add the `/` to mark as self closing).

…Except that's not actually true, and that's how I got bit in the butt.

## When self closing doesn't self close

Given this HTML (not JSX):

```html
<script src="app.js" />
<p>Oh nooos!!!!
<p>We're all lost :(
```

Everything following the script tag's "closing" marker is swallowed. It's swallowed because the HTML parsing routine doesn't recognise it as valid and then goes on to move the following tags as child nodes of the script element.

This should have been obvious to me, but there's a handful of HTML elements that have the similar properties as the script tag, in that they have a dual function.

Tags that never contain anything can self close, such as `br`, `hr`, `link` and so on.

Tags that _can_ do something with their contents always (usually!) require a closing tag, such as `title`, `div`, `span` and so on.

Then there's tags that can contain nothing and still offer full functionality, such as `script` and `textarea` (and some more).

---

**A couple of side notes**

1. There's also a host of tags that allow for optional closing tags, such as `p`, `li`, `tr`, `td`, and a whole host of others - but there are quite a few [specific conditions](https://html.spec.whatwg.org/multipage/syntax.html#optional-tags) that need to occur for them to close automatically.
2. Additionally though visually `canvas` has similar properties, any elements inside the `canvas` tag **do** make up part of the DOM and are there for assistive technologies, such as screen readers.

---

Where I got completely tripped up was with Web Components _and_ Prettier in VS Code. I'll explain.

## Web Components require explicit closing tags

Web Components can (to me at least) have a similar feeling to React. They're elements that don't exist as part of the spec and I've introduced them as foreign.

Except I already forgot that JSX is not HTML. Web Components, when writing the actual HTML tag, is HTML. Web Components, if not properly closed will slurp up all the following markup.

So this code below doesn't _activate_ my Web Component at all, because the following script tag has been slurped and swallowed into a void:

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
<textarea placeholder="I start empty"></textarea>
<br /> <!-- but sometimes we do 🤷‍♂️ -->
```

Except Prettier (which I use in VS Code upon save) *insists* on three kinds. Specifically, it will always convert `<input>` to `<input />` - which, as Jake said right up front in [his post](https://jakearchibald.com/2023/against-self-closing-tags-in-html/), I don't think is a good thing (and neither does the [five year (currently) running open](https://github.com/prettier/prettier/issues/5246) issue on Prettier).

In short, what I'm saying say is that the `/` character is completely and utterly redundant in HTML as a way of saying this is self closing. It has no effect and, effectively, is ignored.

I'd go on to argue, as my peers have: the use of the `/` in the opening tag creates inconsistent coding style used on some elements that are self closing (not requiring a closing tag) whilst other elements whom are entirely empty must be explicitly closed. 

React and JSX specifically is to blame for putting this back into the mainstream development process as JSX offers this as a prerequisite of it's language.

So, I'm left in a bit of a pickle. When my code autoformats, it'll format it in a way that I don't agree with, and so, I write this post remind myself try to remember to _not_ write the trailing slash, and close explicitly.
