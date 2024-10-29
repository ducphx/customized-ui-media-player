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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@instructure/ui-flex';
import { Checkbox } from '@instructure/ui-checkbox';
import { ScreenReaderContent } from '@instructure/ui-a11y-content';
import MediaContext from '../../Player/MediaContext';
/**
---
private: true
---
@module CustomControl
**/

export default class CustomControl extends Component {
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
    return /*#__PURE__*/React.createElement(Checkbox, {
      label: /*#__PURE__*/React.createElement(ScreenReaderContent, null, label),
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
    return /*#__PURE__*/React.createElement(Flex, {
      direction: "column"
    }, menuItems());
  }

  render() {
    const variant = this.props.variant;
    return /*#__PURE__*/React.createElement(MediaContext.Consumer, null, () => {
      return variant === 'menu' ? this.renderMenu() : /*#__PURE__*/React.createElement("span", null, this.renderButton());
    });
  }

}
CustomControl.displayName = 'CustomControl';
CustomControl.propTypes = {
  variant: PropTypes.oneOf(['button', 'menu']),
  menuItems: PropTypes.func,
  label: PropTypes.string,
  onClick: PropTypes.func,
  checked: PropTypes.bool
};
CustomControl.defaultProps = {
  variant: 'button',
  menuItems: () => null,
  onClick: () => {},
  checked: false,
  label: ''
};