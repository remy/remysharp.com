---
title: Ajax validation pattern
date: '2008-01-12 11:10:30'
published: true
tags:
  - ajax
  - code
  - javascript
  - jquery
  - plugin
modified: '2014-09-03 16:15:12'
---
# Ajax validation pattern

Inline form validation is the way forward with any web site today, and I've found I've been able to extract this process out in to a simple plugin that can be applied anywhere throughout my code using the the following pattern.


<!--more-->

## Logic

Once the plugin is applied, it will either create an <code>span</code>, or use any adjacent <code>span</code> directly next to the input element.

On <code>keyup</code> the value of the focused input element will be submitted to the form, where the server side will need to handle the request.

[You can see a working demo here (from jQuery for Designers)](http://jqueryfordesigners.com/demo/ajax-validation.php)

## HTML

<script src="http://remysharp.com/js/prettify.packed.js" type="text/javascript" charset="utf-8"></script>
<pre><code class="prettyprint">&lt;form action=&quot;/profile&quot; method=&quot;post&quot;&gt;
  &lt;fieldset&gt;
    &lt;legend&gt;Change your username&lt;/legend&gt;
    &lt;div&gt;
      &lt;label for=&quot;username&quot;&gt;Username:&lt;/label&gt;
      &lt;input type=&quot;text&quot; name=&quot;username&quot; value=&quot;&quot; id=&quot;username&quot; /&gt;
    &lt;/div&gt;
  &lt;/fieldset&gt;
&lt;/form&gt;</code></pre>

## jQuery

[Download the liveCheck plugin](/downloads/livecheck.js)

Include [jQuery](http://jquery.com) and the live check plugin above the following code:

<pre><code class="prettyprint">$(function () {
    $('#username').liveCheck({ 'image' : '/images/ajax-loader.gif' });
});</code></pre>

The plugin takes a single options variable which can be omitted.  The available values are:

* error - the class applied to the loading message span, defaults to 'error'
* image - the [loading image](/downloads/ajax-loader.gif), defaults to blank
* text - the text shown during the Ajax request, defaults to 'validating...'

## JSON response

The response from the Ajax only needs to be two fields, one indicating success and one with a message for the user:

<pre><code class="prettyprint">{ 'ok' : true, 'message' : 'The username selected is available' }</code></pre>

..or (for example):

<pre><code class="prettyprint">{ 'ok' : false, 'message' : 'Username must be more than 3 characters' }</code></pre>

If you particularly need change the JSON response structure, you can do so via the following two options which are passed in to the liveCheck plugin call:

* ok - the JSON response field indicating the check passed, defaults to 'ok'
* message - the JSON response field offering the user some information as to the pass or fail.  This text will replace the loading message, defaults to 'message'

## Server side

Whatever your language of choice, the server side is pretty much the same.  The logic breaks down to this:

1. If header <code>HTTP\_X\_REQUESTED\_WITH</code> exists, treat it as an Ajax request instead of normal
2. Run the existing validation against the individual field
3. Respond with a single JSON object and exit

For example, if my only validation check was the length of the username, before the Ajaxifying the code, my PHP would look like this:

<pre><code class="prettyprint">&lt;?php
  if ($Action == 'save') {
    $username_errors = User::validateUsername($_POST['username']);
    $password_errors = User::validatePassword($_POST['password']);
    $email_errors = User::validateEmail($_POST['email']);
    
    if (!count($username_errors) && !count($password_errors) && !count($email_errors)) {
      // save...
    } else {
      // handle errors
    }
  }
?&gt;</code></pre>

The modification is simple to handle the live check:

<pre><code class="prettyprint">&lt;?php
  if ($Action == 'save') {
    // existing code...
  } else if ($_SERVER['HTTP_X_REQUESTED_WITH']) {
    if (@$_POST['username']) { // silence warn
      $username_errors = User::validateUsername($_POST['username']);
      $json = array('ok' => true, 'message' => 'Selected username is fine');
      
      if (count($username_errors)) {
        // $username_errors is an array of errors, which we'll join together
        $json = array('ok' => false, 'message' => join(', ', $username_errors));
      }
      
      echo json_encode($json);
      exit;
    }
  }
?&gt;</code></pre>

## Wrap up

This pattern can be applied pretty much anywhere you need to validate a single piece of information with very little coding overhead.
