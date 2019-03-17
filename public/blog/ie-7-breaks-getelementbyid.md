---
title: IE 7 breaks getElementById
date: '2007-02-10 10:25:08'
published: true
tags:
  - bug
  - code
  - getelementbyid
  - ie
  - ie6
  - ie7
modified: '2014-09-03 16:15:12'
---
# IE 7 breaks getElementById

First let me say this took me ages to work out **how** this was going wrong, and that this bug affects **both** IE6 and IE7.

IE is treating the *name attribute* on forms as the *ID attribute*, causing the getElementById to return very unexpected results.


<!--more-->

See the [example of getElementById breaking](http://remysharp.com/wp-content/uploads/2007/01/gebid_test.html).

I've not investigated this beyond the FORM element, but the problem is this:

If you have an element whose ID is 'container', and a form whose name is 'container' but ID is anything else, say: 'formContainer', running the following:

`var elm = document.getElementById('container')
elm.style.display = 'none';`

In IE only, the form will disappear.  Correctly in all other browsers, the element whose ID is container will disappear.

I can only assume this harks back to when the name attribute was being used as the identify, but has now been [formally depreciated by W3](http://www.w3.org/TR/xhtml1/#h-4.10) (for XHTML) and only around for backward compatibility.

The solution is simply not to use the name attribute on forms.  You can still easily target the form without it:

`document.getElementById('submitButton').onclick = function() {
  // do some code
  this.form.submit();
}`
