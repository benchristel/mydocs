```javascript
alert("You win!");
```

```javascript
var points = 0;
points = points + 1;
```

```javascript
var points = 0;
var goal = 100;

var button = Thrax.createButton();
button.text("click for points!");

var addOnePoint = function() {
	points = points + 1;
	pointsDisplay.text(points);
	if (points === goal) {
		alert("You win!");
		button.visible(false);
		playAgainButton.visible(true);
	}
}

button.whenClicked(addOnePoint);
button.whenMouseEnters
button.whenMouseLeaves
button.whenMouseButtonPressed
button.whenMouseButtonReleased
button.whenMouseMoves


// global handlers:
Thrax.whenMouseButtonPressed
Thrax.whenMouseButtonReleased
Thrax.whenMouseMoves
Thrax.whenKeyPressed
Thrax.whenKeyReleased

var pointsDisplay = Thrax.createTextDisplay();
pointsDisplay.text(0);
```

Scope in JS

- functions can have their own variables, that aren't visible to the rest of the code

- `var x = 1` means "within this function, and functions nested inside it, `x` means `1`."
- you only need to use `var` once for each variable within a function.
- `x = 2` means "the `x` means `2` now, whenever a"