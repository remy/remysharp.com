---
title: Vendor Prefixes - about to go south
date: '2012-02-09 12:00:38'
published: true
tags:
  - css
  - rants
  - web
modified: '2018-08-24 13:09:33'
---
# Vendor Prefixes - about to go south

We do like vendor prefixes. They give us access to bleeding edge CSS properties, and make our sites look cool. But there's a serious problem: non-webkit vendors are giving serious consideration to implementing the `-webkit` prefix to a number of CSS properties.

This is bat shit crazy, but where the web has arrived to. This is one developer's opinion, but you **need** to voice your opinion now, and if you're in agreement that this is madness, you need to **act now**. Make your voice heard, blog about it, tweet about it: *make a lot of noise*.
<!--more-->

<div class="update"><p><strong>Keep updated</strong> A week after the meeting more people have contributed to the discussion, a few of the important ones (I felt) I have <a href="#updates">listed here</a> - please do also read them as they're a good follow up to the vendor-prefix kerfuffle.</p><small>Updated February 16, 2012</small></div>

<h2>How is this a problem?</h2>

<p>The CSS working group <a href="http://lists.w3.org/Archives/Public/www-style/2012Feb/0313.html">met very recently and openly talked</a> about whether they should implement `-webkit` <del>as part of the CSS specification</del><ins> in Firefox</ins>.  This means other browser such as Opera and Internet Explorer could and would also implement these prefixes which would result in <em>your site working</em>&trade; in their browser.</p>

<div class="update old"><p><strong>Clarification update (via <a href="/2012/02/09/vendor-prefixes-about-to-go-south/#comment-370255">Peter Linss' comments</a></strong>: this was <strong>not</strong> a meeting to propose adding <code>-webkit-</code> prefixes to the <em>specifications</em>, it was a meeting called by Firefox to seek consent
for adding <code>-webkit-</code> prefixes. The bottom line that Linss has laid down is:

<blockquote><p>Having a vendor prefix in a specification will simply not happen, ever.</p></blockquote>

<small>Updated February 11, 2012</small>
</div>

[Tantek](http://twitter.com/t) led the conversation with:

> tantek: At this point we're trying to figure out which and how many webkit prefix properties to actually implement support for in Mozilla<br><br>
> plinss: Zero.<br><br>
> tantek: Currently we have zero. Zero is no longer an option for us.

The fear the browsers have, understandably, is that developers are coding for webkit prefixes in their CSS because they're only targetting webkit based browsers.

Now that `-webkit` prefixes are so prolific in the wild (not my statement, but as suggested from the meeting minute notes), it seems the approach most want in the CSS working group is to simply implement the non-standard feature in to their specification. An oversimplification, but worryingly true.

There is some voice of sanity, namely in [Daniel Glazman / glazou](https://twitter.com/glazou) and Peter Linss.

You have to still appreciate the politics of the problem:

> tantek: What are the thresholds, even approximate, for implementing -webkit- properites (or none)?<br><br>
> glazou: Unbelieveable we are having this discussion.<br><br>
> Florian: Our job is to solve interoperability. We want to discuss it here, because that's our job.<br><br>
> tantek: Help us minimize the damage.

They're trying to get interoperability: a good thing. But implementing other vendor prefixes in a browser is *not* the way to go about it.

## On minimising the damage

Minimising the impact of this change is a misnomer. This is pandora's box, no matter how you look at it.  Once you add a single `-webkit` vendor prefix the expectation of the developer changes.  If you can use a `-webkit` prefix in Firefox for gradients or transforms (for example), why can't I use it for other things like CSS masks. And then other things.

If developers are lazy today (and we are - it's what makes us fast and good), by adding `-webkit` prefixes to other browsers it'll allow us to be even lazier, and by adding `-webkit` to the spec, the CSS working group will have set the precedence that we can, as developers, put any prefixes property in the other browsers.

At which point: webkit won the browser game and all other browsers should retire.

The only sensible step after implementing WebKit's experimental properties is to simply adopt the entire render engine. A silly analogy, but you can see how you could get there.

The working groups are there to give us specs on how to do things the *right way*:

> glazou: I don't think this is the right way. And this is the first time in this WG that we are proposing to do things that are not the right way.

## And then its affect on JavaScript

What concerns me even more is this:

> glazou: I think it's very unfortunate timing, esp. now that we're trying to use prefixes for JS APIs.

We're already starting to see things like `MozWebSocket` and the like. The only saving grace we have is adopting [polyfill](/what-is-a-polyfill/) techniques - but ensuring we code against the *right* specification, and not vendor prefixed APIs.

I *may* be wrong, but I feel like the evangelism is strong in this area, and developers are keen to avoid prefixes - and there's enough libraries that takes this problem away from devs.

CSS hasn't been so lucky.

## Who's guilty?

Apple and Chrome: They're supporting vendor prefixed properties like they're a standard part of development.

Firefox, Opera and Internet Explorer: They should have been on the ball more. Need to push their evangelism further. Teach developers that it's not exclusively `-webkit` to style elements.

All the browsers: *experimental* suggests that it will either be discarded or implemented fully at some point. It's both not clear what's a real specification be experimentally supported, nor when those experimental prefixes will be dropped.

The working group: for not getting these properties to standards quickly enough. The web moves quickly, and as much as a I appreciate that the standards will not move *as* quickly, they're still taking way too long.

Evangelists: We're too eager to show off experimental effects. They're cool, right? But it's cost us, and we should *always* used vendor prefixes as a backup, not as the final thing.

Developers: We know better. We know/hope that eventually these prefixes will be dropped, but we're propagating this problem.

You and me: I'm just as guilty as everyone else in using WebKit only prefixes.

## How I've been guilty and why

1. I don't know which browsers support which prefixes or values for that matter. Firefox never seemed to have interoperability with CSS gradients or transforms which made it hard to know what would work.
2. I honestly can't tell what's a real property from the CSS specs compared to something made up by the vendor (from what I can tell `webkit-text-size-adjust` is one of those examples)
3. I have absolutely no clue when the prefix will be dropped. Firefox held on to the `-moz-opacity` for a looooonnng time. This is my expectation for the other prefixed properties I use today.

## What can we do instead?

*This* is the question that they group should be asking.

There's things we can do as developers and evangelists, and there's things the browsers *must* do.

As developers we need to better educate. It worked with moving to standards away from spaghetti code back in the height of XHTML-esque coding, it can work again.

We need tools to make it easier not to propagate this problem.  Tools like [csslint](http://csslint.net/) and [-prefix-free](http://leaverou.github.com/prefixfree/) are a start. I'm about to embark on a tool that will plug all the missing vendor prefixes too (not a JS solution like Lea's tool, but a standalone service - [help me if you can/want](https://twitter.com/intent/tweet?source=webclient&text=%40rem+I+can+help+with+that+CSS+tool+you%27re+building)).

Browsers need to:

1. Non-production ready browsers should support experimental prefixes, *production ready releases* **should not**. If it's Chrome 16 - the stable version - experimental support should not be baked in. The properties should be full available *without* the prefix.
2. Drop experimental prefixes - not entirely, but after a finite amount of time. It's unacceptable and a disservice to the developers working with your browser. You need to give timelines to dropping these things.
3. Work with the working groups (...Apple).

And more. Blog about it. Tweet about it. Make some noise. If this happens, the working group will have failed. I'll leave you with this:

> plinss: If we go down this path we have broken standardization.


<h2 id="updates">Updates and further reading</h2>

* [Nate Vaughn / @folktrash on vendor prefixes - a good round up](http://folktrash.com/css-vendor-prefixes/)
* [PPK's take - though I don't entirely agree with all his points, still important reading](http://www.quirksmode.org/blog/archives/2012/02/the_vendor_pref.html)
* [Fellow author, Bruce Lawson](http://www.brucelawson.co.uk/2012/on-the-vendor-prefixes-problem/)
* [Follow up interview with Tantek by Eric Meyer ](http://www.alistapart.com/articles/the-vendor-prefix-predicament-alas-eric-meyer-interviews-tantek-celik/)
* [The Might Alex Russell's step back, take it all in, uber post](http://infrequently.org/2012/02/misdirection/)
