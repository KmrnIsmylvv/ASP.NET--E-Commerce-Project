/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = require('./native-symbol');

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';
