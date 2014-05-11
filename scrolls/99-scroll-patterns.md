# Unnumbered: The Scroll of Patterns

## Helper Functions

<dl>
<dt>
    Purpose:
</dt><dd>
        Automate common tasks by creating functions with descriptive names. This makes code easier to read and easier to change.
</dd><dt>
    Naming convention:
</dt><dd>
        See the section on naming functions (TODO)
</dd>
</dl>

### Example

Let's say you have an array of numbers that you want to add up. Maybe each number is the player's score on a particular level, and you want to compute their total score. One way is to do this:

```javascript
var levelScores = [100, 325, 60, 1430, 975];
var totalScore = 0;
var addToTotalScore = function(number) {
    totalScore = totalScore + number;
}

levelScores.forEach(addToTotalScore);
console.log(totalScore);
```

When this chunk of code finishes executing, `totalScore` will be the sum of the `levelScores`. Try it!

Once you've written the code above, you apply the same pattern elsewhere. For instance:

```javascript
var itemPrices = [5, 2, -4, 1];
var billTotal = 0;
var addToBillTotal = function(number) {
    billTotal = billTotal + number;
}

itemPrices.forEach(addToBillTotal);
console.log(billTotal);
```

However, that quickly gets tedious. The only differences between these code snippets are the variable names and the values being added. It would be great if we could just write

```javascript
var itemPrices = [12.35, 19.99, 4.25, 1.50];
var billTotal = sumOf(itemPrices);
```

And we can, if we define the `sumOf` function first!

```javascript
var sumOf = function(array)  {
    var total = 0;
    var addToTotal = function(number) {
        total = total + number;
    };
    array.forEach(addToTotal);
    return total;
}

var itemPrices = [12.35, 19.99, 4.25, 1.50];
var billTotal = sumOf(itemPrices);
console.log(billTotal);
```

## Spawner

<dl><dt>
    Purpose:
</dt><dd>
        creates an object with default properties and methods.
</dd><dt>
    Naming convention:
</dt><dd>
        `create*`, `spawn*`, `build*`
</dd></dl>

### Example

In a game, there are many cases where we want to create a lot of similar objects. For example, you might want to create several enemies on each level of the game. You could do something like this:

```javascript
var enemy1 = {
    name: "Goblin Captain",
    health: 10,
    attack: 4,
}

var enemy2 = {
    name: "Skeleton",
    health: 7,
    attack: 2,
}

var enemy3 = {
    name: "Skeleton",
    health: 7,
    attack: 2,
}

var enemies = [enemy1, enemy2, enemy3];
```

However, that quickly gets tedious as you add more enemies and more properties on each one. If you ever want to go back and change the stats for a particular enemy type, you have to change a lot of code, and it's easy to make mistakes.

We can use spawner functions to avoid creating similar objects in many places. A spawner is just a function that creates a new object, gives it some properties, and returns it.

```javascript
var spawnGoblinCaptain = function() {
    var enemy = {};
    enemy.name = "Goblin Captain";
    enemy.health = 10;
    enemy.attack = 4;
    return enemy;
}

var spawnSkeleton = function() {
    var enemy = {}
    enemy.name = "Skeleton";
    enemy.health = 7;
    enemy.attack = 2;
    return enemy;
}

var enemies = [spawnGoblinCaptain(), spawnSkeleton(), spawnSkeleton()];
```

## Outfitter:

<dl><dt>
    Other Names:
</dt><dd>
        Installer
</dd><dt>
    Purpose:
</dt><dd>
        adds methods and properties to an object
</dd><dt>
    Naming convention:
</dt><dd>
        `add*`, `install*`
</dd><dt>
    Examples:
</dt><dd>
        TODO (link to code snippets in these scrolls where outfitters are used)
</dd></dl>

### Implementation

An Outfitter is just a function. You give it an object, and it makes changes to that object (usually by adding some properties).

An Outfitter doesn't have to return anything, since it works directly on the object you give it instead of creating a copy or a new object. However, it's often convenient to have Outfitters return a value. They can return the object you passed in, or they can return themselves.

TODO: the inventory example is bad because it can be solved using composition. Attribute installers are a better use case, but they're more complicated. Is there any use case for plain outfitters that can't be solved better by composition or outfitter spawners?

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