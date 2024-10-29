"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = exports.JUMP_VOLUME_INTERVAL = exports.JUMP_INTERVAL_SECONDS = void 0;
Object.defineProperty(exports, "PlayerPropTypes", {
  enumerable: true,
  get: function () {
    return _PropTypes.default;
  }
});
exports.default = exports.SEEK_VOLUME_INTERVAL = exports.SEEK_INTERVAL_SECONDS = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _screenfull = _interopRequireDefault(require("screenfull"));

var _uiPropTypes = require("@instructure/ui-prop-types");

var _uiA11yUtils = require("@instructure/ui-a11y-utils");

var _uiReactUtils = require("@instructure/ui-react-utils");

var _emotion = require("@instructure/emotion");

var _uid = _interopRequireDefault(require("@instructure/uid"));

var _PlayerContext = _interopRequireDefault(require("./PlayerContext"));

var _PlayerControls = _interopRequireDefault(require("../PlayerControls"));

var _PlayerMarker = _interopRequireDefault(require("../PlayerMarker"));

var _PlayerOverlay = _interopRequireDefault(require("../PlayerOverlay"));

var _PlayerPlayhead = _interopRequireDefault(require("../PlayerPlayhead"));

var _Captions = require("./Captions");

var _PropTypes = _interopRequireWildcard(require("./PropTypes"));

var _translations = require("../../constants/translated/translations");

var _Inert = _interopRequireDefault(require("./Inert"));

var _MediaContext = _interopRequireDefault(require("./MediaContext"));

var _Loading2 = _interopRequireDefault(require("../Loading"));

var _constants = require("../../constants");

var _styles = _interopRequireDefault(require("./styles"));

var _theme = _interopRequireDefault(require("./theme"));

const _excluded = ["open"];

var _dec, _class, _class2, _temp, _Loading;

const SEEK_INTERVAL_SECONDS = 5;
exports.SEEK_INTERVAL_SECONDS = SEEK_INTERVAL_SECONDS;
const JUMP_INTERVAL_SECONDS = 30;
exports.JUMP_INTERVAL_SECONDS = JUMP_INTERVAL_SECONDS;
const SEEK_VOLUME_INTERVAL = 0.05;
exports.SEEK_VOLUME_INTERVAL = SEEK_VOLUME_INTERVAL;
const JUMP_VOLUME_INTERVAL = 0.1;
/**
---
category: components
experimental: true
---
**/

exports.JUMP_VOLUME_INTERVAL = JUMP_VOLUME_INTERVAL;

const WrappedPlayerOverlay = props => (0, _emotion.jsx)(_MediaContext.default.Consumer, null, _ref => {
  let actions = _ref.actions;
  return (0, _emotion.jsx)(_PlayerOverlay.default, Object.assign({
    setFocusEnabled: actions.setFocusEnabled
  }, props));
});

let Player = (_dec = (0, _emotion.withStyle)(_styles.default, _theme.default), _dec(_class = (_temp = _class2 = class Player extends _react.PureComponent {
  constructor(props) {
    var _this;

    super(props);
    _this = this;
    this.focusRegion = null;
    this.fullScreenContainer = null;
    this.videoContainer = null;
    this.video = null;
    this.state = {
      seeking: false,
      loadingOverlay: false,
      controlActivated: null,
      controlHovered: false,
      focusEnabled: true,
      mediaState: _constants.PAUSED,
      screenState: _constants.WINDOWED_SCREEN,
      muted: false,
      currentTime: 0,
      volume: 1,
      playbackSpeed: 1,
      selectedSrc: this.getSourceFromProps(),
      selectedTrackId: null,
      sources: this.props.sources,
      tracks: this.getPossiblyModifiedTracks(this.props.tracks),
      showControls: true,
      videoId: (0, _uid.default)('Player')
    };

    this.clearFocusRegion = () => {
      if (!this.focusRegion) return;

      _uiA11yUtils.FocusRegionManager.blurRegion(this.fullScreenContainer, this.focusRegion.id);

      this.focusRegion = null;
    };

    this.handleSeeking = () => {
      this.setState({
        seeking: true
      });
    };

    this.handleSeeked = () => {
      this.setState({
        seeking: false
      });
    };

    this.hasBeenWarnedOnce = false;

    this.handleContextMenu = e => {
      if (this.props.disableRightClick) {
        e.preventDefault();
      }
    };

    this.handleKeyPress = actions => e => {
      const _this$state = this.state,
            currentTime = _this$state.currentTime,
            duration = _this$state.duration;

      const playAction = () => {
        if (this.videoContainer === e.target) {
          actions.togglePlay();
          return true;
        }

        return false;
      };

      const seekAction = time => {
        if (!this.state.controlActivated) {
          actions.seek(time);
          return true;
        }

        return false;
      };

      const keyHandlers = {
        ArrowLeft: () => {
          return seekAction(currentTime - SEEK_INTERVAL_SECONDS);
        },
        ArrowRight: () => {
          return seekAction(currentTime + SEEK_INTERVAL_SECONDS);
        },
        ArrowUp: () => {
          return seekAction(currentTime + SEEK_INTERVAL_SECONDS);
        },
        ArrowDown: () => {
          return seekAction(currentTime - SEEK_INTERVAL_SECONDS);
        },
        PageUp: () => {
          actions.seek(currentTime + JUMP_INTERVAL_SECONDS);
          return true;
        },
        PageDown: () => {
          actions.seek(currentTime - JUMP_INTERVAL_SECONDS);
          return true;
        },
        Home: () => {
          actions.seek(0);
          return true;
        },
        End: () => {
          actions.seek(duration);
          return true;
        },
        ' ': playAction,
        Enter: playAction,
        f: () => {
          actions.toggleFullScreen();
          return true;
        },
        F: () => {
          actions.toggleFullScreen();
          return true;
        },
        m: () => {
          actions.toggleMute();
          return true;
        },
        M: () => {
          actions.toggleMute();
          return true;
        }
      };

      if (e.key in keyHandlers && keyHandlers[e.key]()) {
        e.preventDefault();
        actions.showControls();
      }
    };

    this.setFullScreen = newState => {
      if (_screenfull.default && _screenfull.default.enabled) {
        if (newState && this.state.screenState === _constants.WINDOWED_SCREEN) {
          _screenfull.default.request(this.fullScreenContainer);
        } else if (!newState && this.state.screenState === _constants.FULL_SCREEN) {
          _screenfull.default.exit();
        }
      }
    };

    this.toggleFocusRegion = () => {
      if (this.state.screenState === _constants.FULL_SCREEN) {
        this.focusRegion = _uiA11yUtils.FocusRegionManager.activateRegion(this.fullScreenContainer, {
          shouldCloseOnDocumentClick: false,
          shouldCloseOnEscape: true,
          shouldContainFocus: true,
          shouldReturnFocus: true,
          onBlur: () => {},
          onDismiss: () => {}
        });
        return;
      }

      this.clearFocusRegion();
    };

    this.toggleFullScreen = () => {
      if (_screenfull.default && _screenfull.default.enabled) {
        _screenfull.default.toggle(this.fullScreenContainer);
      }
    };

    this.updateScreenState = e => {
      if (!this.fullScreenContainer) {
        return;
      }

      const screenState = _screenfull.default && _screenfull.default.isFullscreen ? _constants.FULL_SCREEN : _constants.WINDOWED_SCREEN;
      this.setState({
        screenState
      });

      if (e.target === this.fullScreenContainer) {
        this.toggleFocusRegion();
      }
    };

    this.setVideoContainerRef = el => {
      if (this.videoContainer === null) {
        this.videoContainer = el;
      }
    };

    this.setFullScreenContainerRef = el => {
      if (this.fullScreenContainer === null) {
        this.fullScreenContainer = el;
      }
    };

    this.activateControl = controlId => {
      this.setState({
        controlActivated: controlId
      });
    };

    this.deactivateControl = controlId => {
      this.setState(prevState => {
        if (prevState.controlActivated === controlId) {
          return {
            controlActivated: null
          };
        }

        return {};
      });
    };

    this.setControlHovered = newValue => {
      this.setState({
        controlHovered: newValue
      });
    };

    this.setFocusEnabled = newValue => {
      this.setState({
        focusEnabled: newValue
      });
    };

    this.showControls = function () {
      let hideControlsTimeout = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 2500;

      if (_this.props.alwaysShowControls) {
        return;
      }

      if (_this._hideControlsTimeoutId) {
        clearTimeout(_this._hideControlsTimeoutId);
      }

      const _nextTimeout = () => {
        _this._hideControlsTimeoutId = setTimeout(() => {
          if (_this.state.controlActivated || _this.state.controlHovered) {
            return _nextTimeout();
          }

          if (_this.state.mediaState === _constants.PLAYING) {
            _this.setState({
              showControls: false
            });

            _this.props.onControlsHidden();
          }
        }, hideControlsTimeout);
      };

      const prevValue = _this.state.showControls;

      _this.setState({
        showControls: true
      }, _nextTimeout);

      if (!prevValue) {
        _this.props.onControlsShown();
      }
    };

    this.onRendererStateChange = function (rendererStateUpdater) {
      let callback = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : () => {};

      _this.setState(rendererStateUpdater, callback);
    };

    this.setActions = (actions, _ref2) => {
      let setAction = _ref2.setAction;
      Object.entries(actions).forEach(_ref3 => {
        let _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
            fnName = _ref4[0],
            fn = _ref4[1];

        setAction(fnName, fn);
      });
    };

    this.onTrackChange = selectedTrackId => {
      this.setState({
        selectedTrackId
      });
    };

    this.setLoadingOverlay = loadingOverlay => {
      this.setState({
        loadingOverlay
      });
    };

    (0, _translations.applyTranslations)(this.props.translations);
  }

  componentDidMount() {
    this.props.makeStyles({
      screenState: this.state.screenState
    });
    _screenfull.default && _screenfull.default.on('change', this.updateScreenState);
  }

  componentDidUpdate(prevProps, prevState) {
    const _this$state2 = this.state,
          screenState = _this$state2.screenState,
          mediaState = _this$state2.mediaState;
    const _this$props = this.props,
          fluidWidth = _this$props.fluidWidth,
          fluidHeight = _this$props.fluidHeight,
          tracks = _this$props.tracks;
    /*
     * Optimize styles recalculations in addition to extendind PureComponent.
     * Without this optimization we get tones of recalculations.
     * Try to put console log into generateStyle funtion.
     */

    if (screenState !== prevState.screenState || fluidWidth !== prevProps.fluidWidth || fluidHeight !== prevProps.fluidHeight) {
      this.props.makeStyles({
        screenState
      });
    }

    if (prevState.mediaState !== mediaState && mediaState === _constants.ENDED) {
      this.showControls();
    }

    if (prevProps.tracks !== tracks) {
      this.setState({
        tracks: this.getPossiblyModifiedTracks(tracks)
      });
    }
  }

  componentWillUnmount() {
    _screenfull.default && _screenfull.default.off('change', this.updateScreenState); // remove the video ref and stop applying video props

    this.videoContainer = null;
    this.fullScreenContainer = null;
    this.clearFocusRegion();
  }

  getPossiblyModifiedTracks(tracks) {
    return tracks.map(track => {
      const result = (0, _objectSpread2.default)({}, track);

      if (!result.id) {
        this.warnOnce();
        result.id = result.label;
      }

      return result;
    });
  }

  warnOnce() {
    if (this.hasBeenWarnedOnce) {
      return;
    }

    console.warn('[ui-media-player] track.label will no longer be used to uniquely identify track in 8.0 in order to support duplicate caption labels. Please provide an id for each track (track.id).');
    this.hasBeenWarnedOnce = true;
  }

  getSourceFromProps() {
    const sources = this.props.sources;

    if (typeof sources === 'string') {
      return sources;
    }

    if (sources.length === 0) {
      return null;
    }

    if (typeof sources[0] === 'string') {
      return sources[0];
    }

    for (let i = 0; i < sources.length; i++) {
      if (sources[i].defaultSelected) {
        return sources[i].src;
      }
    }

    return sources[0].src;
  }

  render() {
    var _LoadingOverlay;

    const _this$props2 = this.props,
          Renderer = _this$props2.renderer,
          controls = _this$props2.controls,
          actionsRef = _this$props2.actionsRef,
          styles = _this$props2.styles;
    const _this$state3 = this.state,
          tracks = _this$state3.tracks,
          focusEnabled = _this$state3.focusEnabled,
          loadingOverlay = _this$state3.loadingOverlay;
    const constants = {
      SEEK_INTERVAL_SECONDS,
      JUMP_INTERVAL_SECONDS,
      SEEK_VOLUME_INTERVAL,
      JUMP_VOLUME_INTERVAL
    };
    return (0, _emotion.jsx)(_PlayerContext.default, null, playerContext => {
      const actionsSetter = actions => {
        this.setActions(actions, playerContext);
        actionsRef && actionsRef(playerContext.actions);
      };

      actionsSetter({
        activateControl: this.activateControl,
        deactivateControl: this.deactivateControl,
        setFullScreen: this.setFullScreen,
        toggleFullScreen: this.toggleFullScreen,
        setControlHovered: this.setControlHovered,
        setFocusEnabled: this.setFocusEnabled,
        showControls: this.showControls
      });
      const mediaContextValue = {
        state: this.state,
        fullScreenContainerRef: () => this.fullScreenContainer,
        actions: playerContext.actions,
        setActions: actionsSetter,
        playbackSpeedOptions: playerContext.playbackSpeedOptions,
        constants
      };
      const fullScreenContainerProps = {
        css: styles.fullScreenContainer,
        ref: this.setFullScreenContainerRef
      };
      const mediaPlayerContainerProps = {
        css: styles.mediaPlayerContainer,
        onKeyDown: this.handleKeyPress(playerContext.actions),
        onFocus: () => this.showControls(),
        onMouseMove: () => this.showControls(),
        onClick: playerContext.actions.togglePlay,
        tabIndex: focusEnabled ? 0 : null,
        // removes ability to focus container when focus disabled
        role: 'presentation',
        'aria-label': this.props.label || (0, _translations.translate)('ARIA_VIDEO_LABEL'),
        ref: this.setVideoContainerRef
      };
      const defaultProps = {
        onSeeking: this.handleSeeking,
        onSeeked: this.handleSeeked
      };
      const rendererEventsTypeSetFromProps = (0, _uiReactUtils.pickProps)(this.props, _PropTypes.rendererEventsTypeSet);
      const eventProps = {};
      const allEvents = [...Object.keys(rendererEventsTypeSetFromProps), ...Object.keys(defaultProps)];
      allEvents.forEach(key => {
        const propFn = rendererEventsTypeSetFromProps[key];
        const defaultPropFn = defaultProps[key];

        eventProps[key] = (event, error) => {
          if (propFn) {
            propFn(event, mediaContextValue.state, error);
          }

          if (defaultPropFn) {
            defaultPropFn(event);
          }
        };
      });
      return (0, _emotion.jsx)("div", fullScreenContainerProps, (0, _emotion.jsx)("div", mediaPlayerContainerProps, (0, _emotion.jsx)("div", {
        css: styles.playerRendererContainer,
        onContextMenu: this.handleContextMenu
      }, (0, _emotion.jsx)(Renderer, Object.assign({
        poster: this.props.poster,
        videoId: this.state.videoId,
        selectedSrc: this.state.selectedSrc,
        setActions: actionsSetter,
        onRendererStateChange: this.onRendererStateChange,
        mediaState: this.state.mediaState,
        currentTime: this.state.currentTime || 0,
        setPlaybackSpeedOptions: playerContext.setPlaybackSpeedOptions,
        setLoadingOverlay: this.setLoadingOverlay,
        disableYoutubeFocus: this.props.disableYoutubeFocus
      }, eventProps)), (0, _emotion.jsx)(_Captions.Captions, {
        tracks: tracks,
        onTrackChange: this.onTrackChange,
        setActions: actionsSetter,
        currentTime: this.state.currentTime || 0,
        captionPosition: this.props.captionPosition,
        captionOffset: this.props.captionOffset,
        autoShowCaption: this.props.autoShowCaption,
        showControls: this.state.showControls
      })), (0, _emotion.jsx)(_MediaContext.default.Provider, {
        value: mediaContextValue
      }, (0, _emotion.jsx)("div", null, this.props.children, !this.props.hideControls && !loadingOverlay && (0, _emotion.jsx)(_Inert.default, {
        active: !focusEnabled
      }, controls(_PlayerControls.default)), _LoadingOverlay || (_LoadingOverlay = (0, _emotion.jsx)(LoadingOverlay, {
        open: loadingOverlay
      }))))));
    });
  }

}, _class2.propTypes = (0, _objectSpread2.default)((0, _objectSpread2.default)({
  // eslint-disable-next-line react/require-default-props
  makeStyles: _propTypes.default.func,
  // eslint-disable-next-line react/require-default-props
  styles: _propTypes.default.object,
  renderer: _propTypes.default.elementType.isRequired,

  /**
   * URL(s) of video to play
   */
  sources: _PropTypes.default.sourcesType,

  /**
   * tracks of the video to play
   */
  tracks: _PropTypes.default.tracksType,

  /**
   * Function invoked on every render with state and actions.
   * Use this to provide a custom set of video controls.
   * Default player controls will be provided if undefined.
   */
  controls: _propTypes.default.func,

  /**
   * If set to true, the controls will never dismiss.
   */
  alwaysShowControls: _propTypes.default.bool,

  /**
   * Give the player a label to be read by screen readers.
   */
  label: _propTypes.default.string,

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
  children: _uiPropTypes.Children.oneOf([_PlayerOverlay.default, WrappedPlayerOverlay]),

  /**
   * indicates the player should fill the width of its container
   */
  fluidWidth: _propTypes.default.bool,

  /**
   * indicates the player should fill the height of its container
   */
  fluidHeight: _propTypes.default.bool,

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
}, _PropTypes.playerEventsTypeSet), _PropTypes.rendererEventsTypeSet), _class2.defaultProps = {
  tracks: [],
  controls: PlayerControls => (0, _emotion.jsx)(PlayerControls, null, (0, _emotion.jsx)(PlayerControls.PlayPauseButton, {
    position: "start"
  }), (0, _emotion.jsx)(PlayerControls.Timebar, null), (0, _emotion.jsx)(PlayerControls.Volume, null), (0, _emotion.jsx)(PlayerControls.PlayerSettings, null, (0, _emotion.jsx)(PlayerControls.TrackChooser, null), (0, _emotion.jsx)(PlayerControls.SourceChooser, null), (0, _emotion.jsx)(PlayerControls.PlaybackSpeed, null)), (0, _emotion.jsx)(PlayerControls.FullScreenButton, {
    position: "end"
  })),
  actionsRef: null,
  alwaysShowControls: false,
  children: null,
  poster: null,
  label: '',
  translations: {},
  fluidWidth: true,
  fluidHeight: false,
  disableRightClick: false,
  onControlsHidden: () => {},
  onControlsShown: () => {},
  captionPosition: _Captions.Captions.defaultProps.captionPosition,
  captionOffset: _Captions.Captions.defaultProps.captionOffset,
  autoShowCaption: null,
  disableYoutubeFocus: false
}, _class2.Marker = _PlayerMarker.default, _class2.Overlay = WrappedPlayerOverlay, _class2.Playhead = _PlayerPlayhead.default, _class2.Control = _PlayerControls.default.Control, _temp)) || _class);
exports.Player = Player;

const LoadingOverlay = _ref5 => {
  let open = _ref5.open,
      props = (0, _objectWithoutProperties2.default)(_ref5, _excluded);
  return open && (0, _emotion.jsx)(Player.Overlay, props, () => _Loading || (_Loading = (0, _emotion.jsx)(_Loading2.default, null)));
};

var _default = Player;
exports.default = _default;