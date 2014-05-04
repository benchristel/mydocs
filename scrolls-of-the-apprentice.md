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

## Magic: Its Destruction and Creation

When people use the word <span style="font-variant:small-caps">magic</span>, they are usually talking about a mechanism whose behavior they can describe but whose inner workings they cannot or do not care to explain. This definition applies equally well to stage magic (in which magicians seem to perform impossible feats by using techniques unknown to their audience), to fictional wizardry (which produces consistent effects, though its underlying mechanism is not usually explained), and to modern technology (which most people use but no one fully understands).

The two tasks of programming are the destruction and creation of magic.

To become a programmer, you must first break some of the illusions that other programmers have set up for you—illusions that you have been relying on for as long as you have been using computers. You will find out, for example, how computers communicate over the internet, and how all data from text to images to video are really just very long sequences of numbers. If computers seemed magical to you before, this will destroy the magic.

And then you will stitch the illusion back up, and restore it to life, because a good programmer, like a good surgeon, understands things without breaking them. The reason for this is that programmers can only be effective if, in their day-to-day work, they treat most of a computer's mechanisms as magic. At its heart, the computer you're using now is just an exquisite crystal of silicon over which a billion tiny voltages dance and fluctuate a billion times a second. You would have to be mad to program something like a web browser by manipulating these voltages directly. If you were not certifiably insane at the beginning of such a project, you would be by the end of it. But because of the magic that other programmers before us have woven, we can get away with imagining that a computer is something else—a universe where we can pluck numbers out of the ether and give them names, where text is text and images are images. And before this book is over, you too will be creating systems that can be used by people who don't understand how they work. 

## Aletheiomancy

You can apply your reasoning faculties to write a program, predict what it will do, and then run it and see it carry out your intent. I can think of no more convincing argument that truth is knowable, and that reason is valuable, than this.

### High Magic, Middle Magic, Deep Magic

## Names and Things

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

The above is subtly but significantly different from:

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

## The Virtues of Code

1. Code should be simple. It should be easy to see what a piece of code does, and why, without running it.
2. Code should be correct.
3. Code should be easy to change. It should be easy to add new features
4. Code should be predictable. If you run a piece of code that claims to do something, it should do that thing and nothing else. It should not give you strange errors unrelated to its function, or return a value other than what it claims to return.
5. Code should be efficient. 
6. Code should be secure. It should be _very difficult_ to use it for malicious purposes. What exactly _very difficult_ means is explained below.

## The Virtues of Programmers

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

## Advanced Mastermind

```javascript
numberCorrect = function(guess, secretCode) {
    correct = 0;
    for (i = 0; i < secretCode.length; i = i + 1) {
        if (guess[i] == secretCode[i]) {
            correct += 1;
        }
    }
    return correct;
}

numberCorrectInWrongPlace = function(guess, secretCode) {
    correct = 0;
    for (i = 0; i < secretCode.length; i = i + 1) {
        for (k = 0; k < secretCode.length; k = k + 1) {
            if (i !== k && guess[i] === secretCode[k]) {
                correct += 1;
            }
        }
    }
    return correct;
}
```

### Rocket Simulator


```javascript

rocket = {
	fuel: 10000.0,
	mass: 7500.0,
	thrust: 10000.0,
	fuelBurnRate: 2.0,
	dragCoefficient: 0.85,
    altitude: 0.0,
    velocity: 0.0,

    getTotalMass: function () {
        return this.mass + this.fuel;
    },

    useFuel: function (amount) {
        this.fuel = this.fuel - amount;
        if (this.isOutOfFuel()) {
        	this.fuel = 0;
        }
    },

    isOutOfFuel: function () {
    	return this.fuel <= 0.0;
    },

    fireEngines: function () {
        if (this.isOutOfFuel()) {
        	return;
        }

    	this.useFuel(fuelBurnRate);
    	this.applyForce(this.thrust);
    },

    accelerate: function (deltaV) {
        this.velocity = this.velocity + deltaV;
    },

    applyForce: function (force) {
    	this.accelerate(force / this.getTotalMass());
    },

    timeStep: function () {
    	this.fireEngines();

    	// force of gravity
        applyForce(-9.8 * this.getTotalMass());

        // force of drag
        applyForce(-this.velocity * this.dragCoefficient);

        // move the rocket
        this.altitude = this.altitude + this.velocity;

        // don't let the rocket go below the ground
        if (this.altitude < 0) {
        	this.altitude = 0;
        }
    }
}

while (!rocket.isOutOfFuel()) {
    rocket.timeStep();
    console.log("Upward velocity: " + rocket.velocity + " m/s");
    console.log("Altitude: " + rocket.altitude + " meters");
    console.log("Fuel remaining: " + rocket.fuel + " kg");
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

## Formulæ

### Do math

#### Compute and name a value

```javascript
x = 0.1 * (1 + 2) / 3.5;
y = 1 - 2;
z = x + y;
```

#### Get the remainder of integer division

```javascript
remainder = 8 % 3 // % is called the modulo operator
```

#### Change a named value

```javascript
x = 0;
x = x + 1; // after this line, the value of x is 1
x += 1;    // x += y is shorthand for x = x + y
x++;       // x++ is shorthand for x = x + 1
x--;       // similarly, x-- is shorthand for x = x - 1
```

#### Use mathematical functions and constants

```javascript
Math.sqrt(2);
Math.sin(Math.PI / 3);
Math.pow(Math.E, 3);   // compute e^3
Math.exp(3);           // shorthand for the above
Math.round(2.519);     // round a number to the nearest integer
Math.ceil(2.1);        // round up
Math.floor(2.7);       // round down
Math.abs(-1);          // get the absolute value of a number
```

### Manipulate text

#### Create and name a string of text

```javascript
catchphrase = "Most excellent!";
// you can use single or double quotes
quotation = '"The HORSE is a noble animal" --Randall Munroe';
```

#### Concatenate multiple strings into one

```javascript
quotation = '"The HORSE is a noble animal"';
author = "Randall Munroe";
cited_quotation = quotation + " --" + author;
```

#### Convert a number to a string

```javascript
String(8);
"" + 8; // This relies on the fact that numbers and other objects are converted
        // automatically to strings if you concatenate them with a string.
```

#### Check if one string contains another

```javascript
haystack = "Most excellent!";
needle = "cell";
if (haystack.indexOf(needle) >= 0) {
    // code here will only run if "Most excellent!" contains "cell"
}
// `indexOf` returns the number of characters in `haystack` before the first 
// occurrence of `needle`. If `needle` isn't found, it returns -1.
```

### Create user interfaces

#### Pop up an alert box on the user's screen

```javascript
alert("All your base are belong to us");
```

### Keep a list of items

```javascript
emptyList = [];
colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
```

#### Write a list with calligraphic comma-first style

```javascript
colors = 
    [ 'red'
    , 'orange'
    , 'yellow'
    , 'green'
    , 'blue'
    , 'indigo'
    , 'violet'
    ];
```

#### Do something to every item in an Array (list)

```javascript
colors = ['red', 'blue', 'green'];

for (var i = 0; i < colors.length; i++) {
    document.write(colors[i]);
}
```

### Bundle related data into an object

```javascript
anObjectWithNoProperties = {};

player = {name: 'Hisiel', hitPoints: 10, inventory: 'bag of holding'};

monster = {
    name: 'dragon',
    hitPoints: 100,
    inventory: 'shiny treasures'
};

monster.name; // => 'dragon'
player.hitPoints; // => 10
```

### Write an object with calligraphic comma-first style

```javascript
monster =
    { name:      'dragon'
    , hitPoints: 100
    , attack:    10
    , defense:   25
    , inventory: 'shiny treasures'
    }
```

### Name frequently-used commands and operations

#### Name a calculation

```javascript
areaOfCircle = function(radius) {
    return Math.PI * radius * radius;
};
```

#### Name a command

```javascript

```

#### Create an object spawner

```javascript
spawnMonster = function() {
    var monster =
        { name: 'default monster'
        , attack:    1
        , defense:   1
        , hitPoints: 10
        , level:     1
        , specialAbilities: []
        };
    return monster;
}
```

#### Create specialized object spawners

```javascript
spawnZombie = function() {
    var monster = spawnMonster();
    monster.name = 'Zombie';
    monster.specialAbilities = ['eatBrains'];
    monster.attack = 3;
    return monster;
}

spawnSuperZombie = function() {
    var zombie = spawnZombie();
    zombie.level = 9999;
    return zombie;
}
```

#### Give objects their own behaviors

```javascript
rearrangeThingsOnDesk = function() {
    alert(this.name + " rearranges things on the desk");
}

tapOnComputerKeyboard = function() {
    alert(this.name + " taps on the computer keyboard");
}

Ben = 
    { name:   'Ben'
    , fidget: tapOnComputerKeyboard
    }

Alex =
    { name:   'Alex'
    , fidget: rearrangeThingsOnDesk
    }

Ben.fidget();
Alex.fidget();
```

# Patterns Used in Thrax

## Helper Functions

Purpose: Avoid copy-pasting code by creating functions to automate common tasks.

## Instead of this:

```javascript
function attack(creature, damage) {
    if (creature.health !== undefined && damage !== undefined) {
        creature.health = creature.health - damage;
    }
};
```

## You can do this:

```javascript
var defined = function(value) {
    return value !== undefined;
}

var attack = function(creature, damage) {
    if (defined(creature.health) && defined(damage)) {
        creature.health = creature.health - damage;
    }
};
```

## Spawner

Purpose: creates an object with default properties and methods.
Naming convention: `spawn*`, `create*`, `make*`, `build*`

### Works like this:

```javascript
var createPotion = function() {
    var potion = {};

    potion.usedUp = false;
    potion.useOn = function(target) {
        if (potion.usedUp === false) {
            potion.affect(target);
            potion.usedUp = true;
        }
    };
    potion.affect = function(target) {};

    return potion;
}

var createHealingPotion = function() {
    var potion = createPotion();

    potion.power = 3;

    var originalUseOn = potion.useOn;
    potion.useOn = function(target) {
        if (potion.usedUp === false) {
            target.health += hp.power;
            potion.usedUp = true;
        }
    }

    return potion;
};
```

### So you can do this:

```javascript
var me = {health: 10};
var healingPotion = createHealingPotion();
healingPotion.useOn(me);
me.health; // outputs 13
```

### Instead of this:

// TODO

## Outfitter:

Other Names: Installer
Purpose: adds methods and properties to an object
Naming convention: `add*`, `install*`
Examples: TODO (link to code snippets in these scrolls where outfitters are used)

### Implementation

An Outfitter is just a function. You give it an object, and it makes changes to that object (usually by adding some properties).

An Outfitter doesn't have to return anything, since it works directly on the object you give it instead of creating a copy or a new object. However, it's often convenient to have Outfitters return a value. They can return the object you passed in, or they can return themselves.

```javascript
var addInventory = function(target, startingItems) {
    target.inventory = startingItems || [];
    target.addToInventory = function(item) {
        target.inventory.push(item)
    };
    target.removeFromInventory = function(item) {
        // i'm too lazy to look up how to do this
    };

    return target;
}
```

### Usage

Outfitters are most useful within your spawner functions.

```javascript
var createPlayer = function() {
    var p = { name: 'Teimengdh Aldurati' };
    addInventory(p);
    return p;
}

var createLockedChest = function() {
    var c = {  }
}

var player1 = createPlayer()
player1.addToInventory('glue sword');
```

## OutfitterSpawner:

Other names: TargetedInstaller/Outfitter
Purpose: Create a family of outfitters that all act on the same object.
Naming convention: `(spawn|create)*(outfitter|installer)`

```javascript
// this is a normal outfitter
var addAttribute = function(target, attrName, default) {
    var attrValue = default;
    target[attrName] = function(newValue) {
        if (newValue !== undefined) attrValue = newValue;
        return attrValue;
    }
}

// this is the outfitter spawner
var createAttributeInstaller = function(target) {
    return function(attrName, default) {
        addAttribute(target, attrName, default);
    }
}
```

### So you can do this:

```javascript
var player = {}

// this doesn't save you that many keystrokes over the alternative below, but
// you could use a shorter name instead of addPlayerAttribute.
var addPlayerAttribute = createAttributeInstaller(player);
addPlayerAttribute('health',  20);
addPlayerAttribute('strength', 8);

player.health() // outputs 20
player.strength(10) // outputs 10 and sets player.strength to 10
```

### Instead of this:

```javascript
var player = {}

addAttribute(player, 'health', 20);
addAttribute(player, 'health', 20);

player.health() // outputs 20
player.strength(10) // outputs 10 and sets player.strength to 10
```

## OutfitterSpawnerSpawner

Useful when you have a bunch of Outfitters and you want to create an Outfitter Spawner for each of them.

```javascript
var createOutfitterSpawner = function(outfitter) {
    return function(target) {
        return function() {
            outfitter.apply(???)) // TODO lern 2 apply
        }
    };
};
```