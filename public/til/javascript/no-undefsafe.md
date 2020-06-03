# No undefsafe

I wrote a small JavaScript library called [undefsafe](https://www.npmjs.com/package/undefsafe) which I use in my work. I believe the [_.get](https://lodash.com/docs/4.17.15#get) lodash package is very similar (though I added a few super powers to my own library).

However, with frameworks like [Next.js](https://nextjs.org/) and [Nuxt.js](https://nuxtjs.org/) (and likely others), I've found that I don't need undefsafe due to the _optional chaining_ and _nullish coalescing_ features that are provided with ES2020 (which are polyfilled for us in these frameworks).

This means my code can go from this:

```js
let v = undefsafe(this, 'pkg.services.vulns.count') || "not available";
```

To this:

```js
let v = this.pkg.services?.vulns.count ?? "not available";
```

The nullish coalesce is useful because of `.count` is `0`, then the value of `v` is, correctly, zero.
