---
title: $ in code examples
image: /images/dollar-in-code.png
date: '2017-03-27 11:35:57'
modified: '2017-03-27 11:31:56'
tags:
  - code
published: true
---
# $ in code examples

My blog includes a lot of code examples throughout the many blog posts I have, and I'm a big proponent of copy & paste code examples, i.e. if I can make it easy to copy, I want it to work when it's pasted.

So here's two ways you can prefix terminal code examples with a `$` and not make it selectable (so it isn't included in the copy/paste op).

<!--more-->

## Not bad: adding `$` via CSS

I'm mixed on whether the source of my posts include the `$` in the code examples, but this method will add it in afterwards, but splitting the `code` element into individual lines, then wrapping each line with a `span` element that's styled with a `:before` pseudo selector.

Firstly the JavaScript. I'm making an assumption that all bash code examples for the terminal have a class name of `.bash` (yours might be something similar, or you could apply to _all_ elements):

```javascript
// I've used vanilla JS, but feel free to port to jQuery, etc
const $ = (expr, ctx = document) => {
  return Array.from(ctx.querySelectorAll(expr));
}

$('code.bash').forEach(elem => {
  const replaced = elem.textContent
    .split('\n') // break into individual lines
    .filter(Boolean) // strip empty lines
    .map(line => line.replace(/^\$ /, '')) // remove leading $[space]
    .join('</span>\n<span class="line">')); // wrap with span.line

  elem.innerHTML = `<span class="line">${replaced}</span>`;
});
```

Then a simple dash of CSS for the `span.line` selector:

```css
code.bash .line:before {
  content: '$ ';
  opacity: 0.5;
}
```

The result, a series of commands has the prompt symbol, but not included when you copy (go ahead, select the text in the sample below):

```bash
$ npm init -f
$ install --save express
$ npm start
```

But sometimes I don't want *every* line to be prefixed with the prompt, either when I want to show the output from a command or if a command is across multiple lines (joined by a `\`). So that needs an improved solution.

## Better: making `$` unselectable

Rather than splitting every line and wrapping them in a `span.line` element, what I could do instead is to assume that the `$` symbol is in the original markup, and wrap *only* the `$` symbol and using CSS make it *unselectable*.

```javascript
const $ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));
const prompt = '<span class="prompt">$ </span>';

$('code.bash').forEach(elem => {
  el.innerHTML = el.textContent
    .split('\n') // break into individual lines
    .map(line => line.replace(/^\$ /, prompt))
    .join('\n'); // join the lines back up
});
```

This regexp makes sure the bash lines starting with a `$` symbol _and_ is followed by a space (so it doesn't capture variables), and with the following CSS applied to the `span.prompt` element, the `$` is unselectable and the code can be copied and pasted:

```css
.prompt {
  user-select: none;
  opacity: 0.5;
}
```

This now works with the previous example, but also multi-line examples (try selecting the text below):

```bash
$ curl -X POST \
       -d'["foo.com","bar.com"]' \
       -H'authorization: token xyz' \
       -H'content-type: application/json' \
       https://jsonbin.org/remy/urls
```

Nice and simple, and I like that my bash code examples can now be safely copied without accidentally messing up the command (and I've dropped in the opacity to try to visually indicate that it's less important than the code).

---

Bonus: even if you paste in the `$`, let's have it do nothing:

```shell
#!/bin/zsh
$@

# saved to `$` in your bin path
```