# Safari text sizer for Firefox

I'm a fan of the textarea resize function in Safari 3 - and as such I've had my first crack at a Firefox extension.

<img src="http://remysharp.com/wp-content/uploads/2007/09/example-of-safari-3-sizable.png" title="Example of Safari 3 sizable" style="border: 3px solid #ccc; float: left; margin: 0 5px 5px 0;" />

[Download the Firefox text sizer extension](http://remysharp.com/downloads/textsizer.xpi)


<!--more-->

No doubt this has been written already (please do let me know and put me out of my pain), but like I said it was to give it a go, and, as with most things, here's how it was done.

## Start off with the script

I wrote a straight JavaScript file to allow me to resize the text boxes.  I wrote a simple page to test it with, dropped on three <code>textarea</code> boxes and tested so it all worked.

Here's the [original source code](http://remysharp.com/wp-content/uploads/2007/09/textsizer.user.js).

I tried to encapsulate all the code within one variable to avoid any conflicts with code on the page already.

## Add some grease

By renaming the file to <code>.user.js</code> I was able to use it as a [Greasemonkey](http://www.greasespot.net/) plugin.  Which meant that the script was automatically called each time the page was loaded - exactly what I needed.

## Cheat

After messing around with Firefox extensions for a couple of days and getting nowhere, I changed tack.  I realised that Greasemonkey was definitely the way to go, and after searching for a bit, I found the solution: a tool that [converts Greasemonkey scripts to Firefox extensions](http://arantius.com/misc/greasemonkey/script-compiler).  

## Result

I'm still fairly clueless about how to write a _pure_ Firefox extension, but then on the other hand, I've no need to know how to right now.

If there are any bugs please do let me know.