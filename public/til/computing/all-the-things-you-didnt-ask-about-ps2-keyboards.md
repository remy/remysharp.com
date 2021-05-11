# All the things you didn't ask about PS/2 keyboards

- It's a 2 way communication protocol, i.e. the PS/2 keyboard will receive messages from the host/controller
- There's 6 pins on the lead, but only 4 are used: vcc (power), ground, clock and data
- A key stroke is made up of a `make` and a `break` message (i.e. key down, key up), so a key being held down sends repeating `make` messages
- Different machines expect different timing between messages, the Amiga for instance seems to want around 20 microseconds between `make` and `break` otherwise it seems to ignore the key up event and you get the key down repeated
- Conversely the Atari 800 XL seems to want a large time space between `make` and `break`
- Different keyboards behave slightly differently, the protocol doesn't seem to be entirely standardised, more like "it should work this way"
- A PS/2 keyboard will send a BAT, `0xAA` and some keyboards will keep sending this until it gets a response from the host (the computer it's connected to), with `0xAA` (meaning the PS/2 controller test is done), others will detect a key press and stop sending the `0xAA` message
- Plugging a USB keyboard into a USD to PS/2 adapter won't work on keyboards with "active" components - though I'm not entirely clear on what exactly this means, it can generally be assumed anything non-standard/basic on a keyboard is active, i.e. bluetooth, or a USB hub, etc.

This is a backup copy of a [very thorough set of articles](https://www.avrfreaks.net/sites/default/files/PS2%20Keyboard.pdf) on the PS/2 protocol for both the keyboard and mouse.

*[BAT]: Basic Assurance Test
