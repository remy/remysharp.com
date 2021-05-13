# Next layer resolutions

I keep losing this information in the Next manual, so here it is for quick lookup.

Layer|Name|Resolution|Cell size|Cells|Colours|Colours/cell
-|-|-|-|-|-|-
L0|ULA|256 x 192|8 x 8|32 x 24|8|2
L1,0|LoRes|128 x 96|-|-|256|-
L1,1|Standard Res|256 x 192|8 x 8|32 x 24|256|2
L1,2|Timex HiRes|512 x 192|-|-|2|-
L1,3|Timex HiColour|256 x 192|8 x 1|32 x 192|256|2|
L2||256 x 192|-|-|256|-|
L3,0|Text mode|320 x 256|8 x 8|40 x 32|256|2
L3,1|Text mode|640 x 256|8 x 8|80 x 32|256|2
L3,2|Graphics mode|320 x 256|8 x 8|40 x 32|256|16
L3,3|Graphics mode|640 x 256|8 x 8|80 x 32|256|16


In addition to these layers, there are also the sprites which don't work off a grid.


## Layer 0
- `Layer 0` – Standard Spectrum (ULA) mode, 256w x 192h pixels, 8 colours
total (2 in tensities), 32 x 24 cells, each capable of displaying 2 colours

## Layer 1
- `Layer 1,0` – LoRes (Enhanced ULA) mode, 128w x 96h pixels, 256 colours
total, 1 colour per pixel
- `Layer 1,1` – Standard Res (Enhanced ULA) mode, 256w x 192h pixels,
256 colours total, 32 x 24 cells, each capable of displaying 2 colours
- `Layer 1,2` – Timex HiRes (Enhanced ULA) mode, 512w x 192h pixels,
256 colours total, only 2 colours on screen
- `Layer 1,3` – Timex HiColour (Enhanced ULA) mode, 256w x 192h pixels,
256 colours total, 32 x 192 cells, each capable of displaying 2 colours

## Layer 2
- `Layer 2` – 256w x 192h pixels, 256 colours total, one colour per pixel

## Layer 3
- `Layer 3,0` – Text mode, 320w x 256h pixels, 256 colours total,
40 x 32 cells each capable of displaying 2 colours
- `Layer 3,1` – Text mode, 640w x 256h pixels, 256 colours total,
80 x 32 cells, each capable of displaying 2 colours
- `Layer 3,2` – Graphics mode, 320w x 256h pixels, 256 colours total,
40 x 32 cells each capable of displaying 16 colours
- `Layer 3,3` – Graphics mode, 640w x 256h pixels, 256 colours total,
80 x 32 cells, each capable of displaying 16 colours

This is all on page 116 of the first edition manual.
