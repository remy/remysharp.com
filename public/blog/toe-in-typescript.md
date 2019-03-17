---
title: A Toe in TypeScript
date: '2019-01-23 09:45:06'
modified: '2019-01-23 09:22:57'
tags:
  - code
published: true
---
# A toe in TypeScript

I was watching a short video recently where the author was using TypeScript, except the only TS'ing thing about their code was the file extension. Otherwise it looked identical to the JavaScript I've come to love.

Since I finally joined the React train, I thought it might be time to take a more serious look at TS, so long as I can do it in tiny incremental steps, one toe at a time.

I had gotten the impression that I could use TypeScript in the same way that I can use the SCSS compiler with regular CSS and it will result in a working build, i.e. with only a filename change to my JavaScript (or near enough).

<!--more-->

## My goals

The only things I wanted out of this toe-dipping experiment was:

- In node I want to use `import x from 'x'` with zero-to-near-zero configuration (ideally zero…yes, I'd like my cake and I'd like to eat it)
- Type hints in my code (I'm using VS Code)
- My code to continue to work without me having to add types to everything and importantly: not to have to refactor my code

The thing that I think makes my task slightly more difficult than "just use TypeScript", is that I have a working code base in the first place. So I intend to port my code.

## Step 1: finding the minimum requirement

It took a while to find the bare minimum requirement to run my code. I was hoping for a video that explained "install this, and add that", but in the end I thought I found what I was looking for in a [TypeScript deep dive](https://basarat.gitbooks.io/typescript/docs/quick/nodejs.html) ebook by [@basarat](https://twitter.com/basarat).

Essentially…apparently:

1. `npm i -D typescript @types/node`
2. `tsc --init`
3. Use `nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/index.ts` in my `npm run dev` scripts

Not so bad so far. Now, apparently, I _just_ need to rename my `src/index.js` to `src/index.ts` and it'll work.

## My first blocker

```
[ts] Cannot redeclare block-scoped variable 'directiveResolvers'. [2451]
```

Yeah…no idea. It's not entirely clear without having to google off for the answer, and even then I wasn't sure _why_ I was seeing this error.

I could refactor my code to solve the problem (instead of declaring the `directiveResolvers` variable, I would export the value directly) - but I _still_ didn't know _why_.

So, new approach.

## The migration approach

Another [friendly twitter'er](https://twitter.com/matijagrcic/status/1087781402102452226) put me on to the [TypeScript migration guide](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html) which was worth trying since I couldn't get past the error above (not without changing my codebase).

This meant reverting my previous attempts (I'm using git so this was safe to do) and pasting in their minimum `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "allowJs": true,
    "lib": ["esnext"],
    "target": "es5"
  },
  "include": ["./src/**/*"],
  "exclude": ["node_modules", "__tests__"]
}
```

Then I ran `tsc` in the directory that the `tsconfig.json` file sat in.

Due to my existing codebase, `tsc` started to throw **a lot** of errors, like, hundreds!

```
error TS2583: Cannot find name 'AsyncIterator'. Do you need to change your target library? Try changing the `lib` compiler option to es2015 or later.
```


The suggestion in the error was to add `"lib": ["es2015"]` to the `tsconfig.json` - except that didn't work at all. Through trial and error, I found that using `esnext` instead lets me run without this particular error. So now I had new errors to contend with…

## My dependencies

Once I fixed the error above, `tsc` complained heavily about a lot of code that I didn't recognise:

![My TS errors](/images/ts-modules-error.png)

Thankfully enough of the filename was visible to consider that the compile process was going into the `node_modules` directory, and I'd imagine there was an `exclude` option in the config.

Except, adding

```json
"exclude": ["node_modules"]
```

…didn't work - and still threw the same TypeScript errors. Which is where I've left it for the time being.

## The usual frustrations

I work alone and so I don't have anyone I can easily turn to ask the obvious questions, like "what have I don't wrong here". In the Migrating from JavaScript guide on the TypeScript web site, right after the basic setup, it ends with:

> You should now have TypeScript working with your project

Which of course I don't. Sadly there's no suggested path forward if you fall into the category of "somehow failing".

So for the meantime, [I've turned to StackOverflow](https://stackoverflow.com/questions/54324127/migrate-from-js-errors-in-tsc-build) (which feels…creepy somehow), in the hope that I can get an answer to my current build failure and hope to continue this story of toe dipping.

Alas, so far, it feels like `Object.freeze(toe)` has turn gangrenous and fallen off…

I shall return, with new toes (and perhaps less puns) ✊

<small>I should add, feel free to point me in the right direction, or right my wrongs in the comments below 👍</small>
