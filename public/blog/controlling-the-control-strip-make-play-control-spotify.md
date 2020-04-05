---
title: 'Controlling the control strip: make play control Spotify'
tags:
  - personal
  - work
date: '2020-04-06 10:00:00'
---

# Controlling the control strip: make play control Spotify

I've recently upgraded my laptop (after the 6 years my previous MacBookPro latest) and I've now got one of these touchbar things. It's cute, but I know that my laptop will be closed for 90% of the time and attach to an external monitor and keyboard.

That said, it absolutely does my head in that the control strip's "play/pause" button will only control iTunes/Music. So I fixed that.

<!--more-->

## Karabiner Elements to the rescue

I've been using [Karabiner Elements](https://karabiner-elements.pqrs.org/) for a while now and it's a superb bit of software. It gives you complete control over the keyboard and sits in between and gives you the ability to completely change what the operating system actually sees.

So it stands to reason that I could capture the play/pause key press and completely take it over and send it to Spotify instead. It's not _quite_ that simple, but it's no too far off.

Step one is to download and install Karabiner Elements. Once you've got that running, it needs to see the touch bar - which apparently announces itself as an entirely separate keyboard. So check this box:

![Karabiner Settings](/images/karabiner-settings.png)

Now Karabiner can see your keyboard - and a quick way to test this is to head to "Simple Modifications" and add "play_or_pause" and map it to (something like) "mute". Now test the play control strip button - if it mutes, then it's working and the next step is to create a "complex modification" to control Spotify (you should remove the simple modification now).

## Controlling Spotify

From Karabiner Elements' preferences, on the **Misc** tab, click on the button the reads "Open config folder". This is where we'll add the following in new JSON file. Under the directory `complex_modifications` (make it if it doesn't exist), add this file as `touchbar.json` (or as you please):

```json
{
  "title": "Touchbar",
  "rules": [
    {
      "description": "Play/Pause controls spotify",
      "manipulators": [
        {
          "from": { "consumer_key_code": "play_or_pause" },
          "to": [
            {
              "repeat": false,
              "halt": true,
              "shell_command": "osascript spotify-play.scpt"
            }
          ],
          "type": "basic"
        }
      ]
    }
  ]
}
```

This says: _when the button pressed is `play_or_pause` then run an applescript and prevent the keyup_. You can determine the key value from the Karabiner ElementsViewer that's also installed.

## The Apple Script

The last bit of the puzzle, you need to store this file in the same directory as the `touchbar.json` file (or change the location in the `shell_command` value).

```
using terms from application "Spotify"
  if player state of application "Spotify" is paused then
    tell application "Spotify" to play
  else
    tell application "Spotify" to pause
  end if
end using terms from
```

And that…should be it. I now have control over my own machine, which is frankly how it should always be.
