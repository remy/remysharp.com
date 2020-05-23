# Screen clean up at stop

Not ideal, but this cleans up the screen on break:

```
ON ERROR LAYER CLEAR : SPRITE CLEAR : BORDER 7: ON ERROR : STOP
```

Not ideal because you need to restore this error handler if you add any specific error handling. 
