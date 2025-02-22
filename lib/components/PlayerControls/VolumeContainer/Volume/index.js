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

var _uiPopover = require("@instructure/ui-popover");

var _uiIcons = require("@instructure/ui-icons");

var _uiA11yContent = require("@instructure/ui-a11y-content");

var _VolumeSlider = _interopRequireDefault(require("../VolumeSlider"));

var _PlayerButton = _interopRequireDefault(require("../../../PlayerButton"));

var _translations = require("../../../../constants/translated/translations");

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
class Volume extends _react.Component {
  config(muted) {
    if (!muted) {
      return {
        label: (0, _translations.translate)('VOLUME_UNMUTED'),
        Icon: _uiIcons.IconAudioSolid
      };
    }

    return {
      label: (0, _translations.translate)('VOLUME_MUTED'),
      Icon: _uiIcons.IconAudioOffSolid
    };
  }

  render() {
    const _this$props = this.props,
          muted = _this$props.muted,
          volume = _this$props.volume,
          showPopover = _this$props.showPopover,
          togglePopover = _this$props.togglePopover,
          videoId = _this$props.videoId,
          step = _this$props.step,
          onChange = _this$props.onChange,
          onKeyDown = _this$props.onKeyDown,
          mountNode = _this$props.mountNode,
          handleShowControls = _this$props.handleShowControls;

    const _this$config = this.config(muted || volume === 0),
          label = _this$config.label,
          Icon = _this$config.Icon;

    const value = muted ? 0 : volume;

    const srLabel = /*#__PURE__*/_react.default.createElement(_uiA11yContent.ScreenReaderContent, null, label);

    return /*#__PURE__*/_react.default.createElement(_uiPopover.Popover, {
      placement: "top",
      on: "click",
      isShowingContent: showPopover,
      onShowContent: togglePopover,
      onHideContent: togglePopover,
      mountNode: mountNode(),
      color: "primary-inverse",
      renderTrigger: /*#__PURE__*/_react.default.createElement(_PlayerButton.default, Object.assign({}, (0, _uiReactUtils.pickProps)(this.props, _PlayerButton.default.propTypes), {
        tooltipLabel: label,
        tooltipMountNode: mountNode,
        videoId: videoId
      }), srLabel, /*#__PURE__*/_react.default.createElement(Icon, {
        size: "x-small"
      }))
    }, /*#__PURE__*/_react.default.createElement(_VolumeSlider.default, {
      value: value,
      step: step,
      onChange: onChange,
      onKeyDown: onKeyDown,
      label: srLabel,
      handleShowControls: handleShowControls
    }));
  }

}

Volume.propTypes = {
  muted: _propTypes.default.bool.isRequired,
  volume: _propTypes.default.number.isRequired,
  showPopover: _propTypes.default.bool.isRequired,
  videoId: _propTypes.default.string.isRequired,
  step: _propTypes.default.number.isRequired,
  onChange: _propTypes.default.func.isRequired,
  onKeyDown: _propTypes.default.func.isRequired,
  togglePopover: _propTypes.default.func.isRequired,
  mountNode: _propTypes.default.func.isRequired,
  handleShowControls: _propTypes.default.func.isRequired,
  forwardRef: _propTypes.default.func,
  children: _propTypes.default.node
};
Volume.defaultProps = {
  forwardRef: ref => {}
};
var _default = Volume;
exports.default = _default;