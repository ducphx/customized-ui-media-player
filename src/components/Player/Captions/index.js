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
import captionUtils from '../../../utils/caption'
import { tracksType } from '../PropTypes'

import generateStyle from './styles'
import generateComponentTheme from './theme'

const ENTER = /[\r\n]/g

@withStyle(generateStyle, generateComponentTheme)
class CaptionsPres extends Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    currentTime: PropTypes.number.isRequired,
    captions: PropTypes.arrayOf(
      PropTypes.shape({
        start: PropTypes.number,
        end: PropTypes.number,
        text: PropTypes.string,
      })
    ),
    captionPosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    captionOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    showControls: PropTypes.bool,
  }

  static defaultProps = {
    captions: [],
    captionPosition: 'top',
    captionOffset: 0,
    showControls: false,
  }

  state = { activeCues: [] }

  componentDidMount() {
    this.props.makeStyles()
  }

  componentDidUpdate(prevProps, prevState) {
    const activeCues = captionUtils.getActiveCues(this.props, prevProps, this)
    if (captionUtils.activeCuesChanged(prevState.activeCues, activeCues)) {
      this.setState({ activeCues })
    }
    this.props.makeStyles()
  }

  lookupIdx = 0

  render() {
    const { captions, styles } = this.props

    if (!Array.isArray(captions) || captions.length === 0) {
      return null
    }

    return (
      <div css={styles.subtitleContainer}>
        {this.state.activeCues.map(({ text }) =>
          text.split(ENTER).map((lineContent) => {
            // Caption files can provide multiple entries for a single time slot.
            // Display each entry separated by a single line to emulate native behaviour.
            return (
              <div key={lineContent}>
                <span css={styles.subtitle}>{lineContent}</span>
              </div>
            )
          })
        )}
      </div>
    )
  }
}

export default class Captions extends Component {
  static propTypes = {
    tracks: tracksType,
    setActions: PropTypes.func,
    onTrackChange: PropTypes.func,
    autoShowCaption: PropTypes.string,
    ...CaptionsPres.propTypes,
  }

  static defaultProps = {
    tracks: [],
    setActions: () => {},
    onTrackChange: () => {},
    ...CaptionsPres.defaultProps,
  }

  constructor(props) {
    super(props)
    this.props.setActions({
      toggleTrack: this.toggleTrack,
    })

    if (this.props.autoShowCaption) {
      const cap = this.props.tracks?.find(
        (t) => t.language === this.props.autoShowCaption
      )
      if (cap) {
        this.toggleTrack(cap.id)
      }
    }
  }

  state = {
    captions: [],
    convertedTracks: {},
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tracks !== this.props.tracks) {
      this.clearUnneededConvertedTracks(
        this.props.tracks,
        prevProps.tracks,
        this.maybeDefaultToOff
      )
    }
  }

  clearUnneededConvertedTracks = (tracks, staleTracks, callback = () => {}) => {
    this.setState((prevState) => {
      const tracksToKeep = staleTracks.filter(({ id: staleId }) =>
        tracks.some((track) => staleId === track.id)
      )
      const convertedTracks = tracksToKeep.reduce((result, { id }) => {
        const convertedTrack = prevState.convertedTracks[id]
        if (!convertedTrack) {
          return result
        }
        return { ...result, [id]: convertedTrack }
      }, {})
      return { convertedTracks }
    }, callback)
  }

  maybeDefaultToOff = () => {
    const { convertedTracks, captions } = this.state
    const currentCaptions = Object.values(convertedTracks).find(
      (cachedCaptions) => cachedCaptions === captions
    )
    if (!currentCaptions) {
      this.toggleTrack(null)
    }
  }

  findSelectedTrack = (tracks, trackId) =>
    tracks.find((track) => track.id === trackId)

  toggleTrack = (trackId) => {
    const selectedTrack = this.findSelectedTrack(this.props.tracks, trackId)
    const selectedTrackSrc = selectedTrack && selectedTrack.src
    const selectedTrackId = selectedTrack && selectedTrack.id

    const applyTrack = () => {
      this.setState(
        {
          captions: selectedTrackId
            ? this.state.convertedTracks[selectedTrackId]
            : [],
        },
        () => this.props.onTrackChange(trackId)
      )
    }

    if (selectedTrack && !this.state.convertedTracks[selectedTrackId]) {
      return captionUtils
        .getCaptionsFromFile(selectedTrackSrc)
        .then((captionData) => {
          const sortedCaptionData = captionUtils.sortByTime(captionData)
          this.setState(
            (prevState) => ({
              convertedTracks: {
                ...prevState.convertedTracks,
                [selectedTrackId]: sortedCaptionData,
              },
            }),
            applyTrack
          )
        })
        .catch((message) => {
          window.console.warn(message)

          applyTrack()

          return Promise.reject(message)
        })
    } else {
      applyTrack()
    }

    return Promise.resolve()
  }

  render() {
    return <CaptionsPres {...this.props} {...this.state} />
  }
}

export { Captions, CaptionsPres }
