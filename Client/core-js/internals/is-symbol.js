var global = require('./global');
var getBuiltIn = require('./get-built-in');
var isCallable = require('./is-callable');
var isPrototypeOf = require('./object-is-prototype-of');
var USE_SYMBOL_AS_UID = require('./use-symbol-as-uid');

var Object = global.Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, Object(it));
};
