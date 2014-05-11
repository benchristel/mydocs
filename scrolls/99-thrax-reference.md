# Thrax

## Overview

Thrax is a JavaScript library for creating user interfaces. A library is a piece of code that makes a specific task easier and can be used in many different projects.

## Tutorial: Creating a button and text display with Thrax

We can create a button by calling the `Thrax.createButton` function. The code below creates a button and names it `button1`. This name is arbitrary; we could have just as easily called it `b` or `foo`. However, it's conventional for the names of UI elements to indicate the type of object in some way.

```javascript
var button1 = Thrax.createButton();
```

We can also create a text display in a very similar way:

```javascript
var textDisplay1 = Thrax.createTextDisplay();
```

Currently, this text display is blank. We can add text to it by calling its `text` method.

```javascript
textDisplay1.text("Click the button");
```

When we pass a value to `text`, it sets the text of the UI element. If we call `text` without a value, it returns the current text without changing anything.

```javascript
textDisplay1.text(); // returns "Click the button"
```

Let's set the button text as well.

```javascript
button1.text("Click me!");
```

You can try clicking the button, but it won't do anything yet. Let's wire it up so that clicking it changes the text of the display.

First, we need a function that does the text-display-changing part. We have to put this code in a function, because otherwise it would run as soon as the webpage loads, which would change the text before the user had a chance to do anything. Putting code in a function tells JavaScript to remember it, but not run it until we tell it to.

```javascript
var changeText = function() {
	textDisplay1.text("It works!");
};
```

You can try calling this function yourself from the console: `changeText();`. If that works, we just need to tell the button to call `changeText()` when it gets clicked. Here's how we do that:

```javascript
button1.whenClicked(changeText);
```

Putting it all together:

```javascript
var button1 = Thrax.createButton();
var textDisplay1 = Thrax.createTextDisplay();
textDisplay1.text("Click the button");
button1.text("Click me!");

var changeText = function() {
	textDisplay1.text("It works!");
};

button1.whenClicked(changeText);
```

## UI Element Reference

### `createButton`

### `createTextDisplay`

### `createDropdown`

### `createTextInput`

### `create

# Notes on the Thrax lifecycle

# TODO: Figure out exactly how the client is going to interact with Thrax. The below is only useful if the user is inputting code through a UI, which is probably needlessly annoying and out of scope for this project

The code input by the student is eval'd like this:


```
(function(undefined) {
  with({}) {
    eval(userCode);
  }
})();
```

The start and end of "program running" state are triggered by Thrax.startProgram() and Thrax.stopProgram(). These are triggered by the user pressing the "start" and "stop" buttons on the UI built by Thrax.

DOM elements and timer events created through Thrax while the program is running will be cleaned up when the program ends.

Thrax.createTimer(5, function() { alert('You win!'); })

Thrax.createClock(1/30, updateGame);

countdown = 10;

var countDownByOne = function() {
  console.log(countdown + "!");
  countdown = countdown - 1;
};

var c = Thrax.createClock(1, countDownByOne);
c.stop();

Thrax.stopAllClocks();