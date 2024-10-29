var _dec, _class, _class2, _temp;

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
import { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyle, jsx } from '@instructure/emotion';
import PlayPauseButton from './PlayPauseButton';
import Timebar from './Timebar';
import Volume from './VolumeContainer';
import PlaybackSpeed from './PlaybackSpeedContainer';
import TrackChooser from './TrackChooserContainer';
import SourceChooser from './SourceChooserContainer';
import FullScreenButton from './FullScreenButton';
import CustomControl from './CustomControl';
import MediaContext from '../Player/MediaContext';
import PlayerSettings from './PlayerSettings';
import CaptionsToggle from './CaptionsToggle';
import generateComponentTheme from './theme';
import generateStyle from './styles';
/**
---
parent: Player
---
**/

let PlayerControls = (_dec = withStyle(generateStyle, generateComponentTheme), _dec(_class = (_temp = _class2 = class PlayerControls extends Component {
  constructor() {
    super(...arguments);

    this.handleOnClick = showControls => e => {
      e.stopPropagation();
      showControls();
    };
  }

  componentDidMount() {
    this.props.makeStyles();
  }

  componentDidUpdate() {
    this.props.makeStyles();
  }

  render() {
    const styles = this.props.styles;
    return jsx(MediaContext.Consumer, null, _ref => {
      let state = _ref.state,
          actions = _ref.actions;
      const showControls = state.showControls;
      /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */

      /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/mouse-events-have-key-events */

      return jsx("div", {
        css: [styles.container, !showControls && styles.hidden],
        onClick: this.handleOnClick(actions.showControls),
        onMouseEnter: () => {
          actions.setControlHovered(true);
        },
        onMouseLeave: () => {
          actions.setControlHovered(false);
        }
      }, this.props.children);
      /* eslint-enable jsx-a11y/no-static-element-interactions, jsx-a11y/mouse-events-have-key-events */

      /* eslint-enable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
    });
  }

}, _class2.displayName = 'PlayerControls', _class2.propTypes = {
  // eslint-disable-next-line react/require-default-props
  makeStyles: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  styles: PropTypes.object,

  /**
   * Children of the <PlayerControls />
   */
  children: PropTypes.node
}, _class2.defaultProps = {
  showControls: false
}, _class2.PlayPauseButton = PlayPauseButton, _class2.Timebar = props => jsx(MediaContext.Consumer, null, _ref2 => {
  let state = _ref2.state,
      actions = _ref2.actions;
  return jsx(Timebar, Object.assign({
    seeking: state.seeking,
    duration: state.duration,
    currentTime: state.currentTime,
    mediaState: state.mediaState,
    buffered: state.buffered,
    videoId: state.videoId,
    onClick: actions.seek
  }, props));
}), _class2.Volume = Volume, _class2.TrackChooser = TrackChooser, _class2.PlaybackSpeed = PlaybackSpeed, _class2.SourceChooser = SourceChooser, _class2.FullScreenButton = FullScreenButton, _class2.PlayerSettings = PlayerSettings, _class2.Control = CustomControl, _class2.CaptionsToggle = CaptionsToggle, _temp)) || _class);
export default PlayerControls;