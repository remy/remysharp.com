# How to tell if jQuery is out of date

As with most projects I work on, there's normally some JavaScript interaction.  Often, however I've got all kinds of different versions of jQuery going on in these projects so when I try to access the latest functionality, and it groaks, I'll go sniffing around to check if it's the latest version.

Never again!


<!--more-->

## Download

I've created a Firefox plugin and Greasemonkey version of the app:

<script type="text/javascript">
function installXPI(href) {
    if (typeof(InstallTrigger) != 'undefined') {
        var xpi = {'isjquerylatest': href};
        InstallTrigger.install(xpi);
    } else {
        alert("You must be using Firefox to install Firebug.");
    }
}
</script>

<a onclick="installXPI('/downloads/islatestjquery.xpi'); return false;" href="/downloads/islatestjquery.xpi">Firefox plugin: Latest jQuery</a>

[Greasemonkey script: Latest jQuery](/downloads/islatestjquery.user.js)

Note that:

* If jQuery is not on the page - nothing happens.  
* If jQuery is up to date - nothing happens.
* If jQuery is *out* of date - a message appears.
* If Firebug is installed, the message is sent to the console, otherwise it is sent to an alert box.

## How it works

I've been making use of the version number in jQuery - which is nicely tucked away:

<pre><code>&gt;&gt;&gt; $.fn.jquery
"1.2.3"</code></pre>

Using this, I figured I could automate a way of comparing the local jQuery version against the latest production version.

The logic is simple:

1. Create an iframe sandbox and inject a script tag pointing to the latest jQuery.
2. Compare current <code>$.fn.jquery</code> to the iframe version and notify if different.
3. Kill the iframe to restore the DOM back to original.

Although this shouldn't strictly be doable in Greasemonkey, I kind of found a way around the sandboxing rules it enforces on you.

I managed to get around the sandboxing rules by doing the following:

1. Create the iframe.
2. Drop it in to the DOM.
3. Using <code>document.write</code> on the iframe, populate it with code to do the donkey work.

If you [look at the source code](/downloads/islatestjquery.user.js) you'll see the function to be run sits in a variable, which I convert to text and wrap in <code>'(' + code.toString() +')()'</code> - to make it auto-execute once the iframe has been dropped in.

Since the iframe is in the original page's DOM, it means I have full access to the <code>window.parent</code> - which holds all the public variables on the <code>window</code> object - which is how all the magic works.