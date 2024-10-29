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
import { ScreenReaderContent } from '@instructure/ui-a11y-content';
import { withStyle, jsx } from '@instructure/emotion';
import { PLAYING } from '../../constants';
import MediaContext from '../Player/MediaContext';
import generateStyle from './styles';
import generateComponentTheme from './theme';
/**
---
private: true
---
@module PlayerMarker
**/

let PlayerMarker = (_dec = withStyle(generateStyle, generateComponentTheme), _dec(_class = (_temp = _class2 = class PlayerMarker extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      isFocused: false,
      isHovered: false
    };

    this.focusMarker = id => {
      const instanceRef = PlayerMarker._instances[id];

      if (instanceRef) {
        instanceRef.buttonRef.focus(); // This is a workaround for an issue caused by the inert polyfill where the polyfill
        // uses a MutationObserver to detect the inert attribute change, and MutationObserver
        // events are asynchronous, so we have to defer focus() to the next tick.
        // https://github.com/WICG/inert/blob/v3.0.0/README.md

        setTimeout(() => {
          instanceRef.buttonRef.focus();
        });
      }
    };

    this.handleClick = e => {
      e.stopPropagation();
      const onClick = this.props.onClick;
      onClick && onClick(e);
    };

    this.handleOnMouseMove = event => {
      event.stopPropagation();
      this.setHovered(true);
    };
  }

  componentDidMount() {
    const _this$state = this.state,
          isFocused = _this$state.isFocused,
          isHovered = _this$state.isHovered;
    PlayerMarker._instances[this.props.id] = this;
    this.props.makeStyles({
      isFocused,
      isHovered
    });
  }

  componentWillUnmount() {
    delete PlayerMarker._instances[this.props.id];
  }

  componentDidUpdate(prevProps) {
    const _this$props = this.props,
          currentTime = _this$props.currentTime,
          id = _this$props.id,
          mediaState = _this$props.mediaState,
          onReached = _this$props.onReached,
          time = _this$props.time,
          seeking = _this$props.seeking,
          makeStyles = _this$props.makeStyles;
    const prevTime = prevProps.currentTime,
          prevId = prevProps.id;
    const _this$state2 = this.state,
          isFocused = _this$state2.isFocused,
          isHovered = _this$state2.isHovered;
    makeStyles({
      isFocused,
      isHovered
    });

    if (id !== prevId) {
      PlayerMarker._instances[id] = this;
      delete PlayerMarker._instances[prevId];
    }

    if (seeking || !onReached || mediaState !== PLAYING) {
      return;
    }

    const markerPassedByPlayhead = time > prevTime && time <= currentTime;
    const markerAtZeroAndPlaying = time === 0 && prevTime === 0 && currentTime > 0;

    if (markerPassedByPlayhead || markerAtZeroAndPlaying) {
      onReached();
    }
  }

  setFocused(isFocused) {
    this.setState({
      isFocused
    });
  }

  setHovered(isHovered) {
    this.setState({
      isHovered
    });
  }

  renderCircle() {
    const _this$props2 = this.props,
          hoverIcon = _this$props2.hoverIcon,
          icon = _this$props2.icon,
          label = _this$props2.label,
          onClick = _this$props2.onClick,
          styles = _this$props2.styles;
    const Component = onClick ? 'button' : 'div';
    const clickableProps = onClick ? {
      onBlur: () => {
        this.setFocused(false);
      },
      onClick: this.handleClick,
      onFocus: () => {
        this.setFocused(true);
      },
      onMouseMove: this.handleOnMouseMove,
      onMouseOut: () => {
        this.setHovered(false);
      },
      onMouseOver: () => {
        this.setHovered(true);
      },
      ref: el => {
        this.buttonRef = el;
      }
    } : null;
    /* eslint-disable jsx-a11y/mouse-events-have-key-events */

    return jsx(Component, Object.assign({
      css: styles.circle
    }, clickableProps), hoverIcon && jsx("span", {
      css: styles.hoverIcon,
      className: "hoverIcon"
    }, hoverIcon), icon && jsx("span", {
      css: styles.icon,
      className: "icon"
    }, icon), jsx(ScreenReaderContent, null, label));
    /* eslint-enable jsx-a11y/mouse-events-have-key-events */
  }

  render() {
    const _this$props3 = this.props,
          duration = _this$props3.duration,
          time = _this$props3.time,
          variant = _this$props3.variant,
          styles = _this$props3.styles;

    if (variant === 'hidden') {
      return null;
    }

    const position = time / duration * 100 || 0;
    return jsx(MediaContext.Consumer, null, _ref => {
      let setActions = _ref.setActions;
      setActions({
        focusMarker: this.focusMarker
      });
      return jsx("div", {
        css: styles.container,
        style: {
          left: `${position}%`
        }
      }, variant === 'circle' ? this.renderCircle() : null);
    });
  }

}, _class2.propTypes = {
  // eslint-disable-next-line react/require-default-props
  makeStyles: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  styles: PropTypes.object,
  active: PropTypes.bool,
  currentTime: PropTypes.number,
  duration: PropTypes.number,
  hoverIcon: PropTypes.node,
  icon: PropTypes.node,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  mediaState: PropTypes.string,
  onClick: PropTypes.func,
  onReached: PropTypes.func,
  time: PropTypes.number,
  seeking: PropTypes.bool,
  variant: PropTypes.oneOf(['circle', 'hidden'])
}, _class2.defaultProps = {
  active: false,
  currentTime: 0,
  duration: 0,
  hoverIcon: null,
  icon: null,
  label: '',
  mediaState: null,
  onClick: null,
  onReached: null,
  time: 0,
  seeking: false,
  variant: 'hidden'
}, _class2._instances = {}, _temp)) || _class);
export default PlayerMarker;