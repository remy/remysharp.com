# Debugging vanishing text in shell scripts

Did you ever get a weird bash scripting issue where a variable would "randomly" eat characters of another command?

No…? Well, I have, quite a few times, so I figured it was time I wrote up my fix.

Tools used: `curl`, `awk` and `od`

<!--more-->

## The issue

I was writing a small shell function that used the output of a `curl` command to make a secondary request. Except my function would fail with no useful error.

My first `curl` was being piped through `awk` so I could capture the `Location` redirect URL, and use _that_ URL as the source of the second request.

So, the first part looks like this (actual request shortened for the article):

```bash
curl https://api.tinify.com/shrink -D /dev/stdout \
  awk '/Location:/ { printf $2 }'
https://api.tinify.com/output/kdn3bvw6wzb2tqj869n6c5yq0tc34gt9
```

Note that I'm using `printf` in `awk` so that a `\n` isn't added.

The second request would do this:

```bash
curl $URL -X POST -d '{\"resize\":{\"method\":\"scale\",\"width\":1320}}'
```

Except this didn't work. And when I put `echo` in front of the second curl (to validate the variables worked), it looked like this:

```text
 -X POST -d '{\"resize\":{\"method\":\"scale\",\"width\":1320}}'
```

Everything before and including the `$URL` had be chomped.

## Debugging invisible characters

I suspected some non-visible characters, but knowing what requires a tool that I occasionally turn to for looking at output in detail: `od` ([tl;dr manual](https://tldr.ostera.io/od))

If I pipe the output from my `awk` command through `od -c` (C-style escaped characters view), I get this:

```text
0000000  h  t  t  p  s  :  /  /  a  p  i  .  t  i  n  i
0000020  f  y  .  c  o  m  /  o  u  t  p  u  t  /  k  d
0000040  n  3  b  v  w  6  w  z  b  2  t  q  j  8  6  9
0000060  n  6  c  5  y  q  0  t  c  3  4  g  t  9 \r
0000100
```

Specifically, notice the very last character: `\r`, carriage return. It's the carriage return that is specifically eating the text.

## Striping unwanted characters in ack

During the `awk` script, I can remove all white-space on the fly with this change, and the offensive character (specifically the `\r` is striped):

```bash
$ curl https://api.tinify.com/shrink -D /dev/stdout \
  awk '/Location/ { gsub(/[[:space:]]+$/, ""); printf $2 }' | \
  od -c
```text
0000000  h  t  t  p  s  :  /  /  a  p  i  .  t  i  n  i
0000020  f  y  .  c  o  m  /  o  u  t  p  u  t  /  k  d
0000040  n  3  b  v  w  6  w  z  b  2  t  q  j  8  6  9
0000060  n  6  c  5  y  q  0  t  c  3  4  g  t  9
0000100
```

Gone!

Now when I use the result from the `curl` and it'll work.

The final result:

```bash
function shrink() {
  # first upload and compress the filename argument
  local URL=$(curl https://api.tinify.com/shrink \
    --user api:$TINIFY_KEY \
    --dump-header /dev/stdout \
    --data-binary @$1 | \
    awk '/Location/ { gsub(/[[:space:]]+$/, ""); printf $2 }'
  )

  # then download and overwrite the file with the newly shrunk file
  curl -X POST $URL --user api:$TINIFY_KEY --dump-header /dev/stdout --output $1 -H 'content-type: application/json' -d'{"resize":{"method":"scale","width":1320}}'
}
```
