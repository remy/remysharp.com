# jQuery API Update: offline and anywhere

I've been beavering away at the API behind the scenes for a little while, and if you follow me on [Twitter](http://twitter.com/rem) you've probably already seen the [API browser](http://remysharp.com/jquery-api/) has already been upgraded.

The key change I've made is to de-couple the API search engine from the front end.  What this has resulted in, is a fairly simple API to create any number of bespoke front ends to the jQuery API browser.


<!--more-->

Since the engine now runs separately, it's been easy to create different front ends.

So now the following front ends are available with the latest API:

* [Live API browser](http://remysharp.com/jquery-api/)
* [Visual jQuery](http://remysharp.com/visual-jquery/) ([Yehuda Katz](http://www.yehudakatz.com/) will be releasing this to the original URL soon)
* [Offline AIR app](http://remysharp.com/downloads/jquery-api-browser.air.zip)

There's no reason this can't be utilised within a Dashboard app (or update the existing one), implemented as an iGoogle widget and so on.

## Feedback for AIR app

Currently there's no icon for the app - any designers out there want to contribute? Please get in touch.

Originally the app had a quick silver "smoke" look to it, but I've since changed it a straight window so it can be minimised, maximised, etc.

I'm also aware the window settings don't save and the auto updater might ask each time you open the app - there will be updates to fix this very soon!

## Build Your Own

### Grab an SVN Copy

I've got all the code in Google's SVN repo (though I'm also mirroring across in git - but it's pretty new to me).

If you're app is online, I strongly recommend pulling the code, or at the least the API database, directly out of the SVN repo to ensure you're running from the latest API.

* [api-loader.js](http://jquery-api-browser.googlecode.com/svn/trunk/api-loader.js)
* [api-docs.js](http://jquery-api-browser.googlecode.com/svn/trunk/api-docs.js) (this is 600k all on one line)
* [api-docs.xml](http://jquery-api-browser.googlecode.com/svn/trunk/api-docs.xml) (required if you construct the database in the browser/app)

If you're working offline, I encourage you to build in an auto update feature, if only to refresh the database.

### API Loader

Before loading the database, you must import the <code>api-loader.js</code> library which holds the callback to mount the functions on the API database (since it's all contained within one object)

<pre><code>&lt;script src=&quot;api-docs.js&quot; type=&quot;text/javascript&quot;&gt;&lt;/script&gt;</code></pre>

### API Database

The API database is loaded in one of two ways:

* Import the pre-packaged JSON database
* Converted from XML

The pro of the JSON version is that the browser doesn't have to do any processing before the data is available.  The con is that it's almost twice the size of the raw XML version.  I'm looking at what I can do to optimising the JSON version.

### Loading the Database

#### JSON

<pre><code>&lt;script src=&quot;api-docs.js&quot; type=&quot;text/javascript&quot;&gt;&lt;/script&gt;</code></pre>

#### XML

Call the <code>loadDocs</code> function when the DOM is ready.

There is an option to point the XML database to a different location via the <code>xmldoc</code> variable. If you've exported XML from the wiki (via <code>createjQueryXMLDocs.pl</code>) then the XML is compatible. For example, the API browser currently works with all the [jQuery Ui](http://ui.jquery.com) documentation (I'll be adding this soon).

<pre><code>$(loadDocs);</code></pre>

### Using the Database

The API database is a global variable called <code>jquerydocs</code>.

When the database is loaded it triggers a <code>api-load-complete</code> event on the document.

<pre><code>$(document).bind('api-load-complete', function () {
  alert(jquerydocs.version);
});</code></pre>

### jquerydocs

The <code>jquerydocs</code> is an array with properties and a single find function.  Running a query on the database returns the same structure back filtered by the given string.

<pre><code>&gt;&gt;&gt; console.dir(jquerydocs);

'categories' : [Object name=Core subcategories=[5], 8 more...],
'data' : [Object jquery1=Object, 226 more...],
'letters' : ["a", "b", "c", 20 more...],
'searchNames' : ["jquery1", "jquery2", "jquery3", 224 more...]
'startdoc' : "API",
'timestamp' : "2008-06-03T15:40:58Z"
'version' : "1.2.6"
'find': function()</code></pre>

### Querying

The best way to get familiar with the API database is to drop <code>jquerydocs</code> in to Firebug and look at the properties.

Generally everything is queried through the find function.

The find function takes two parameters, the second being optional:

1. Query
2. Field filter

If the field filter isn't passed in, the query will search for functions, selectors and properties that 'start with' the query string.

A few examples:

<pre><code>// all API functions starting with 'trigg'
jquerydocs.find('trig');

// all functions in the category start with 'ajax'
jquerydocs.find('ajax', 'category');</code></pre>

### Running Live Examples

<pre><code>// this would be the ID of the result
var id = 'trigger141',
  item = jquerydocs.data[id],
  i = 0,
  blank_iframe = '/index_blank.html',
  examples = $('exampleHolder'), // arbitrary placeholder
  html = [];

for (i = 0; i &lt; item.examples.length; i++) {
  if (item.examples[i].html) {
      html.push('&lt;iframe id="' 
        + item.examples[i].id 
        + '" src="' 
        + blank_iframe 
        + '"&gt;&lt;/iframe&gt;');
  }
}

examples.append(html.join(''));

// runExample is a helper in api-loader.js
runExample(item);

</code></pre>

### Online/Offline Differences

If you're running offline, you'll need to ensure the following:

1. In api-loader.js, change where <code>example\_jquery</code> is pointing to - currently it points to the Google jQuery copy 1.2.6.  If you're running online, this will update when the loader script is updated.
2. Again in api-loader.js, change where <code>blank\_iframe</code> points to.  This is required for the live examples. If you don't run the examples in your code, then you shouldn't need to change this.