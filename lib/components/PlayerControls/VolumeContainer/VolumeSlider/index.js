"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _uiView = require("@instructure/ui-view");

var _uiRangeInput = require("@instructure/ui-range-input");

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
class VolumeSlider extends _react.Component {
  constructor() {
    super(...arguments);

    this.formatValue = volume => parseInt(volume * 100);

    this.handleOnMouseMove = () => {
      this.props.handleShowControls();
    };
  }

  render() {
    const _this$props = this.props,
          value = _this$props.value,
          step = _this$props.step,
          onKeyDown = _this$props.onKeyDown,
          onChange = _this$props.onChange,
          label = _this$props.label;
    return /*#__PURE__*/_react.default.createElement(_uiView.View, {
      padding: "medium",
      as: "div",
      onMouseMove: this.handleOnMouseMove
    }, /*#__PURE__*/_react.default.createElement(_uiRangeInput.RangeInput, {
      defaultValue: 1,
      value: value,
      max: 1,
      min: 0,
      step: step,
      onKeyDown: onKeyDown,
      onChange: onChange,
      formatValue: this.formatValue,
      displayValue: false,
      label: label
    }));
  }

}

VolumeSlider.propTypes = {
  value: _propTypes.default.number.isRequired,
  step: _propTypes.default.number.isRequired,
  onKeyDown: _propTypes.default.func.isRequired,
  onChange: _propTypes.default.func.isRequired,
  label: _propTypes.default.element.isRequired,
  handleShowControls: _propTypes.default.func.isRequired
};
var _default = VolumeSlider;
exports.default = _default;