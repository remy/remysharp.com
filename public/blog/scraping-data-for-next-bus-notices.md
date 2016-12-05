# Scraping data for 'next bus' notices

I recently purchased a LaMetric toy/clock/thing. It's an internet connected array of LEDs which (it turns out) a fairly simple to use API.

A short while ago, I had a few minutes in the morning before I had to head out, and inside of 60 minutes, I had managed to get the display to show me, in real-time, when my next bus was due to leave. Here it is in all it's glory:

![LaMetric LEDs with bus time](/images/lametric.jpg)

This post is a tutorial with the concepts and methods to release so you can make your own, or repurpose for your own project.

<!--more-->

## Components

If you want to build something similar, here are the components required:

1. [LaMetric "smart clock"](http://lametric.com/) - a bit pricy for a clock and I bought mine on eBay as a treat-yo-self moment.
2. Either an API consumer (from your transport website) or HTML scraper (which I used) to extract timings (I couldn't easily work out how to use Google's directions API sadly).
3. Format the data in the LaMetric data structure (and either draw your own icon, or re-use an icon from their library as I did)
4. Publish both the server code to get the times, and publish to the LaMetric's app store (privately) – both will be free to use.

## Extracting due times

You *could* write some super-reusable code that could be turned into a library that other people could use…or, since it's a tonne easier, just scrape data direclty out of HTML pages since the actual application is for private use (plus, there's so many different providers for bus times that even if I publish my code, it's only useful to people who live in Brighton & Hove).

### Scraping

For this, I'm going to use my local bus website buses.co.uk. I just need to find where the bus times are shown, and here I can see there's an Ajax request being made in the background. You'll have to dig around your own service to find how to get the next due time. The key is to find a URL that you request that doesn't rely on any session data (i.e. you can `curl` the URL and you get the same result).

![Brighton bus XHR request](/images/bus-xhr.png)

It turns out that my bus web site also has a "semi" mobile version of the site, but I can link directly to a specific bus services, which is even easier to scrap content from.

### Codifying

For this (and most projects) I'm using [node.js](https://nodejs.org) to do the work for me. So I'm going to lay out the code and include detailed comments on how it works (I'll include a link to full completed code at the end of this post).

```js
// follow modules loaded via `npm i --save request cheerio`
const request = require('request');
const cheerio = require('cheerio');

getDueTimes()
  .then(console.log) // if it worked, print the result
  .catch(console.error); // otherwise, show the erorr

function getDueTimes() {
  // we're returning a promise so we can later reuse in
  // a web server, but for now, as above, we're just logging.
  return new Promise((resolve, reject) => {

    // make a GET request to get a page of the next due buses.
    request({
      url: 'http://m.buses.co.uk/brightonbuses/operatorpages/mobilesite/stop.aspx?stopid=6979&device=&s=50&d=&stopcode=&source=siri'
    }, (error, res, body) => {

      // if there was something wrong with the request, reject
      // the promise, and exit the function.
      if (error) {
        return reject(error);
      }

      // …otherwise, load the HTML into Cheerio, which give
      // us jQuery-like access
      const $ = cheerio.load(body);

      // now query the DOM for the times (bespoke to your HTML)
      // and return just the text for each of those nodes, note
      // that to get a _real_ array back, I have to use `.get()`
      // at the end.
      const times = $('.colDepartureTime').map((i, el) => {
        return $(el).text();
      }).get();

      // resolve the promise: specifically, return the times
      resolve(times);
    });
  });
}
```

Now when I run this script, it'll give me upcoming bus times:

```sh
$ node index.js
[ '2 mins', '12 mins', '26 mins', '38 mins', '50 mins' ]
```

## Formatting to a LaMetric compatible structure

The LaMetric needs a very speific format to be able to consume the data and display it correctly. These timings need to be transformed into _frames_, which is fairly straight forward - just a case of wrapping our due times up in the right format. Of course, you might not be using a LaMetric, so you might want to consume this data in another way (for instance, as a timeline pin to a pebble).

The LaMetric output should look like this:

```json
{
  "frames": [
    {
      "text": "5 mins",
      "icon": "i996"
    }
  ]
}
```

To transform our array of times, I'm going to use the following map:

```js
const icon = "i996"; // our bus icon
const data = { frames: times.map(text => ({ text, icon })) };
resolve(data);
```

Now the result looks like this:

```sh
$ node index.js
{ frames:
   [ { text: '3 mins', icon: 'i996' },
     { text: '15 mins', icon: 'i996' },
     { text: '27 mins', icon: 'i996' },
     { text: '39 mins', icon: 'i996' },
     { text: '51 mins', icon: 'i996' } ] }
```

The last step is _putting_ this code somewhere that can be requested by the LaMetric so the device can poll our new service and show the timings.

## Deploying and publishing

Currently the code only executes on the command line, but we need to run as a web server, and then we need to deploy. Running as a web service requires a little more code.

Again, I'll link to the completed code, but below I'll only include the web server code we need:

```js
const request = require('request');
const cheerio = require('cheerio');
const http = require('http');

// create a new HTTP web server
http.createServer((req, res) => {

  // get the times
  getDueTimes().then(data => {
    // if successful, tell the browser it's OK, and we're
    // serving JSON content
    res.writeHead(200, { 'content-type': 'application/json' });
    // close the conncection, sending a JSON string of the data
    res.end(JSON.stringify(data));

  }).catch(error => {
    // otherwise it failed, so send a error code and message
    res.writeHead(500, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ error }));
  });
}).listen(3000); // listen on port 300 (arbitrary)

function getDueTimes() {
 // as earlier…
}
```

Now when I run the code, I can visit http://localhost:3000 and it will give me the due times in the LaMetric format.

But this is only local, how do I get it on the public web? I'm partial to a service provided by Zeit called "now". Sign up to Zeit (it's free), and [download](https://zeit.co/download) their desktop client.

Then go ahead and click the Now icon ▲ and select "Deploy". Navigate to the directory where you have your code, and click deploy. Now will copy the URL that your service is being deployed to, and once complete, it'll automatically open your browser to your newly deployed service.

Now you've got a live service, the last part is to point the LaMetric at the service. [Create](https://developer.lametric.com/applications/create) a new app, selecting "indicator", and scroll down to "URL to get data from" and enter your new https://x.now.sh URL, then publish it (probably private as it's only useful to your bus stop) and finally add it to your LaMetric from the phone app. And that's it.

[Here's a copy of the completed code](https://gist.github.com/remy/8aef7b241b31ea97acb53a23a9adc862).

Again, the aim of this post wasn't meant to be too specific to the LaMetric. Indeed, you could transform the output to respond to an Alexa skill. You can re-use all this code, but instead of sending back `res.end(JSON.stringify(data))`, you need to send back Alexa skill compatible JSON:

```js
res.end(JSON.stringify({
  version: '1.0',
  response: {
    outputSpeech: {
      type: 'SSML',
      ssml: `<speak>The next bus is due in ${data.frames[0].text.slice(0,-1)}utes</speak>`
    },
    shouldEndSession: true
  },
  sessionAttributes: {}
}));
```

In the above sample, I'm being a bit cheeky, in that I'm re-using the `frames` and changing `4 mins` to `4 min` and appending "utes" (which obviously goes weird if it's "1 minues"), but hopefully that gives you the idea and enough rope to play around with.
