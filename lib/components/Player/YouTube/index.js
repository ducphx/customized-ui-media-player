"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.YouTube = exports.YOUTUBE_TIME_UPDATE_OFFSET = exports.PLAYER_READY_TIMEOUT = exports.MEDIA_EVENT_UPDATE_INTERVAL = exports.MAX_VOLUME = exports.DIRECTION_FORWARD = exports.DIRECTION_BACKWARD = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _emotion = require("@instructure/emotion");

var _PropTypes = require("../PropTypes");

var _constants = require("../../../constants");

var _utils = require("../../utils");

var _styles = _interopRequireDefault(require("./styles"));

var _dec, _class, _class2, _temp;

const MAX_VOLUME = 100;
exports.MAX_VOLUME = MAX_VOLUME;
const MEDIA_EVENT_UPDATE_INTERVAL = 50;
exports.MEDIA_EVENT_UPDATE_INTERVAL = MEDIA_EVENT_UPDATE_INTERVAL;
const DIRECTION_FORWARD = 'DIRECTION_FORWARD';
exports.DIRECTION_FORWARD = DIRECTION_FORWARD;
const DIRECTION_BACKWARD = 'DIRECTION_BACKWARD';
exports.DIRECTION_BACKWARD = DIRECTION_BACKWARD;
const PLAYER_READY_TIMEOUT = 20 * 1000; // YouTube's timeupdate is not in perfect sync with React,
// which triggers markers' onReached twice when video is
// playing and marker is clicked. This tiny offset
// is to prevent double onReached trigger.
// Note: it's observed that this happens when
// the onReached involves seeking to the marker's time.

exports.PLAYER_READY_TIMEOUT = PLAYER_READY_TIMEOUT;
const YOUTUBE_TIME_UPDATE_OFFSET = 0.0001;
exports.YOUTUBE_TIME_UPDATE_OFFSET = YOUTUBE_TIME_UPDATE_OFFSET;
let YouTube = (_dec = (0, _emotion.withStyle)(_styles.default, null), _dec(_class = (_temp = _class2 = class YouTube extends _react.Component {
  constructor() {
    super(...arguments);

    this.showSpinner = () => {
      this.props.setLoadingOverlay(true);
    };

    this.hideSpinner = () => {
      this.props.setLoadingOverlay(false);
    };

    this.setupYT = () => {
      if (!window.YT) {
        window.onYouTubeIframeAPIReady = this.loadVideo;
        (0, _utils.loadScript)('https://www.youtube.com/iframe_api');
      } else {
        this.loadVideo();
      }
    };

    this.getYouTubeVideoId = url => {
      if (!url) {
        return;
      }

      const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/; // eslint-disable-line no-useless-escape

      const result = url.match(regExp);
      return result && result[1];
    };

    this.loadVideo = () => {
      this.props.onLoadStart && this.props.onLoadStart();
      const youtubeId = this.getYouTubeVideoId(this.props.selectedSrc);
      this.player = new window.YT.Player(this.props.videoId, {
        videoId: youtubeId,
        playerVars: {
          // https://developers.google.com/youtube/player_parameters#Parameters
          playsinline: 1,
          controls: 0,
          // hides YouTube controls
          disablekb: 1,
          // disables YouTube keyboard shortcut
          iv_load_policy: 3,
          // turns off YT annotations
          rel: 0,
          // only shows related videos from the same channel
          enablejsapi: 1 // enables the player to be controlled via IFrame or JavaScript Player API calls

        },
        events: {
          onReady: this.onPlayerReady,
          onStateChange: this.onPlayerStateChange,
          onPlaybackRateChange: this.onPlayerPlaybackRateChange,
          onError: this.onPlayerError
        }
      });
      this.toggleFocus();
    };

    this.onPlayerError = event => {
      this.props.onError && this.props.onError(event);
    };

    this.onPlayerPlaybackRateChange = () => {
      this.props.onRendererStateChange({
        playbackSpeed: this.player.getPlaybackRate()
      }, () => {
        this.props.onRateChange && this.props.onRateChange();
      });
    };

    this.handleOnLoadedMetadata = () => {
      this.props.setActions({
        togglePlay: this.togglePlay,
        play: this.play,
        pause: this.pause,
        seek: this.seek,
        setVolume: this.setVolume,
        toggleMute: this.toggleMute,
        setPlaybackSpeed: this.setPlaybackSpeed
      });
      this.hideSpinner();
      this.props.onLoadedMetadata && this.props.onLoadedMetadata();
    };

    this.onPlayerReady = () => {
      this.props.onCanPlay && this.props.onCanPlay();
      this.handleOnLoadedMetadata();
      this.props.setPlaybackSpeedOptions(this.player.getAvailablePlaybackRates()); // Sadly, there's no callback functionality for time updates & volume changes
      // so we'll have to make it work ourselves.
      // See https://developers.google.com/youtube/iframe_api_reference#Events

      this.clearEventUpdates = this.setupEventUpdates(this.player);
    };

    this.hideTrack = () => {
      this.player.setOption('captions', 'track', {});
    };

    this.onSeeked = () => {
      this.seekDirection = null;
      this.seekLastAttemptTime = null;
      this.seeking = false;
      this.targetTime = null;
      this.props.onSeeked && this.props.onSeeked();
    };

    this.maybeFireMediaEventCallbacks = () => {
      this.reportTimeUpdate && this.props.onTimeUpdate && this.props.onTimeUpdate();

      if (this.reportVolumeChange) {
        this.props.onVolumeChange && this.props.onVolumeChange();
        this.reportVolumeChange = false;
      }

      if (this.seeking) {
        if (this.seekDirection === DIRECTION_FORWARD && this.player.getCurrentTime() >= this.targetTime) {
          this.onSeeked();
        } else if (this.seekDirection === DIRECTION_BACKWARD) {
          if (this.player.getCurrentTime() > this.seekLastAttemptTime || this.player.getCurrentTime() === this.targetTime) {
            this.onSeeked();
          } else {
            this.seekLastAttemptTime = this.player.getCurrentTime();
          }
        }
      }
    };

    this.setupEventUpdates = player => {
      const onRendererStateChange = this.props.onRendererStateChange;

      if (!onRendererStateChange) {
        return;
      }

      const onEventUpdate = () => {
        const duration = player.getDuration();
        let currentTime;

        if (this.seeking && this.targetTime) {
          currentTime = this.targetTime;
        } else {
          currentTime = this.props.mediaState === _constants.ENDED ? duration : player.getCurrentTime();
        }

        onRendererStateChange({
          duration,
          currentTime,
          buffered: this.props.mediaState === _constants.ENDED ? duration : player.getVideoLoadedFraction() * duration,
          muted: player.isMuted(),
          volume: player.getVolume() / MAX_VOLUME
        }, this.maybeFireMediaEventCallbacks);
      };

      const eventUpdateId = setInterval(onEventUpdate, MEDIA_EVENT_UPDATE_INTERVAL);
      return () => {
        clearInterval(eventUpdateId);
      };
    };

    this.playedTheFirstTime = false;
    this.reportTimeUpdate = false;

    this.onPlayerStateChange = event => {
      switch (event.data) {
        case window.YT.PlayerState.ENDED:
          this.reportTimeUpdate = false;
          this.props.onRendererStateChange({
            mediaState: _constants.ENDED
          }, () => {
            this.props.onEnded && this.props.onEnded();
          });
          break;

        case window.YT.PlayerState.PLAYING:
          this.reportTimeUpdate = true;

          if (!this.playedTheFirstTime) {
            this.props.onLoadedData && this.props.onLoadedData();
            this.hideTrack();
            this.playedTheFirstTime = true;
          }

          this.props.onRendererStateChange({
            mediaState: _constants.PLAYING
          }, () => {
            this.props.onPlay && this.props.onPlay();
            this.props.onPlaying && this.props.onPlaying();
          });
          break;

        case window.YT.PlayerState.PAUSED:
          this.reportTimeUpdate = false;
          this.props.onRendererStateChange({
            mediaState: _constants.PAUSED
          }, () => {
            this.props.onPause && this.props.onPause();
          });
          break;

        case window.YT.PlayerState.BUFFERING:
          this.props.onProgress && this.props.onProgress();
          break;

        default:
          break;
      }
    };

    this.togglePlay = () => {
      if (this.props.mediaState === _constants.PLAYING) {
        this.pause();
      } else {
        this.play();
      }
    };

    this.play = () => {
      this.player.playVideo();
    };

    this.pause = () => {
      this.player.pauseVideo();
    };

    this.seeking = false;
    this.targetTime = null;

    this.seek = time => {
      /* see comments at YOUTUBE_TIME_UPDATE_OFFSET's initialization for details */
      const timeWithOffset = time + YOUTUBE_TIME_UPDATE_OFFSET;
      /*
        Unfortunately, YouTube's getCurrentTime() doesn't work cleanly with YouTube's seekTo().
        getCurrentTime() returns an intermediate value between Time A (starting time) and Time B (target time).
         Simple diagram:
         (1) Time A -> (2) `player.getCurrentTime()` returns (A + 0.121314) -> (3) Time B
         This breaks the logic that tells whether we're done seeking or not in `this.maybeFireMediaEventCallbacks`.
        In our testing, we observed that there could be as little as 0 intermediate values to more than 5 intermediate values,
        so we're doing a relaxed check whether it has seeked forward/backwards. See the other part of the implementation
        in `this.maybeFireMediaEventCallbacks`.
      */

      const targetTime = (0, _utils.clampToZero)(timeWithOffset, this.player.getDuration());
      const playerCurrentTime = this.player.getCurrentTime();
      this.seekDirection = targetTime > playerCurrentTime ? DIRECTION_FORWARD : DIRECTION_BACKWARD;
      this.seekLastAttemptTime = playerCurrentTime;
      this.seeking = true;
      this.targetTime = targetTime;
      this.player.seekTo(targetTime);
      this.props.onSeeking && this.props.onSeeking();
    };

    this.reportVolumeChange = false;

    this.setVolume = volume => {
      if (this.player.isMuted()) {
        this.player.unMute();
      }

      this.player.setVolume((0, _utils.clampToZero)(volume * MAX_VOLUME, MAX_VOLUME));
      this.reportVolumeChange = true;
    };

    this.toggleMute = () => {
      if (this.player.isMuted()) {
        this.player.unMute();
      } else {
        this.player.mute();
      }
    };

    this.setPlaybackSpeed = playbackSpeed => {
      this.player.setPlaybackRate(playbackSpeed);
    };

    this.toggleFocus = () => {
      const element = this.el.querySelector('iframe');

      if (!element) {
        return;
      }

      if (this.props.disableYoutubeFocus) {
        element.setAttribute('tabindex', '-1');
      } else {
        element.removeAttribute('tabindex');
      }
    };
  }

  componentDidMount() {
    this.showSpinner();
    this.setupYT();
    this.props.makeStyles();
  }

  componentDidUpdate(prevProps) {
    if (this.props.disableYoutubeFocus !== prevProps.disableYoutubeFocus) {
      this.toggleFocus();
    }

    this.props.makeStyles();
  }

  componentWillUnmount() {
    this.clearEventUpdates && this.clearEventUpdates();
  }

  render() {
    const _this$props = this.props,
          styles = _this$props.styles,
          videoId = _this$props.videoId;
    return (0, _emotion.jsx)("div", {
      css: styles.youtubeContainer,
      ref: element => {
        this.el = element;
      }
    }, (0, _emotion.jsx)("div", {
      id: videoId
    }));
  }

}, _class2.propTypes = (0, _objectSpread2.default)({
  // eslint-disable-next-line react/require-default-props
  makeStyles: _propTypes.default.func,
  // eslint-disable-next-line react/require-default-props
  styles: _propTypes.default.object,
  videoId: _propTypes.default.string.isRequired,
  mediaState: _propTypes.default.string,
  selectedSrc: _propTypes.default.string,
  setActions: _propTypes.default.func,
  onRendererStateChange: _propTypes.default.func,
  setPlaybackSpeedOptions: _propTypes.default.func,
  disableYoutubeFocus: _propTypes.default.bool
}, _PropTypes.rendererEventsTypeSet), _class2.defaultProps = {
  mediaState: '',
  selectedSrc: '',
  setActions: () => {},
  onRendererStateChange: () => {},
  setPlaybackSpeedOptions: () => {},
  disableYoutubeFocus: false
}, _temp)) || _class);
exports.YouTube = YouTube;
var _default = YouTube;
exports.default = _default;