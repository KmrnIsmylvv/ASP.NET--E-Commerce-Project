var global = require('./global');
var requireObjectCoercible = require('./require-object-coercible');

var Object = global.Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};
