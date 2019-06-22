class Browser {
	/**
	 * @return {Boolean}
	 */
	static hasCacheApi() {
		return typeof caches === "object" && caches.constructor === CacheStorage;
	}

	/**
	 * @return {Boolean}
	 */
	static hasServiceWorkerApi() {
		return "serviceWorker" in navigator;
	}
}

export default Browser;
