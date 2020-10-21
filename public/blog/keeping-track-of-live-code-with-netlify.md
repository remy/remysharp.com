---
title: Keeping track of live code with Netlify
tags:
- code
date: 2020-10-19
---

# Keeping track of live code with Netlify

For a lot of my open source and side projects, I tend to release code as soon as I've finished a distinct chunk and in most cases, when the code is for a web site, I won't have any concept of managed versioning (though I do use [semantic/conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/)). This means often when I'm looking at the web site - or rather *you're looking at the web site* I can't always be sure which version of code you're using at the time.

Last week though, I discovered a little trick inside of Netlify that helped me surface this information in a, I think, fairly nice way.

<!--more-->

## A way to verify live changes

I wanted both a way that I could ask the users of my sites which version they were on, but also a way to check *what* had gone live in that latest change.

What I have now is this: a link at the bottom of each page that shows a commit sha that links to the commit diff between releases to Netlify.

![Version link example](/images/version-link.png)

This links to the previous deployed version of the code to the commit that's now live, using a github "compare" URL, such as this: https://github.com/remy/zx-tools/compare/68cc26a7d2f046c2fa7835c4d92d20198d306c10...c7024665afe86dc1a0d805b03a9c90c6448752d1

## The how

Netlify includes two useful [environment variables](https://docs.netlify.com/configure-builds/environment-variables/#git-metadata):

- `COMMIT_REF`: Reference ID (also known as 'SHA' or 'hash') of the commit we're building.
- `CACHED_COMMIT_REF`: Reference ID (also known as 'SHA' or 'hash') of the last commit that we built before the current build.

The compare URL I showed you earlier is the difference between these two commits. So the task is getting those values into my code.

I get these values into my code using three steps:

1. Netlify calls the `build` process on my project - I use Node and so this will run `npm run build` for me
2. The build process runs a shell script that generates a JavaScript file _on the fly_ for me
3. The file that's generated is then used during my main project build process

In my case I'm using JavaScript both on the server side (for a static build) and on the client side. However, there's nothing stopping you from using this process with PHP or any other language - the point is to use these values. In my case, I'm generating a new JavaScript file because I want to use this during browser runtime - so this file won't have access to environment variables at this point in time.

This is my `package.json` build process - the important part being the `sh ./hashit.sh` - the semi-colon `;` is used to separate two commands, so once the shell script is run, my main [parcel](https://parceljs.org/) build process runs:

```json
{
  "scripts": {
    "build": "sh ./hashit.sh; parcel build public/index.html"
  }
}
```

The `hashit.sh` file contains this line of code:

```sh
echo "export default { prev: \"$CACHED_COMMIT_REF\", curr: \"$COMMIT_REF\" }" > ./public/hash.js
```

This shell script will generate a new file in the `public` directory called `hash.js` which contains the parts I need. In my codebase I'm using JavaScript modules and building using Parcel, though you could just as easily change the contents of this file to run a `console.log` to show the URL to compare the release.

Finally, I have a client side JavaScript file that imports the `hash.js` file and adds a useful "version" link to my code, whilst also dropping a URL into the console (note that this lives in `public` so the import is relative to that directory):

```js
import hash from './hash';

const repo = 'zx-tools';
console.info(
  `Release https://github.com/remy/${repo}/compare/${hash.prev}...${hash.curr}`
);
```

Definitely useful for debugging some of my smaller projects, _particularly_ when the ship with a service worker which might load a slightly behind version.

## Gotcha: when this doesn't work

As I was writing this post, I thought it would be wise to check my blog, that also included this method. When I visited the compare URL, I found that it loaded up a broken page on github. Actually not broken, when I looked closer I realised that the commit sha for the cached release and the latest was the same.

That was entirely accurate and was due to the fact that I run an hourly deploy on my own blog (which keeps the timestamps and "live"-ish data fresh). So the gotcha is that this just doesn't work with projects that are auto-deployed without changes - as it is in my own blog's case.
