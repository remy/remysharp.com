# Production npm defaults

This is a super short post with a little semi-pro tip for working with npm packages and production quality builds and importantly: pinning releases.

<!--more-->

**Context: node projects and npm**

By default today, if you run `npm install --save foo@1`, you'll get a new entry in your package as such:

```json
  "dependencies": {
    "package": "~1.0.0"
  }
```

