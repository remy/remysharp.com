---
title: maxlength plugin
date: '2008-06-30 10:53:44'
published: true
tags:
  - code
  - jquery
  - plugin
modified: '2014-09-03 16:15:12'
---
# maxlength plugin

It's a fairly common design pattern to want to limit the number of characters the user can input in a field whilst giving feedback to the user on how much they have left.

So I've built a little jQuery plugin to do the work for me.


<!--more-->

## Maxlength Plugin

The plugin simply reports back the number of characters left the user has, with a few extra bells and whistles.

[Download the maxlength jQuery plugin](/downloads/jquery.maxlength.js)

## Demonstration

[View the maxlength demo](/demo/maxlength.html)

This demo shows off two example, one limiting on characters and one limiting on words.

## Example Code

<pre><code>&lt;form action=&quot;/comment&quot;&gt;
  &lt;p&gt;Characters left: &lt;span class=&quot;charsLeft&quot;&gt;10&lt;/span&gt;&lt;/p&gt;
  &lt;textarea maxlength=&quot;10&quot; class=&quot;limited&quot;&gt;&lt;/textarea&gt;
&lt;/form&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
  $('textarea.limited').maxlength({
    'feedback' : '.charsLeft'
  });
&lt;/script&gt;</code></pre>

The default version of the maxlength plugin reads the <code>maxlength</code> attribute from the text element.  However, since this isn't a valid HTML attribute if added to a <code>textarea</code> you can configure the plugin to read the value from a hidden input:

<pre><code>&lt;form action=&quot;/comment&quot;&gt;
  &lt;p&gt;Characters left: &lt;span class=&quot;charsLeft&quot;&gt;10&lt;/span&gt;&lt;/p&gt;
  &lt;textarea class=&quot;limited&quot;&gt;&lt;/textarea&gt;
  &lt;input type=&quot;hidden&quot; name=&quot;maxlength&quot; value=&quot;10&quot; /&gt;
&lt;/form&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
  $('textarea.limited').maxlength({
    'feedback' : '.charsLeft',
    'useInput' : true
  });
&lt;/script&gt;</code></pre>

The plugin can be applied to <code>input</code> elements, but if you want to limit by words, rather than characters, you need to put the maxlength as a hidden input (otherwise the browser will use it's default behaviour to limit the user's input).

### Plugin Options

* feedback - the selector for the element that gives the user feedback. Note that this will be relative to the form the plugin is run against.
* hardLimit - whether to stop the user being able to keep adding characters. Defaults to true.
* useInput - whether to look for a hidden input named 'maxlength' instead of the maxlength attribute. Defaults to false.
* words - limit by characters or words, set this to true to limit by words. Defaults to false.
