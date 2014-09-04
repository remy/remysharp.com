# Pretty in Print: tips for print styles

Printing web pages is <span style="cursor: help; border-bottom: 0.1em dashed #646464;" title="...which is probably a good thing for our environment.">often forgotten about</span> and there's nothing more annoying than printing out a web page that comes out in one long, half page width column spanning 5 pages when it should be 2.

You don't need to have a completely separate page for print either.  All too often we see web sites creating popups with print versions of their pages.  In most cases, it's not required.  All that you need is a well thought through print style sheet.


<!--more-->

## Build on top of what you have

Rather than having one screen style sheet and one for print ([there are 8 others by the way](http://meyerweb.com/eric/articles/webrev/200001.html)), it should be a lot easier to use the print style sheet **on top of** the screen style to change the appearance of your site - remembering that you may still want to retain some branding.

`<link media="screen,print" rel="stylesheet" type="text/css" href="/css/main.css" />
<link media="print" rel="stylesheet" type="text/css" href="/css/print.css" />`

## Have an easy way to test your print style

You can waste precious time going back and forth from the normal page to the print preview - so build in a method of previewing the print style (note you can also use the [Firefox](http://getfirefox.com) developer toolbar > CSS > Display CSS by media type).

This is what I do so I can request any page and include '?print\_style' to preview my print style:

<code>&lt;link media="&lt;?php echo isset($\_GET['print\_style']) ? 'screen' : 'print'; ?&gt;" rel="stylesheet" type="text/css" href="/css/print.css" /&gt;</code>

## Remove redundant blocks

Remove the header, remove the footer<sup>&dagger;</sup> and remove the sidebar.

<small>&dagger; But remember to keep your copyright</small>

Then look through the page and find anything that does not constitute as information, or would not be useful once the page is printed - and get rid of it.  A simple example can be seen on my blog - I've removed the comments form in the print style sheet.

**Do not** remove anything that would constitute as information to the customer or user.

## Think about the contrast

If you're site is light text on a dark background, switch it around for the print style sheet. 

Try to think about how much ink you want to use up.  This isn't so relevant on small blocks of text or images, but you should consider it.

A point for discussion, is [some sites](http://bbc.co.uk) offer a high contrast version of their site for people with visual impairment - are there printers that support this as an option, or should we in fact keep the high contrast on print?  

I suspect the best solution is to test whether they have selected a high contrast view, and use an alternative print style sheet matching the user's needs.

## Make it work on paper

### Width

Set your print width out to 100%.  

From a practical point of view, the best way to achieve this is to set 'width: 100%' on the BODY tag and 'width: auto' on any container elements with fixed widths that should be stretched out.

### Expand out links and abbreviations

The problem with print, is that you can't follow the links on the page, and most times you can't see where the links would have gone.

You can help by expanding out the links and abbreviations in the print style, using the pseudo selector ':after'.

<pre>A:after {
  content: " (" attr(href) ")";
}

ABBR:after {
  content: " (" attr(title) ")";
}
</pre>

Note that <abbr title="Internet Explorer">IE</abbr> (up to, and including 7) still doesn't support this selector, so you've made the Firefox and Safari users lives a little easier.

## Let the user decide

If possible, let the user decide what should be included in the printout. This would mean using a server-side script to generate the print style on the fly.

Check box options could include:

1. Include comments (for blogs or articles)
2. Expand links
3. Expand abbreviations
4. Print page as displayed on screen

## Watch out for bugs

Just like your web site design, make sure you're careful to test your print design.  Here are a couple of bugs I came across in some recent print testing:

1. Firefox sometimes hide text when printed (though not in my browser preview) - I found this only happened to text was floated right, so I the used float:none fixed the problem.
2. Safari 2 sometimes mangles expanded links - one link may appear as the href for several other links.  However, this <b>is</b> fixed in the latest [Webkit](http://webkit.org/)

## Anything else?

If you think I've missed an important tip, please let me know and I'll add in the best tips.