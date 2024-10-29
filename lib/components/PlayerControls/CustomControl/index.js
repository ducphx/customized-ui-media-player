"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _uiFlex = require("@instructure/ui-flex");

var _uiCheckbox = require("@instructure/ui-checkbox");

var _uiA11yContent = require("@instructure/ui-a11y-content");

var _MediaContext = _interopRequireDefault(require("../../Player/MediaContext"));

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
@module CustomControl
**/
class CustomControl extends _react.Component {
  constructor() {
    super(...arguments);
    this.state = {
      toggleCheckedStatus: true
    };
  }

  renderButton() {
    const _this$props = this.props,
          label = _this$props.label,
          onClick = _this$props.onClick,
          checked = _this$props.checked;
    return /*#__PURE__*/_react.default.createElement(_uiCheckbox.Checkbox, {
      label: /*#__PURE__*/_react.default.createElement(_uiA11yContent.ScreenReaderContent, null, label),
      variant: "toggle",
      labelPlacement: "start",
      onClick: onClick,
      checked: checked,
      onChange: () => {
        this.setState({
          toggleCheckedStatus: this.props.checked
        });
      },
      readOnly: true
    });
  }

  renderMenu() {
    const menuItems = this.props.menuItems;
    return /*#__PURE__*/_react.default.createElement(_uiFlex.Flex, {
      direction: "column"
    }, menuItems());
  }

  render() {
    const variant = this.props.variant;
    return /*#__PURE__*/_react.default.createElement(_MediaContext.default.Consumer, null, () => {
      return variant === 'menu' ? this.renderMenu() : /*#__PURE__*/_react.default.createElement("span", null, this.renderButton());
    });
  }

}

exports.default = CustomControl;
CustomControl.displayName = 'CustomControl';
CustomControl.propTypes = {
  variant: _propTypes.default.oneOf(['button', 'menu']),
  menuItems: _propTypes.default.func,
  label: _propTypes.default.string,
  onClick: _propTypes.default.func,
  checked: _propTypes.default.bool
};
CustomControl.defaultProps = {
  variant: 'button',
  menuItems: () => null,
  onClick: () => {},
  checked: false,
  label: ''
};