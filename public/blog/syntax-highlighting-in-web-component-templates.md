---
title: Syntax Highlighting in Web Component Templates
date: 2025-11-12
image: /images/template-highlight-0.png.avif
tags:
  - code
---

# Syntax Highlighting in Web Component Templates

A simple but effective fix to working with web components and VS Code. I wanted to get syntax highlighting _and_ prettier support (to auto fix indenting, quotes, etc) in my component's templates.

The extremely quick read is, add `/* HTML */` to the front of the template. Case sensitive _and_ space sensitive (though hopefully one day it won't be so strict). Now highlighting and prettier (with save and fix) works.

<!-- more -->

## The slightly longer read

What I wanted to achieve was that I could include my template in the source of the web component (or at least in the same directory - i.e. physically near to the application logic).

The problem is that unless I use a build function (or tools), the markup for the template is a string.

Here's the starting point:

```js
customElements.define(
  'hello-world',
  class extends HTMLElement {
    connectedCallback() {
      const n = this.getAttribute('name') || 'World';
      this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>:host{font:600 16px system-ui;color:#222}</style>
      <div>Hello, ${n} 👋</div>`;
    }
  }
);
```

Seen here with VS Code's syntax highlighting - note that the template itself is just green, plain text:

![Although the JavaScript is highlighted, the string of markup applied to the innerHTML is all in green](/images/template-highlight-0.png.avif)

Using a tag function solves the main issue, but requires extra code or a _magic_ build process which I really don't want or need - and look at that nasty red snake telling me I need to write more code:

![The syntax is nice and tidy now using a tag function, but my linting is highlighted that the html function is missing](/images/template-highlight-2.png.avif)

VS Code does support highlighting if you give it a hint using a comment: `/*html*/`, but prettier doesn't format it - close, but still no dice:

![The syntax is now fully colourised, but not structured in a way that's nice and easy to read](/images/template-highlight-1.png.avif)

Finally, if you get the comment syntax _exactly_ right, that's uppercase and with spaces around the text, `/* HTML */`, then you'll get both highlighting and syntax tidy support without the need for build tools:

![The syntax is now fully colourised and it's tidy](/images/template-highlight-3.png.avif)

I do have the VS Code option `"prettier.embeddedLanguageFormatting": "auto"` in my settings, but if I've understood correctly, this should be the default for prettier and not required.

A large hat tip to [Timothy Leverett on Mastodon](https://front-end.social/@zzzzBov/115535106033886819) for helping me.