---
title: 'Fast snapshot and restoring for postgres'
date: '2021-06-18'
tags:
  - code
---

# Fast snapshot and restoring for postgres

I've been using postgres a lot lately for projects, but when dealing with large dataset changes and testing, it's not a quick process to reset the state to start again.

I stumbled upon [stellar](https://github.com/fastmonkeys/stellar) which appears to do exactly this job, but I had a couple of gotchas so figured I'd capture it here.

<!--more-->

## Installing stellar

Start with the install which requires Python's pip tool:

```shell
pip install stellar
```

The next command should be the init command, but this failed to complete and notified me that I needed to install psycopg2, but `pip install psycopg2` fails hard (for me) with large screens of errors.

The psycopg2 package needed to know where I was keeping postgres, so this fixed it ([hat-tip to Nevelina A. on twitter](https://twitter.com/Nimphal/status/1405600945170530310)):

```shell
PATH=$PATH:/Applications/Postgres.app/Contents/Versions/12/bin/
pip install psycopg2
```

Obviously make sure you're adding your own current version of postgres to the path (I happened to be on 12).

Once that was done the initialisation can run:

```shell
stellar init
```

I was prompted with some options and filled them out. Next is to actually snapshot - giving my snapshot the name of `first` (not the best of names I know):

```shell
stellar snapshot first
```

This also failed. Two more changes required:

In the `stallar.yaml` file that's been generated in the local directory, the `url: postgresql://` property needed my username to access the database, so changing to the following fixed it for me:

```yaml
url: postgresql://remy@localhost:5432/template1
```

Lastly I kept getting an error reading `There is 1 other session using the database` - this wasn't the case, and the fix was more installs, specifically the following:

```shell
pip install SQLAlchemy==1.2.5 SQLAlchemy-Utils==0.33.1
```

Once these last bits are in place, the snapshot completes.

To restore I can then run:

```shell
stellar restore first
```

And I'd strongly recommend visually confirming this works, but these were the only hoops I had to jump through and now going to the reset state is pretty fast and helping speed up my dev process.
