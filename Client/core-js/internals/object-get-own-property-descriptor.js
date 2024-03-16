var DESCRIPTORS = require('./descriptors');
var call = require('./function-call');
var propertyIsEnumerableModule = require('./object-property-is-enumerable');
var createPropertyDescriptor = require('./create-property-descriptor');
var toIndexedObject = require('./to-indexed-object');
var toPropertyKey = require('./to-property-key');
var hasOwn = require('./has-own-property');
var IE8_DOM_DEFINE = require('./ie8-dom-define');

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};
