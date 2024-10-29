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
import { pickProps } from '@instructure/ui-react-utils';
import { IconSubtitlesSolid, IconSubtitlesLine } from '@instructure/ui-icons';
import { ScreenReaderContent } from '@instructure/ui-a11y-content';
import PlayerButton from '../../PlayerButton';
import MediaContext from '../../Player/MediaContext';
import { translate } from '../../../constants/translated/translations';
const VARIANTS = {
  ON: {
    label: translate('TOGGLE_CAPTIONS_OFF'),
    Icon: IconSubtitlesSolid
  },
  OFF: {
    label: translate('TOGGLE_CAPTIONS_ON'),
    Icon: IconSubtitlesLine
  }
};
/**
---
private: true
---
@module CaptionsToggle
**/

export default class CaptionsToggle extends Component {
  constructor() {
    super(...arguments);

    this.toggleCaptions = (actions, state) => {
      if (!actions.toggleTrack) return;
      if (!state.tracks || !state.tracks.length) return;

      if (state.selectedTrackId) {
        actions.toggleTrack(null);
      } else {
        actions.toggleTrack(state.tracks[0].id);
      }
    };
  }

  render() {
    return /*#__PURE__*/React.createElement(MediaContext.Consumer, null, _ref => {
      let actions = _ref.actions,
          state = _ref.state,
          fullScreenContainerRef = _ref.fullScreenContainerRef;

      const _ref2 = state.selectedTrackId ? VARIANTS.ON : VARIANTS.OFF,
            label = _ref2.label,
            Icon = _ref2.Icon;

      return /*#__PURE__*/React.createElement(PlayerButton, Object.assign({}, pickProps(this.props, PlayerButton.propTypes), {
        tooltipLabel: label,
        tooltipMountNode: fullScreenContainerRef,
        videoId: state.videoId,
        onClick: () => this.toggleCaptions(actions, state)
      }), /*#__PURE__*/React.createElement(ScreenReaderContent, null, label), /*#__PURE__*/React.createElement(Icon, {
        size: "x-small"
      }));
    });
  }

}