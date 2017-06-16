# How to create a custom Gmail design and template

Right, catchy title aside, I wanted to send an email recently from my Gmail account but I wanted to add a footer that essentially required a table for layout. Except Gmail (and Google Inbox AFAIK) rich editbox doesn't let you do more complicated styling aside from bold, italic and font selection.

When I first started searching, I found a number of Chrome plugins that would let me insert some nice templates, but it required giving other sites full access to my inbox… :hears-crickets: so no, that wasn't going to happen. So here's how I got around it.

<!--more-->

![email signature](/images/email-signature.gif)

This bottom section of the screenshot above is what I wanted to achieve. The only way to lay out (today) in email is to use tables. The solution is to copy and paste the rendered HTML into Gmail (and potentially into the default signature).

Since Gmail supports some degree of "rich" pastes, it's a shortcut method to getting more complicated HTML into your emails. By _rich_ I mean anything that has formatting beyond plain text.

So I head over to [jsbin.com](https://jsbin.com) because I can edit my HTML and then copy the rendered output (since that's what I need). Equally you can use another service or just a vanilla `.html` file and open it in a browser and copy the output there.

It's important to include specific `style` attributes on the elements you're copying to keep the style you want when you paste into Gmail. You can see how much style is applied just to keep the line height, colour and underline style in my own signature:

<a class="jsbin-embed" href="https://jsbin.com/dedoxak/embed?html,output">JS Bin on jsbin.com</a><script src="https://static.jsbin.com/js/embed.min.js?4.0.4"></script>

Note that in my particular case, I wanted to include an `hr` dividing element in the signature. For me to be able to copy that to the clipboard, I needed some text just before it, which is why you'll see that I included "Test." right before.

Then copy the output window, and paste directly into your Gmail new email. I've gone further and added it to my email signature via Gmail's settings. **Note** for reasons beyond my knowledge, setting a signature in Gmail does not carry across to Inbox. For Inbox, you need to configure settings and paste as you do in Gmail, but you won't see the signature in the compose box.
