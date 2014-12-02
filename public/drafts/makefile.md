# Makefile instead of hoop jumping

In 2012 I ran a Build Process workshop as part of [ffconf tooling tutorials](http://2012.ffconf.org/#tooling). Early on as part of my workshop introduction I said that makefiles were hard and for harden unix beared folk...or something. Grunt (and the like) were definitely a gentler solution.

I still stand by that, but today the idea of installing a bunch of dependancies *just* so I can have my Less file converted to CSS in real-time feels...well, crap.

<!--more-->

## Barebones

When I write my JavaScript, I err on the side of barebones. I tend to roll without libraries and frameworks, and (for better or worse) I don't use frameworks like Ember or Angular.

I prefer lean and close to the metal. Obviously I'll employ a framework when I'm repeating myself over and over, but this has always been my preference when developing.

When I think of it like that, it makes sense that I'd eventually end up wanting to use low levels tools like Make to handle my workflow (and eventually build process).

## My requirements

I had a project that used Less to generate the CSS. Originally we had an Express middleware that would generate the CSS file on demand.

The result was the was a significant flash of unstyled content whilst the initial build of the CSS ran (perhaps on each release - I don't recall). So we changed it so that CSS would build once.

Now when we changed the `.less` file, we had to re-run the build...

I moaned (as usual) on twitter, and got lots of useful responses, but it mostly involved installing mutliple tools (Grunt or Gulp, plus some 3rd party lib to generate, then the watcher...etc) or suggestions that changed the workflow I was using.

This doesn't sit well. My requirements (to me) were simple:

1. When a single `.less` file changes
2. Rebuild it
3. Repeat

Simple.

## Solution

There's two parts, and the execution.

1. Watch: when a watched file changes run a command
2. Rebuild only the file that changed

The execution is simple, in my `package.json` file (because I'm using npm & node), I have:

```json
{
  "scripts": {
    "watch": "<command>"
  }
}
```

And on the command line I run:

```shell
$ npm run watch
```

### Watch

I looked into [gaze](http://npmjs.org/gaze), [watchy](https://github.com/caseywebdev/watchy) and a few others, but eventually settled on two potentials:

- [fswatch](https://github.com/emcrisostomo/fswatch) - which is mac specific
- [nodemon](https://github.com/remy/nodemon) - my own creation, but actually works perfectly

Here's how the watch works with `fswatch`:

```shell
fswatch -o public/css/*.less | xargs -n1 -I{} make
```

And the same thing with nodemon (via a locally installed `npm install --dev nodemon` in the project):

```shell
nodemon --quiet --watch public/css/ --ext css --exec make
# same thing except with shorthand flags:
# nodemon -q -w public/css/ -e css -x make
```

Now whenever a .less file changes in the `public/css` directory, my `make` command runs, and because Make is clever, it'll only recompile the files that have actually changed.

Aside: In my own projects, I've gone further with nodemon, to use it for automatically re-running tests and recompiling JavaScript for development.

### Rebuild

Make is clever in that it will only rebuild the files whose dependencies have changed. In that the `.css` file has a `.less` file dependency, so when that's changed, make will run the command to rebuild our individual `.css` file.

```makefile
# when you run `make` alone, run the `css` rule (at the
# bottom of this makefile)
all: css

# .PHONY is a special command, that allows you not to
# require physical files as the target (allowing us to
# use the `all` rule as the default target).
.PHONY: all

# replace all .less files with .css extension and cache
# the results in a variable called `css_files`
css_files := $(patsubst %.less, %.css, $(wildcard ./public/css/*.less))

# when a .css file is *not* up to date compared to the
# .less file, then make will run the the following commands:
# - echo the string "foo.less -> foo.css"
# - run the command `lessc -x --source-map foo.less foo.css`
./public/css/%.css: public/css/%.less
  @echo "$< -> $@"
  @./node_modules/.bin/lessc -x --source-map $< $@

css: $(css_files)
```

## Final result

The [final result](https://gist.github.com/remy/274232f8b47dfa163324) is pretty awesome, especially with CSS source maps enabled in devtools.

I can edit and change the Less file in devtools, and the rebuild is near instant, which in turn is detected by devtools, which is then injected into Chrome so I see the updates happening in near-real-time.

As further reading, I highly recommend you check out [James Coglan's excellent post on using Make](https://blog.jcoglan.com/2014/02/05/building-javascript-projects-with-make/) for a full JavaScript project.