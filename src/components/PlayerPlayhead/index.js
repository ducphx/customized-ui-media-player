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

import { IconButton } from '@instructure/ui-buttons'
import { Menu } from '@instructure/ui-menu'
import { withStyle, jsx, InstUISettingsProvider } from '@instructure/emotion'

import MediaContext from '../Player/MediaContext'

import generateStyle from './styles'
import generateComponentTheme, { playheadIconButtonTheme } from './theme'

@withStyle(generateStyle, generateComponentTheme)
class PlayerPlayhead extends Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    makeStyles: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    styles: PropTypes.object,
    icon: PropTypes.node,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    menuItems: PropTypes.arrayOf(Menu.propTypes.children),
    variant: PropTypes.oneOf(['button', 'menu']).isRequired,
  }

  static defaultProps = {
    icon: null,
    onClick: () => {},
    menuItems: null,
  }

  componentDidMount() {
    this.props.makeStyles()
  }

  componentDidUpdate() {
    this.props.makeStyles()
  }

  focusPlayhead = () => {
    this.buttonRef.focus()

    // This is a workaround for an issue caused by the inert polyfill where the polyfill
    // uses a MutationObserver to detect the inert attribute change, and MutationObserver
    // events are asynchronous, so we have to defer focus() to the next tick.
    // https://github.com/WICG/inert/blob/v3.0.0/README.md
    setTimeout(() => {
      this.buttonRef.focus()
    })
  }

  setButtonRef = (ref) => {
    this.buttonRef = ref
  }

  handleOnMouseMove = (event) => {
    event.stopPropagation()
  }

  handleClick = (event) => {
    event.stopPropagation()

    this.props.onClick(event)
  }

  renderButton() {
    const { icon, label } = this.props

    return (
      <IconButton
        elementRef={this.setButtonRef}
        renderIcon={icon}
        onMouseMove={this.handleOnMouseMove}
        onClick={this.handleClick}
        shape="circle"
        screenReaderLabel={label}
        size="large"
      />
    )
  }

  renderMenu() {
    const { menuItems } = this.props

    return (
      <MediaContext.Consumer>
        {({ setActions, fullScreenContainerRef }) => {
          setActions({
            focusPlayhead: this.focusPlayhead,
          })

          return (
            <Menu
              mountNode={fullScreenContainerRef}
              placement="top"
              trigger={this.renderButton()}
            >
              {menuItems}
            </Menu>
          )
        }}
      </MediaContext.Consumer>
    )
  }

  render() {
    const { variant, styles } = this.props

    return (
      <InstUISettingsProvider theme={playheadIconButtonTheme}>
        <div css={styles.container}>
          {variant === 'button' ? this.renderButton() : this.renderMenu()}
        </div>
      </InstUISettingsProvider>
    )
  }
}

export default PlayerPlayhead
