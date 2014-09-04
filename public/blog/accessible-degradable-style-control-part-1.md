# Accessible, degradable style control - part 1

This the first in a two part tutorial on how to create style control links to your web site to control font sizes and to control style sheets both from JavaScript and with JavaScript disabled browsers.

This method will also keep the user on the page they changed the style from, and will continue to hold until they clear their cookies.


<!--more-->

Part 1 will focus on the font control, and part 2 will control the style sheet.

## Steps Involved

1. [The HTML](#html)
2. [Server side script to managed non-JavaScript enabled browsers](#server_side)
3. [JavaScript to change font sizes dynamically](#javascript)

<h2 id="html">HTML</h2>

So that we have a clear view on how the functionality will degrade, we're starting with HTML.  The HTML looks like this - and note that we will be using the information in the links to control the style of the page:

<pre><code>&lt;ul&gt;
  &lt;li&gt;&lt;a class=&quot;fontControl&quot; href=&quot;/change/font/1.5em&quot;&gt;Large Font&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a class=&quot;fontControl&quot; href=&quot;/change/font/1em&quot;&gt;Medium Font&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;</code></pre>

Note also, that I am going to use the class fontControl to hook our [JavaScript](#javascript) to the links.

In our HEAD tag we will add a style sheet to manage the font changes:

<pre><code>&lt;link rel=&quot;stylesheet&quot; title=&quot;font_adjust&quot; href=&quot;/css/font.css&quot; type=&quot;text/css&quot; /&gt;</code></pre>

The font.css is actually a PHP script (in my case, in yours it can be anything), hidden with a dash of [mod\_rewrite](http://httpd.apache.org/docs/1.3/mod/mod_rewrite.html).  This is also true with the font change links, as explained below.

<h2 id="server_side">Server Side</h2>

### .htaccess

If you don't have access to manage the .htaccess or don't have mod\_rewrite enabled, then you should ignore this section, but read [non-.htaccess](#non_htaccess).

Your .htaccess file should look like this:

<pre><code>Options +FollowSymLinks +ExecCGI
RewriteEngine On
RewriteBase /
RewriteRule ^change/(.*)/(.*)$ change.php?$1=$2 [L]
RewriteRule ^css/font.css$ css/font.php [L]</code></pre>

The important parts are the last two lines.  If you already have mod\_rewrite rules put these in above any main redirects (i.e. in WordPress it would go **above** the last conditions and rule).

Now you need to [create the files](#files) that will handle the style control (skip the non-.htaccess).

<h3 id="non_htaccess">Non-.htaccess</h3>

It's not as clean, and you don't get to use [sexy URLs](http://rikrikrik.com/log/net-article-create-sexy-urls-with-modrewrite), but it's still possible.  From the links you have created, change as follows:

<pre><code>/change/font/... => /change.php/font/...</code></pre>

The font adjustment style sheet should point to font.php (instead of font.css).

<h3 id="files">Change and Font files</h3>

The change script will manage the setting of the cookie to control the font size change, and the font script will manage the getting of the cookie to set the font size in the browser.

#### change.php

<pre><code>&lt;?php
// work out where to redirect the user back to
$target = isset($_SERVER[&apos;HTTP_REFERER&apos;]) ? $_SERVER[&apos;HTTP_REFERER&apos;] : &apos;/&apos;;

// collect the info for the style change
$request_path = (isset($_SERVER[&apos;REQUEST_URI&apos;]) ?
preg_replace(&apos;/\?.\*$/&apos;, &apos;&apos;, $_SERVER[&apos;REQUEST_URI&apos;]) : &apos;&apos;);
$methods = explode(&apos;/&apos;, $request_path);
if (count($methods)) {
  if ($methods[2] == &apos;font&apos;) {
    $f = isset($methods[3]) ? $methods[3] : &apos;1em&apos;;
    setcookie(&quot;font_size&quot;, $f, time()+(3600*365), &apos;/&apos;); 
  }
}
header(&quot;Location: $target&quot;);
?&gt;</code></pre>

Note that the font defaults to '1em' and the cookie expires in a year (365 multiplied by the seconds in a day plus time now).  You can easily change this to suit the style of your web site.  

#### font.php
_
<pre><code>&lt;?php if (isset($_COOKIE[&quot;font_size&quot;]) &amp;&amp; $_COOKIE[&quot;font_size&quot;]) {
  header(&apos;Content-type: text/css&apos;);
  echo &quot;BODY { font-size: {$_COOKIE[&apos;font_size&apos;]}; }&quot;
} ?&gt;</code></pre>

<h2 id="javascript">JavaScript</h2>

The solution so far should work without JavaScript enabled.  However, we want to allow this functionality without having to reload the page.

For this we will need cookie setters and getters, font size changing methods and an 'onload' function to apply the JavaScript once the <abbr title="Document Object Model">DOM</abbr> has loaded.

Here is the [cookie library](http://remysharp.com/wp-content/uploads/2007/02/cookie.js)

I am using [jQuery](http://jquery.com) with the JavaScript, so include the libraries as follows:

<pre><code>&lt;script src=&quot;/js/jquery.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;/js/cookie.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;&gt;&lt;/script&gt;</code></pre>

Now add the start up JavaScript (remember that all the script tags should really be inside the HEAD tag):

<pre><code>&lt;script type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;&gt;
$(function(){
  $(&apos;A.fontControl&apos;).click(function() {
    // find the last part of the href and use this to set the font
  var f = this.href.substring(this.href.lastIndexOf(&apos;/&apos;)+1);
  set_font_size(f);
  return false; // cancel the click through
  });
})

function set_font_size(f) {
  $(&apos;body&apos;).css(&apos;font-size&apos;, f);
  createCookie(&apos;font_size&apos;, f, 365);
}
&lt;/script&gt;</code></pre>

If you're not familiar with jQuery, here's a short explanation:

<pre><code>$(function()) {</code></pre>

Execute the contents of this function when the DOM has loaded, i.e. the page is ready.

<pre><code>$('A.fontControl').click(function() {</code></pre>

Find all the anchor tags with the class 'fontControl' and attach a click event.

<pre><code>var f = this.href.substring(this.href.lastIndexOf('/')+1);</code></pre>

Using the 'this' variable within the A context, collect the last part of the URL (within the path).

<pre><code>$('body').css('font-size', f);</code></pre>

Set the font size CSS attribute to the font size passed in.

## Wrapping up

Remember to test your implementation with both JavaScript turned on and turned off.

When it comes to where to add the style control links, I would recommend placing the style control in the footer, only because it's useful to users who are seeing the style.  

Screen readers *may* not make much use of this feature, so I tend to add it to the footer of the code, and use absolute positioning to create a roll over effect in the header, see my [example at (work in-progress) Kajinka](http://kajinka.com) (the top orange bar - then view the source).

Next week I will post the second part of this tutorial to allow the user to view your site naked (i.e. no css) using similar methods.

If you have any questions, comments or recommendations please drop me a comment and I'll do my best to reply.