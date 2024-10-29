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
import { clampToZero } from '../../utils';
import { PAUSED, PLAYING, ENDED } from '../../../constants';
import generateStyle from './styles';
export const MEDIA_ELEMENT_PROPS = ['onEnded', 'onLoadedMetadata', 'onProgress', 'onRateChange', 'onSeeked', 'onTimeUpdate', 'onVolumeChange'];
export const PLAYBACK_SPEED_OPTIONS = [0.5, 1, 1.5, 2.0];
let HTML5Video = (_dec = withStyle(generateStyle, null), _dec(_class = (_temp = _class2 = class HTML5Video extends Component {
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
      if (this.props.mediaState === PLAYING) {
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
      this.video.currentTime = clampToZero(time, this.video.duration);
    };

    this.setVolume = volume => {
      if (this.video.muted) {
        this.video.muted = false;
      }

      this.video.volume = clampToZero(volume, 1);
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
        return jsx("source", {
          src: selectedSrc
        });
      }
    };

    this.updateRendererState = () => {
      if (!this.video) {
        return;
      }

      const duration = this.state.metadataLoaded ? this.video.duration : this.state.lastKnownDuration;
      const currentTime = this.state.metadataLoaded ? this.video.currentTime : clampToZero(this.state.lastKnownTime, duration);
      const bufferedRanges = this.video.buffered;
      const bufferedValue = bufferedRanges.length > 0 ? bufferedRanges.end(bufferedRanges.length - 1) : 0; // In FF, when approaching the end of the video, buffered can be smaller than currentTime

      const buffered = Math.max(bufferedValue, currentTime);
      let mediaState = this.video.paused ? PAUSED : PLAYING;

      if (this.video.ended) {
        mediaState = ENDED;
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
    const allEvents = [...MEDIA_ELEMENT_PROPS, ...Object.keys(rendererEventsTypeSet), ...Object.keys(defaultProps)];
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

    return jsx("div", {
      css: styles.container
    }, jsx("video", Object.assign({
      playsInline: true,
      poster: this.props.poster,
      ref: this.setVideoRef,
      id: videoId,
      css: styles.video,
      tabIndex: "-1"
    }, eventProps), this.renderSource()));
    /* eslint-enable jsx-a11y/media-has-caption, jsx-a11y/no-noninteractive-tabindex */
  }

}, _class2.propTypes = _objectSpread({
  // eslint-disable-next-line react/require-default-props
  makeStyles: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  styles: PropTypes.object,
  videoId: PropTypes.string.isRequired,
  selectedSrc: PropTypes.string,
  setActions: PropTypes.func,
  onRendererStateChange: PropTypes.func,
  poster: PropTypes.string
}, rendererEventsTypeSet), _class2.defaultProps = {
  selectedSrc: '',
  setActions: () => {},
  onRendererStateChange: () => {},
  poster: null
}, _temp)) || _class);
export default HTML5Video;
export { HTML5Video };