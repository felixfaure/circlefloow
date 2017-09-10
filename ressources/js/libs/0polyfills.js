//Closest & matches
(function (ELEMENT) {
	ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector || function matches(selector) {
		var element = this,
		elements = (element.document || element.ownerDocument).querySelectorAll(selector),
		index = 0;
		while (elements[index] && elements[index] !== element) {
			++index;
		}
		return elements[index] ? true : false;
	};

	ELEMENT.closest = ELEMENT.closest || function closest(selector) {
		var element = this;
		while (element) {
			if (element.matches(selector)) {
				break;
			}
			element = element.parentElement;
		}
		return element;
	};
}(Element.prototype));


//Remove
(function (ELEMENT) {
	ELEMENT.remove = ELEMENT.remove || function remove() {
		if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
	};
}(Element.prototype));


// //RequestAnimationFrame
// //https://gist.github.com/paulirish/1579671
// (function() {
//     var lastTime = 0;
//     var vendors = ['ms', 'moz', 'webkit', 'o'];
//     for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
//         window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
//         window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
//     }
//
//     if (!window.requestAnimationFrame)
//         window.requestAnimationFrame = function(callback, element) {
//             var currTime = new Date().getTime();
//             var timeToCall = Math.max(0, 16 - (currTime - lastTime));
//             var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
//             lastTime = currTime + timeToCall;
//             return id;
//         };
//
//     if (!window.cancelAnimationFrame)
//         window.cancelAnimationFrame = function(id) {
//             clearTimeout(id);
//         };
// }());


//ClassList (IE9-, opera mini)
(function () {

	if (typeof window.Element === "undefined" || "classList" in document.documentElement) return;

	var prototype = Array.prototype,
	    push = prototype.push,
	    splice = prototype.splice,
	    join = prototype.join;

	function DOMTokenList(el) {
	  this.el = el;
	  // The className needs to be trimmed and split on whitespace
	  // to retrieve a list of classes.
	  var classes = el.className.replace(/^\s+|\s+$/g,'').split(/\s+/);
	  for (var i = 0; i < classes.length; i++) {
	    push.call(this, classes[i]);
	  }
	};

	DOMTokenList.prototype = {
	  add: function(token) {
	    if(this.contains(token)) return;
	    push.call(this, token);
	    this.el.className = this.toString();
	  },
	  contains: function(token) {
	    return this.el.className.indexOf(token) != -1;
	  },
	  item: function(index) {
	    return this[index] || null;
	  },
	  remove: function(token) {
	    if (!this.contains(token)) return;
	    for (var i = 0; i < this.length; i++) {
	      if (this[i] == token) break;
	    }
	    splice.call(this, i, 1);
	    this.el.className = this.toString();
	  },
	  toString: function() {
	    return join.call(this, ' ');
	  },
	  toggle: function(token) {
	    if (!this.contains(token)) {
	      this.add(token);
	    } else {
	      this.remove(token);
	    }

	    return this.contains(token);
	  }
	};

	window.DOMTokenList = DOMTokenList;

	function defineElementGetter (obj, prop, getter) {
    if (Object.defineProperty) {
      Object.defineProperty(obj, prop,{
        get : getter
      });
    } else {
      obj.__defineGetter__(prop, getter);
    }
	}

	defineElementGetter(Element.prototype, 'classList', function () {
	  return new DOMTokenList(this);
	});

})();
