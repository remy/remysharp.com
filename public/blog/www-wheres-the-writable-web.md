# WWW: Where's the Writable Web?

_This post is based on my experience and thoughts, and is not backed up by research, aka: speculative, akin more to a rambling in a café!_

For my time at CERN recently we rebuilt the first browser: WorldWideWeb (later renamed to Nexus). One unique aspect of this  browser was that you could edit web pages. Indeed, the documentation for the web at that time was written in that browser.

Which makes me wonder: why, and where did it go?

<!--more-->

## Thoughts on _why_

I heard it mentioned during my CERN week that it was Tim Berners-Lee's _vision_ that browsers of the web would allow you to edit along with read.

It's entirely possible I misheard, but I half suspect that the vision was influenced by the available technology.

As with many great ideas, they're based on existing solutions and putting them together in a new way that solves new problems. The secret sauce that made the web was the humble `<a>` tag. It joins the web.

When it came to building a browser, the available tools were sitting in the [NeXTSTEP](https://en.m.wikipedia.org/wiki/NeXTSTEP), and specifically [Interface Builder](https://en.m.wikipedia.org/wiki/Interface_Builder) (effectively the grandparent of Apple's Xcode).

When it came to rendering HTML in this would-be browser, you would have to use a text object. I think/suspect: [NSTextView](https://developer.apple.com/documentation/appkit/nstextview).

In [A brief history of the Web](https://www.w3.org/DesignIssues/TimBook-old/History.html) Tim Berners-Lee writes that it took him a single month to produce the read version of the browser, and another month for the editable version, citing that most "X browsers took around year to be developed".

I don't think it's a huge leap to see that the text view element can be in a read-only mode or read-write mode. Making the decision to use a read-write allows for a great deal more functionality.

In fact, if you're writing the _first_ browser for a web that was _just_ invented, it's going to be a huge benefit to ship a way to generate content in the same software.

So it was either <abbr title="Tim Berners-Lee">TBL</abbr>'s original vision and _then_ he set out to find software that could realise it, or he saw the available technology and made best use of it to create a vision.

<small>(I caved and did a _teeny_ bit of research, and looking at ENQUIRE, <abbr title="Tim Berners-Lee">TBL</abbr>'s earlier system, it [looks like editing](https://en.m.wikipedia.org/wiki/ENQUIRE#Differences_to_the_World_Wide_Web) was always on the table)</small>

It really doesn't matter which way around it was, it's just me scratching at the idea of which came first. Pretty ingenious either way.

Jean-François Groff described it during our stay at CERN:
 
> [The WorldWideWeb was a] word processor with networked hypertext, and that really floored people who saw it in action for the first time.

## Thoughts on why it left us

Today's browsers are not editors for creating HTML, and the WorldWideWeb browser was written with the intention and expectation that both the source HTML and the URL itself should be hidden from the user (possibly to keep things simpler and less daunting).

Viewing the source in the WorldWideWeb was tucked away inside of diagnostic buttons and URLs would only be entered by "Open using hypertext reference".

However, in 1991 there is a public list of [upgrade proposals](https://www.w3.org/History/1991-WWW-NeXT/Implementation/Upgrade.html) and interestingly it includes:

> Make the generated HTML more human-readable (skip lines, etc.)

This was because, it turned out, humans were reading the HTML. Indeed they were also writing some of the HTML (I think the `<title>` element was one such tag they had to write very early on).

The browsers that followed didn't have an editable mode: The Line Mode Browser '91, Lynx '92 and Mosaic '93.

But why? Two big blockers stand out.

The first is that NeXTSTEP provided Interface Builder and had the components to create editable text _and_ format the text (I think of it like a Rich Text Format object). To make this available to other systems would require implementing the same NSTextView functionality on each OS to support editing in a [<abbr title="wizi wig">WYSIWYG<abbr>](https://en.m.wikipedia.org/wiki/WYSIWYG) element.

Secondly was the problem of saving back to servers. This was a problem that was never solved the first time around. Understandably it's a huge problem, littered with complexities. Authentication is one of the biggies.

It makes a lot of sense to use the web page as the editable interface. Why shouldn't I edit and format my blog posts from the browser? There's probably less than a handful of systems that can do that today (I _think_ wordpress.com supports this functionality, but I'm not 100% certain). A handful after 30 years isn't _really_ progress on the editable web front.

It's not hard to suggest that it was a mountain of technical challenges that kept the writeable browser from being part of technology today.

As with anything that succeeds, I beleive, the lower the barrier, the higher the success of adoption.

---

Those are my speculative thoughts. Probably better as a café conversation, but having spent the last week with my mind deep in the '90s at CERN, I thought it would be fun to share here instead.