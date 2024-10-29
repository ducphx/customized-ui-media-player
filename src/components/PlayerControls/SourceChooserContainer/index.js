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

import { Menu } from '@instructure/ui-menu'
import { ScreenReaderContent } from '@instructure/ui-a11y-content'
import MediaContext from '../../Player/MediaContext'

/**
---
private: true
---
@module SourceChooserContainer
**/
export default class SourceChooserContainer extends Component {
  // we use this trick as to avoid console error
  // since in the parent element we expect
  // one of MenuItem, MenuItemSeparator in MenuItemGroup
  static displayName = Menu.Item.displayName

  handleKeyDown = (showControls) => (e) => {
    e.preventDefault()
    showControls()
  }

  handleOnSelect = (setSource) => (e, [source]) => {
    setSource(source)
  }

  renderSourcesLabels = (state, actions) => {
    const { sources } = state

    if (typeof sources[0] === 'string') {
      return sources.map((src, idx) => (
        <Menu.Item
          key={src}
          value={src}
          onKeyDown={this.handleKeyDown(actions.showControls)}
        >
          <ScreenReaderContent>Source{idx}</ScreenReaderContent>
        </Menu.Item>
      ))
    }

    return sources.map((source) => {
      const { src, label } = source

      return (
        <Menu.Item
          key={src}
          value={src}
          onKeyDown={this.handleKeyDown(actions.showControls)}
        >
          {label}
        </Menu.Item>
      )
    })
  }

  render() {
    return (
      <MediaContext.Consumer>
        {({ state, actions }) => {
          const { selectedSrc } = state
          return (
            <Menu.Group
              label={
                <ScreenReaderContent>{this.props.name}</ScreenReaderContent>
              }
              selected={[selectedSrc]}
              onSelect={this.handleOnSelect(actions.setSource)}
            >
              {this.renderSourcesLabels(state, actions)}
            </Menu.Group>
          )
        }}
      </MediaContext.Consumer>
    )
  }
}
