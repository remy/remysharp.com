---
title: html5 and Firefox2
date: '2009-04-14 16:21:06'
published: true
tags:
  - firefox
  - html
  - html5
  - web
modified: '2014-09-03 16:15:12'
---
# html5 and Firefox2

If you're using html5 for your site, and care about what the [3% of Firefox 2](http://www.w3schools.com/browsers/browsers_firefox.asp) users experience, then this should help you. 

For me it wasn't so much the 3%, it was that my pages work perfectly in IE6, but are a complete mess in Firefox 2, and I just couldn't live with that.

The [WHATWG blog](http://blog.whatwg.org/ "The WHATWG Blog") has two fixes to get Firefox 2 to see the new elements but neither have been fully explained - or certainly it took me some time getting a good grip on each solution.

Skip to the end of the blog post if you're only interested in the solution I've got running, rather than the preamble that goes with it.

This fix also handles Camino 1.x as it uses the same render engine as Firefox 2.

<!--more-->
## Firefox 2 html5 rendering issue

[Simon Pieters](http://simon.html5.org/) [explains it as](http://blog.whatwg.org/supporting-new-elements-in-firefox-2):

> Firefox 2 (or any other Gecko-based browser with a Gecko version pre 1.9b5) has a [parsing bug](https://bugzilla.mozilla.org/show_bug.cgi?id=311366) where it will close an unknown element when it sees the start tag of a "block" element like p, h1, div, and so forth.

## JavaScript Solution?

There's the JavaScript solution that Simon proposes - which does work, but it isn't complete.

The solution proposed on the blog post only solves the markup in the example (it may have been implied, but it took me a while of debugging to work it out). 

The other dependancy the solution has is that the elements in the <code>tags</code> array must be in the order that the elements appear in the DOM.  

It also can't handle nesting down in to the node - though I'm sure it can be updated to handle this.

The main problem is for the code to work properly, you need to: a) give the nodes in order, and b) somehow explicitly state how the elements will be nested.

I played around in the DOM inspector in Firefox 2 and found no original reference to the DOM.

For anyone hell bent on doing a pure JavaScript solution, there is a way, but it's convoluted (and apologies if my solution below is even more convoluted!):

1. Run an ajax hit on <code>window.location</code> - this will give you the unmodified markup
2. Parse the result to create a nested structure of the new elements
3. Using Simon's code, modify it to step the parsed structure, going in order of found elements, once it completes it's top level pass, drop down in to the next level in the DOM and clean up the next level of the tree

## Working Solution

Using [Bruce's](http://brucelawson.co.uk) test page, I've put the [html5 test page](http://remysharp.com/demo/html5-test.html) on my server, and if you check it out in Firefox 2, you'll see it working, compared to the [original broken version](http://brucelawson.co.uk/tests/html5-elements.html).

There's a few tweaks you need to get this to work, but before I go in to them, there's one error that I found that I couldn't work out a way around without invalidating the html5:

* You can't use unknown html entities, for instance a <code>&amp;hellip;</code> entity (which has been commented out of Bruce's example page).

<div class="update"><strong>Update:</strong> after speaking on the #whatwg IRC channel, the work around is to use the XML entity, i.e. &amp;hellip; is &amp;#8230;. You also can look up <a href="http://leftlogic.com/lounge/articles/entity-lookup/">html entities</a>.</div>

That bug may just be enough for me to write the JavaScript solution...we'll see.

### The Fixes

You need two things:

1. mod\_rewrite to trick Firefox 2 in to thinking the page is xhtml
2. <code>xmlns</code> attribute in the <code>html</code> element to get the page to render

### mod\_rewrite

In this example, I'm only running the content-type trick through .html files only - but you can modify this rule as you feel fit (i.e. it could be that you ignore anything in your assets directory instead).

I've not got the Gecko 1.9pre build to run live tests, but I've run pattern matches and they're good so far as I can tell.

This rule sends the xhtml content-type to all Gecko based browsers where version is less than 1.9, or "rv:1.9pre" or "rv:1.9a" or "rv:1.9bx" where x is less than 5 ([source](http://blog.whatwg.org/supporting-new-elements-in-firefox-2)).

<pre><code>RewriteCond %{REQUEST_URI} \.html$
RewriteCond %{HTTP_USER_AGENT} rv:1\.(([1-8]|9pre|9a|9b[0-4])\.[0-9.]+).*Gecko
RewriteRule .* - [T=application/xhtml+xml]</code></pre>

### xmlns

Then to get the page to render the style properly, add the follow (typical html4) attribute to the <code>html</code> element:

<pre><code>&lt;html lang=&quot;en&quot; xmlns=&quot;http://www.w3.org/1999/xhtml&quot;&gt;</code></pre>

## Conclusion

For me there's a bigger problem that I have to be comfortable to say that IE users must have JavaScript enabled to get the [html5 enabling script](http://remysharp.com/2009/01/07/html5-enabling-script/) to work, but I think you have to justify this on a case by case basis.

I've been discussing filtering processes that convert the html on the fly out the door (with server side caching), but my concern is that it means supporting two models in the CSS such as <code>section, .section {}</code>, and then you have the issue of IE6 not being able to handle <code>&lt;section class=&quot;intro&quot;&gt;</code> as this would be <code>.section.intro</code> which we've all run in to that headache.  

Finally there's the JavaScript selectors that you might use.  Sure you could write <code>$('section, .section')</code> but at what point do we draw the line?
