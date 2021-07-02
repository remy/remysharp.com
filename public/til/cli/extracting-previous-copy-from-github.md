# Extracting previous copy from github

Sometimes I need to pull a complete copy of a previous file out of a github (this is useful when needing to do visual binary diffs to see which bytes have moves or changed).

To pull a specific file, say the last commit, the following command line does the trick:

```sh
git show HEAD^:./myfile.bin > myfile.bin
```

The `HEAD^` means "one commit behind the head of the branch" (the "head" being the last commit on the branch). Though if you've got merge commits where a commit has more than one parent commit this can get a little complicated (which why I tend to stick to _just_ the previous commit).

Using `HEAD^^` or `HEAD^2` means "two commits before the head of the branch". There's also detailed [stackoverflow post about the difference between](https://stackoverflow.com/a/2222920) the caret `^` and the tilde `~` with examples of how they traverse up the tree.
