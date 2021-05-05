# Backticks in backticks

To put a backtick in a markdown code block, i.e. _within_ backticks, you just add more backticks around your code block.

Really this is more useful in the inline code blocks, for instance I can do ``console.log(`you're on the ${branchName} branch`)``.

So inline instead of wrapping with a single `` ` `` backtick, you wrap with _two_ backticks, like ``` ``console.log(`this ${demo}`)`` ``` (and to get two backticks in the example shown, I needed to wrap with _three_ backticks).

One final tip, to print a single backtick, it needs two backticks around it, but also a space around the single backtick too: ``` `` ` `` ```.

Basically, it's backtick-inception.
