# Unnumbered: The Parts of JavaScript I Didn't Cover

## For Loops

For loops aren't a bad part _per se_, but for loops that just iterate through an array in order are made obsolete by `Array#forEach`. Since probably 99.9% of for loops just do this basic iteration, they aren't even mentioned in this book.

While it's true that `continue` and `break` don't work with `forEach`, `continue` can be trivially imitated with an `if` statement, and `break` is never needed. Really. At best, it's an optimization, and once you have the `Array#some` and `Array#any` methods, there's no reason to use `break`.

## For ... In Loops

The `for ... in` syntax has a pitfall: it iterates not only over an object's own properties, but over properties inherited from the object's prototype. `object.keys.forEach` is usually a better choice.

## TODO: Decide if exception handling will be covered

## `switch`

## Labels

You can't use labels if you don't have `break` or `continue` statements.

## `with`

The `with` statement obscures the behavior of code, without contributing any expressive power. It is banned from this book.

## Semicolon Insertion

All the examples in this book have semicolons in the proper places (or at least, they should...). However, they are also written with a whitespace style such that they are still correct if the semicolons are omitted.

## `this`

It's possible to write good, object-oriented JavaScript without ever using `this`, as long as you use spawner functions.

For example, this:

```javascript
obj = 
    { name: 'Bob'
    , greet: function () { console.log("Hello, "+this.name); }
    };
```

...becomes this:

```javascript
obj = (function() {
	var o = {};
	o.name = 'Bob';
	o.greet = function() { console.log("Hello, "+o.name); };
	return self;
})();
```

## `new`

The `new` keyword introduces a layer of weirdness to JavaScript that is profoundly unnecessary. Also, using `new` would necessitate the use of `this`, which is also not strictly needed to write good JavaScript, and a common source of bugs in bad JavaScript.

## The Ternary Operator

There are certainly cases where the ternary operator is more convenient than `if ... else` syntax, but it's another language feature that doesn't add expressiveness, so I don't use it in this book.