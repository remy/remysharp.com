# It's not 800x600

This is something that I've been include in my personal projects for some time now, but it's come up again for a client, so I thought I'd share:

The optimum browser dimensions are not: 800x600 or even 1024x768.

You're close, but wrong.  Here's why.


<!--more-->

## Height never mattered

<small>&dagger; It only matters if you're short!</small>

The height means nothing on a web page, unless you've got a very simple page that specifically must be entirely viewable in the viewport (the bit of visual browser content).  However, for the rest of us, the page will be tall than 600px or some other arbitrary height to allow us to show off our content.

## You can't own the screen real estate

So this is the kicker.  If your page is 800px wide, and your browser is 800px wide with no content, the page is going to look just fine.  Except you don't have any content.

Once you put content on that page, and you go past the height of the browser (the browser might not even be maximised - wow!) you're getting a right hand scrollbar.  That scrollbar, in most cases is never wider than 20px.

So now your site is 800px and you've got a 20px scrollbar which means the viewport is 780px and your total browser width required is 820px...which results in the dreaded horizontal scrollbar!

## To conclude: less 20

So, when you pick your ideal browser width, subtract 20px from the width and it will be fine when the vertical scrollbar appears.