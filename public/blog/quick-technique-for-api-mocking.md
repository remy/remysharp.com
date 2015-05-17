# Quick technique for API mocking

During server software development (i.e. node) I always strive to work offline, in that my development workflow doesn't depend on any online services.

However, sometimes that's not possible as there's some 3rd party API dependancy - as there was in my latest client work. The problem I found, was that the latency between my location and the 3rd party API was so high, that it was impacting on the workflow cycle of: debug, change, test, repeat. The load time was taking anywhere from 15-30 seconds each time.

So this was my quick work around to easily mock out the API so my development process could be faster.

<!--more-->

## The aims

The aim was to, without much work at all, replicate specific API calls *without* modifying my application code. i.e. I could switch my mock API on and off as I needed.

It was also important that the time required to put a mock API in place, did *not* outweigh the time lost on the latency. Specifically, if the custom mock API turned into days of work, it would have been a total waste of time.

## The simple solution

This code uses [Express 4](http://expressjs.com). It's entirely possible that there was a library that already existed, but the small amount of code that I had to write wins over finding, researching, checking and learning a new library.

### Capturing mock data

First I had to run my way through each API call and save the raw output as a `.json` file in a local directory (not tracked in git) called `mock-data`.

Since all my internal API calls used a config value as the root of the API URL, it meant I could change my local config to point to my local mock API instead of the staging or production endpoint:

```js
var config = require('./config');
var root = config.api;

function getOrder(id) {
  return request({ // a promise
    url: root + '/order',
    type: 'json',
    body {
      id: id
    }
  });
}
```

I would change my `config.api` value to point to `http://localhost/mock-api' and the server I was developing would actually reply to the API requests using the code in the next section.

### Mock API Code

The following code would be in (something like) `routes/mock-api.js`:

```js
var express = require('express');
var fs = require('fs');
var router = express.Router();
// directory path to the mock json files
var mockPath = __dirname + '/mock-data/';

var design = {
  'POST /order': 'getOrder',
  'POST /order/tickets': 'addTickets',
  'DELETE /order/tickets': 'removeTicket',
}

module.exports = router;

Object.keys(design).forEach(function (req) {
  var method = req.split(' ').shift();
  var path = req.split(' ').pop();
  var mock = '{}';
  try {
    mock = require(mockPath + design[req]);
  } catch (e) {}

  router.route(path)[method.toLowerCase()](function (req, res) {
    res.send(mock);
  });
});
```

In my main `routes.js` file I can then conditionally load up my mock router:

```
// snip...
if (config.mock) {
  app.use('/mock-api', require('./routes/mock-api'));
}
```

Now requests to my server (the same server I'm doing my main development against), can respond to API requests with pre-baked data. Now my damn latency is a thing of the past!

## Taking it further

I struggle to look at the above code without seeing ways to improve it - but as I pointed out in the aims: keep it simple, and keep the solution quick.

Here's a few ideas that spring to mind that might make the code more useful in different situations:

- Respond with different file types (rather than only `.json`)
- Respond with inline JSON data (that would be defined in the `design`)
- Support variables in the URL to pick different static responses (like `GET /order/:id`)

I have done some similar work in my [static server](https://github.com/remy/servedir#mocked-router) which also has limited support for interpolation in the response.

For now though, this simple version suits my requirements!