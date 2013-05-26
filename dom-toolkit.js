(function (exports) {

  var isFunction = function isFunction(x) {
    return typeof(x) === "function";
  };
  exports.isFunction = isFunction;
  
  var resolve = function resolve(x) {
    return isFunction(x) ?
      x() :
      x;
  };
  exports.resolve = resolve;
  
  var noParamMemoize = function noParamMemoize(x) {
    var value = null;
    return function() {
      value === null ?
        value = x() :
        void(0);
      return value;
    };
  }

  var query = function query(selector, memoize) {
    var query = function() {
      return document.querySelector(selector);
    };
    return memoize ?
      noParamMemoize(query) :
      query;
  };
  exports.query = query;
  
  var addClass = function addClass(element, className) {
    (function() {
      var resolvedElement = resolve(element);
      var resolvedClassName = resolve(className);
      return resolvedElement.classList.add(resolvedClassName);
    })();
    return element;
  };
  exports.addClass = addClass;
  
  var setAttribute = function setAttribute(target, attr, value) {
    return (target || 0)[attr] = value;
  };
  
  var setTextContent = function setTextContent(element, content) {
    return setAttribute(element, textContent, content);
  };
  exports.setTextContent = setTextContent

})(typeof exports === 'undefined' ? this["domToolkit"] = {} : exports);
