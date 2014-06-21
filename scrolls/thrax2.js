"use strict";

// Thrax2 is a reworking of Thrax that uses Object.defineProperty to update DOM
// elements when their corresponding Thrax objects change.

var Thrax2 = (function (undefined) {
  var $ = {}; // the thrax object
  var _ = {}; // container for private properties
  
  var eachProperty = function(obj, fn) {
    for(var k in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, k)) {
        fn(k, obj[k]);
      }
    }
  }
  
  var $public = function (properties) {
    eachProperty(properties, function(k, v) {
      $[k] = v;
    });
  }
  
  var $publicConst = function (properties) {
    eachProperty(properties, function(k, v) {
      Object.defineProperty($, k, {writable: false, value: v});
    });
  }
  
  var $private = function (properties) {
    eachProperty(properties, function(k, v) {
      _[k] = v;
    });
  }
  
  $public({framesPerSecond: 60});
  
  $private(
    { turtleX: 0
    , turtleY: 0
    , cap:
        function(s) { return s.charAt(0).toUpperCase()+s.slice(1, s.length); }
    }
  );
  
  $publicConst(
    { COLOR:
        { black: '#000'
        , white: '#fff'
        , gray:  '#808080'
        , lightGray: '#c0c0c0'
        , darkGray:  '#404040'
        , red:     '#f00'
        , green:   '#0f0'
        , blue:    '#00f'
        , yellow:  '#ff0'
        , cyan:    '#0ff'
        , magenta: '#f0f'
        }
    
    // Value definition
    , given:
        function(val) { return val !== undefined; }
    , missing:
        function(val) { return val === undefined; }
    , init:
        function(val, _default) {
          return $.given(val) ? val : _default;
        }
    
    // Object utility functions
    , forAllPropertiesOf:
        function(object, fn) {
          fn = $.init(fn, $.identity);
          var accumulated = [];
          for (var prop in object) {
            if (Object.prototype.hasOwnProperty.bind(object, prop)()) {
              accumulated.push(fn(prop, object[prop], object, fn));
            }
          }
          return accumulated;
        }
    
    // Barely-useful utility functions
    , noOp:
        function() {}
    , identity:
        function(x) { return x; }
    
    // Type-checking functions
    , isFunction:
        function(thing) { return typeof(thing) === 'function'; }
    , isArray:
        function(thing) { return thing instanceof Array; }
    , isObject:
        function(thing) { return thing instanceof Object; }
    , isNumber:
        function(thing) { return (+thing === thing) }
        
    // Conversion
    , toNumericString:
        function(thing) {
          if ($.missing(thing)) return '0';
          return String(Number(thing));
        }
        
    }
  );
  
  $.toCss = function(obj) {
    return $.forAllPropertiesOf(obj, function(k, v) {
      return k + ":" + v + ";";
    }).join("");
  };
  $.htmlEscape = function(s) { 
    return String(s)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
  };
  $.htmlUnescape = function(s) {
    return String(s)
            .replace(/&gt;/g,   '>')
            .replace(/&lt;/g,   '<')
            .replace(/&quot;/g, '"')
            .replace(/&amp;/g,  '&');
  };
  
  
  // randomness
  $.rollD = function(sides) {
    return Math.ceil(Math.random() * sides);
  };
  $.pickRandomly = function(array) {
    return array[$.rollD(array.length)-1];
  };
  $.drawRandomly = function(array) {
    var index = $.rollD(array.length) - 1;
    var drawn = array[index];
    array.splice(index, 1);
    return drawn;
  };
  
  // array utils
  $.forAll = function(array, fn) {
    fn = $.init(fn, $.identity);
    var transformed = new Array(array.length);
    for(var i = 0; i < array.length; i++) {
      transformed[i] = fn(array[i], i);
    }
    return transformed;
  };
  $.cut = function(array) {
    var middle = Math.floor(array.length / 2);
    return [array.slice(0,middle), array.slice(middle, array.length)];
  };
  $.drawLast = function(deck) {
    return deck.pop();
  };
  $.drawFirst = function(deck) {
    return deck.shift();
  };
  $.replace = function(array, newContents) {
    array.length = 0;
    Array.prototype.push.apply(array, newContents);
    return array;
  };
  // this simulates a riffle shuffle, which is not particularly random.
  // for more randomness, use $.scramble(array)
  $.shuffle = function(array, nTimes) {
    var deck = array, stacks, card;
    nTimes = $.init(nTimes, 1);
    $.repeat(nTimes, function() {
      stacks = $.cut(deck);
      deck = [];
      while (stacks[0].length && stacks[1].length) {
        card = $.drawFirst($.pickRandomly(stacks));
        deck.push(card);
      }
      deck = deck.concat(stacks[0], stacks[1]);
    });
    return $.replace(array, deck);
  };
  $.scramble = function(array) {
    var scrambled = []
    while(array.length) {
      scrambled.push($.drawRandomly(array));
    }
    return $.replace(array, scrambled);
  };
  $.copy = function(thing) {
    var copy;
    if ($.isArray(thing)) {
      copy = thing.slice(0);
    } else if ($.isObject(thing)) {
      copy = {}
      $.forAllPropertiesOf(thing, function(name, val) {
        copy[name] = val;
      });
    }
    return copy;
  };
  $.sum = function(array) {
    var sum = 0;
    $.forAll(array, function(x) {
      sum += x;
    });
    return sum;
  };
  $.firstOf = function(array) {
    return array[0]
  };
  $.restOf = function(array, start) {
    start = $.init(start, 1);
    return Array.prototype.slice.call(arguments, [start, array.length]);
  }
  $.lastOf = function(array) {
    return array[array.length-1]
  };
  $.rotated = function(array, numPositions) {
    numPositions = $.init(numPositions, 1);
    sliceIndex = (array.length - numPositions) % array.length;
    if (sliceIndex < 0) sliceIndex += array.length;
    var beginning = array.slice(0, sliceIndex);
    var end = array.slice(sliceIndex, array.length);
    return end.concat(beginning);
  };
  $.rotate = function(array, numPositions) {
    $.replace(array, $.rotated(array, numPositions));
    return array;
  };
  $.repeat = function(nTimes, fn) {
    fn = $.init(fn, $.identity);
    var count = 0
    while (count < nTimes) {
      fn(count++);
    }
  }
  $.generate = function(n, fn) {
    var generated = new Array(n);
    $.repeat(n, function(i) { generated[i] = fn(); });
    return generated;
  }
  
  // Function utils
  $.call = function(fn, args, thisVal) {
    if ($.isFunction(fn)) {
      return fn.apply(thisVal || Z, args);
    }
    return undefined;
  };
  
  // Object utils
  $.merged = function(obj1, obj2) {
    var merged = $.copy(obj1);
    $.forAllPropertiesOf(obj2, function(k, v) {
      merged[k] = v;
    });
    return merged;
  };
  $.merge = function(obj1, obj2) {
    $.forAllPropertiesOf(obj2, function(k, v) {
      obj1[k] = v;
    });
    return obj1;
  };
  
  $.seal = function(obj) { return Object.seal(obj); };
  
  $.addProperties = function(object, props, options) {
    options = $.init(options, {});
    var writable = $.init(options.writable, true);
    $.forAllPropertiesOf(props, function(name, value) {
      (function () {
        var _propertyValue = value;
        var descriptor =
            { enumerable:   $.init(options.enumerable, true)
            , configurable: false
            , get: function() { return _propertyValue; }
            };
        if (writable) {
          descriptor.set = function(newValue) {
            var oldValue = _propertyValue;
            _propertyValue = newValue;
            console.log("about to call trigger", object.trigger)
            $.call(object.trigger, ['propertyChanged', name, oldValue, newValue], object);
          };
        }
        Object.defineProperty(object, name, descriptor);
      })();
    });
    return Z;
  };
  $.aliasProperties = function(object, aliases) {
    $.forAllPropertiesOf(aliases, function(alias, name) {
      var descriptor =
          { enumerable:   false
          , configurable: false
          , set: function(newValue) { object[name] = newValue; }
          , get: function() { return object[name]; }
          }
      Object.defineProperty(object, alias, descriptor);
    });
    
    return Z;
  };
  
  // Time
  $.now = function() {
    return Number(new Date());
  };
  $private.throttle = function(fn, maxCallsPerSecond) {
    maxCallsPerSecond = init(maxCallsPerSecond, $.framesPerSecond);
    var minMillisBetweenCalls = 1000 / maxCallsPerSecond;
    var timeOfLastCall = 0;
    var callFn = function() {
      timeOfLastCall = $.now();
      fn();
    };
    var throttledFn = function() {
      var now = $.now();
      var elapsed = now - timeOfLastCall;
      if (elapsed >= minMillisBetweenCalls) {
        callFn();
      } else {
        setTimeout(callFn, minMillisBetweenCalls - elapsed);
      }
    };
    return throttledFn;
  };
  
  $private.uiElements = [];
  $private.appendToScreen = function(elem) {
    $private.uiElements.push(elem);
    $private.addElementsToDom($.screen, [elem]);
  };
  $private.addElement = function(tag, attrs) {
    attrs = $.init(attrs, {})
    var elem = document.createElement(tag || 'div');
    
    for(var attr in attrs) {
      if (attrs.hasOwnProperty(attr)) {
        elem.setAttribute(attr, attrs[attr]);
      }
    }
    $private.appendToScreen(elem);
    return elem;
  };
  $private.addElementsToDom = function(parent, elements) {
    if (!parent || !$.isArray(elements)) return;
    $.forAll(elements, function(elem) {
      parent.appendChild(elem);
    });
  };
  $private.removeElementsFromDom = function(parent, elements) {
    if (!parent || !$.isArray(elements)) return;
    $.forAll(elements, function(elem) {
      parent.removeChild(elem);
    });
  };

  $.createUiElement = function(params) {
    params = $.init(params, {});
    var secret = {};
    var ui = {};
    
    secret.domElement = $private.addElement(params.tag);
    
    $.addProperties(ui,
      { whenMouseButtonPressed:  $.noOp
      , whenMouseButtonReleased: $.noOp
      , whenClicked: $.noOp
      , whenMouseEnters: $.noOp
      , whenMouseLeaves: $.noOp
      , whenMouseMoves: $.noOp
      , whenKeyPressed: $.noOp
      , whenKeyReleased: $.noOp
      , top: $private.turtleY
      , left: $private.turtleX
      , height: 50
      , width: 100
      , visible: true
      , text: ''
      , fontSize: 20
      , textColor: 'black'
      , color: 'white'
      , borderWidth: 1
      , scrollable: false
      , data: {} // this property is not used by thrax; it's for the user to store their own data
      });
    
    var trigger = function(event) {
      var args = $.restOf(arguments);
      var handlers = secret.eventHandlers[event];
      console.log(handlers);
      if ($.isArray(handlers)) {
        $.forAll(handlers, function(handler) { $.call(handler, args) });
      } else {
        // there is only one event handler
        $.call(handlers, args);
      }
    };
    
    $.addProperties(ui,
      { trigger: trigger },
      {writable: false, enumerable: false}
    );
    
    var propertyChanged = function(prop, from, to) {
      ui.redraw();
    };
    
    secret.eventHandlers =
    { propertyChanged: propertyChanged
    };
    
    $private.turtleX += 100;
    if ($private.turtleX > 800) {
      $private.turtleX = 0;
      $private.turtleY += 50;
    };
    
    ui.redraw = function () {
      secret.setText(ui.text);
      secret.setAttributes(secret.htmlAttributes());
    };
    
    secret.setText = function(value) {
      secret.domElement.innerHTML = $.htmlEscape(value);
    };
    
    secret.setAttributes = function (attrs) {
      $.forAllPropertiesOf(attrs, function(name, value) {
        secret.domElement.setAttribute(name, value);
      });
    };
    
    secret.htmlAttributes = function () {
      return {
      // TODO: this method of binding callbacks does not work, because the attributes must be a string!
      // use the good type of callback binding instead!
      // 
      // onclick: ui.whenClicked
      //, onmouseover: ui.whenMouseEnters
      //, onmouseout: ui.whenMouseLeaves
      //, onmousemove: ui.whenMouseMoves
        style: secret.toCss()
      };
    };
    
    secret.toCss = function() { return $.toCss(secret.asCss()); };
    secret.asCss = function() {
      var css =
        { 'top'    : $.toNumericString(ui.top)+'px'
        , 'left'   : $.toNumericString(ui.left)+'px'
        , 'height' : $.toNumericString(ui.height)+'px'
        , 'width'  : $.toNumericString(ui.width)+'px'
        , 'color'  : ui.textColor
        , 'background-color' : ui.color
        , 'display' : (ui.visible ? 'block' : 'none')
        , 'border-color' : ui.borderColor
        , 'border-width' : $.toNumericString(ui.borderWidth)+'px'
        , 'position' : 'absolute'
        , 'font-size' : $.toNumericString(ui.fontSize)+'px'
        , 'white-space' : 'pre-wrap'
        , 'overflow-x' : 'hidden'
        , 'overflow-y' : (ui.scrollable ? 'auto' : 'hidden')
        };
      return css;
    };
    
    ui.redraw();
    
    $.seal(ui)
    return ui;
  };
  
  $.createButton = function() {
    var secret = {};
    var self = createUiElement({tag: 'button'}, secret);
    
    var attr = secret.attr;
    
    return self;
  };
  
  $.createTextDisplay = function() {
    var secret = {};
    var self = createUiElement({tag: 'div'}, secret);
    
    var attr = secret.attr;
    
    return self;
  };
  
  $.createTicker = function() {
    var secret = {};
    var self = {};
    secret.attr = $.imbueWithAttributes(self, secret);
    secret.attr('interval', 1);
    secret.attr('whenTicked', function() {});
    
    var started = false;
    var lastTick = 0;
    
    self.start = function() {
      started = true;
      lastTick = new Date().getTime();
      secret.jsInterval = setInterval(
        function () {
          var now = new Date().getTime();
          self.whenTicked()((now - lastTick) / 1000);
          lastTick = now;
        },
        self.interval()*1000
      );
    }
    
    self.stop = function() {
      started = false;
      clearInterval(secret.jsInterval);
    }
    
    self.started = function() {
      return started;
    }
    
    return self;
  }
  
  // global event handlers
  
  //var Zattr = $.imbueWithAttributes(Z);
  //Zattr('screen', "not a real screen");
  //Zattr('boot', function() {});
  //Zattr('whenKeyPressed', function() {});
  
  var oldWindowOnload = window.onload
  
  // when the screen is set, remove any created UI elements from the old screen
  // and add them to the new one.
  var _screen = function(v) {
    if ($.given(v)) {
      $private.removeElementsFromDom(_screen.d, $private.uiElements);
      _screen.d = v;
      $private.addElementsToDom(_screen.d, $private.uiElements);
    }
    return _screen.d;
  }
  _screen.d = null;
  Object.defineProperty($, 'screen', {set: _screen, get: _screen })
  
  $.boot = $.noOp;
  
  window.onload = function() {
    $.call(oldWindowOnload, arguments, this);
    
    var body = document.getElementsByTagName("body")[0];
    var oldBodyOnKeyPress = body.onkeypress;
    body.onkeypress = function () {
      $.call(oldBodyOnKeyPress, arguments, this);
      $.call($.whenKeyPressed, arguments);
    }
    
    $.screen = body;
    
    console.log("about to call boot", $.boot);
    $.boot();
  }

  return $;
})();

var Z = Thrax2;
