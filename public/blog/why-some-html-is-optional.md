---
title: '(Why) Some HTML is "optional"'
tags:
- code
date: "2019-09-12 10:00:00"
summary: "In response to Chris Coyier's post 'Some HTML is optional'"
---

# (Why) Some HTML is "optional"

Chris Coyier [blogged recently on _weird looking HTML_](https://css-tricks.com/some-html-is-optional/). It's a nice short post and I'd say it's worth knowing these optional features (potentially known as defaults). My favourite optional is `<script>` and not having to include the `type` attribute.

But Chris' first example is the most common, the optional closing `</p>` tag. What (I think) is an interesting question is: _why?_

<!--more-->

## The easy answer

HTML has an amazing quality: it's super-dooper backwards compatible. It's why we have HTML5 and not XHTML2.

This backward compatibility means that devices and browsers reaching all the back to the very first browser are still able to render HTML (just about - the _first_ makes a bit of mess of unknown elements but that's more of an exception).

So if you ever find yourself asking *why*, the answer will nearly always lay in the past and original functionality.

This same reasoning also explains why you'll never find a newly introduced element to go inside the `<head>` element - but I'll leave that for <span title="Remy hereby challenges Jeremy Keith">someone else</span> to blog about…

## Performance and optimisation?

Without looking at modern day browswes' HTML parsing algorithms, I'm guessing the perf cost is incredibly minute. So minute that it makes no difference that we mortal users could experience.

Compression is really a moot point too, it's a micro optimisation that _may_ save a byte or two, but because of how repeating sequences are compressed, a closing `</p>` won't have an impact.

But, what exactly about this `<p>` tag?

## Back to 1989

Pre-DOM, pre-browsers, the world's first browser was being written by Sir Tim Berners-Lee.

There was no reference implementation and certainly no such thing as a parsing specification.

The first browser, the [WorldWideWeb.app](https://worldwideweb.cern.ch), parsed HTML character by character applying styles as it went along. As opposed to today's methods whereby a document object model is built up, then rendered.

I happened to be lucky enough to be sat next to [Kimberly Blessing](https://www.kimberlyblessing.com/) when they unearthed the parsing algorithm for the `<p>` tag.

In fact, Chris' earlier example of paragraph text should be reformatted to truly see how the paragraph was intended to be used:

```html
<P>
Paragraph one.
<P>
Paragraph two.
<P>
Paragraph three.
```

The paragraph tag (yes, in upper case) was intended to _separate_ paragraphs, not wrap them.

Which is why you don't need a closing tag, to support this original use and support existing documents around the web.

Here's a photo I took of Kimberly's screen showing the source:

![paragraph formatting](/images/p-tag.jpg)

Pretty geeky, and for some reason, I love these historical details.
