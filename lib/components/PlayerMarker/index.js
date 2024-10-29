"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _uiA11yContent = require("@instructure/ui-a11y-content");

var _emotion = require("@instructure/emotion");

var _constants = require("../../constants");

var _MediaContext = _interopRequireDefault(require("../Player/MediaContext"));

var _styles = _interopRequireDefault(require("./styles"));

var _theme = _interopRequireDefault(require("./theme"));

var _dec, _class, _class2, _temp;

/**
---
private: true
---
@module PlayerMarker
**/
let PlayerMarker = (_dec = (0, _emotion.withStyle)(_styles.default, _theme.default), _dec(_class = (_temp = _class2 = class PlayerMarker extends _react.Component {
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

    if (seeking || !onReached || mediaState !== _constants.PLAYING) {
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

    return (0, _emotion.jsx)(Component, Object.assign({
      css: styles.circle
    }, clickableProps), hoverIcon && (0, _emotion.jsx)("span", {
      css: styles.hoverIcon,
      className: "hoverIcon"
    }, hoverIcon), icon && (0, _emotion.jsx)("span", {
      css: styles.icon,
      className: "icon"
    }, icon), (0, _emotion.jsx)(_uiA11yContent.ScreenReaderContent, null, label));
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
    return (0, _emotion.jsx)(_MediaContext.default.Consumer, null, _ref => {
      let setActions = _ref.setActions;
      setActions({
        focusMarker: this.focusMarker
      });
      return (0, _emotion.jsx)("div", {
        css: styles.container,
        style: {
          left: `${position}%`
        }
      }, variant === 'circle' ? this.renderCircle() : null);
    });
  }

}, _class2.propTypes = {
  // eslint-disable-next-line react/require-default-props
  makeStyles: _propTypes.default.func,
  // eslint-disable-next-line react/require-default-props
  styles: _propTypes.default.object,
  active: _propTypes.default.bool,
  currentTime: _propTypes.default.number,
  duration: _propTypes.default.number,
  hoverIcon: _propTypes.default.node,
  icon: _propTypes.default.node,
  id: _propTypes.default.string.isRequired,
  label: _propTypes.default.string,
  mediaState: _propTypes.default.string,
  onClick: _propTypes.default.func,
  onReached: _propTypes.default.func,
  time: _propTypes.default.number,
  seeking: _propTypes.default.bool,
  variant: _propTypes.default.oneOf(['circle', 'hidden'])
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
var _default = PlayerMarker;
exports.default = _default;