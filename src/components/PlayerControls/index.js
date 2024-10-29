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

import PlayPauseButton from './PlayPauseButton'
import Timebar from './Timebar'
import Volume from './VolumeContainer'
import PlaybackSpeed from './PlaybackSpeedContainer'
import TrackChooser from './TrackChooserContainer'
import SourceChooser from './SourceChooserContainer'
import FullScreenButton from './FullScreenButton'
import CustomControl from './CustomControl'
import MediaContext from '../Player/MediaContext'
import PlayerSettings from './PlayerSettings'
import CaptionsToggle from './CaptionsToggle'

import generateComponentTheme from './theme'
import generateStyle from './styles'

/**
---
parent: Player
---
**/
@withStyle(generateStyle, generateComponentTheme)
class PlayerControls extends Component {
  static displayName = 'PlayerControls'
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    /**
     * Children of the <PlayerControls />
     */
    children: PropTypes.node,
  }

  static defaultProps = {
    showControls: false,
  }

  static PlayPauseButton = PlayPauseButton

  static Timebar = (props) => (
    <MediaContext.Consumer>
      {({ state, actions }) => (
        <Timebar
          seeking={state.seeking}
          duration={state.duration}
          currentTime={state.currentTime}
          mediaState={state.mediaState}
          buffered={state.buffered}
          videoId={state.videoId}
          onClick={actions.seek}
          {...props}
        />
      )}
    </MediaContext.Consumer>
  )

  static Volume = Volume
  static TrackChooser = TrackChooser
  static PlaybackSpeed = PlaybackSpeed
  static SourceChooser = SourceChooser
  static FullScreenButton = FullScreenButton
  static PlayerSettings = PlayerSettings
  static Control = CustomControl
  static CaptionsToggle = CaptionsToggle

  handleOnClick = (showControls) => (e) => {
    e.stopPropagation()
    showControls()
  }

  componentDidMount() {
    this.props.makeStyles()
  }

  componentDidUpdate() {
    this.props.makeStyles()
  }

  render() {
    const { styles } = this.props
    return (
      <MediaContext.Consumer>
        {({ state, actions }) => {
          const { showControls } = state

          /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
          /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/mouse-events-have-key-events */
          return (
            <div
              css={[styles.container, !showControls && styles.hidden]}
              onClick={this.handleOnClick(actions.showControls)}
              onMouseEnter={() => {
                actions.setControlHovered(true)
              }}
              onMouseLeave={() => {
                actions.setControlHovered(false)
              }}
            >
              {this.props.children}
            </div>
          )
          /* eslint-enable jsx-a11y/no-static-element-interactions, jsx-a11y/mouse-events-have-key-events */
          /* eslint-enable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
        }}
      </MediaContext.Consumer>
    )
  }
}

export default PlayerControls
