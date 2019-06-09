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
class Route {}

(0, _defineProperty2.default)(Route, "IMAGES", /\.(png|jpg|jpeg|gif|svg|webp)$/i);
(0, _defineProperty2.default)(Route, "VIDEOS", /\.(mp4|ogv|ogg|webm|flv|3gp|mkv)$/i);
(0, _defineProperty2.default)(Route, "AUDIOS", /\.(wav|mp3|ogg)$/i);
(0, _defineProperty2.default)(Route, "ASSETS", /\.(js|css|html|htm)$/i);
var _default = Route;
exports.default = _default;