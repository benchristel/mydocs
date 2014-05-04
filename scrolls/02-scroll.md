# Introduction to Thrax

```javascript
Thrax = (function (doc, undefined) {
  var Thrax = {
    Button: function() {
      var button = this;
      button.text = function(newText) {
        if (newText != undefined) {
          button._text = newText;
        } else {
          
        }
      };
    }

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
      var elem = Thrax.create(tag, attrs);
      parent.insertBefore(elem, parent.firstChild);
      return elem;
    },

    append: function(parent, tag, attrs) {
      var elem = Thrax.create(tag, attrs);
      parent.appendChild(elem);
      return elem;
    }

    createButton: function(text, x, y) {
      var button = new Thrax.Button();
      button.text(text);
      button.positionX(x);
      button.positionY(y);
    }
  };

  var body = document.children[0].children[1];

  Thrax.prepend(body, 'div', {id: "thrax-spacer", style:"width:100%; height:240px;"})
  var pane = Thrax.prepend(body, 'div', {id: "thrax-pane", style:"z-index:1000; background-color:black; color:white; position:fixed; top:0; left:0; width:100%; height:240px;"})

  Thrax.screen = pane;

  document.getElementById('thrax-pane').innerHTML = '<div style="width:50%; height:230px; margin-top:5px; border:1px solid yellow; background-color: #ccc; color: black;">hello</div>';
  return Thrax;
})(window.document);
```