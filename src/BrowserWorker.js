import CacheStrategy from "./CacheStrategy";
import { throws } from "assert";

class BrowserWorker {
	static _cacheStrategy = "";
	static _currentCacheName = "";
	static _activeCachesName = [];
	static _routes = [];
	static _currentRoute = "";
	static _debug = false;
	static _waitOtherInstances = true;
	static _controlAllTabs = false;
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
		this._controlAllTabs = true;

		return new this();
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

		return new this();
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
		const supportedStrategies = CacheStrategy.getSupportedStrategies();

		if (typeOfStrategy !== "string") {
			throw new TypeError(`expected strategy to be a string (${typeOfStrategy} given)`);
		}

		if (!supportedStrategies.includes(strategy)) {
			const strategies = supportedStrategies.join(", ");

			throw new Error(`unsupported strategy ${strategy} (use one of the following: ${strategies})`);
		}

		BrowserWorker._cacheStrategy = strategy;

		return new this();
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
		if (route === null || route === undefined || (route.constructor !== String && route.constructor !== RegExp)) {
			throw new TypeError(`expected route to be either string or regexp (${typeof route} given)`);
		}

		if (route.constructor === String && route.toString().trim().length === 0) {
			throw new Error("expected route string not to be empty");
		}

		if (!BrowserWorker._cacheStrategyValid()) {
			const supportedCacheStrategies = CacheStrategy.getSupportedStrategies().join(", ");

			throw new Error(
				`the cache strategy is invalid (use BrowserWorker.setCacheStrategy() if you did not yet with one of the following value: ${supportedCacheStrategies})`
			);
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

		return new this();
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
	 * @return {BrowserWorker}
	 * @since 0.1.0
	 * @example
	 * import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";
	 *
	 * BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST);
	 * BrowserWorker.addRoute("/");
	 *
	 * BrowserWorker.deleteRoute("/");
	 */
	static deleteRoute() {
		return new this();
	}

	/**
	 * Delete all routes.
	 *
	 * @return {BrowserWorker}
	 * @since 0.1.0
	 * @example
	 * import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";
	 *
	 * BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST);
	 * BrowserWorker.addRoute("/").addRoute("/about");
	 *
	 * BrowserWorker.deleteRoutes();
	 */
	static deleteRoutes() {
		return new this();
	}

	/**
	 * Returns true if at least one route matches the route or the regexp, else returns false.
	 *
	 * @return {Boolean}
	 * @since 0.1.0
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
	static hasRoute() {
		let hasRoute = false;

		return hasRoute;
	}

	/**
	 *
	 * @param {String} name
	 * @return {BrowserWorker}
	 * @since 0.1.0
	 * @example
	 * import { BrowserWorker, CacheStrategy } from "@khalyomede/browser-worker";
	 *
	 * BrowserWorker.setCacheStrategy(CacheStrategy.NETWORK_FIRST)
	 * 	.setCacheName("network-first-v1");
	 */
	static setCacheName(name) {
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

	static registerServiceWorker() {
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker
				.register(BrowserWorker._serviceWorkerPath)
				.then(serviceWorker => {
					// registration worked
					console.log("Registration succeeded. Scope is " + serviceWorker.scope);
				})
				.catch(function(error) {
					// registration failed
					console.log("Registration failed with " + error);
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
			if (this._controlAllTabs) {
				clients.claim();
			}

			// Cleans old caches
			event.waitUntil(
				caches.keys().then(function(cacheNames) {
					return Promise.all(
						cacheNames
							.filter(cacheName => !BrowserWorker._activeCachesName.includes(cacheName))
							.map(cacheName => caches.delete(cacheName))
					);
				})
			);
		});

		self.addEventListener("install", () => {
			if (!this._waitOtherInstances) {
				self.skipWaiting();
			}
		});

		self.addEventListener("fetch", async event => {
			BrowserWorker._setCurrentRoute(event.request.url);

			if (BrowserWorker._currentRouteMatches(event.request.url)) {
				if (BrowserWorker._currentRouteStrategyIs(CacheStrategy.NETWORK_FIRST)) {
					event.respondWith(
						fetch(event.request)
							.then(response => {
								if (response.ok) {
									caches
										.open(BrowserWorker._getCurrentRouteCacheName())
										.then(cache => cache.put(event.request, response.clone()));

									return response.clone();
								} else {
									return caches.match(event.request);
								}
							})
							.catch(() => caches.match(event.request))
					);
				} else if (BrowserWorker._currentRouteStrategyIs(CacheStrategy.CACHE_FIRST)) {
					event.respondWith(
						caches.match(event.request).then(function(response) {
							if (response) {
								return response;
							}

							return fetch(event.request).then(function(response) {
								if (!response || response.status !== 200 || response.type !== "basic") {
									return response;
								}

								const responseToCache = response.clone();

								caches.open(BrowserWorker._getCurrentRouteCacheName()).then(function(cache) {
									cache.put(event.request, responseToCache);
								});

								return response;
							});
						})
					);
				}
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
			if (
				(route.route.constructor === String && url.endsWith(route.route)) ||
				(route.route.constructor === RegExp && route.route.test(url))
			) {
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
		return (
			BrowserWorker._currentRoute !== null &&
			BrowserWorker._currentRoute !== undefined &&
			BrowserWorker._currentRoute.constructor === Object
		);
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
		return (
			BrowserWorker._currentRouteValid() &&
			(BrowserWorker._currentRouteMatchesByString(url) || BrowserWorker._currentRouteMatchesByRegExp(url))
		);
	}

	/**
	 * @return {String}
	 */
	static _getCurrentRouteCacheName() {
		return BrowserWorker._currentRoute.cacheName;
	}

	/**
	 * @param {String} message
	 * @return {Void}
	 */
	static _displayInfo(message) {
		if (BrowserWorker.debugEnabled()) {
			console.info(message);
		}
	}

	/**
	 * @param {String} message
	 * @return {Void}
	 */
	static _displayError(message) {
		if (BrowserWorker.debugEnabled()) {
			console.error(message);
		}
	}
}

export default BrowserWorker;
