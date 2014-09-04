# jQuery Tag Suggestion

If you're familiar with [del.icio.us](http://del.icio.us/remy.sharp?url=http%3A%2F%2Fremysharp.com%2F&title=remy%20sharpâ€™s%20b%3Alog&v=4) you will be familiar with the tag suggesting as-you-type support.

The reason why, I believe, the tagging works so well within del.icio.us is that it helps you create a subset of tags that you commonly use for different types of links.  This way, it makes it easier to find tagged content later on. i.e. conversely if it didn't suggest links, it would be likely that you would have different variations or even spellings of the same tag on (what should be) grouped content.

So, in an effort to adopt this approach, I've created a [jQuery](http://jquery.com) plugin for tag suggestion.


<!--more-->

## Download jQuery tag suggestion

[Download tag.js](/downloads/tag.js)

The plugin has been tested with:

* IE 7
* Firefox 2
* Safari 3
* Opera 9

If anyone has any problems in any other browsers (or even these), I would appreciate the feedback.

## Demonstration

[View the tag suggestion demo](http://remysharp.com/wp-content/uploads/2007/12/tagging.php)

[View the source for the demo](http://remysharp.com/downloads/tagging.php)

The demonstration shows off both the static based tags and the Ajax based tag suggestion.  Although the tag sets are the same, be sure to open [Firebug](http://getfirebug.com) and check the Ajax hits in the second example.

## Example code

### Static example

Allows the input field to have their own set of tag suggestions.

<pre><code class="prettyprint">$(function () {
  $('input.tagSuggest').tagSuggest({
    tags: ['javascript', 'js2', 'js', 'jquery', 'java']
  });
  $('#otherlanguages').tagSuggest({
    tags: ['applescript', 'php', 'perl', 'java']
  });
});</code></pre>

### Static global example
<script src="/js/prettify.packed.js" type="text/javascript" charset="utf-8"></script>
<pre><code class="prettyprint">setGlobalTags(['javascript', 'js2', 'js', 'jquery', 'java']);
$(function () {
  $('input.tagSuggest').tagSuggest();
});</code></pre>

### Ajax example

<pre><code class="prettyprint">$(function () {
  $('#tags').tagSuggest({
    url: '/tag-suggestion'
  });
});</code></pre>

### Style

I would recommend the following styles for the suggested tags:

<pre><code class="prettyprint">SPAN.tagMatches {
    margin-left: 10px;
}

SPAN.tagMatches SPAN {
    padding: 2px;
    margin-right: 4px;
    background-color: #0000AB;
    color: #fff;
    cursor: pointer;
}</code></pre>

## Plugin parameters

All parameters are optional, so long as tags have been set via the setGlobalTags function.

* delay - sets the delay between keyup and the request - can help throttle ajax requests, defaults to zero delay
* matchClass - class applied to the suggestions, defaults to 'tagMatches'
* separator - optional tag separator string, defaults to ' '
* sort - boolean to force the sorted order of suggestions, defaults to false
* tagContainer - the type of element uses to contain the suggestions, defaults to 'span'
* tagWrap - the type of element the suggestions a wrapped in, defaults to 'span'
* tags - array of tags specific to this instance of element matches, defaults to global tags
* url - url to get suggestions, overrides any specifically set tags.  Must return array of suggested tags as JSON