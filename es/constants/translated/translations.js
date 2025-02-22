import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";

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
import PropTypes from 'prop-types';
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
export const TranslationPropTypes = Object.keys(translations).reduce((pt, key) => _objectSpread(_objectSpread({}, pt), {}, {
  [key]: PropTypes.string
}), {});
export function applyTranslations(consumerTranslations) {
  translations = _objectSpread(_objectSpread({}, translations), consumerTranslations);
}
export function translate(key) {
  return translations[key];
}