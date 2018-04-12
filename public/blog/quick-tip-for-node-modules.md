# Quick tip for node modules

When writing my node modules, I've come to really quite enjoy using Jest for testing (I've written about [how I used tap](https://remysharp.com/2016/03/01/from-tests-to-debugging-node-workflow) and it's quite similar).

Sometimes however, being able to execute the module on the command line and passing some arbitrary data can be pretty handy, and I've used the following technique on a growing handful of modules I've written.

<!--more-->

## Exporting to the CLI

I've written a module called `bin-to-file`. It's an old JS Bin module that takes a bin structure and returns a single HTML string with everything smooshed together.

The module has tests, but I want to be able to quickly test the output using the command line like this:

```bash
$ cat __test__/foo.json | node lib/index.js
‣ &lt;html…
```

In my `lib/index.js` (the source for the module), right where I'm exporting the function out, my code includes the following lines:

```js
// if the module isn't being required be another module
// and there's something being piped in, then —
if (!module.parent && !process.stdin.isTTY) {
  const stdin = require('fs').readFileSync(0); // 0 = STDIN
  console.log(module.exports(JSON.parse(stdin.toString())));
}
```

And that's it. Now I can use my module on the command line for arbitrary testing.
