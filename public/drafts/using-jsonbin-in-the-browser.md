# Using jsonbin in the browser

Today I pushed a few security tweaks to [jsonbin, the personal RESTful JSON store](https://jsonbin.org) that allow you to use jsonbin directly in the browser…if you so choose.

<!--more-->

By default, if you want to use jsonbin, you have to authenticate using your [API key](https://jsonbin.org/_me/apikey), for example:

```bash
$ curl -X POST https://jsonbin.org/me/blog \
     -H 'authorization: token 12345678-abcd' \
     -d '{ url: "https://remysharp.com" }'
```

And putting your API key in the browser is fine (in theory) if you don't intend to let anyone other than yourself access the web page. So I've added support for [JWT](https://jwt.io) bearer tokens.

This means a few things:

1. You can place an expiry on the bearer token, ranging from milliseconds to days or weeks.
2. You can specify what path in your store the token has access to.

In practise, this means that you could collect user content in your store by generating a bearer token that's valid for 10 minutes (for instance) and your browser code can now `POST` to the specific endpoint you give.

You can either make an authenticated call to [/_/bearer](https://jsonbin.org/_/bearer) to get a bearer token, or you can generate these yourself (on your server):

```js
const jwt = require('jsonwebtoken');

const apikey = process.env.JSONBIN_TOKEN;
const expiresIn = '10m';
const publicId = 'AC12345'; // note that older ids are uuids
const path = 'urls.0'; // can only write to first array entry

const token = jwt.sign({ id: publicId, path }, apikey, { expiresIn });
```

Now anyone with the `token` can `POST` (and `GET`) the end point https://jsonbin.org/me/urls/0 - but not /urls root or any other element in the array.

---

This is the first stab at client side access to jsonbin, and I'm thinking about limiting bearer tokens to only being able to `GET` and to `POST` where the request doesn't mutate the original data (i.e. only append a new property or array element). I'd appreciate any thoughts on this too.
