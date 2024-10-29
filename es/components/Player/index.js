import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
const _excluded = ["open"];

var _dec, _class, _class2, _temp, _Loading;

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
import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import screenfull from 'screenfull';
import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types';
import { FocusRegionManager } from '@instructure/ui-a11y-utils';
import { pickProps } from '@instructure/ui-react-utils';
import { withStyle, jsx } from '@instructure/emotion';
import uid from '@instructure/uid';
import PlayerContext from './PlayerContext';
import PlayerControls from '../PlayerControls';
import PlayerMarker from '../PlayerMarker';
import PlayerOverlay from '../PlayerOverlay';
import PlayerPlayhead from '../PlayerPlayhead';
import { Captions } from './Captions';
import PlayerPropTypes, { playerEventsTypeSet, rendererEventsTypeSet } from './PropTypes';
import { applyTranslations, translate, TranslationPropTypes } from '../../constants/translated/translations';
import Inert from './Inert';
import MediaContext from './MediaContext';
import Loading from '../Loading';
import { PAUSED, PLAYING, ENDED, WINDOWED_SCREEN, FULL_SCREEN } from '../../constants';
import generateStyle from './styles';
import generateComponentTheme from './theme';
export const SEEK_INTERVAL_SECONDS = 5;
export const JUMP_INTERVAL_SECONDS = 30;
export const SEEK_VOLUME_INTERVAL = 0.05;
export const JUMP_VOLUME_INTERVAL = 0.1;
/**
---
category: components
experimental: true
---
**/

const WrappedPlayerOverlay = props => jsx(MediaContext.Consumer, null, _ref => {
  let actions = _ref.actions;
  return jsx(PlayerOverlay, Object.assign({
    setFocusEnabled: actions.setFocusEnabled
  }, props));
});

let Player = (_dec = withStyle(generateStyle, generateComponentTheme), _dec(_class = (_temp = _class2 = class Player extends PureComponent {
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
      mediaState: PAUSED,
      screenState: WINDOWED_SCREEN,
      muted: false,
      currentTime: 0,
      volume: 1,
      playbackSpeed: 1,
      selectedSrc: this.getSourceFromProps(),
      selectedTrackId: null,
      sources: this.props.sources,
      tracks: this.getPossiblyModifiedTracks(this.props.tracks),
      showControls: true,
      videoId: uid('Player')
    };

    this.clearFocusRegion = () => {
      if (!this.focusRegion) return;
      FocusRegionManager.blurRegion(this.fullScreenContainer, this.focusRegion.id);
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
      if (screenfull && screenfull.enabled) {
        if (newState && this.state.screenState === WINDOWED_SCREEN) {
          screenfull.request(this.fullScreenContainer);
        } else if (!newState && this.state.screenState === FULL_SCREEN) {
          screenfull.exit();
        }
      }
    };

    this.toggleFocusRegion = () => {
      if (this.state.screenState === FULL_SCREEN) {
        this.focusRegion = FocusRegionManager.activateRegion(this.fullScreenContainer, {
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
      if (screenfull && screenfull.enabled) {
        screenfull.toggle(this.fullScreenContainer);
      }
    };

    this.updateScreenState = e => {
      if (!this.fullScreenContainer) {
        return;
      }

      const screenState = screenfull && screenfull.isFullscreen ? FULL_SCREEN : WINDOWED_SCREEN;
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

          if (_this.state.mediaState === PLAYING) {
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
        let _ref4 = _slicedToArray(_ref3, 2),
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

    applyTranslations(this.props.translations);
  }

  componentDidMount() {
    this.props.makeStyles({
      screenState: this.state.screenState
    });
    screenfull && screenfull.on('change', this.updateScreenState);
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

    if (prevState.mediaState !== mediaState && mediaState === ENDED) {
      this.showControls();
    }

    if (prevProps.tracks !== tracks) {
      this.setState({
        tracks: this.getPossiblyModifiedTracks(tracks)
      });
    }
  }

  componentWillUnmount() {
    screenfull && screenfull.off('change', this.updateScreenState); // remove the video ref and stop applying video props

    this.videoContainer = null;
    this.fullScreenContainer = null;
    this.clearFocusRegion();
  }

  getPossiblyModifiedTracks(tracks) {
    return tracks.map(track => {
      const result = _objectSpread({}, track);

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
    return jsx(PlayerContext, null, playerContext => {
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
        'aria-label': this.props.label || translate('ARIA_VIDEO_LABEL'),
        ref: this.setVideoContainerRef
      };
      const defaultProps = {
        onSeeking: this.handleSeeking,
        onSeeked: this.handleSeeked
      };
      const rendererEventsTypeSetFromProps = pickProps(this.props, rendererEventsTypeSet);
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
      return jsx("div", fullScreenContainerProps, jsx("div", mediaPlayerContainerProps, jsx("div", {
        css: styles.playerRendererContainer,
        onContextMenu: this.handleContextMenu
      }, jsx(Renderer, Object.assign({
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
      }, eventProps)), jsx(Captions, {
        tracks: tracks,
        onTrackChange: this.onTrackChange,
        setActions: actionsSetter,
        currentTime: this.state.currentTime || 0,
        captionPosition: this.props.captionPosition,
        captionOffset: this.props.captionOffset,
        autoShowCaption: this.props.autoShowCaption,
        showControls: this.state.showControls
      })), jsx(MediaContext.Provider, {
        value: mediaContextValue
      }, jsx("div", null, this.props.children, !this.props.hideControls && !loadingOverlay && jsx(Inert, {
        active: !focusEnabled
      }, controls(PlayerControls)), _LoadingOverlay || (_LoadingOverlay = jsx(LoadingOverlay, {
        open: loadingOverlay
      }))))));
    });
  }

}, _class2.propTypes = _objectSpread(_objectSpread({
  // eslint-disable-next-line react/require-default-props
  makeStyles: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  styles: PropTypes.object,
  renderer: PropTypes.elementType.isRequired,

  /**
   * URL(s) of video to play
   */
  sources: PlayerPropTypes.sourcesType,

  /**
   * tracks of the video to play
   */
  tracks: PlayerPropTypes.tracksType,

  /**
   * Function invoked on every render with state and actions.
   * Use this to provide a custom set of video controls.
   * Default player controls will be provided if undefined.
   */
  controls: PropTypes.func,

  /**
   * If set to true, the controls will never dismiss.
   */
  alwaysShowControls: PropTypes.bool,

  /**
   * Give the player a label to be read by screen readers.
   */
  label: PropTypes.string,

  /**
   * The poster image to use before the media is played.
   */
  poster: PropTypes.string,

  /**
   * Label overrides for i18n. Defaults to english
   * See src/constants/translated/translations.js for default values
   */
  translations: PropTypes.shape(TranslationPropTypes),

  /**
   * Children of the <Player />
   */
  children: ChildrenPropTypes.oneOf([PlayerOverlay, WrappedPlayerOverlay]),

  /**
   * indicates the player should fill the width of its container
   */
  fluidWidth: PropTypes.bool,

  /**
   * indicates the player should fill the height of its container
   */
  fluidHeight: PropTypes.bool,

  /**
   * Reference to actions object
   */
  actionsRef: PropTypes.func,

  /**
   * Disable right click on the player container
   */
  disableRightClick: PropTypes.bool,
  captionPosition: Captions.propTypes.captionPosition,
  captionOffset: Captions.propTypes.captionOffset,
  autoShowCaption: PropTypes.string,

  /**
   * Make YouTube iframe unfocusable
   */
  disableYoutubeFocus: PropTypes.bool,

  /**
   * Hide control bar
   */
  hideControls: PropTypes.bool
}, playerEventsTypeSet), rendererEventsTypeSet), _class2.defaultProps = {
  tracks: [],
  controls: PlayerControls => jsx(PlayerControls, null, jsx(PlayerControls.PlayPauseButton, {
    position: "start"
  }), jsx(PlayerControls.Timebar, null), jsx(PlayerControls.Volume, null), jsx(PlayerControls.PlayerSettings, null, jsx(PlayerControls.TrackChooser, null), jsx(PlayerControls.SourceChooser, null), jsx(PlayerControls.PlaybackSpeed, null)), jsx(PlayerControls.FullScreenButton, {
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
  captionPosition: Captions.defaultProps.captionPosition,
  captionOffset: Captions.defaultProps.captionOffset,
  autoShowCaption: null,
  disableYoutubeFocus: false
}, _class2.Marker = PlayerMarker, _class2.Overlay = WrappedPlayerOverlay, _class2.Playhead = PlayerPlayhead, _class2.Control = PlayerControls.Control, _temp)) || _class);

const LoadingOverlay = _ref5 => {
  let open = _ref5.open,
      props = _objectWithoutProperties(_ref5, _excluded);

  return open && jsx(Player.Overlay, props, () => _Loading || (_Loading = jsx(Loading, null)));
};

export default Player;
export { Player, PlayerPropTypes };