---
title: 'CSS text fragment selector (please)'
date: '2024-04-17'
tags:
  - web
---

# CSS text fragment selector (please)

A little while ago (read: 14 years ago) [I wished for a parent selector](https://remysharp.com/2010/10/11/css-parent-selector), and we finally have `:has` 🎉.

Now, how about the ever useful jQuery selector `:contains` but reusing the [text fragment](https://developer.mozilla.org/en-US/docs/Web/Text_fragments) syntax?

<!--more-->

## Text fragment selector

Although [Firefox's support](https://caniuse.com/mdn-html_elements_a_text_fragments) is ([currently](https://mozilla.github.io/standards-positions/#scroll-to-text-fragment)) missing, the text fragment support to jump to and highlight a block (or more) of text is good.

This means I can share and link to specific content regardless of whether there's a `name` or `id` attribute on the element (because that's how we do "classic" text linking!).

So the parser exists (though I'm not sure if it's a standard…maybe someone can clarify), so the next logical step is to bake this into a CSS selector, and finally we can have what jQuery was [rocking in 2007](https://blog.jquery.com/2007/08/24/jquery-114-faster-more-tests-ready-for-12/).

The syntax, I would expect, would look like this:

```css
[:~:text="fragment selector"] {
  background: red;
}

/* or */
[:~:text="Although,text is good"] {
  background: red;
}
```

## Implementation questions

Beyond the complexities of the actual implementation, there is a question of _what_ exactly the expression should match. Should it match the `#text` node, or should it match the direct parent element? Although if it did target the `#text` node, we could use `:has` to select the parent (though…this isn't as good as an ascender selector).

What if the selector crosses multiple DOM nodes? Would I expect to target them all or into the highest node?

Finally, I've noticed that the text fragment works but only on initial load. This is seen if you have `::target-text` to highlight the text (though my copy of Chrome has it's own default style), it highlights the block, but on refresh, the highlight is lost. I'm not sure what the technical reason for this is, but wonder if that might add complications to a CSS based implementation.

## Who this really benefits

As a selector for developers and authors, I can't see this being a core selector for developers, but there's a decent use case where the author might want to clean up third party injected content.

Moreover, and to me, even more excitedly, this would put a significant amount of power in the user's hands via user style sheets. This would allow users to control what content was hidden from them using relatively simple text expressions.

Don't want to see Facebook's follow suggestions, irrespective of the trash fire classnames in use, you'll be able to target the element by text, cycle up to the container, and whoosh, gone.
