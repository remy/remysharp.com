# JavaScript namespaces

Based on the [Prototype](http://prototypejs.org) [namespacing made easy](http://thinkweb2.com/projects/prototype/namespacing-made-easy/), except this doesn't require Prototype.

<pre><code> String.prototype.namespace = function(separator) {
  var ns = this.split(separator || '.'), p = window, i;
  for (i = 0; i &lt; ns.length; i++) {
    p = p[ns[i]] = p[ns[i]] || {};
  }
};</code></pre>

This isn't so much to ditch Prototype, but to [encourage](http://yuiblog.com/blog/2007/06/12/module-pattern/) [using](http://snook.ca/archives/javascript/javascript_name/) [namespacing](http://www.dustindiaz.com/namespace-your-javascript/).