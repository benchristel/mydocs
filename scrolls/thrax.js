Factory = (function(undefined) {
  self = {};
  
  self.stamp = function(_prototype, _initialize) {
    var constructor = function() {},
        instance = null
    
    constructor.prototype = _prototype;
    instance = new constructor();
    _initialize(instance);
    return instance;
  }
  
  self.method = function(obj, name, fn) {
    obj[name] = fn.bind({self: self, _: priv)
  }
  
  return self;
})();

Spawner = function(proto) {
  return function(properties) {
    return Object.create(proto, properties);
  };
}

var originalHealingPotion = makePotion();
originalHealingPotion.affect = function(target) {
  target.health = target.health + this.power();
}
originalHealingPotion.power = function() { return 3; }
originalHealingPotion.name = function() { return "Healing Potion"; };
originalHealingPotion.description = function { return "Heals target for " + this.power() + " HP"; }

var makeHealingPotion = makeRecipe(originalHealingPotion);

healingPotion =

var makePotion = function() {
  var po = makeItem();
  
  po.affect = function(target) {
    target.wet = true;
  }
  
  po.use = function(target) {
    po.usesRemaining(po.usesRemaining() - 1)
  }
  
  return self;
}

var makeHealingPotion = function() {
  var po = makePotion();
  
  giveAttribute('power', 3, po);
  giveAttribute('weightOunces', 5, po);
  giveAttribute('usesRemaining', 3, po);
  
  var old_affect = po.affect;
  po.affect = function(target) {
    old_affect(target);
    target.heal(po.power()); 
  }
  
  return po;
}


protoTroll = Creature({attack: 3, defense: 5});
Troll = Spawner(protoTroll);
troll = Troll({name: "boztufrey"});

Potion = ATypeOf(Item({
  drinkable: true,
  usesRemaining: 3,
  affect: function(target) {
    // a basic potion has no effect
  },
  description: "A useless potion"
}));

potion = Object.create(item)

makePotion = function(item) {
  potion = item;
  potion.drinkable = true;
  potion.usesRemaining = 3;
  useOn: function(target) {
    this.usesRemaining -= 1;
    return this.affect(target);
  }
  affect: function(target) {
    // a basic potion has no effect
  }
  return potion;
}



var deathPotion = makePotion({affect: function(target) { target.health = 0; }});

var old_useOn = deathPotion.useOn;
deathPotion.useOn = function(target) {
  if (isFunction(target.say)) target.say('aaargh!');
  return old_useOn(target);
}

makeDeathPotion = makeRecipe(deathPotion);

Thrax = (function (doc, undefined) {
  var def  = function(val) { return val !== undefined; };
  var ndef = function(val) { return val === undefined; };
  var func = function(val) { return typeof(val) === 'function'; };
  
  var warnConflict = function(obj, property) {
    if (def(obj[property])) {
      console.log("WARNING: property "+property+" already defined on object:", obj)
    }
  }
  
  
  var originalObject =
      { install: function(mixin) { mixin(this); } }
  
  var makeObject = function() {
    return Object.create(originalObject);
  };
  
  /**
   * mixins start with a capital letter I guess...
   * use them like this:
   * 
   * var makeHealingPotion = function() {
   *   var p = makePotion();
   *   Attributes(p)
   *       ('power', 3)
   *       ('noEffectOn', ['undead', 'golem'])
   *   ;
   *   return p;
   * };
   *
   * or this less magic way:
   *
   * var makeHealingPotion = function() {
   *   var p = makePotion();
   *   attr = Attributes(p);
   *   attr('power', 3);
   *   attr('noEffectOn', ['undead', 'golem']);
   *   return p;
   * };
   */
  
  var Attributes = function(target) {
    return function attr(name, value) {
      var stored = value;
      var onChangeCbName = name+'Changed';
      
      target[name] = function(newValue, doCallback) {
        if(ndef(doCallback)) doCallback = true;
        
        if (def(newValue)) {
          var oldValue = stored;
          stored = newValue;
          if (doCallback) {
            target[onChangeCbName](oldValue, newValue);
          }
        }
        
        return stored;
      };
      
      target[onChangeCbName] = function(oldValue, newValue) { console.log("changed "+name+" from "+oldValue+" to "+newValue) };
      return attr;
    };
  };
  
  var Events = function(target) {
    var handlers = {}
    
    warnConflict(target, 'receiveEvent');
    target.receiveEvent = function(name, evt) {
      if (func(handlers[name])) return handlers[name](evt);
    };
    
    return function event(name, handler) {
      handlers[name] = handler;
      return event;
    }
  }
  
  var LayeredMethods = function(target) {
    
  }
  
  // 
  
  var attr = function(name, value) {
    var stored = value;
    var onChangeCbName = name+'Changed';
    
    this[name] = function(newValue, doCallback) {
      if(ndef(doCallback)) doCallback = true;
      
      if (def(newValue)) {
        var oldValue = stored;
        stored = newValue;
        if (doCallback) {
          this[onChangeCbName](oldValue, newValue);
        }
      }
      
      return stored;
    };
    
    this[onChangeCbName] = function(oldValue, newValue) { console.log("changed "+name+" from "+oldValue+" to "+newValue) };
  }
  
  /**
   * use +layer+ to add functionality on an existing method, without completely
   * overwriting it.
   * 
   * healthPotion.layer('affect', function(existingAffect) {
   *   return function(target) {
   *     existingAffect(target);
   *     target.addHealth(3);
   *   };
   * });
   *
   */
  var layer = function(methodName, define) {
    this[methodName] = define(this[methodName].bind(this))
  }
  
  var thrax = {
    defineAccessors: function() {
      var _class = arguments[0];
      for (var i = 1; i < arguments.length; i++) {
        attr = arguments[i];
        _class.prototype[attr] = function(newValue) {
          var internalName = '_'+attr;
          if (newValue != undefined) this[internalName] = newValue;
          return this[internalName];
        }
      }
    },

    create: function(tag, attrs) {
      var elem = doc.createElement(tag);
      for(var attr in attrs) {
        if (attrs.hasOwnProperty(attr)) {
          elem.setAttribute(attr, attrs[attr]);
        }
      }
      return elem;
    },

    prepend: function(parent, tag, attrs) {
      var elem = thrax.create(tag, attrs);
      parent.insertBefore(elem, parent.firstChild);
      return elem;
    },

    append: function(parent, tag, attrs) {
      var elem = thrax.create(tag, attrs);
      parent.appendChild(elem);
      return elem;
    },

    createButton: function(text, x, y) {
      var button = new thrax.Button();
      button.text(text);
      button.positionX(x);
      button.positionY(y);
    }
  };
  
  var create = function(_parent, _properties, _constructor) {
    var instance = Object.create(_parent, _properties);
    if (_constructor) {
      _constructor(instance);
    }
    return instance;
  };
  
  var buildPropertiesObject = function() {
    var props = {
      notifyPropertyChanged: function(property, oldValue, newValue) {}
    }
    
    for (var i = 0; i < arguments.length; i++) {
      (function (name) {
        var attrName = '@'+name;
        props[attrName] = null;
        props[name] = function(newValue) {
          var oldValue = this[attrName];
          if (newValue !== undefined) {
            this[attrName] = newValue;
            this.notifyPropertyChanged(property, oldValue, newValue);
          }
          return this[attrName];
        }
      })(arguments[i]);
    }
    
    return props;
  };
  
  var withProperties = buildPropertiesObject;
  
  var uiElement = create(
    {},
    withProperties(
      'domElement',
      'height',
      'width',
      'top',
      'left',
      'visible'
    )
  );
  
  var button = create(
    uiElement,
    withProperties(
      'text',
      'pixelsFromLeft',
      'pixelsFromTop',
      'backgroundColor',
      'visible',
      'enabled'
    ),
    function (self) {
      self.text('button')
      self.domElement(dom.createButton(self))
      self.
      
    }
  );
  
  // ==================
  // mixins named add*
  // ==================
  
  var addClickability = function(ui) {
    var attr = attributeInstaller(ui);
    attr('onClick', function(button, clickEvent){})
    
    ui.receiveClickEvent = function(evt) {
      // todo: package evt fields in a clear, consistent way
      ui.onClick()(b, evt);
    }
  }
  
  var addMethodLayering = function(obj) {
    obj.layer = obj
  }
  
  
  
  thrax.createButton = function() {
    var b = createUiElement()
    
    var attr = Attributes(b);
    
    attr('top', 10);
    attr('left', 10);
    attr('textColor', 'black');
    attr('backgroundColor', '#ccc');
    attr('text', 'Button');
    
    var event = eventHandlerInstaller(b);
    event('click')
    
    
    return b;
  };
  
  thrax.Button = function() {
    var button = this;
    button._pixelsFromLeft = 10;
    button._pixelsFromTop  = 0;
  };
  
  thrax.defineAccessors(thrax.Button, 'text', 'pixelsFromLeft', 'pixelsFromTop');

  var body = document.children[0].children[1];

  thrax.prepend(body, 'div', {id: "thrax-spacer", style:"width:100%; height:240px;"})
  var pane = thrax.prepend(body, 'div', {id: "thrax-pane", style:"z-index:1000; background-color:black; color:white; position:fixed; top:0; left:0; width:100%; height:240px;"})

  thrax.screen = pane;

  document.getElementById('thrax-pane').innerHTML = '<div style="width:50%; height:230px; margin-top:5px; border:1px solid yellow; background-color: #ccc; color: black;">hello</div>';
  return thrax;
})(window.document);