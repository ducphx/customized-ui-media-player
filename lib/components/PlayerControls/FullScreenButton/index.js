"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _uiReactUtils = require("@instructure/ui-react-utils");

var _uiIcons = require("@instructure/ui-icons");

var _uiA11yContent = require("@instructure/ui-a11y-content");

var _PlayerButton = _interopRequireDefault(require("../../PlayerButton"));

var _MediaContext = _interopRequireDefault(require("../../Player/MediaContext"));

var _constants = require("../../../constants");

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

/**
---
private: true
---
**/
class FullScreenButton extends _react.Component {
  config(variant) {
    const VARIANTS = {
      [_constants.WINDOWED_SCREEN]: {
        label: (0, _translations.translate)('FULL_SCREEN'),
        Icon: _uiIcons.IconFullScreenSolid
      },
      [_constants.FULL_SCREEN]: {
        label: (0, _translations.translate)('WINDOWED_SCREEN'),
        Icon: _uiIcons.IconExitFullScreenSolid
      }
    };
    return VARIANTS[variant];
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(_MediaContext.default.Consumer, null, _ref => {
      let state = _ref.state,
          actions = _ref.actions,
          fullScreenContainerRef = _ref.fullScreenContainerRef;

      const _this$config = this.config(state.screenState),
            label = _this$config.label,
            Icon = _this$config.Icon;

      return /*#__PURE__*/_react.default.createElement(_PlayerButton.default, Object.assign({}, (0, _uiReactUtils.pickProps)(this.props, _PlayerButton.default.propTypes), {
        tooltipLabel: label,
        tooltipMountNode: fullScreenContainerRef,
        videoId: state.videoId,
        onClick: actions.toggleFullScreen
      }), /*#__PURE__*/_react.default.createElement(_uiA11yContent.ScreenReaderContent, null, label), /*#__PURE__*/_react.default.createElement(Icon, {
        size: "x-small"
      }));
    });
  }

}

FullScreenButton.propTypes = {
  forwardRef: _propTypes.default.func
};
FullScreenButton.defaultProps = {
  forwardRef: ref => {}
};
var _default = FullScreenButton;
exports.default = _default;