"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

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

/**
---
private: true
---
@module PlayerPopover
**/
class PlayerPopover extends _react.Component {
  constructor() {
    super(...arguments);
    this.state = {
      showPopover: false
    };

    this.togglePopover = () => {
      if (this.state.showPopover) {
        this.hidePopover();
      } else {
        this.showPopover();
      }
    };

    this.hidePopover = () => {
      this.setState({
        showPopover: false
      });
      this.props.deactivateControl();
    };

    this.showPopover = () => {
      this.props.activateControl();
      this.setState({
        showPopover: true
      });
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.showControls !== prevProps.showControls && !this.props.showControls) {
      this.hidePopover();
    }
  }

  render() {
    return this.props.children(this.state, this.togglePopover);
  }

}

PlayerPopover.propTypes = {
  activateControl: _propTypes.default.func,
  deactivateControl: _propTypes.default.func,
  showControls: _propTypes.default.bool.isRequired,
  children: _propTypes.default.func
};
PlayerPopover.defaultProps = {
  activateControl: () => {},
  deactivateControl: () => {},
  children: null
};
var _default = PlayerPopover;
exports.default = _default;