# curl -s isn't as useful as I thought

My default aliases includes an alias that sets `curl=curl -s` to keep curl requests quiet. More fool me.

I was trying to send a buffer using node that contained some `null` values (`0x00`) and actually zero visible characters and testing on the command line (as I do) using `curl` would always fail with:

```
* Failed writing body (0 != 141)
* Closing connection 0
```

Without (my default) `-s` I would have seen this:

```
Warning: Binary output can mess up your terminal. Use "--output -" to tell
Warning: curl to output it to your terminal anyway, or consider "--output
Warning: <FILE>" to save to a file.
```

But `-s` hides both progress and errors. So now I use `curl=curl -s -S` to only hide progress and to _keep_ errors.
