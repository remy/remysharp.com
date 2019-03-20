---
title: link elements block DOM parsing too
date: '2011-06-08 09:53:12'
published: true
tags:
  - code
  - css
  - javascript
  - performance
modified: '2014-09-03 16:15:12'
---
# link elements block DOM parsing too

Today we're pretty well versed with how JavaScript works. We know that `script` elements block rendering (well, actually blocks the parsing, which thus delays the rendering), and we know why8. Sure, so we put the `script` elements at the end of the document. But did you know that `link` elements block too?

<small>* `document.write` can affect the DOM tree, so the parsing makes sure these happen synchronously</small>
<!--more-->

## Sure I did, so what?

In the past it wasn't likely that you would include an externally linked CSS asset, but that's changed today. Today we have services providing fonts, at that point you're linking to an external service from your head element (because we put CSS in the head, and script at the end of the body).

If that service hangs for whatever reason, it'll hang your page too.  Something we've spent a long time in the JavaScript community working to avoid, and now we risk repeating ourselves.

## Why does this happen?

What's a little frustrating is that I can completely understand why a `script` element would block parsing the DOM (and thus block rendering), but I can't see why an external stylesheet would.

Perhaps it's because we could include dynamic content via CSS - but I doubt it. Dynamic content doesn't actually appear in the DOM tree, so I'd guess that it's not blocking the parsing process.  So what else could it be?  Suggestions in the comments please!

Perhaps this is a bug?  Safari, Chrome and Firefox suffer from this issue.  Opera doesn't (but then, does it also block on JavaScript - I have a feeling it doesn't).  I didn't test IE (partly because I was sure it would, partly because I didn't want to start my VM - if someone could confirm, that would be super).

Right now, I'm not sure what's at the root cause, but I do know it's putting some web sites at risk.

<div class="update"><p><strong>Updated 12-June 2011</strong> after further investigation by zcorpan (aka Simon Pieters) and Stepan Reznikov (via their comments below), what we're actually seeing is <strong>render</strong> blocking, and not <em>parsing</em> blocking.</p><p>However, it does, from looking at tests, block JavaScript <em>after</em> the hanging <code>link</code> element from running - which is definitely weird.</p>
<p>There's two example for you - both need the console open: <a href="/demo/hang.html">hang example where content ready fires before CSS has loaded</a>, <a href="/demo/hang-with-script.html">hang example where script waits for CSS before it can run</a></p>
</div>

## Example

This url will show the hanging: [https://jsbin.com/agumu4/3/](https://jsbin.com/agumu4/3/) - make sure you have a web console open and refresh to watch the state change.

    <!DOCTYPE html>
    <html>
    <head>
    <meta charset=utf-8 />
    <title>Hang test</title>
    <script>
    // script in head to debug state change
    console.log('doc state: ' + document.readyState);

    document.onreadystatechange = function () {
      console.log('doc state change: ' + document.readyState);
    };
    </script>
    <link href="http://hang.nodester.com/hang.css?5000" rel="stylesheet" />
    </head>
    <body>
      <p>Hello World</p>
    </body>
    </html>

## Testing

I've created a simple hanging service that you can reuse yourself.  It's running on [Node](http://nodejs.org) so there's no worry of nuking the machine due to the hang (as opposed to using PHP to test using a sleep - which *would* nuke a public machine).

To test include the following url: [http://hang.nodester.com/file.type?ms](http://hang.nodester.com/file.type?ms)

i.e. [http://hang.nodester.com/foo.css?2000](http://hang.nodester.com/foo.css?2000) will return a file with a CSS mime type and hang for 2000 milliseconds.

The best way to determine when the DOM is loaded (or loading) when you can't see the output is to listen for the `readystatechange` event ([ht](https://twitter.com/3rdeden/status/78363201082896384)). So in my test, I've included some script that tells me where the DOM is up to, and I can visually confirm whether the `link` element is hanging.

## What about font includes?

I also tested including hanging fonts via CSS, i.e. if you copied the @font-face declarations, but the font service was down: this *does not* hang the page. However, you do suffer from the [FOUC](http://www.bluerobot.com/web/css/fouc.asp/ "Flash of Unstyled Content (FOUC)"), but that's a whole different issue.

## The fix

As per anything that hangs: do it asynchronously to the DOM rendering - or rather *after* the DOM has done most, if not all of the parsing.  That is, to use JavaScript to insert the `link` element once the DOM - or rather *content* is ready.  Here's a simple example: [https://jsbin.com/agumu4/4](https://jsbin.com/agumu4/4) - note that the `readystate` says it's still loading, that's because my DOM doesn't fully load when the JavaScript appends the `link` element (i.e. it doesn't wait for an event, it's just at the bottom of the document).
