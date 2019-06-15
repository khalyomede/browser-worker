"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

class Console {
  /**
   * @var {Boolean}
   */

  /**
   *
   * @param {String} message
   * @return {String}
   */
  static _getDisplayMessage(message) {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const milliseconds = date.getMilliseconds();
    const timestamp = `${hours}:${minutes}:${seconds}.${milliseconds}`;
    return `[BrowserWorker][${timestamp}] ${message}`;
  }
  /**
   * @param {String} message
   * @return {Void}
   */


  static displayInfo(message) {
    Console._displayMessage(message, "info");
  }
  /**
   * @param {String} message
   * @return {Void}
   */


  static displayError(message) {
    Console._displayMessage(message, "error");
  }
  /**
   *
   * @param {String} message
   * @return {Void}
   */


  static displayWarning(message) {
    Console._displayMessage(message, "warn");
  }
  /**
   *
   * @param {String} message The message
   * @param {String} severity One of the following: "info", "warn", "error", "log".
   * @todo Check if the severity is supported.
   */


  static _displayMessage(message, severity) {
    if (Console.debugEnabled()) {
      console[severity](Console._getDisplayMessage(message));
    }
  }
  /**
   * @return {Void}
   */


  static enableDebug() {
    Console._debug = true;
  }
  /**
   * @return {Void}
   */


  static disableDebug() {
    Console._debug = false;
  }
  /**
   * @return {Boolean}
   */


  static debugEnabled() {
    return Console._debug;
  }

}

(0, _defineProperty2.default)(Console, "_debug", false);
var _default = Console;
exports.default = _default;