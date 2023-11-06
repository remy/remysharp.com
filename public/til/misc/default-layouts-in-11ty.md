# Default layouts in 11ty

I found this really hard to determine in the [11ty](https://www.11ty.dev/) documentation, so I've added it here for future reference.

If you want a default layout for all pages there's a few ways you can do this (which is why I found it hard to determine from the docs), but since I almost always have an `.eleventy.js` configuration file, putting it there is (what I think) the cleanest solution:

```js
// assumes that `base.njk` lives inside _includes/
eleventyConfig.addGlobalData('layout', 'base.njk');
```

