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

import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import { withStyle, jsx } from '@instructure/emotion'

import { PLAYING } from '../../constants'
import MediaContext from '../Player/MediaContext'

import generateStyle from './styles'
import generateComponentTheme from './theme'

/**
---
private: true
---
@module PlayerMarker
**/
@withStyle(generateStyle, generateComponentTheme)
class PlayerMarker extends Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    active: PropTypes.bool,
    currentTime: PropTypes.number,
    duration: PropTypes.number,
    hoverIcon: PropTypes.node,
    icon: PropTypes.node,
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    mediaState: PropTypes.string,
    onClick: PropTypes.func,
    onReached: PropTypes.func,
    time: PropTypes.number,
    seeking: PropTypes.bool,
    variant: PropTypes.oneOf(['circle', 'hidden']),
  }

  static defaultProps = {
    active: false,
    currentTime: 0,
    duration: 0,
    hoverIcon: null,
    icon: null,
    label: '',
    mediaState: null,
    onClick: null,
    onReached: null,
    time: 0,
    seeking: false,
    variant: 'hidden',
  }

  static _instances = {}

  state = {
    isFocused: false,
    isHovered: false,
  }

  componentDidMount() {
    const { isFocused, isHovered } = this.state

    PlayerMarker._instances[this.props.id] = this

    this.props.makeStyles({ isFocused, isHovered })
  }

  componentWillUnmount() {
    delete PlayerMarker._instances[this.props.id]
  }

  componentDidUpdate(prevProps) {
    const { currentTime, id, mediaState, onReached, time, seeking, makeStyles } = this.props
    const { currentTime: prevTime, id: prevId } = prevProps
    const { isFocused, isHovered } = this.state

    makeStyles({ isFocused, isHovered })

    if (id !== prevId) {
      PlayerMarker._instances[id] = this

      delete PlayerMarker._instances[prevId]
    }

    if (seeking || !onReached || mediaState !== PLAYING) {
      return
    }

    const markerPassedByPlayhead = time > prevTime && time <= currentTime
    const markerAtZeroAndPlaying =
      time === 0 && prevTime === 0 && currentTime > 0

    if (markerPassedByPlayhead || markerAtZeroAndPlaying) {
      onReached()
    }
  }

  focusMarker = (id) => {
    const instanceRef = PlayerMarker._instances[id]

    if (instanceRef) {
      instanceRef.buttonRef.focus()

      // This is a workaround for an issue caused by the inert polyfill where the polyfill
      // uses a MutationObserver to detect the inert attribute change, and MutationObserver
      // events are asynchronous, so we have to defer focus() to the next tick.
      // https://github.com/WICG/inert/blob/v3.0.0/README.md
      setTimeout(() => {
        instanceRef.buttonRef.focus()
      })
    }
  }

  handleClick = (e) => {
    e.stopPropagation()

    const { onClick } = this.props

    onClick && onClick(e)
  }

  setFocused(isFocused) {
    this.setState({ isFocused })
  }

  setHovered(isHovered) {
    this.setState({ isHovered })
  }

  handleOnMouseMove = (event) => {
    event.stopPropagation()

    this.setHovered(true)
  }

  renderCircle() {
    const { hoverIcon, icon, label, onClick, styles } = this.props

    const Component = onClick ? 'button' : 'div'

    const clickableProps = onClick
      ? {
          onBlur: () => {
            this.setFocused(false)
          },
          onClick: this.handleClick,
          onFocus: () => {
            this.setFocused(true)
          },
          onMouseMove: this.handleOnMouseMove,
          onMouseOut: () => {
            this.setHovered(false)
          },
          onMouseOver: () => {
            this.setHovered(true)
          },
          ref: (el) => {
            this.buttonRef = el
          },
        }
      : null

    /* eslint-disable jsx-a11y/mouse-events-have-key-events */
    return (
      <Component css={styles.circle} {...clickableProps}>
        {hoverIcon && (
          <span css={styles.hoverIcon} className="hoverIcon">
            {hoverIcon}
          </span>
        )}
        {icon && (
          <span css={styles.icon} className="icon">
            {icon}
          </span>
        )}

        <ScreenReaderContent>{label}</ScreenReaderContent>
      </Component>
    )
    /* eslint-enable jsx-a11y/mouse-events-have-key-events */
  }

  render() {
    const { duration, time, variant, styles } = this.props

    if (variant === 'hidden') {
      return null
    }

    const position = (time / duration) * 100 || 0

    return (
      <MediaContext.Consumer>
        {({ setActions }) => {
          setActions({
            focusMarker: this.focusMarker,
          })

          return (
            <div css={styles.container} style={{ left: `${position}%` }}>
              {variant === 'circle' ? this.renderCircle() : null}
            </div>
          )
        }}
      </MediaContext.Consumer>
    )
  }
}

export default PlayerMarker
