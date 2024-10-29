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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types';
import { withStyle, jsx } from '@instructure/emotion';
import PlayerMarker from '../../PlayerMarker';
import { translate } from '../../../constants/translated/translations';
import generateStyle from './styles';
import generateComponentTheme from './theme';

function formatTime(time) {
  if (time && typeof time === 'number' && time < Infinity) {
    const hours = Math.floor(time / 3600);
    let minutes = Math.floor(time / 60) % 60;
    let seconds = Math.floor(time % 60);

    if (minutes < 10 && hours > 0) {
      minutes = `0${minutes}`;
    }

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
  }

  return '0:00';
}
/**
---
private: true
---
**/


let Timebar = (_dec = withStyle(generateStyle, generateComponentTheme), _dec(_class = (_temp = _class2 = class Timebar extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      timebarHoverTime: null,
      timebarTooltipPosition: null
    };

    this.handleTimebarScrub = e => {
      const relativeCoordinate = e.pageX - e.currentTarget.getBoundingClientRect().left;
      const position = relativeCoordinate / e.currentTarget.offsetWidth;
      const timestamp = position * this.props.duration;

      if (timestamp < 0 || timestamp > this.props.duration) {
        // Since the tooltip is techincally inside of the container, we have to
        // manually dismiss the tooltip if the user moves the pointer outside of
        // the container.
        this.handleTimebarLeave();
      } else {
        const tooltipCenterOffset = this.tooltip.offsetWidth / 2;
        this.setState({
          hoverTime: timestamp,
          tooltipPosition: Math.min(relativeCoordinate, e.currentTarget.offsetWidth) - tooltipCenterOffset
        });
      }
    };

    this.handleTimebarLeave = () => {
      this.setState({
        hoverTime: null,
        tooltipPosition: null
      });
    };

    this.handleTimebarClick = () => {
      if (this.state.hoverTime) {
        this.props.onClick(this.state.hoverTime);
      }

      this.timebar.focus();
    };

    this.setTimebarRef = el => {
      this.timebar = el;
      this.props.forwardRef(el);
    };
  }

  componentDidMount() {
    const hoverTime = this.state.hoverTime;
    this.props.makeStyles({
      hoverTime
    });
  }

  componentDidUpdate() {
    const hoverTime = this.state.hoverTime;
    this.props.makeStyles({
      hoverTime
    });
  }

  render() {
    const _this$props = this.props,
          duration = _this$props.duration,
          buffered = _this$props.buffered,
          currentTime = _this$props.currentTime,
          mediaState = _this$props.mediaState,
          seeking = _this$props.seeking,
          videoId = _this$props.videoId,
          styles = _this$props.styles;
    const viewedPercent = currentTime / duration * 100 || 0;
    const bufferedPercent = buffered / duration * 100 - viewedPercent || 0;
    const currentTimeText = formatTime(currentTime);
    const timebarProps = {
      css: styles.timebar,
      onMouseMove: this.handleTimebarScrub,
      onMouseLeave: this.handleTimebarLeave,
      onClick: this.handleTimebarClick,
      ref: this.setTimebarRef,
      tabIndex: '0',
      role: 'slider',
      'aria-label': translate('ARIA_TIMEBAR_LABEL'),
      'aria-valuemin': 0,
      'aria-valuemax': duration,
      'aria-valuenow': currentTime,
      'aria-valuetext': currentTimeText,
      'aria-controls': videoId
    };
    const markers = this.props.markers.map(item => {
      return /*#__PURE__*/React.cloneElement(item, {
        currentTime,
        duration,
        mediaState,
        seeking
      });
    });
    return jsx("div", {
      css: styles.timebarWrapper
    }, jsx("div", timebarProps, jsx("div", {
      css: styles.timebarContent
    }, jsx("time", null, currentTimeText), " / ", jsx("time", null, formatTime(duration))), jsx("div", {
      css: styles.viewed,
      style: {
        flexBasis: `${viewedPercent}%`
      }
    }), jsx("div", {
      css: styles.buffered,
      style: {
        flexBasis: `${bufferedPercent}%`
      }
    }), jsx("div", {
      css: styles.rest
    }), jsx("div", {
      css: styles.focusIndicator,
      className: "focusIndicator"
    })), jsx("div", {
      css: styles.tooltipContainer,
      style: {
        left: `${this.state.tooltipPosition}px`
      },
      ref: e => {
        this.tooltip = e;
      }
    }, jsx("div", {
      css: styles.tooltipContent
    }, jsx("div", {
      css: styles.tooltip
    }, formatTime(this.state.hoverTime)), jsx("div", {
      css: styles.tooltipCaret
    }))), jsx("div", {
      css: styles.playhead,
      style: {
        left: `${viewedPercent}%`
      }
    }, this.props.playhead), jsx("div", {
      css: styles.markers
    }, markers));
  }

}, _class2.propTypes = {
  // eslint-disable-next-line react/require-default-props
  makeStyles: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  styles: PropTypes.object,

  /**
   * Id of the video element. Used to ensure
   * correct aria properties are applied.
   */
  videoId: PropTypes.string.isRequired,

  /**
   * Number of seconds that have been buffered.
   */
  buffered: PropTypes.number,

  /**
   * The current playback time in seconds.
   */
  currentTime: PropTypes.number,

  /**
   * The length of the video in seconds.
   */
  duration: PropTypes.number,

  /**
   * Function invoked when timebar is clicked.
   * Invoked with time (in seconds) at the coordinates clicked.
   */
  onClick: PropTypes.func,
  forwardRef: PropTypes.func,
  markers: ChildrenPropTypes.oneOf([PlayerMarker]),
  mediaState: PropTypes.string,
  seeking: PropTypes.bool,
  playhead: PropTypes.node
}, _class2.defaultProps = {
  markers: [],
  playhead: null,
  duration: 0,
  buffered: 0,
  currentTime: 0,
  mediaState: null,
  seeking: false,
  onClick: time => {},
  forwardRef: ref => {}
}, _temp)) || _class);
export default Timebar;