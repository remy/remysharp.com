---
title: 'jQuery tutorial: Text box hints'
date: '2007-01-25 16:02:25'
published: true
tags:
  - code
  - plugin
  - tutorial
modified: '2014-09-03 16:15:12'
---
# jQuery tutorial: Text box hints

<div class="update">
<p><strong>Updated March '08:</strong> I've separated the plugin to a separate <a href="/downloads/jquery.hint.js">jquery.hint.js</a> file and included a fix to get around Firefox's autocomplete</p>
</div>

<p>You will see a lot of web sites with search boxes have text already populated inside of the field and when you select the input text box it disappears and reappears when it&#8217;s not selected.</p>

<p>This tutorial will show you how can add a small amount of <a href="http://jquery.com">jQuery</a> to add this feature to any of your web sites.</p>


<!--more-->

<h2>The Goal</h2>

<ol>
<li>To create a jQuery <a href="http://docs.jquery.com/Plugins">plugin</a>.</li>
<li>Show a &#8216;hint&#8217;<sup>&dagger;</sup> inside the input box when it is not in focus<sup>&dagger;&dagger;</sup> (aka blurred).</li>
<li>Hide the hint when the text input has focus.</li>
</ol>

<p><small>&dagger; The hint is what I am calling the text that appears and disappears within the input box.</small></p>

<p><small>&dagger;&dagger; Focus is the term (in this case) to indicate the user&#8217;s cursor is in the text field.  Blurred is the opposite.</small></p>

<h2>Demo</h2>

<p>Our demo shows a input box for a finance web site that allows the user to search by company name or by the symbol (ticker).</p>

<p><a href="/images/input_hint.html">See the demo in action</a></p>

<h2>How it will work</h2>

<ol>
<li>We are going to get the hint from the &#8216;title&#8217; attribute of the input box.</li>
<li>When the input box has focus we will hide the hint - only if the text in the input box matches the title attribute.</li>
<li>When the input box is blurred, and it doesn&#8217;t contain any text, we will show the text again.</li>
<li>If the input box is blurred and <em>does</em> contain text, we won&#8217;t do anything.</li>
</ol>

<h2>Unobtrusive JavaScript</h2>

<p>The first step is to design the HTML so that it will work sensibly without JavaScript turned on, i.e. we&#8217;re <strong>not</strong> going to put our hint in the input box.  Since we are planning to put the hint in the title tag we&#8217;re set to code.</p>

<h2>The Code</h2>

<h3>HTML</h3>

<pre><code>
&lt;form action=&quot;&quot;&gt;
    &lt;div&gt;&lt;label for=&quot;search&quot;&gt;Search:&lt;/label&gt;
    &lt;input type=&quot;text&quot; name=&quot;seach&quot; value=&quot;&quot; id=&quot;search&quot; title=&quot;Company name or ticker&quot; /&gt;
    &lt;input type=&quot;submit&quot; value=&quot;Go&quot; /&gt;
    &lt;/div&gt;
&lt;/form&gt;
</code></pre>

<p>Pretty simple - nothing unexpected there.</p>

<h3>jQuery Plugin</h3>

<pre><code>jQuery.fn.hint = function (blurClass) {
  if (!blurClass) {
    blurClass = 'blur';
  }

  return this.each(function () {
    // get jQuery version of 'this'
    var $input = jQuery(this),

    // capture the rest of the variable to allow for reuse
      title = $input.attr('title'),
      $form = jQuery(this.form),
      $win = jQuery(window);

    function remove() {
      if ($input.val() === title && $input.hasClass(blurClass)) {
        $input.val('').removeClass(blurClass);
      }
    }

    // only apply logic if the element has the attribute
    if (title) {
      // on blur, set value to title attr if text is blank
      $input.blur(function () {
        if (this.value === '') {
          $input.val(title).addClass(blurClass);
        }
      }).focus(remove).blur(); // now change all inputs to title

      // clear the pre-defined text when form is submitted
      $form.submit(remove);
      $win.unload(remove); // handles Firefox's autocomplete
    }
  });
};</code></pre>

<p>Here&#8217;s a breakdown of some of what&#8217;s going on:</p>

<pre><code>return this.each(function() {</code></pre>

<p>Ensure we are applying the plugin to all the matched elements and allowing our plugin to be <a href="http://docs.jquery.com/How_jQuery_Works#Chainability_.28The_Magic_of_jQuery.29">chained</a>.</p>

<pre><code>var $input = jQuery(this)</code></pre>

<p>Creating a cached copy of the jQuery object so we can use jQuery&#8217;s functions for testing, without the overhead of continuously making new jQuery objects.</p>

<p>We're using a $ symbol as a prefix to the variable to give a visual que that the variable contains jQuery functions, rather than a plain DOM element.</p>

<pre><code>$input.blur(function(){</code></pre>

<p>When the element loses focus - execute the function that has been passed in.  In our case, we are testing whether the field has been left blank, and if it has - we set it to the title attribute (cached earlier).</p>

<p>We are also adding a class called &#8216;blur&#8217; to the input box so as to give the user the impression that the text that appears in the box has not been entered by them.  Note that we remove this class when the element takes focus.</p>

<pre><code>$input.blur()</code></pre>

<p>We end up with a final call to the blur method - so that all the matched elements are set by default as blurred (i.e. with the title attribute appearing in the text already).</p>

<p>If you&#8217;re curious, you can read more about <a href="http://docs.jquery.com/Plugins/Authoring">writing jQuery plugins</a>.</p>

<h2>Where to take it next</h2>

<p>Within the plugin, you could add better validation to ensure we are only applying to input elements where type is &#8216;text&#8217;.</p>

<div class="update"><p><strong>Update June '07:</strong> You can view and use the <a href="/2007/03/19/a-few-more-jquery-plugins-crop-labelover-and-pluck/#labelOver">label over plugin</a> for an accessible version of the 'text hints'</p></div>

<p>There are a couple of places you could look at to improve the plugin.  The first that I can think of is to apply the label element to float inside the element (as seen on <a href="http://digg.com">Digg</a>&#8217;s search and explained over at <a href="http://www.alistapart.com/articles/makingcompactformsmoreaccessible">A List Apart: Making Compact Forms More Accessible</a>).</p>

<p>The second upgrade you could make would whether you can use this kind of plugin for a select input type.  I haven&#8217;t thought it through, but it could be interesting.</p>

<p>Let me know if you have any comments or need to point out any errors.</p>
