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
  /**
   * @param {Event} event
   * @param {String} cacheName
   * @return {Void}
   */


  static getFromCacheOnly(event, cacheName) {
    event.respondWith(caches.match(event.request).then(function (response) {
      if (response) {
        _Console.default.displayInfo(`[CacheOnly] fetched ${event.request.url} from the cache`);

        return response;
      } else {
        _Console.default.displayWarning(`[CacheOnly] No cache found for ${event.request.url}, cannot return a response.`);
      }
    }));
  }

}

var _default = Response;
exports.default = _default;