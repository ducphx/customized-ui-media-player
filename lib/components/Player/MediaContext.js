"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _PropTypes = require("./PropTypes");

var MediaStates = _interopRequireWildcard(require("../../constants/mediaStates"));

var ScreenStates = _interopRequireWildcard(require("../../constants/screenStates"));

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
const MediaContext = {
  state: _propTypes.default.shape({
    mediaState: _propTypes.default.oneOf(Object.values(MediaStates)),
    screenState: _propTypes.default.oneOf(Object.values(ScreenStates)),
    muted: _propTypes.default.bool,
    volume: _propTypes.default.number,
    playbackSpeed: _propTypes.default.number,
    selectedSrc: _propTypes.default.string,
    sources: _PropTypes.sourcesType,
    showControls: _propTypes.default.bool,
    videoId: _propTypes.default.string
  }),
  fullScreenContainerRef: _propTypes.default.func,
  actions: _propTypes.default.shape({
    play: _propTypes.default.func,
    pause: _propTypes.default.func,
    seek: _propTypes.default.func,
    setVolume: _propTypes.default.func,
    setPlaybackSpeed: _propTypes.default.func,
    setSource: _propTypes.default.func,
    toggleTrack: _propTypes.default.func,
    showControls: _propTypes.default.func,
    togglePlay: _propTypes.default.func,
    toggleFullScreen: _propTypes.default.func,
    toggleMute: _propTypes.default.func,
    activateControl: _propTypes.default.func,
    deactivateControl: _propTypes.default.func,
    setControlHovered: _propTypes.default.func
  }),
  constants: _propTypes.default.shape({
    SEEK_INTERVAL_SECONDS: _propTypes.default.number,
    JUMP_INTERVAL_SECONDS: _propTypes.default.number,
    SEEK_VOLUME_INTERVAL: _propTypes.default.number,
    JUMP_VOLUME_INTERVAL: _propTypes.default.number
  }),
  setActions: _propTypes.default.func,
  playbackSpeedOptions: _propTypes.default.array,
  setPlaybackSpeedOptions: _propTypes.default.func
};

class Provider extends _react.Component {
  getChildContext() {
    return this.props.value;
  }

  render() {
    return this.props.children;
  }

}

Provider.propTypes = {
  children: _propTypes.default.node.isRequired,
  value: _propTypes.default.shape(MediaContext).isRequired
};
Provider.childContextTypes = MediaContext;

class Consumer extends _react.Component {
  render() {
    return this.props.children(this.context);
  }

}

Consumer.propTypes = {
  children: _propTypes.default.func.isRequired
};
Consumer.contextTypes = MediaContext;
var _default = {
  Provider,
  Consumer
};
exports.default = _default;