# Stop treating Ajax as something special

Everyone wants slick applications that use Ajax to reduce page loads and make it feel, well, more application-ny.  Of course this is all done in a progressively enhanced way, so the page works just as well without JavaScript.

The problem is, that sometimes, there's an overhead of the extra work to support the Ajax responders.

If you stop treating Ajax as something special, you'll find it's barely any extra work on the server side.


<!--more-->

## KISS

Think of it like this: the Ajax response is the content that drives the page (or parts of it), only without the HTML.

On the server side, you've got to collection different datasets to build up the page.  The Ajax responders should go through exactly the same route to get that data.

So here's how you write your Ajax responders compared to how you write the server side code:

1. The Ajax call should use the *same* functions.
2. The Ajax call should use the *same* controller.
4. The Ajax call should use the *same* url.
3. The Ajax call *could* use the *same* query string.

## Detecting Ajax

Ajax requests via popular libraries such as YUI, jQuery, Prototype, etc, all include a header that indicates the request is via Ajax:

<pre><code>X-Requested-With: XMLHttpRequest</code></pre>

So you can control the logic flow in the controller by checking if this header is present.

For a practical example, I created (some time ago) a user registration page that includes validation. If the fields are valid, then the registration happen.  If any of the fields aren't valid, it returns the page and the error notices.  

The JavaScript enabled version of the page acts in the exact same way, except the page doesn't reload and validation (i.e. to check for duplicate usernames) is done on the server side.  

It reuses the validation module and the same controller as much as possible.

[View the demonstration of this in pactise](http://jqueryfordesigners.com/demo/ajax-validation.php) ([view the PHP source](http://jqueryfordesigners.com/source/ajax-validation.php))