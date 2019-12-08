/**
 * Conceptualize route captures to intercept requests for various common types of resources like images, assets, ...
 *
 * @since 0.1.0
 */
class Route {
  /**
   *
   * @param {String|RegExp} route
   * @return {Route}
   * @todo Check if the route is valid.
   */
  constructor(route) {
    this.route = route;
  }

  /**
   * @param {String|RegExp} url
   * @return {Boolean}
   */
  matches(url) {
    return this.matchesByString(url) || this.matchesByRegExp(url);
  }

  /**
   *
   * @param {String|RegExp} url
   * @return {Boolean}
   */
  matchesByString(url) {
    return typeof this.route === "string" && url.endsWith(this.route);
  }

  /**
   *
   */
  matchesByRegExp(url) {
    return this.route instanceof RegExp && this.route.test(url);
  }

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
  static IMAGES = /\.(png|jpg|jpeg|gif|svg|webp)(\?.*)*$/i;

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
  static VIDEOS = /\.(mp4|ogv|ogg|webm|flv|3gp|mkv)(\?.*)*$/i;

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
  static AUDIOS = /\.(wav|mp3|ogg)(\?.*)*$/i;

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
  static ASSETS = /\.(js|css|html|htm)(\?.*)*$/i;

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
  static FONTS = /\.(woff|woff2|ttf|eot)(\?.*)*$/i;

  /**
   * @param {String} route
   * @return {Boolean}
   */
  static isValid(route) {
    return (
      route !== null &&
      route !== undefined &&
      (typeof route === "string" || route instanceof RegExp)
    );
  }

  /**
   * @param {String} route
   * @return {Boolean}
   */
  static isFilled(route) {
    return (
      (typeof route === "string" && route.trim().length > 0) ||
      (route instanceof RegExp && route.toString() !== new RegExp().toString())
    );
  }
}

export default Route;
