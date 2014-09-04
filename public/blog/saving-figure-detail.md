# Saving Figure & Detail

In finding that the <code>legend</code> element [simply doesn't work](http://remysharp.com/2009/07/31/legend-not-such-a-legend-anymore/) inside both <code>details</code> and <code>figure</code>, myself [and](http://adactio.com) [others](http://brucelawson.co.uk) been keen to find a solution.

<!--more-->

Ian Hickson [has said](http://remysharp.com/2009/07/31/legend-not-such-a-legend-anymore/#comment-166653):

> I am leaning towards keeping the language sane (not introducing yet another element that basically means "header" or "important" or "caption"), at the cost of delaying how soon we can use the feature.

The **huge** problem with this is that browsers will *not* catch up.  IE is the dominant browser, and if IE6 to IE8 don't support the <code>legend</code> element embedded in anything *other* than <code>fieldset</code> then we, as authors, are going to **have** to find an alternative.  This is where the spec is fiction.

I agree with Hixie that a new element isn't required that means "header" or "caption", but equally I believe we have enough in the spec to label the <code>figure</code> and <code>details</code> elements properly.

## Alternatives

I've gone through a number of alternatives with [Jeremy](http://adactio.com) and [Bruce](http://brucelawson.co.uk) and I want to share them with you:

### label

<code>label</code>: This was my initial favourite to work within the new elements, since what we're trying to do is *label* the figure or details that are tucked away.  

The problem Jeremy raised was that of screenreaders.  Are they going to look or assume there's an associated input element?  

I'm not an expert on screenreaders, so I can't say for sure.  Bruce suggests screenreaders may only look for the input element if the <code>label</code> is within a <code>form</code>.  If this is so, then it's almost a good candidate.

My issue with this, is that it's perfectly reasonable, in my head, to have a <code>figure</code> within a <code>form</code>, which *could* cause screenreader problems.

Here's a label figure test: [http://jsbin.com/elatu](http://jsbin.com/elatu) ([edit](http://jsbin.com/elatu/edit#html))

Here's label in a <code>details</code> element and nested in a form: <a href="http://www.brucelawson.co.uk/tests/html5-details-label.html">http://www.brucelawson.co.uk/tests/html5-details-label.html</a>

<div class="update"><p><strong>Update</strong> Bruce's tests so far show that <code>label</code> is <a href="http://twitter.com/brucel/status/3265221421">working fine with screenreaders</a></p></div>

### caption

<code>caption</code> is used to add a caption to tables, which makes it a good candidate for captioning the <code>figure</code> and <code>details</code> elements.  

However, due to a similar bug as the <code>legend</code> issue, if the browser finds the <code>caption</code> element outside a table, it simply strips it from the DOM - which makes this a non-option.

Example of caption being stripped from the DOM: [http://jsbin.com/eloda](http://jsbin.com/eloda) ([edit](http://jsbin.com/eloda/edit#html)) (view the DOM and you'll see the element has gone)

### Heading

Could we use an <code>hX</code> tag?  We want to give the <code>figure</code> or <code>details</code> element a heading, so it stands to reason that we could use an <code>h2</code> or <code>h3</code>, etc.

The problem is the <abbr title="table of contents">TOC</abbr> that's created. 

I originally thought I could hide this from the TOC by using the <code>hgroup</code>, but this element will grab the first heading and include it in the TOC.  So this isn't a viable solution because I don't believe these should be part of the TOC.

On top of which it seems over the top to include *two* elements just to solve this issue.  I think the <code>figure</code> and <code>details</code> need a heading, and although using <code>hX</code> elements make sense to me, it feels klunky (for want of a more expressive technical term!).

### Header

<code>header</code>, to me, has a similar semantic meaning as an <code>hX</code> element, and we could reuse this to replace the <code>legend</code> in the <code>figure</code> and <code>details</code> elements.  

It wouldn't become part of the TOC, because you'd need an <code>hX</code> element to create a new item in the TOC.  This also doesn't cause any issues with screenreaders (if in fact <code>label</code> does).

Here's an example of <code>header</code> being used in the wild (for the button example on the right): [http://2009.full-frontal.org/ticket-draw](http://2009.full-frontal.org/ticket-draw)

[Lachy](http://lachy.id.au/log/) pointed out on the [WHATWG IRC](irc://irc.freenode.net/whatwg "WHATWG IRC") channel that in the future User Agents may treat the <code>header</code> element properly and using it for the caption to the <code>figure</code> or <code>details</code> would cause confusion to the browser <small>(citation needed)</small>.

### New Element

After discussing the issue on the IRC, aside from Hixie suggesting that the <code>figure</code> and <code>details</code> is dropped, one solution is to create a new element.  This works fine in any browser because you're not stepping on an existing element.  For example, using <code>&lt;c&gt;</code> as caption can solve the issue.

I don't mind how it's solved, obviously a <code>c</code> element would be duplicating the <code>caption</code> element, but that's unavoidable.

## Conclusion

I think we need to discuss and find an alternative to *hoping* the browsers will fix the <code>legend</code> issue.  <code>figure</code> and <code>details</code> are both useful elements, particularly the former, so I'd rather not see them binned from the spec. If <code>label</code> is viable, I think this is the best fit, otherwise (since <code>header</code> could cause long term issues), a new element can solve this.

HTML 5 *paves the cowpaths* but the use of <code>legend</code> **isn't** possible, so we *must* find an alternative if we want to sensibly uses this captioning feature.

I know using the html5.enable feature if Firefox 3.6b, but this still leaves all the other browsers (and Firefox 3.6 isn't even out) - so again, waiting to see what browsers do isn't a solution (nor is serving the page as XML - since IE just chokes).

What do you think? Is there a better alternative? How do screenreaders react to <code>label</code>?