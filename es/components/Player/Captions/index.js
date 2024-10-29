import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";

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
import captionUtils from '../../../utils/caption';
import { tracksType } from '../PropTypes';
import generateStyle from './styles';
import generateComponentTheme from './theme';
const ENTER = /[\r\n]/g;
let CaptionsPres = (_dec = withStyle(generateStyle, generateComponentTheme), _dec(_class = (_temp = _class2 = class CaptionsPres extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      activeCues: []
    };
    this.lookupIdx = 0;
  }

  componentDidMount() {
    this.props.makeStyles();
  }

  componentDidUpdate(prevProps, prevState) {
    const activeCues = captionUtils.getActiveCues(this.props, prevProps, this);

    if (captionUtils.activeCuesChanged(prevState.activeCues, activeCues)) {
      this.setState({
        activeCues
      });
    }

    this.props.makeStyles();
  }

  render() {
    const _this$props = this.props,
          captions = _this$props.captions,
          styles = _this$props.styles;

    if (!Array.isArray(captions) || captions.length === 0) {
      return null;
    }

    return jsx("div", {
      css: styles.subtitleContainer
    }, this.state.activeCues.map(_ref => {
      let text = _ref.text;
      return text.split(ENTER).map(lineContent => {
        // Caption files can provide multiple entries for a single time slot.
        // Display each entry separated by a single line to emulate native behaviour.
        return jsx("div", {
          key: lineContent
        }, jsx("span", {
          css: styles.subtitle
        }, lineContent));
      });
    }));
  }

}, _class2.propTypes = {
  // eslint-disable-next-line react/require-default-props
  makeStyles: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  styles: PropTypes.object,
  currentTime: PropTypes.number.isRequired,
  captions: PropTypes.arrayOf(PropTypes.shape({
    start: PropTypes.number,
    end: PropTypes.number,
    text: PropTypes.string
  })),
  captionPosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  captionOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  showControls: PropTypes.bool
}, _class2.defaultProps = {
  captions: [],
  captionPosition: 'top',
  captionOffset: 0,
  showControls: false
}, _temp)) || _class);
export default class Captions extends Component {
  constructor(props) {
    var _this;

    super(props);
    _this = this;
    this.state = {
      captions: [],
      convertedTracks: {}
    };

    this.clearUnneededConvertedTracks = function (tracks, staleTracks) {
      let callback = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : () => {};

      _this.setState(prevState => {
        const tracksToKeep = staleTracks.filter(_ref2 => {
          let staleId = _ref2.id;
          return tracks.some(track => staleId === track.id);
        });
        const convertedTracks = tracksToKeep.reduce((result, _ref3) => {
          let id = _ref3.id;
          const convertedTrack = prevState.convertedTracks[id];

          if (!convertedTrack) {
            return result;
          }

          return _objectSpread(_objectSpread({}, result), {}, {
            [id]: convertedTrack
          });
        }, {});
        return {
          convertedTracks
        };
      }, callback);
    };

    this.maybeDefaultToOff = () => {
      const _this$state = this.state,
            convertedTracks = _this$state.convertedTracks,
            captions = _this$state.captions;
      const currentCaptions = Object.values(convertedTracks).find(cachedCaptions => cachedCaptions === captions);

      if (!currentCaptions) {
        this.toggleTrack(null);
      }
    };

    this.findSelectedTrack = (tracks, trackId) => tracks.find(track => track.id === trackId);

    this.toggleTrack = trackId => {
      const selectedTrack = this.findSelectedTrack(this.props.tracks, trackId);
      const selectedTrackSrc = selectedTrack && selectedTrack.src;
      const selectedTrackId = selectedTrack && selectedTrack.id;

      const applyTrack = () => {
        this.setState({
          captions: selectedTrackId ? this.state.convertedTracks[selectedTrackId] : []
        }, () => this.props.onTrackChange(trackId));
      };

      if (selectedTrack && !this.state.convertedTracks[selectedTrackId]) {
        return captionUtils.getCaptionsFromFile(selectedTrackSrc).then(captionData => {
          const sortedCaptionData = captionUtils.sortByTime(captionData);
          this.setState(prevState => ({
            convertedTracks: _objectSpread(_objectSpread({}, prevState.convertedTracks), {}, {
              [selectedTrackId]: sortedCaptionData
            })
          }), applyTrack);
        }).catch(message => {
          window.console.warn(message);
          applyTrack();
          return Promise.reject(message);
        });
      } else {
        applyTrack();
      }

      return Promise.resolve();
    };

    this.props.setActions({
      toggleTrack: this.toggleTrack
    });

    if (this.props.autoShowCaption) {
      var _this$props$tracks;

      const cap = (_this$props$tracks = this.props.tracks) === null || _this$props$tracks === void 0 ? void 0 : _this$props$tracks.find(t => t.language === this.props.autoShowCaption);

      if (cap) {
        this.toggleTrack(cap.id);
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tracks !== this.props.tracks) {
      this.clearUnneededConvertedTracks(this.props.tracks, prevProps.tracks, this.maybeDefaultToOff);
    }
  }

  render() {
    return jsx(CaptionsPres, Object.assign({}, this.props, this.state));
  }

}
Captions.propTypes = _objectSpread({
  tracks: tracksType,
  setActions: PropTypes.func,
  onTrackChange: PropTypes.func,
  autoShowCaption: PropTypes.string
}, CaptionsPres.propTypes);
Captions.defaultProps = _objectSpread({
  tracks: [],
  setActions: () => {},
  onTrackChange: () => {}
}, CaptionsPres.defaultProps);
export { Captions, CaptionsPres };