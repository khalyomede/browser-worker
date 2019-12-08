"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Browser {
  /**
   * @return {Boolean}
   */
  static hasCacheApi() {
    return caches instanceof CacheStorage;
  }
  /**
   * @return {Boolean}
   */


  static hasServiceWorkerApi() {
    return "serviceWorker" in navigator;
  }

}

var _default = Browser;
exports.default = _default;