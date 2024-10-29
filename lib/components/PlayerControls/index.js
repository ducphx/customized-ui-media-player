"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _emotion = require("@instructure/emotion");

var _PlayPauseButton = _interopRequireDefault(require("./PlayPauseButton"));

var _Timebar = _interopRequireDefault(require("./Timebar"));

var _VolumeContainer = _interopRequireDefault(require("./VolumeContainer"));

var _PlaybackSpeedContainer = _interopRequireDefault(require("./PlaybackSpeedContainer"));

var _TrackChooserContainer = _interopRequireDefault(require("./TrackChooserContainer"));

var _SourceChooserContainer = _interopRequireDefault(require("./SourceChooserContainer"));

var _FullScreenButton = _interopRequireDefault(require("./FullScreenButton"));

var _CustomControl = _interopRequireDefault(require("./CustomControl"));

var _MediaContext = _interopRequireDefault(require("../Player/MediaContext"));

var _PlayerSettings = _interopRequireDefault(require("./PlayerSettings"));

var _CaptionsToggle = _interopRequireDefault(require("./CaptionsToggle"));

var _theme = _interopRequireDefault(require("./theme"));

var _styles = _interopRequireDefault(require("./styles"));

var _dec, _class, _class2, _temp;

/**
---
parent: Player
---
**/
let PlayerControls = (_dec = (0, _emotion.withStyle)(_styles.default, _theme.default), _dec(_class = (_temp = _class2 = class PlayerControls extends _react.Component {
  constructor() {
    super(...arguments);

    this.handleOnClick = showControls => e => {
      e.stopPropagation();
      showControls();
    };
  }

  componentDidMount() {
    this.props.makeStyles();
  }

  componentDidUpdate() {
    this.props.makeStyles();
  }

  render() {
    const styles = this.props.styles;
    return (0, _emotion.jsx)(_MediaContext.default.Consumer, null, _ref => {
      let state = _ref.state,
          actions = _ref.actions;
      const showControls = state.showControls;
      /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */

      /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/mouse-events-have-key-events */

      return (0, _emotion.jsx)("div", {
        css: [styles.container, !showControls && styles.hidden],
        onClick: this.handleOnClick(actions.showControls),
        onMouseEnter: () => {
          actions.setControlHovered(true);
        },
        onMouseLeave: () => {
          actions.setControlHovered(false);
        }
      }, this.props.children);
      /* eslint-enable jsx-a11y/no-static-element-interactions, jsx-a11y/mouse-events-have-key-events */

      /* eslint-enable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
    });
  }

}, _class2.displayName = 'PlayerControls', _class2.propTypes = {
  // eslint-disable-next-line react/require-default-props
  makeStyles: _propTypes.default.func,
  // eslint-disable-next-line react/require-default-props
  styles: _propTypes.default.object,

  /**
   * Children of the <PlayerControls />
   */
  children: _propTypes.default.node
}, _class2.defaultProps = {
  showControls: false
}, _class2.PlayPauseButton = _PlayPauseButton.default, _class2.Timebar = props => (0, _emotion.jsx)(_MediaContext.default.Consumer, null, _ref2 => {
  let state = _ref2.state,
      actions = _ref2.actions;
  return (0, _emotion.jsx)(_Timebar.default, Object.assign({
    seeking: state.seeking,
    duration: state.duration,
    currentTime: state.currentTime,
    mediaState: state.mediaState,
    buffered: state.buffered,
    videoId: state.videoId,
    onClick: actions.seek
  }, props));
}), _class2.Volume = _VolumeContainer.default, _class2.TrackChooser = _TrackChooserContainer.default, _class2.PlaybackSpeed = _PlaybackSpeedContainer.default, _class2.SourceChooser = _SourceChooserContainer.default, _class2.FullScreenButton = _FullScreenButton.default, _class2.PlayerSettings = _PlayerSettings.default, _class2.Control = _CustomControl.default, _class2.CaptionsToggle = _CaptionsToggle.default, _temp)) || _class);
var _default = PlayerControls;
exports.default = _default;