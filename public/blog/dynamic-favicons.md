---
title: Dynamic favicons
date: '2010-08-24 13:25:27'
published: true
tags:
  - canvas
  - code
  - html5
  - javascript
modified: '2014-09-03 16:15:12'
---
# Dynamic favicons

Google Calendar released a new favicon which prompted a few mentions from friends on Twitter. The first, probably more important was from [Cennydd](http://twitter.com/Cennydd/status/21986651336):

> New Google Calendar icon most un-Googley. I like it.

Then [Danny pitched in](http://twitter.com/yandle/status/21989058504) with: 

> I see Google Calendar has a new icon. They could use the current date rather than "31" though

So let's fix that shall we?

<!--more-->
## How it's done

The trick here is to use a canvas element and export the image data as a png. Since favicons can be pngs then we know this can work. Note that this technique [has been done before](http://www.p01.org/releases/DEFENDER_of_the_favicon/).

The setup is needing to create two calendar images: one with the date if this doesn't work (defaulting to something like 31) and the second without the date text. For whatever reason, I went and replicated the Google Calendar icon in Photoshop:

![favicon without text](http://remysharp.com/images/favicon-without-text.png)
![favicon with text](http://remysharp.com/images/favicon-with-text.png)

The plan now is to use the favicon template and lay the text over. Simple.

## The minimum starting point

Start your document by including the favicon <code>link</code> element in the <code>head</code>:

<pre><code>&lt;link id=&quot;favicon&quot; rel=&quot;icon&quot; type=&quot;image/png&quot; href=&quot;ical-icon-complete.png&quot; /&gt;</code></pre>

The "complete" version is the favicon with the 31 on it already. Next we'll use JavaScript to dynamically create the favicon.

## Using a canvas for dynamic favicons

We need the following items to make this effect work:

1. A canvas that doesn't have to live in the DOM, that's 16x16 - our favicon size
2. The template favicon image
3. Once, and only once, the template image has loaded, we then go adding the text
4. The date in a two character format, i.e. 04 is the 4th

That's it. For connivence I've added an <code>id</code> to the <code>link</code> element so that I can just change the <code>href</code> when the image is ready. The following JavaScript can be included anywhere below the <code>link</code> element:

<pre><code>(function () {
var canvas = document.createElement('canvas'),
    ctx,
    img = document.createElement('img'),
    link = document.getElementById('favicon').cloneNode(true),
    day = (new Date).getDate() + '';

if (canvas.getContext) {
  canvas.height = canvas.width = 16; // set the size
  ctx = canvas.getContext('2d');
  img.onload = function () { // once the image has loaded
    ctx.drawImage(this, 0, 0);
    ctx.font = 'bold 10px "helvetica", sans-serif';
    ctx.fillStyle = '#F0EEDD';
    if (day.length == 1) day = '0' + day;
    ctx.fillText(day, 2, 12);
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
  };
  img.src = 'ical-icon.png';
}

})();</code></pre>

The important part is the order in which the code runs.  It creates an image element, and hooks an <code>onload</code> event handler.  When this <code>onload</code> event runs, it draws the image on to the canvas using <code>ctx.drawImage(this, 0, 0)</code>. <code>this</code> refers to the image the <code>onload</code> event acted upon, and <code>0, 0</code> is the top, left position to start drawing.

Next we style the text and draw it on.

Finally using <code>canvas.toDataURL</code> we set a new href to the link. 

You should be able to see the code running on this blog post, if you look at the favicon associated with this page, it should be the calendar icon with the correct date if your browser supports the canvas API (IE8 and below don't, all other browsers *do*).

Try changing the date to test it out.

<div class="update">A few people having pointed out that in fact trying to change favicons in IE is not possible. I've read around this a bit now, and it looks like there isn't a way - good thing we're just adding a sprinkle of sexiness then, eh?</div>

<script>
(function () {

var canvas = document.createElement('canvas'),
    ctx,
    img = document.createElement('img'),
    link = document.getElementById('favicon').cloneNode(true),
    day = (new Date).getDate() + '';

if (canvas.getContext) {
  canvas.height = canvas.width = 16;
  ctx = canvas.getContext('2d');
  img.onload = function () {
    ctx.drawImage(this, 0, 0);
    ctx.font = 'bold 10px "helvetica", sans-serif';
    ctx.fillStyle = '#F0EEDD';
    if (day.length == 1) day = '0' + day;
    ctx.fillText(day, 2, 12);
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
  };
  img.src = '/images/ical-icon.png';
}

})();
</script>
