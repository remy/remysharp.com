---
title: Wildcards In CSS
date: 2026-07-11
tags:
  - code
---

# Wildcards In CSS

Just a brainfart here, but it's odd that even though we have wildcard selectors throughout CSS, and even partial selectors (I'll explain in a bit) we don't have partial wildcard selectors on top level elements.

I'm not talking about the "star" rule, but what I imagine would be a wildcard on elements selector.

<!-- more -->

## Existing methods

If I want to select and style all the `.btn-*` classes using [attribute selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Attribute_selectors), I'd do this:

```css
[class^="btn-" i] {
  …
}
```

This selector says: find all the elements with the class attribute that starts with "btn-" - case insensitive.

It's rather brittle, because it requires that the HTML class attribute starts exactly with `btn-`. Though it works, it does tie the HTML closely to the CSS - which I'd argue you'd want to be very sure you need to do.

But it is possible.

Equally, and a lot more robust, is the wildcard that says "anywhere in the attribute", so:

```css
[class*="btn"] {
  …
}
```

It's fine, but it's a bit sledgehammery. However, if you want to do the same thing for a web component, for instance, you can't.

If I want to target all the `rem-xxx` custom components using `rem-* { … }`, I can't.

Obviously I'm not the first to think of this, and _of course_ the venerable [Lea Verou](https://lea.verou.me/) has thought about this and [filed the issue](https://github.com/w3c/csswg-drafts/issues/10001) over two years ago, though there doesn't seem to be much interest in supporting it.

The reason it crossed my mind is that I was thinking about how you would initialise web components on a page, and currently it requires searching every single element in the DOM, rather than targetting to the nodes you want ahead of time.

From this [MDN article](https://developer.mozilla.org/en-US/blog/mdn-front-end-deep-dive/) they included a code snippet that (I thought) was a clever way to initialise the components:

```js
for (const element of document.querySelectorAll("*")) {
  const tag = element.tagName.toLowerCase();
  if (tag.startsWith("mdn-")) {
    const component = tag.replace("mdn-", "");
    import(`../components/${component}/element.js`);
  }
}
```

But really, it should be:

```js
for (const element of document.querySelectorAll("mdn-*")) {
  const component = element.tagName.toLowerCase().replace("mdn-", "");
  import(`../components/${component}/element.js`);
}
```

This feels like a relatively cheap change to add support for wildcards, and gives the `querySelectorAll` a nice little boost, along with the benefits Lea already outlined in the github issue she raised.

## Would it be valid?

I swear I found the documentation that read that the `*` asterisk was reserved for the universal selector (i.e. match all things), but I can't find it any more.

However, the from my memory, the parser only allows an asterisk _after_ a space, to indicate it's a universal selector, so `foo*` or `foo-*` would not match in the parser.

Equally, it's allowed in the attribute selector, but [only when followed](https://www.w3.org/TR/selectors-4/#attribute-substrings) by `=`, but attribute selector already has wildcard support. But maybe this would be extended to cover "glob" like support, so I could do `.foo*bar` to match `.foo-dont-do-it-bar`. Again, the current parser doesn't allow for this, so that means it's available for use.