"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

class CacheStrategy {
  static getSupportedStrategies() {
    return [CacheStrategy.NETWORK_FIRST, CacheStrategy.NETWORK_ONLY, CacheStrategy.CACHE_FIRST, CacheStrategy.CACHE_ONLY];
  }

}

(0, _defineProperty2.default)(CacheStrategy, "NETWORK_FIRST", "network-first");
(0, _defineProperty2.default)(CacheStrategy, "NETWORK_ONLY", "network-only");
(0, _defineProperty2.default)(CacheStrategy, "CACHE_FIRST", "cache-first");
(0, _defineProperty2.default)(CacheStrategy, "CACHE_ONLY", "cache-only");
var _default = CacheStrategy;
exports.default = _default;