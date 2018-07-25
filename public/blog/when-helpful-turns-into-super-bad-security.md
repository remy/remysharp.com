# When helpful turns into super bad security!

A shortish post partly to point out a bad…no, _terrible_ practise, and in part to remind myself to never do this again!

The short version: I wrote code that allows anyone to expose secrets (i.e. environment values) in my application.

<!--more-->

## Trying to help

In writing [jsonbin](https://jsonbin.org) I found that it was pretty common for tiny slips in JSON to be included, and to be _helpful_, I decided I would try to help the user along and encode the JSON to an object as if it were _like_ JavaScript (this allows for things like unquoted keys, trailing commas and the like).

For example, this request would work:

```bash
$ curl https://jsonbin.org/me/data-points \
     -H "authorization: token $JSONBIN_TOKEN" \
     -H "Content-Type: application/json" \
     -d "[{ score: 12 }, { score: 20 },]"
```

I allowed these types of requests because I believe that my code should be error friendly, and if it's obvious what you were intending to do, then my code would help the request along its way.

Except…there's a super massive security hole (that I _just_ patched).

## My hidden bad code

This was the original code:

```js
let data = '';
req.setEncoding('utf8');
req.on('data', chunk => data += chunk);
req.on('end', () => {
  try {
    req.body = JSON.parse(data);
  } catch (e) {
    if (mime === 'application/json') {
      // try again otherwise throw error
      try {
        req.body = (new Function('return ' + data))();
      } catch (e) {
        return next({ code: 400, message: 'Invalid JSON structure'})
      }
    } else {
      req.body = data;
    }
  }
  next();
});
```

The "magic" line was this:

```js
req.body = (new Function('return ' + data))();
```

Zoomed in, the problem becomes glaringly obvious to me, but tucked away in all that code, I didn't spot it right away. This single line of code is a front door to all the private state of my code *and* the chance to modify object prototypes with some nasty code. This single line is the same as an `eval`. It's bad.

To exploit this, a single curl command can expose hidden secrets on the server:

```bash
$ curl https://jsonbin.org/me/secret \
     -H "authorization: token $JSONBIN_TOKEN" \
     -H "Content-Type: application/json" \
     -d "{ id: `${process.env.MONGO_URL}` }"
```

Now in my own account, under the property of `secret`, the username and password to the mongo database has been stored. 😱

The moral of the story should be don't use `eval`, even if it dressed up in lamb's clothing and looking like a `new Function`!

## A (node) solution

Node already has a sandboxing feature that I should have been making use of: the [vm](https://nodejs.org/api/vm.html) module.

Specifically the same support can be provided, but instead using the `vm.runInNewContext` method (where `data` is the user's request body as a string):

```js
const vm = require('vm');
const scope = {};
try {
  vm.runInNewContext(`___result = ${data}`, scope);
} catch (e) {
  return next({ code: 422, message: 'Invalid JSON structure' });
}
req.body = scope.___result;
```

Now trying to access the `process` or modifying object prototypes doesn't affect the main application and indeed throws an exception (which eventually goes back to the user) 🔒👍

Filed under "Oh shit, I tried to be too clever (again)".
