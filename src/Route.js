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
	static IMAGES = /\.(png|jpg|jpeg|gif|svg|webp)$/i;

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
	static VIDEOS = /\.(mp4|ogv|ogg|webm|flv|3gp|mkv)$/i;

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
	static AUDIOS = /\.(wav|mp3|ogg)$/i;

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
	static ASSETS = /\.(js|css|html|htm)$/i;

	/**
	 * @todo add fonts regular expression
	 */
}

export default Route;
