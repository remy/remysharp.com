# tr tricks

Usually I want to perform a simple string manipulation on the command line, and I tend to turn to `awk` or `sed` and quickly gets stuck and go spelunking Google for the syntax, when in fact the `tr` command can do a lot of the simplistic manipulation.

<!--more-->

## Split

Splitting the env path by the `:` character into new lines:

```
echo $PATH | tr ':' '\n'
```

From there I can see the path order, or grep for a particular path.

## Join

```
