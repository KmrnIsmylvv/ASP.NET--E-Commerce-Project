// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = require('./document-create-element');

var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

module.exports = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;
