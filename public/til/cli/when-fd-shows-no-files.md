# When fd shows no files

I'm a big fan of [`fd`](https://github.com/sharkdp/fd/) and use it as a part of my dev workflow as it's [way easier than `find`](https://remysharp.com/2018/08/23/cli-improved#fd--find).

I've used it to convert files on the fly for ingest, specifically converting xlsx to csv en mass.

This is the command I was running:

```bash
$ fd . -e xlsx -x sh -c "in2csv '{}' > '{.}'.csv"
```

This finds all the files that end with xlsx (using `-e`) and executes (`-x`) a shell command that passes the full filename `{}` to [in2csv](https://csvkit.readthedocs.io/en/latest/) (part of the csvkit tools) and outputs to the basename `{.}` with `.csv` appended.

Except I found that this wouldn't work in certain situations. At first I thought it was because I had spaces in my filenames, but then remembered: _[fd] ignores patterns from your .gitignore, by default._

Since xlsx files aren't required in my git repo they're ignored. So this _TIL_ is more to make sure I don't forget, to ignore the ignore file `-I` is required.

```bash
$ fd . -I -e xlsx -x sh -c "in2csv '{}' > '{.}'.csv"
```

Simples.
