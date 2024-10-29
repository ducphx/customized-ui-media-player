"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _emotion = require("@instructure/emotion");

var _uiSpinner = require("@instructure/ui-spinner");

var _styles = _interopRequireDefault(require("./styles"));

var _dec, _class, _class2, _temp, _Spinner;

/**
---
private: true
---
@module Loading
**/
let Loading = (_dec = (0, _emotion.withStyle)(_styles.default, null), _dec(_class = (_temp = _class2 = class Loading extends _react.Component {
  componentDidMount() {
    this.props.makeStyles();
  }

  componentDidUpdate() {
    this.props.makeStyles();
  }

  render() {
    const styles = this.props.styles;
    return (0, _emotion.jsx)("div", {
      css: styles.loading
    }, _Spinner || (_Spinner = (0, _emotion.jsx)(_uiSpinner.Spinner, {
      renderTitle: "Loading",
      size: "large",
      margin: "0 0 0 0"
    })));
  }

}, _class2.propTypes = {
  // eslint-disable-next-line react/require-default-props
  makeStyles: _propTypes.default.func,
  // eslint-disable-next-line react/require-default-props
  styles: _propTypes.default.object
}, _temp)) || _class);
var _default = Loading;
exports.default = _default;