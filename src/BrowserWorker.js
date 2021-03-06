import Browser from "./Browser";
import Cache from "./Cache";
import CacheStrategy from "./CacheStrategy";
import Console from "./Console";
import Response from "./Response";
import Route from "./Route";

class BrowserWorker {
  static _cacheStrategy = "";
  static _cacheSuffix = "-browser-worker";
  static _currentCacheName = "";
  static _activeCachesName = [];
  static _routes = [];
  static _currentRoute = {};
  static _waitOtherInstances = true;
  static _controlOverAllTabs = false;
  static _serviceWorkerPath = "/service-worker.js";

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
    const supportedStrategies = CacheStrategy.getSupportedStrategies();

    if (!CacheStrategy.isValid(strategy)) {
      throw new TypeError(
        `expected strategy to be a string (${typeof strategy} given)`
      );
    }

    if (!CacheStrategy.isFilled(strategy)) {
      throw new Error(`expected strategy not to be empty`);
    }

    if (!CacheStrategy.isSupported(strategy)) {
      const strategies = supportedStrategies.join(", ");

      throw new Error(
        `unsupported strategy ${strategy} (use one of the following: ${strategies})`
      );
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
   * Register a route under the current strategy. If you add a route using the cache first strategy, it will also be appended to the cache (so you do not have to call BrowserWorker.addResourceToCache() manually).
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
    if (!Route.isValid(route)) {
      throw new TypeError(
        `expected route to be either string or regexp (${typeof route} given)`
      );
    }

    if (!Route.isFilled(route)) {
      throw new Error("expected route string not to be empty");
    }

    BrowserWorker._routes.push({
      strategy: BrowserWorker._cacheStrategy,
      route: route,
      cacheName: BrowserWorker._currentCacheName
    });

    if (
      BrowserWorker._cacheStrategy === CacheStrategy.CACHE_ONLY &&
      typeof route === "string"
    ) {
      BrowserWorker.addResourceToCache(route);
    }

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
    if (!Route.isValid(searchedRoute)) {
      throw new TypeError(
        `expected route to be either string or regexp (got: ${typeof searchedRoute})`
      );
    }

    if (!Route.isFilled(searchedRoute)) {
      throw new Error("expected route not to be empty");
    }

    BrowserWorker._routes = BrowserWorker._routes.filter(
      route => route.route !== searchedRoute
    );

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
    if (!Cache.nameIsValid(name)) {
      throw new TypeError(
        `expected cache name to be a string (got: ${typeof name})`
      );
    }

    if (!Cache.nameIsFilled(name)) {
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
    if (Browser.hasServiceWorkerApi()) {
      navigator.serviceWorker
        .register(BrowserWorker._serviceWorkerPath)
        .then(registration => {
          Console.displayInfo(
            `service worker registered (scope: ${registration.scope}).`
          );
        })
        .catch(function(error) {
          Console.displayError(
            "an error occured while registering your service worker."
          );
          Console.displayError(error);
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
    if (Browser.hasServiceWorkerApi()) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      const unregistrations = registrations.map(registration =>
        registration.unregister()
      );

      const results = await Promise.all(unregistrations);
      const succeededCount = results.filter(result => result === true).length;
      const failedCount = results.filter(result => result === false).length;

      Console.displayInfo(
        `${succeededCount} service workers removed, ${failedCount} service worker removals failed`
      );
    } else {
      Console.displayWarning(
        "service workers are not supported in your browser"
      );
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
    if (Browser.hasCacheApi()) {
      const keys = await caches.keys();
      const removals = keys
        .filter(key => key.endsWith(BrowserWorker._cacheSuffix))
        .map(key => caches.delete(key));

      const results = await Promise.all(removals);
      const succeedeedCount = results.filter(result => result === true).length;
      const failedCount = results.filter(result => result === false).length;

      Console.displayInfo(
        `${succeedeedCount} caches removed, ${failedCount} cache removals failed`
      );
    } else {
      Console.displayWarning("the caches API is not supported in your browser");
    }

    return this;
  }

  /**
   * Adds the resource to the cache. The route still reacts to your strategies (if it matches).
   *
   * @param {String} route
   * @return {Promise<Void>}
   * @since 0.1.1
   * @example
   * import { BrowserWorker } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.setCacheName("cache-only-v1").addResourceToCache("/about");
   */
  static async addResourceToCache(route) {
    if (!Browser.hasCacheApi()) {
      Console.displayWarning("the Cache API is not supported in your browser");

      return;
    }

    const cache = await caches.open(BrowserWorker._currentCacheName);

    cache.add(route);
  }

  /**
   * Adds multiple resources to the cache. Goes along very well with a Cache First strategy.
   *
   * @param {Array<String>} routes The routes urls to put in the cache.
   * @return {Promise<Void>}
   * @since 0.7.0
   * @example
   * import { BrowserWorker } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.setCacheName("cache-only-v1").addResourcesToCache(["/", "/contact", "/js/main.min.js"]);
   */
  static async addResourcesToCache(routes) {
    const additions = routes.map(route =>
      BrowserWorker.addResourceToCache(route)
    );

    await Promise.all(additions);
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
    Console.enableDebug();

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
    Console.disableDebug();

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
    return Console.debugEnabled();
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
      if (new Route(route.route).matches(url)) {
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
    return (
      BrowserWorker._currentRoute &&
      BrowserWorker._currentRoute.strategy === strategy
    );
  }

  /**
   * @return {Boolean}
   */
  static _currentRouteValid() {
    return (
      BrowserWorker._currentRoute !== null &&
      BrowserWorker._currentRoute !== undefined &&
      Array.isArray(BrowserWorker._currentRoute) === false &&
      typeof BrowserWorker._currentRoute === "object"
    );
  }

  /**
   * @param {String|RegExp} url
   * @return {Boolean}
   */
  static _currentRouteMatches(url) {
    const route = new Route(BrowserWorker._currentRoute.route);

    return (
      BrowserWorker._currentRouteValid() &&
      (route.matchesByString(url) || route.matchesByRegExp(url))
    );
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

        Console.displayInfo("controlling all tabs.");
      } else {
        Console.displayError(
          "controlling only this tab (if you want to controll all tabs, use BrowserWorker.enableControlOverAllTabs())"
        );
      }

      // Cleans old caches
      event.waitUntil(
        caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames
              .filter(
                cacheName =>
                  !BrowserWorker._activeCachesName.includes(cacheName)
              )
              .map(cacheName => caches.delete(cacheName)),
            Console.displayInfo("cleaned old caches.")
          );
        })
      );
    });
  }

  static _installServiceWorker() {
    self.addEventListener("install", () => {
      if (!this._waitOtherInstances) {
        self.skipWaiting();

        Console.displayInfo("skipped waiting for other instances to finish.");
      } else {
        Console.displayInfo(
          "waiting for others instances before installing (if you want to skip waiting, use BrowserWorker.disableWaitingOtherInstances())"
        );
      }
    });
  }

  static _listenRequests() {
    self.addEventListener("fetch", async event => {
      BrowserWorker._setCurrentRoute(event.request.url);

      if (BrowserWorker._currentRouteMatches(event.request.url)) {
        if (
          BrowserWorker._currentRouteStrategyIs(CacheStrategy.NETWORK_FIRST)
        ) {
          Response.getFromNetworkFirst(
            event,
            BrowserWorker._getCurrentRouteCacheName()
          );
        } else if (
          BrowserWorker._currentRouteStrategyIs(CacheStrategy.CACHE_FIRST)
        ) {
          Response.getFromCacheFirst(
            event,
            BrowserWorker._getCurrentRouteCacheName()
          );
        } else if (
          BrowserWorker._currentRouteStrategyIs(CacheStrategy.CACHE_ONLY)
        ) {
          Response.getFromCacheOnly(event, Browser._getCurrentRouteCacheName);
        } else {
          Console.displayWarning(
            `unsupported strategy ${BrowserWorker._currentRoute.strategy}`
          );
        }
      } else {
        Console.displayInfo(
          `resource ${event.request.url} do not match any strategy, leaving the browser to handle it`
        );
      }
    });
  }
}

export default BrowserWorker;
