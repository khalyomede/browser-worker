(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;
},{}],2:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
},{}],3:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Cache = _interopRequireDefault(require("./Cache"));

var _CacheStrategy = _interopRequireDefault(require("./CacheStrategy"));

var _Console = _interopRequireDefault(require("./Console"));

var _Response = _interopRequireDefault(require("./Response"));

var _Route = _interopRequireDefault(require("./Route"));

class BrowserWorker {
  /**
   * Take control on all other active service worker for the next actions.
   *
   * @return {BrowserWorker}
   * @since 0.1.0
   * @example
   * import { BrowserWorker } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.enableControlOverAllTabs();
   */
  static enableControlOverAllTabs() {
    this._controlOverAllTabs = true;
    return this;
  }
  /**
   * Disable the waiting step before actually applying your strategies.
   *
   * @return {BrowserWorker}
   * @since 0.1.0
   * @example
   * import { BrowserWorker } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.disableWaitingOtherInstances();
   */


  static disableWaitingOtherInstances() {
    this._waitOtherInstances = false;
    return this;
  }
  /**
   * Enable waiting others previously installed service workers before installing the new one.
   *
   * @return {BrowserWorker}
   * @since 0.3.0
   * @example
   * import { BrowserWorker } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.enableWaitingOtherInstances();
   */


  static enableWaitingOtherInstances() {
    this._waitOtherInstances = true;
    return this;
  }
  /**
   * Sets the current cache strategy.
   *
   * @param {String} strategy The name of the strategy.
   * @return {BrowserWorker}
   * @throws {TypeError} If the strategy is not a string.
   * @throws {Error} If the strategy is empty.
   * @throws {Error} If the strategy is not supported.
   * @see CacheStrategy - The class that holds the available strategies.
   * @since 0.1.0
   * @example
   * import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST);
   */


  static setCacheStrategy(strategy) {
    const supportedStrategies = _CacheStrategy.default.getSupportedStrategies();

    if (!_CacheStrategy.default.isValid(strategy)) {
      throw new TypeError(`expected strategy to be a string (${typeof strategy} given)`);
    }

    if (!_CacheStrategy.default.isFilled(strategy)) {
      throw new Error(`expected strategy not to be empty`);
    }

    if (!_CacheStrategy.default.isSupported(strategy)) {
      const strategies = supportedStrategies.join(", ");
      throw new Error(`unsupported strategy ${strategy} (use one of the following: ${strategies})`);
    }

    BrowserWorker._cacheStrategy = strategy;
    return this;
  }
  /**
   * Get the current cache strategy.
   *
   * @return {String}
   * @since 0.1.0
   * @example
   * import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST).getCacheStrategy();
   */


  static getCacheStrategy() {
    return BrowserWorker._cacheStrategy;
  }
  /**
   * Register a route under the current strategy.
   *
   * @param {String|RegExp} route The route or the regular expression representing the routes to catch.
   * @return {BrowserWorker}
   * @throws {TypeError} If the route is not a string or a regular expression.
   * @throws {Error} If the route is an empty string.
   * @since 0.1.0
   * @example
   * import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST).addRoute("/");
   */


  static addRoute(route) {
    if (!_Route.default.isValid(route)) {
      throw new TypeError(`expected route to be either string or regexp (${typeof route} given)`);
    }

    if (!_Route.default.isFilled(route)) {
      throw new Error("expected route string not to be empty");
    }

    BrowserWorker._routes.push({
      strategy: BrowserWorker._cacheStrategy,
      route: route,
      cacheName: BrowserWorker._currentCacheName
    });

    return this;
  }
  /**
   * Add multiple routes under the current strategy.
   *
   * @return {BrowserWorker}
   * @throws {TypeError} If one of the route is neither a string nor a regular expression.
   * @throws {Error} If one of the route is an empty string.
   * @throws {Error} If the cache strategy has not been set.
   * @since 0.1.0
   * @example
   * import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST);
   *
   * BrowserWorker.addRoutes([
   *  "/",
   *  "/about",
   *  "/contact-us"
   * ]);
   */


  static addRoutes(routes) {
    for (const route of routes) {
      BrowserWorker.addRoute(route);
    }

    return this;
  }
  /**
   * Set multiple routes. This will erase any previous routes.
   *
   * @return {BrowserWorker}
   * @throws {TypeError} If one of the route is neither a string nor a regular expression.
   * @throws {Error} If one of the route is an empty string.
   * @throws {Error} If the cache strategy has not been set.
   * @since 0.1.0
   * @example
   * import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST);
   *
   * BrowserWorker.setRoutes([
   *  "/",
   *  "/about",
   *  "/contact-us"
   * ]);
   */

  /**
   * Get the routes.
   *
   * @return {Array<Route>}
   * @since 0.1.0
   * @example
   * import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST);
   * BrowserWorker.addRoute("/").addRoute("/about");
   *
   * const routes = BrowserWorker.getRoutes();
   */


  static getRoutes() {
    return BrowserWorker._routes;
  }
  /**
   * Removes a route by its name or its regexp.
   *
   * @param {String|RegExp} route The route to remove.
   * @return {BrowserWorker}
   * @throws {TypError} If the route is not a String nor a RegExp.
   * @throws {Error} If the route is an empty String.
   * @since 0.3.0
   * @example
   * import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST);
   * BrowserWorker.addRoute("/");
   *
   * BrowserWorker.deleteRoute("/");
   */


  static deleteRoute(searchedRoute) {
    if (!_Route.default.isValid(searchedRoute)) {
      throw new TypeError(`expected route to be either string or regexp (got: ${typeof searchedRoute})`);
    }

    if (!_Route.default.isFilled(searchedRoute)) {
      throw new Error("expected route not to be empty");
    }

    BrowserWorker._routes = BrowserWorker._routes.filter(route => route.route !== searchedRoute);
    return this;
  }
  /**
   * Delete all routes.
   *
   * @param {Array<String|RegExp>} searchedRoutes The routes to remove.
   * @return {BrowserWorker}
   * @throws {TypeError} If one of the route is not a String nor a RegExp.
   * @throws {Error} If one of the route is an empty string.
   * @since 0.3.0
   * @example
   * import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST);
   * BrowserWorker.addRoute("/").addRoute("/about");
   *
   * BrowserWorker.deleteRoutes();
   */


  static deleteRoutes(searchedRoutes) {
    for (const route of searchedRoutes) {
      BrowserWorker.deleteRoute(route);
    }

    return this;
  }
  /**
   * Returns true if at least one route matches the route or the regexp, else returns false.
   *
   * @param {String|RegExp} searchedRoute The route to search for.
   * @return {Boolean}
   * @since 0.4.0
   * @example
   * import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST);
   * BrowserWorker.addRoute("/");
   *
   * if (BrowserWorker.hasRoute("/")) {
   *  console.log("has route /");
   * } else {
   *  console.log("has not route /");
   * }
   */


  static hasRoute(searchedRoute) {
    for (const route of BrowserWorker._routes) {
      if (route.route === searchedRoute) {
        return true;
      }
    }

    return false;
  }
  /**
   *
   * @param {String} name
   * @return {BrowserWorker}
   * @throws {TypeError} If the cache name is not a string.
   * @throws {Error} If the cache name is an empty string.
   * @since 0.1.0
   * @example
   * import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST)
   * 	.setCacheName("network-first-v1");
   */


  static setCacheName(name) {
    if (!_Cache.default.nameIsValid(name)) {
      throw new TypeError(`expected cache name to be a string (got: ${typeof name})`);
    }

    if (!_Cache.default.nameIsFilled(name)) {
      throw new Error("expected cache name not to be empty");
    }

    const cacheName = name + BrowserWorker._cacheSuffix;
    BrowserWorker._currentCacheName = cacheName;

    BrowserWorker._activeCachesName.push(cacheName);

    return this;
  }
  /**
   * Set the path to register the service worker. You should use it on the javascript file that you service to your client, not in the service worker itself.
   *
   * @param {String} path The path where the service worker is located.
   * @return {BrowserWorker}
   * @since 0.1.0
   * @example
   * import { BrowserWorker } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.setServiceWorkerPath("/service-worker.js")
   */


  static setServiceWorkerPath(path) {
    BrowserWorker._serviceWorkerPath = path;
    return this;
  }
  /**
   * Registers the service worker. Should be used in your main javascript file (and not in the service worker file itself).
   *
   * @return {Void}
   * @since 0.1.0
   * @example
   * import { BrowserWorker } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.setServiceWorkerPath("/service-worker.js").registerServiceWorker();
   */


  static registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register(BrowserWorker._serviceWorkerPath).then(registration => {
        _Console.default.displayInfo(`service worker registered (scope: ${registration.scope}).`);
      }).catch(function (error) {
        _Console.default.displayError("an error occured while registering your service worker.");

        _Console.default.displayError(error);
      });
    }
  }
  /**
   * Unregisters the service workers. See BrowserWorker.removeCaches() if you also want to wipe out caches to fresh start again. If you need to just update the service worker, use BrowserWorker.setCacheName() and change it to make your service worker update itself the next time the user browse your web app.
   *
   * @return {Promise<BrowserWorker>}
   * @since 0.5.0
   * @example
   * import { BrowserWorker } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.removeServiceWorker();
   */


  static async removeServiceWorker() {
    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      const unregistrations = registrations.map(registration => registration.unregister());
      const results = await Promise.all(unregistrations);
      const succeededCount = results.filter(result => result === true).length;
      const failedCount = results.filter(result => result === false).length;

      _Console.default.displayInfo(`${succeededCount} service workers removed, ${failedCount} service worker removals failed`);
    } else {
      _Console.default.displayWarning("service workers are not supported in your browser");
    }

    return this;
  }
  /**
   * Removes all the caches generated from BrowserWorker. We know they have been generated by this library because we suffix all our cache name by default by "-browser-worker". See BrowserWorker.removeServiceWorker() if you want a fresh start. If you need to just update the service worker, use BrowserWorker.setCacheName() and change it to make your service worker update itself the next time the user browse your web app.
   *
   * @return {Promise<BrowserWorker>}
   * @since 0.5.0
   * @example
   * import { BrowserWorker } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.removeCaches();
   */


  static async removeCaches() {
    if ("caches" in window) {
      const keys = await caches.keys();
      const removals = keys.filter(key => key.endsWith(BrowserWorker._cacheSuffix)).map(key => caches.delete(key));
      const results = await Promise.all(removals);
      const succeedeedCount = results.filter(result => result === true).length;
      const failedCount = results.filter(result => result === false).length;

      _Console.default.displayInfo(`${succeedeedCount} caches removed, ${failedCount} cache removals failed`);
    } else {
      _Console.default.displayWarning("the caches API is not supported in your browser");
    }

    return this;
  }
  /**
   * Adds the resource to the cache. The route still reacts to your strategies (if it matches).
   *
   * @param {String} route
   * @return {Promise<Void>}
   * @todo export this to a dedicated class.
   */


  static async addResourceToCache(route) {
    if (!("caches" in window)) {
      /**
       * @todo log that caches api is not supported.
       */
      return;
    }

    const cache = await caches.open(BrowserWorker._currentCacheName);
    cache.add(route);
  }
  /**
   * Listen to route requests and behaves according to your settings.
   *
   * @return {Void}
   * @see CacheStrategy For a detail of the algorithm of each strategies.
   */


  static listenRequests() {
    BrowserWorker._activateServiceWorker();

    BrowserWorker._installServiceWorker();

    BrowserWorker._listenRequests();
  }
  /**
   * Logs in console what is BrowserWorker doing.
   *
   * @return {BrowserWorker}
   * @since 0.1.0
   * @example
   * import { BrowserWorker } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.enableDebug();
   */


  static enableDebug() {
    _Console.default.enableDebug();

    return this;
  }
  /**
   * Prevent logging in console what BrowserWorker is doing.
   *
   * @return {BrowserWorker}
   * @since 0.3.0
   * @example
   * import { BrowserWorker } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.disableDebug();
   */


  static disableDebug() {
    _Console.default.disableDebug();

    return this;
  }
  /**
   * Returns true if the debug mode has been enabled, else returns false.
   *
   * @return {Boolean}
   * @since 0.1.0
   * @example
   * import { BrowserWorker } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.debugEnabled(); // false
   */


  static debugEnabled() {
    return _Console.default.debugEnabled();
  }
  /**
   * Reset the entire BrowserWorker state (e.g. setting its properties to their default values).
   *
   * @return {BrowserWorker}
   * @since 0.3.0
   * @example
   * import { BrowserWorker } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.reset();
   * @todo Create constants and use them instead of raw values.
   */


  static reset() {
    BrowserWorker._cacheStrategy = "";
    BrowserWorker._cacheSuffix = "-browser-worker";
    BrowserWorker._currentCacheName = "";
    BrowserWorker._activeCachesName = [];
    BrowserWorker._routes = [];
    BrowserWorker._currentRoute = "";
    BrowserWorker._waitOtherInstances = true;
    BrowserWorker._controlOverAllTabs = false;
    BrowserWorker._serviceWorkerPath = "/service-worker.js";
    return this;
  }
  /**
   * Reset the cache strategy by setting its default value to empty.
   *
   * @return {BrowserWorker}
   * @since 0.2.0
   * @example
   * import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST);
   * BrowserWorker.resetCacheStrategy();
   *
   * console.log(BrowserWorker.getCacheStrategy()); // ""
   */


  static resetCacheStrategy() {
    BrowserWorker._cacheStrategy = "";
    return this;
  }
  /**
   * Reset the routes by settings the default value to an empty array.
   *
   * @return {BrowserWorker}
   * @since 0.2.0
   * @example
   * import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST)
   * 	.addRoute("/");
   *
   * BrowserWorker.resetRoutes();
   *
   * console.log(BrowserWorker.getRoutes()); // []
   */


  static resetRoutes() {
    BrowserWorker._routes = [];
    return this;
  }
  /**
   * @param {String} url
   * @return {Void}
   */


  static _setCurrentRoute(url) {
    for (const route of BrowserWorker._routes) {
      if (new _Route.default(route.route).matches(url)) {
        BrowserWorker._currentRoute = route;
        break;
      }
    }
  }
  /**
   * @param {String} strategy
   * @return {Boolean}
   */


  static _currentRouteStrategyIs(strategy) {
    return BrowserWorker._currentRoute && BrowserWorker._currentRoute.strategy === strategy;
  }
  /**
   * @return {Boolean}
   */


  static _currentRouteValid() {
    return BrowserWorker._currentRoute !== null && BrowserWorker._currentRoute !== undefined && BrowserWorker._currentRoute.constructor === Object;
  }
  /**
   * @param {String|RegExp} url
   * @return {Boolean}
   */


  static _currentRouteMatches(url) {
    const route = new _Route.default(BrowserWorker._currentRoute.route);
    return BrowserWorker._currentRouteValid() && (route.matchesByString(url) || route.matchesByRegExp(url));
  }
  /**
   * @return {String}
   */


  static _getCurrentRouteCacheName() {
    return BrowserWorker._currentRoute.cacheName;
  }

  static _activateServiceWorker() {
    self.addEventListener("activate", event => {
      if (this._controlOverAllTabs) {
        clients.claim();

        _Console.default.displayInfo("controlling all tabs.");
      } else {
        _Console.default.displayError("controlling only this tab (if you want to controll all tabs, use BrowserWorker.enableControlOverAllTabs())");
      } // Cleans old caches


      event.waitUntil(caches.keys().then(function (cacheNames) {
        return Promise.all(cacheNames.filter(cacheName => !BrowserWorker._activeCachesName.includes(cacheName)).map(cacheName => caches.delete(cacheName)), _Console.default.displayInfo("cleaned old caches."));
      }));
    });
  }

  static _installServiceWorker() {
    self.addEventListener("install", () => {
      if (!this._waitOtherInstances) {
        self.skipWaiting();

        _Console.default.displayInfo("skipped waiting for other instances to finish.");
      } else {
        _Console.default.displayInfo("waiting for others instances before installing (if you want to skip waiting, use BrowserWorker.disableWaitingOtherInstances())");
      }
    });
  }

  static _listenRequests() {
    self.addEventListener("fetch", async event => {
      BrowserWorker._setCurrentRoute(event.request.url);

      if (BrowserWorker._currentRouteMatches(event.request.url)) {
        if (BrowserWorker._currentRouteStrategyIs(_CacheStrategy.default.NETWORK_FIRST)) {
          _Response.default.getFromNetworkFirst(event, BrowserWorker._getCurrentRouteCacheName());
        } else if (BrowserWorker._currentRouteStrategyIs(_CacheStrategy.default.CACHE_FIRST)) {
          _Response.default.getFromCacheFirst(event, BrowserWorker._getCurrentRouteCacheName());
        } else {
          _Console.default.displayWarning(`unsupported strategy ${BrowserWorker._currentRoute.strategy}`);
        }
      } else {
        _Console.default.displayInfo(`resource ${event.request.url} do not match any strategy, leaving the browser to handle it`);
      }
    });
  }

}

(0, _defineProperty2.default)(BrowserWorker, "_cacheStrategy", "");
(0, _defineProperty2.default)(BrowserWorker, "_cacheSuffix", "-browser-worker");
(0, _defineProperty2.default)(BrowserWorker, "_currentCacheName", "");
(0, _defineProperty2.default)(BrowserWorker, "_activeCachesName", []);
(0, _defineProperty2.default)(BrowserWorker, "_routes", []);
(0, _defineProperty2.default)(BrowserWorker, "_currentRoute", {});
(0, _defineProperty2.default)(BrowserWorker, "_waitOtherInstances", true);
(0, _defineProperty2.default)(BrowserWorker, "_controlOverAllTabs", false);
(0, _defineProperty2.default)(BrowserWorker, "_serviceWorkerPath", "/service-worker.js");
var _default = BrowserWorker;
exports.default = _default;

},{"./Cache":4,"./CacheStrategy":5,"./Console":6,"./Response":7,"./Route":9,"@babel/runtime/helpers/defineProperty":1,"@babel/runtime/helpers/interopRequireDefault":2}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

/**
 * Conceptualize differents Service Worker cache strategies.
 *
 * @since 0.1.0
 */
class CacheStrategy {
  /**
   * Instruct the service worker to fetch the requests from the network first, then cache them (in case the network is down). Suitable for resources that need to be the most up to date, like assets, business critical resource like product images, ...
   *
   * @type {String}
   * @since 0.1.0
   * @example
   * import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST);
   */

  /**
   * Instruct the service worker to fetch the requests from the cache in priority. If the request is not cached yet, the service worker will fetch it from the network and cache it once. Suitable for resources that are not business critical, do not change a lot over time, and take a long time to download, like descriptives images, cover images, ...
   *
   * @type {String}
   * @since 0.1.0
   * @example
   * import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST);
   */

  /**
   * Returns an array of string of the supported caches strategies by BrowserWorker.
   *
   * @return {Array<String>}
   * @since 0.1.0
   * @example
   * import { CacheStrategy } from "browser-worker";
   *
   * const supported = CacheStrategy.getSupportedStrategies();
   */
  static getSupportedStrategies() {
    return [CacheStrategy.NETWORK_FIRST, CacheStrategy.CACHE_FIRST];
  }
  /**
   *
   * @param {String} strategy
   * @return {Boolean}
   */


  static isValid(strategy) {
    return typeof strategy === "string";
  }
  /**
   * @param {String} strategy
   * @return {Boolean}
   */


  static isFilled(strategy) {
    return strategy.trim().length > 0;
  }
  /**
   *
   * @param {String} strategy
   * @return {Boolean}
   */


  static isSupported(strategy) {
    return CacheStrategy.getSupportedStrategies().includes(strategy);
  }

}

(0, _defineProperty2.default)(CacheStrategy, "NETWORK_FIRST", "network-first");
(0, _defineProperty2.default)(CacheStrategy, "CACHE_FIRST", "cache-first");
var _default = CacheStrategy;
exports.default = _default;

},{"@babel/runtime/helpers/defineProperty":1,"@babel/runtime/helpers/interopRequireDefault":2}],6:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

class Console {
  /**
   * @var {Boolean}
   */

  /**
   *
   * @param {String} message
   * @return {String}
   */
  static _getDisplayMessage(message) {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const milliseconds = date.getMilliseconds();
    const timestamp = `${hours}:${minutes}:${seconds}.${milliseconds}`;
    return `[BrowserWorker][${timestamp}] ${message}`;
  }
  /**
   * @param {String} message
   * @return {Void}
   */


  static displayInfo(message) {
    Console._displayMessage(message, "info");
  }
  /**
   * @param {String} message
   * @return {Void}
   */


  static displayError(message) {
    Console._displayMessage(message, "error");
  }
  /**
   *
   * @param {String} message
   * @return {Void}
   */


  static displayWarning(message) {
    Console._displayMessage(message, "warn");
  }
  /**
   *
   * @param {String} message The message
   * @param {String} severity One of the following: "info", "warn", "error", "log".
   * @todo Check if the severity is supported.
   */


  static _displayMessage(message, severity) {
    if (Console.debugEnabled()) {
      console[severity](Console._getDisplayMessage(message));
    }
  }
  /**
   * @return {Void}
   */


  static enableDebug() {
    Console._debug = true;
  }
  /**
   * @return {Void}
   */


  static disableDebug() {
    Console._debug = false;
  }
  /**
   * @return {Boolean}
   */


  static debugEnabled() {
    return Console._debug;
  }

}

(0, _defineProperty2.default)(Console, "_debug", false);
var _default = Console;
exports.default = _default;

},{"@babel/runtime/helpers/defineProperty":1,"@babel/runtime/helpers/interopRequireDefault":2}],7:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Console = _interopRequireDefault(require("./Console"));

class Response {
  /**
   *
   * @param {Event} event
   * @param {String} cacheName
   * @return {Void}
   */
  static getFromCacheFirst(event, cacheName) {
    event.respondWith(caches.match(event.request).then(function (response) {
      if (response) {
        _Console.default.displayInfo(`[CacheFirst] fetched ${event.request.url} from the cache`);

        return response;
      }

      return fetch(event.request).then(function (response) {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(cacheName).then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        _Console.default.displayInfo(`[CacheFirst] No cache found for ${event.request.url}, so the resource have been fetched from the network and stored in cache`);

        return response;
      });
    }));
  }
  /**
   * @param {Event} event
   * @param {String} cacheName
   * @return {Void}
   */


  static getFromNetworkFirst(event, cacheName) {
    event.respondWith(fetch(event.request).then(response => {
      if (response.ok) {
        caches.open(cacheName).then(cache => cache.put(event.request, response.clone()));

        _Console.default.displayInfo(`[NetworkFirst] fetched ${event.request.url} from the network (and put it in the cache)`);

        return response.clone();
      } else {
        throw new Error();
      }
    }).catch(() => {
      _Console.default.displayInfo(`[NetworkFirst] fetched ${event.request.url} from the cache because it seems the network is down`);

      return caches.match(event.request);
    }));
  }

}

var _default = Response;
exports.default = _default;

},{"./Console":6,"@babel/runtime/helpers/interopRequireDefault":2}],8:[function(require,module,exports){
"use strict";

var _main = require("./main");

if (!("Route" in window)) {
  window.Route = _main.Route;
}

},{"./main":10}],9:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

/**
 * Conceptualize route captures to intercept requests for various common types of resources like images, assets, ...
 *
 * @since 0.1.0
 */
class Route {
  /**
   *
   * @param {String|RegExp} route
   * @return {Route}
   * @todo Check if the route is valid.
   */
  constructor(route) {
    this.route = route;
  }
  /**
   * @param {String|RegExp} url
   * @return {Boolean}
   */


  matches(url) {
    return this.matchesByString(url) || this.matchesByRegExp(url);
  }
  /**
   *
   * @param {String|RegExp} url
   * @return {Boolean}
   */


  matchesByString(url) {
    return this.route.constructor === String && url.endsWith(this.route);
  }
  /**
   *
   */


  matchesByRegExp(url) {
    return this.route.constructor === RegExp && this.route.test(url);
  }
  /**
   * Captures images resources, including gif and webp.
   *
   * @type {RegExp}
   * @since 0.1.0
   * @example
   * import { BrowserWorker, Route } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.addRoute(Route.IMAGES);
   */


  /**
   * @param {String} route
   * @return {Boolean}
   */
  static isValid(route) {
    return route !== null && route !== undefined && (route.constructor === String || route.constructor === RegExp);
  }
  /**
   * @param {String} route
   * @return {Boolean}
   */


  static isFilled(route) {
    return route.constructor === String && route.trim().length > 0 || route.constructor === RegExp && route.toString() !== new RegExp().toString();
  }

}

(0, _defineProperty2.default)(Route, "IMAGES", /\.(png|jpg|jpeg|gif|svg|webp)(\?.*)*$/i);
(0, _defineProperty2.default)(Route, "VIDEOS", /\.(mp4|ogv|ogg|webm|flv|3gp|mkv)(\?.*)*$/i);
(0, _defineProperty2.default)(Route, "AUDIOS", /\.(wav|mp3|ogg)(\?.*)*$/i);
(0, _defineProperty2.default)(Route, "ASSETS", /\.(js|css|html|htm)(\?.*)*$/i);
(0, _defineProperty2.default)(Route, "FONTS", /\.(woff|woff2|ttf|eot)(\?.*)*$/i);
var _default = Route;
exports.default = _default;

},{"@babel/runtime/helpers/defineProperty":1,"@babel/runtime/helpers/interopRequireDefault":2}],10:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BrowserWorker", {
  enumerable: true,
  get: function () {
    return _BrowserWorker.default;
  }
});
Object.defineProperty(exports, "CacheStrategy", {
  enumerable: true,
  get: function () {
    return _CacheStrategy.default;
  }
});
Object.defineProperty(exports, "Route", {
  enumerable: true,
  get: function () {
    return _Route.default;
  }
});

var _BrowserWorker = _interopRequireDefault(require("./BrowserWorker"));

var _CacheStrategy = _interopRequireDefault(require("./CacheStrategy"));

var _Route = _interopRequireDefault(require("./Route"));

},{"./BrowserWorker":3,"./CacheStrategy":5,"./Route":9,"@babel/runtime/helpers/interopRequireDefault":2}]},{},[8]);
