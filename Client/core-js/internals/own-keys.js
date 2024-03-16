var getBuiltIn = require('./get-built-in');
var uncurryThis = require('./function-uncurry-this');
var getOwnPropertyNamesModule = require('./object-get-own-property-names');
var getOwnPropertySymbolsModule = require('./object-get-own-property-symbols');
var anObject = require('./an-object');

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};
