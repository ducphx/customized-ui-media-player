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
import React, { Component } from 'react'

import { pickProps } from '@instructure/ui-react-utils'
import { IconPlaySolid, IconPauseSolid } from '@instructure/ui-icons'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'

import PlayerButton from '../../PlayerButton'
import MediaContext from '../../Player/MediaContext'
import { PAUSED, ENDED, PLAYING } from '../../../constants'
import { translate } from '../../../constants/translated/translations'

/**
---
private: true
---
@module PlayPauseButton
**/
export default class PlayPauseButton extends Component {
  config (variant) {
    const VARIANTS = {
      [PAUSED]: {
        label: translate('PLAYBACK_PLAY'),
        Icon: IconPlaySolid
      },
      [ENDED]: {
        label: translate('PLAYBACK_PLAY'),
        Icon: IconPlaySolid
      },
      [PLAYING]: {
        label: translate('PLAYBACK_PAUSE'),
        Icon: IconPauseSolid
      }
    }

    return VARIANTS[variant]
  }

  focusPlay = () => {
    this.buttonRef.focus()
  }

  setButtonRef = (ref) => {
    this.buttonRef = ref
    if (this.props.forwardRef) {
      this.props.forwardRef(ref)
    }
  }

  render () {
    return (
      <MediaContext.Consumer>
        {({
          state,
          actions,
          setActions,
          fullScreenContainerRef
        }) => {
          const { label, Icon } = this.config(state.mediaState)

          setActions({
            focusPlay: this.focusPlay
          })

          return (
            <PlayerButton
              {...pickProps(this.props, PlayerButton.propTypes)}
              tooltipLabel={label}
              tooltipMountNode={fullScreenContainerRef}
              videoId={state.videoId}
              onClick={actions.togglePlay}
              forwardRef={this.setButtonRef}
            >
              <ScreenReaderContent>{label}</ScreenReaderContent>
              <Icon size="x-small" />
            </PlayerButton>
          )
        }}
      </MediaContext.Consumer>
    )
  }
}
