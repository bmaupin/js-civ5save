(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Civ5Save"] = factory();
	else
		root["Civ5Save"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 79);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(1)
  , core      = __webpack_require__(0)
  , ctx       = __webpack_require__(11)
  , hide      = __webpack_require__(12)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(44)('wks')
  , uid        = __webpack_require__(27)
  , Symbol     = __webpack_require__(1).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(9)
  , IE8_DOM_DEFINE = __webpack_require__(56)
  , toPrimitive    = __webpack_require__(41)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(7) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(10)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(117);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(18);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(4)
  , createDesc = __webpack_require__(19);
module.exports = __webpack_require__(7) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(42)
  , defined = __webpack_require__(17);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(58)
  , enumBugKeys = __webpack_require__(45);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(17);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(9)
  , dPs         = __webpack_require__(83)
  , enumBugKeys = __webpack_require__(45)
  , IE_PROTO    = __webpack_require__(43)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(40)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(59).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(4).f
  , has = __webpack_require__(13)
  , TAG = __webpack_require__(3)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(81)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(39)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(38)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 27 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var ctx         = __webpack_require__(11)
  , call        = __webpack_require__(62)
  , isArrayIter = __webpack_require__(63)
  , anObject    = __webpack_require__(9)
  , toLength    = __webpack_require__(26)
  , getIterFn   = __webpack_require__(64)
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;

/***/ }),
/* 29 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(27)('meta')
  , isObject = __webpack_require__(5)
  , has      = __webpack_require__(13)
  , setDesc  = __webpack_require__(4).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(10)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(133), __esModule: true };

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(76);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(74);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(73);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(76);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(6);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Civ5SaveProperty = function Civ5SaveProperty(byteOffset, length) {
  (0, _classCallCheck3.default)(this, Civ5SaveProperty);

  this.byteOffset = byteOffset;
  this.length = length;
};

exports.default = Civ5SaveProperty;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(31);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(6);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(8);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(32);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(33);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Civ5SaveProperty2 = __webpack_require__(34);

var _Civ5SaveProperty3 = _interopRequireDefault(_Civ5SaveProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Civ5SaveIntProperty = function (_Civ5SaveProperty) {
  (0, _inherits3.default)(Civ5SaveIntProperty, _Civ5SaveProperty);

  function Civ5SaveIntProperty() {
    (0, _classCallCheck3.default)(this, Civ5SaveIntProperty);
    return (0, _possibleConstructorReturn3.default)(this, (Civ5SaveIntProperty.__proto__ || (0, _getPrototypeOf2.default)(Civ5SaveIntProperty)).apply(this, arguments));
  }

  (0, _createClass3.default)(Civ5SaveIntProperty, [{
    key: 'getValue',
    value: function getValue(saveData) {
      if (this.length === 1) {
        return saveData.getUint8(this.byteOffset);
      } else if (this.length === 4) {
        return saveData.getUint32(this.byteOffset, true);
      }
    }
  }, {
    key: 'setValue',
    value: function setValue(saveData, newValue) {
      if (this.length === 1) {
        saveData.setUint8(this.byteOffset, newValue);
      } else if (this.length === 4) {
        saveData.setUint32(this.byteOffset, newValue, true);
      }
    }
  }]);
  return Civ5SaveIntProperty;
}(_Civ5SaveProperty3.default);

exports.default = Civ5SaveIntProperty;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(31);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(6);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(8);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(32);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(33);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Civ5SaveProperty2 = __webpack_require__(34);

var _Civ5SaveProperty3 = _interopRequireDefault(_Civ5SaveProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Civ5SaveStringProperty = function (_Civ5SaveProperty) {
  (0, _inherits3.default)(Civ5SaveStringProperty, _Civ5SaveProperty);

  function Civ5SaveStringProperty(byteOffset, length, saveData) {
    (0, _classCallCheck3.default)(this, Civ5SaveStringProperty);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Civ5SaveStringProperty.__proto__ || (0, _getPrototypeOf2.default)(Civ5SaveStringProperty)).call(this, byteOffset, length));

    if (_this._isNullOrUndefined(_this.length)) {
      _this.length = _this._getStringLength(saveData, _this.byteOffset) + 4;
    }
    return _this;
  }

  (0, _createClass3.default)(Civ5SaveStringProperty, [{
    key: '_isNullOrUndefined',
    value: function _isNullOrUndefined(variable) {
      return typeof variable === 'undefined' || variable === null;
    }
  }, {
    key: '_getStringLength',
    value: function _getStringLength(saveData, byteOffset) {
      return saveData.getUint32(byteOffset, true);
    }
  }, {
    key: 'getValue',
    value: function getValue(saveData) {
      return saveData.getString(this.byteOffset + 4, this.length - 4);
    }
  }]);
  return Civ5SaveStringProperty;
}(_Civ5SaveProperty3.default);

exports.default = Civ5SaveStringProperty;

/***/ }),
/* 37 */
/***/ (function(module, exports) {



/***/ }),
/* 38 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(25)
  , $export        = __webpack_require__(2)
  , redefine       = __webpack_require__(57)
  , hide           = __webpack_require__(12)
  , has            = __webpack_require__(13)
  , Iterators      = __webpack_require__(20)
  , $iterCreate    = __webpack_require__(82)
  , setToStringTag = __webpack_require__(23)
  , getPrototypeOf = __webpack_require__(60)
  , ITERATOR       = __webpack_require__(3)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5)
  , document = __webpack_require__(1).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(5);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(22);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(44)('keys')
  , uid    = __webpack_require__(27);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 45 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(86);
var global        = __webpack_require__(1)
  , hide          = __webpack_require__(12)
  , Iterators     = __webpack_require__(20)
  , TO_STRING_TAG = __webpack_require__(3)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(22)
  , TAG = __webpack_require__(3)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(12);
module.exports = function(target, src, safe){
  for(var key in src){
    if(safe && target[key])target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(2)
  , core    = __webpack_require__(0)
  , fails   = __webpack_require__(10);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 51 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(3);

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(1)
  , core           = __webpack_require__(0)
  , LIBRARY        = __webpack_require__(25)
  , wksExt         = __webpack_require__(52)
  , defineProperty = __webpack_require__(4).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(148), __esModule: true };

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(80), __esModule: true };

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(7) && !__webpack_require__(10)(function(){
  return Object.defineProperty(__webpack_require__(40)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(13)
  , toIObject    = __webpack_require__(14)
  , arrayIndexOf = __webpack_require__(84)(false)
  , IE_PROTO     = __webpack_require__(43)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1).document && document.documentElement;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(13)
  , toObject    = __webpack_require__(16)
  , IE_PROTO    = __webpack_require__(43)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(9);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(20)
  , ITERATOR   = __webpack_require__(3)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(47)
  , ITERATOR  = __webpack_require__(3)('iterator')
  , Iterators = __webpack_require__(20);
module.exports = __webpack_require__(0).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var ctx                = __webpack_require__(11)
  , invoke             = __webpack_require__(66)
  , html               = __webpack_require__(59)
  , cel                = __webpack_require__(40)
  , global             = __webpack_require__(1)
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(__webpack_require__(22)(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};

/***/ }),
/* 66 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global      = __webpack_require__(1)
  , core        = __webpack_require__(0)
  , dP          = __webpack_require__(4)
  , DESCRIPTORS = __webpack_require__(7)
  , SPECIES     = __webpack_require__(3)('species');

module.exports = function(KEY){
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(3)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(107), __esModule: true };

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(22);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = __webpack_require__(73);

var _create2 = _interopRequireDefault(_create);

var _setPrototypeOf = __webpack_require__(74);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _from = __webpack_require__(125);

var _from2 = _interopRequireDefault(_from);

var _construct = __webpack_require__(129);

var _construct2 = _interopRequireDefault(_construct);

var _getPrototypeOf = __webpack_require__(31);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(6);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(8);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(32);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(33);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extendableBuiltin(cls) {
  function ExtendableBuiltin() {
    var instance = (0, _construct2.default)(cls, (0, _from2.default)(arguments));
    (0, _setPrototypeOf2.default)(instance, (0, _getPrototypeOf2.default)(this));
    return instance;
  }

  ExtendableBuiltin.prototype = (0, _create2.default)(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (_setPrototypeOf2.default) {
    (0, _setPrototypeOf2.default)(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

// Subclassing DataView in babel requires https://www.npmjs.com/package/babel-plugin-transform-builtin-extend
var Civ5SaveDataView = function (_extendableBuiltin2) {
  (0, _inherits3.default)(Civ5SaveDataView, _extendableBuiltin2);

  function Civ5SaveDataView() {
    (0, _classCallCheck3.default)(this, Civ5SaveDataView);
    return (0, _possibleConstructorReturn3.default)(this, (Civ5SaveDataView.__proto__ || (0, _getPrototypeOf2.default)(Civ5SaveDataView)).apply(this, arguments));
  }

  (0, _createClass3.default)(Civ5SaveDataView, [{
    key: 'getString',
    value: function getString(byteOffset, byteLength) {
      if (typeof TextDecoder === 'function') {
        return new TextDecoder().decode(this.buffer.slice(byteOffset, byteOffset + byteLength));
      } else {
        // https://stackoverflow.com/a/17192845/399105
        var encodedString = String.fromCharCode.apply(null, new Uint8Array(this.buffer.slice(byteOffset, byteOffset + byteLength)));
        return decodeURIComponent(escape(encodedString));
      }
    }
  }]);
  return Civ5SaveDataView;
}(_extendableBuiltin(DataView));

exports.default = Civ5SaveDataView;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(120), __esModule: true };

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(122), __esModule: true };

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(29)
  , createDesc     = __webpack_require__(19)
  , toIObject      = __webpack_require__(14)
  , toPrimitive    = __webpack_require__(41)
  , has            = __webpack_require__(13)
  , IE8_DOM_DEFINE = __webpack_require__(56)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(7) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(135);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(137);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(58)
  , hiddenKeys = __webpack_require__(45).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(31);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(6);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(8);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(32);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(33);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Civ5SaveProperty2 = __webpack_require__(34);

var _Civ5SaveProperty3 = _interopRequireDefault(_Civ5SaveProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Civ5SaveBoolProperty = function (_Civ5SaveProperty) {
  (0, _inherits3.default)(Civ5SaveBoolProperty, _Civ5SaveProperty);

  function Civ5SaveBoolProperty() {
    (0, _classCallCheck3.default)(this, Civ5SaveBoolProperty);
    return (0, _possibleConstructorReturn3.default)(this, (Civ5SaveBoolProperty.__proto__ || (0, _getPrototypeOf2.default)(Civ5SaveBoolProperty)).apply(this, arguments));
  }

  (0, _createClass3.default)(Civ5SaveBoolProperty, [{
    key: 'getValue',
    value: function getValue(saveData) {
      if (this.length === 1) {
        return Boolean(saveData.getUint8(this.byteOffset));
      } else if (this.length === 4) {
        return Boolean(saveData.getUint32(this.byteOffset, true));
      }
    }
  }, {
    key: 'setValue',
    value: function setValue(saveData, newValue) {
      if (this.length === 1) {
        saveData.setUint8(this.byteOffset, Number(newValue));
      } else if (this.length === 4) {
        saveData.setUint32(this.byteOffset, Number(newValue), true);
      }
    }
  }]);
  return Civ5SaveBoolProperty;
}(_Civ5SaveProperty3.default);

exports.default = Civ5SaveBoolProperty;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = __webpack_require__(55);

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = __webpack_require__(91);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(94);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _parseInt = __webpack_require__(95);

var _parseInt2 = _interopRequireDefault(_parseInt);

var _keys = __webpack_require__(100);

var _keys2 = _interopRequireDefault(_keys);

var _assign = __webpack_require__(103);

var _assign2 = _interopRequireDefault(_assign);

var _map = __webpack_require__(70);

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = __webpack_require__(6);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(8);

var _createClass3 = _interopRequireDefault(_createClass2);

var _Civ5SaveDataView = __webpack_require__(72);

var _Civ5SaveDataView2 = _interopRequireDefault(_Civ5SaveDataView);

var _Civ5SavePropertyDefinitions = __webpack_require__(145);

var _Civ5SavePropertyDefinitions2 = _interopRequireDefault(_Civ5SavePropertyDefinitions);

var _Civ5SavePropertyFactory = __webpack_require__(146);

var _Civ5SavePropertyFactory2 = _interopRequireDefault(_Civ5SavePropertyFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Civ5Save = function () {
  function Civ5Save(saveData) {
    (0, _classCallCheck3.default)(this, Civ5Save);

    // TODO: Convert fields and methods starting with underscores to private once it makes it into the spec
    // (https://github.com/tc39/proposals)
    this._saveData = new _Civ5SaveDataView2.default(saveData.buffer);
    this._verifyFileSignature();
    this._gameBuild = this._getGameBuild();
    this._properties = this._getProperties();
  }

  // Use a static factory to instantiate the object since it relies on data that needs to be fetched asynchronously
  // https://stackoverflow.com/a/24686979/399105


  (0, _createClass3.default)(Civ5Save, [{
    key: 'toBlob',
    value: function toBlob() {
      return new Blob([this._saveData], {
        type: 'application/octet-stream'
      });
    }
  }, {
    key: '_verifyFileSignature',
    value: function _verifyFileSignature() {
      if (this._saveData.getString(0, 4) !== 'CIV5') {
        throw new Error('File signature does not match. Is this a Civ 5 savegame?');
      }
    }
  }, {
    key: '_getProperties',
    value: function _getProperties() {
      var previousPropertyName = '';
      var previousPropertySection = 0;
      var properties = new _map2.default();
      var sectionOffsets = this._getSectionOffsets();

      for (var propertyName in _Civ5SavePropertyDefinitions2.default) {
        // Skip string array properties since there isn't much value in implementing them until they're needed, plus the
        // string array containing player colours doesn't seem to have a predictable length (can have 63 or 64 items)
        if (['playerColours', 'playerNames2', 'section23Skip1'].includes(propertyName)) {
          continue;
        }

        // Make propertyDefinition a copy; otherwise it will modify the property for every instance of the Civ5Save class
        var propertyDefinition = (0, _assign2.default)({}, _Civ5SavePropertyDefinitions2.default[propertyName]);

        var propertySection = this._getPropertySection(propertyDefinition);
        // If propertySection is null, it means the property isn't available for the particular game build
        if (this._isNullOrUndefined(propertySection)) {
          continue;
        }

        if (propertyName === 'section30Skip1') {
          if (properties.enabledDLC.getArray().includes('Expansion - Gods and Kings') || properties.enabledDLC.getArray().includes('Expansion - Brave New World')) {
            propertyDefinition.length = 76;
          } else {
            propertyDefinition.length = 72;
          }
        } else if (propertyName === 'section30Skip3') {
          if (properties.enabledDLC.getArray().includes('Expansion - Brave New World')) {
            propertyDefinition.length = 80;
          } else if (properties.enabledDLC.getArray().includes('Expansion - Gods and Kings')) {
            propertyDefinition.length = 76;
          } else {
            propertyDefinition.length = 72;
          }
        }

        var propertyByteOffset = null;
        if (propertySection === previousPropertySection) {
          var previousProperty = properties[previousPropertyName];
          propertyByteOffset = previousProperty.byteOffset + previousProperty.length;

          // Workaround for a couple values that are preceded by string arrays (see comment above)
        } else if (propertyName === 'privateGame') {
          propertyByteOffset = sectionOffsets[propertySection].start - 10;
        } else if (propertyName === 'turnTimerLength') {
          propertyByteOffset = sectionOffsets[propertySection].start - 4;
        } else {
          propertyByteOffset = sectionOffsets[propertySection - 1].start + propertyDefinition.byteOffsetInSection;
        }

        try {
          properties[propertyName] = _Civ5SavePropertyFactory2.default.fromType(propertyDefinition.type, propertyByteOffset, propertyDefinition.length, this._saveData);
        } catch (e) {
          throw new Error('Failure parsing save at property ' + propertyName);
        }

        previousPropertyName = propertyName;
        previousPropertySection = propertySection;
      }

      return properties;
    }
  }, {
    key: '_getSectionOffsets',
    value: function _getSectionOffsets() {
      var SECTION_DELIMITER = [0x40, 0, 0, 0];

      var LAST_PROPERTY_DEFINITION = _Civ5SavePropertyDefinitions2.default[(0, _keys2.default)(_Civ5SavePropertyDefinitions2.default)[(0, _keys2.default)(_Civ5SavePropertyDefinitions2.default).length - 1]];
      var LAST_SECTION = LAST_PROPERTY_DEFINITION.sectionByBuild[(0, _keys2.default)(LAST_PROPERTY_DEFINITION.sectionByBuild)[(0, _keys2.default)(LAST_PROPERTY_DEFINITION.sectionByBuild).length - 1]];

      var saveDataBytes = new Int8Array(this._saveData.buffer);
      var sectionOffsets = [];
      var section = {
        start: 0
      };
      sectionOffsets.push(section);

      for (var byteOffset = 0; byteOffset < saveDataBytes.length; byteOffset++) {
        if (this._areArraysEqual(saveDataBytes.slice(byteOffset, byteOffset + 4), SECTION_DELIMITER)) {
          // Player colour section before build 310700 contains hex values, which can include the section delimiter
          if (Number(this.gameBuild) < 310700) {
            var playerColourSection = 23;
            if (Number(this.gameBuild) >= 262623) {
              playerColourSection = 24;
            }
            if (sectionOffsets.length === playerColourSection) {
              if (byteOffset - sectionOffsets[sectionOffsets.length - 1].start < 270) {
                continue;
              }
            }
          }

          var _section = {
            start: byteOffset
          };
          sectionOffsets.push(_section);
          sectionOffsets[sectionOffsets.length - 2].end = byteOffset - 1;

          if (sectionOffsets.length === LAST_SECTION) {
            break;
          }
        }
      }

      return sectionOffsets;
    }

    // https://stackoverflow.com/a/22395463/399105

  }, {
    key: '_areArraysEqual',
    value: function _areArraysEqual(array1, array2) {
      return array1.length == array2.length && array1.every(function (element, index) {
        return element === array2[index];
      });
    }
  }, {
    key: '_getPropertySection',
    value: function _getPropertySection(propertyDefinition) {
      var propertySection = null;
      for (var build in propertyDefinition.sectionByBuild) {
        if ((0, _parseInt2.default)(this.gameBuild) >= (0, _parseInt2.default)(build)) {
          propertySection = propertyDefinition.sectionByBuild[build];
        }
      }

      return propertySection;
    }
  }, {
    key: '_isNullOrUndefined',
    value: function _isNullOrUndefined(variable) {
      return typeof variable === 'undefined' || variable === null;
    }
  }, {
    key: '_getGameBuild',


    // Game build was only added to the beginning of the savegame in game version 1.0.2. This should be able to get the
    // game build for all savegame versions
    value: function _getGameBuild() {
      var GAME_BUILD_MARKER = 'FINAL_RELEASE';
      var GAME_BUILD_MARKER_ARRAY = function () {
        var gameBuildMarkerArray = [];
        for (var i = 0; i < GAME_BUILD_MARKER.length; i++) {
          gameBuildMarkerArray.push(GAME_BUILD_MARKER.charCodeAt(i));
        }
        return gameBuildMarkerArray;
      }();

      var gameBuildMarkerByteOffset = 0;
      var saveDataBytes = new Int8Array(this._saveData.buffer);
      for (var _byteOffset = 0; _byteOffset <= saveDataBytes.length; _byteOffset++) {
        if (this._areArraysEqual(saveDataBytes.slice(_byteOffset, _byteOffset + GAME_BUILD_MARKER_ARRAY.length), GAME_BUILD_MARKER_ARRAY)) {
          gameBuildMarkerByteOffset = _byteOffset;
          break;
        }
      }

      var gameBuild = '';
      var byteOffset = gameBuildMarkerByteOffset - 2;
      while (saveDataBytes.slice(byteOffset, byteOffset + 1)[0] !== 0) {
        gameBuild = String.fromCharCode(saveDataBytes.slice(byteOffset, byteOffset + 1)) + gameBuild;
        byteOffset--;
      }

      return gameBuild;
    }
  }, {
    key: '_getPropertyIfDefined',
    value: function _getPropertyIfDefined(propertyName) {
      if (this._properties.hasOwnProperty(propertyName)) {
        return this._properties[propertyName].getValue(this._saveData);
      }
    }
  }, {
    key: '_getBeautifiedPropertyIfDefined',
    value: function _getBeautifiedPropertyIfDefined(propertyName) {
      if (this._properties.hasOwnProperty(propertyName)) {
        return this._beautifyPropertyValue(this._properties[propertyName].getValue(this._saveData));
      }
    }
  }, {
    key: '_beautifyPropertyValue',
    value: function _beautifyPropertyValue(propertyValue) {
      propertyValue = propertyValue.split('_')[1];
      propertyValue = propertyValue.toLowerCase();
      propertyValue = propertyValue.charAt(0).toUpperCase() + propertyValue.slice(1);
      return propertyValue;
    }
  }, {
    key: '_beautifyMapFileValue',
    value: function _beautifyMapFileValue(mapFileValue) {
      mapFileValue = mapFileValue.split('/').slice(-1)[0];
      mapFileValue = mapFileValue.split('\\').slice(-1)[0];
      mapFileValue = mapFileValue.substring(0, mapFileValue.lastIndexOf('.'));
      mapFileValue = mapFileValue.replace(/_/g, ' ');
      return mapFileValue;
    }
  }, {
    key: '_setNewGameOption',
    value: function _setNewGameOption(newGameOptionKey, newGameOptionValue) {
      var newSaveData = this._properties.gameOptionsMap.setValue(this._saveData, newGameOptionKey, newGameOptionValue);
      if (!this._isNullOrUndefined(newSaveData)) {
        this._saveData = newSaveData;
      }
    }
  }, {
    key: 'gameBuild',
    get: function get() {
      return this._gameBuild;
    }
  }, {
    key: 'gameVersion',
    get: function get() {
      return this._getPropertyIfDefined('gameVersion');
    }
  }, {
    key: 'currentTurn',
    get: function get() {
      return this._getPropertyIfDefined('currentTurn');
    }
  }, {
    key: 'gameMode',
    get: function get() {
      if (Number(this.gameBuild) >= 230620) {
        return _Civ5SavePropertyDefinitions2.default.gameMode.values[this._properties.gameMode.getValue(this._saveData)];
      }
    }
  }, {
    key: 'difficulty',
    get: function get() {
      return this._getBeautifiedPropertyIfDefined('difficulty');
    }
  }, {
    key: 'startingEra',
    get: function get() {
      return this._getBeautifiedPropertyIfDefined('startingEra');
    }
  }, {
    key: 'currentEra',
    get: function get() {
      return this._getBeautifiedPropertyIfDefined('currentEra');
    }
  }, {
    key: 'gamePace',
    get: function get() {
      return this._getBeautifiedPropertyIfDefined('gamePace');
    }
  }, {
    key: 'mapSize',
    get: function get() {
      return this._getBeautifiedPropertyIfDefined('mapSize');
    }
  }, {
    key: 'mapFile',
    get: function get() {
      var mapFileValue = this._getPropertyIfDefined('mapFile');
      if (!this._isNullOrUndefined(mapFileValue)) {
        return this._beautifyMapFileValue(mapFileValue);
      }
    }
  }, {
    key: 'enabledDLC',
    get: function get() {
      if (this._properties.hasOwnProperty('enabledDLC')) {
        return this._properties.enabledDLC.getArray();
      }
    }
  }, {
    key: 'players',
    get: function get() {
      if (this._isNullOrUndefined(this._players)) {
        this._players = new Array();
        var playerStatuses = this._properties.playerStatuses.getArray();
        for (var i = 0; i < playerStatuses.length; i++) {
          var player = new Object();
          player.status = _Civ5SavePropertyDefinitions2.default.playerStatuses.values[playerStatuses[i]];

          if (this._properties.hasOwnProperty('playerCivilizations')) {
            player.civilization = this._beautifyPropertyValue(this._properties.playerCivilizations.getArray()[i]);
          } else if (i === 0 && this._properties.hasOwnProperty('player1Civilization')) {
            player.civilization = this._beautifyPropertyValue(this._properties.player1Civilization.getValue(this._saveData));
          }

          if (player.status == Civ5Save.PLAYER_STATUSES.NONE) {
            break;
          }

          this._players.push(player);
        }
      }

      return this._players;
    }
  }, {
    key: 'maxTurns',
    get: function get() {
      return this._getPropertyIfDefined('maxTurns');
    },
    set: function set(newValue) {
      this._properties.maxTurns.setValue(this._saveData, newValue);
    }
  }, {
    key: 'turnTimerLength',
    get: function get() {
      return this._getPropertyIfDefined('turnTimerLength');
    },
    set: function set(newValue) {
      this._properties.turnTimerLength.setValue(this._saveData, newValue);
    }
  }, {
    key: 'privateGame',
    get: function get() {
      return this._getPropertyIfDefined('privateGame');
    },
    set: function set(newValue) {
      this._properties.privateGame.setValue(this._saveData, newValue);
    }
  }, {
    key: 'timeVictory',
    get: function get() {
      return this._getPropertyIfDefined('timeVictory');
    },
    set: function set(newValue) {
      this._properties.timeVictory.setValue(this._saveData, newValue);
    }
  }, {
    key: 'scienceVictory',
    get: function get() {
      return this._getPropertyIfDefined('scienceVictory');
    },
    set: function set(newValue) {
      this._properties.scienceVictory.setValue(this._saveData, newValue);
    }
  }, {
    key: 'dominationVictory',
    get: function get() {
      return this._getPropertyIfDefined('dominationVictory');
    },
    set: function set(newValue) {
      this._properties.dominationVictory.setValue(this._saveData, newValue);
    }
  }, {
    key: 'culturalVictory',
    get: function get() {
      return this._getPropertyIfDefined('culturalVictory');
    },
    set: function set(newValue) {
      this._properties.culturalVictory.setValue(this._saveData, newValue);
    }
  }, {
    key: 'diplomaticVictory',
    get: function get() {
      return this._getPropertyIfDefined('diplomaticVictory');
    },
    set: function set(newValue) {
      this._properties.diplomaticVictory.setValue(this._saveData, newValue);
    }
  }, {
    key: 'alwaysPeace',
    get: function get() {
      return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_ALWAYS_PEACE');
    },
    set: function set(newValue) {
      this._setNewGameOption('GAMEOPTION_ALWAYS_PEACE', newValue);
    }
  }, {
    key: 'alwaysWar',
    get: function get() {
      return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_ALWAYS_WAR');
    },
    set: function set(newValue) {
      this._setNewGameOption('GAMEOPTION_ALWAYS_WAR', newValue);
    }
  }, {
    key: 'completeKills',
    get: function get() {
      return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_COMPLETE_KILLS');
    },
    set: function set(newValue) {
      this._setNewGameOption('GAMEOPTION_COMPLETE_KILLS', newValue);
    }
  }, {
    key: 'lockMods',
    get: function get() {
      return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_LOCK_MODS');
    },
    set: function set(newValue) {
      this._setNewGameOption('GAMEOPTION_LOCK_MODS', newValue);
    }
  }, {
    key: 'newRandomSeed',
    get: function get() {
      return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NEW_RANDOM_SEED');
    },
    set: function set(newValue) {
      this._setNewGameOption('GAMEOPTION_NEW_RANDOM_SEED', newValue);
    }
  }, {
    key: 'noBarbarians',
    get: function get() {
      return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NO_BARBARIANS');
    },
    set: function set(newValue) {
      this._setNewGameOption('GAMEOPTION_NO_BARBARIANS', newValue);
    }
  }, {
    key: 'noChangingWarPeace',
    get: function get() {
      return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NO_CHANGING_WAR_PEACE');
    },
    set: function set(newValue) {
      this._setNewGameOption('GAMEOPTION_NO_CHANGING_WAR_PEACE', newValue);
    }
  }, {
    key: 'noCityRazing',
    get: function get() {
      return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NO_CITY_RAZING');
    },
    set: function set(newValue) {
      this._setNewGameOption('GAMEOPTION_NO_CITY_RAZING', newValue);
    }
  }, {
    key: 'noCultureOverviewUI',
    get: function get() {
      return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NO_CULTURE_OVERVIEW_UI');
    },
    set: function set(newValue) {
      this._setNewGameOption('GAMEOPTION_NO_CULTURE_OVERVIEW_UI', newValue);
    }
  }, {
    key: 'noEspionage',
    get: function get() {
      return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NO_ESPIONAGE');
    },
    set: function set(newValue) {
      this._setNewGameOption('GAMEOPTION_NO_ESPIONAGE', newValue);
    }
  }, {
    key: 'noHappiness',
    get: function get() {
      return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NO_HAPPINESS');
    },
    set: function set(newValue) {
      this._setNewGameOption('GAMEOPTION_NO_HAPPINESS', newValue);
    }
  }, {
    key: 'noPolicies',
    get: function get() {
      return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NO_POLICIES');
    },
    set: function set(newValue) {
      this._setNewGameOption('GAMEOPTION_NO_POLICIES', newValue);
    }
  }, {
    key: 'noReligion',
    get: function get() {
      return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NO_RELIGION');
    },
    set: function set(newValue) {
      this._setNewGameOption('GAMEOPTION_NO_RELIGION', newValue);
    }
  }, {
    key: 'noScience',
    get: function get() {
      return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NO_SCIENCE');
    },
    set: function set(newValue) {
      this._setNewGameOption('GAMEOPTION_NO_SCIENCE', newValue);
    }
  }, {
    key: 'noWorldCongress',
    get: function get() {
      return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_NO_LEAGUES');
    },
    set: function set(newValue) {
      this._setNewGameOption('GAMEOPTION_NO_LEAGUES', newValue);
    }
  }, {
    key: 'oneCityChallenge',
    get: function get() {
      return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_ONE_CITY_CHALLENGE');
    },
    set: function set(newValue) {
      this._setNewGameOption('GAMEOPTION_ONE_CITY_CHALLENGE', newValue);
    }

    // https://github.com/Bownairo/Civ5SaveEditor

  }, {
    key: 'pitboss',
    get: function get() {
      return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_PITBOSS');
    },
    set: function set(newValue) {
      this._setNewGameOption('GAMEOPTION_PITBOSS', newValue);
    }
  }, {
    key: 'policySaving',
    get: function get() {
      return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_POLICY_SAVING');
    },
    set: function set(newValue) {
      this._setNewGameOption('GAMEOPTION_POLICY_SAVING', newValue);
    }
  }, {
    key: 'promotionSaving',
    get: function get() {
      return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_PROMOTION_SAVING');
    },
    set: function set(newValue) {
      this._setNewGameOption('GAMEOPTION_PROMOTION_SAVING', newValue);
    }
  }, {
    key: 'ragingBarbarians',
    get: function get() {
      return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_RAGING_BARBARIANS');
    },
    set: function set(newValue) {
      this._setNewGameOption('GAMEOPTION_RAGING_BARBARIANS', newValue);
    }
  }, {
    key: 'randomPersonalities',
    get: function get() {
      return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_RANDOM_PERSONALITIES');
    },
    set: function set(newValue) {
      this._setNewGameOption('GAMEOPTION_RANDOM_PERSONALITIES', newValue);
    }
  }, {
    key: 'turnTimerEnabled',
    get: function get() {
      return this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_END_TURN_TIMER_ENABLED');
    },
    set: function set(newValue) {
      this._setNewGameOption('GAMEOPTION_END_TURN_TIMER_ENABLED', newValue);
    }

    // http://blog.frank-mich.com/civilization-v-how-to-change-turn-type-of-a-started-game/

  }, {
    key: 'turnMode',
    get: function get() {
      if (this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_DYNAMIC_TURNS') === true) {
        return Civ5Save.TURN_MODES.HYBRID;
      } else if (this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_SIMULTANEOUS_TURNS') === true) {
        return Civ5Save.TURN_MODES.SIMULTANEOUS;
      } else if (this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_DYNAMIC_TURNS') === false && this._properties.gameOptionsMap.getValue(this._saveData, 'GAMEOPTION_SIMULTANEOUS_TURNS') === false) {
        return Civ5Save.TURN_MODES.SEQUENTIAL;
      }
    },
    set: function set(newValue) {
      if (newValue === Civ5Save.TURN_MODES.HYBRID) {
        this._setNewGameOption('GAMEOPTION_DYNAMIC_TURNS', true);
        this._setNewGameOption('GAMEOPTION_SIMULTANEOUS_TURNS', false);
      } else if (newValue === Civ5Save.TURN_MODES.SIMULTANEOUS) {
        this._setNewGameOption('GAMEOPTION_DYNAMIC_TURNS', false);
        this._setNewGameOption('GAMEOPTION_SIMULTANEOUS_TURNS', true);
      } else if (newValue === Civ5Save.TURN_MODES.SEQUENTIAL) {
        this._setNewGameOption('GAMEOPTION_DYNAMIC_TURNS', false);
        this._setNewGameOption('GAMEOPTION_SIMULTANEOUS_TURNS', false);
      }
    }
  }], [{
    key: 'fromFile',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(saveFile) {
        var saveData;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Civ5Save.loadData(saveFile);

              case 2:
                saveData = _context.sent;
                return _context.abrupt('return', new Civ5Save(saveData));

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fromFile(_x) {
        return _ref.apply(this, arguments);
      }

      return fromFile;
    }()
  }, {
    key: 'loadData',
    value: function loadData(saveFile) {
      return new _promise2.default(function (resolve, reject) {
        var reader = new FileReader();

        reader.onload = function () {
          // Use a DataView for the savegame data since the ArrayBuffer returned by reader.result can't be used to
          // manipulate the data. A typed array such as Int8Array wouldn't be ideal either since the data contains types
          // of variable lengths
          resolve(new DataView(reader.result));
        };
        reader.onerror = function () {
          reject(reader.error);
        };

        reader.readAsArrayBuffer(saveFile);
      });
    }
  }]);
  return Civ5Save;
}();

// TODO: Turn these into class fields once the proposal makes it into the spec (https://github.com/tc39/proposals)


Civ5Save.GAME_MODES = {
  SINGLE: 'Single player',
  MULTI: 'Multiplayer',
  HOTSEAT: 'Hotseat'
};

Civ5Save.PLAYER_STATUSES = {
  AI: 'AI',
  DEAD: 'Dead',
  HUMAN: 'Human',
  NONE: 'None'
};

Civ5Save.TURN_MODES = {
  HYBRID: 'Hybrid',
  SEQUENTIAL: 'Sequential',
  SIMULTANEOUS: 'Simultaneous'
};

exports.default = Civ5Save;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(37);
__webpack_require__(24);
__webpack_require__(46);
__webpack_require__(88);
module.exports = __webpack_require__(0).Promise;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(38)
  , defined   = __webpack_require__(17);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(21)
  , descriptor     = __webpack_require__(19)
  , setToStringTag = __webpack_require__(23)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(12)(IteratorPrototype, __webpack_require__(3)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(4)
  , anObject = __webpack_require__(9)
  , getKeys  = __webpack_require__(15);

module.exports = __webpack_require__(7) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(14)
  , toLength  = __webpack_require__(26)
  , toIndex   = __webpack_require__(85);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(38)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(87)
  , step             = __webpack_require__(61)
  , Iterators        = __webpack_require__(20)
  , toIObject        = __webpack_require__(14);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(39)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY            = __webpack_require__(25)
  , global             = __webpack_require__(1)
  , ctx                = __webpack_require__(11)
  , classof            = __webpack_require__(47)
  , $export            = __webpack_require__(2)
  , isObject           = __webpack_require__(5)
  , aFunction          = __webpack_require__(18)
  , anInstance         = __webpack_require__(48)
  , forOf              = __webpack_require__(28)
  , speciesConstructor = __webpack_require__(89)
  , task               = __webpack_require__(65).set
  , microtask          = __webpack_require__(90)()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[__webpack_require__(3)('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(49)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
__webpack_require__(23)($Promise, PROMISE);
__webpack_require__(67)(PROMISE);
Wrapper = __webpack_require__(0)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(68)(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = __webpack_require__(9)
  , aFunction = __webpack_require__(18)
  , SPECIES   = __webpack_require__(3)('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(1)
  , macrotask = __webpack_require__(65).set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = __webpack_require__(22)(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(92);


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(93);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 93 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__(55);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(96), __esModule: true };

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(97);
module.exports = parseInt;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(2)
  , $parseInt = __webpack_require__(98);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(1).parseInt
  , $trim     = __webpack_require__(99).trim
  , ws        = __webpack_require__(69)
  , hex       = /^[\-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix){
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(2)
  , defined = __webpack_require__(17)
  , fails   = __webpack_require__(10)
  , spaces  = __webpack_require__(69)
  , space   = '[' + spaces + ']'
  , non     = '\u200b\u0085'
  , ltrim   = RegExp('^' + space + space + '*')
  , rtrim   = RegExp(space + space + '*$');

var exporter = function(KEY, exec, ALIAS){
  var exp   = {};
  var FORCE = fails(function(){
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if(ALIAS)exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function(string, TYPE){
  string = String(defined(string));
  if(TYPE & 1)string = string.replace(ltrim, '');
  if(TYPE & 2)string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(101), __esModule: true };

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(102);
module.exports = __webpack_require__(0).Object.keys;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(16)
  , $keys    = __webpack_require__(15);

__webpack_require__(50)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(104), __esModule: true };

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(105);
module.exports = __webpack_require__(0).Object.assign;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(2);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(106)});

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(15)
  , gOPS     = __webpack_require__(51)
  , pIE      = __webpack_require__(29)
  , toObject = __webpack_require__(16)
  , IObject  = __webpack_require__(42)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(10)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(37);
__webpack_require__(24);
__webpack_require__(46);
__webpack_require__(108);
__webpack_require__(114);
module.exports = __webpack_require__(0).Map;

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(109);

// 23.1 Map Objects
module.exports = __webpack_require__(110)('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP          = __webpack_require__(4).f
  , create      = __webpack_require__(21)
  , redefineAll = __webpack_require__(49)
  , ctx         = __webpack_require__(11)
  , anInstance  = __webpack_require__(48)
  , defined     = __webpack_require__(17)
  , forOf       = __webpack_require__(28)
  , $iterDefine = __webpack_require__(39)
  , step        = __webpack_require__(61)
  , setSpecies  = __webpack_require__(67)
  , DESCRIPTORS = __webpack_require__(7)
  , fastKey     = __webpack_require__(30).fastKey
  , SIZE        = DESCRIPTORS ? '_s' : 'size';

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        anInstance(this, C, 'forEach');
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)dP(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global         = __webpack_require__(1)
  , $export        = __webpack_require__(2)
  , meta           = __webpack_require__(30)
  , fails          = __webpack_require__(10)
  , hide           = __webpack_require__(12)
  , redefineAll    = __webpack_require__(49)
  , forOf          = __webpack_require__(28)
  , anInstance     = __webpack_require__(48)
  , isObject       = __webpack_require__(5)
  , setToStringTag = __webpack_require__(23)
  , dP             = __webpack_require__(4).f
  , each           = __webpack_require__(111)(0)
  , DESCRIPTORS    = __webpack_require__(7);

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  if(!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function(target, iterable){
      anInstance(target, C, NAME, '_c');
      target._c = new Base;
      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','),function(KEY){
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
        anInstance(this, C, KEY);
        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    if('size' in proto)dP(C.prototype, 'size', {
      get: function(){
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = __webpack_require__(11)
  , IObject  = __webpack_require__(42)
  , toObject = __webpack_require__(16)
  , toLength = __webpack_require__(26)
  , asc      = __webpack_require__(112);
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(113);

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5)
  , isArray  = __webpack_require__(71)
  , SPECIES  = __webpack_require__(3)('species');

module.exports = function(original){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = __webpack_require__(2);

$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(115)('Map')});

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(47)
  , from    = __webpack_require__(116);
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(28);

module.exports = function(iter, ITERATOR){
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(118), __esModule: true };

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(119);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(2);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(7), 'Object', {defineProperty: __webpack_require__(4).f});

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(121);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(2)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(21)});

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(123);
module.exports = __webpack_require__(0).Object.setPrototypeOf;

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(2);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(124).set});

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(5)
  , anObject = __webpack_require__(9);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(11)(Function.call, __webpack_require__(75).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(126), __esModule: true };

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(24);
__webpack_require__(127);
module.exports = __webpack_require__(0).Array.from;

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(11)
  , $export        = __webpack_require__(2)
  , toObject       = __webpack_require__(16)
  , call           = __webpack_require__(62)
  , isArrayIter    = __webpack_require__(63)
  , toLength       = __webpack_require__(26)
  , createProperty = __webpack_require__(128)
  , getIterFn      = __webpack_require__(64);

$export($export.S + $export.F * !__webpack_require__(68)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(4)
  , createDesc      = __webpack_require__(19);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(130), __esModule: true };

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(131);
module.exports = __webpack_require__(0).Reflect.construct;

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export    = __webpack_require__(2)
  , create     = __webpack_require__(21)
  , aFunction  = __webpack_require__(18)
  , anObject   = __webpack_require__(9)
  , isObject   = __webpack_require__(5)
  , fails      = __webpack_require__(10)
  , bind       = __webpack_require__(132)
  , rConstruct = (__webpack_require__(1).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function(){
  function F(){}
  return !(rConstruct(function(){}, [], F) instanceof F);
});
var ARGS_BUG = !fails(function(){
  rConstruct(function(){});
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /*, newTarget*/){
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if(ARGS_BUG && !NEW_TARGET_BUG)return rConstruct(Target, args, newTarget);
    if(Target == newTarget){
      // w/o altered newTarget, optimization for 0-4 arguments
      switch(args.length){
        case 0: return new Target;
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args));
    }
    // with altered newTarget, not support built-in constructors
    var proto    = newTarget.prototype
      , instance = create(isObject(proto) ? proto : Object.prototype)
      , result   = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction  = __webpack_require__(18)
  , isObject   = __webpack_require__(5)
  , invoke     = __webpack_require__(66)
  , arraySlice = [].slice
  , factories  = {};

var construct = function(F, len, args){
  if(!(len in factories)){
    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /*, args... */){
  var fn       = aFunction(this)
    , partArgs = arraySlice.call(arguments, 1);
  var bound = function(/* args... */){
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if(isObject(fn.prototype))bound.prototype = fn.prototype;
  return bound;
};

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(134);
module.exports = __webpack_require__(0).Object.getPrototypeOf;

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = __webpack_require__(16)
  , $getPrototypeOf = __webpack_require__(60);

__webpack_require__(50)('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(136), __esModule: true };

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(24);
__webpack_require__(46);
module.exports = __webpack_require__(52).f('iterator');

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(138), __esModule: true };

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(139);
__webpack_require__(37);
__webpack_require__(143);
__webpack_require__(144);
module.exports = __webpack_require__(0).Symbol;

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(1)
  , has            = __webpack_require__(13)
  , DESCRIPTORS    = __webpack_require__(7)
  , $export        = __webpack_require__(2)
  , redefine       = __webpack_require__(57)
  , META           = __webpack_require__(30).KEY
  , $fails         = __webpack_require__(10)
  , shared         = __webpack_require__(44)
  , setToStringTag = __webpack_require__(23)
  , uid            = __webpack_require__(27)
  , wks            = __webpack_require__(3)
  , wksExt         = __webpack_require__(52)
  , wksDefine      = __webpack_require__(53)
  , keyOf          = __webpack_require__(140)
  , enumKeys       = __webpack_require__(141)
  , isArray        = __webpack_require__(71)
  , anObject       = __webpack_require__(9)
  , toIObject      = __webpack_require__(14)
  , toPrimitive    = __webpack_require__(41)
  , createDesc     = __webpack_require__(19)
  , _create        = __webpack_require__(21)
  , gOPNExt        = __webpack_require__(142)
  , $GOPD          = __webpack_require__(75)
  , $DP            = __webpack_require__(4)
  , $keys          = __webpack_require__(15)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(77).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(29).f  = $propertyIsEnumerable;
  __webpack_require__(51).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(25)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(12)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(15)
  , toIObject = __webpack_require__(14);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(15)
  , gOPS    = __webpack_require__(51)
  , pIE     = __webpack_require__(29);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(14)
  , gOPN      = __webpack_require__(77).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(53)('asyncIterator');

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(53)('observable');

/***/ }),
/* 145 */
/***/ (function(module, exports) {

module.exports = {
	"fileSignature": {
		"byteOffsetInSection": 0,
		"length": 4,
		"sectionByBuild": {
			"98650": 1
		},
		"type": "string"
	},
	"saveGameVersion": {
		"byteOffsetInSection": 4,
		"length": 4,
		"sectionByBuild": {
			"98650": 1
		},
		"type": "int"
	},
	"gameVersion": {
		"byteOffsetInSection": 8,
		"length": null,
		"sectionByBuild": {
			"230620": 1
		},
		"type": "string"
	},
	"gameBuild": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"230620": 1
		},
		"type": "string"
	},
	"currentTurn": {
		"byteOffsetInSection": null,
		"length": 4,
		"sectionByBuild": {
			"98650": 1
		},
		"type": "int"
	},
	"gameMode": {
		"_comment": "This property exists in all versions but only seems to gain significance around build 230620",
		"byteOffsetInSection": null,
		"length": 1,
		"sectionByBuild": {
			"98650": 1
		},
		"type": "int",
		"values": [
			"Single player",
			"Multiplayer",
			"Hotseat"
		]
	},
	"player1Civilization": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 1
		},
		"type": "string"
	},
	"difficulty": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 1
		},
		"type": "string"
	},
	"startingEra": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 1
		},
		"type": "string"
	},
	"currentEra": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 1
		},
		"type": "string"
	},
	"gamePace": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 1
		},
		"type": "string"
	},
	"mapSize": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 1
		},
		"type": "string"
	},
	"mapFile": {
		"_comment": "The map file appears multiple times; I have no idea why (see section19Map)",
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 1
		},
		"type": "string"
	},
	"enabledDLC": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 1
		},
		"type": "dlcStringArray"
	},
	"playerStatuses": {
		"_comment": "Players after the first player marked as none seem to be superfluous. Length is number of items, not bytes.",
		"byteOffsetInSection": 4,
		"length": 64,
		"sectionByBuild": {
			"98650": 4
		},
		"type": "intArray",
		"values": [
			"",
			"AI",
			"Dead",
			"Human",
			"None"
		]
	},
	"playerCivilizations": {
		"_comment": "Starting with build 310700 this is a list of strings. Before that I'm not sure if it's a list of bytes or not there at all. Length is number of items, not bytes.",
		"byteOffsetInSection": 4,
		"length": 64,
		"sectionByBuild": {
			"310700": 8
		},
		"type": "stringArray"
	},
	"section19Skip1": {
		"byteOffsetInSection": 264,
		"length": null,
		"sectionByBuild": {
			"98650": 17,
			"262623": 18,
			"395070": 19
		},
		"type": "string"
	},
	"section19Skip2": {
		"byteOffsetInSection": null,
		"length": 7,
		"sectionByBuild": {
			"98650": 17,
			"262623": 18,
			"395070": 19
		},
		"type": "bytes"
	},
	"section19Map": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 17,
			"262623": 18,
			"395070": 19
		},
		"type": "string"
	},
	"section19Skip3": {
		"byteOffsetInSection": null,
		"length": 4,
		"sectionByBuild": {
			"98650": 17,
			"262623": 18,
			"395070": 19
		},
		"type": "bytes"
	},
	"maxTurns": {
		"_comment": "https://gaming.stackexchange.com/a/273907/154341",
		"byteOffsetInSection": null,
		"length": 4,
		"sectionByBuild": {
			"98650": 17,
			"262623": 18,
			"395070": 19
		},
		"type": "int"
	},
	"playerNames2": {
		"_comment": "This seems to be the second place in the file with player names. There's enough space for 64 names",
		"byteOffsetInSection": 4,
		"length": null,
		"sectionByBuild": {
			"98650": 21,
			"262623": 22,
			"395070": 23
		},
		"type": "stringArray"
	},
	"section23Skip1": {
		"byteOffsetInSection": null,
		"length": 4,
		"sectionByBuild": {
			"98650": 21,
			"262623": 22,
			"395070": 23
		},
		"type": "int"
	},
	"turnTimerLength": {
		"_comment": "https://steamcommunity.com/app/8930/discussions/0/864973761026018000/#c619568192863618582",
		"byteOffsetInSection": null,
		"length": 4,
		"sectionByBuild": {
			"98650": 21,
			"262623": 22,
			"395070": 23
		},
		"type": "int"
	},
	"playerColours": {
		"_comment": "Starting with build 310700 this is a list of strings. Before that it's a list of bytes. Seems like it can have 63 or 64 items.",
		"byteOffsetInSection": 4,
		"length": null,
		"sectionByBuild": {
			"98650": 23,
			"262623": 24,
			"395070": 25
		},
		"type": "stringArray"
	},
	"privateGame": {
		"_comment": "https://github.com/Canardlaquay/Civ5SavePrivate",
		"byteOffsetInSection": null,
		"length": 1,
		"sectionByBuild": {
			"98650": 23,
			"262623": 24,
			"395070": 25
		},
		"type": "bool"
	},
	"section29Timer1": {
		"byteOffsetInSection": 269,
		"length": null,
		"sectionByBuild": {
			"98650": 27,
			"262623": 28,
			"395070": 29
		},
		"type": "string"
	},
	"section29Skip1": {
		"byteOffsetInSection": null,
		"length": 12,
		"sectionByBuild": {
			"98650": 27,
			"262623": 28,
			"395070": 29
		},
		"type": "bytes"
	},
	"section29TurnTimer": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 27,
			"262623": 28,
			"395070": 29
		},
		"type": "string"
	},
	"section29TxtKeyTurnTimer": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 27,
			"262623": 28,
			"395070": 29
		},
		"type": "string"
	},
	"section29Timer2": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 27,
			"262623": 28,
			"395070": 29
		},
		"type": "string"
	},
	"section29Skip2": {
		"byteOffsetInSection": null,
		"length": 25,
		"sectionByBuild": {
			"98650": 27,
			"262623": 28,
			"395070": 29
		},
		"type": "bytes"
	},
	"timeVictory": {
		"_comment": "https://gaming.stackexchange.com/a/273907/154341",
		"byteOffsetInSection": null,
		"length": 1,
		"sectionByBuild": {
			"98650": 27,
			"262623": 28,
			"395070": 29
		},
		"type": "bool"
	},
	"scienceVictory": {
		"_comment": "https://gaming.stackexchange.com/a/273907/154341",
		"byteOffsetInSection": null,
		"length": 1,
		"sectionByBuild": {
			"98650": 27,
			"262623": 28,
			"395070": 29
		},
		"type": "bool"
	},
	"dominationVictory": {
		"_comment": "https://gaming.stackexchange.com/a/273907/154341",
		"byteOffsetInSection": null,
		"length": 1,
		"sectionByBuild": {
			"98650": 27,
			"262623": 28,
			"395070": 29
		},
		"type": "bool"
	},
	"culturalVictory": {
		"_comment": "https://gaming.stackexchange.com/a/273907/154341",
		"byteOffsetInSection": null,
		"length": 1,
		"sectionByBuild": {
			"98650": 27,
			"262623": 28,
			"395070": 29
		},
		"type": "bool"
	},
	"diplomaticVictory": {
		"_comment": "https://gaming.stackexchange.com/a/273907/154341",
		"byteOffsetInSection": null,
		"length": 1,
		"sectionByBuild": {
			"98650": 27,
			"262623": 28,
			"395070": 29
		},
		"type": "bool"
	},
	"section30Skip1": {
		"_comment": "This section is 76 bytes long if either expansion pack is installed. Otherwise it's 72 bytes long.",
		"byteOffsetInSection": 4,
		"length": null,
		"sectionByBuild": {
			"98650": 28,
			"262623": 29,
			"395070": 30
		},
		"type": "bytes"
	},
	"section30MapSize1": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 28,
			"262623": 29,
			"395070": 30
		},
		"type": "string"
	},
	"section30TxtKeyMapHelp": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 28,
			"262623": 29,
			"395070": 30
		},
		"type": "string"
	},
	"section30Skip2": {
		"byteOffsetInSection": null,
		"length": 8,
		"sectionByBuild": {
			"98650": 28,
			"262623": 29,
			"395070": 30
		},
		"type": "bytes"
	},
	"section30MapSize2": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 28,
			"262623": 29,
			"395070": 30
		},
		"type": "string"
	},
	"section30TxtKeyMapSize": {
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 28,
			"262623": 29,
			"395070": 30
		},
		"type": "string"
	},
	"section30MapSize3": {
		"_comment": "This section is 80 bytes long if Brave New World is installed. It's 76 bytes if only Gods and Kings is installed. Otherwise it's 72 bytes long.",
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 28,
			"262623": 29,
			"395070": 30
		},
		"type": "string"
	},
	"section30Skip3": {
		"byteOffsetInSection": null,
		"length": 72,
		"sectionByBuild": {
			"98650": 28,
			"262623": 29,
			"395070": 30
		},
		"type": "bytes"
	},
	"gameOptionsMap": {
		"_comment": "This is where a large chunk of game options are stored (http://civilization.wikia.com/wiki/Module:Data/Civ5/BNW/GameOptions)",
		"byteOffsetInSection": null,
		"length": null,
		"sectionByBuild": {
			"98650": 28,
			"262623": 29,
			"395070": 30
		},
		"type": "stringToBoolMap"
	}
};

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(6);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(8);

var _createClass3 = _interopRequireDefault(_createClass2);

var _Civ5SaveBoolProperty = __webpack_require__(78);

var _Civ5SaveBoolProperty2 = _interopRequireDefault(_Civ5SaveBoolProperty);

var _Civ5SaveDLCStringArray = __webpack_require__(147);

var _Civ5SaveDLCStringArray2 = _interopRequireDefault(_Civ5SaveDLCStringArray);

var _Civ5SaveIntArray = __webpack_require__(150);

var _Civ5SaveIntArray2 = _interopRequireDefault(_Civ5SaveIntArray);

var _Civ5SaveIntProperty = __webpack_require__(35);

var _Civ5SaveIntProperty2 = _interopRequireDefault(_Civ5SaveIntProperty);

var _Civ5SaveProperty = __webpack_require__(34);

var _Civ5SaveProperty2 = _interopRequireDefault(_Civ5SaveProperty);

var _Civ5SaveStringArray = __webpack_require__(151);

var _Civ5SaveStringArray2 = _interopRequireDefault(_Civ5SaveStringArray);

var _Civ5SaveStringProperty = __webpack_require__(36);

var _Civ5SaveStringProperty2 = _interopRequireDefault(_Civ5SaveStringProperty);

var _Civ5SaveStringToBoolMap = __webpack_require__(152);

var _Civ5SaveStringToBoolMap2 = _interopRequireDefault(_Civ5SaveStringToBoolMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Civ5SavePropertyFactory = function () {
  function Civ5SavePropertyFactory() {
    (0, _classCallCheck3.default)(this, Civ5SavePropertyFactory);
  }

  (0, _createClass3.default)(Civ5SavePropertyFactory, null, [{
    key: 'fromType',
    value: function fromType(type, byteOffset, length, saveData) {
      switch (type) {
        case 'bool':
          return new _Civ5SaveBoolProperty2.default(byteOffset, length);

        case 'bytes':
          return new _Civ5SaveProperty2.default(byteOffset, length);

        case 'dlcStringArray':
          return new _Civ5SaveDLCStringArray2.default(byteOffset, saveData);

        case 'int':
          return new _Civ5SaveIntProperty2.default(byteOffset, length);

        case 'intArray':
          return new _Civ5SaveIntArray2.default(byteOffset, length, saveData);

        case 'string':
          return new _Civ5SaveStringProperty2.default(byteOffset, length, saveData);

        case 'stringArray':
          return new _Civ5SaveStringArray2.default(byteOffset, length, saveData);

        case 'stringToBoolMap':
          return new _Civ5SaveStringToBoolMap2.default(byteOffset, saveData);

        default:
          throw new Error('Property type ' + type + ' not handled');
      }
    }
  }]);
  return Civ5SavePropertyFactory;
}();

exports.default = Civ5SavePropertyFactory;

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _freeze = __webpack_require__(54);

var _freeze2 = _interopRequireDefault(_freeze);

var _classCallCheck2 = __webpack_require__(6);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(8);

var _createClass3 = _interopRequireDefault(_createClass2);

var _Civ5SaveIntProperty = __webpack_require__(35);

var _Civ5SaveIntProperty2 = _interopRequireDefault(_Civ5SaveIntProperty);

var _Civ5SaveStringProperty = __webpack_require__(36);

var _Civ5SaveStringProperty2 = _interopRequireDefault(_Civ5SaveStringProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Civ5SaveDLCStringArray = function () {
  function Civ5SaveDLCStringArray(byteOffset, saveData) {
    (0, _classCallCheck3.default)(this, Civ5SaveDLCStringArray);

    this.byteOffset = byteOffset;
    this.length = 4;
    this._array = new Array();
    this._size = new _Civ5SaveIntProperty2.default(this.byteOffset, 4, saveData);

    if (this._getSize(saveData) > 0) {
      var currentByteOffset = this.byteOffset + 4;
      for (var i = 0; i < this._getSize(saveData); i++) {
        // Skip 16 byte unique identifier followed by 0100 0000
        currentByteOffset += 20;
        var dlcName = new _Civ5SaveStringProperty2.default(currentByteOffset, null, saveData);
        currentByteOffset += dlcName.length;

        this._array.push(dlcName.getValue(saveData));
      }

      this.length = currentByteOffset - this.byteOffset;
    }

    (0, _freeze2.default)(this._array);
  }

  (0, _createClass3.default)(Civ5SaveDLCStringArray, [{
    key: '_getSize',
    value: function _getSize(saveData) {
      return this._size.getValue(saveData);
    }
  }, {
    key: 'getArray',
    value: function getArray() {
      return this._array;
    }
  }]);
  return Civ5SaveDLCStringArray;
}();

exports.default = Civ5SaveDLCStringArray;

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(149);
module.exports = __webpack_require__(0).Object.freeze;

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(5)
  , meta     = __webpack_require__(30).onFreeze;

__webpack_require__(50)('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _freeze = __webpack_require__(54);

var _freeze2 = _interopRequireDefault(_freeze);

var _classCallCheck2 = __webpack_require__(6);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(8);

var _createClass3 = _interopRequireDefault(_createClass2);

var _Civ5SaveIntProperty = __webpack_require__(35);

var _Civ5SaveIntProperty2 = _interopRequireDefault(_Civ5SaveIntProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Civ5SaveIntArray = function () {
  function Civ5SaveIntArray(byteOffset, items, saveData) {
    (0, _classCallCheck3.default)(this, Civ5SaveIntArray);

    this.byteOffset = byteOffset;
    this._array = new Array();

    var currentByteOffset = this.byteOffset;
    for (var i = 0; i < items; i++) {
      var arrayItem = new _Civ5SaveIntProperty2.default(currentByteOffset, 4, saveData);
      currentByteOffset += arrayItem.length;
      this._array.push(arrayItem.getValue(saveData));
    }

    this.length = currentByteOffset - this.byteOffset;
    (0, _freeze2.default)(this._array);
  }

  (0, _createClass3.default)(Civ5SaveIntArray, [{
    key: 'getArray',
    value: function getArray() {
      return this._array;
    }
  }]);
  return Civ5SaveIntArray;
}();

exports.default = Civ5SaveIntArray;

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _freeze = __webpack_require__(54);

var _freeze2 = _interopRequireDefault(_freeze);

var _classCallCheck2 = __webpack_require__(6);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(8);

var _createClass3 = _interopRequireDefault(_createClass2);

var _Civ5SaveStringProperty = __webpack_require__(36);

var _Civ5SaveStringProperty2 = _interopRequireDefault(_Civ5SaveStringProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Civ5SaveStringArray = function () {
  function Civ5SaveStringArray(byteOffset, items, saveData) {
    (0, _classCallCheck3.default)(this, Civ5SaveStringArray);

    this.byteOffset = byteOffset;
    this._array = new Array();

    var currentByteOffset = this.byteOffset;
    for (var i = 0; i < items; i++) {
      var arrayItem = new _Civ5SaveStringProperty2.default(currentByteOffset, null, saveData);
      currentByteOffset += arrayItem.length;
      this._array.push(arrayItem.getValue(saveData));
    }

    this.length = currentByteOffset - this.byteOffset;
    (0, _freeze2.default)(this._array);
  }

  (0, _createClass3.default)(Civ5SaveStringArray, [{
    key: 'getArray',
    value: function getArray() {
      return this._array;
    }
  }]);
  return Civ5SaveStringArray;
}();

exports.default = Civ5SaveStringArray;

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = __webpack_require__(70);

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = __webpack_require__(6);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(8);

var _createClass3 = _interopRequireDefault(_createClass2);

var _Civ5SaveBoolProperty = __webpack_require__(78);

var _Civ5SaveBoolProperty2 = _interopRequireDefault(_Civ5SaveBoolProperty);

var _Civ5SaveDataView = __webpack_require__(72);

var _Civ5SaveDataView2 = _interopRequireDefault(_Civ5SaveDataView);

var _Civ5SaveIntProperty = __webpack_require__(35);

var _Civ5SaveIntProperty2 = _interopRequireDefault(_Civ5SaveIntProperty);

var _Civ5SaveStringProperty = __webpack_require__(36);

var _Civ5SaveStringProperty2 = _interopRequireDefault(_Civ5SaveStringProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Civ5SaveStringToBoolMap = function () {
  function Civ5SaveStringToBoolMap(byteOffset, saveData) {
    (0, _classCallCheck3.default)(this, Civ5SaveStringToBoolMap);

    this.byteOffset = byteOffset;
    this.length = 4;
    this._items = new _map2.default();
    this._size = new _Civ5SaveIntProperty2.default(this.byteOffset, 4, saveData);

    if (this._getSize(saveData) > 0) {
      var currentByteOffset = this.byteOffset + 4;
      for (var i = 0; i < this._getSize(saveData); i++) {
        currentByteOffset = this._addItemToMap(saveData, currentByteOffset);
      }
    }
  }

  (0, _createClass3.default)(Civ5SaveStringToBoolMap, [{
    key: '_addItemToMap',
    value: function _addItemToMap(saveData, byteOffset) {
      var itemKeyProperty = new _Civ5SaveStringProperty2.default(byteOffset, null, saveData);
      byteOffset += itemKeyProperty.length;
      var itemValueProperty = new _Civ5SaveBoolProperty2.default(byteOffset, 4, saveData);
      byteOffset += itemValueProperty.length;

      this._items.set(itemKeyProperty.getValue(saveData), itemValueProperty);
      this.length = byteOffset - this.byteOffset;

      return byteOffset;
    }
  }, {
    key: '_getSize',
    value: function _getSize(saveData) {
      return this._size.getValue(saveData);
    }
  }, {
    key: '_setSize',
    value: function _setSize(saveData, newValue) {
      this._size.setValue(saveData, newValue);
    }
  }, {
    key: 'getValue',
    value: function getValue(saveData, itemKey) {
      if (this._items.has(itemKey)) {
        return this._items.get(itemKey).getValue(saveData);
      } else {
        return false;
      }
    }
  }, {
    key: 'setValue',
    value: function setValue(saveData, itemKey, newItemValue) {
      if (this._items.has(itemKey)) {
        this._items.get(itemKey).setValue(saveData, newItemValue);
      } else {
        return this._addItemToSaveData(saveData, itemKey, newItemValue);
      }
    }
  }, {
    key: '_addItemToSaveData',
    value: function _addItemToSaveData(saveData, itemKey, newItemValue) {
      this._setSize(saveData, this._getSize(saveData) + 1);

      var itemKeyLengthArray = this._int32ToUint8Array(itemKey.length);
      var itemKeyArray = this._stringToUint8Array(itemKey);
      var itemValueArray = this._int32ToUint8Array(Number(newItemValue));
      var arrayToInsert = this._concatTypedArrays(this._concatTypedArrays(itemKeyLengthArray, itemKeyArray), itemValueArray);

      var newSaveDataTypedArray = this._insertIntoTypedArray(new Uint8Array(saveData.buffer), arrayToInsert, this.byteOffset + this.length);
      var newSaveData = new _Civ5SaveDataView2.default(newSaveDataTypedArray.buffer);

      this._addItemToMap(newSaveData, this.byteOffset + this.length);

      return newSaveData;
    }

    // Inspired by https://stackoverflow.com/a/12965194/399105

  }, {
    key: '_int32ToUint8Array',
    value: function _int32ToUint8Array(int32) {
      var int32Array = new Uint8Array(4);
      for (var i = 0; i < int32Array.length; i++) {
        var byte = int32 & 0xff;
        int32Array[i] = byte;
        int32 = (int32 - byte) / 256;
      }
      return int32Array;
    }
  }, {
    key: '_stringToUint8Array',
    value: function _stringToUint8Array(string) {
      var stringArray = new Uint8Array(string.length);
      for (var i = 0; i < string.length; i++) {
        stringArray[i] = string.charCodeAt(i);
      }
      return stringArray;
    }

    // https://stackoverflow.com/a/33703102/399105

  }, {
    key: '_concatTypedArrays',
    value: function _concatTypedArrays(a, b) {
      var c = new a.constructor(a.length + b.length);
      c.set(a, 0);
      c.set(b, a.length);
      return c;
    }
  }, {
    key: '_insertIntoTypedArray',
    value: function _insertIntoTypedArray(array, arrayToInsert, insertAtByteOffset) {
      return this._concatTypedArrays(this._concatTypedArrays(array.slice(0, insertAtByteOffset), arrayToInsert), array.slice(insertAtByteOffset, array.length));
    }
  }]);
  return Civ5SaveStringToBoolMap;
}();

exports.default = Civ5SaveStringToBoolMap;

/***/ })
/******/ ]);
});