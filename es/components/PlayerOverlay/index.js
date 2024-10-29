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
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { findFocusable } from '@instructure/ui-dom-utils';
import { withStyle, jsx } from '@instructure/emotion';
import { findAncestor } from '../../utils/findAncestor';
import generateStyle from './styles';
export const INSULATE_EVENTS = ['onKeyDown', 'onKeyPress', 'onKeyUp', 'onMouseDown', 'onClick', 'onMouseUp'];
/**
---
private: true
---
@module PlayerOverlay
**/

let PlayerOverlay = (_dec = withStyle(generateStyle, null), _dec(_class = (_temp = _class2 = class PlayerOverlay extends Component {
  constructor() {
    super(...arguments);

    this.handleEvent = event => {
      event.stopPropagation();
    };

    this.onFocus = event => {
      if (this.overlayRef !== document.activeElement) {
        return;
      }

      const focusable = findFocusable(this.overlayRef, el => !findAncestor(el, node => node.getAttribute && node.getAttribute('aria-hidden') === 'true'));

      if (focusable.length) {
        focusable[0].focus();
      }
    };
  }

  componentDidMount() {
    this.props.makeStyles();
    this.renderChildren();
  }

  componentDidUpdate() {
    this.props.makeStyles();
    this.renderChildren();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.overlayRef);
    this.props.setFocusEnabled(true);
  }

  renderChildren() {
    ReactDOM.render(this.props.children(this.overlayRef), this.overlayRef);
  }

  render() {
    const styles = this.props.styles;
    const overlayEvents = {};
    INSULATE_EVENTS.forEach(eventName => {
      overlayEvents[eventName] = event => {
        this.handleEvent(event);
      };
    });
    return jsx("div", Object.assign({
      css: styles.container,
      ref: ref => {
        this.overlayRef = ref;
      }
    }, overlayEvents));
  }

}, _class2.propTypes = {
  // eslint-disable-next-line react/require-default-props
  makeStyles: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  styles: PropTypes.object,
  children: PropTypes.func,
  setFocusEnabled: PropTypes.func
}, _class2.defaultProps = {
  children: () => {},
  setFocusEnabled: () => {}
}, _temp)) || _class);
export default PlayerOverlay;