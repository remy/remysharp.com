# Broken AJAX? Nothing coming back?

I recently came across a <acronym title="annoying">funny</acronym> bug where I was executing an AJAX method and the response was empty.

I check the server side and I know that my particular query is returning a result, but [thanks to Firebug](http://remysharp.com/2006/12/30/firebug-10-beta/) I can see it's failing in the browser.

So there was something definitely amiss.


<!--more-->

In particular, I was returning my result as a JSON object which should have looked like this:

`{message: "Order Filled"}`

However, Firebug was throwing the following error (within the [jQuery](http://jqery.com) library - but I had the same problem when I hadn't used a library):

`syntax error
data =`

The problem is down to the size of the response.  It's something *like* apache is compressing it to nothing.  Not very technical I realise - but the solution is to pad the response.

I fixed it by placing a '\n' before the JSON - since it's legal syntax it doesn't cause a problem, and it means the response is read in the browser. 

All was well again in the land of AJAX & Remy.