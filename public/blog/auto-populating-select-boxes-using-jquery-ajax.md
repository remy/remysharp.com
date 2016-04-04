# Auto-populating Select Boxes using jQuery & AJAX

<div class="update">
    <p><strong>Update:</strong> due to popular demand, I've caved in, and written a plugin and demos with multiple-select boxes populating each other and driven from MySQL.</p>
    <p>View: <a href="http://remysharp.com/2007/09/18/auto-populate-multiple-select-boxes/">Auto-populate multiple select boxes</a></p>
</div>

<p>If you are familiar with using select boxes for categorisation and sub-categories, such as ebay does when selling an item, usually this can require a lot of JavaScript to maintain the select boxes, but jQuery can hugely simplify this task by adding a dash of AJAX.</p>


<!--more-->

<h2>The Goal</h2>

<p>Allow the user to select a top level category from one select box and to automatically populate the sub-category.</p>

<h2>Prerequisites</h2>

<ol>
<li><a href="http://jquery.com/src/jquery-latest.js">Latest copy of jQuery</a></li>
<li>A basic understanding of <a href="http://en.wikipedia.org/wiki/JSON#Supported_data_types.2C_syntax_and_example">JSON</a> (don't let this put you off - it's really very, very easy)</li>
<li>A server-side script that can respond to the AJAX request (though I've provided a simple example)</li>
</ol>

<h2>Demo</h2>

<p>Our demo will specifically look to build a simple form that allows us to book human resource for a project.  The top level category is the resource type, and the sub-category will list the individual's names.</p>

<p><a href="http://remysharp.com/wp-content/uploads/2007/01/select.html">See the demo in action</a></p>

<h2>How it works</h2>

<p>Once the top level category select is changed, it sends an AJAX request for the sub-categories.  The result of which are converted to select options and the sub-category select's elements are replaced.</p>

<h2>Unobtrusive JavaScript</h2>

<p>First things first: as with any page that is loaded with JavaScript and AJAX functionality, it should work without JavaScript.</p>

<p>To achieve this for our tutorial here's what we need to ensure:</p>

<ol>
<li>When the page is loaded, the sub-category is loaded (if the top level has a selected item).</li>
<li>There is a â€˜load sub-category' button the user can select to re-load the page.  We will hide this button with a &lt;noscript&gt; tag in our demo.</li>
</ol>

<h2>The Code</h2>

<p>There are 4 parts to this demo. </p>

<ol>
<li>The page's HTML.</li>
<li>The server-side code to produce the dynamic page (i.e. to pre-load the select boxes when the user first visits).</li>
<li>The jQuery &amp; JavaScript.</li>
<li>The JSON response (which will reuse the server-side code).</li>
</ol>

<h3>HTML</h3>

<pre>&lt;form action=&quot;/select_demo.php&quot;&gt;
  &lt;label for=&quot;ctlJob&quot;&gt;Job Function:&lt;/label&gt;
  &lt;select name=&quot;id&quot; id=&quot;ctlJob&quot;&gt;
    &lt;option value=&quot;1&quot;&gt;Managers&lt;/option&gt;
    &lt;option value=&quot;2&quot;&gt;Team Leaders&lt;/option&gt;
    &lt;option value=&quot;3&quot;&gt;Developers&lt;/option&gt;
  &lt;/select&gt;
  &lt;noscript&gt;
    &lt;input type=&quot;submit&quot; name=&quot;action&quot; value=&quot;Load Individuals&quot; /&gt;
  &lt;/noscript&gt;
  &lt;label for=&quot;ctlPerson&quot;&gt;Individual:&lt;/label&gt;
  &lt;select name=&quot;person_id&quot; id=&quot;ctlPerson&quot;&gt;
    &lt;option value=&quot;1&quot;&gt;Mark P&lt;/option&gt;
    &lt;option value=&quot;2&quot;&gt;Andy Y&lt;/option&gt;
    &lt;option value=&quot;3&quot;&gt;Richard B&lt;/option&gt;
  &lt;/select&gt;
&lt;input type=&quot;submit&quot; name=&quot;action&quot; value=&quot;Book&quot; /&gt;
&lt;/form&gt;
</pre>

<h3>Server-side</h3>

<p>This is just a simple example, but it should be obvious that you can expand this to go off to a database and return an object in a JSON data structure:</p>

    <?php
    if ($_GET['id'] == 1) {
      echo <<<HERE_DOC
        [ {"optionValue": 0, "optionDisplay": "Mark"}, {"optionValue":1, "optionDisplay": "Andy"}, {"optionValue":2, "optionDisplay": "Richard"}]
    HERE_DOC;
    } else if ($_GET['id'] == 2) {
      echo <<<HERE_DOC
        [{"optionValue":10, "optionDisplay": "Remy"}, {"optionValue":11, "optionDisplay": "Arif"}, {"optionValue":12, "optionDisplay": "JC"}]
    HERE_DOC;
    } else if ($_GET['id'] == 3) {
      echo <<<HERE_DOC
        [{"optionValue":20, "optionDisplay": "Aidan"}, {"optionValue":21, "optionDisplay":"Russell"}]
    HERE_DOC;
    }
    ?>

<p><small>Note that this is not accessible. To ensure accessibility, the server side will handle the pre-population of the select boxes as the page is loaded.  Here is an example (excluding the headers, footers and JavaScript) of the <a href="http://remysharp.com/wp-content/uploads/2007/01/select.php.txt">accessible example</a>.</small></p>

<h3>JSON Response</h3>

<p>If I pass the server side id = 2, i.e. <a href="http://remysharp.com/wp-content/uploads/2007/01/select.php?id=2&amp;ajax=true">/select.php?id=2&amp;ajax=true</a>, the return value is (the ajax=true is an arbitrary flag that I'm using to differentiate between a normal user request and one done via AJAX):</p>

<pre><code>[ {"optionValue":10, "optionDisplay": "Remy"},
{"optionValue":11, "optionDisplay": "Arif"},
{"optionValue":12, "optionDisplay": "JC"}]</code></pre>

<p>The enclosing square brackets denotes an array and each element is separated by a comma.</p>

<p>Within the array are three objects.  If you're familiar with PHP or Perl, you can basically treat these as hashes.  The objects have keys (in this case two keys, one called â€˜optionValue' and one called â€˜optionDisplay'), and values.  Note that keys don't need to be wrapped in quotes (though in some cases you will need them sometimes).</p>

<p>There are two ways which we can get the data out of this structure (assuming j is the structure):</p>

<p><code>alert(j['optionDisplay'])</code></p>

<p>Or:</p>

<p><code>alert(j.optionDisplay)</code></p>

<h3>jQuery &amp; AJAX Request</h3>

<p>Our JavaScript is going to attach itself after the page is load, and fire an event each time the job function select box is changed.</p>

<p>The event will send the new value of the select box and reload the contents of the person select box.</p>

<p><small>Note that I'm be a bit naughty here, in that I'm plugging HTML directly in to the <abbr title="Document Object Model">DOM</abbr>.</small></p>

<p>Each item in the JSON response is looped round and used to build up the new options for the select box.  As the response is an array (as mentioned earlier), we can call the .length method on it.</p>

<pre>&lt;script type=&quot;text/javascript&quot; src=&quot;jquery.js&quot;&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;&gt;
$(function(){
  $(&quot;select#ctlJob&quot;).change(function(){
    $.getJSON(&quot;/select.php&quot;,{id: $(this).val(), ajax: &apos;true&apos;}, function(j){
      var options = &apos;&apos;;
      for (var i = 0; i &lt; j.length; i++) {
        options += &apos;&lt;option value=&quot;&apos; + j[i].optionValue + &apos;&quot;&gt;&apos; + j[i].optionDisplay + &apos;&lt;/option&gt;&apos;;
      }
      $(&quot;select#ctlPerson&quot;).html(options);
    })
  })
})
&lt;/script&gt;
</pre>

<h2>Where to take it next</h2>

<p>So that's the primer.  Next steps: upgrade, integrate, extend and stylise.  Below is an example of the category selection when submitting an item for sale on Ebay.</p>

<p><img title="" alt="Ebay Category Selection" src="http://remysharp.com/wp-content/uploads/2007/01/ebay_categories.gif"/></p>

<p>It should be a simple next step to integrate a database behind the selection methods and create more complicated selection like this Ebay example.</p>

<p>Let me know if you spot any glaring errors or have any comments.</p>
