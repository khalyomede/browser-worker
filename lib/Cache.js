"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Cache {
  /**
   *
   * @param {Any} name
   * @return {Boolean}
   */
  static nameIsValid(name) {
    return typeof name === "string";
  }
  /**
   *
   * @param {String} name
   * @return {Boolean}
   */


  static nameIsFilled(name) {
    return name.trim().length > 0;
  }

}

var _default = Cache;
exports.default = _default;