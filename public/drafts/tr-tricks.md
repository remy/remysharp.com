---
title: tr tricks
date: '2016-04-22 08:56:00'
modified: '2016-08-07 19:29:39'
complete: false
inprogress: true
tags:
  - web
draft: true
---
# tr tricks

Usually I want to perform a simple string manipulation on the command line, and I tend to turn to `awk` or `sed` and quickly gets stuck and go spelunking Google for the syntax, when in fact the `tr` (translate characters) command can do a lot of the simplistic manipulation (and it's less to remember!).

<!--more-->

## Split example

When I echo out the `$PATH` environment value, it's all listed in a single line separated by the `:` character. To make it readable, I want to translate every `:` for new line `\n`:

```
$ echo $PATH
/Users/remy/bin:/usr/local/bin:/usr/bin:/bin:#etc

$ echo $PATH | tr ':' '\n'
/Users/remy/bin
/usr/local/bin
/usr/bin
/bin
#etc
```

From there I can see the path order, or grep for a particular path.

## Delete characters

The translate command can also be used to delete characters. Super easy too using `-d`.

Say you wanted to capture and kill every running process

```
$ cat file | tr -d '()'
```
