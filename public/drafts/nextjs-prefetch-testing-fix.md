# Next.js prefetch & testing (fix)

Super specific blog post title, I know, but I ran into a problem during a [Next.js](https://github.com/zeit/next.js) project development that has yet to be solved, so it was worth me posting here for future reference.

When testing Next based React components (using Jest, but I suspect the problem is the same for other runners), when using the `next/link` and `prefect` causes a test failure. This is how to work around it.

<!--more-->

## The problem

```text
 FAIL  __tests__/index.test.js
  ● With Snapshot Testing › App shows "Hello world!"

    No router instance found.
    You should only use "next/router" inside the client side of your app.


      at throwIfNoRouter (node_modules/next/dist/lib/router/index.js:73:11)
      at Object.<anonymous> (__tests__/index.test.js:20:75)
          at <anonymous>
      at process._tickCallback (internal/process/next_tick.js:169:7)

  With Enzyme
    ✓ App shows "Hello world!" (13ms)
  With Snapshot Testing
    ✕ App shows "Hello world!" (18ms)
```
