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
	static IMAGES = /\.(png|jpg|jpeg|gif|svg|webp)$/;

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
	static VIDEOS = /\.(mp4|ogg|webm)$/;

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
	static AUDIOS = /\.(wave|webm|ogg|mp3)$/;

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
	static ASSETS = /\.(js|css|html)/;
}

export default Route;
