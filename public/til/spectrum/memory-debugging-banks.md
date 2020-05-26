# Memory debugging banks

If I want to explore data stored in a `BANK` that has been written to in NextBASIC, the banks are stored in 16K blocks (whereas hardware banks are stored in 8K blocks).

So if you do `BANK 14 POKE 0, 255` it's not bank 0x0E in memory, it's 0x1C.
