(function(global) {

	var support = {},
			ua = navigator.userAgent;


	function toCameCase(name) {
		return name.replace(/([a-z])-([a-z])/g, function(str, m1, m2) {
			return m1 + m2.toUpperCase();
		}).replace(/^-/, '');
	}


	//Test d'une propriété css
	function testCSS(prop) {
		if (prop.indexOf('-') != -1) {
			prop = toCameCase(prop);
		}
		var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
				prefixes = 'Moz O ms Webkit',
				prefixesArr = prefixes.split(' '),
				props = (prop + ' ' + prefixesArr.join(ucProp + ' ') + ucProp).split(' ');

		var el = document.createElement('a');
		var propsLength = props.length,
				i,
				p;

		for (i = 0; i < propsLength; i++) {
			p = props[i];
			if (el.style[p] !== undefined) {
				return p;
			}
		}
		return false;
	}


	// //Support history
	// function test_history() {
	// 	if((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
	// 			ua.indexOf('Mobile Safari') !== -1 &&
	// 			ua.indexOf('Chrome') === -1 &&
	// 			ua.indexOf('Windows Phone') === -1) {
	// 		return false;
	// 	}
	// 	if(ua.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]|WebApps\/.+CFNetwork)/)) {
	// 		return false;
	// 	}
	// 	return (window.history && 'pushState' in window.history && 'replaceState' in window.history);
	// }
	// support.history = test_history();


	// //Support vidéo et savoir le format supporté
	// function support_video() {
	// 	var elem = document.createElement('video');
	// 	var bool = false;
	//
	// 	try {
	// 		if (bool = !!elem.canPlayType) {
	// 			bool = new Boolean(bool);
	// 			bool.ogg = elem.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, '');
	// 			bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, '');
	// 			bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, '');
	// 			bool.vp9 = elem.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, '');
	// 			bool.hls = elem.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, '');
	// 		}
	// 	} catch (e) {}
	// 	return bool;
	// }
	// support.video = support_video();


	// //Event animation/transition end
	// function transitionEndEventName() {
	// 	var i,
	// 			el = document.createElement('div'),
	// 			transitions = {
	// 					'transition':'transitionend',
	// 					'OTransition':'otransitionend',  // oTransitionEnd in very old Opera
	// 					'MozTransition':'transitionend',
	// 					'WebkitTransition':'webkitTransitionEnd'
	// 			};
	// 	for (i in transitions) {
	// 		if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
	// 			return transitions[i];
	// 		}
	// 	}
	// 	return false;
	// }
	// support.transitionend = transitionEndEventName();
	//
	// function animationEndEventName() {
	// 	var i,
	// 			el = document.createElement('div'),
	// 			animations = {
	// 				'animation':'animationend',
	// 				'OAnimation':'oanimationend',  // oAnimationEnd in very old Opera
	// 				'MozAnimation':'animationend',
	// 				'WebkitAnimation':'webkitAnimationEnd'
	// 			};
	// 	for (i in animations) {
	// 		if (animations.hasOwnProperty(i) && el.style[i] !== undefined) {
	// 			return animations[i];
	// 		}
	// 	}
	// 	return false;
	// }
	// support.animationend = animationEndEventName();


	support.objectFit = testCSS("object-fit");
	support.objectPosition = testCSS("object-position");


  global.support = support;
	global.testCSS = testCSS;

})(this);

// Avoid `console` errors in browsers that lack a console.
// (function() {
//     var method;
//     var noop = function () {};
//     var methods = [
//         'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
//         'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
//         'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
//         'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
//     ];
//     var length = methods.length;
//     var console = (window.console = window.console || {});
//
//     while (length--) {
//         method = methods[length];
//
//         // Only stub undefined methods.
//         if (!console[method]) {
//             console[method] = noop;
//         }
//     }
// }());

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

(function (global) {

  'use strict';

  function forEach(elements, fn) {
    if(!elements || Array.isArray(elements) && !elements.length) return;
    else if(!elements.length) fn(elements, i);
    else for (var i = 0; i < elements.length; i++) fn(elements[i], i);
  }

  var hasClass = function( el, c ) {
    return el.classList.contains( c );
  };
  var addClass = function( el, c ) {
    forEach(el, function(elem, i){
      elem.classList.add( c );
    });
  };
  var removeClass = function( el, c ) {
    forEach(el, function(elem, i){
      elem.classList.remove( c );
    });
  };

  function toggleClass( el, c ) {
    forEach(el, function(elem, i){
      var fn = hasClass( elem, c ) ? removeClass : addClass;
      fn( elem, c );
    });
  }

  var ffclass = {
    has: hasClass,
    add: addClass,
    remove: removeClass,
    toggle: toggleClass
  };

  // Exports in global environment
  global.ffclass = ffclass;

})(this);

(function(global) {
  //NodeList to array
  function toArray(list) {
    return list ? Array.prototype.slice.call(list) : [];
  }

  //Select only the first node (or #id)
  function $(selector, container) {
    if (!container && selector.indexOf('#') === 0) return document.getElementById(selector.substr(1, selector.length));
    return (container || document).querySelector(selector);
  };

  //Select all the node and convert to array
  function $$(selector, container) {
    return toArray( (container || document).querySelectorAll(selector) );
  }

  global.$ = $;
  global.$$ = $$;
  global.ff = {
    "toArray": toArray
  };

})(this);
