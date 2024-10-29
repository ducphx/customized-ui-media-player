var _dec, _class, _class2, _temp;

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

/** @jsx jsx */
import { Component } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@instructure/ui-buttons';
import { Menu } from '@instructure/ui-menu';
import { withStyle, jsx, InstUISettingsProvider } from '@instructure/emotion';
import MediaContext from '../Player/MediaContext';
import generateStyle from './styles';
import generateComponentTheme, { playheadIconButtonTheme } from './theme';
let PlayerPlayhead = (_dec = withStyle(generateStyle, generateComponentTheme), _dec(_class = (_temp = _class2 = class PlayerPlayhead extends Component {
  constructor() {
    super(...arguments);

    this.focusPlayhead = () => {
      this.buttonRef.focus(); // This is a workaround for an issue caused by the inert polyfill where the polyfill
      // uses a MutationObserver to detect the inert attribute change, and MutationObserver
      // events are asynchronous, so we have to defer focus() to the next tick.
      // https://github.com/WICG/inert/blob/v3.0.0/README.md

      setTimeout(() => {
        this.buttonRef.focus();
      });
    };

    this.setButtonRef = ref => {
      this.buttonRef = ref;
    };

    this.handleOnMouseMove = event => {
      event.stopPropagation();
    };

    this.handleClick = event => {
      event.stopPropagation();
      this.props.onClick(event);
    };
  }

  componentDidMount() {
    this.props.makeStyles();
  }

  componentDidUpdate() {
    this.props.makeStyles();
  }

  renderButton() {
    const _this$props = this.props,
          icon = _this$props.icon,
          label = _this$props.label;
    return jsx(IconButton, {
      elementRef: this.setButtonRef,
      renderIcon: icon,
      onMouseMove: this.handleOnMouseMove,
      onClick: this.handleClick,
      shape: "circle",
      screenReaderLabel: label,
      size: "large"
    });
  }

  renderMenu() {
    const menuItems = this.props.menuItems;
    return jsx(MediaContext.Consumer, null, _ref => {
      let setActions = _ref.setActions,
          fullScreenContainerRef = _ref.fullScreenContainerRef;
      setActions({
        focusPlayhead: this.focusPlayhead
      });
      return jsx(Menu, {
        mountNode: fullScreenContainerRef,
        placement: "top",
        trigger: this.renderButton()
      }, menuItems);
    });
  }

  render() {
    const _this$props2 = this.props,
          variant = _this$props2.variant,
          styles = _this$props2.styles;
    return jsx(InstUISettingsProvider, {
      theme: playheadIconButtonTheme
    }, jsx("div", {
      css: styles.container
    }, variant === 'button' ? this.renderButton() : this.renderMenu()));
  }

}, _class2.propTypes = {
  // eslint-disable-next-line react/require-default-props
  makeStyles: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  styles: PropTypes.object,
  icon: PropTypes.node,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  menuItems: PropTypes.arrayOf(Menu.propTypes.children),
  variant: PropTypes.oneOf(['button', 'menu']).isRequired
}, _class2.defaultProps = {
  icon: null,
  onClick: () => {},
  menuItems: null
}, _temp)) || _class);
export default PlayerPlayhead;