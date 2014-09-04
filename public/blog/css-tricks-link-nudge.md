# CSS Tricks' Link Nudge

A subtle effect on the [CSS Tricks](http://css-tricks.com) site that I've always liked, is the nudged links in the footer of the page.

With recent chatter about [Progressive Enrichment](http://adactio.com/journal/1503/) I thought it would be fun, and rather quick to show off [his](http://twitter.com/chriscoyier) effect using just CSS.


<!--more-->

## CSS

The CSS is marked up so the effect hover effect works as normal in all browsers:

<pre><code>li a {
  color: #eee;
}

li a:hover {
  padding-left: 20px;
  color: #beebff;
}</code></pre>

## CSS Animations

With a single line of CSS and zero JavaScript we can enhance the experience for users using browsers that support <a href="http://webkit.org/blog/138/css-animation/" title="Surfin&#8217; Safari - Blog Archive  &raquo; CSS Animation">CSS animations</a>:

<pre><code>li a {
  -webkit-transition: padding-left 300ms ease-out;
  color: #eee;
}

li a:hover {
  padding-left: 20px;
  color: #beebff;
}</code></pre>

## Demo

Take a look at the demo.

[http://jsbin.com/ehaja/](http://jsbin.com/ehaja/) ([edit](http://jsbin.com/ehaja/edit))

## Thoughts

My gut feeling is this  effect looks a bit odd without the animation, but it's because the jarring <code>20px</code> jump. However, there's definitely room for CSS transitions and animations, though aside from the [status of the document](http://www.w3.org/Style/CSS/current-work#transition), I can't see where it's up to on the W3C site...

As soon as there's support for CSS animations and transitions in Firefox as well as Safari, I'm going to start deferring JavaScript animation effects over to the CSS.