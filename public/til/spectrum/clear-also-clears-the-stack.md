# Clear also clears the stack

It should be obvious from the title, but I thought that the `CLEAR` routine cleared out memory - obviously not fully understanding it.

This seemingly benign routine kept complaining that there was `NO DEFPROC` - i.e. an `ENDPROC` was called but currently the state wasn't in a routine.

Here's a sample of the code:

```nextbasic
10 PROC init()
20 REPEAT : PRINT AT 0,0;"o": REPEAT UNTIL 0 :; never makes it here
30 DEFPROC init()
40   CLEAR %65267
50   %a=%65268
60   POKE %a,1,0,3,33,0,61,17,0,250,237,176,201
70   %a=% USR a
80   PRINT %a
90 ENDPROC :; but blows up here
```

It was because I had a `CLEAR` in my procedure. As well as setting the ramtop location, this clears all variables and the return stack (the return stack is what's causing the ENDPROC to fail, because the record of where it came from has been erased).

Solution: put `CLEAR` at the start of the program instead.
