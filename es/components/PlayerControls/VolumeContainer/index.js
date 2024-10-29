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
import PlayerPopover from '../../PlayerPopover';
import Volume from './Volume';
import MediaContext from '../../Player/MediaContext';
/**
---
private: true
---
@module VolumeContainer
**/

export default class VolumeContainer extends Component {
  constructor() {
    super(...arguments);

    this.handleOnChange = (volume, _ref) => {
      let setVolume = _ref.setVolume;
      setVolume(parseFloat(volume));
    };

    this.calculateVolume = function (volume) {
      let adjustVolume = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      return Math.round(volume * 100 + adjustVolume * 100) / 100;
    };

    this.handleKeyPress = (e, _ref2, _ref3, _ref4) => {
      let volume = _ref2.volume;
      let setVolume = _ref3.setVolume,
          toggleMute = _ref3.toggleMute,
          showControls = _ref3.showControls;
      let SEEK_VOLUME_INTERVAL = _ref4.SEEK_VOLUME_INTERVAL,
          JUMP_VOLUME_INTERVAL = _ref4.JUMP_VOLUME_INTERVAL;
      const keyHandlers = {
        ArrowLeft: () => {
          setVolume(this.calculateVolume(volume, -SEEK_VOLUME_INTERVAL));
        },
        ArrowRight: () => {
          setVolume(this.calculateVolume(volume, SEEK_VOLUME_INTERVAL));
        },
        ArrowUp: () => {
          setVolume(this.calculateVolume(volume, SEEK_VOLUME_INTERVAL));
        },
        ArrowDown: () => {
          setVolume(this.calculateVolume(volume, -SEEK_VOLUME_INTERVAL));
        },
        PageUp: () => {
          setVolume(this.calculateVolume(volume, JUMP_VOLUME_INTERVAL));
        },
        PageDown: () => {
          setVolume(this.calculateVolume(volume, -JUMP_VOLUME_INTERVAL));
        },
        Home: () => {
          setVolume(0);
        },
        End: () => {
          setVolume(1);
        },
        ' ': () => {
          toggleMute();
        },
        Enter: () => {
          toggleMute();
        },
        m: () => {
          toggleMute();
        },
        M: () => {
          toggleMute();
        }
      };

      if (e.key in keyHandlers) {
        e.preventDefault();
        e.stopPropagation();
        showControls();
        keyHandlers[e.key]();
      }
    };
  }

  render() {
    return /*#__PURE__*/React.createElement(MediaContext.Consumer, null, _ref5 => {
      let state = _ref5.state,
          fullScreenContainerRef = _ref5.fullScreenContainerRef,
          actions = _ref5.actions,
          constants = _ref5.constants;
      return /*#__PURE__*/React.createElement(PlayerPopover, {
        activateControl: () => {
          actions.activateControl('VolumeContainer');
        },
        deactivateControl: () => {
          actions.deactivateControl('VolumeContainer');
        },
        showControls: state.showControls
      }, (_ref6, togglePopover) => {
        let showPopover = _ref6.showPopover;
        return /*#__PURE__*/React.createElement(Volume, Object.assign({
          muted: state.muted,
          volume: state.volume,
          showPopover: showPopover,
          togglePopover: togglePopover,
          videoId: state.videoId,
          step: constants.SEEK_VOLUME_INTERVAL,
          onChange: volume => {
            this.handleOnChange(volume, actions);
          },
          onKeyDown: e => {
            this.handleKeyPress(e, state, actions, constants);
          },
          mountNode: fullScreenContainerRef,
          showControls: state.showControls,
          handleShowControls: actions.showControls
        }, this.props));
      });
    });
  }

}