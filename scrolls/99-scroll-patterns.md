# Unnumbered: The Scroll of Patterns

## Helper Functions

Purpose: Automate common tasks by creating functions with descriptive names. This makes code easier to read and easier to change.
Naming convention: See the section on naming functions (TODO)

### Instead of this:

```javascript
function attack(creature, damage) {
    if (creature.health !== undefined && damage !== undefined) {
        creature.health = creature.health - damage;
    }
};
```

### You can do this:

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
Naming convention: `create*`, `spawn*`, `build*`

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