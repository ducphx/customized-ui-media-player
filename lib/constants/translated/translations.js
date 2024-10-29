"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TranslationPropTypes = void 0;
exports.applyTranslations = applyTranslations;
exports.translate = translate;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

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
let translations = {
  ARIA_TIMEBAR_LABEL: 'Timebar',
  ARIA_VIDEO_LABEL: 'Video Player',
  PLAYBACK_PAUSE: 'Pause',
  PLAYBACK_PLAY: 'Play',
  FULL_SCREEN: 'Full Screen',
  WINDOWED_SCREEN: 'Windowed Screen',
  VOLUME_UNMUTED: 'Volume',
  VOLUME_MUTED: 'Muted',
  PLAYBACK_SPEED: 'Playback Speed',
  PLAYER_SETTINGS: 'Player Settings',
  SOURCE_CHOOSER: 'Source Chooser',
  VIDEO_TRACK: 'Video Track',
  CAPTIONS_OFF: 'Off',
  SETTINGS: 'Settings',
  BACK: 'Back',
  STANDARD: 'Standard',
  OFF: 'Off',
  CAPTIONS: 'Captions',
  SPEED: 'Speed',
  QUALITY: 'Quality',
  TOGGLE_CAPTIONS_ON: 'Toggle Captions On',
  TOGGLE_CAPTIONS_OFF: 'Toggle Captions Off'
};
const TranslationPropTypes = Object.keys(translations).reduce((pt, key) => (0, _objectSpread2.default)((0, _objectSpread2.default)({}, pt), {}, {
  [key]: _propTypes.default.string
}), {});
exports.TranslationPropTypes = TranslationPropTypes;

function applyTranslations(consumerTranslations) {
  translations = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, translations), consumerTranslations);
}

function translate(key) {
  return translations[key];
}