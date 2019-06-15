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
   * Captures videos resources, including webm.
   *
   * @type {RegExp}
   * @since 0.1.0
   * @example
   * import { BrowserWorker, Route } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.addRoute(Route.VIDEOS);
   */

  /**
   * Captures audios resources.
   *
   * @type {RegExp}
   * @since 0.1.0
   * @example
   * import { BrowserWorker, Route } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.addRoute(Route.AUDIOS);
   */

  /**
   * Captures assets, which means Javascript, CSS and HTML files.
   *
   * @type {RegExp}
   * @since 0.1.0
   * @example
   * import { BrowserWorker, Route } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.addRoute(Route.ASSETS);
   */

  /**
   * Captures fonts resources.
   *
   * @type {RegExp}
   * @since 0.2.0
   * @example
   * import { BrowserWorker, Route } from "@khalyomede/browser-worker";
   *
   * BrowserWorker.addRoute(Route.FONTS);
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
    return route.constructor === String && route.trim().length > 0 || route.constructor === RegExp && route !== new RegExp();
  }

}

(0, _defineProperty2.default)(Route, "IMAGES", /\.(png|jpg|jpeg|gif|svg|webp)(\?.*)*$/i);
(0, _defineProperty2.default)(Route, "VIDEOS", /\.(mp4|ogv|ogg|webm|flv|3gp|mkv)(\?.*)*$/i);
(0, _defineProperty2.default)(Route, "AUDIOS", /\.(wav|mp3|ogg)(\?.*)*$/i);
(0, _defineProperty2.default)(Route, "ASSETS", /\.(js|css|html|htm)(\?.*)*$/i);
(0, _defineProperty2.default)(Route, "FONTS", /\.(woff|woff2|ttf|eot)(\?.*)*$/i);
var _default = Route;
exports.default = _default;