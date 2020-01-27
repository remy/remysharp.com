---
title: "Toggle light and dark"
tags:
- web
date: "2020-01-27 10:00:00"
summary: "How I toggle between light and dark in Code, Terminal and my OS"
image: /images/theme-iterm.png
---

# Toggle light and dark

There's odd excitement around dark themes these days, but I find that being able to switch between a light and dark theme to be really useful for working conditions (i.e. bright light or in the evenings).

I've got shortcuts to toggle my: OS, Visual Studio Code and iTerm2.

<!--more-->

## Toggle theme in MacOS

The simplest of the methods, I use an Alfred command: [theme-dark-mode-switcher](https://www.alfredforum.com/topic/11561-macos-mojave-theme-dark-mode-switcher/).

Then I can hit `cmd`+`space` and "toggle" to switch mode quickly. Like I said, simple.

![Alfred toggle](/images/theme-alfred.png)

## Toggle theme in VS Code

For this, I use an extension called (unsurprisingly) "Toggle" by Peng Lv. Once Toggle is installed, I've got the command set up with the following keyboard bindings settings:

```json
[
  {
    "key": "shift+alt+5",
    "command": "toggle",
    "when": "editorTextFocus",
    "args": {
      "id": "theme",
      "value": [
        { "workbench.colorTheme": "Atom One Light" },
        { "workbench.colorTheme": "Nord" }
      ]
    }
  }
]
```

To actually add this setting, you have to go to the [Advanced Customisation](https://code.visualstudio.com/docs/getstarted/keybindings#_advanced-customization) keyboard settings in VS Code (the link shows you what icon to click, it's far from obvious).

Also from the JSON above, the themes I'm toggling between are [Nord](https://marketplace.visualstudio.com/items?itemName=arcticicestudio.nord-visual-studio-code) (dark) and [Atom One Light](https://marketplace.visualstudio.com/items?itemName=akamud.vscode-theme-onelight) - both can be install via extensions in VS Code.

## Toggle theme in iTerm2

Perhaps the trickiest, but definitely the most rewarding. I use a project called [base16](https://github.com/chriskempson/base16/) and two shell aliases that let me quickly switch between the themes on the command line. I don't think the light theme is perfect, but it's good enough for teaching.

![My two terminal themes](/images/theme-iterm.png)

To enable this I followed the install directions for [base16-shell](https://github.com/chriskempson/base16-shell) and then from there I was able to select my themes.

I use [onedark](https://github.com/tilal6991/base16-onedark-scheme) ([preview](https://base16.glitch.me/previews/base16-onedark.html)) and [atelier-forest-light](https://github.com/atelierbram/base16-atelier-schemes) ([preview](https://base16.glitch.me/previews/base16-atelier-forest-light.html)) as my dark and light pairing, and I can switch between them using aliases:

```shell
$ alias light="base16_atelier-forest-light"
$ alias dark="base16_onedark"
```

I put all the base16 themes up on glitch to [quickly preview](https://base16.glitch.me/previews/) or you can preview theme all in the terminal using this command:

```bash
for f in ~/.config/base16-shell/scripts/*;
  sh $f && \ # run theme
  printf $f && \ # print the name
  read; # wait for user to press key
```

What would be a nice bonus would be if my themes switched automatically after a predefined number of hours after sunset (like my phone does), but I'll leave that for another day.
