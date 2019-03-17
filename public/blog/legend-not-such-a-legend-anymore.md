---
title: Legend not such a legend anymore
date: '2009-07-31 13:00:24'
published: true
tags:
  - html5
  - legend
  - web
modified: '2014-09-03 16:15:12'
---
# Legend not such a legend anymore

Lately I decided I was going to recreate the interactive features of the <code>details</code> element using JavaScript (apparently [the same day](http://twitter.com/adactio/status/2869549874) as fellow Brightonian [Jeremy Keith](http://adactio.com/ "Adactio: Jeremy Keith")).

However I ran in to some very serious issues with the tag combined with the <code>legend</code> element, so serious, in it's current state, it's unusable.

<!--more-->

<small>This article has been cross posted from [HTML 5 Doctor](http://html5doctor.com).</small>

## Overview of the details element

The <code>details</code> element, by default, is a collapsed element whose summary, or label, is the first child <code>legend</code> (if no <code>legend</code> is used, the UA provides a default, such as "Details"), with a triangular button to indicate it's current open state.

If you include the <code>open</code> attribute, then the element is open by default.  In theory, you could attach a click event to the legend, and switch the <code>open</code> attribute.

The markup would roughly be this:

<pre><code>&lt;details open=&quot;open&quot;&gt;
  &lt;legend&gt;Terms &amp; Conditions&lt;/legend&gt;
  &lt;p&gt;You agree to xyz, etc.&lt;/p&gt;
&lt;/details&gt;</code></pre>

Here's the details test page I was working from: [HTML 5 details test](http://remysharp.com/demo/details.html)

## The issues

The biggest problem, and the show stopper for me, is that the browser's treatment of the <code>legend</code> element completely breaks this markup pattern - this is true for **all** the major browsers: Opera, Safari, Firefox and IE (tested in all the latest and some older browsers).  I'll go in these issues in detail in a moment.

Other problems include:

* Styling the legend element is exceptionally difficult, particularly positioning
* Using the <a href="http://www.whatwg.org/" title="Web Hypertext Application Technology Working Group">WHATWG</a> [guidelines to styling](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-xhtml-syntax.html#the-details-element-0) the <code>details</code> element prove both difficult to interpret and difficult to implement.
* When using CSS to style the open state of the <code>details</code> element using: <code>details[open] { height: auto; }</code>, meant that once I changed the open state using JavaScript, it wouldn't trigger the browser to redraw (as it would if I had added a class). I've [run in to this before](http://twitter.com/rem/status/2178972149), CSS 2.1 is styling source, not the DOM.

## Legend treatment

Surprisingly Firefox is the worst one out in these issues, the rest of the browsers have fairly same treatment of the issue.  In the screenshots, I've included a <code>fieldset</code> and nested <code>legend</code> for reference.

### Internet Explorer

Both IE7 & IE8 closes the <code>legend</code> element it encounters when it's not inside a <code>fieldset</code> element and move it's contents out to an adjacent text node.

What's also strange, is that looking at the DOM it also creates another empty(?) closed <code>legend</code> element after that text node.  It doesn't have any effect, but just looked odd:

![IE's details element treatment](http://remysharp.com/wp-content/uploads/2009/07/ies-details-element-treatment.jpg)

### Opera

Opera (9 & 10b) is very similar to IE in it's treatment of the <code>legend</code> in the details element, except it doesn't create the second closing <code>legend</code> node.  It just closes the <code>legend</code>, and creates the adjacent text node.

### Safari

Safari simply strips the <code>legend</code> all together out of the DOM.  So much so, that if you open the web inspector, then the error console, you'll see it warning out that it's encountered an illegal element, ignoring it, then encountering the closing tag, so it ignores that too.  You're left with just the text node.

### Firefox

The best for last.  Firefox goes one step beyond the other browsers.  It assumes you've forgotten to include the <code>fieldset</code> element.  So when it hits the <code>legend</code> element, Firefox inserts an opening <code>fieldset</code> up until it finds (I believe) the closing <code>fieldset</code> element, which obviously it *doesn't* so the result is the rest of the DOM, after the first illegally placed <code>legend</code> ends up eaten by <code>fieldset</code> element, which leaves my DOM in a mess:

![Firefox details treatment](http://remysharp.com/wp-content/uploads/2009/07/firefox-details-treatment.jpg)

## Impact on other elements

<code>details</code> isn't the only element that reuses the <code>legend</code> element for labelling, the <code>figure</code> element also is [supposed to support](http://www.whatwg.org/specs/web-apps/current-work/multipage/embedded-content-0.html#the-figure-element) the <code>legend</code> element.  The result is obviously going to be the same.

## Conclusion

We can't style the legend element when the text is being thrown out by all the browsers, and Firefox's DOM mangling is just too painful to look at.

This basically means that we can't, in any reasonable amount of time, use the <code>legend</code> element inside both the <code>details</code> and <code>figure</code> element in the spec's current state.

For me, I'll be using an alternative element, probably just a <code>p</code> element styled to look like a <code>legend</code>, but that's really not the point.  Ideas anyone?

It turns out we weren't the only ones looking at this and [Ian Hickson](http://lists.whatwg.org/pipermail/whatwg-whatwg.org/2009-July/021494.html) has responded on the issue:

<blockquote>My plan here is to continue to wait for a while longer to see if the parsing issues can get ironed out (the HTML5 parser in Gecko for instance solves this problem for Firefox). If we really can't get past this, we'll have to introduce a new element, but I'm trying to avoid going there.</blockquote>

It's fine to think that Gecko will update, but it's IE that I'm worried about, they *won't* turn out their render engine, and the result is we'll *have* to avoid using the <code>legend</code> in any element other than <code>fieldset</code>.
