# How Mac IE taught me better CSS

Generally when you say you've done your browser testing it will mostly take place on a <abbr title="Personal Computer">PC</abbr>, and at the very least, it will be <abbr title="Microsoft's Internet Explorer">IE</abbr>â€ .

<small>â€  No matter how much we developers or designers complain that IE isn't standards compliant, and Firefox is the way, the [World still prefers IE](http://www.w3counter.com/globalstats/) (at time of writing!).</small>

However, being that I've just started my company, I want to start on the right foot.  That means I'll be aiming to support the Big Three Safari (I'm a Mac user - it's always going to come first!), Firefox and IE.

But then there's IE for the Mac.  A notorious application that's usually the oddball of the bunch (oh - I guess there's Netscape 4.7 - but I'm not counting that fruitcake).

[ll]: http://leftlogic.com


<!--more-->

I've designed the [Left Logic][ll] web site to be as accessible as possible, to work without JavaScript, to read correctly without CSS and so on.

So when I compared my site between Safari (left) and Mac IE (right) here's what I saw:

![Safari vs. Mac IE example](http://remysharp.com/wp-content/uploads/2006/09/safari_vs_mac_ie_example.jpg)

Note the big ass gap in IE on the right, and note that the Safari view is exactly how Firefox and Win IE saw my site.

Here's the code for the container DIV that holds the main frame of content:

<code>#content_frame {
position: relative;
width: 478px;
left: 199px;
background-color: #fff;
margin-bottom: 40px;
}</code>

Mac IE had applied the *left: 199px* to all the containing DIVs, cascading the ID's style all the way down.  I should have been styling just the container DIV and not all those within the DIV.I also realised that the ID should be styled to the specific DIV, so I would add *DIV#content_frame*.  Not much changed.

Then, I found that if I ditch the *left* and replace it with a *margin-left* all would be well with the Big Three, and the runt of a half-brother: Mac IE.

Here's what the code should have been:

<code>DIV#content_frame {
position: relative;
width: 478px;
margin-left: 199px;
background-color: #fff;
margin-bottom: 40px;
}</code>