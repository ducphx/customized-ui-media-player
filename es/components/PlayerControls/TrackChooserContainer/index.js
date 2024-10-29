import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2019 - present Instructure, Inc.
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
import { TruncateText } from '@instructure/ui-truncate-text';
import { ScreenReaderContent } from '@instructure/ui-a11y-content';
import { translate } from '../../../constants/translated/translations';
import { Menu } from '@instructure/ui-menu';
import MediaContext from '../../Player/MediaContext';
/**
---
private: true
---
@module TrackChooserContainer
**/

export default class TrackChooserContainer extends Component {
  constructor() {
    super(...arguments);

    this.handleKeyDown = showControls => e => {
      e.preventDefault();
      showControls();
    };

    this.handleOnSelect = toggleTrack => (_, _ref) => {
      let _ref2 = _slicedToArray(_ref, 1),
          track = _ref2[0];

      toggleTrack(track);
    };

    this.renderTurnOffCaptionLabel = actions => {
      return /*#__PURE__*/React.createElement(Menu.Item, {
        "data-test": "Captions-Off",
        value: null,
        onKeyDown: this.handleKeyDown(actions.showControls)
      }, translate('OFF'));
    };

    this.renderTrackOptionsLabels = (state, actions) => {
      const tracks = state.tracks;
      return tracks.map(track => {
        return /*#__PURE__*/React.createElement(Menu.Item, {
          "data-test": `Captions-${track.label}`,
          key: track.id,
          value: track.id,
          onKeyDown: this.handleKeyDown(actions.showControls)
        }, /*#__PURE__*/React.createElement(TruncateText, null, track.label));
      });
    };
  }

  render() {
    return /*#__PURE__*/React.createElement(MediaContext.Consumer, null, _ref3 => {
      let state = _ref3.state,
          actions = _ref3.actions;
      const selectedTrackId = state.selectedTrackId;
      return /*#__PURE__*/React.createElement(Menu.Group, {
        label: /*#__PURE__*/React.createElement(ScreenReaderContent, null, this.props.name),
        selected: [selectedTrackId],
        onSelect: this.handleOnSelect(actions.toggleTrack)
      }, this.renderTurnOffCaptionLabel(actions), this.renderTrackOptionsLabels(state, actions));
    });
  }

}
TrackChooserContainer.displayName = Menu.Item.displayName;