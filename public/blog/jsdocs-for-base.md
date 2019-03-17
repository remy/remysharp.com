---
title: JSDocs for Base
date: '2008-01-08 04:07:39'
published: true
tags:
  - base
  - code
  - javascript
  - jsdocs
modified: '2014-09-03 16:15:12'
---
# JSDocs for Base

In an effort to create better documentation, we've introduced inline documentation to our JavaScript at the office.

Since we use [Dean Edwards'](http://dean.edwards.name/) [Base](http://dean.edwards.name/weblog/2006/03/base/) library for our inheritance the [JSDoc](http://jsdoc.sourceforge.net/) out of the box wouldn't work without commenting explicit method name and memberOf attribute - which, in my view, defeats the point.   

Here's how to get it working.


<!--more-->

Thankfully the JSDoc project has been picked up (correct me if I'm wrong) and how supported entirely in JavaScript (via [Rhino](http://www.mozilla.org/rhino/)) as the [JsDoc ToolKit](http://jsdoctoolkit.org/).

With a small change (or not depending on your code) to the <code>extend</code> method, all the documentation generates perfectly.

For example, this is how my object would be normally laid out and documented:

<script src="http://remysharp.com/js/prettify.packed.js" type="text/javascript" charset="utf-8"></script>

<pre><code class="prettyprint">/**
 * @fileoverview Definition of cat
 * @author Remy Sharp (actually pinched from Dean Edwards)
 */

var Cat = Animal.extend({
  /**
   * @constructor
   * Cats like to meow when they're made
   */
  constructor: function () {
    this.base();
    this.say("Meow");
  }
  
  /**
   * Our cat only eats mice
   * @param {Mouse} food Food fed to the cat
   */
  eat: function (food) {
    if (food instanceof Mouse) this.base();
    else this.say("Yuk! I only eat mice.");
  }
});</code></pre>

Making the following changes sorts out the JsDoc Toolkit parser and allows everything to be documented (note the <code>@scope</code> goes <strong>between</strong> the left parentheses and the left brace):

<pre><code class="prettyprint">/**
 * @namespace Cat
 */
var Cat = Animal.extend(/** @scope: Cat */{</code></pre>
  
Now running the JsDoc Toolkit with <code>-a</code> (Include all functions, even undocumented ones) and it will properly parse the methods in the Base object:

<pre><code class="prettyprint">java -jar app/js.jar app/run.js -t=templates/sweet *.js</code></pre>

If you've got a lot of files, you can run this little bit of command line Perl to do the manual work for you - though I recommend you make a backup, because it'll change the files directly:

<pre><code class="prettyprint">perl -pi -e 's?(.*) = (.*)\.extend\({?/**\n * \@namespace\n */\n$1 = $2.extend(/** \@scope $1 */{\n?' *.js</code></pre>

Of course you're going to [compress](http://dean.edwards.name/packer/) and strip out the documentation before you even think about serving it up on your web app though ;-)
