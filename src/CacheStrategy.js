class CacheStrategy {
	static NETWORK_FIRST = "network-first";
	static NETWORK_ONLY = "network-only";
	static CACHE_FIRST = "cache-first";
	static CACHE_ONLY = "cache-only";

	static getSupportedStrategies() {
		return [
			CacheStrategy.NETWORK_FIRST,
			CacheStrategy.NETWORK_ONLY,
			CacheStrategy.CACHE_FIRST,
			CacheStrategy.CACHE_ONLY
		];
	}
}

export default CacheStrategy;
