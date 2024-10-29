import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";

var _dec, _class, _class2, _temp;

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
import { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyle, jsx } from '@instructure/emotion';
import { rendererEventsTypeSet } from '../PropTypes';
import { PAUSED, PLAYING, ENDED } from '../../../constants';
import { clampToZero } from '../../utils';
import Player from '@vimeo/player';
import generateStyle from './styles';
export const PLAYBACK_SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2];
let Vimeo = (_dec = withStyle(generateStyle, null), _dec(_class = (_temp = _class2 = class Vimeo extends Component {
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
          mediaState: PLAYING
        }, this.props.onPlay);
      },
      playing: () => {
        this.disableIframeFocus();
        this.hideSpinner();
      },
      pause: () => {
        this.disableIframeFocus();
        this.props.onRendererStateChange({
          mediaState: PAUSED
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
          mediaState: ENDED
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
      if (this.props.mediaState === PLAYING) {
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

      await this.player.setVolume(clampToZero(volume, 1));
    };

    this.toggleMute = async () => {
      const isMuted = await this.player.getMuted();
      this.player.setMuted(!isMuted);
    };

    this.seek = async secondsToSeek => {
      const duration = await this.player.getDuration();
      const targetTime = clampToZero(secondsToSeek, duration);
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
    this.player = new Player(this.container, {
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
    return jsx("div", {
      css: styles.vimeoContainer,
      ref: el => {
        this.el = el;
      }
    }, jsx("div", {
      id: videoId,
      ref: el => {
        this.container = el;
      }
    }));
  }

}, _class2.propTypes = _objectSpread(_objectSpread({
  // eslint-disable-next-line react/require-default-props
  makeStyles: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  styles: PropTypes.object,
  videoId: PropTypes.string.isRequired,
  mediaState: PropTypes.string,
  currentTime: PropTypes.number,
  setActions: PropTypes.func.isRequired,
  onRendererStateChange: PropTypes.func.isRequired,
  setPlaybackSpeedOptions: PropTypes.func.isRequired,
  setLoadingOverlay: PropTypes.func.isRequired
}, rendererEventsTypeSet), {}, {
  onCanPlay: PropTypes.func.isRequired,
  onEnded: PropTypes.func.isRequired,
  onLoadedData: PropTypes.func.isRequired,
  onLoadedMetadata: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  onProgress: PropTypes.func.isRequired,
  onRateChange: PropTypes.func.isRequired,
  onSeeked: PropTypes.func.isRequired,
  onTimeUpdate: PropTypes.func.isRequired,
  onVolumeChange: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
}), _class2.defaultProps = {
  mediaState: '',
  currentTime: 0,
  disableIframeFocus: false
}, _temp)) || _class);
export default Vimeo;