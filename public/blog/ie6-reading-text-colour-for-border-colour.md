# IE6 reading text colour for border colour!

In creating a particularly complicated styling for a project I'm working on, I've come across a corker of a bug in IE6.


<!--more-->

## if (ie6) border-color = color

If you're using <code>td { border-color: transparent; }</code> (which I have to create this specific project effect), then IE6 will literally replace this with the colour of the text in the <code>td</code>.

I only noticed this because the colour of the text in my <code>td</code> is different to the background colour - and wham! In IE6, the border colour is taken from the text colour if borders are transparent.

## See the example

View the example in Firefox, then view it in IE6 - classic!

[http://jsbin.com/iquyi](http://jsbin.com/iquyi) (to edit: [http://jsbin.com/iquyi/edit](http://jsbin.com/iquyi/edit))

## Challenge?

If anyone is up to the challenge, have a crack at getting the transparency working (note that this needs to be on a <code>td</code> and not a <code>div</code> - for which I've seen a fix already).

The long solution is to use <code>border-color: #fff;</code> - but it not as easy as that in my situation since I got lots of different colours to deal with, and it would (and probably will) require a *lot* of additional, conditional, CSS.