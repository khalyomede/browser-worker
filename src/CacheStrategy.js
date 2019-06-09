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
	static NETWORK_FIRST = "network-first";

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
	static CACHE_FIRST = "cache-first";

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
}

export default CacheStrategy;
