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
  
  $public(
    { framesPerSecond: 60
    , screen: null // the DOM element where Thrax controls will be placed
                   // TODO: shouldn't this be private?
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
    , toCss:
        function(obj) {
          return $.forAllPropertiesOf(obj, function(k, v) {
            return k + ":" + v + ";";
          }).join("");
        }
    , htmlEscape:
        function(s) { 
          return String(s)
              .replace(/&/g, '&amp;')
              .replace(/"/g, '&quot;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;');
        }
    , htmlUnescape:
        function(s) {
          return String(s)
              .replace(/&gt;/g,   '>')
              .replace(/&lt;/g,   '<')
              .replace(/&quot;/g, '"')
              .replace(/&amp;/g,  '&');
        }
    
    // Array utility functions
    , forAll:
        function(array, fn) {
          fn = $.init(fn, $.identity);
          var transformed = new Array(array.length);
          for(var i = 0; i < array.length; i++) {
            transformed[i] = fn(array[i], i);
          }
          return transformed;
        }
    , copy:
        function(thing) {
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
        }
    , replace:
        function(array, newContents) {
          array.length = 0;
          Array.prototype.push.apply(array, newContents);
          return array;
        }
    , sum:
        function(array) {
          var sum = 0;
          $.forAll(array, function(x) {
            sum += x;
          });
          return sum;
        }
    , firstOf:
        function(array) {
          return array[0]
        }
    , restOf: // TODO: rename or alias to allButFirst()? e.g. allButFirst(2, args)
        function(array, start) {
          start = $.init(start, 1);
          return Array.prototype.slice.call(arguments, [start, array.length]);
        }
    , lastOf:
        function(array) {
          return array[array.length-1]
        }
    , drawFirst:
        function(deck) {
          return deck.shift();
        }
    , drawLast:
        function(deck) {
          return deck.pop();
        }
    , rotated:
        function(array, numPositions) {
          numPositions = $.init(numPositions, 1);
          sliceIndex = (array.length - numPositions) % array.length;
          if (sliceIndex < 0) sliceIndex += array.length;
          var beginning = array.slice(0, sliceIndex);
          var end = array.slice(sliceIndex, array.length);
          return end.concat(beginning);
        }
    , rotate:
        function(array, numPositions) {
          $.replace(array, $.rotated(array, numPositions));
          return array;
        }
    , repeat:
        function(nTimes, fn) {
          fn = $.init(fn, $.identity);
          var count = 0
          while (count < nTimes) {
            fn(count++);
          }
        }
    , generate:
        function(n, fn) {
          var generated = new Array(n);
          $.repeat(n, function(i) { generated[i] = fn(); });
          return generated;
        }
    , cut:
        function(array) {
          var middle = Math.floor(array.length / 2);
          return [array.slice(0,middle), array.slice(middle, array.length)];
        }
    , remove:
        function(item, array) {
          for (var i = array.length-1; i >= 0; i--) {
            if (array[i] === item) {
              array.splice(i, 1);
            }
          }
          return array;
        }
    , clear:
        function(array) { array.length = 0; return array; }
    
    // Object utility functions
    , forAllPropertiesOf:
        function(object, fn) {
          fn = $.init(fn, $.identity);
          var accumulated = [];
          eachProperty(object, function(prop, value) {
            accumulated.push(fn(prop, value, object, fn));
          });
          return accumulated;
        }
    , merged:
        function(obj1, obj2) {
          return $.merge($.copy(obj1), obj2);
          //$.forAllPropertiesOf(obj2, function(k, v) {
          //  merged[k] = v;
          //});
          //return merged;
        }
    , merge:
        function(obj1, obj2) {
          $.forAllPropertiesOf(obj2, function(k, v) {
            obj1[k] = v;
          });
          return obj1;
        }
    
    // Randomness
    , rollD:
        function(sides) {
          return Math.ceil(Math.random() * sides);
        }
    , pickRandomly:
        function(array) {
          return array[$.rollD(array.length)-1];
        }
    , drawRandomly:
        function(array) {
          var index = $.rollD(array.length) - 1;
          var drawn = array[index];
          array.splice(index, 1);
          return drawn;
        }
    , shuffle:
        // this simulates a riffle shuffle, which is not particularly random.
        // for more randomness, use $.scramble(array)
        function(array, nTimes) {
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
        }
    , scramble:
        function(array) {
          var scrambled = []
          while(array.length) {
            scrambled.push($.drawRandomly(array));
          }
          return $.replace(array, scrambled);
        }
    
    // Function utilities
    , call:
        function(fn, args, thisVal) {
          if ($.isFunction(fn)) {
            return fn.apply(thisVal || Z, args);
          }
          return undefined;
        }
    , extend:
        function(object, method, extension) {
          var originalMethod = object[method];
          return object[method] = $.extended(originalMethod, extension);
        }
    , extended:
        function(fn, extension) {
          return function() {
            $.call(fn, arguments, this);
            return $.call(extension, arguments, this);
          };
        }
    , addProperties:
        function(object, props, options) {
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
                  $.call(object.receiveEvent, ['propertyChanged', name, oldValue, newValue], object);
                };
              }
              Object.defineProperty(object, name, descriptor);
            })();
          });
          return Z;
        }
    , aliasProperties:
        function(object, aliases) {
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
        }
    , seal:
        function(obj) { return Object.seal(obj); }
    
    // Time
    , now:
        function() { return Number(new Date()); }
    , everySecond:
        function(fn) { return window.setInterval(fn, 1000); }
    
    // UI
    , clearScreen:
        function() {
          _.resetTurtle();
          _.removeAllElementsFromDom();
        }
    }
  );
  
  $private(
    { turtleX: 0
    , turtleY: 0
    , resetTurtle: function() { _.turtleX = _.turtleY = 0; }
    , uiElements: []
    , appendToScreen:
        function(elem) {
          _.uiElements.push(elem);
          _.addElementsToDom($.screen, [elem]);
        }
    , addElement:
        function(tag, attrs) {
          attrs = $.init(attrs, {})
          var elem = document.createElement(tag || 'div');
          
          for(var attr in attrs) {
            if (attrs.hasOwnProperty(attr)) {
              elem.setAttribute(attr, attrs[attr]);
            }
          }
          _.appendToScreen(elem);
          return elem;
        }
    , addElementsToDom:
        function(parent, elements) {
          if (!parent || !$.isArray(elements)) return;
          $.forAll(elements, function(elem) {
            parent.appendChild(elem);
          });
        }
    , removeAllElementsFromDom:
        function() {
          if (!$.screen || !$.isArray(_.uiElements)) return;
          $.forAll(_.uiElements, function(elem) {
            $.screen.removeChild(elem);
          });
          $.clear(_.uiElements);
        }
    , cap:
        function(s) { return s.charAt(0).toUpperCase()+s.slice(1, s.length); }
    , throttle:
        function(fn, maxCallsPerSecond) {
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
        }
    , addEventDispatcher:
        function(host) {
          var d = function(eventName) {
            return function(eventData) {
              d.receiveEvent(eventName, eventData)
            }
          };
          
          d.receiveEvent = function(eventName, rawData) {
            var cb = d.registeredCallbacks[eventName];
            var data = d.process(rawData)
            if ($.isArray(cb)) {
              $.forAll(cb, function(c) { $.call(c, [data]) });
            }
          };
          
          d.process = $.identity;
          
          d.register = function(handlerMapping) {
            d.unregister(handlerMapping); // prevent handlers from being registered more than once
            $.forAllPropertiesOf(handlerMapping, function(eventName, handlers) {
              d.registeredCallbacks[eventName] = $.init(d.registeredCallbacks[eventName], [])
              // TODO: $.init(handle.registeredCallbacks, eventName, []) would be cool
              if ($.isArray(handlers)) {
                var map = {};
                $.forAll(handlers, function(handler) {
                  map[eventName] = handler;
                  d.register(map);
                });
              } else if ($.isFunction(handlers)) {
                d.registeredCallbacks[eventName].push(handlers);
              } else {
                throw "Can't register event handler for "+eventName+": "+handlers;
              }
            });
          };
          
          d.unregister = function(handlerMapping) {
            $.forAllPropertiesOf(handlerMapping, function(eventName, handlers) {
              // TODO: $.init(handle.registeredCallbacks, eventName, []) would be cool
              if ($.isArray(handlers)) {
                var map = {};
                $.forAll(handlers, function(handler) {
                  map[eventName] = handler;
                  d.unregister(map);
                });
              } else if ($.isFunction(handlers)) {
                if ($.isArray(d.registeredCallbacks[eventName])) {
                  $.remove(handlers, d.registeredCallbacks[eventName]);
                }
              } else {
                throw "Can't unregister event handler for "+eventName+": "+handlers;
              }
            });
          };
          
          d.registrar = function(eventName) {
            var registrar = function() {
              var map = {};
              map[eventName] = $.forAll(arguments);
              d.register(map);
            }
            
            registrar.doNot = function() {
              var map = {};
              map[eventName] = $.forAll(arguments);
              d.unregister(map)
            }
            
            registrar.doNothing = function() {
              d.registeredCallbacks[eventName] = [];
            }
            
            return registrar;
          };
          
          d.registeredCallbacks = {};
          
          $.addProperties(host, {receiveEvent: d.receiveEvent}, {writable: false});
          
          return d;
        }
    , createUiElement:
        function(params) {
          params = $.init(params, {});
          var secret = {};
          var ui = {};
          
          secret.domElement = _.addElement(params.tag);
          
          var dispatch = _.addEventDispatcher(ui);
          
          $.addProperties(ui,
            { whenClicked:             dispatch.registrar('clicked')
            , whenMouseEnters:         dispatch.registrar('mouseEnters')
            , whenMouseLeaves:         dispatch.registrar('mouseLeaves')
            , whenMouseMoves:          dispatch.registrar('mouseMoves')
            , whenKeyPressed:          dispatch.registrar('keyPressed')
            , whenKeyReleased:         dispatch.registrar('keyReleased')
            }
          , { writable: false } 
          );
          
          secret.setEventHandlers = function(attrs) {
            var el = secret.domElement;
            el.onclick     = dispatch('clicked');
            el.onmouseover = dispatch('mouseEnters');
            el.onmouseout  = dispatch('mouseLeaves');
            el.onmousemove = dispatch('mouseMoves');
            el.onkeydown   = dispatch('keyPressed');
            el.onkeyup     = dispatch('keyReleased');
          };
          
          $.addProperties(ui,
            { top:  _.turtleY
            , left: _.turtleX
            , height: 50
            , width:  100
            , visible: true
            , text: ''
            , fontSize: 20
            , textColor: 'black'
            , color: 'white'
            , borderWidth: 1
            , borderColor: 'lightGray'
            , scrollable: false
            , cursor: 'auto'
            , data: {} // this property is not used by thrax; it's for the user to store their own data
            });
          
          _.turtleX += 100;
          if (_.turtleX > 800) {
            _.turtleX = 0;
            _.turtleY += 50;
          };
          
          ui.redraw = function () {
            secret.setText(ui.text);
            secret.setAttributes(secret.htmlAttributes());
            secret.setEventHandlers();
          };
          
          dispatch.register({propertyChanged: function() { ui.redraw(); }})
          
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
              , 'color'  : $.COLOR[ui.textColor]
              , 'background-color' : $.COLOR[ui.color]
              , 'display' : (ui.visible ? 'block' : 'none')
              , 'border-color' : $.COLOR[ui.borderColor]
              , 'border-width' : $.toNumericString(ui.borderWidth)+'px'
              , 'position' : 'absolute'
              , 'font-size' : $.toNumericString(ui.fontSize)+'px'
              , 'white-space' : 'pre-wrap'
              , 'overflow-x' : 'hidden'
              , 'overflow-y' : (ui.scrollable ? 'auto' : 'hidden')
              , 'cursor' : ui.cursor
              };
            return css;
          };
          
          ui.redraw();
          
          $.seal(ui)
          return ui;
        }
    }
  );
  
  $.createButton = function() {
    var self = _.createUiElement({tag: 'button'});
    
    self.cursor = 'pointer'
    
    return self;
  };
  
  $.createTextDisplay = function() {
    var self = _.createUiElement({tag: 'div'});
    
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
  
  // when the screen is set, remove any created UI elements from the old screen
  // and add them to the new one.
  var _screen = function(v) {
    if ($.given(v) && v !== _screen.d) {
      _.removeAllElementsFromDom();
      _screen.d = v;
      _.addElementsToDom(_screen.d, _.uiElements);
    }
    return _screen.d;
  }
  _screen.d = null;
  Object.defineProperty($, 'screen', {set: _screen, get: _screen, configurable: false});
  
  var $dispatch = _.addEventDispatcher($);
  
  $.addProperties($
  , { whenPageLoadFinishes: $dispatch.registrar('pageLoaded')
    , whenKeyPressed:       $dispatch.registrar('keyPressed')
    }
  , { writable: false }
  );
  
  $.extend(window, 'onload', function() {
    var body = document.getElementsByTagName("body")[0];
    
    $.extend(body, 'onkeypress', $dispatch('keyPressed'));
    
    $.screen = body;
  });
  
  $.extend(window, 'onload', $dispatch('pageLoaded'));

  return $;
})();

var Z = Thrax2;
var Thrax = Thrax2;
