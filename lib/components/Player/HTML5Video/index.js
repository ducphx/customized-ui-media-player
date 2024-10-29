"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PLAYBACK_SPEED_OPTIONS = exports.MEDIA_ELEMENT_PROPS = exports.HTML5Video = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _emotion = require("@instructure/emotion");

var _PropTypes = require("../PropTypes");

var _utils = require("../../utils");

var _constants = require("../../../constants");

var _styles = _interopRequireDefault(require("./styles"));

var _dec, _class, _class2, _temp;

const MEDIA_ELEMENT_PROPS = ['onEnded', 'onLoadedMetadata', 'onProgress', 'onRateChange', 'onSeeked', 'onTimeUpdate', 'onVolumeChange'];
exports.MEDIA_ELEMENT_PROPS = MEDIA_ELEMENT_PROPS;
const PLAYBACK_SPEED_OPTIONS = [0.5, 1, 1.5, 2.0];
exports.PLAYBACK_SPEED_OPTIONS = PLAYBACK_SPEED_OPTIONS;
let HTML5Video = (_dec = (0, _emotion.withStyle)(_styles.default, null), _dec(_class = (_temp = _class2 = class HTML5Video extends _react.Component {
  constructor() {
    super(...arguments);
    this.state = {
      lastKnownPlaying: null,
      lastKnownTime: null,
      lastKnownDuration: NaN,
      metadataLoaded: true
    };

    this.setVideoRef = el => {
      if (!el) {
        return;
      }

      this.video = el;
    };

    this.showSpinner = () => {
      this.props.setLoadingOverlay(true);
    };

    this.hideSpinner = () => {
      this.props.setLoadingOverlay(false);
    };

    this.handleOnLoadedMetadata = () => {
      this.props.setActions({
        togglePlay: this.togglePlay,
        play: this.play,
        pause: this.pause,
        seek: this.seek,
        setVolume: this.setVolume,
        setPlaybackSpeed: this.setPlaybackSpeed,
        setSource: this.setSource,
        toggleMute: this.toggleMute
      });
      this.hideSpinner();
      this.setState({
        metadataLoaded: true
      });
    };

    this.rememberMediaState = () => {
      const _this$state = this.state,
            lastKnownPlaying = _this$state.lastKnownPlaying,
            lastKnownTime = _this$state.lastKnownTime;

      if (lastKnownTime !== null) {
        this.seek(lastKnownTime);
      }

      if (lastKnownPlaying !== null) {
        if (lastKnownPlaying) {
          this.play();
        } else {
          this.pause();
        }
      }

      this.setState({
        lastKnownPlaying: null,
        lastKnownTime: null
      });
    };

    this.handleOnCanPlay = () => {
      this.rememberMediaState();
      this.hideSpinner();
    };

    this.togglePlay = () => {
      if (this.props.mediaState === _constants.PLAYING) {
        this.pause();
      } else {
        this.play();
      }
    };

    this.play = () => {
      this.video.play();
    };

    this.pause = () => {
      this.video.pause();
    };

    this.seek = time => {
      this.video.currentTime = (0, _utils.clampToZero)(time, this.video.duration);
    };

    this.setVolume = volume => {
      if (this.video.muted) {
        this.video.muted = false;
      }

      this.video.volume = (0, _utils.clampToZero)(volume, 1);
    };

    this.setPlaybackSpeed = playbackSpeed => {
      this.video.playbackRate = playbackSpeed;
    };

    this.setSource = src => {
      if (this.video.currentSrc === src) {
        return;
      }

      this.setState({
        lastKnownPlaying: !this.video.paused,
        // If the currentTime is 0:00, ensure that we show the poster upon source change,
        // instead of seeking immediately to 0:00
        lastKnownTime: this.video.currentTime || null,
        lastKnownDuration: this.video.duration || NaN,
        metadataLoaded: false
      });
      this.video.src = src;
    };

    this.toggleMute = () => {
      this.video.muted = !this.video.muted;
    };

    this.renderSource = () => {
      const selectedSrc = this.props.selectedSrc;

      if (selectedSrc) {
        return (0, _emotion.jsx)("source", {
          src: selectedSrc
        });
      }
    };

    this.updateRendererState = () => {
      if (!this.video) {
        return;
      }

      const duration = this.state.metadataLoaded ? this.video.duration : this.state.lastKnownDuration;
      const currentTime = this.state.metadataLoaded ? this.video.currentTime : (0, _utils.clampToZero)(this.state.lastKnownTime, duration);
      const bufferedRanges = this.video.buffered;
      const bufferedValue = bufferedRanges.length > 0 ? bufferedRanges.end(bufferedRanges.length - 1) : 0; // In FF, when approaching the end of the video, buffered can be smaller than currentTime

      const buffered = Math.max(bufferedValue, currentTime);
      let mediaState = this.video.paused ? _constants.PAUSED : _constants.PLAYING;

      if (this.video.ended) {
        mediaState = _constants.ENDED;
      }

      const muted = this.video.muted;
      const volume = this.video.volume;
      const playbackSpeed = this.video.playbackRate;
      const selectedSrc = this.video.currentSrc;
      this.props.onRendererStateChange({
        mediaState,
        muted,
        volume,
        playbackSpeed,
        selectedSrc,
        currentTime,
        duration,
        buffered
      });
    };
  }

  componentDidMount() {
    this.showSpinner();
    this.props.setPlaybackSpeedOptions(PLAYBACK_SPEED_OPTIONS);
    this.props.makeStyles();
  }

  componentDidUpdate() {
    this.props.makeStyles();
  }

  componentWillUnmount() {
    this.video = null;
  }

  render() {
    const _this$props = this.props,
          videoId = _this$props.videoId,
          styles = _this$props.styles;
    const defaultProps = {
      onLoadStart: this.showSpinner,
      onLoadedMetadata: this.handleOnLoadedMetadata,
      onWaiting: this.showSpinner,
      onCanPlay: this.handleOnCanPlay
    };
    const eventProps = {};
    const allEvents = [...MEDIA_ELEMENT_PROPS, ...Object.keys(_PropTypes.rendererEventsTypeSet), ...Object.keys(defaultProps)];
    allEvents.forEach(key => {
      const defaultPropFn = defaultProps[key];
      const isMediaElementProp = MEDIA_ELEMENT_PROPS.includes(key);
      const propFn = this.props[key];

      if (!isMediaElementProp && !propFn && !defaultPropFn) {
        return;
      }

      eventProps[key] = event => {
        if (isMediaElementProp) {
          this.updateRendererState();
        }

        if (defaultPropFn) {
          defaultPropFn(event);
        }

        if (propFn) {
          propFn(event);
        }
      };
    });
    /* eslint-disable jsx-a11y/media-has-caption, jsx-a11y/no-noninteractive-tabindex */

    return (0, _emotion.jsx)("div", {
      css: styles.container
    }, (0, _emotion.jsx)("video", Object.assign({
      playsInline: true,
      poster: this.props.poster,
      ref: this.setVideoRef,
      id: videoId,
      css: styles.video,
      tabIndex: "-1"
    }, eventProps), this.renderSource()));
    /* eslint-enable jsx-a11y/media-has-caption, jsx-a11y/no-noninteractive-tabindex */
  }

}, _class2.propTypes = (0, _objectSpread2.default)({
  // eslint-disable-next-line react/require-default-props
  makeStyles: _propTypes.default.func,
  // eslint-disable-next-line react/require-default-props
  styles: _propTypes.default.object,
  videoId: _propTypes.default.string.isRequired,
  selectedSrc: _propTypes.default.string,
  setActions: _propTypes.default.func,
  onRendererStateChange: _propTypes.default.func,
  poster: _propTypes.default.string
}, _PropTypes.rendererEventsTypeSet), _class2.defaultProps = {
  selectedSrc: '',
  setActions: () => {},
  onRendererStateChange: () => {},
  poster: null
}, _temp)) || _class);
exports.HTML5Video = HTML5Video;
var _default = HTML5Video;
exports.default = _default;