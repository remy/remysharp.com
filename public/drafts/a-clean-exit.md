# A clean exit

I was running some tests recently using [Mocha](https://mochajs.org/) and I wanted to re-run the tests when files changed. Typically this kind of functionality is built into test runners, but a) I'm not that familiar with Mocha (meh, it's just a tool) and b) I've got nodemon (which I wrote) 🙌.

The thing is: when I ran a failing test with nodemon and mocha, the way mocha exits (in this particular case) makes nodemon _think_ that the command totally failed with `process failed, unhandled exit code (2)`. Cleaning the exit is a good trick to know.

<!--more-->

## Exit codes

When a process runs (in a unix-based system…I'm unsure how much applies to Windows), it will exit with a code. There's only a handful of standardised [exit codes](http://tldp.org/LDP/abs/html/exitcodes.html), but there's only a few _standard_ codes, and probably of most interest are:

- **`exit 0`** → success
- **`exit 1`** → failure

If you try this in your terminal, the terminal will just close (since you're running `exit`). But to test this, you can run the following:

```bash
$ sh -c "exit 0"
$ echo $?
0
$ sh -c "exit 1"
$ echo $?
1
```

Running `sh -c "…"`  runs the string as a bash command and returns the result. Then the shell value `$?` is the numerical status of the exit code from the last executed command.

## Changing exit codes

When I ran mocha, it was returning an exit code of 2. This is a [weirdness of mocha that (misuses) the exit status](https://github.com/mochajs/mocha/issues/2438) reporting the _number_ of failing tests.

The "fix" is simple though. When I run mocha inside of nodemon, I use an bash _or_ statement that reads "if this fails, fail with an exit 1":

```bash
$ nodemon --exec "mocha bad.test.js || exit 1"
```

Now if mocha fails with `exit 2` it'll exit nodemon's _exec_ with an `exit 1` which nodemon sees as a failure.

## Elsewhere

I've used this same trick to fix a `postinstall` problem where the `postinstall` command in npm was failing which causes the entire `npm install` process to blow up.

So I change the `package.json` from:

```json
{
  "scripts": {
    "postinstall": "node -e \"console.log('Hi there')"
  }
}
```

To:

```json
{
  "scripts": {
    "postinstall": "node -e \"console.log('Hi there') || exit 0"
  }
}
```

The `|| exit 0` will cleanly exit the `postinstall` if there's _any_ error. Of course, if the `node` command is successful it'll exit with `0` and the `|| exit 0` still runs, but there's no negative effect.

So it's always good to understand exit codes and how to manipulate them if you need to.
