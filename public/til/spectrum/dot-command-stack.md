# dot command stack

When writing dot commands for the Spectrum Next the bytes are loaded into memory position `$2000`. Normally "free" memory is `$8000` onwards to `$FFFF` (or so I understood), but the stack is sitting at `$FF41` (or so) so paging in a bank to the last MMU position will nuke the stack.

Straightforward work around for this is to swap in your own stack:

```z80
          ;; as early as possible
          ld (oldStack), sp
          ld sp, stackTop
          jr Start                ; jump to the start of the program

oldStack  DW 0
stack     DS $80, $AA ; $AA is just debug filler of stack area
stackTop  DW $AAAA

cleanUp:
          ;; then on exit restore the oldStack to SP
          ld sp, (oldStack)
          ei
          ret
```

This way I can now safely use the page of memory at `$E000`.
