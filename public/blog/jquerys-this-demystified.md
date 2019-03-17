---
title: 'jQuery''s this: demystified'
date: '2007-04-12 09:41:00'
published: true
tags:
  - explanation
  - guide
  - javascript
  - jquery
  - this
  - code
modified: '2015-08-31 10:41:19'
---
# jQuery's this: demystified

More often that not, in my early dabbling with [jQuery](http://jquery.com) and more advanced JavaScript, I found I would constantly get confused over the meaning of "this" in jQuery and my own new libraries.

Hopefully this quick guide can help clarify those confusing moments, because once you've got it, it's simple as pie.


<!--more-->

## What is "this"?

> In many object-oriented programming languages, this (or self) is a keyword which can be used in instance methods to refer to the object on which the currently executing method has been invoked.

*Source: [http://en.wikipedia.org/wiki/This_(computer_science)](http://en.wikipedia.org/wiki/This_%28computer_science%29)*

## jQuery's this

There are really two main contexts of 'this' in jQuery.  The first refers to a to a <abbr title="Document Object Model">DOM</abbr> element, and the second to a jQuery object.

## Example of this as a DOM element

'this' is a DOM element when you are inside of a callback function (in the context of jQuery), for example, being called by the click, each, bind, etc. methods.

The following code searches for anchor links with the class of 'newTarget' and sets the 'target' attribute to '\_new' (which is a trick to create strict <abbr title="eXtendable Hyper Text Markup Language">XHTML</abbr> while still having some links open in a new window).

In this example we are also going to perform a double check to ensure links to the same domain don't open in a new window using the this object.

<pre><code>$('a.newTarget').each(function() { // our anonymous callback
  // check the DOM attribute 'host' on this
  if (this.host != window.location.host) {
    // create a jQuery object using the current DOM element
    $(this).attr('target', '_new');
  }
});</code></pre>

## Example of this as a jQuery object

'this' is a jQuery object when you are inside your own jQuery functions.  Note that the result of a selector query (i.e. $('a') ) is a jQuery object, which is an array of the matched **DOM elements** (imagine jQuery is an array with bells on).

<pre><code>jQuery.fn.newTarget = function() {
  // 'this' is a jQuery object at this point - with all the jQuery functions

  return this.each(function() { // return so we don't break the chain
    // now we are inside of a jQuery function, the DOM element is the context
    // so 'this' has changed to become a DOM element.

    if (this.host != window.location.host) {
      $(this).attr('target', '_new');
    }
  });
};</code></pre>

## Finishing up

This is far from comprehensive, but equally there's very little to the logic.  So long as you remember the <strong>context of 'this' changes</strong> when moving in and out of object methods then you're on your way.

If you're still not sure, get your hands on [Firebug](http://getfirebug.com) and add 'console.log(this)' within your code to interrogate and understand what 'this' is at that point in your code.

If this still doesn't make sense or I've got it terribly wrong - or you're suddenly enlightened, please do let me know - and I'll do my best to help.
