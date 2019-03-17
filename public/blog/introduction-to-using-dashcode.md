---
title: Introduction to using Dashcode
date: '2007-09-16 18:31:52'
published: true
tags:
  - code
  - dashboard-tag
  - dashcode
  - javascript
  - mac
  - tutorial
modified: '2014-09-03 16:15:12'
---
# Introduction to using Dashcode

I recently wrote my first Dashboard app: [HTML entities](http://leftlogic.com/lounge/articles/entity-lookup/) (named in the [top 10 widgets](http://www.engadget.com/2007/07/07/enwidget-ten-useful-apple-dashboard-widgets/) by engadget.com), widget using [Dashcode](http://developer.apple.com/tools/dashcode/).  Since the product (Dashcode) is still in beta, there wasn't a great deal of resource available for developing widgets, so I'm sharing my experience and any tips I can offer for development.


<!--more-->

## Generic Ajax Widget

As part of this article, I've included a generic Ajax widget that simply grabs a URL and parses out a small section of the <abbr title="Document Object Model">DOM</abbr> that I'm interested in.  It's a good jumping off point to get going with an Ajaxified widget.

[Download generic Ajax widget](/downloads/ajax_widget.zip)

[Download the source Dashcode Ajax project](/downloads/ajax_widget_project.zip)

## Getting Dashcode

If you've got a recent version of Tiger (certainly bought any time this year), the system CDs will contain Dashcode in the developer kit (it may be installed already in your <code>/Developer/Applications</code> directory).

Apple did have [Dashcode available for download](http://developer.apple.com/tools/dashcode/), but since it expired in July ([when Leopard was *supposed* to come out](http://remysharp.com/2007/04/13/apple-delays-osx-leopard/)) it's no longer there.  You can hunt around the Internet for a old mirror if you don't have the CDs.

Once installed, it'll say it's expired: [just get Dashcode working again](http://remysharp.com/2007/07/30/lets-get-dashcode-working-again/).

## Stability

<img title="Broken Dashcode Render" alt="Broken Dashcode Render" src="http://remysharp.com/wp-content/uploads/2007/09/broken-dashcode-render.jpg" height="72" width="178" style="float: right; padding: 0 0 3px 3px;" />Dashcode is particularly ropy with Safari 3 beta (i.e. crashes and you get strange alignment issues with graphics - see example on right).  With Safari 2 (and I suspect Safari 3 final release with Leopard) it's much more stable.  Since there is the occasional crash from Dashcode, I would recommend constantly saving your project as you're coding.  I found more than 10% of the time, Dashcode would crash and result in a total loss of my code from the last save point.

Also, I've noticed that dumping a lot to the run log, when viewing the log, can cause Dashcode to slow right down to almost hanging.  Best to avoid dumping large amounts of HTML to the log.

However - and this is a big one - the upside of programming with Dashcode is worth the risk of the crash, because it's takes most work out of the design process.  Since you're using it's <abbr title="Graphical User Interface">GUI</abbr> to drag and drop your design and how the user will interact with it, rather than having to code the look and feel by hand.

## Designing Widgets

The interface and the library component of Dashcode makes it possibly the strongest app for developing widgets.  It's 2 minutes work to create a glass effect on your widget, or to place the elements on the window and get going.

I would strongly recommend studying other widgets, and reading through the [Dashcode design recommendations](http://developer.apple.com/documentation/AppleApplications/Conceptual/Dashboard_ProgTopics/index.html#//apple_ref/doc/uid/TP40002837) as it's easy to design a widget that works, but twice the work to design a widget that's usable and works well (and I'm sure you'll agree worth the extra distance).

You'll find you can place widget-type objects on your widget, like scroll areas or gauges - but to handle them in the code isn't entirely intuitive, which is why the best source of understand how these interface elements work, is by opening up other widgets that already make use of the element.

## Controls

Dashcode offers the easy integration of bespoke elements such as the scrollarea, gauges and other such sexy components.  They're pretty easy to drop on to the widget from Dashcode, but until you're coding, they're not immediately obvious how they work.

The help is limited, so I would recommend to develop by tutorial, in particular, look for the 'refresh()' methods - as this seems to be a fairly standard way to redraw objects.

Full documentation for the [Apple classes API](http://developer.apple.com/documentation/AppleApplications/Conceptual/Dashboard_ProgTopics/index.html#//apple_ref/doc/uid/TP40002837) is available, but it's pretty clinical.

## Effects

Although effects are available within the Apple classes, you'll need to implement them yourself.  This is fairly limited to dynamic resizing of the widget, which is achieved using:

<pre><code>window.resizeTo(x, y);</code></pre>

If you are going to resize the widget dynamically, check out the [Apple resizing examples](http://developer.apple.com/documentation/AppleApplications/Conceptual/Dashboard_ProgTopics/index.html) too.  

I used this technique in my [HTML entities](http://leftlogic.com/lounge/articles/entity-lookup/) widget to keep the widget small when it's dropped in to the Dashboard, but to allow it to grow dynamically when the user searched for a particular HTML entity.

You should be able to find [easing effects code and examples](http://www.google.com/search?q=javascript+easing+effect) if the built in Apple animation class doesn't suite your needs.

## Running system commands

This is one of the few areas that's well documented in the provided [API](http://developer.apple.com/documentation/AppleApplications/Reference/Dashboard_Ref/index.html#//apple_ref/doc/uid/TP40001339).  You can run system commands using the following type of command:

<pre><code>widget.system('ps -auxww | grep ' + myCommand, null);</code></pre>

What you should keep in mind, is that you can run **any** command through the system method.  This includes Perl, Ruby, AppleScript and anything else that suits your needs.  Using these commands I've recently been able to create a widget that queries [Mail's SQLite's database via Perl](http://remysharp.com/2007/07/03/a-way-to-keep-track-and-in-touch/).  It was a case of running the system method and capturing the output (and in my case, eval'ing it from a <abbr title="JavaScript Object Notation">JSON</abbr> output).

## Ajax in the widget

You widget supports a variation of the Ajax object (or rather xmlhttprequest object).  This version isn't bound by the usual security constraints of a browser - most importantly, it can request content from any domain.  

To execute any Ajax requests from your widget, ensure you have the **Allow Network Access** attribute turned on - otherwise the Ajax will fail without any given reason.

For example, you could use Ajax to pull your film page from [IMDb](http://imdb.com) and then parse the XML for the elements of interest.  

However, if you do want to pull some data from a web page and process it using the DOM returned you have to fiddle the request - in particular the <code>responseXML</code> will be null because the page being returned isn't <code>text/xml</code> - it's <code>text/html</code>.  You can do it using the following (in [jQuery](http://jquery.com) syntax):

<pre><code>$.ajax({ 
    url: 'http://remysharp.com/example_page', // doesn't really exist!
    dataType: 'html', // important
    success: function (xml) {
        // convert the HTML to an XML DOM object
        var dom = getDOMfromXML(xml);
        alert(dom.getElementsByTagName('h1').length);
    }
});

function getDOMfromXML(xml) {
	var d = document.createElement('div');
	xml = xml.substring(xml.indexOf('&lt;body') + xml.substring(xml.indexOf('&lt;body')).indexOf('&gt;')+1);
	xml = xml.substring(0, xml.indexOf('&lt;/body&gt;'));
	d.innerHTML = xml;
	return d;
}
</code></pre>

This <code>getDOM</code> function is pretty horrible - but it works.  I tried using <code>DOMParser</code> and tried using [Ajax local data trick](http://web-graphics.com/mtarchive/001606.php) and I tried using an iframe to inject the XLM - but neither would load the XML properly (in fact it would be blank).  The iframe would not load properly because it was still loading the entire frame while I was trying to access it.

You can see this in use in the [generic Ajax widget](/downloads/ajax_widget.zip) or download the [source Dashcode project](/downloads/ajax_widget_project.zip).

## Widget Attributes

The widget attributes are fairly self explanatory, but it's worth knowing:

* Allow Network Access is required for Ajax requests
* Allow Command Line Access is required for running external programs, i.e. if you have a Perl script executing some arbitrary task

If you intend to make your widget available in different languages, then this is the place to enter the different strings.

## The Inspector

- Hide items from the default image to present a better widget when it's installing.  It can to keep the preview of your app looking clean.

## Debugging

Dashcode comes with a log that can be viewed during run time.  

You have following debugging tools:

* Breakpoints
* Live stack traces
* Evaluate window - to test commands

To write to the log, you need to use <code>alert("My debug message");</code>.

## Gotchas

Here's a short list of things that tripped me up:

1. Dynamically resizing the widget: window.resizeTo
2. Changing styles: document.getElementById(id).style.setProperty('display', 'none');
3. Calling refresh on an element that is hidden (display: none) will **not** update the display - in particular the scrollarea.
4. If you edit the JavaScript in an external editor (as I do, in TextMate), the debugger in Dashcode has a habit of ignoring changes, even though they're being used to run the widget. 
5. Ajax request.responseXML is null if you request XML from a web page - i.e. since web pages are (mostly) severed as <code>text/html</code> rather than <code>text/xml</code> - this attribute is null.  See the Ajax section of this article to get around this problem.
6. The debugger's interface, when copying variable values is limited to 32k - this doesn't mean the actual response is 32k, only that the particular textfield couldn't handle the full length.

If you have anything else useful to add to help making widget development easier, please let us know by leaving a comment.
