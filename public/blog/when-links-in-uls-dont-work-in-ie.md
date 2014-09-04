# When links in ULs don't work in IE

In redesigning my business web site: [Left Logic](http://leftlogic.com) I came across a particularly frustrating bug that took me a good deal of time to find the source of.  Since I couldn't find any info out it on the Internet, I thought it would be worth posting.

<abbr title="Internet Explorer">IE</abbr>, both IE6 and IE7, in the following example, causes links to just stop working.


<!--more-->

The bug is to do with links within list elements that have a relative position combined with hidden elements.

## Example

If you view the [IE broken links](http://remysharp.com/wp-content/uploads/2007/05/ie_relative_hidden_bug.html) example in IE6 or IE7 you'll find you can't click on any of the non-selected tabs in the first example.  

## The Problem

It's pretty particular, but in my case I had my navigation, which required the UL and the A links to be position:relative.  I would then have a hidden H2 before the UL that would display 'Navigation' when the style sheet was turned off.  Perfectly acceptable.

In the above example, the first example has the hidden H2 before the UL within my holder DIV, currently with lorem ipsum to demonstrate the breadth of the problem.  

The second example works fine because the hidden element is outside of the holder DIV.

Effectively, it's like the hidden H2 is sitting **over** the links rendering them useless.  I've checked out the <abbr title="Document Object Model">DOM</abbr> in IE and I can't see how it is overlapping - but it definitely is.  

This is proven when I change the length of the content in the hidden H2.  When it just read 'Navigation', only the home link was disable, and only when the second link was selected.  Very, very strange.

## The Solution

It's pretty straight forward, but definitely not obvious.  Move the hidden element from next UL and out of the holder.  It sorts out the problem, but took me many days to work out!