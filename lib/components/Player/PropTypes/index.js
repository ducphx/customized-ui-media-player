"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tracksType = exports.sourcesType = exports.rendererEventsTypeSet = exports.playerEventsTypeSet = exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
const playerEventsTypeSet = {
  'onControlsHidden': _propTypes.default.func,
  'onControlsShown': _propTypes.default.func
};
exports.playerEventsTypeSet = playerEventsTypeSet;
const rendererEventsTypeSet = {
  'onCanPlay': _propTypes.default.func,
  'onEnded': _propTypes.default.func,
  'onError': _propTypes.default.func,
  'onLoadedData': _propTypes.default.func,
  'onLoadedMetadata': _propTypes.default.func,
  'onPause': _propTypes.default.func,
  'onPlay': _propTypes.default.func,
  'onPlaying': _propTypes.default.func,
  'onProgress': _propTypes.default.func,
  'onRateChange': _propTypes.default.func,
  'onSeeked': _propTypes.default.func,
  'onSeeking': _propTypes.default.func,
  'onStalled': _propTypes.default.func,
  'onTimeUpdate': _propTypes.default.func,
  'onVolumeChange': _propTypes.default.func,
  'onWaiting': _propTypes.default.func
};
exports.rendererEventsTypeSet = rendererEventsTypeSet;

const sourcesType = _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.shape({
  src: _propTypes.default.string.isRequired,
  label: _propTypes.default.string.isRequired,
  defaultSelected: _propTypes.default.bool
})]))]).isRequired;

exports.sourcesType = sourcesType;

const tracksType = _propTypes.default.arrayOf(_propTypes.default.shape({
  id: _propTypes.default.string,
  src: _propTypes.default.string.isRequired,
  label: _propTypes.default.string.isRequired,
  language: _propTypes.default.string.isRequired,
  type: _propTypes.default.string.isRequired
}));

exports.tracksType = tracksType;
var _default = {
  playerEventsTypeSet,
  rendererEventsTypeSet,
  sourcesType,
  tracksType
};
exports.default = _default;