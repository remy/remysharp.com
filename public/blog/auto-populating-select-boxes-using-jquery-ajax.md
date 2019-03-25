---
title: Auto-populating Select Boxes using jQuery & AJAX
date: '2007-01-20 01:08:36'
published: true
tags:
  - ajax
  - jquery
  - select-boxes
  - code
modified: '2017-03-26 21:37:55'
---
# Auto-populating Select Boxes using jQuery & AJAX

<div class="update">
    <p><strong>Update:</strong> due to popular demand, I've caved in, and written a plugin and demos with multiple-select boxes populating each other and driven from MySQL.</p>
    <p>View: <a href="/2007/09/18/auto-populate-multiple-select-boxes/">Auto-populate multiple select boxes</a></p>
</div>

If you are familiar with using select boxes for categorisation and sub-categories, such as ebay does when selling an item, usually this can require a lot of JavaScript to maintain the select boxes, but jQuery can hugely simplify this task by adding a dash of AJAX.

<!--more-->

## The Goal

Allow the user to select a top level category from one select box and to automatically populate the sub-category.

## Prerequisites

1. [Latest copy of jQuery](http://jquery.com/src/jquery-latest.js)
1. A basic understanding of [JSON](http://en.wikipedia.org/wiki/JSON#Supported_data_types.2C_syntax_and_example) (don't let this put you off - it's really very, very easy)</li>
1. A server-side script that can respond to the AJAX request (though I've provided a simple example)

## Demo

Our demo will specifically look to build a simple form that allows us to book human resource for a project. The top level category is the resource type, and the sub-category will list the individual's names.

[See the demo in action](/images/select.html)

## How it works

Once the top level category select is changed, it sends an AJAX request for the sub-categories. The result of which are converted to select options and the sub-category select's elements are replaced.

## Unobtrusive JavaScript

First things first: as with any page that is loaded with JavaScript and AJAX functionality, it should work without JavaScript.

To achieve this for our tutorial here's what we need to ensure:

1. When the page is loaded, the sub-category is loaded (if the top level has a selected item).
2. There is a 'load sub-category' button the user can select to re-load the page. We will hide this button with a `&lt;noscript&gt;` tag in our demo.

## The Code

There are 4 parts to this demo.

1. The page's HTML.
1. The server-side code to produce the dynamic page (i.e. to pre-load the select boxes when the user first visits).
1. The jQuery &amp; JavaScript.
1. The JSON response (which will reuse the server-side code).

### HTML

```html
<form action="/select_demo.php">
  <label for="ctlJob">Job Function:</label>
  <select name="id" id="ctlJob">
    <option value="1">Managers</option>
    <option value="2">Team Leaders</option>
    <option value="3">Developers</option>
  </select>
  <noscript>
    <input type="submit" name="action" value="Load Individuals" />
  </noscript>
  <label for="ctlPerson">Individual:</label>
  <select name="person_id" id="ctlPerson">
    <option value="1">Mark P</option>
    <option value="2">Andy Y</option>
    <option value="3">Richard B</option>
  </select>
<input type="submit" name="action" value="Book" />
</form>
```

### Server-side

This is just a simple example, but it should be obvious that you can expand this to go off to a database and return an object in a JSON data structure:

```php
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
```

<small>Note that this is not accessible. To ensure accessibility, the server side will handle the pre-population of the select boxes as the page is loaded. Here is an example (excluding the headers, footers and JavaScript) of the <a href="/images/select.php.txt">accessible example</a>.</small>

### JSON Response

If I pass the server side id = 2, i.e. <a href="/images/select.php?id=2&amp;ajax=true">/select.php?id=2&amp;ajax=true</a>, the return value is (the ajax=true is an arbitrary flag that I'm using to differentiate between a normal user request and one done via AJAX):

```json
[
  {"optionValue":10, "optionDisplay": "Remy"},
  {"optionValue":11, "optionDisplay": "Arif"},
  {"optionValue":12, "optionDisplay": "JC"}
]
```

The enclosing square brackets denotes an array and each element is separated by a comma.

Within the array are three objects. If you're familiar with PHP or Perl, you can basically treat these as hashes. The objects have keys (in this case two keys, one called 'optionValue' and one called 'optionDisplay'), and values. Note that keys don't need to be wrapped in quotes (though in some cases you will need them sometimes).

There are two ways which we can get the data out of this structure (assuming j is the structure):

```js
alert(j['optionDisplay'])
```

Or:

```js
alert(j.optionDisplay)
```

### jQuery &amp; AJAX Request

Our JavaScript is going to attach itself after the page is load, and fire an event each time the job function select box is changed.

The event will send the new value of the select box and reload the contents of the person select box.

<small>Note that I'm be a bit naughty here, in that I'm plugging HTML directly in to the <abbr title="Document Object Model">DOM</abbr>.</small>

Each item in the JSON response is looped round and used to build up the new options for the select box. As the response is an array (as mentioned earlier), we can call the .length method on it.

```html
<script src="jquery.js"></script>
<script>
$(function(){
  $("select#ctlJob").change(function(){
    $.getJSON("/select.php",{id: $(this).val(), ajax: 'true'}, function(j){
      var options = '';
      for (var i = 0; i < j.length; i++) {
        options += '<option value="' + j[i].optionValue + '">' + j[i].optionDisplay + '</option>';
      }
      $("select#ctlPerson").html(options);
    })
  })
})
</script>
```

### Where to take it next

So that's the primer. Next steps: upgrade, integrate, extend and stylise. Below is an example of the category selection when submitting an item for sale on Ebay.

![Ebay Category Selection](/images/ebay_categories.gif)

It should be a simple next step to integrate a database behind the selection methods and create more complicated selection like this Ebay example.

Let me know if you spot any glaring errors or have any comments.
