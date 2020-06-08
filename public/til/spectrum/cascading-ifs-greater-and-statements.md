# Cascading IFs > AND statements

> There is no short-circuit evaluation of boolean expressions in BASIC so it often pays to cascade IFs and put the expression most likely to be false first.
>
> In BASIC, **AND always evaluates both operands even if the first is false**.

An oddity of the BASIC language, but useful to know since it goes against "modern" languages.

This might read as optimised (as the first clause is least likely):

```nextbasic
IF %g=208 AND (j=0) THEN %j=1
```

But it's better/faster written like this:

```nextbasic
IF %g=208 THEN IF %j=0 THEN %j=1
```
