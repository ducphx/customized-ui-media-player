"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _emotion = require("@instructure/emotion");

var _uiTooltip = require("@instructure/ui-tooltip");

var _uiPropTypes = require("@instructure/ui-prop-types");

var _MediaContext = _interopRequireDefault(require("../Player/MediaContext"));

var _styles = _interopRequireDefault(require("./styles"));

var _theme = _interopRequireDefault(require("./theme"));

var _dec, _class, _class2, _temp;

let PlayerButton = (
/**
---
private: true
---
@module PlayerButton
**/
_dec = (0, _emotion.withStyle)(_styles.default, _theme.default), _dec(_class = (_temp = _class2 = class PlayerButton extends _react.Component {
  constructor() {
    super(...arguments);
    this.state = {
      isShowingTooltip: false
    };

    this.handleKeyDown = e => {
      // prevent FF from emitting a keyboard event
      if (e.key === ' ' || e.key === 'Enter') {
        e.stopPropagation();
      }
    };

    this.handleInsaneBrowsers = e => {
      /*
        On Mac OS X 10.X + (Safari or FF), buttons don't get focused when clicked
        ref: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus
         We want to make sure that experience is consistent throughout different browsers, so we're
        explicitly focusing the PlayerButtons on mouse down.
      */
      e.preventDefault(); // prevent focusing on the Player's container

      if (!this.buttonRef) {
        return;
      }

      this.buttonRef.focus();
    };

    this.handleOnMouseDown = e => {
      this.handleInsaneBrowsers(e);
      this.props.onMouseDown(e);
    };

    this.handleRef = e => {
      this.buttonRef = e;
      this.props.forwardRef(e);
    };

    this.renderButton = _ref => {
      let videoId = _ref.videoId,
          onClick = _ref.onClick,
          children = _ref.children,
          styles = _ref.styles;
      return (0, _emotion.jsx)("button", {
        css: styles.button,
        onMouseDown: this.handleOnMouseDown,
        onClick: onClick,
        onKeyDown: this.handleKeyDown,
        "aria-controls": videoId,
        ref: this.handleRef
      }, (0, _emotion.jsx)("div", {
        css: styles.divWrapper
      }, children));
    };

    this.renderButtonWithTooltip = (props, _ref2) => {
      let controlActivated = _ref2.controlActivated;
      return (0, _emotion.jsx)(_uiTooltip.Tooltip, {
        renderTip: props.tooltipLabel,
        isShowingContent: !controlActivated && this.state.isShowingTooltip,
        onShowContent: () => {
          if (controlActivated) {
            return;
          }

          this.setState({
            isShowingTooltip: true
          });
        },
        onHideContent: () => {
          this.setState({
            isShowingTooltip: false
          });
        },
        mountNode: props.tooltipMountNode
      }, (0, _emotion.jsx)("span", null, this.renderButton(props)));
    };
  }

  componentDidMount() {
    this.props.makeStyles();
  }

  componentDidUpdate() {
    this.props.makeStyles();
  }

  render() {
    const _this$props = this.props,
          tooltipLabel = _this$props.tooltipLabel,
          styles = _this$props.styles;
    return (0, _emotion.jsx)(_MediaContext.default.Consumer, null, _ref3 => {
      let state = _ref3.state;
      return (0, _emotion.jsx)("div", {
        css: styles.buttonWrapper
      }, tooltipLabel ? this.renderButtonWithTooltip(this.props, state) : this.renderButton(this.props));
    });
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
  forwardRef: _propTypes.default.func,
  onClick: _propTypes.default.func,
  onMouseDown: _propTypes.default.func,
  position: _propTypes.default.oneOf(['start', 'middle', 'end']),
  tooltipLabel: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  tooltipMountNode: _propTypes.default.oneOfType([_uiPropTypes.element, _propTypes.default.func]),
  children: _propTypes.default.node
}, _class2.defaultProps = {
  forwardRef: ref => {},
  onClick: e => {},
  onMouseDown: e => {},
  position: 'middle',
  tooltipLabel: _uiTooltip.Tooltip.defaultProps.tooltipLabel,
  tooltipMountNode: _uiTooltip.Tooltip.defaultProps.mountNode
}, _temp)) || _class);
exports.default = PlayerButton;