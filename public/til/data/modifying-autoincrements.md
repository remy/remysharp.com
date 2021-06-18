# Modifying auto increments

When using postgres locally for development, sometimes, if the production dataset is too large, I'll take a sample to work with locally.

More recently I've run into the problem that when I load new production data into tables with auto increment primary key columns, I'll get a conflict, i.e. I load some production data in locally, and then when the auto increment runs it'll hit a conflict - because my local sequences are completely out of sync with production.

The solution is to update my local sequence value. This is a two part process.

**1. Capture current values from production:**

```sql
SELECT last_value FROM public.<table>_<col>_seq;
```

So for something like user ids, this would be:

```sql
SELECT last_value FROM public.user_id_seq;
>>> 304
```

If this doesn't yield a result, then the sequence name is wrong, and it can be checked with the following query:

```sql
SELECT pg_get_serial_sequence('user', 'id');
```

Now armed with this value, in my example `304`, the next part is to upload _locally_:

**2. Update sequences locally:**

```sql
ALTER SEQUENCE <table>_<col>_seq RESTART WITH <next_value>;
```

It's important that I update to the *next* value, not the current value:

```sql
ALTER SEQUENCE user_id_seq RESTART WITH 305;
```

Now when the next id for the user is loaded through an insert, the sequences are in sync.
