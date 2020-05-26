# Escaping apostrophies in curl

Good lord this shouldn't be so complicated. But aside from the obvious (swap apostrophies for quotes), you can escape an apostrophe with the following:

```
'\''
```

So the curl for `"Remy"'"Sharp"` is:

```
curl -X POST -d 'text="Remy"'\''"Sharp"' …
```
