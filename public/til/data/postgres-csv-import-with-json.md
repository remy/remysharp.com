# Postgres CSV import with JSON

The problem: CSV files generally quoted using `"` and delimited using `,` - both of which feature heavily in JSON strings.

So importing a CSV with JSON doesn't fly.

One solution (it took me hours and hours to solve) is to use an alternative byte for quote and delimiter.

For example, quote using `\x1` and delimiter using `\x2`. Inspecting the bytes for the source data should look a little like this if done right:

![the 01 and 02 bytes between fields](/images/postgres-quoting.png)

Now to import requires careful command-line-fu:

```
$ cat data.csv  | psql postgres://localhost:5432/my_db -c "\copy quiz (id,title,description,\"maxPoints\",source,attribution,lessons) FROM STDIN csv QUOTE E'\x1' DELIMITER E'\x2'"
```

A few key points:

1. The mixed case column needs quoting (and I'm escaping the quotes)
2. I'm using hex representation of the byte values `1` and `2`, so that's `\xDIGIT`
3. For the postgres import to understand the escaped digit, I **must** use `E` before the string

Now I'm able to import JSON in a CSV file.
