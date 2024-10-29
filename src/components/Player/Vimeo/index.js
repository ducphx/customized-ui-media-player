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
import { PAUSED, PLAYING, ENDED } from '../../../constants'
import { clampToZero } from '../../utils'

import Player from '@vimeo/player'

import generateStyle from './styles'

export const PLAYBACK_SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2]

@withStyle(generateStyle, null)
class Vimeo extends Component {
  static propTypes = {
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
    setLoadingOverlay: PropTypes.func.isRequired,
    ...rendererEventsTypeSet,
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
    onError: PropTypes.func.isRequired,
  }

  static defaultProps = {
    mediaState: '',
    currentTime: 0,
    disableIframeFocus: false,
  }

  componentDidMount() {
    this.showSpinner()
    this.createPlayer()
    this.props.makeStyles()
  }

  componentDidUpdate() {
    this.props.makeStyles()
  }

  componentWillUnmount() {
    this.removeEventListeners()
    if (this.player) {
      this.player.destroy()
    }
  }

  showSpinner = () => {
    this.props.setLoadingOverlay(true)
  }

  hideSpinner = () => {
    this.props.setLoadingOverlay(false)
  }

  needBuffering = () => {
    if (this.props.currentTime > this.buffered) {
      this.showSpinner()
    } else {
      this.hideSpinner()
    }
  }

  eventHandlers = {
    loaded: this.props.onLoadedData,
    play: ({ seconds: currentTime }) => {
      this.disableIframeFocus()
      this.props.onRendererStateChange(
        {
          currentTime,
          mediaState: PLAYING,
        },
        this.props.onPlay
      )
    },
    playing: () => {
      this.disableIframeFocus()
      this.hideSpinner()
    },
    pause: () => {
      this.disableIframeFocus()
      this.props.onRendererStateChange(
        { mediaState: PAUSED },
        this.props.onPause
      )
    },
    seeked: ({ duration, seconds: currentTime }) => {
      this.disableIframeFocus()
      this.props.onRendererStateChange(
        {
          duration,
          currentTime,
        },
        this.props.onSeeked
      )
    },
    timeupdate: ({ duration, seconds: currentTime }) => {
      this.props.onRendererStateChange(
        {
          duration,
          currentTime,
        },
        this.props.onTimeUpdate
      )
    },
    progress: ({ duration, seconds: buffered }) => {
      this.buffered = buffered
      this.needBuffering()
      this.props.onRendererStateChange(
        {
          duration,
          buffered,
        },
        this.props.onProgress
      )
    },
    ended: () => {
      this.enableIframeFocus()
      this.props.onRendererStateChange(
        { mediaState: ENDED },
        this.props.onEnded
      )
    },
    playbackratechange: ({ playbackRate: playbackSpeed }) => {
      this.props.onRendererStateChange(
        { playbackSpeed },
        this.props.onRateChange
      )
    },
    volumechange: async ({ volume }) => {
      this.props.onRendererStateChange(
        { volume, muted: await this.player.getMuted() },
        this.props.onVolumeChange
      )
    },
    bufferstart: () => {
      this.showSpinner()
    },
    bufferend: () => {
      this.hideSpinner()
    },
  }

  addEventListeners = () => {
    for (const key in this.eventHandlers) {
      if (Object.hasOwnProperty.call(this.eventHandlers, key)) {
        if (this.player) {
          this.player.on(key, this.eventHandlers[key])
        }
      }
    }
  }

  removeEventListeners = () => {
    for (const key in this.eventHandlers) {
      if (Object.hasOwnProperty.call(this.eventHandlers, key)) {
        if (this.player) {
          this.player.off(key)
        }
      }
    }
  }

  setInitialDuration = async (player) => {
    const duration = await player.getDuration()
    this.props.onRendererStateChange(
      {
        duration,
      },
      this.props.onCanPlay
    )
  }

  createPlayer() {
    const { setPlaybackSpeedOptions, setActions, onLoadedMetadata } = this.props

    this.player = new Player(this.container, {
      id: this.props.selectedSrc,
      controls: false,
      dnt: true,
    })

    this.addEventListeners()

    this.player.ready().then(
      () => {
        this.disableIframeFocus()
        this.hideSpinner()
        this.setInitialDuration(this.player)
        setPlaybackSpeedOptions(PLAYBACK_SPEED_OPTIONS)
        setActions({
          togglePlay: this.togglePlay,
          play: this.play,
          pause: this.pause,
          seek: this.seek,
          setVolume: this.setVolume,
          toggleMute: this.toggleMute,
          setPlaybackSpeed: this.setPlaybackSpeed,
        })
        onLoadedMetadata()
      },
      (error) => {
        this.hideSpinner()
        this.removeEventListeners()
        this.player.destroy()
        this.props.onError(null, error)
      }
    )
  }

  play = async () => {
    await this.player.play()
  }

  pause = async () => {
    await this.player.pause()
  }

  togglePlay = () => {
    if (this.props.mediaState === PLAYING) {
      this.pause()
    } else {
      this.play()
    }
  }

  setPlaybackSpeed = async (playbackSpeed) => {
    await this.player.setPlaybackRate(playbackSpeed)
  }

  setVolume = async (volume) => {
    if (await this.player.getMuted()) {
      this.player.setMuted(false)
    }
    await this.player.setVolume(clampToZero(volume, 1))
  }

  toggleMute = async () => {
    const isMuted = await this.player.getMuted()
    this.player.setMuted(!isMuted)
  }

  seek = async (secondsToSeek) => {
    const duration = await this.player.getDuration()
    const targetTime = clampToZero(secondsToSeek, duration)

    await this.player.setCurrentTime(targetTime)
    this.needBuffering()
  }

  getIframe = () => {
    const element = this.el.querySelector('iframe')
    if (!element) {
      return
    }
    return element
  }

  enableIframeFocus = () => {
    const iframe = this.getIframe()
    iframe && iframe.removeAttribute('tabindex')
  }

  disableIframeFocus = () => {
    const iframe = this.getIframe()
    iframe && iframe.setAttribute('tabindex', '-1')
  }

  render() {
    const { styles, videoId } = this.props
    return (
      <div
        css={styles.vimeoContainer}
        ref={(el) => {
          this.el = el
        }}
      >
        <div
          id={videoId}
          ref={(el) => {
            this.container = el
          }}
        />
      </div>
    )
  }
}

export default Vimeo
