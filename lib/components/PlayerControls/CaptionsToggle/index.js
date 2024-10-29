"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _uiReactUtils = require("@instructure/ui-react-utils");

var _uiIcons = require("@instructure/ui-icons");

var _uiA11yContent = require("@instructure/ui-a11y-content");

var _PlayerButton = _interopRequireDefault(require("../../PlayerButton"));

var _MediaContext = _interopRequireDefault(require("../../Player/MediaContext"));

var _translations = require("../../../constants/translated/translations");

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
const VARIANTS = {
  ON: {
    label: (0, _translations.translate)('TOGGLE_CAPTIONS_OFF'),
    Icon: _uiIcons.IconSubtitlesSolid
  },
  OFF: {
    label: (0, _translations.translate)('TOGGLE_CAPTIONS_ON'),
    Icon: _uiIcons.IconSubtitlesLine
  }
};
/**
---
private: true
---
@module CaptionsToggle
**/

class CaptionsToggle extends _react.Component {
  constructor() {
    super(...arguments);

    this.toggleCaptions = (actions, state) => {
      if (!actions.toggleTrack) return;
      if (!state.tracks || !state.tracks.length) return;

      if (state.selectedTrackId) {
        actions.toggleTrack(null);
      } else {
        actions.toggleTrack(state.tracks[0].id);
      }
    };
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(_MediaContext.default.Consumer, null, _ref => {
      let actions = _ref.actions,
          state = _ref.state,
          fullScreenContainerRef = _ref.fullScreenContainerRef;

      const _ref2 = state.selectedTrackId ? VARIANTS.ON : VARIANTS.OFF,
            label = _ref2.label,
            Icon = _ref2.Icon;

      return /*#__PURE__*/_react.default.createElement(_PlayerButton.default, Object.assign({}, (0, _uiReactUtils.pickProps)(this.props, _PlayerButton.default.propTypes), {
        tooltipLabel: label,
        tooltipMountNode: fullScreenContainerRef,
        videoId: state.videoId,
        onClick: () => this.toggleCaptions(actions, state)
      }), /*#__PURE__*/_react.default.createElement(_uiA11yContent.ScreenReaderContent, null, label), /*#__PURE__*/_react.default.createElement(Icon, {
        size: "x-small"
      }));
    });
  }

}

exports.default = CaptionsToggle;