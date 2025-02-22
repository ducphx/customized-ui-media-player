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
import { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyle, jsx } from '@instructure/emotion'

import { rendererEventsTypeSet } from '../PropTypes'
import { clampToZero } from '../../utils'
import { PAUSED, PLAYING, ENDED } from '../../../constants'

import generateStyle from './styles'

export const MEDIA_ELEMENT_PROPS = [
  'onEnded',
  'onLoadedMetadata',
  'onProgress',
  'onRateChange',
  'onSeeked',
  'onTimeUpdate',
  'onVolumeChange',
]
export const PLAYBACK_SPEED_OPTIONS = [0.5, 1, 1.5, 2.0]

@withStyle(generateStyle, null)
class HTML5Video extends Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    videoId: PropTypes.string.isRequired,
    selectedSrc: PropTypes.string,
    setActions: PropTypes.func,
    onRendererStateChange: PropTypes.func,
    poster: PropTypes.string,

    ...rendererEventsTypeSet,
  }

  static defaultProps = {
    selectedSrc: '',
    setActions: () => {},
    onRendererStateChange: () => {},
    poster: null,
  }

  state = {
    lastKnownPlaying: null,
    lastKnownTime: null,
    lastKnownDuration: NaN,
    metadataLoaded: true,
  }

  componentDidMount() {
    this.showSpinner()
    this.props.setPlaybackSpeedOptions(PLAYBACK_SPEED_OPTIONS)
    this.props.makeStyles()
  }

  componentDidUpdate() {
    this.props.makeStyles()
  }

  componentWillUnmount() {
    this.video = null
  }

  setVideoRef = (el) => {
    if (!el) {
      return
    }
    this.video = el
  }

  showSpinner = () => {
    this.props.setLoadingOverlay(true)
  }

  hideSpinner = () => {
    this.props.setLoadingOverlay(false)
  }

  handleOnLoadedMetadata = () => {
    this.props.setActions({
      togglePlay: this.togglePlay,
      play: this.play,
      pause: this.pause,
      seek: this.seek,
      setVolume: this.setVolume,
      setPlaybackSpeed: this.setPlaybackSpeed,
      setSource: this.setSource,
      toggleMute: this.toggleMute,
    })
    this.hideSpinner()
    this.setState({ metadataLoaded: true })
  }

  rememberMediaState = () => {
    const { lastKnownPlaying, lastKnownTime } = this.state

    if (lastKnownTime !== null) {
      this.seek(lastKnownTime)
    }

    if (lastKnownPlaying !== null) {
      if (lastKnownPlaying) {
        this.play()
      } else {
        this.pause()
      }
    }

    this.setState({
      lastKnownPlaying: null,
      lastKnownTime: null,
    })
  }

  handleOnCanPlay = () => {
    this.rememberMediaState()
    this.hideSpinner()
  }

  togglePlay = () => {
    if (this.props.mediaState === PLAYING) {
      this.pause()
    } else {
      this.play()
    }
  }

  play = () => {
    this.video.play()
  }

  pause = () => {
    this.video.pause()
  }

  seek = (time) => {
    this.video.currentTime = clampToZero(time, this.video.duration)
  }

  setVolume = (volume) => {
    if (this.video.muted) {
      this.video.muted = false
    }
    this.video.volume = clampToZero(volume, 1)
  }

  setPlaybackSpeed = (playbackSpeed) => {
    this.video.playbackRate = playbackSpeed
  }

  setSource = (src) => {
    if (this.video.currentSrc === src) {
      return
    }

    this.setState({
      lastKnownPlaying: !this.video.paused,

      // If the currentTime is 0:00, ensure that we show the poster upon source change,
      // instead of seeking immediately to 0:00
      lastKnownTime: this.video.currentTime || null,
      lastKnownDuration: this.video.duration || NaN,
      metadataLoaded: false,
    })

    this.video.src = src
  }

  toggleMute = () => {
    this.video.muted = !this.video.muted
  }

  renderSource = () => {
    const { selectedSrc } = this.props

    if (selectedSrc) {
      return <source src={selectedSrc} />
    }
  }

  updateRendererState = () => {
    if (!this.video) {
      return
    }
    const duration = this.state.metadataLoaded
      ? this.video.duration
      : this.state.lastKnownDuration
    const currentTime = this.state.metadataLoaded
      ? this.video.currentTime
      : clampToZero(this.state.lastKnownTime, duration)
    const bufferedRanges = this.video.buffered
    const bufferedValue =
      bufferedRanges.length > 0
        ? bufferedRanges.end(bufferedRanges.length - 1)
        : 0

    // In FF, when approaching the end of the video, buffered can be smaller than currentTime
    const buffered = Math.max(bufferedValue, currentTime)

    let mediaState = this.video.paused ? PAUSED : PLAYING
    if (this.video.ended) {
      mediaState = ENDED
    }

    const muted = this.video.muted
    const volume = this.video.volume

    const playbackSpeed = this.video.playbackRate

    const selectedSrc = this.video.currentSrc

    this.props.onRendererStateChange({
      mediaState,
      muted,
      volume,
      playbackSpeed,
      selectedSrc,
      currentTime,
      duration,
      buffered,
    })
  }

  render() {
    const { videoId, styles } = this.props

    const defaultProps = {
      onLoadStart: this.showSpinner,
      onLoadedMetadata: this.handleOnLoadedMetadata,
      onWaiting: this.showSpinner,
      onCanPlay: this.handleOnCanPlay,
    }

    const eventProps = {}
    const allEvents = [
      ...MEDIA_ELEMENT_PROPS,
      ...Object.keys(rendererEventsTypeSet),
      ...Object.keys(defaultProps),
    ]

    allEvents.forEach((key) => {
      const defaultPropFn = defaultProps[key]
      const isMediaElementProp = MEDIA_ELEMENT_PROPS.includes(key)
      const propFn = this.props[key]

      if (!isMediaElementProp && !propFn && !defaultPropFn) {
        return
      }

      eventProps[key] = (event) => {
        if (isMediaElementProp) {
          this.updateRendererState()
        }

        if (defaultPropFn) {
          defaultPropFn(event)
        }

        if (propFn) {
          propFn(event)
        }
      }
    })

    /* eslint-disable jsx-a11y/media-has-caption, jsx-a11y/no-noninteractive-tabindex */
    return (
      <div css={styles.container}>
        {/* TODO: convert this <div> to <> (React.Fragment) once ui-testbed is gone */}
        <video
          playsInline
          poster={this.props.poster}
          ref={this.setVideoRef}
          id={videoId}
          css={styles.video}
          tabIndex="-1"
          {...eventProps}
        >
          {this.renderSource()}
        </video>
      </div>
    )
    /* eslint-enable jsx-a11y/media-has-caption, jsx-a11y/no-noninteractive-tabindex */
  }
}

export default HTML5Video
export { HTML5Video }
