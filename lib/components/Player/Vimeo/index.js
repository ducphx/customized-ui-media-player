"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PLAYBACK_SPEED_OPTIONS = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _emotion = require("@instructure/emotion");

var _PropTypes = require("../PropTypes");

var _constants = require("../../../constants");

var _utils = require("../../utils");

var _player = _interopRequireDefault(require("@vimeo/player"));

var _styles = _interopRequireDefault(require("./styles"));

var _dec, _class, _class2, _temp;

const PLAYBACK_SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2];
exports.PLAYBACK_SPEED_OPTIONS = PLAYBACK_SPEED_OPTIONS;
let Vimeo = (_dec = (0, _emotion.withStyle)(_styles.default, null), _dec(_class = (_temp = _class2 = class Vimeo extends _react.Component {
  constructor() {
    super(...arguments);

    this.showSpinner = () => {
      this.props.setLoadingOverlay(true);
    };

    this.hideSpinner = () => {
      this.props.setLoadingOverlay(false);
    };

    this.needBuffering = () => {
      if (this.props.currentTime > this.buffered) {
        this.showSpinner();
      } else {
        this.hideSpinner();
      }
    };

    this.eventHandlers = {
      loaded: this.props.onLoadedData,
      play: _ref => {
        let currentTime = _ref.seconds;
        this.disableIframeFocus();
        this.props.onRendererStateChange({
          currentTime,
          mediaState: _constants.PLAYING
        }, this.props.onPlay);
      },
      playing: () => {
        this.disableIframeFocus();
        this.hideSpinner();
      },
      pause: () => {
        this.disableIframeFocus();
        this.props.onRendererStateChange({
          mediaState: _constants.PAUSED
        }, this.props.onPause);
      },
      seeked: _ref2 => {
        let duration = _ref2.duration,
            currentTime = _ref2.seconds;
        this.disableIframeFocus();
        this.props.onRendererStateChange({
          duration,
          currentTime
        }, this.props.onSeeked);
      },
      timeupdate: _ref3 => {
        let duration = _ref3.duration,
            currentTime = _ref3.seconds;
        this.props.onRendererStateChange({
          duration,
          currentTime
        }, this.props.onTimeUpdate);
      },
      progress: _ref4 => {
        let duration = _ref4.duration,
            buffered = _ref4.seconds;
        this.buffered = buffered;
        this.needBuffering();
        this.props.onRendererStateChange({
          duration,
          buffered
        }, this.props.onProgress);
      },
      ended: () => {
        this.enableIframeFocus();
        this.props.onRendererStateChange({
          mediaState: _constants.ENDED
        }, this.props.onEnded);
      },
      playbackratechange: _ref5 => {
        let playbackSpeed = _ref5.playbackRate;
        this.props.onRendererStateChange({
          playbackSpeed
        }, this.props.onRateChange);
      },
      volumechange: async _ref6 => {
        let volume = _ref6.volume;
        this.props.onRendererStateChange({
          volume,
          muted: await this.player.getMuted()
        }, this.props.onVolumeChange);
      },
      bufferstart: () => {
        this.showSpinner();
      },
      bufferend: () => {
        this.hideSpinner();
      }
    };

    this.addEventListeners = () => {
      for (const key in this.eventHandlers) {
        if (Object.hasOwnProperty.call(this.eventHandlers, key)) {
          if (this.player) {
            this.player.on(key, this.eventHandlers[key]);
          }
        }
      }
    };

    this.removeEventListeners = () => {
      for (const key in this.eventHandlers) {
        if (Object.hasOwnProperty.call(this.eventHandlers, key)) {
          if (this.player) {
            this.player.off(key);
          }
        }
      }
    };

    this.setInitialDuration = async player => {
      const duration = await player.getDuration();
      this.props.onRendererStateChange({
        duration
      }, this.props.onCanPlay);
    };

    this.play = async () => {
      await this.player.play();
    };

    this.pause = async () => {
      await this.player.pause();
    };

    this.togglePlay = () => {
      if (this.props.mediaState === _constants.PLAYING) {
        this.pause();
      } else {
        this.play();
      }
    };

    this.setPlaybackSpeed = async playbackSpeed => {
      await this.player.setPlaybackRate(playbackSpeed);
    };

    this.setVolume = async volume => {
      if (await this.player.getMuted()) {
        this.player.setMuted(false);
      }

      await this.player.setVolume((0, _utils.clampToZero)(volume, 1));
    };

    this.toggleMute = async () => {
      const isMuted = await this.player.getMuted();
      this.player.setMuted(!isMuted);
    };

    this.seek = async secondsToSeek => {
      const duration = await this.player.getDuration();
      const targetTime = (0, _utils.clampToZero)(secondsToSeek, duration);
      await this.player.setCurrentTime(targetTime);
      this.needBuffering();
    };

    this.getIframe = () => {
      const element = this.el.querySelector('iframe');

      if (!element) {
        return;
      }

      return element;
    };

    this.enableIframeFocus = () => {
      const iframe = this.getIframe();
      iframe && iframe.removeAttribute('tabindex');
    };

    this.disableIframeFocus = () => {
      const iframe = this.getIframe();
      iframe && iframe.setAttribute('tabindex', '-1');
    };
  }

  componentDidMount() {
    this.showSpinner();
    this.createPlayer();
    this.props.makeStyles();
  }

  componentDidUpdate() {
    this.props.makeStyles();
  }

  componentWillUnmount() {
    this.removeEventListeners();

    if (this.player) {
      this.player.destroy();
    }
  }

  createPlayer() {
    const _this$props = this.props,
          setPlaybackSpeedOptions = _this$props.setPlaybackSpeedOptions,
          setActions = _this$props.setActions,
          onLoadedMetadata = _this$props.onLoadedMetadata;
    this.player = new _player.default(this.container, {
      id: this.props.selectedSrc,
      controls: false,
      dnt: true
    });
    this.addEventListeners();
    this.player.ready().then(() => {
      this.disableIframeFocus();
      this.hideSpinner();
      this.setInitialDuration(this.player);
      setPlaybackSpeedOptions(PLAYBACK_SPEED_OPTIONS);
      setActions({
        togglePlay: this.togglePlay,
        play: this.play,
        pause: this.pause,
        seek: this.seek,
        setVolume: this.setVolume,
        toggleMute: this.toggleMute,
        setPlaybackSpeed: this.setPlaybackSpeed
      });
      onLoadedMetadata();
    }, error => {
      this.hideSpinner();
      this.removeEventListeners();
      this.player.destroy();
      this.props.onError(null, error);
    });
  }

  render() {
    const _this$props2 = this.props,
          styles = _this$props2.styles,
          videoId = _this$props2.videoId;
    return (0, _emotion.jsx)("div", {
      css: styles.vimeoContainer,
      ref: el => {
        this.el = el;
      }
    }, (0, _emotion.jsx)("div", {
      id: videoId,
      ref: el => {
        this.container = el;
      }
    }));
  }

}, _class2.propTypes = (0, _objectSpread2.default)((0, _objectSpread2.default)({
  // eslint-disable-next-line react/require-default-props
  makeStyles: _propTypes.default.func,
  // eslint-disable-next-line react/require-default-props
  styles: _propTypes.default.object,
  videoId: _propTypes.default.string.isRequired,
  mediaState: _propTypes.default.string,
  currentTime: _propTypes.default.number,
  setActions: _propTypes.default.func.isRequired,
  onRendererStateChange: _propTypes.default.func.isRequired,
  setPlaybackSpeedOptions: _propTypes.default.func.isRequired,
  setLoadingOverlay: _propTypes.default.func.isRequired
}, _PropTypes.rendererEventsTypeSet), {}, {
  onCanPlay: _propTypes.default.func.isRequired,
  onEnded: _propTypes.default.func.isRequired,
  onLoadedData: _propTypes.default.func.isRequired,
  onLoadedMetadata: _propTypes.default.func.isRequired,
  onPause: _propTypes.default.func.isRequired,
  onPlay: _propTypes.default.func.isRequired,
  onProgress: _propTypes.default.func.isRequired,
  onRateChange: _propTypes.default.func.isRequired,
  onSeeked: _propTypes.default.func.isRequired,
  onTimeUpdate: _propTypes.default.func.isRequired,
  onVolumeChange: _propTypes.default.func.isRequired,
  onError: _propTypes.default.func.isRequired
}), _class2.defaultProps = {
  mediaState: '',
  currentTime: 0,
  disableIframeFocus: false
}, _temp)) || _class);
var _default = Vimeo;
exports.default = _default;