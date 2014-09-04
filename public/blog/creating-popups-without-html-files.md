# Creating popups without HTML files

I'll start this post by saying: I very very rarely ever need a popup window, and in fact usually just include an inline overlay. But sometimes the situation comes up when I need a popup - this was one of those times.

One thing that always bugged me about dynamic popup windows when compared to dynamic iframes: you need a separate `.html` file to use as the target of the popup. I've documented this process because it might help someone else. I'm not saying you *should* use these methods, method 2 is particularly distasteful - I'm just sayin': *you can*!

Here's two methods where you don't need a separate file.

<!--more-->

## Why do you want a dynamically generated popup?

For me there was a very specific situation, but one I've come up against in the past is bookmarklets (and userscripts). If you have a bookmarklet, it's likely that the single JavaScript file (or inline code) will include the entire application. If you need a popup, then you need a static HTML file, which then also means you need to host said file.

If you can generate the popup target file on the fly, the code can remain entirely inside your JavaScript file and it has zero dependencies.

I'm just documenting what I did in case there's any other folk trying to pull off the same trick.

## Method 1: using a data url

The data url, a beautiful thing:

> The data URI scheme is a URI scheme that provides a way to include data in-line in web pages as if they were external resources

[Source: Wikipedia](http://en.wikipedia.org/wiki/Data_URL)

One common use of the data url is inline images in HTML or CSS files, usually looking something like:

    data:image/png;base64,iVBORw0KG......

You can also use this same technique for [HTML files too](data:text/html,&lt;title&gt;Hello%20Data%20URL&lt;%2Ftitle&gt;&lt;p&gt;File-less%20HTML%20page!&lt;%2Fp&gt;):

    data:text/html,<title>Hello Data URL</title><p>File-less HTML page!</p>

With that, it means we can dynamically generate a popup window without a `.html` file clogging up our mojo:

    window.open('data:text/html,<title>Hello Data URL</title><p>File-less HTML page!</p>', 'Hello World', 'width=400,height=200');

This [works](http://jsbin.com/etizam/1/edit) perfectly if all you want is a dynamic popup (that's supported in IE8 and others).

However, if you want that popup to talk to the parent window that generated the popup in the first instance (which in my case was true), you're outta luck since **the data url origin does not match the origin of the domain that created the popup**, which basically equals *no dice*. So that's how I got the craziness you're about to see.

## Method 2: using the parent page as the popup child

Um, what? This solution uses the HTML file that creates the popup as the *target* of the popup. Once open, the popup nukes the DOM and rewrites it with it's own.

It's not a pretty solution, but works in some cases (mine in particular) and has the distinct advantage that the popup resides on the same domain as the parent, and thus allowed to talk directly to it.

I should add that this method works for scripts that have been hardcoded in to the user's page. A plugin or a browser userscript would match this particular situation.

A couple of additional caveats in an already crazy sounding solution are:

1. You need some kind of identifier on the url to indicate this is the *popup version*
2. Any JavaScript that's executed before your script is encountered will be executed. If you can make sure your script is first, you can prevent the successive scripts from running.

One single script is included as the first script include on this page with the following code ([and demo](http://jsbin.com/etizam/2/quiet)):

    if (window.location.hash.indexOf('#popup') === -1) {
      window.open(window.location + '#popup', 'Popup', 'width=300,height=300');
    } else {
      // we are the popup
      initPopupClient();
    }

    function initPopupClient() {
      // here we're overwriting the contents of the HTML element
      // causing any successive scripts to be removed - thus if
      // we can be first, it's a good thing.
      document.documentElement.innerHTML = [
        '<title>Popup tool</title>',
        '<style>* { font-family: comic sans; }</style>',
        '<p>Welcome to our dynamically generated popup</p>'
      ].join('');

      // now trigger any function on our parent window
      window.opener.alert('Hello from the popup');

      // or send it messages nicely
      window.opener.postMessage('This is less invasive I guess!');
    }

### Trashing the original DOM.

Since we're using the parent page as the popup source, we need to remove the DOM entirely and replace it with ours. By overwriting the contents of the HTML element we succeed in doing that:

    document.documentElement.innerHTML = ...some new markup...

Here's a simple [example](http://jsbin.com/ahomut/1/quiet) that only shows one sentence and doesn't include the alert (view the source to see what you were *supposed* to get).

### Referring to the parent window

We do this in the regular way of accessing the `opener` property. This allows us direct access to any method, and if you're going to be nice, you'll just use the `postMessage` allowing the parent to just listen for message events:

    window.opener.postMessage(JSON.stringify(someData));

# Disclaimer

Both these techniques are pretty extreme and you should consider you have good reason to actually use them. For my particular problem (which should be detailed in my next post) it was a necessary evil. Make sure you really don't want that hosted `.html` file! The only reason I came to this conclusion (of crazy hoop jumping) was because of my requirements for [remote-tilt.com](http://remote-tilt.com)'s polyfill script.
