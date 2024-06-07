---
title: 'Adding tests to a TypeScript, Next, tRPC project without the faff'
date: '2024-06-07'
tags:
  - code
---

# Adding tests to a TypeScript, Next, tRPC project without the faff

Aside from the cringe inducing stack I've got layered, with client projects you (actually, me) work with the hand you've been dealt.

I needed to add tests to this particular project (which will eventually be open source) and the typical route would have been Jest, but that failed hard. So here's what I did to get tests working.

<!-- more -->

## Tooling

Great tools are great. However, I'm a stickler for config hell and I quickly lose my patience when the exact coordination of tools aren't stacked stacked in the exact right way, often leaving my screen full of obscure errors and even more obscure obscenities coming out of my face hole.

There's many test frameworks, and I've used a lot of them. Jest is one that I tend to reach for because it bundles a lot of the test mechanism I use (expects, mocks and so on).

Where Jest gets…tricky, is when it's used with modules, which tends to mean "imports aren't going to work". So this is when more tools are added.

When the project (this one in particular) is using Next.js which has "zero config" TypeScript support, but dropping that into Jest isn't straight forward.

Problems included `SyntaxError: Cannot use import statement outside a module` and I [tried](https://nextjs.org/docs/app/building-your-application/testing/jest) quite a [few](https://jestjs.io/blog/2019/01/25/jest-24-refreshing-polished-typescript-friendly#typescript-support) [solutions](https://jestjs.io/docs/getting-started#using-typescript) - I felt like I was close with [ts-jest](https://github.com/kulshekhar/ts-jest), but never _quite_ there.

I can't remember exactly how or why I pivoted (probably a github issue on Jest) but I tried Vitest and instantly was unblocked.

## Vitest

I can appreciate a simple to understand [homepage](https://vitest.dev/) and Vitest does that well:

> - Out-of-box ESM, TypeScript and JSX support powered by esbuild.
>
> - Jest Compatible: Expect, snapshot, coverage, and more - migrating from Jest is straightforward.

Moreover, it seemed almost config/faff free.

Adding `vite.config.mts` (not sure what `.mts` is…) to the root of the project with the following had me running immediately:

```js
/// <reference types="vitest" />

import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()], // make my aliases work
});
```

From there I'm unblocked.

## Testing tRPC

I know the API for testing has changed already (from the point of tutorials I'd found and what was the current code), but once I'd figured this out I created a helper which then exposes all tRPC API to my tests:

```js
// helper.ts
import type { NextApiRequest, NextApiResponse } from 'next';

// the normal tRPC route that's used in the server
import router from '~/lib/router';

// the result of initTRPC.create()… then createCallerFactory is exposed
import { createCallerFactory } from '~/lib/trpc';

export function makeCaller(opts = {}) {
  const createCaller = createCallerFactory(router);
  const callerOptions = {
    req: {} as NextApiRequest,
    res: {} as NextApiResponse,
    rateLimit: undefined, // rateLimit and user is bespoke to my code
    user: null,
    ...opts, // allows me to overload as required in my tests
  };

  return createCaller(callerOptions);
}
```

I also prefer test code that actually imports the function it's using (rather than having to guess what's been magically injected into the global scope). Here's a simple/pointless litmus test:

```js
import { expect, test } from 'vitest';
import { makeCaller } from './helper';
import { getLatestVersion } from '~/lib/handlers/changelog';

test('change log', async () => {
  const caller = makeCaller();

  const res = await caller.changelog.latest();
  expect(res.version).toEqual(getLatestVersion('1'));
});
```

## Tools with less faff win

It seems like the days of "killer config" originating back in the height of WebPack (though probably slightly earlier with Grunt and Gulp et al), this mindset that developers should have to stack up layers and layers of config seems to have become de facto - but it really doesn't need to.

I'll always gravitate towards config being hidden away from me when it comes to tooling.

~~Complicated~~ Faff is not a badge of honour after all.