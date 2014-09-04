# jQuery multibinding events

Sometimes I find myself using the same event handler for more than one event on an element. Typically I just put the function in the global name space (or perhaps privately within the scope of the ready function depending on how the mood takes me), and then I'll refer to the function twice.  But this feels a bit like duplication.

To hide my duplication, I've <del>written</del> <ins>wasted my time creating</ins> a simple plugin that gives me the ability to bind to more than one event at once.

<a href="http://paulirish.com">Paul</a> kindly pointed out that the functionality is native to jQuery - so here's the examples.

<!--more-->

<div class="update">
  <p>That'll teach me for writing code late at night! I completely overlooked that this is native functionality within jQuery: <code>$('input').bind('keyup change', fn);</code></p>
  <p>I'm leaving the post here, but have retracted the download link (and tweaked the post a bit).</p>
</div>

## Typical code

This is where I would normally need the function twice.  Here's the lame version of the code:

<pre><code>$('input').keyup(function () {
  var i = 255-this.value, j = this.value;
  $('body').css('background', 'rgb(' + [i,i,j].join(',') + ')');
}).change(function () {
  var i = 255-this.value, j = this.value;
  $('body').css('background', 'rgb(' + [i,i,j].join(',') + ')');
});</code></pre>

Which can be simplified to:

<pre><code>function colour() {
  var i = 255-this.value, j = this.value;
  $('body').css('background', 'rgb(' + [i,i,j].join(',') + ')');
}

$('input').keyup(colour).change(colour);</code></pre>

But the <code>colour</code> function feels redundant because it's only required for that little bit of closure (and sure, I know for high performance apps, it's probably better that way, but we're just hacking right now).

## Multibind handler

With multibinding, you can bind the same event handler to more than one event:

<pre><code>$('input').bind('keyup change', function () {
  var i = 255-this.value, j = this.value;
  $('body').css('background', 'rgb(' + [i,i,j].join(',') + ')');
});</code></pre>

