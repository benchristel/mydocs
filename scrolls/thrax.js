Thrax = (function (undefined) {
  var $ = {}; // the thrax object
  
  $.COLOR =
    { black: 'black'
    , white: 'white'
    , gray:  'gray'
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
  }
  
  $.toCss = function(obj) {
    return $.forAllPropertiesOf(obj, function(k, v) {
      return k + ":" + v + ";";
    }).join("");
  };
  
  var warnConflict = function(obj, property) {
    if (def(obj[property])) {
      console.log("WARNING: property "+property+" already defined on object:", obj)
    }
  }
  
  $.forAll = function(array, fn) {
    var transformed = $.copy(array);
    for(var i = 0; i < array.length; i++) {
      transformed[i] = fn(array[i]);
    }
    return transformed;
  }
  
  $.forAllPropertiesOf = function(object, fn) {
    var accumulated = [];
    for (var prop in object) {
      if (object.hasOwnProperty(prop)) {
        accumulated.push(fn(prop, object[prop], object, fn));
      }
    }
    return accumulated;
  }
  
  $.collect = function(array, prop) { /*TODO*/ }
  
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
  
  $.addElement = function(tag, attrs) {
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
    
    secret.domElement = $.addElement(params.tag);
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
        ('height', 10)
        ('width', 10)
        ('visible', true)
        ('text', '')
        ('fontSize', 20)
        ('textColor', '')
        ('backgroundColor', $.COLOR.white)
        ('textColor', $.COLOR.black)
        ('borderColor', $.COLOR.gray)
        ('borderWidth', 1)
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
    
    var oldAsCss = secret.asCss;
    secret.asCss = function() {
      return $.merge(oldAsCss(),
        { top:  String(self.top())+"px"
        , left: String(self.left())+"px"
        }
      );
    };
    
    return self;
  };
  
  var body = document.getElementsByTagName("body")[0];
  var $attr = $.imbueWithAttributes($);
  $attr('screen', body);

  return $;
})();

$ = Thrax;
