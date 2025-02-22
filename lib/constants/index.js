"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _screenStates = require("./screenStates");

Object.keys(_screenStates).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _screenStates[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _screenStates[key];
    }
  });
});

var _mediaStates = require("./mediaStates");

Object.keys(_mediaStates).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _mediaStates[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mediaStates[key];
    }
  });
});