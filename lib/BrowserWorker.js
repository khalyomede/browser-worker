"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _CacheStrategy = _interopRequireDefault(require("./CacheStrategy"));

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
   * @throws {Error} If the strategy is not supported.
   * @see CacheStrategy - The class that holds the available strategies.
   * @since 0.1.0
   * @example
   * import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST);
   */


  static setCacheStrategy(strategy) {
    const typeOfStrategy = typeof strategy;

    const supportedStrategies = _CacheStrategy.default.getSupportedStrategies();

    if (typeOfStrategy !== "string") {
      throw new TypeError(`expected strategy to be a string (${typeOfStrategy} given)`);
    }

    if (!supportedStrategies.includes(strategy)) {
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
   * @throws {Error} If the cache strategy has not been set yet.
   * @since 0.1.0
   * @example
   * import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST).addRoute("/");
   */


  static addRoute(route) {
    if (!BrowserWorker._isRouteValid(route)) {
      throw new TypeError(`expected route to be either string or regexp (${typeof route} given)`);
    }

    if (route.constructor === String && route.toString().trim().length === 0) {
      throw new Error("expected route string not to be empty");
    }

    if (!BrowserWorker._cacheStrategyValid()) {
      const supportedCacheStrategies = _CacheStrategy.default.getSupportedStrategies().join(", ");

      throw new Error(`the cache strategy is invalid (use BrowserWorker.setCacheStrategy() if you did not yet with one of the following value: ${supportedCacheStrategies})`);
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
    if (!BrowserWorker._isRouteValid(searchedRoute)) {
      throw new TypeError(`expected route to be either string or regexp (got: ${typeof searchedRoute})`);
    }

    if (searchedRoute.constructor === String && searchedRoute.trim().length === 0) {
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
    if (typeof name !== "string") {
      throw new TypeError(`expected cache name to be a string (got: ${typeof name})`);
    }

    if (name.trim().length === 0) {
      throw new Error("expected cache name not to be empty");
    }

    BrowserWorker._currentCacheName = name;

    BrowserWorker._activeCachesName.push(name);

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
        BrowserWorker._displayInfo(`service worker registered (scope: ${registration.scope}).`);
      }).catch(function (error) {
        BrowserWorker._displayError("an error occured while registering your service worker.");

        BrowserWorker._displayError(error);
      });
    }
  }
  /**
   * Adds the resource to the cache. The route still reacts to your strategies (if it matches).
   *
   * @param {String} route
   * @return {Promise<Void>}
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
    self.addEventListener("activate", event => {
      if (this._controlOverAllTabs) {
        clients.claim();

        BrowserWorker._displayInfo("controlling all tabs.");
      } else {
        BrowserWorker._displayError("controlling only this tab (if you want to controll all tabs, use BrowserWorker.enableControlOverAllTabs())");
      } // Cleans old caches


      event.waitUntil(caches.keys().then(function (cacheNames) {
        return Promise.all(cacheNames.filter(cacheName => !BrowserWorker._activeCachesName.includes(cacheName)).map(cacheName => caches.delete(cacheName)), BrowserWorker._displayInfo("cleaned old caches."));
      }));
    });
    self.addEventListener("install", () => {
      if (!this._waitOtherInstances) {
        self.skipWaiting();

        BrowserWorker._displayInfo("skipped waiting for other instances to finish.");
      } else {
        BrowserWorker._displayInfo("waiting for others instances before installing (if you want to skip waiting, use BrowserWorker.disableWaitingOtherInstances())");
      }
    });
    self.addEventListener("fetch", async event => {
      BrowserWorker._setCurrentRoute(event.request.url);

      if (BrowserWorker._currentRouteMatches(event.request.url)) {
        if (BrowserWorker._currentRouteStrategyIs(_CacheStrategy.default.NETWORK_FIRST)) {
          event.respondWith(fetch(event.request).then(response => {
            if (response.ok) {
              caches.open(BrowserWorker._getCurrentRouteCacheName()).then(cache => cache.put(event.request, response.clone()));

              BrowserWorker._displayInfo(`[NetworkFirst] fetched ${event.request.url} from the network (and put it in the cache)`);

              return response.clone();
            } else {
              throw new Error();
            }
          }).catch(() => {
            BrowserWorker._displayInfo(`[NetworkFirst] fetched ${event.request.url} from the cache because it seems the network is down`);

            return caches.match(event.request);
          }));
        } else if (BrowserWorker._currentRouteStrategyIs(_CacheStrategy.default.CACHE_FIRST)) {
          event.respondWith(caches.match(event.request).then(function (response) {
            if (response) {
              BrowserWorker._displayInfo(`[CacheFirst] fetched ${event.request.url} from the cache`);

              return response;
            }

            return fetch(event.request).then(function (response) {
              if (!response || response.status !== 200 || response.type !== "basic") {
                return response;
              }

              const responseToCache = response.clone();
              caches.open(BrowserWorker._getCurrentRouteCacheName()).then(function (cache) {
                cache.put(event.request, responseToCache);
              });

              BrowserWorker._displayInfo(`[CacheFirst] No cache found for ${event.request.url}, so the resource have been fetched from the network and stored in cache`);

              return response;
            });
          }));
        } else {
          BrowserWorker._displayWarning(`unsupported strategy ${BrowserWorker._currentRoute.strategy}`);
        }
      } else {
        BrowserWorker._displayInfo(`resource ${event.request.url} do not match any strategy, leaving the browser to handle it`);
      }
    });
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
    BrowserWorker._debug = true;
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
    BrowserWorker._debug = false;
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
    return BrowserWorker._debug;
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
    BrowserWorker._currentCacheName = "";
    BrowserWorker._activeCachesName = [];
    BrowserWorker._routes = [];
    BrowserWorker._currentRoute = "";
    BrowserWorker._debug = false;
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
   * @return {Boolean}
   */


  static _cacheStrategyValid() {
    return BrowserWorker._cacheStrategy.trim().length > 0;
  }
  /**
   * @param {String} url
   * @return {Void}
   */


  static _setCurrentRoute(url) {
    for (const route of BrowserWorker._routes) {
      if (route.route.constructor === String && url.endsWith(route.route) || route.route.constructor === RegExp && route.route.test(url)) {
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
   *
   * @param {Any} url
   * @return {Boolean}
   */


  static _currentRouteMatchesByString(url) {
    return BrowserWorker._currentRoute.route.constructor === String && url.endsWith(BrowserWorker._currentRoute.route);
  }
  /**
   *
   * @param {Any} url
   * @return {Boolean}
   */


  static _currentRouteMatchesByRegExp(url) {
    return BrowserWorker._currentRoute.route.constructor === RegExp && BrowserWorker._currentRoute.route.test(url);
  }
  /**
   * @param {String|RegExp} url
   * @return {Boolean}
   */


  static _currentRouteMatches(url) {
    return BrowserWorker._currentRouteValid() && (BrowserWorker._currentRouteMatchesByString(url) || BrowserWorker._currentRouteMatchesByRegExp(url));
  }
  /**
   * @return {String}
   */


  static _getCurrentRouteCacheName() {
    return BrowserWorker._currentRoute.cacheName;
  }
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


  static _displayInfo(message) {
    BrowserWorker._displayMessage(message, "info");
  }
  /**
   * @param {String} message
   * @return {Void}
   */


  static _displayError(message) {
    BrowserWorker._displayMessage(message, "error");
  }
  /**
   *
   * @param {String} message
   * @return {Void}
   */


  static _displayWarning(message) {
    BrowserWorker._displayMessage(message, "warn");
  }
  /**
   *
   * @param {String} message The message
   * @param {String} severity One of the following: "info", "warn", "error", "log".
   */


  static _displayMessage(message, severity) {
    if (BrowserWorker.debugEnabled()) {
      console[severity](BrowserWorker._getDisplayMessage(message));
    }
  }

  static _isRouteValid(route) {
    return route !== null && route !== undefined && (route.constructor === String || route.constructor === RegExp);
  }

}

(0, _defineProperty2.default)(BrowserWorker, "_cacheStrategy", "");
(0, _defineProperty2.default)(BrowserWorker, "_currentCacheName", "");
(0, _defineProperty2.default)(BrowserWorker, "_activeCachesName", []);
(0, _defineProperty2.default)(BrowserWorker, "_routes", []);
(0, _defineProperty2.default)(BrowserWorker, "_currentRoute", "");
(0, _defineProperty2.default)(BrowserWorker, "_debug", false);
(0, _defineProperty2.default)(BrowserWorker, "_waitOtherInstances", true);
(0, _defineProperty2.default)(BrowserWorker, "_controlOverAllTabs", false);
(0, _defineProperty2.default)(BrowserWorker, "_serviceWorkerPath", "/service-worker.js");
var _default = BrowserWorker;
exports.default = _default;