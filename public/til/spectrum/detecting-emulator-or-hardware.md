# Detecting (Next) Emulator or Hardware

Sometimes useful, I've certainly run into bugs with emulation vs. real machines.

```
DEFPROC isReal()
  ; dw $01DD : nop : nop : ret
  POKE %$4000, %$dd, 1, 0, 0, %$c9
  v= USR 16384 :; can't use integer values here - important
  IF v=16384 THEN ENDPROC= 0 :; CSpect emulator
  v= % REG 0
  IF v = 8 THEN ENDPROC= 0 :; ZESarux emulator
  IF v = 10 THEN ENDPROC= 1:; real h/w
ENDPROC
```

This `POKE` is based on a few ideas. First that when we land in machine code, that `BC` is the address of entry. So when the code returns in Cspect-land, the value of `BC` will be the same as entry, which is the address of the routine, hence `IF v = 16384`.

However, `BC` being set at the address of entry is, apparently, not a specified feature - just a happy accident. This does mean that it's not actually in place when the same call is made using integer values. i.e. `% USR $4000` returns garbage (or specifically a _very_ low value) into `BC`.

In Cspect, the `$DD01` is a bespoke `break` opcode. On the hardware, I'm not 100% certain, but the `$DD` is skipped (a no op) and the code then translates to `LD BC, 0`.

/via [Johnny Gilbbitts](https://www.facebook.com/groups/ZXNextBasic/permalink/1061686361024369/)
