# JavaScript Style - why it's important

I adopted Douglas Crockford's [JavaScript code convention](http://javascript.crockford.com/code.html) some time ago, but at yesterday's [@media Ajax](http://www.vivabit.com/atmediaajax/) he demonstrated, in a beautifully simple way, why it's **really** important.


<!--more-->

The following two examples look the same, but they're not:

<pre><code>// the right way
return {
  'ok': false
};

// the wrong way
return
{
  'ok': false
};</code></pre>

The reason why the second way is wrong, is because JavaScript's semicolon injection in the second version is actually processed as this:

<pre><code>return; // which returns undefined
  
// block level of code that does nothing
{ 
  'ok': false
}

; // this last semicolon is executed as a dummy line</code></pre>

The <code>return</code> code doesn't fail or throw any errors, but as soon as you try to access your result, your code will break since the returned value is <code>undefined</code> rather than an <code>object</code>.