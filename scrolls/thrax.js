Thrax = (function (undefined) {
  var $ = {}; // the thrax object
  
  $.COLOR =
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
  
  var def  = function(val) { return val !== undefined; };
  var ndef = function(val) { return val === undefined; };
  var func = function(val) { return typeof(val) === 'function'; };
  var cap  = function(s) { return s.charAt(0).toUpperCase()+s.slice(1, s.length); };
  var esc  = function(s) { 
    return String(s)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
  }
  var nesc = function(s) {
    return String(s)
            .replace(/&gt;/g,   '>')
            .replace(/&lt;/g,   '<')
            .replace(/&quot;/g, '"')
            .replace(/&amp;/g,  '&');
  }
  
  
  $.given = def;
  $.missing = ndef;
  $.isFunction = func;
  $.isArray  = function(thing) { return thing instanceof Array; };
  $.isObject = function(thing) { return thing instanceof Object; };
  $.init = function(val, _default) { return def(val) ? val : _default; };
  $.noOp = function() {};
  $.identity = function(x) { return x; };
  $.htmlEscape = esc;
  $.htmlUnescape = nesc;
  
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
  $.cut = function(array) {
    var middle = Math.floor(array.length / 2);
    return [array.slice(0,middle), array.slice(middle, array.length)];
  }
  $.drawLast = function(array) {
    return array.pop();
  }
  $.drawFirst = function(array) {
    return array.shift();
  }
  $.replace = function(array, newContents) {
    array.length = 0;
    Array.prototype.push.apply(array, newContents);
    return array;
  }
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
  }
  
  $.scramble = function(array) {
    var scrambled = []
    while(array.length) {
      scrambled.push($.drawRandomly(array));
    }
    return $.replace(array, scrambled);
  }
  
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
  }
  $.merge = function(obj1, obj2) {
    var merged = $.copy(obj1);
    $.forAllPropertiesOf(obj2, function(k, v) {
      merged[k] = v;
    });
    return merged;
  };
  
  $.call = function(fn) {
    if ($.isFunction(fn)) {
      return fn.apply($, arguments.slice(1, arguments.length));
    }
  }
  
  $.toCss = function(obj) {
    return $.forAllPropertiesOf(obj, function(k, v) {
      return k + ":" + v + ";";
    }).join("");
  };
  
  $.forAll = function(array, fn) {
    fn = $.init(fn, $.identity);
    var transformed = new Array(array.length);
    for(var i = 0; i < array.length; i++) {
      transformed[i] = fn(array[i], i);
    }
    return transformed;
  }
  
  $.forAllPropertiesOf = function(object, fn) {
    fn = $.init(fn, $.identity);
    var accumulated = [];
    for (var prop in object) {
      if (object.hasOwnProperty(prop)) {
        accumulated.push(fn(prop, object[prop], object, fn));
      }
    }
    return accumulated;
  }
  
  $.sum = function(array) {
    var sum = 0;
    $.forAll(array, function(x) {
      sum += x;
    });
    return sum;
  };
  
  $.repeat = function(nTimes, fn) {
    fn = $.init(fn, $.identity);
    var count = 0, accumulated = new Array(nTimes);
    while (count < nTimes) {
      accumulated[count] = fn(count, accumulated);
      count++;
    }
    return accumulated;
  }
  
  $.toggle = function(current, value1, value2) {
    return current === value1 ? value2 : value1;
  }
  
  $.imbueWithAttributes = function(vessel, secret) {
    secret = $.init(secret, {});
    secret.imbuedAttributes = $.init(secret.fromImbueWithAttributes, {});
    var s = secret.imbuedAttributes;
    
    s.attributes = {};
    s.changeCallbacks = {};
    s.demuxChangeCallback = function() {};
    
    s.imbuer = function(attrName, defaultValue) {
      s.attributes[attrName] = defaultValue;
      s.changeCallbacks[attrName] = function() {};
      
      // define the attribute [gs]etter on the vessel.
      vessel[attrName] = function(newValue, shouldCallback) {
        shouldCallback = $.init(shouldCallback, true);
        
        if ($.given(newValue)) {
          var oldValue = s.attributes[attrName];
          s.attributes[attrName] = newValue;
          
          if (shouldCallback) {
            s.demuxChangeCallback(attrName, oldValue, newValue);
            s.changeCallbacks[attrName](oldValue, newValue);
          }
        }
        
        return s.attributes[attrName];
      };
      
      if ($.isNumber(defaultValue)) {
        vessel['increase'+cap(attrName)] = function(inc, shouldCallback) {
          var newValue = vessel[attrName]() + inc;
          return vessel[attrName](newValue, shouldCallback);
        }
        
        vessel['decrease'+cap(attrName)] = function(dec, shouldCallback) {
          var newValue = vessel[attrName]() - dec;
          return vessel[attrName](newValue, shouldCallback);
        }
      }
      
      vessel['toggle'+cap(attrName)] = function(val1, val2, shouldCallback) {
        var newValue = $.toggle(vessel[attrName](), val1, val2);
        return vessel[attrName](newValue, shouldCallback);
      }
      
      // return the imbuer so calls can be chained
      return s.imbuer;
    };
    
    s.imbuer.whenChanged = function(attrName, cb) {
      if ($.given(cb)) {
        s.changeCallbacks[attrName] = cb;
      } else {
        // first argument passed is actually the callback
        s.demuxChangeCallback = arguments[0];
      }
    };
    
    s.imbuer.attributes = function() {
      return $.copy(attributes);
    }
    
    return s.imbuer;
  };
  
  var addElement = function(tag, attrs) {
    attrs = $.init(attrs, {})
    var elem = document.createElement(tag || 'div');
    
    for(var attr in attrs) {
      if (attrs.hasOwnProperty(attr)) {
        elem.setAttribute(attr, attrs[attr]);
      }
    }
    $.screen().appendChild(elem);
    return elem;
  };

  var createUiElement = function(params, secret) {
    params = $.init(params, {});
    secret = $.init(secret, {});
    var ui = {};
    
    secret.domElement = addElement(params.tag);
    secret.attr = $.imbueWithAttributes(ui, secret);
    var attr = secret.attr;
    
    attr('whenMouseButtonPressed', function() {})
        ('whenMouseButtonReleased', function() {})
        ('whenClicked', function() {})
        ('whenMouseEnters', function() {})
        ('whenMouseLeaves', function() {})
        ('whenMouseMoves', function() {})
        ('whenKeyPressed', function() {})
        ('whenKeyReleased', function() {})
        ('top', 10)
        ('left', 10)
        ('height', 30)
        ('width', 80)
        ('visible', true)
        ('text', '')
        ('fontSize', 20)
        ('textColor', '#000')
        ('backgroundColor', $.COLOR.white)
        ('textColor', $.COLOR.black)
        ('borderColor', $.COLOR.gray)
        ('borderWidth', 1)
        ('scrollable', false)
    ;
    
    ui.attributes = secret.attr.attributes;
    
    ui.redraw = function () {
      secret.setStyle(secret.toCss());
      secret.setText(ui.text());
    }
    
    attr.whenChanged(ui.redraw);
    attr.whenChanged('whenClicked', function (old, neu) {
      secret.domElement.onclick = neu;
    });
    attr.whenChanged('whenMouseEnters', function (old, neu) {
      secret.domElement.onmouseover = neu;
    });
    attr.whenChanged('whenMouseLeaves', function (old, neu) {
      secret.domElement.onmouseout = neu;
    });
    attr.whenChanged('whenMouseMoves', function (old, neu) {
      secret.domElement.onmousemove = neu;
    });
    
    secret.setStyle = function(value) {
      secret.domElement.setAttribute('style', value);
    };
    
    secret.setText = function(value) {
      secret.domElement.innerHTML = $.htmlEscape(value);
    }
    
    secret.toCss = function() { return $.toCss(secret.asCss()); };
    secret.asCss = function() {
      var css =
        { 'top'    : String(ui.top())+'px'
        , 'left'   : String(ui.left())+'px'
        , 'height' : String(ui.height())+'px'
        , 'width'  : String(ui.width())+'px'
        , 'color'  : ui.textColor()
        , 'background-color' : ui.backgroundColor()
        , 'display' : (ui.visible() ? 'block' : 'none')
        , 'border-color' : ui.borderColor()
        , 'border-width' : ui.borderWidth()
        , 'position' : 'absolute'
        , 'font-size' : String(ui.fontSize())+'px'
        , 'white-space' : 'pre-wrap'
        , 'overflow-x' : 'hidden'
        , 'overflow-y' : (ui.scrollable() ? 'auto' : 'hidden')
        };
      return css;
    };
    
    ui.redraw();
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
  
  var body = document.getElementsByTagName("body")[0];
  var $attr = $.imbueWithAttributes($);
  $attr('screen', body);

  return $;
})();

var $ = Thrax;
