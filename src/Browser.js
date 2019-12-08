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

export default Browser;
