# Debugging shell scripts

I use shell scripts a lot when I find I've got a repetitive and long command to run on the command line. So in these cases, I put them in my [.alias](https://github.com/remy/dotfiles/blob/master/.alias) and [.function](https://github.com/remy/dotfiles/blob/master/.functions) files, but the debugging workflow is painful:

```
source ~/.functions; zxrmdir
```

Did it work? No, return to VS Code, edit, save, command line, repeat.

With `set -x` at the start of `zxrmdir` (my custom function from above) it will echo out all the commands being run, and how the shell is seeing them (super useful when debugging why a quoted string isn't being quoted as expected).

Remember to end the function with `set +x` to turn this flag off. The result is (something like) this:

```
+zxrmdir:2> local DIR=/devel/Screenshots
+zxrmdir:3> read line
+zxrmdir:3> awk -v 'q="' -v 'd=/devel/Screenshots/' '{ $1=""; gsub(/^ /, "", $0); print d $0 }'
+zxls:1> hdfmonkey ls /Applications/cspect/app/cspect-next-2gb.img /devel/Screenshots
+zxrmdir:4> zxrm '/devel/Screenshots/opening dir: Path not found'
+zxrm:1> local FILENAME='/devel/Screenshots/opening dir: Path not found'
+zxrm:2> basename '/devel/Screenshots/opening dir: Path not found'
+zxrm:2> [ '/devel/Screenshots/opening dir: Path not found' '=' 'opening dir: Path not found' ']'
+zxrm:5> echo hdfmonkey rm /Applications/cspect/app/cspect-next-2gb.img '/devel/Screenshots/opening dir: Path not found'
hdfmonkey rm /Applications/cspect/app/cspect-next-2gb.img /devel/Screenshots/opening dir: Path not found
+zxrm:6> hdfmonkey rm /Applications/cspect/app/cspect-next-2gb.img '/devel/Screenshots/opening dir: Path not found'
Deletion failed: Path not found
+zxrmdir:4> break
+zxrmdir:6> set +x
```

So above, I can see the errors and how the commands are being interpreted.
