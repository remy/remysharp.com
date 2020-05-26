# FOR … TO

Not a huge TIL, but something I don't want to forget - the `FOR %i=a TO b` is **inclusive** of `b` (unlike other languages that I'm used to).

So:

```
10 FOR %I=0 TO 4
20     PRINT %I
30 NEXT %I
```

Prints:

```
0
1
2
3
4
```
