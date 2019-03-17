---
title: 'CSS selector for :parent targeting (please)'
date: '2010-10-11 12:29:38'
published: true
tags:
  - code
  - css
modified: '2018-08-24 13:09:18'
---
# CSS selector for :parent targeting (please)

[Me this weekend](https://twitter.com/rem/status/26934643630):

> I can't count the number of times I've cursed CSS for not having a :parent pseudo selector: a img:parent { background: none; }

The what followed was some going back and forth with people who have thought this properly through.

<!--more-->

## :has selector

Originally I felt that a :parent pseudo selector would do the trick, but [Stuart pointed out](http://twitter.com/sil/status/26934925820) that selectors syntax doesn't work that way, it's always left to right determines depth.

So thinking about it some more, I felt that using a :has() selector would complement the :not() selector really well. Something like this:

    a:has(img) { background: none; }

Except that's completely wrong. 

The [E:not(s)](http://www.w3.org/TR/css3-selectors/#negation) selector applies to the particular element to which it's applied. Where as E:has(s) applies what element E contains - therefore it's asking a ton more for the browser to do.

Jonathan Snook helped shed a lot of light on this pretty core performance problem, and this weekend followed up with a detailed post about the [potential performance issues with a :has() selector](http://snook.ca/archives/html_and_css/css-parent-selectors). But I don't think the book is quite closed on this one, but I do agree that a :has() selector is going to be almost so expensive on the render engine that it wouldn't make sense to implement.

I should also add that [Shaun Inman's E < F proposal](http://shauninman.com/archive/2008/05/05/css_qualified_selectors) is the same as E:has(s) - and therefore I don't think it has legs.

So maybe back to the :parent selector.

## :parent selector

Jonathan has a really useful example of how the :last-child selector works and how it applies live in the browser (see the section called "How do browsers actually handle this"). What we see is the browsers are looking for the closing element. A child element, regardless of it's position, always has a `parentNode` (I'm talking DOM right now). 

Again, Jonathan points out that the browser treats the markup that comes down the wire as a stream (this is particular clear in the render pause demo), and the CSS selectors are applied to that stream as the elements are built in the DOM.

The problem with E:has(s) is once element E is found in the DOM, every new element rendered in to the DOM would require a run evaluation of the :has selector. Bottom line: bad idea.

The difference between E:has(s) and E:parent is that :parent is reference the `parentNode` which is *one* particular element. Once the element E is found in the DOM it would then just refer to it's parent and apply the style.

It would look like this:

    a img:parent { background: none; }

Performance-wise, I can't see how this is any different to a regular selector, except that once it's matched, it needs the `parentNode` - again, something that's available immediately as the element E is rendered.

Syntax-wise, yes, it's a departure from every other syntax style, but that's not a good enough reason not to include it. There were several *hear hear*'s to my groan on Sunday, and it would be an invaluable addition to native CSS selectors.

## How do we get this in browsers?

Actually, I've no idea. Maybe you're reading and you are or know someone on the CSS working group. Maybe you know a friend of a friend. Go shake them and point them to this article.

Maybe this is a really bad idea for reasons that I've not spotted: tell me, explain in the comments. 

Do we need a :parent selector?  I think we do, and I've wanted it for a very long time now.
