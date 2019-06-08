"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

class Route {}

(0, _defineProperty2.default)(Route, "IMAGES", /\.(png|jpg|jpeg|gif|svg|webp)$/);
(0, _defineProperty2.default)(Route, "VIDEOS", /\.(mp4|ogg|webm)$/);
(0, _defineProperty2.default)(Route, "AUDIOS", /\.(wave|webm|ogg|mp3)$/);
(0, _defineProperty2.default)(Route, "ASSETS", /\.(js|css|html)/);
var _default = Route;
exports.default = _default;