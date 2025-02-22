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
import { Tooltip } from '@instructure/ui-tooltip'
import { element } from '@instructure/ui-prop-types'

import MediaContext from '../Player/MediaContext'

import generateStyle from './styles'
import generateComponentTheme from './theme'

/**
---
private: true
---
@module PlayerButton
**/
@withStyle(generateStyle, generateComponentTheme)
export default class PlayerButton extends Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    /**
     * Id of the video element. Used to ensure
     * correct aria properties are applied.
     */
    videoId: PropTypes.string.isRequired,
    forwardRef: PropTypes.func,
    onClick: PropTypes.func,
    onMouseDown: PropTypes.func,
    position: PropTypes.oneOf(['start', 'middle', 'end']),
    tooltipLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    tooltipMountNode: PropTypes.oneOfType([element, PropTypes.func]),
    children: PropTypes.node
  }

  static defaultProps = {
    forwardRef: (ref) => {},
    onClick: (e) => {},
    onMouseDown: (e) => {},
    position: 'middle',
    tooltipLabel: Tooltip.defaultProps.tooltipLabel,
    tooltipMountNode: Tooltip.defaultProps.mountNode,
  }

  state = {
    isShowingTooltip: false,
  }

  handleKeyDown = (e) => {
    // prevent FF from emitting a keyboard event
    if (e.key === ' ' || e.key === 'Enter') {
      e.stopPropagation()
    }
  }

  handleInsaneBrowsers = (e) => {
    /*
      On Mac OS X 10.X + (Safari or FF), buttons don't get focused when clicked
      ref: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus

      We want to make sure that experience is consistent throughout different browsers, so we're
      explicitly focusing the PlayerButtons on mouse down.
    */
    e.preventDefault() // prevent focusing on the Player's container
    if (!this.buttonRef) {
      return
    }
    this.buttonRef.focus()
  }

  handleOnMouseDown = (e) => {
    this.handleInsaneBrowsers(e)
    this.props.onMouseDown(e)
  }

  handleRef = (e) => {
    this.buttonRef = e
    this.props.forwardRef(e)
  }

  componentDidMount() {
    this.props.makeStyles()
  }

  componentDidUpdate() {
    this.props.makeStyles()
  }

  renderButton = ({ videoId, onClick, children, styles }) => {
    return (
      <button
        css={styles.button}
        onMouseDown={this.handleOnMouseDown}
        onClick={onClick}
        onKeyDown={this.handleKeyDown}
        aria-controls={videoId}
        ref={this.handleRef}
      >
        <div css={styles.divWrapper}>
          {children}
        </div>
      </button>
    )
  }

  renderButtonWithTooltip = (props, { controlActivated }) => {
    return (
      <Tooltip
        renderTip={props.tooltipLabel}
        isShowingContent={!controlActivated && this.state.isShowingTooltip}
        onShowContent={() => {
          if (controlActivated) {
            return
          }
          this.setState({ isShowingTooltip: true })
        }}
        onHideContent={() => { this.setState({ isShowingTooltip: false }) }}
        mountNode={props.tooltipMountNode}
        >
        <span>
          {this.renderButton(props)}
        </span>
      </Tooltip>
    )
  }

  render () {
    const { tooltipLabel, styles } = this.props

    return (
      <MediaContext.Consumer>
        {({ state }) => (
          <div css={styles.buttonWrapper}>
            {tooltipLabel ? this.renderButtonWithTooltip(this.props, state) : this.renderButton(this.props)}
          </div>
        )}
      </MediaContext.Consumer>
    )
  }
}
