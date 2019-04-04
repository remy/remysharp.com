---
title: 'How I failed the <a>'
date: 2019-04-04
tags:
  - code
---

# How I failed the &lt;a&gt;

A real bug bear of mine is when JavaScript gets in the way of browsing a page on the web. Simple, but common things like [time to interactive](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive) being delayed for no good reason, or, in this case, links that don't work like links.

I'm guilty of this too, so this is my post to call myself out and to (ideally) prevent myself from doing it again.

<!--more-->

## On click…

It all starts with a little on click property and then things go downhill. Presumably for good reason, I've decided to take over the browser's native handling of the visitor clicking on some element in the DOM.

Perhaps I need to place an API request in the background, update some part of the user interface or maybe run some validation ahead of sending the request.

I use [Next.js]() for a lot of my client work. I like it because it comes with server side rendering support without configuration and straight out of the box. **This is good.**

Due to the way Next's routing works, quite often I'm overriding the browser's native click so that I can run subsequent client rendered navigation. This can benefit from pre-fetched code (for layout) and can make for a really nice and fast user experience, it also reduces the round trip time and payload the visitor has to bear when clicking around.

## I messed up

This was my (React) code:

```js
<Card
  onClick={event => {
    event.preventDefault();
    Router.push(
      `/thing/_single?id=${id}`, // "real" url
      `/thing/${id}` // URL the browser shows
    );
  }}
  {...props}
/>
```

The component works in its intended use. The visitor clicks on the card component, and it loads the new route (the file living in `./pages/_single.js`) passing it a query string of `id=nnn`.

This component breaks in two ways through. The first should (I hope) be obvious, the second not so much.

## Half-way server side

I've come across these types of site more and more lately. They'll use server side rendering to get the SEO goodness and performance benefit because the page isn't reliant on JavaScript to load. Except that once it's loaded, it's reliant on JavaScript to actually respond to interactions - like clicking.

In my code above, if the internet connection is sketchy (mobile connectivity for instance), the clickable thing has loaded (the card) but there's nothing to handle the click, like an anchor element.

So I now have a simple rule of thumb: **if there's an onClick, there's got to be an anchor around the component.**

What about the second breakage. Did you spot it?

## Knowing better than the browser

JavaScript lets me do some pretty fancy things. Sadly there's a subset of fancy things that takes over native browser functionality without realising and accidentally tossing it out of the window.

In this particular case, my visitor isn't allowed to click on my clickable component in any other way than how *I intended*. Which is rather presumptuous of me.

What happens on shift + click?

What happens on command + click?

Neither of these two actions would work. It _should_ open in a new window and a new tab respectively. This was my visitors intended action, so why did I decide they couldn't do that any more? The answer is easy: I didn't think. Nothing either confused, or worse: pissed off my visitor.

The fix is a matter of lines, so let's do that:

```js
<a href={`/thing/${id}`}>
  <Card
    onClick={event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey) {
        return; // let the browser deal with the click natively
      }

      // otherwise handle it with our fancy JavaScript
      event.preventDefault();
      Router.push(
        `/thing/_single?id=${id}`, // "real" url
        `/thing/${id}` // URL the browser shows
      );
    }}
    {...props}
  />
</a>
```

## New rules of thumb

Any time I'm adding `onClick` to a component (or `addEventListener('click', …)`), I want to make sure there's a _real_ anchor ready to handle the intended action. I also want to ensure the native browser handling of modifiers works as intended. Too many sites prevent me from using modifiers on click - I don't want to join their ranks of pissing off the visitor.
