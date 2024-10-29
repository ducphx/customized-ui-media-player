"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.INSULATE_EVENTS = void 0;

var _react = require("react");

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _uiDomUtils = require("@instructure/ui-dom-utils");

var _emotion = require("@instructure/emotion");

var _findAncestor = require("../../utils/findAncestor");

var _styles = _interopRequireDefault(require("./styles"));

var _dec, _class, _class2, _temp;

const INSULATE_EVENTS = ['onKeyDown', 'onKeyPress', 'onKeyUp', 'onMouseDown', 'onClick', 'onMouseUp'];
/**
---
private: true
---
@module PlayerOverlay
**/

exports.INSULATE_EVENTS = INSULATE_EVENTS;
let PlayerOverlay = (_dec = (0, _emotion.withStyle)(_styles.default, null), _dec(_class = (_temp = _class2 = class PlayerOverlay extends _react.Component {
  constructor() {
    super(...arguments);

    this.handleEvent = event => {
      event.stopPropagation();
    };

    this.onFocus = event => {
      if (this.overlayRef !== document.activeElement) {
        return;
      }

      const focusable = (0, _uiDomUtils.findFocusable)(this.overlayRef, el => !(0, _findAncestor.findAncestor)(el, node => node.getAttribute && node.getAttribute('aria-hidden') === 'true'));

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
    _reactDom.default.unmountComponentAtNode(this.overlayRef);

    this.props.setFocusEnabled(true);
  }

  renderChildren() {
    _reactDom.default.render(this.props.children(this.overlayRef), this.overlayRef);
  }

  render() {
    const styles = this.props.styles;
    const overlayEvents = {};
    INSULATE_EVENTS.forEach(eventName => {
      overlayEvents[eventName] = event => {
        this.handleEvent(event);
      };
    });
    return (0, _emotion.jsx)("div", Object.assign({
      css: styles.container,
      ref: ref => {
        this.overlayRef = ref;
      }
    }, overlayEvents));
  }

}, _class2.propTypes = {
  // eslint-disable-next-line react/require-default-props
  makeStyles: _propTypes.default.func,
  // eslint-disable-next-line react/require-default-props
  styles: _propTypes.default.object,
  children: _propTypes.default.func,
  setFocusEnabled: _propTypes.default.func
}, _class2.defaultProps = {
  children: () => {},
  setFocusEnabled: () => {}
}, _temp)) || _class);
var _default = PlayerOverlay;
exports.default = _default;