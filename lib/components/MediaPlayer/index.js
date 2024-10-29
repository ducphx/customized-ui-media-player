"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediaPlayer = void 0;
Object.defineProperty(exports, "PlayerPropTypes", {
  enumerable: true,
  get: function () {
    return _Player.PlayerPropTypes;
  }
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _screenfull = _interopRequireDefault(require("screenfull"));

var _uiMenu = require("@instructure/ui-menu");

var _uiPropTypes = require("@instructure/ui-prop-types");

var _uiReactUtils = require("@instructure/ui-react-utils");

var _Player = require("../Player");

var _PlayerControls = _interopRequireDefault(require("../PlayerControls"));

var _HTML5Video = require("../Player/HTML5Video");

var _YouTube = require("../Player/YouTube");

var _Vimeo = _interopRequireDefault(require("../Player/Vimeo"));

var _Captions = require("../Player/Captions");

var _translations = require("../../constants/translated/translations");

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
class MediaPlayer extends _react.Component {
  constructor() {
    super();
    this.state = {
      smallScreen: this.isSmallScreen()
    };
  }

  isSmallScreen() {
    return window.matchMedia('(max-width: 480px)').matches;
  }

  updateScreenSize() {
    this.setState({
      smallScreen: this.isSmallScreen()
    });
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.updateScreenSize());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.updateScreenSize());
  }

  render() {
    const mediaPlayerProps = (0, _uiReactUtils.pickProps)(this.props, MediaPlayer.propTypes);
    const _this$props = this.props,
          sources = _this$props.sources,
          tracks = _this$props.tracks,
          type = _this$props.type,
          hideFullScreen = _this$props.hideFullScreen,
          markers = _this$props.markers,
          customControls = _this$props.customControls,
          playhead = _this$props.playhead;
    const renderer = MediaPlayer.rendererList[type]; // require('screenfull') returns "false" if full-screen isn't sfupported

    const isFullScreenHidden = !_screenfull.default || hideFullScreen;
    const isSourceChooserHidden = typeof sources === 'string' || sources.length <= 1;
    const isCaptionsToggleHidden = this.state.smallScreen || !tracks || !tracks.length;
    const isTrackChooserHidden = !tracks || !tracks.length;
    const playerProps = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, (0, _uiReactUtils.pickProps)(mediaPlayerProps, _Player.Player.propTypes)), {}, {
      renderer,
      controls: PlayerControls => {
        const renderByControlSettings = [/*#__PURE__*/_react.default.createElement(PlayerControls.PlaybackSpeed, {
          key: "PlaybackSpeed",
          name: "SPEED"
        })];

        if (!isTrackChooserHidden) {
          renderByControlSettings.unshift( /*#__PURE__*/_react.default.createElement(PlayerControls.TrackChooser, {
            key: "TrackChooser",
            name: "CAPTIONS"
          }));
        }

        if (!isSourceChooserHidden) {
          renderByControlSettings.push( /*#__PURE__*/_react.default.createElement(PlayerControls.SourceChooser, {
            key: "SourceChooser",
            name: "QUALITY"
          }));
        }

        const customControlsRendered = customControls();

        if (Array.isArray(customControlsRendered)) {
          renderByControlSettings.push(...customControlsRendered);
        } else if (customControlsRendered) {
          renderByControlSettings.push(customControlsRendered);
        }

        const allControls = [/*#__PURE__*/_react.default.createElement(PlayerControls.PlayPauseButton, {
          key: "PlayPauseButton"
        }), /*#__PURE__*/_react.default.createElement(PlayerControls.Timebar, {
          key: "Timebar",
          markers: markers,
          playhead: playhead
        }), /*#__PURE__*/_react.default.createElement(PlayerControls.Volume, {
          key: "Volume"
        }), !isCaptionsToggleHidden && /*#__PURE__*/_react.default.createElement(PlayerControls.CaptionsToggle, {
          key: "CaptionsToggle"
        }), /*#__PURE__*/_react.default.createElement(PlayerControls.PlayerSettings, {
          key: "Settings",
          name: "Settings"
        }, renderByControlSettings)];

        if (!isFullScreenHidden) {
          allControls.push( /*#__PURE__*/_react.default.createElement(PlayerControls.FullScreenButton, {
            key: "FullScreenButton"
          }));
        }

        const firstControl = allControls.shift();
        const lastControl = allControls.pop();

        const firstControlPositioned = /*#__PURE__*/_react.default.cloneElement(firstControl, {
          position: 'start'
        });

        const lastControlPositioned = /*#__PURE__*/_react.default.cloneElement(lastControl, {
          position: 'end'
        });

        return /*#__PURE__*/_react.default.createElement(PlayerControls, null, [firstControlPositioned, ...allControls, lastControlPositioned]);
      }
    });
    const playerEventProps = (0, _uiReactUtils.pickProps)(this.props, _Player.PlayerPropTypes.playerEventsTypeSet);
    const rendererEventProps = (0, _uiReactUtils.pickProps)(this.props, _Player.PlayerPropTypes.rendererEventsTypeSet);
    return /*#__PURE__*/_react.default.createElement(_Player.Player, Object.assign({}, playerProps, playerEventProps, rendererEventProps), this.props.children);
  }

}

exports.MediaPlayer = MediaPlayer;
MediaPlayer.propTypes = (0, _objectSpread2.default)((0, _objectSpread2.default)({
  type: _propTypes.default.oneOf(['video', 'youtube', 'vimeo']),

  /**
   * URL(s) of video to play
   */
  sources: _Player.PlayerPropTypes.sourcesType,

  /**
   * tracks of the video to play
   */
  tracks: _Player.PlayerPropTypes.tracksType,

  /**
   * Additional controls to be added to the control bar
   */
  customControls: _propTypes.default.func,

  /**
   * If set to true, the controls will never dismiss.
   */
  alwaysShowControls: _propTypes.default.bool,

  /**
   * If set to true, FullScreenButton is hidden.
   */
  hideFullScreen: _propTypes.default.bool,

  /**
   * Give the player a label to be read by screen readers.
   */
  label: _propTypes.default.string,

  /**
   * Give the player a playhead
   */
  playhead: _propTypes.default.node,

  /**
   * The poster image to use before the media is played.
   */
  poster: _propTypes.default.string,

  /**
   * Label overrides for i18n. Defaults to english
   * See src/constants/translated/translations.js for default values
   */
  translations: _propTypes.default.shape(_translations.TranslationPropTypes),

  /**
   * Children of the <Player />
   */
  children: _uiPropTypes.Children.oneOf([_Player.Player.Overlay]),

  /**
   * indicates the player should fill the width of its container
   */
  fluidWidth: _propTypes.default.bool,

  /**
   * indicates the player should fill the height of its container
   */
  fluidHeight: _propTypes.default.bool,

  /**
   * A set of markers to apply to the timebar.
   */
  markers: _uiPropTypes.Children.oneOf([_Player.Player.Marker]),

  /**
   * Reference to actions object
   */
  actionsRef: _propTypes.default.func,

  /**
   * Disable right click on the player container
   */
  disableRightClick: _propTypes.default.bool,
  captionPosition: _Captions.Captions.propTypes.captionPosition,
  captionOffset: _Captions.Captions.propTypes.captionOffset,
  autoShowCaption: _propTypes.default.string,

  /**
   * Make YouTube iframe unfocusable
   */
  disableYoutubeFocus: _propTypes.default.bool,

  /**
   * Hide control bar
   */
  hideControls: _propTypes.default.bool
}, _Player.PlayerPropTypes.playerEventsTypeSet), _Player.PlayerPropTypes.rendererEventsTypeSet);
MediaPlayer.defaultProps = {
  type: 'video',
  sources: [],
  tracks: [],
  actionsRef: null,
  customControls: () => [],
  alwaysShowControls: false,
  children: null,
  hideFullScreen: false,
  markers: [],
  playhead: null,
  poster: null,
  label: '',
  translations: {},
  fluidWidth: true,
  fluidHeight: false,
  disableRightClick: false,
  captionPosition: _Captions.Captions.defaultProps.captionPosition,
  captionOffset: _Captions.Captions.defaultProps.captionOffset,
  autoShowCaption: null,
  disableYoutubeFocus: false,
  hideControls: false
};
MediaPlayer.rendererList = {
  video: _HTML5Video.HTML5Video,
  youtube: _YouTube.YouTube,
  vimeo: _Vimeo.default
};
MediaPlayer.Marker = _Player.Player.Marker;
MediaPlayer.Menu = _uiMenu.Menu;
MediaPlayer.Overlay = _Player.Player.Overlay;
MediaPlayer.Playhead = _Player.Player.Playhead;
MediaPlayer.Control = _PlayerControls.default.Control;

MediaPlayer.exitFullScreen = () => {
  if (_screenfull.default.isFullscreen) _screenfull.default.exit();
};

var _default = MediaPlayer;
exports.default = _default;