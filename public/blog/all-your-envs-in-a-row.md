---
title: All your envs in a row 🦆🦆🦆
date: 2019-04-24
image: /images/ducks-in-a-row.jpg
tags:
  - code
---

# All your envs in a row 🦆🦆🦆

If you've used [Zeit's Now](https://zeit.co/now) platform you'll know to get your environment values readable by your code, you have to jump a few hoops.

There are solutions in place, you can put your environment values in a `now.json` file and you can use the [zeit/now-env](https://github.com/zeit/now-env) to read the values during dev, but I'm not a fan.

My preference is to use `.env` files and split across `.env.local`, `.env.production` etc (which as it happens goes [against the Twelve-Factor App manifesto](https://www.npmjs.com/package/dotenv#should-i-have-multiple-env-files) - but that's my choice). So here's a command that moves all the values from your `.env` into the command line during deployment.

<!--more-->

## awk'ward magic

```bash
awk '{ sub(/#.*$/, "") } !/^\s*$/ { printf("-e %s ", $0)}' .env
```

This command will read your `.env` file and:

1. Strip comments, anything starting with `#`
2. Ignore blank lines (which we may have if there was a comment on it's own line)
3. Print `-e PROP=VALUE` (where prop and value were in the `.env`)
4. Using `printf` ensures all the arguments are on a single line

## Using in the deploy

In my `scripts` as part of my `package.json` file, I have a command called `deploy` which takes the result of the command above and passes it directly to the `now` deployment tool.

Note that escaping is requires on the `\s` and the `"` characters:

```json
{
"deploy": "now $(awk '!/^#|^\\s*$/ { printf(\"-e %s \", $0)}' .env)"
}
```

Now I'm able to keep my environment values where I'd expect them to be.

## Caveats

This technique works for most common cases, but it'll probably hit issues if there are things like quotes or double quotes in your env values. It also doesn't let you read the env value from the environment during deploy (which, perhaps you're using CI for deployment, IDK).

That said, it works pretty well for me :)

*[IDK]: I don't know ¯\_(ツ)_/¯
