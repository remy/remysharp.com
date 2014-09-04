# window.onresize hangs IE6 and IE7

Another bug that I've not seen before that caused some confusion. Actually, the bug almost makes sense, except that it leaves IE6 and IE7 completely hanging.


<!--more-->

## Details of the Bug

You've hooked an <code>onresize</code> event and there's some, supposedly, innocuous code in the handler.  Upon resizing, resizing works fine in all browsers, except IE.  IE will result in a total hang, that will probably require you to kill the running process.

## Demo

I've created demo, designed to show you how to prevent the bug from executing and then allowing you to create the scenario that causes the hang.

[View the IE onresize hang demo](/demo/resize-crash.html)

Upon loading the demo, it's designed not to hang.  If you remove the 'limiter' in IE it should hang the browser.  If you remove the limiter, and enable the container, you should find it *doesn't* hang.

## The Scenario

This bug only occurs when the resize handler (or any functions called from the handler) create new lines of content in the browser.  It will happily add content horizontally, but vertically causes a hang.

## Why?

Basically it's a daft infinite loop.

In IE, the JavaScript is doing this:

1. Hook onresize
2. Resize event triggered
3. Run the handler
4. Handler increases the height of the content (not the window, but remember, this is IE)
5. Since the window's content height has increased, it triggers a resize event - go to 3...and so we have our infinite loop

This is why either capping the resize firing or putting the changing content in a fixed height container doesn't cause the error to occur.

Firefox handles this issue by firing the resize event once the resize has completed.  Safari fires throughout the resize, but doesn't hang.

There *is* an IE specific <code>onresizeend</code> event, but I couldn't get it to work - I tried setting the event via JS, via VBScript (I had to wash TextMate afterwards it felt so dirty writing VBScript!) and I tried an event specific script tag (as per <a href="http://msdn.microsoft.com/en-us/library/ms536960(VS.85).aspx">Microsoft's MSDN page</a>).  I would have expected this would get around the issue.

I wonder if any of the JavaScript geniuses might be able to find a solution :-)