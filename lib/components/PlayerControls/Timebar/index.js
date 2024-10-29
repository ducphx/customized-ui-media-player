"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _uiPropTypes = require("@instructure/ui-prop-types");

var _emotion = require("@instructure/emotion");

var _PlayerMarker = _interopRequireDefault(require("../../PlayerMarker"));

var _translations = require("../../../constants/translated/translations");

var _styles = _interopRequireDefault(require("./styles"));

var _theme = _interopRequireDefault(require("./theme"));

var _dec, _class, _class2, _temp;

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


let Timebar = (_dec = (0, _emotion.withStyle)(_styles.default, _theme.default), _dec(_class = (_temp = _class2 = class Timebar extends _react.Component {
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
      'aria-label': (0, _translations.translate)('ARIA_TIMEBAR_LABEL'),
      'aria-valuemin': 0,
      'aria-valuemax': duration,
      'aria-valuenow': currentTime,
      'aria-valuetext': currentTimeText,
      'aria-controls': videoId
    };
    const markers = this.props.markers.map(item => {
      return /*#__PURE__*/_react.default.cloneElement(item, {
        currentTime,
        duration,
        mediaState,
        seeking
      });
    });
    return (0, _emotion.jsx)("div", {
      css: styles.timebarWrapper
    }, (0, _emotion.jsx)("div", timebarProps, (0, _emotion.jsx)("div", {
      css: styles.timebarContent
    }, (0, _emotion.jsx)("time", null, currentTimeText), " / ", (0, _emotion.jsx)("time", null, formatTime(duration))), (0, _emotion.jsx)("div", {
      css: styles.viewed,
      style: {
        flexBasis: `${viewedPercent}%`
      }
    }), (0, _emotion.jsx)("div", {
      css: styles.buffered,
      style: {
        flexBasis: `${bufferedPercent}%`
      }
    }), (0, _emotion.jsx)("div", {
      css: styles.rest
    }), (0, _emotion.jsx)("div", {
      css: styles.focusIndicator,
      className: "focusIndicator"
    })), (0, _emotion.jsx)("div", {
      css: styles.tooltipContainer,
      style: {
        left: `${this.state.tooltipPosition}px`
      },
      ref: e => {
        this.tooltip = e;
      }
    }, (0, _emotion.jsx)("div", {
      css: styles.tooltipContent
    }, (0, _emotion.jsx)("div", {
      css: styles.tooltip
    }, formatTime(this.state.hoverTime)), (0, _emotion.jsx)("div", {
      css: styles.tooltipCaret
    }))), (0, _emotion.jsx)("div", {
      css: styles.playhead,
      style: {
        left: `${viewedPercent}%`
      }
    }, this.props.playhead), (0, _emotion.jsx)("div", {
      css: styles.markers
    }, markers));
  }

}, _class2.propTypes = {
  // eslint-disable-next-line react/require-default-props
  makeStyles: _propTypes.default.func,
  // eslint-disable-next-line react/require-default-props
  styles: _propTypes.default.object,

  /**
   * Id of the video element. Used to ensure
   * correct aria properties are applied.
   */
  videoId: _propTypes.default.string.isRequired,

  /**
   * Number of seconds that have been buffered.
   */
  buffered: _propTypes.default.number,

  /**
   * The current playback time in seconds.
   */
  currentTime: _propTypes.default.number,

  /**
   * The length of the video in seconds.
   */
  duration: _propTypes.default.number,

  /**
   * Function invoked when timebar is clicked.
   * Invoked with time (in seconds) at the coordinates clicked.
   */
  onClick: _propTypes.default.func,
  forwardRef: _propTypes.default.func,
  markers: _uiPropTypes.Children.oneOf([_PlayerMarker.default]),
  mediaState: _propTypes.default.string,
  seeking: _propTypes.default.bool,
  playhead: _propTypes.default.node
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
var _default = Timebar;
exports.default = _default;