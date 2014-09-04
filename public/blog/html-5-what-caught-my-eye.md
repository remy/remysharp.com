# HTML 5 - what caught my eye

I've been looking over the [HTML5](http://www.w3.org/TR/html5/) drafts and [HTML4 - HTML5 differences](http://www.w3.org/TR/html5-diff/) doc, and here's a list of bits that caught my eye, and why.


<!--more-->

1. <code>textarea</code> now [supports <code>wrap</code> again](http://www.whatwg.org/specs/web-forms/current-work/#extensions1).  This is cool if you've got a text box that takes code listings (which [I do](http://todged.com)).
2. <code>input</code> element supports: datetime|datetime-local|date|month|week|time|number|range|email|url - perfect for validation.
3. <code>manifest</code> attribute, lending more support to offline (web) apps.
4. The <code>strike</code> tag is [being binned](http://www.w3.org/TR/html5-diff/#absent-elements).  The funny thing being all the blogs that use the tag to indicate a correction will, without an update (and if they're in standards mode), have the mistake plugged back in.  Then again, the browsers will [probably keep the tag](http://www.w3.org/TR/html5-diff/#backwards-compatible).
5. <code>name</code> attribute is [being striped away](http://www.w3.org/TR/html5-diff/#absent-attributes) from forms and the like (obviously not inputs elements).  [No more excuses IE](http://remysharp.com/2007/02/10/ie-7-breaks-getelementbyid/).
6. <code>getElementsByClassName</code>.  Need I say more?
7. [<code>classList</code>](http://www.w3.org/TR/html5-diff/#htmlelement-extensions).  We will be able to use methods such as <code>has()</code>, <code>add()</code>, <code>remove()</code> and <code>toggle()</code> to manipulate classes on elements.  I can almost smell the library changes.