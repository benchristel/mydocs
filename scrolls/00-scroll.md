# The Zero<sup>th</sup> Scroll: Boot Sector

> Please note: This book is a work of fiction, and its representation of the history of computer science is somewhat facetious. The reader is encouraged to read the linked articles if a less fanciful portrayal of persons and events is desired. Dates are cited as B.U.E. (Before Unix Epoch) or G.U.E. (Great Unix Epoch). Any similarity to dates appearing in any games published by Infocom or Activision is purely coincidental. To convert from G.U.E. to Gregorian calendar years, add 1970.
>
> With that out of the way...

## Disclaimer and Terms of Use

> By reading these scrolls, you consent to have your brainstate altered. If you do not agree to these terms, please uninstall your web browser and incinerate your computer immediately.
>
> I, the author of this work, claim no affiliation with anything or anyone, and the opinions presented here are either my own, someone else's, or no one's. You, the reader, are free to do whatever you like with the contents of this work, as long as I don't find out about it.

## How to Read These Scrolls

First, a bit of background: the programming language used in this book is called JavaScript. It's used in pretty much every website in the universe. Every modern web browser (Firefox, Chrome, Internet Explorer, Safari, Opera) can understand some version of this language, which means websites work more or less the same on every computer and mobile device. Because it's built into every web browser, JavaScript is one of the easiest languages to get started in.

If you're using Chrome, you can start programming in JavaScript right now by selecting the **`View > Developer > JavaScript Console`** menu, or by pressing **`option + command + J`** (on a Mac) TODO: instructions for other browsers and OSes. This will bring up a control panel at the bottom of your screen that looks like this:

TODO: image

You can dismiss the panel with the `X` button in the top-right corner.

This panel, the JavaScript Console, is our window into the mechanisms that underlie every website. From here, we can make the browser do anything—display text, videos, and images, play games and music, or resize itself and jump around the screen (that last one was popular back in the '20s and '30s G.U.E).

We can tell the browser to do something by typing a command into the console and pressing the **`enter`** key. For example, this command makes a message box pop up on the screen:

```javascript
alert("My name is Ozymandias, King of Kings; look on my works, ye mighty, and despair!");
```

You can put whatever text you want in place of the Ozymandias line; as long as it's wrapped in quotes, it should work just fine.

