---
title: Defining The Vomit Bug
date: '2009-08-10 13:00:32'
published: true
tags:
  - bug
  - debug
  - debugging
  - dom
  - html
  - html5
  - web
modified: '2014-09-03 16:15:12'
---
# Defining The Vomit Bug

The more I [test HTML 5](http://html5doctor.com) and the more I [play around in the DOM](http://html5demos.com), the more I find odd situations that will trigger particular bugs.

The one result I'm seeing is what I'm now referring to as a *vomit* bug. 

<!--more-->

## Definition

<dl>
  <dt>Vomit bug</dt>
  <dd>When the browser's parser rearranges the DOM completely differently to the markup, resulting in content being placed <em>outside</em> its original container.</dd>
</dl>

## Examples

For example, due to a bug in Firefox 3.5.2 (and perhaps before) the following markup is subject to the vomit bug:

<pre><code>&lt;a href=&quot;#&quot;&gt;
  &lt;section&gt;
    &lt;p&gt;p nested in a section wrapped in a link&lt;/p&gt;
  &lt;/section&gt;
&lt;/a&gt;</code></pre>

The resulting DOM is as such:

<pre><code>&lt;a href=&quot;#&quot;&gt;
  &lt;section&gt;&lt;/section&gt;
&lt;/a&gt;
&lt;p&gt;
  &lt;a href=&quot;#&quot;&gt;p nested in a section wrapped in a link&lt;/a&gt;
&lt;/p&gt;
&lt;a href=&quot;#&quot;&gt;&lt;/a&gt;</code></pre>

This is a particular bug in Firefox that triggers when it parses a <code>section</code> element nested inside an <code>a</code> element that causes all currently open element to close, and the contents of the <code>section</code> element has been "corrected" by the browser and the DOM rearranged.  

<small>Note that by using the <code><a href="http://ejohn.org/blog/html-5-parsing/">html5.enable</a></code> option in <a href="http://www.mozilla.org/projects/minefield/" title="Minefield Start Page">Minefield</a> renders correctly.</small>

You can see a live example here: [http://jsbin.com/upiza](http://jsbin.com/upiza)

The old Gecko engine (for [Camino](http://emberapp.com/remy/images/camino-html5-issue/) and Firefox 2) suffers from the same vomit bug when introducing new (or HTML5) elements (which can be fixed by [serving as XHTML](http://html5doctor.com/how-to-get-html5-working-in-ie-and-firefox-2/)).

What other vomit bugs have you found?
