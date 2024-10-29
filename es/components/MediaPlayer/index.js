import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";

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
import PropTypes from 'prop-types';
import screenfull from 'screenfull';
import { Menu } from '@instructure/ui-menu';
import { Children as ChildrenPropTypes } from '@instructure/ui-prop-types';
import { pickProps } from '@instructure/ui-react-utils';
import { Player, PlayerPropTypes } from '../Player';
import PlayerControls from '../PlayerControls';
import { HTML5Video } from '../Player/HTML5Video';
import { YouTube } from '../Player/YouTube';
import Vimeo from '../Player/Vimeo';
import { Captions } from '../Player/Captions';
import { TranslationPropTypes } from '../../constants/translated/translations';

class MediaPlayer extends Component {
  constructor() {
    super();
    this.state = {
      smallScreen: this.isSmallScreen()
    };
  }

  isSmallScreen() {
    return window.matchMedia('(max-width: 480px)').matches;
  }

  updateScreenSize() {
    this.setState({
      smallScreen: this.isSmallScreen()
    });
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.updateScreenSize());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.updateScreenSize());
  }

  render() {
    const mediaPlayerProps = pickProps(this.props, MediaPlayer.propTypes);
    const _this$props = this.props,
          sources = _this$props.sources,
          tracks = _this$props.tracks,
          type = _this$props.type,
          hideFullScreen = _this$props.hideFullScreen,
          markers = _this$props.markers,
          customControls = _this$props.customControls,
          playhead = _this$props.playhead;
    const renderer = MediaPlayer.rendererList[type]; // require('screenfull') returns "false" if full-screen isn't sfupported

    const isFullScreenHidden = !screenfull || hideFullScreen;
    const isSourceChooserHidden = typeof sources === 'string' || sources.length <= 1;
    const isCaptionsToggleHidden = this.state.smallScreen || !tracks || !tracks.length;
    const isTrackChooserHidden = !tracks || !tracks.length;

    const playerProps = _objectSpread(_objectSpread({}, pickProps(mediaPlayerProps, Player.propTypes)), {}, {
      renderer,
      controls: PlayerControls => {
        const renderByControlSettings = [/*#__PURE__*/React.createElement(PlayerControls.PlaybackSpeed, {
          key: "PlaybackSpeed",
          name: "SPEED"
        })];

        if (!isTrackChooserHidden) {
          renderByControlSettings.unshift( /*#__PURE__*/React.createElement(PlayerControls.TrackChooser, {
            key: "TrackChooser",
            name: "CAPTIONS"
          }));
        }

        if (!isSourceChooserHidden) {
          renderByControlSettings.push( /*#__PURE__*/React.createElement(PlayerControls.SourceChooser, {
            key: "SourceChooser",
            name: "QUALITY"
          }));
        }

        const customControlsRendered = customControls();

        if (Array.isArray(customControlsRendered)) {
          renderByControlSettings.push(...customControlsRendered);
        } else if (customControlsRendered) {
          renderByControlSettings.push(customControlsRendered);
        }

        const allControls = [/*#__PURE__*/React.createElement(PlayerControls.PlayPauseButton, {
          key: "PlayPauseButton"
        }), /*#__PURE__*/React.createElement(PlayerControls.Timebar, {
          key: "Timebar",
          markers: markers,
          playhead: playhead
        }), /*#__PURE__*/React.createElement(PlayerControls.Volume, {
          key: "Volume"
        }), !isCaptionsToggleHidden && /*#__PURE__*/React.createElement(PlayerControls.CaptionsToggle, {
          key: "CaptionsToggle"
        }), /*#__PURE__*/React.createElement(PlayerControls.PlayerSettings, {
          key: "Settings",
          name: "Settings"
        }, renderByControlSettings)];

        if (!isFullScreenHidden) {
          allControls.push( /*#__PURE__*/React.createElement(PlayerControls.FullScreenButton, {
            key: "FullScreenButton"
          }));
        }

        const firstControl = allControls.shift();
        const lastControl = allControls.pop();
        const firstControlPositioned = /*#__PURE__*/React.cloneElement(firstControl, {
          position: 'start'
        });
        const lastControlPositioned = /*#__PURE__*/React.cloneElement(lastControl, {
          position: 'end'
        });
        return /*#__PURE__*/React.createElement(PlayerControls, null, [firstControlPositioned, ...allControls, lastControlPositioned]);
      }
    });

    const playerEventProps = pickProps(this.props, PlayerPropTypes.playerEventsTypeSet);
    const rendererEventProps = pickProps(this.props, PlayerPropTypes.rendererEventsTypeSet);
    return /*#__PURE__*/React.createElement(Player, Object.assign({}, playerProps, playerEventProps, rendererEventProps), this.props.children);
  }

}

MediaPlayer.propTypes = _objectSpread(_objectSpread({
  type: PropTypes.oneOf(['video', 'youtube', 'vimeo']),

  /**
   * URL(s) of video to play
   */
  sources: PlayerPropTypes.sourcesType,

  /**
   * tracks of the video to play
   */
  tracks: PlayerPropTypes.tracksType,

  /**
   * Additional controls to be added to the control bar
   */
  customControls: PropTypes.func,

  /**
   * If set to true, the controls will never dismiss.
   */
  alwaysShowControls: PropTypes.bool,

  /**
   * If set to true, FullScreenButton is hidden.
   */
  hideFullScreen: PropTypes.bool,

  /**
   * Give the player a label to be read by screen readers.
   */
  label: PropTypes.string,

  /**
   * Give the player a playhead
   */
  playhead: PropTypes.node,

  /**
   * The poster image to use before the media is played.
   */
  poster: PropTypes.string,

  /**
   * Label overrides for i18n. Defaults to english
   * See src/constants/translated/translations.js for default values
   */
  translations: PropTypes.shape(TranslationPropTypes),

  /**
   * Children of the <Player />
   */
  children: ChildrenPropTypes.oneOf([Player.Overlay]),

  /**
   * indicates the player should fill the width of its container
   */
  fluidWidth: PropTypes.bool,

  /**
   * indicates the player should fill the height of its container
   */
  fluidHeight: PropTypes.bool,

  /**
   * A set of markers to apply to the timebar.
   */
  markers: ChildrenPropTypes.oneOf([Player.Marker]),

  /**
   * Reference to actions object
   */
  actionsRef: PropTypes.func,

  /**
   * Disable right click on the player container
   */
  disableRightClick: PropTypes.bool,
  captionPosition: Captions.propTypes.captionPosition,
  captionOffset: Captions.propTypes.captionOffset,
  autoShowCaption: PropTypes.string,

  /**
   * Make YouTube iframe unfocusable
   */
  disableYoutubeFocus: PropTypes.bool,

  /**
   * Hide control bar
   */
  hideControls: PropTypes.bool
}, PlayerPropTypes.playerEventsTypeSet), PlayerPropTypes.rendererEventsTypeSet);
MediaPlayer.defaultProps = {
  type: 'video',
  sources: [],
  tracks: [],
  actionsRef: null,
  customControls: () => [],
  alwaysShowControls: false,
  children: null,
  hideFullScreen: false,
  markers: [],
  playhead: null,
  poster: null,
  label: '',
  translations: {},
  fluidWidth: true,
  fluidHeight: false,
  disableRightClick: false,
  captionPosition: Captions.defaultProps.captionPosition,
  captionOffset: Captions.defaultProps.captionOffset,
  autoShowCaption: null,
  disableYoutubeFocus: false,
  hideControls: false
};
MediaPlayer.rendererList = {
  video: HTML5Video,
  youtube: YouTube,
  vimeo: Vimeo
};
MediaPlayer.Marker = Player.Marker;
MediaPlayer.Menu = Menu;
MediaPlayer.Overlay = Player.Overlay;
MediaPlayer.Playhead = Player.Playhead;
MediaPlayer.Control = PlayerControls.Control;

MediaPlayer.exitFullScreen = () => {
  if (screenfull.isFullscreen) screenfull.exit();
};

export default MediaPlayer;
export { MediaPlayer, PlayerPropTypes };