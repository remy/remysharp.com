# Performance profiling JavaScript

[Firebug](http://getfirebug.com) has a great built in JavaScript performance profiling tool, but it's not supported in <abbr title="Internet Explorer">IE</abbr> and sadly that's what the bulk of Internet users browse with.  In particular, IE profiling is something of a dark art.  There's not a lot of resource available to profile that I could find that was particularly useful.

So I've written a library that allows me to drop in performance timing relatively unobtrusively.

[Download time.js](http://remysharp.com/time.js) ([compressed time.js](http://remysharp.com/time.packed.js))

[See the tests](http://remysharp.com/wp-content/uploads/2007/04/page_timer.html)


<!--more-->

Essentially this only creating timers where you ask it to. However, the key difference from the usual start/stop function is that you can just point the library at a function and it will time it when it's executed.

## Reporting

<pre>time.report()
time.report(label)
time.setReportMethod(function)
time.setLineReportMethod(function)
</pre>

Calling time.report() will show the complete report.  If a label is passed in, it will show reports for only that label.

The setter functions allow you to output the reports in your own way, i.e. if you want the output in Firebug's console, or added to a floating DIV you have created.  See the [performance test](http://remysharp.com/wp-content/uploads/2007/04/page_timer.html) example for a working example.

## Timing Methods

<pre>time.start(label)
time.stop(label)
time.func([label], function)
time.event([label], element/s, event type)
</pre>

### start/stop

The start and stop must have the same label to tie up the timer.

#### Example

<pre>
&lt;script src=&quot;time.js&quot; type=&quot;text/javascript&quot;&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
  time.start('page load');
  window.onload = function() {
    time.stop('page load');
    time.report();
  }
&lt;/script&gt;
</pre>

### func

This can time both static functions or anonymous function.  This is where the ease of adding timing comes in.

The key to timing functions, is that the function reference is passed back from time.func() - so you can wrap anonymous function with the timer or you can point event hooks to time static functions.

#### Static Example

<pre>
&lt;script src=&quot;time.js&quot; type=&quot;text/javascript&quot;&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
  function doJob() {
    // do some big job
  }
  // ... further down the page
  time.func(doJob);
&lt;/script&gt;
</pre>

#### Anonymous Example

<pre>
&lt;script src=&quot;time.js&quot; type=&quot;text/javascript&quot;&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
  window.onload = time.func('page load', function() {
    document.getElementById('link').onclick = time.func(function() {
      // do some job
    });
  });
&lt;/script&gt;
</pre>

### event

Time a **pre-assigned** event on an element.  If the event hasn't been assigned yet, the time will not be able to attach to anything.

The event timer also supports attaching to multiple elements at once.

#### Example

<pre>
&lt;script src=&quot;time.js&quot; type=&quot;text/javascript&quot;&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
  window.onload = function() {
    var link = document.getElementById('link');
    link.onclick = doSomething; // predefined function
    time.event(link, 'click'); // also supports 'onclick'
    // alternative version
    var allLinks = document.getElementsByTagName('a');
    time.event(allLinks, 'click'); // hooks all onclick events on links
  };
&lt;/script&gt;
</pre>

## Tools

I've created a little bookmarklet to fire the report whenever you want and a jQuery plugin for the event timer:

Bookmarklet: <a href="javascript:void(time.report())">Report</a>

jQuery plugin: [time](http://remysharp.com/wp-content/uploads/2007/04/jq_time.js) (note that you still need to include the time.js library)

### Usage:

<pre>$('a').time('click');</pre>