import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

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
import React, { Component } from 'react';
import { Menu } from '@instructure/ui-menu';
import { ScreenReaderContent } from '@instructure/ui-a11y-content';
import MediaContext from '../../Player/MediaContext';
/**
---
private: true
---
@module SourceChooserContainer
**/

export default class SourceChooserContainer extends Component {
  constructor() {
    super(...arguments);

    this.handleKeyDown = showControls => e => {
      e.preventDefault();
      showControls();
    };

    this.handleOnSelect = setSource => (e, _ref) => {
      let _ref2 = _slicedToArray(_ref, 1),
          source = _ref2[0];

      setSource(source);
    };

    this.renderSourcesLabels = (state, actions) => {
      const sources = state.sources;

      if (typeof sources[0] === 'string') {
        return sources.map((src, idx) => /*#__PURE__*/React.createElement(Menu.Item, {
          key: src,
          value: src,
          onKeyDown: this.handleKeyDown(actions.showControls)
        }, /*#__PURE__*/React.createElement(ScreenReaderContent, null, "Source", idx)));
      }

      return sources.map(source => {
        const src = source.src,
              label = source.label;
        return /*#__PURE__*/React.createElement(Menu.Item, {
          key: src,
          value: src,
          onKeyDown: this.handleKeyDown(actions.showControls)
        }, label);
      });
    };
  }

  render() {
    return /*#__PURE__*/React.createElement(MediaContext.Consumer, null, _ref3 => {
      let state = _ref3.state,
          actions = _ref3.actions;
      const selectedSrc = state.selectedSrc;
      return /*#__PURE__*/React.createElement(Menu.Group, {
        label: /*#__PURE__*/React.createElement(ScreenReaderContent, null, this.props.name),
        selected: [selectedSrc],
        onSelect: this.handleOnSelect(actions.setSource)
      }, this.renderSourcesLabels(state, actions));
    });
  }

}
SourceChooserContainer.displayName = Menu.Item.displayName;