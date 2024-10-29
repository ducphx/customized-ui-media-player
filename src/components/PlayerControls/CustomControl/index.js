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
import PropTypes from 'prop-types'

import { Flex } from '@instructure/ui-flex'
import { Checkbox } from '@instructure/ui-checkbox'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'

import MediaContext from '../../Player/MediaContext'

/**
---
private: true
---
@module CustomControl
**/
export default class CustomControl extends Component {
  static displayName = 'CustomControl'
  static propTypes = {
    variant: PropTypes.oneOf(['button', 'menu']),
    menuItems: PropTypes.func,
    label: PropTypes.string,
    onClick: PropTypes.func,
    checked: PropTypes.bool,
  }

  static defaultProps = {
    variant: 'button',
    menuItems: () => null,
    onClick: () => {},
    checked: false,
    label: ''
  }

  state = {
    toggleCheckedStatus: true,
  }

  renderButton() {
    const { label, onClick, checked } = this.props
    return (
      <Checkbox
        label={<ScreenReaderContent>{label}</ScreenReaderContent>}
        variant="toggle"
        labelPlacement="start"
        onClick={onClick}
        checked={checked}
        onChange={() => {
          this.setState({ toggleCheckedStatus: this.props.checked })
        }}
        readOnly
      />
    )
  }

  renderMenu() {
    const { menuItems } = this.props

    return <Flex direction="column">{menuItems()}</Flex>
  }

  render() {
    const { variant } = this.props

    return (
      <MediaContext.Consumer>
        {() => {
          return variant === 'menu' ? (
            this.renderMenu()
          ) : (
            <span>{this.renderButton()}</span>
          )
        }}
      </MediaContext.Consumer>
    )
  }
}
