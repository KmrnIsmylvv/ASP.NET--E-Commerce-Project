var DESCRIPTORS = require('./descriptors');
var V8_PROTOTYPE_DEFINE_BUG = require('./v8-prototype-define-bug');
var definePropertyModule = require('./object-define-property');
var anObject = require('./an-object');
var toIndexedObject = require('./to-indexed-object');
var objectKeys = require('./object-keys');

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};
