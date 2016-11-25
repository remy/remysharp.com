# Tricks with xargs

As a (at present) Mac user, I spend nearly all my time in the terminal, and around 2002 a friend taught me about the `xargs` command, which I probably use way too much, but it's pretty handy. However, I keep forgetting specific tricks, so I'm writing them up here, in my online searchable diary.

<!--more-->

```sh
ls */package.json | xargs -I file ws -l file
```

## Search every project for a specific dependency

I had a specific problem where I was trying to remember a dependency that I had included for date mocking, except I had forgotten the name.

I wanted to search just the `devDependencies` so I intended to run each `package.json` through the [`json`](https://github.com/trentm/json) command line too. Except to complicate things, the `json` tool requires the JSON as STDIN (or…so I thought!).

So, I had to combine a number of features:

1. Filename placeholder: `-I file`
2. Run command for each line: `-L 1`
3. Shell out: `sh -c '<command>'`

The result was this (multiline for readability):

```sh
ls */package.json |
   xargs -I {} -L 1 sh -c 'json devDependencies < "{}"'
```

Of course, when I found out (afterwards!) that `json` _can_ take a filename, it simplifies considerably:

```sh
ls */package.json | xargs -I {} -L 1 json -f {} devDependencies
```

Aside, this could also be done using `find`, but it's quite a bit slower (for me) since there's a lot more files it work its way through:

```sh
find . -name package.json -depth 2 -exec sh -c 'json -f "{}" devDependencies'  \;
```
