"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _uiButtons = require("@instructure/ui-buttons");

var _uiMenu = require("@instructure/ui-menu");

var _emotion = require("@instructure/emotion");

var _MediaContext = _interopRequireDefault(require("../Player/MediaContext"));

var _styles = _interopRequireDefault(require("./styles"));

var _theme = _interopRequireWildcard(require("./theme"));

var _dec, _class, _class2, _temp;

let PlayerPlayhead = (_dec = (0, _emotion.withStyle)(_styles.default, _theme.default), _dec(_class = (_temp = _class2 = class PlayerPlayhead extends _react.Component {
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
    return (0, _emotion.jsx)(_uiButtons.IconButton, {
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
    return (0, _emotion.jsx)(_MediaContext.default.Consumer, null, _ref => {
      let setActions = _ref.setActions,
          fullScreenContainerRef = _ref.fullScreenContainerRef;
      setActions({
        focusPlayhead: this.focusPlayhead
      });
      return (0, _emotion.jsx)(_uiMenu.Menu, {
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
    return (0, _emotion.jsx)(_emotion.InstUISettingsProvider, {
      theme: _theme.playheadIconButtonTheme
    }, (0, _emotion.jsx)("div", {
      css: styles.container
    }, variant === 'button' ? this.renderButton() : this.renderMenu()));
  }

}, _class2.propTypes = {
  // eslint-disable-next-line react/require-default-props
  makeStyles: _propTypes.default.func,
  // eslint-disable-next-line react/require-default-props
  styles: _propTypes.default.object,
  icon: _propTypes.default.node,
  label: _propTypes.default.string.isRequired,
  onClick: _propTypes.default.func,
  menuItems: _propTypes.default.arrayOf(_uiMenu.Menu.propTypes.children),
  variant: _propTypes.default.oneOf(['button', 'menu']).isRequired
}, _class2.defaultProps = {
  icon: null,
  onClick: () => {},
  menuItems: null
}, _temp)) || _class);
var _default = PlayerPlayhead;
exports.default = _default;