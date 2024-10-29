"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _MediaContext = _interopRequireDefault(require("../../Player/MediaContext"));

var _uiA11yContent = require("@instructure/ui-a11y-content");

var _uiFlex = require("@instructure/ui-flex");

var _uiMenu = require("@instructure/ui-menu");

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

/**
---
private: true
---
@module PlaybackSpeedContainer
**/
class PlaybackSpeedContainer extends _react.Component {
  constructor() {
    super(...arguments);

    this.handleKeyDown = showControls => e => {
      e.preventDefault();
      showControls();
    };

    this.handleOnSelect = setPlaybackSpeed => (e, _ref) => {
      let _ref2 = (0, _slicedToArray2.default)(_ref, 1),
          speed = _ref2[0];

      setPlaybackSpeed(speed);
    };

    this.renderPlaybackSpeedOptionLabels = (playbackSpeedOptions, actions) => playbackSpeedOptions.map(playbackSpeed => /*#__PURE__*/_react.default.createElement(_uiMenu.Menu.Item, {
      key: playbackSpeed.toString(),
      value: playbackSpeed,
      onKeyDown: this.handleKeyDown(actions.showControls)
    }, /*#__PURE__*/_react.default.createElement(_uiFlex.Flex, null, /*#__PURE__*/_react.default.createElement(_uiFlex.Flex.Item, null, playbackSpeed, "x"))));
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(_MediaContext.default.Consumer, null, _ref3 => {
      let state = _ref3.state,
          actions = _ref3.actions,
          playbackSpeedOptions = _ref3.playbackSpeedOptions;
      const playbackSpeed = state.playbackSpeed;

      if (!playbackSpeedOptions || !playbackSpeedOptions.length) {
        return null;
      }

      return /*#__PURE__*/_react.default.createElement(_uiMenu.Menu.Group, {
        label: /*#__PURE__*/_react.default.createElement(_uiA11yContent.ScreenReaderContent, null, this.props.name),
        selected: [playbackSpeed],
        onSelect: this.handleOnSelect(actions.setPlaybackSpeed)
      }, this.renderPlaybackSpeedOptionLabels(playbackSpeedOptions, actions));
    });
  }

}

exports.default = PlaybackSpeedContainer;
PlaybackSpeedContainer.displayName = _uiMenu.Menu.Item.displayName;