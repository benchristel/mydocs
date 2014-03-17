# Collected Scrolls of the Apprentice

Programming Lessons for Aspiring Wizards

## The Beginning

> When I told Tillie that six steps seemed a lot to have to do before you begin, she said, "You must think of those six steps not as preparation for the beginning but as the beginning itself."
> — <cite>E.L. Konigsburg, _The View from Saturday_</cite>

If you're reading these words from a webpage, the beginning of your programming career is only a few keypresses away. Open a new tab or window in your web browser, and press `option + command + J`. This pops open the Javascript console. The console is our window into the finely-tuned, softly-ticking mechanism of code that underlies every webpage. Let's throw some wrenches into the works.

Type the following incantation into the console. Be sure to type it *exactly*. Computers are picky about the commands they obey.

```javascript
document.write("My name is Ozymandias, King of Kings: Look on my works, ye mighty, and despair!");
```

Press `return`, and those fell words will obliterate everything else on the page. Don't worry, you didn't just blow up your homepage. You can refresh the page to get it back.

Let's break this command down so we can understand what each piece of it does.

First, we've got `document.write`. This is the name of a *function*. Functions are pre-baked commands that you can invoke, nicely leather-bound spells thoughtfully made available to you by previous generations of wizards. In a bit, I'll show you how to craft your own functions -- then we'll really be cooking with oil!

To activate a function, we follow it with a pair of parentheses, `()`, and into their vise-like grip we can place whatever we want the function to affect. In this case, we inserted a string of text, but we could also do a number:

```javascript
document.write(184927);
```

Finally, we have a semicolon, `;`, which finalizes our words of command with a (mostly ornamental) seal. Although the semicolon isn't strictly required if you enter each command as a separate line, there are cases where two commands can run together and cause strange results if you don't seal each one with a semicolon. Because of this, semicolon use is a good habit to get into.

There are two reasons to use functions. You can use them for their effects, as you've already done with `document.write`. But functions can also give you back a useful value, like a number or a text string, when you call them. `docu

When you use `document.write`, you'll notice that the console echoes `undefined` back to you. 

## The Power of Names

To name a thing is to gain control over it. We can name things in Javascript using the equals sign, `=`.

```javascript
favoriteColor = "blue";
```

The equals sign takes whatever is on the right of it and labels it with the name on the left. Names, or *identifiers*, may only contain uppercase and lowercase letters, numbers, and underscores (`_`), and they can't begin with a number.

After running the code above in the console, you can type `favoriteColor;`, and the console will reply with `"blue"`. You can also use `favoriteColor` wherever you can use a text string or a number:

```javascript
document.write(favoriteColor);
```

Programmers call this type of name a *variable*, because the value it refers to can change.

```javascript
favoriteColor = "blue";
document.write(favoriteColor);
favoriteColor = "no, green!";
document.write(favoriteColor);
favoriteColor = "aaargghh!";
document.write(favoriteColor);
```

One thing can have many names.

```javascript
Gandalf = "<:)~";
Mithrandir = Gandalf;
document.write(Mithrandir)
```

Note that the above is significantly different from:

```javascript
Gandalf = "<:)~";
Mithrandir =  "<:)~";
```

In the first example, both variables name the exact same string. But in the second example, two separate strings get created. If we modify one of them, the other doesn't change.

```javascript
Gandalf = "<:)~";
Mithrandir =  "<:)~";
Gandalf += "~"; // this adds a "~" to the end of the Gandalf string
document.write(Gandalf);
document.write(Mithrandir);
```

After bestowing a name on something, we can transfer it to a different thing:

```javascript
kingOfGondor = "Aragorn"
kingOfGondor = "Eldarion"
```

One name can't refer to two things at once, so transferring a name to a new object removes it from the old object. If an object has no names, it is lost forever.

## Boring Game

```javascript
alert("you win!");
```

## Get to 10 Points Game

```javascript
score = 0;
goal = 10;
while (score < goal) {
	alert("You have " + score + " out of " + goal + " points.");
	score = score + 1;
}
alert("you win!");
```

## Guess the Password

```javascript
guess = null;
password = "zombieHairdo93";
while (guess != password) {
	guess = prompt("Enter the password:");
}
alert("access granted");
```

## Guessing Game

```javascript
secretNumber = Math.ceil(Math.random() * 100);
message = "Guess a number between 1 and 100.";
guess = null;

while (guess != secretNumber) {
    guess = Number(prompt(message));
    if (guess < secretNumber) {
        message = "" + guess + " is too low!";
    } else if (guess > secretNumber) {
        message = "" + guess + " is too high!";
    }
}
alert("you win!");
```

## A (buggy) AI for the guessing game

```javascript
lowestPossible = 1;
highestPossible = 100;
won = false;

while (!won) {
	guess = lowestPossible + highestPossible / 2
	response = prompt("is " + guess + " high, low, or correct?");
	if (response == "high") {
		highestPossible = guess - 1;
	} else if (response == "low") {
		lowestPossible = guess + 1;
	} else {
	    alert("I win!");
	    won = true;
	}
	if (lowestPossible > highestPossible) {
		alert("You're cheating!");
	}
}
```

## Real AI for the guessing game

```javascript
lowestPossible = 1;
highestPossible = 100;
gameOver = false;
guesses = 0;

while (!gameOver) {
	guess = Math.floor((lowestPossible + highestPossible) / 2);
	response = prompt("is " + guess + " high, low, or correct?");
	guesses += 1;
	if (response == "high") {
		highestPossible = guess - 1;
	} else if (response == "low") {
		lowestPossible = guess + 1;
	} else {
	    alert("I won in " + guesses + " turns!");
	    gameOver = true;
	}
	if (lowestPossible > highestPossible) {
		alert("You're cheating!");
		gameOver = true;
	}
}
```

## Basic Mastermind

```javascript
secretCode = "491";
gameOver = false;
message = "Guess the secret code.";

while(!gameOver) {
	guess = prompt(message);

	numberCorrect = 0;

	for (i = 0; i < secretCode.length; i = i + 1) {
		if (guess[i] == secretCode[i]) {
			numberCorrect += 1;
		}
	}

	message = "You guessed " + guess + ". " + numberCorrect + " digits are right.";

	if (numberCorrect == secretCode.length) {
		gameOver = true;
		alert("You win!");
	}
}
```


Why do we care, though? After all, it takes more keystrokes to type `document.write(favoriteColor);` than it does to type `document.write("blue");`. But names are important. Programming, and using computers in general, would be horribly difficult if we didn't have them. Here are some reasons why:

- Names make it much easier to change your programs when they don't work or you need them to do something slightly different. If you're creating a game, you might define a variable `pointsToWin = 1000`. In several 
- Names make it possible to use values that we didn't create ourselves. Suppose we want to ask the user of a program what their favorite color is, and write that to the screen:
  ```javascript
  favoriteColor = prompt("What is your favorite color?");
  document.write(favoriteColor);
  ```
  Here, there's no way to replace `favoriteColor` with a constant value, because we don't know what the user is going to input.


Functions are a bit like the verbs of programming in that they specify actions you want the computer to take. You can also think of functions as magical ducks, and I prefer to think of them this way. In many respects, they are more like ducks than verbs. You can't hold a verb, or give it to your friends, but ducks and functions let you do both of these things. Functions and ducks both take input on one end and produce output on the other end. The list of similarities goes on, 

## Expressions

```javascript
1 + 2;
// => 3
```

## Variables

```javascript
cupsOfCoffeeConsumedToday = 1;
cupsOfCoffeeConsumedToday;
// => 1
```

