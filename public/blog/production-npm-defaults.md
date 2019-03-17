---
title: Production npm defaults
date: '2016-02-17 15:06:05'
tags:
  - code
published: true
modified: '2016-02-21 18:17:33'
---
# Production npm installations

This is a super short post with a little semi-pro tip for working with npm packages and production quality builds and importantly: pinning releases.

<!--more-->

**Context: technical post about node projects and npm**

By default today, if you run `npm install --save foo@1`, you'll get a new entry in your package as such:

```json
  "dependencies": {
    "foo": "^1.1.0"
  }
```

Assuming(!) that the package author is following semver, then you'll get all the fixes (patch) and features (minor) for free upon next install due to the leading `^` character (except in the cases like `0.1.0` or `0.0.1`...because "[semver](https://docs.npmjs.com/misc/semver#caret-ranges-123-025-004)" `¯\_(ツ)_/¯` - but the point is, that it's *floating*).

This might be fine for 3rd party dependencies, but might not work for your own packages. If this was my main application code, and `foo` was one of my own packages, I'd want to be sure I was installing exactly the version I intend to.

The npm cli has a little known (to me) command `--save-exact` (or `-E`) which will save the specific version. In addition, you can create an `.npmrc` file that's in your project's root directory that contains:

```
save-exact = true
```

This will mean that all `npm install <pkg>` commands will pin to the version that was available at the time you run the command.

**Important note** this does not guarantee being able to replicate the build. This is because the dependencies of your dependencies won't be pinned. If you need this, then consider either using [shrinkwrap](https://docs.npmjs.com/cli/shrinkwrap) or [bundleDependencies](https://docs.npmjs.com/files/package.json#bundleddependencies).
